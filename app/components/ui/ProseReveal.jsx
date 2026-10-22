"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "@/app/lib/utils";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * A paragraph that inks itself in as you read down to it.
 *
 * groq.com's essay starts pale and each word darkens as the page scrolls past,
 * chasing the scroll on an eased copy (`eased += (target - eased) * 0.214` a
 * frame) so it keeps settling after the wheel stops. Words near the pointer
 * fade back toward the paper, as if the cursor were rubbing them out.
 *
 * Each word gets a `--lit` value from 0 to 1 and CSS turns that into ink, so
 * the loop never touches colour strings. It only runs while the paragraph is
 * on screen. Fully lit by the time the paragraph sits in the upper part of the
 * viewport, so nothing is left unreadable once it is in reading position.
 * Under reduced motion every word is simply lit.
 */
export default function ProseReveal({ text, className, as: Tag = "p" }) {
  const ref = useRef(null);
  const words = text.split(/\s+/);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = [...el.querySelectorAll("[data-word]")];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      spans.forEach((s) => s.style.setProperty("--lit", "1"));
      return;
    }

    const n = spans.length;
    const pointer = { x: -9999, y: -9999 };
    let centers = [];
    let eased = null;
    let frame = 0;
    let visible = false;

    const measure = () => {
      centers = spans.map((s) => [s.offsetLeft + s.offsetWidth / 2, s.offsetTop + s.offsetHeight / 2]);
    };

    const target = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top edge enters the lower part of the screen, 1 once the
      // bottom edge has risen to 70% of the viewport height
      const span = r.height + vh * 0.15;
      return Math.min(1, Math.max(0, (vh * 0.85 - r.top) / span));
    };

    const paint = () => {
      const r = el.getBoundingClientRect();
      const px = pointer.x - r.left;
      const py = pointer.y - r.top;
      const head = eased * (n + 4);
      let settling = false;

      for (let i = 0; i < n; i++) {
        let lit = Math.min(1, Math.max(0, (head - i) / 4));
        const [cx, cy] = centers[i];
        const d = Math.hypot(cx - px, cy - py);
        if (d < 110) {
          lit *= 0.25 + 0.75 * (d / 110);
          settling = true;
        }
        spans[i].style.setProperty("--lit", lit.toFixed(3));
      }
      return settling;
    };

    const tick = () => {
      frame = 0;
      const t = target();
      if (eased === null) eased = t;
      eased += (t - eased) * 0.214;
      paint();
      if (visible && Math.abs(t - eased) > 0.001) frame = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (visible && !frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (visible) paint();
    };

    measure();
    eased = target();
    paint();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      kick();
    });
    io.observe(el);

    const ro = new ResizeObserver(() => {
      measure();
      paint();
    });
    ro.observe(el);

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("pointermove", onMove);
    };
  }, [text]);

  return (
    <Tag ref={ref} className={cn("relative", className)}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span
            data-word=""
            style={{
              "--lit": 1,
              color: "oklch(var(--ink) / calc(0.17 + 0.83 * var(--lit)))",
              transition: "color 120ms linear",
            }}
          >
            {word}
          </span>{" "}
        </React.Fragment>
      ))}
    </Tag>
  );
}
