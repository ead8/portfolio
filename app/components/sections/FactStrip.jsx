import React from "react";
import Marquee from "@/app/components/ui/Marquee";

/**
 * A strip of facts on the night colour, scrolling sideways.
 *
 * virvid.ai runs a band of glossy pills between its sections; these carry
 * things a reader can check (each one is in a case study or on the about
 * page), separated by pixel squares. Pauses on hover so a pill can be read.
 */
const FACTS = [
  "20+ systems shipped",
  "116× faster JSON validation",
  "400+ live markets, <1s",
  "Python · FastAPI · Django",
  "Next.js · React · TypeScript",
  "Built Sundial Lands solo",
  "Teams on four continents",
  "Published on PyPI",
];

export default function FactStrip() {
  // The tilt pushes the band's corners past the viewport; the outer box clips
  // them so a phone never gets a sideways scroll.
  return (
    <div className="relative z-[1] overflow-hidden py-3">
      <div className="-mx-2 -rotate-1 border-y-[1.5px] border-[#0d0d0b] bg-night py-3.5">
        <Marquee speed={46}>
          {FACTS.map((fact) => (
            <span key={fact} className="flex items-center">
              <span className="rounded-full bg-accent px-4 py-2 text-[0.875rem] font-semibold leading-none text-accent-fg">
                {fact}
              </span>
              <span className="px-dot mx-4 text-lime" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
