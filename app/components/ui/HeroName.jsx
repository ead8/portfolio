"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "@/app/lib/utils";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const HEAVY = 800;
const LIGHT = 220;
const RADIUS = 260;

/**
 * The name, set as big as the column allows.
 *
 * groq.com sets its claim in huge, tight capitals justified edge to edge. Here
 * the letters are spread across the full width the same way, then sized to
 * fill it exactly (measured, not guessed, so a long name never overflows).
 *
 * The display face is variable, so each letter's weight answers the pointer:
 * letters near the cursor thin out to a hairline and fill back in behind it,
 * the way groq's prose lightens under the pointer. Eased per frame, and the
 * loop only runs while the pointer is near or a letter is still settling.
 */
export default function HeroName({ text, className }) {
  const boxRef = useRef(null);
  const lettersRef = useRef([]);

  // Fit: letters are measured at full weight, then the size is scaled so their
  // combined width fills ~94% of the line, leaving the rest as justified gaps.
  useIsoLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const fit = () => {
      box.style.fontSize = "100px";
      const total = lettersRef.current.reduce((sum, el) => sum + (el?.offsetWidth ?? 0), 0);
      if (!total) return;
      const size = Math.min(260, (box.clientWidth * 0.94 * 100) / total);
      box.style.fontSize = `${size}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    // Webfont swap changes the metrics; refit once it lands
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const letters = lettersRef.current.filter(Boolean);
    const weights = letters.map(() => HEAVY);
    const pointer = { x: -9999, y: -9999 };
    let frame = 0;

    const tick = () => {
      frame = 0;
      let moving = false;

      letters.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(r.left + r.width / 2 - pointer.x, r.top + r.height / 2 - pointer.y);
        const near = Math.max(0, 1 - d / RADIUS);
        const target = HEAVY - (HEAVY - LIGHT) * near * near;
        weights[i] += (target - weights[i]) * 0.18;
        if (Math.abs(target - weights[i]) > 0.5) moving = true;
        el.style.fontVariationSettings = `"wght" ${weights[i].toFixed(1)}`;
      });

      if (moving) frame = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      pointer.x = pointer.y = -9999;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [text]);

  const words = text.split(" ");
  let index = 0;

  return (
    <p
      ref={boxRef}
      aria-label={text}
      className={cn(
        "flex w-full select-none items-baseline justify-between whitespace-nowrap font-sans uppercase leading-[0.8] tracking-[-0.02em] text-fg",
        className
      )}
      style={{ fontSize: "clamp(3.5rem, 14vw, 13rem)" }}
    >
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          {wi > 0 && <span aria-hidden="true" className="w-[0.12em]" />}
          {[...word].map((ch) => {
            const i = index++;
            return (
              <span
                key={i}
                aria-hidden="true"
                ref={(el) => (lettersRef.current[i] = el)}
                className="inline-block"
                style={{ fontVariationSettings: `"wght" ${HEAVY}` }}
              >
                {ch}
              </span>
            );
          })}
        </React.Fragment>
      ))}
    </p>
  );
}
