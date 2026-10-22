"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/app/components/ui/Icons";
import { cn } from "@/app/lib/utils";

/**
 * A fanned stack of polaroids you can shuffle.
 *
 * virvid.ai fans three cards out beside its hero; novatsega.com tapes
 * polaroids to the page. This is both: a small pile of taped prints of the
 * work that spreads a little wider on hover and sends the top print to the
 * back when clicked.
 *
 * `items`: { key, src, alt, caption, href? }. `src` may be a static import.
 * Keyboard: the whole pile is one button ("Shuffle"), and the top print's
 * caption link is reachable after it.
 */

// Resting poses, top of the pile first. Spreading on hover scales these.
const POSES = [
  { x: "0%", y: "0px", r: "-3deg" },
  { x: "13%", y: "12px", r: "6deg" },
  { x: "-12%", y: "22px", r: "-9deg" },
  { x: "7%", y: "30px", r: "12deg" },
];

const LEAVE_MS = 380;

export default function PolaroidFan({ items, className }) {
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [leaving, setLeaving] = useState(false);
  const timer = useRef(0);

  const shuffle = () => {
    if (leaving) return;
    setLeaving(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeaving(false);
    }, LEAVE_MS);
  };

  const top = items[order[0]];

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={shuffle}
        className="fan relative mx-auto block aspect-[4/5] w-[min(62vw,20rem)] cursor-pointer rounded-sm focus-visible:outline-offset-8"
        aria-label={`Shuffle the photos. Showing: ${top.caption}`}
      >
        {order
          .map((itemIndex, depth) => ({ item: items[itemIndex], depth }))
          .reverse()
          .map(({ item, depth }) => {
            const pose = POSES[Math.min(depth, POSES.length - 1)];
            return (
              <span
                key={item.key}
                className="fan-card polaroid absolute inset-0 flex flex-col"
                data-leaving={depth === 0 && leaving ? "true" : "false"}
                style={{
                  "--x": pose.x,
                  "--y": pose.y,
                  "--r": pose.r,
                  zIndex: items.length - depth,
                }}
                aria-hidden="true"
              >
                <span
                  className={cn("tape -top-3 left-1/2 -ml-[38px]", depth % 2 && "tape-ember")}
                  style={{ "--tape-r": depth % 2 ? "5deg" : "-4deg" }}
                />
                <span className="relative block w-full flex-1 overflow-hidden rounded-[2px] bg-[#111]">
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="320px"
                    priority={depth < 2}
                    className="object-cover object-top"
                  />
                </span>
                <span className="flex h-14 items-center justify-center px-2 text-center font-hand text-[1.45rem] font-semibold leading-none text-[#3a2a1c]">
                  {item.caption}
                </span>
              </span>
            );
          })}
      </button>

      {/* The top print's link sits outside the button so both stay operable */}
      <div className="mt-12 flex h-6 items-center justify-center">
        {top.href ? (
          <Link href={top.href} className="link-arrow">
            Open {top.caption}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <span className="meta">{top.note ?? " "}</span>
        )}
      </div>
    </div>
  );
}
