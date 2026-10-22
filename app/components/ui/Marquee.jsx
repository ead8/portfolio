"use client";

import React from "react";
import { cn } from "@/app/lib/utils";

/**
 * Continuous horizontal marquee.
 *
 * Content is rendered twice and translated by exactly half its width, so the
 * loop is seamless at any content length. Motion is a single CSS animation on
 * the compositor: no JavaScript per frame, and it pauses on hover so a name can
 * be read. Under reduced motion the track stands still and wraps.
 */
export default function Marquee({
  children,
  speed = 40, // seconds per loop
  reverse = false,
  className,
  trackClassName,
}) {
  return (
    <div
      className={cn("marquee group relative w-full overflow-hidden", className)}
      style={{ "--marquee-duration": `${speed}s` }}
    >
      <div
        className={cn(
          "marquee-track flex w-max items-center",
          reverse && "marquee-reverse",
          trackClassName
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
