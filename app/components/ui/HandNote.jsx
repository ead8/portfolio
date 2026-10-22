import React from "react";
import { cn } from "@/app/lib/utils";

/**
 * A note scribbled in the margin, with a hand-drawn arrow.
 *
 * novatsega.com writes its asides in Caveat; this keeps that voice for the
 * small, human remarks a portfolio otherwise has nowhere to put. `arrow` picks
 * which way the arrow points: "down", "left", "right" or "up".
 */
const ARROWS = {
  down: "M6 4c10 6 18 18 14 34m0 0-7-8m7 8 6-9",
  left: "M44 8C30 4 14 10 6 22m0 0 1-10m-1 10 10-2",
  right: "M4 8c14-4 30 2 38 14m0 0-1-10m1 10-10-2",
  up: "M20 40C10 30 8 18 14 6m0 0-7 8m7-8 6 9",
};

export default function HandNote({ children, arrow, className, arrowClassName, rotate = -3 }) {
  return (
    <span
      className={cn("hand inline-flex items-start gap-1", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {arrow === "left" && <Arrow d={ARROWS.left} className={arrowClassName} />}
      {arrow === "up" && <Arrow d={ARROWS.up} className={arrowClassName} />}
      <span>{children}</span>
      {arrow === "right" && <Arrow d={ARROWS.right} className={arrowClassName} />}
      {arrow === "down" && <Arrow d={ARROWS.down} className={arrowClassName} />}
    </span>
  );
}

function Arrow({ d, className }) {
  return (
    <svg
      viewBox="0 0 48 44"
      className={cn("h-9 w-10 shrink-0 text-accent", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
