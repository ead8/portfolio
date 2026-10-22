"use client";

import React from "react";
import Link from "next/link";
import Reveal from "@/app/components/ui/Reveal";
import ProseReveal from "@/app/components/ui/ProseReveal";
import HandNote from "@/app/components/ui/HandNote";
import { ArrowUpRight } from "@/app/components/ui/Icons";
import { profile, yearsOfExperience } from "@/app/data/profile";

/**
 * Who, in one paragraph.
 *
 * The paragraph inks itself in as you scroll (groq), and the quick facts sit
 * on a sticky note pinned beside it at an angle (novatsega). The longer story
 * lives on /about; this is the version for someone skimming.
 */
const NOTE = [
  ["Shipping since", "2021"],
  ["Systems shipped", "20+"],
  ["Based in", "Addis Ababa"],
  ["Replies within", "24 hours"],
];

export default function AboutBlurb() {
  const years = yearsOfExperience();

  return (
    <section id="about" className="relative py-24 lg:py-36" aria-label="About">
      <div className="container-page">
        <Reveal className="flex items-baseline gap-4">
          <span className="annot inline-flex items-center gap-2">
            <span className="px-dot" aria-hidden="true" />
            About
          </span>
          <HandNote rotate={-2} className="text-[1.3rem] text-fg-faint">
            (the short version)
          </HandNote>
        </Reveal>

        <div className="mt-10 grid items-start gap-16 lg:grid-cols-[1fr_19rem] lg:gap-20">
          <ProseReveal
            className="max-w-[30ch] text-[clamp(1.75rem,1.2rem+2.4vw,3.25rem)] font-bold leading-[1.08] tracking-title"
            text={`I'm ${profile.firstName}, a full-stack engineer in Addis Ababa. For ${years} years I've built AI platforms, real-time trading tools and backends for teams on four continents. I care about the unglamorous parts: clean contracts, honest latency numbers, and migrations that never wake anyone up. That's what keeps a product standing after launch.`}
          />

          <Reveal delay={150} className="lg:pt-4">
            <div className="note rotate-[2.5deg] px-6 pb-6 pt-8 transition-transform duration-500 ease-out hover:rotate-0">
              <span className="tape -top-3 left-1/2 -ml-[38px]" style={{ "--tape-r": "-3deg" }} />
              <p className="font-hand text-[1.75rem] font-bold leading-none">quick facts</p>
              <dl className="mt-5 flex flex-col gap-3.5">
                {NOTE.map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-3 border-b border-dashed border-[#1f1a14]/30 pb-2">
                    <dt className="text-[0.875rem] text-[#574e40]">{label}</dt>
                    <dd className="font-mono text-[0.75rem] uppercase text-[#1f1a14]">{value}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase text-[#1f1a14] underline decoration-[#1f1a14]/30 underline-offset-4 hover:decoration-[#1f1a14]"
              >
                The longer story
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
