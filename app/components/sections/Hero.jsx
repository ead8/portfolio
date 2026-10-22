"use client";

import React from "react";
import Link from "next/link";
import Reveal from "@/app/components/ui/Reveal";
import TextReveal from "@/app/components/ui/TextReveal";
import HeroName from "@/app/components/ui/HeroName";
import HandNote from "@/app/components/ui/HandNote";
import PolaroidFan from "@/app/components/ui/PolaroidFan";
import { ArrowUpRight, Download } from "@/app/components/ui/Icons";
import { profile, yearsOfExperience } from "@/app/data/profile";
import { useLocalTime } from "@/app/lib/hooks";

/**
 * First screen.
 *
 * The name runs edge to edge in heavy capitals (groq), a one-line claim sits
 * under it with its key words highlighted (virvid), and a pile of taped
 * polaroids of the work waits to be shuffled (novatsega + virvid's fanned
 * cards). Notes in the margin are handwritten.
 *
 * Everything stated is checkable: the figures come from the case studies.
 */
export default function Hero({ prints = [] }) {
  const localTime = useLocalTime(profile.timezone);
  const years = yearsOfExperience();

  return (
    <section className="relative overflow-x-clip pb-20 pt-8 sm:pt-12 lg:pb-28" aria-label="Introduction">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="annot inline-flex items-center gap-2">
            <span className="px-dot" aria-hidden="true" />
            {profile.role}
          </span>
          <span className="meta">Python · FastAPI · Next.js</span>
          <span className="meta inline-flex items-center gap-2" suppressHydrationWarning>
            {profile.location.split(",")[0]} {localTime ?? "--:--"}
          </span>
          {profile.available && (
            <span className="ml-auto hidden items-center gap-2 rounded-full bg-lime px-3 py-1.5 font-mono text-[0.625rem] uppercase leading-none text-[#0d0d0b] sm:inline-flex">
              <span className="px-dot" aria-hidden="true" />
              {profile.availability}
            </span>
          )}
        </Reveal>

        <Reveal delay={80} y={24} className="mt-6 sm:mt-8">
          <HeroName text={profile.name} />
        </Reveal>

        <div className="mt-12 grid items-start gap-14 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <TextReveal
              as="h1"
              className="headline max-w-[16ch]"
              text={[
                "I build AI platforms and backends that ",
                { text: "hold up in production", accent: true },
                ".",
              ]}
            />

            <Reveal delay={200}>
              <p className="lede mt-7 max-w-[54ch]">
                {years}&nbsp;years in, I&apos;m who teams call when the prototype has to
                become the product. Lately: an arbitrage terminal scoring 400+ live
                markets in under a second, a land-buying platform built solo, and a
                JSON validator on PyPI that runs 116&times; faster than the one it
                replaced.
              </p>
            </Reveal>

            <Reveal delay={280} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={profile.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                Book an intro call
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link href="/projects" className="btn btn-secondary">
                See the work
              </Link>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="link-arrow ml-1">
                <Download className="h-3.5 w-3.5" />
                Résumé
              </a>
            </Reveal>

            <Reveal delay={420} className="mt-14 hidden lg:block">
              <HandNote arrow="left" rotate={-4} className="text-fg-faint">
                psst — the little orange critters
                <br />
                around the page? you can catch them.
              </HandNote>
            </Reveal>
          </div>

          <Reveal delay={160} className="relative lg:pt-2">
            <HandNote
              arrow="down"
              rotate={6}
              className="absolute -top-10 right-2 z-10 text-fg-faint sm:right-10 lg:-right-2"
            >
              click to shuffle
            </HandNote>
            <PolaroidFan items={prints} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
