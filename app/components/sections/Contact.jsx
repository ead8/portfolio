"use client";

import React from "react";
import Reveal from "@/app/components/ui/Reveal";
import TextReveal from "@/app/components/ui/TextReveal";
import HandNote from "@/app/components/ui/HandNote";
import { ArrowUpRight, Check, Copy } from "@/app/components/ui/Icons";
import { profile } from "@/app/data/profile";
import { useCopy, useLocalTime } from "@/app/lib/hooks";

/**
 * Closing call to action.
 *
 * Ends like groq.com does: the biggest type on the page, in capitals. The
 * practical details sit on a sticky note (novatsega), and a handful of pixel
 * stars twinkle in turn around the headline — novatsega's rotating list, five
 * items 600ms apart on a 3.2s loop. Few choices: one call, one email.
 *
 * The brief template lowers the cost of the first message; nobody has to work
 * out what to write.
 */
const BRIEF = encodeURIComponent(
  [
    "Hi Ebisa,",
    "",
    "What we're building:",
    "",
    "Where it is today (idea / prototype / in production):",
    "",
    "What good looks like in three months:",
    "",
    "Timeline and budget range:",
    "",
  ].join("\n")
);

const STARS = [
  { top: "6%", left: "62%", size: 18, tone: "text-accent" },
  { top: "30%", left: "92%", size: 12, tone: "text-fg" },
  { top: "58%", left: "4%", size: 14, tone: "text-accent" },
  { top: "2%", left: "18%", size: 10, tone: "text-fg-faint" },
  { top: "74%", left: "70%", size: 16, tone: "text-accent" },
];

export default function Contact() {
  const [copied, copy] = useCopy();
  const localTime = useLocalTime(profile.timezone);

  return (
    <section id="contact" className="relative overflow-hidden py-28 lg:py-40" aria-label="Contact">
      <div className="container-page relative">
        <Reveal className="flex items-baseline gap-4">
          <span className="annot inline-flex items-center gap-2">
            <span className="px-dot" aria-hidden="true" />
            Next step
          </span>
        </Reveal>

        <div className="relative mt-8">
          {STARS.map((s, i) => (
            <PixelStar key={i} index={i} {...s} />
          ))}
          <TextReveal
            as="h2"
            className="relative max-w-[15ch] font-sans text-[clamp(3.25rem,1.5rem+8.4vw,10rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.045em] text-fg"
            text={["Let's build something ", { text: "real", accent: true }, "."]}
          />
        </div>

        <div className="mt-16 grid items-start gap-14 lg:grid-cols-[1fr_21rem] lg:gap-20">
          <div>
            <Reveal delay={160}>
              <p className="lede max-w-[52ch]">
                A full build, an AI integration, or a second opinion on an architecture
                that worries you. Thirty minutes on a call is usually enough to tell
                whether I&apos;m the right person, and I&apos;ll say so either way.
              </p>
            </Reveal>

            <Reveal delay={240} className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={profile.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                Book an intro call
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={`mailto:${profile.email}?subject=Project%20brief&body=${BRIEF}`} className="btn btn-secondary">
                Send a brief
              </a>
              <button onClick={() => copy(profile.email)} className="btn btn-ghost" aria-label="Copy email address">
                {copied ? <Check className="h-4 w-4 text-annot" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : profile.email}
              </button>
            </Reveal>

            <Reveal delay={340} className="mt-12 hidden sm:block">
              <HandNote arrow="up" rotate={-3} className="text-fg-faint">
                the brief button fills in the questions for you
              </HandNote>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="note -rotate-2 px-6 pb-6 pt-8 transition-transform duration-500 ease-out hover:rotate-0">
              <span className="tape tape-ember -top-3 right-8" style={{ "--tape-r": "6deg" }} />
              <p className="font-hand text-[1.75rem] font-bold leading-none">before you write</p>
              <dl className="mt-5 flex flex-col gap-3.5">
                <Row label="Status" value={profile.available ? "Open to work" : "Booked"} />
                <Row label="My time" value={`${localTime ?? "--:--"} ${profile.utcOffset}`} />
                <Row label="Reply" value="Within 24h" />
                <Row label="First call" value="30 min, free" />
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-[#1f1a14]/30 pb-2">
      <dt className="text-[0.875rem] text-[#574e40]">{label}</dt>
      <dd className="font-mono text-[0.75rem] uppercase text-[#1f1a14]" suppressHydrationWarning>
        {value}
      </dd>
    </div>
  );
}

/** A five-pixel plus, twinkling in turn with its siblings */
function PixelStar({ top, left, size, tone, index }) {
  return (
    <svg
      viewBox="0 0 5 5"
      shapeRendering="crispEdges"
      className={`twinkle pointer-events-none absolute ${tone}`}
      style={{ top, left, width: size, height: size, "--i": index }}
      aria-hidden="true"
    >
      <path d="M2 0h1v2h2v1H3v2H2V3H0V2h2z" fill="currentColor" />
    </svg>
  );
}
