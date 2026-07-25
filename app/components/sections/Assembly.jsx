"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import { systemLayers } from "@/app/data/profile";
import { useMediaQuery, useReducedMotion } from "@/app/lib/hooks";
import { cn, pad } from "@/app/lib/utils";

/**
 * Exploded assembly drawing, driven by scroll.
 *
 * A flat plan view tilts into axonometric and separates into its four layers as
 * the reader scrolls the section — an engineering assembly coming apart, not a
 * camera drifting through decorative geometry. Explanatory motion is the one
 * category that earns a long beat, and this shows how the systems in the work
 * index are actually put together.
 *
 * Three deliberate constraints:
 *
 * 1. CSS 3D, no WebGL. `preserve-3d` with rotateX/rotateZ gives real depth on
 *    the compositor. A 3D library would cost more than this entire bundle for
 *    something the platform does natively.
 *
 * 2. Sticky, never scroll-jacked. Native scrolling drives progress and the
 *    scroll event is never intercepted, so the reader keeps full control and can
 *    pass the section at any speed.
 *
 * 3. Labels stay outside the 3D context. Text inside a 3D transform renders
 *    blurry and needs counter-rotating to stay legible; a parts list beside the
 *    scene is how an exploded diagram is annotated anyway.
 *
 * Transforms are written straight to each node inside a rAF rather than through
 * a custom property on the parent, because an inherited variable forces a style
 * recalculation on every descendant each frame.
 */

// Plate footprint in px. Fixed rather than relative: Z separation and
// perspective only read correctly against a stable footprint, and the assembly
// as a whole is scaled to fit whatever box it lands in.
const PLATE_W = 430;
const PLATE_H = 210;

const LAYER_GAP = 122; // Z separation per layer, fully exploded
const TILT = 66; // final rotateX. Steeper flattens each plate, which buys
//                  separation: plate height projects as H·cos(tilt) while the
//                  gap projects as GAP·sin(tilt). At 66° the gap projects to
//                  ~111px against an ~85px plate, so the layers stay clearly
//                  apart while the whole stack stays short enough to scale up.
const SWING = -28; // final rotateZ

// Footprint of the fully exploded assembly, used to derive the fit scale.
const RAD = Math.PI / 180;
const SPREAD_H =
  (systemLayers.length - 1) * LAYER_GAP * Math.sin(TILT * RAD) +
  PLATE_H * Math.cos(TILT * RAD);
const SPREAD_W =
  PLATE_W * Math.cos(SWING * RAD) +
  PLATE_H * Math.cos(TILT * RAD) * Math.abs(Math.sin(SWING * RAD));

/** Smoothstep: eases both ends without losing the sense of tracking the scroll. */
const smooth = (t) => t * t * (3 - 2 * t);

