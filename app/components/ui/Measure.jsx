"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/app/lib/hooks";
import { cn } from "@/app/lib/utils";

/**
 * Measurement annotations.
 *
 * The numbers these render are real. `Dimension` observes the element it spans
 * and reports its actual rendered width in CSS pixels, so the label changes when
 * you resize the window and matches what DevTools would tell you.
 *
 * That distinction is the whole point. A hard-coded "1240px" label, or a dot
 * that pulses to look live, is set dressing pretending to be instrumentation.
 * Measuring for real costs a ResizeObserver and earns the concept.
 */

/**
 * Horizontal dimension line with end ticks and a measured px label.
 *
 * Wrap the element being measured:
 *   <Dimension><h1>…</h1></Dimension>
 */
export function Dimension({ children, label, className, animate = true }) {
  const targetRef = useRef(null);
  const [width, setWidth] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.2, once: true });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = targetRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.round(entry.contentRect.width));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Count the label up to the measured value, once, on first view. Skipped
  // under reduced motion and whenever the value changes from a resize.
  const [shown, setShown] = useState(null);
  const counted = useRef(false);

  useEffect(() => {
    if (width == null) return;

    if (reduced || !animate || !inView || counted.current) {
      setShown(width);
      return;
    }

    counted.current = true;
    const start = performance.now();
    const duration = 520;
    let frame;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(eased * width));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [width, inView, reduced, animate]);

  return (
    <div
      ref={ref}
      data-revealed={inView ? "true" : "false"}
      className={cn("relative", className)}
    >
      <div ref={targetRef}>{children}</div>

      <div className="pointer-events-none relative h-4 select-none" aria-hidden="true">
        {/* The line itself, scaling out from the left origin */}
        <span className="dim-line absolute left-0 right-0 top-2 block h-px bg-annot/35" />
        {/* End ticks */}
        <span className="dim-tick absolute left-0 top-0 block h-4 w-px bg-annot/70" />
        <span className="dim-tick absolute right-0 top-0 block h-4 w-px bg-annot/70" />

        <span className="dim-tick absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-2.5">
          <span className="annot tabular-nums">
            {label ? `${label} ` : ""}
            {shown ?? "—"}
            {shown != null ? "PX" : ""}
          </span>
        </span>
      </div>
    </div>
  );
}

/**
 * A plate on the drawing sheet: bordered frame, registration ticks at opposite
 * corners, measurement grid behind the content, and a figure number.
 *
 * Figure numbers are the only numbering on the site. They label plates that the
 * annotations actually refer to, which is what a figure number is for — unlike
 * the decorative "01 / SECTION" kickers that index nothing.
 */
export function Figure({
  children,
  number,
  caption,
  aspect = "aspect-[4/3]",
  reveal = true,
  className,
}) {
  const [ref, inView] = useInView({ threshold: 0.15, once: true });

  return (
    <figure
      ref={ref}
      data-revealed={inView ? "true" : "false"}
      className={cn("relative", className)}
    >
      {/* The frame draws the ticks at -1px; clipping lives on the inner
          element so it can never cut them off. */}
      <div className={cn("plate plate-grid relative bg-surface", aspect)}>
        <div className="absolute inset-0 overflow-hidden">
          <div className={cn("absolute inset-0", reveal && "clip-reveal")}>
            {children}
          </div>
        </div>
      </div>

      {(number || caption) && (
        <figcaption className="mt-2.5 flex items-baseline gap-3">
          {number && <span className="annot shrink-0">FIG.{number}</span>}
          {caption && <span className="meta">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Leader line plus label, for calling out a value beside content.
 * Purely typographic — no motion of its own.
 */
export function Callout({ label, value, className }) {
  return (
    <div className={cn("flex items-baseline gap-2.5", className)}>
      <span className="annot shrink-0">{label}</span>
      <span className="h-px min-w-4 flex-1 bg-annot/25" aria-hidden="true" />
      <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-fg">
        {value}
      </span>
    </div>
  );
}
