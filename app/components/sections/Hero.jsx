"use client";

import React from "react";
import Link from "next/link";
import Reveal from "@/app/components/ui/Reveal";
import TextReveal from "@/app/components/ui/TextReveal";
import { Callout, Dimension } from "@/app/components/ui/Measure";
import { ArrowUpRight } from "@/app/components/ui/Icons";
import { profile, specification, yearsOfExperience } from "@/app/data/profile";
import { useLocalTime } from "@/app/lib/hooks";

/**
 * Title block.
 *
 * Laid out like the title block on a drawing sheet: the subject on the left,
 * the specification table on the right, a dimension line measuring the headline.
 *
 * The dimension label is a real measurement of the h1 — resize the window and it
 * changes. That is the one flourish the page opens with, and it earns a longer
 * beat because a visitor sees it once.
 */
export default function Hero() {
  const localTime = useLocalTime(profile.timezone);
  const years = yearsOfExperience();

  return (
    <section className="container-page pb-16 pt-16 sm:pt-20 lg:pb-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_15rem] lg:gap-16">
        {/* Subject */}
        <div>
          <Dimension label="H1">
            <TextReveal
              as="h1"
              className="display max-w-[24ch]"
              text={[
                "I build AI platforms and backends that hold up ",
                { text: "in production", accent: true },
                ".",
              ]}
            />
          </Dimension>

          <Reveal delay={200}>
            <p className="lede mt-8 max-w-prose">
              Senior full-stack engineer, {years} years in. Python, FastAPI, and
              Next.js on systems where correctness is the requirement: a
              cross-exchange arbitrage terminal, a land-valuation pipeline, a
              JSON validator on PyPI that runs 116&times; faster than the
              library it replaced.
            </p>
          </Reveal>

          <Reveal delay={280} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={profile.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              Book an intro call
            </a>

            <Link href="/projects" className="btn btn-secondary">
              See the work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* Specification table */}
        <Reveal delay={340} className="lg:pt-2">
          <div className="border-t border-fg pt-3">
            <p className="annot mb-4">Specification</p>
            <div className="flex flex-col gap-3">
              {specification.map((row) => (
                <Callout key={row.label} label={row.label} value={row.value} />
              ))}
              <Callout
                label="Time"
                value={`${localTime ?? "--:--"} ${profile.utcOffset}`}
              />
              <Callout
                label="Status"
                value={profile.available ? "Available" : "Booked"}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
