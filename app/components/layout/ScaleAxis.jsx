"use client";

import { useEffect, useRef } from "react";

/**
 * Ruler down the left margin, reading true scroll offset in CSS pixels.
 *
 * This is the signature of the whole system, and it is honest: the readout is
 * `window.scrollY`, and the ticks are laid out against real document height. It
 * replaces the reading-progress bar, which showed a percentage nobody needs
 * while a scrollbar was already showing the same thing.
 *
 * The readout is written straight to the DOM inside a rAF — no React state, so
 * scrolling costs no re-renders. Desktop only; on narrow viewports there is no
 * margin to put it in.
 */
export default function ScaleAxis() {
  const offsetRef = useRef(null);
  const cursorRef = useRef(null);
  const totalRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = Math.round(window.scrollY);

      if (offsetRef.current) {
        offsetRef.current.textContent = String(y).padStart(4, "0");
      }
      if (totalRef.current) {
        totalRef.current.textContent = String(Math.round(max));
      }
      if (cursorRef.current) {
        const ratio = max > 0 ? Math.min(1, y / max) : 0;
        cursorRef.current.style.transform = `translate3d(0, ${ratio * 100}%, 0)`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-4 top-[var(--header-height)] bottom-0 z-40 hidden w-8 select-none xl:block"
      aria-hidden="true"
    >
      {/* Axis */}
      <div className="relative ml-3 h-full w-px bg-line">
        {/* Graduations, every 5% of the track */}
        {Array.from({ length: 21 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-0 h-px bg-line"
            style={{
              top: `${i * 5}%`,
              width: i % 4 === 0 ? "7px" : "3px",
            }}
          />
        ))}

        {/* Cursor: sits at the true scroll ratio */}
        <span
          ref={cursorRef}
          className="absolute left-0 top-0 h-px w-3.5 bg-accent"
          style={{ transform: "translate3d(0, 0, 0)" }}
        />
      </div>

      {/* Readout running along the axis.
          `writing-mode` rather than rotate(90deg): rotating about the top-left
          corner pushes the glyph box off the left edge of the window, where it
          was getting clipped. Vertical writing mode reserves the space properly. */}
      <div className="absolute left-0 top-6 [writing-mode:vertical-rl]">
        <span className="annot tabular-nums whitespace-nowrap">
          Y<span ref={offsetRef}>0000</span>
          <span className="text-fg-faint"> / </span>
          <span ref={totalRef} className="text-fg-faint">
            0
          </span>
          PX
        </span>
      </div>
    </div>
  );
}
