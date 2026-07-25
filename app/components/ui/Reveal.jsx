"use client";

import { useInView } from "@/app/lib/hooks";
import { cn } from "@/app/lib/utils";

/**
 * Scroll-triggered entrance.
 *
 * The transition itself is declared once in globals.css against `[data-reveal]`
 * — this component only toggles the attribute, so a page full of Reveals costs
 * one IntersectionObserver each and zero style recalculation per frame.
 *
 * Under `prefers-reduced-motion` the CSS forces the revealed state, so content
 * is never left invisible.
 */
export default function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  y = 10,
  threshold = 0.15,
  once = true,
  // Pulled out of `rest` so the spread below can't clobber the reveal vars
  style,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold, once });

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-revealed={inView ? "true" : "false"}
      className={cn(className)}
      style={{
        "--reveal-delay": `${delay}ms`,
        "--reveal-y": `${y}px`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