export default function Assembly() {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  const assemblyRef = useRef(null);
  const layerRefs = useRef([]);
  const readoutRef = useRef(null);

  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const animated = isDesktop && !reduced;

  // Only drives the parts list. One state write per crossed threshold, not one
  // per frame — the setter bails when the value is unchanged.
  const [active, setActive] = useState(systemLayers.length - 1);

  const apply = useCallback((progress) => {
    const e = smooth(progress);
    const n = systemLayers.length;

    const scene = sceneRef.current;
    const assembly = assemblyRef.current;

    if (scene && assembly) {
      // Fit the exploded footprint inside whatever box the scene occupies, with
      // a little margin. Without this the outer plates clip on short viewports.
      const box = scene.getBoundingClientRect();
      const fit = Math.max(
        0.34,
        Math.min(1, (box.width * 0.92) / SPREAD_W, (box.height * 0.94) / SPREAD_H)
      );
      assembly.style.transform = `scale(${fit}) rotateX(${TILT * e}deg) rotateZ(${
        SWING * e
      }deg)`;
    }

    layerRefs.current.forEach((node, i) => {
      if (!node) return;
      const z = ((n - 1) / 2 - i) * LAYER_GAP * e;
      node.style.transform = `translate3d(-50%, -50%, ${z}px)`;
    });

    if (readoutRef.current) {
      readoutRef.current.textContent = progress.toFixed(2);
    }

    // A layer counts as separated once the explosion passes its share
    const reached = Math.floor(e * (n + 0.4)) - 1;
    setActive((prev) => (prev === reached ? prev : reached));
  }, []);

  useEffect(() => {
    if (!animated) return;

    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let listening = false;

    // Start from the plan view rather than inheriting the separated state the
    // static branch sets on the first, pre-hydration render.
    apply(0);

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const runway = rect.height - window.innerHeight;
      const raw = runway > 0 ? -rect.top / runway : 0;
      apply(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Listeners are attached only while the section is on screen, so scrolling
    // the rest of the page costs nothing.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !listening) {
          listening = true;
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          update();
        } else if (!entry.isIntersecting && listening) {
          listening = false;
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      },
      { rootMargin: "15% 0px" }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [animated, apply]);

  // Separated and static wherever scroll isn't driving the scene
  useEffect(() => {
    if (animated) return;
    apply(1);
    setActive(systemLayers.length - 1);
  }, [animated, apply]);

  return (
    <section
      ref={sectionRef}
      id="assembly"
      className={cn(
        "relative border-t border-line",
        // The runway exists only where the scene animates. Elsewhere the section
        // is its natural height and simply shows the assembled state.
        animated ? "h-[320vh]" : "py-20"
      )}
    >
      <div
        className={cn(
          // pt clears the fixed header: without it the heading sits underneath.
          // No overflow-hidden here — the scene clips itself, and clipping this
          // wrapper would cut the heading off.
          animated &&
            "sticky top-0 flex h-screen flex-col justify-center pb-8 pt-[calc(var(--header-height)+1.5rem)]"
        )}
      >
        <div
          className={cn(
            "container-page flex flex-col justify-center",
            animated && "min-h-0 flex-1"
          )}
        >
          <SectionHeader
            label="Assembly"
            title={["How a system ", { text: "goes together", accent: true }, "."]}
            className={animated ? "mb-6 shrink-0 lg:mb-8" : undefined}
          />

          <div
            className={cn(
              // Stretch, not centre: the scene needs to fill the row so it can
              // take every pixel of available height. Centring left it shorter
              // than the parts list beside it, which shrank the whole assembly.
              "grid items-stretch gap-8 lg:grid-cols-[1fr_19rem] lg:gap-12",
              // flex-1 + min-h-0 lets the row absorb the leftover height
              // instead of overflowing the pinned viewport.
              animated && "min-h-0 flex-1"
            )}
          >
            {/* Scene */}
            <div
              ref={sceneRef}
              className={cn(
                "assembly-scene relative",
                animated ? "h-full min-h-[190px]" : "h-[360px]"
              )}
            >
              <div ref={assemblyRef} className="assembly">
                {systemLayers.map((layer, i) => (
                  <div
                    key={layer.id}
                    ref={(el) => {
                      layerRefs.current[i] = el;
                    }}
                    className="assembly-layer"
                  >
                    <div
                      className={cn(
                        "assembly-plate plate-grid h-full w-full",
                        i <= active && "is-separated"
                      )}
                    >
                      <span className="absolute bottom-1 right-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-fg-muted">
                        {pad(i + 1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parts list, lighting up as each layer separates */}
            <div className="flex min-h-0 flex-col justify-center">
              <div className="mb-3 flex items-baseline justify-between border-b border-fg pb-2">
                <span className="annot">Parts list</span>
                {animated && (
                  <span className="meta tabular-nums">
                    A–A <span ref={readoutRef}>0.00</span>
                  </span>
                )}
              </div>

              <ol className="flex flex-col">
                {systemLayers.map((layer, i) => {
                  const on = i <= active;
                  return (
                    <li
                      key={layer.id}
                      className={cn(
                        "border-b border-line py-2.5 transition-opacity duration-300",
                        on ? "opacity-100" : "opacity-35"
                      )}
                    >
                      <div className="flex items-baseline gap-2">
                        <span
                          className={cn(
                            "font-mono text-[0.625rem] tabular-nums transition-colors duration-300",
                            on ? "text-annot" : "text-fg-faint"
                          )}
                        >
                          {pad(i + 1)}
                        </span>
                        <span className="text-fluid-sm font-medium text-fg">
                          {layer.label}
                        </span>
                      </div>
                      <p className="meta mt-1.5 pl-5 leading-[1.5]">{layer.stack}</p>
                      <p className="mt-1 pl-5 text-[0.8125rem] leading-[1.45] text-fg-muted">
                        {layer.note}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
