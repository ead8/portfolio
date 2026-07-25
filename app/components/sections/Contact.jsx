"use client";

import React from "react";
import Reveal from "@/app/components/ui/Reveal";
import TextReveal from "@/app/components/ui/TextReveal";
import { Check, Copy } from "@/app/components/ui/Icons";
import { profile } from "@/app/data/profile";
import { useCopy, useLocalTime } from "@/app/lib/hooks";

/**
 * Closing call to action.
 *
 * The availability dot is static. A pulsing dot makes a hard-coded string look
 * like live telemetry, which it isn't.
 */
export default function Contact() {
  const [copied, copy] = useCopy();
  const localTime = useLocalTime(profile.timezone);

  return (
    <section id="contact" className="border-t border-line py-20 lg:py-28">
      <div className="container-page">
        <TextReveal
          as="h2"
          className="display max-w-[15ch]"
          text={["Got something to build? ", { text: "Let's talk", accent: true }, "."]}
        />

        <Reveal delay={180}>
          <p className="lede mt-7 max-w-prose">
            A full build, an AI integration, or a second opinion on
            architecture. Most projects start with a thirty-minute call, and I
            reply to every serious enquiry within a day.
          </p>
        </Reveal>

        <Reveal delay={260} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={profile.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
          >
            Book an intro call
          </a>

          <a
            href={`mailto:${profile.email}?subject=Project%20enquiry`}
            className="btn btn-secondary"
          >
            {profile.email}
          </a>

          <button
            onClick={() => copy(profile.email)}
            className="btn btn-ghost"
            aria-label="Copy email address"
          >
            {copied ? (
              <Check className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </Reveal>

        <Reveal delay={320} className="mt-16 border-t border-line pt-5">
          <dl className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <dt className="sr-only">Status</dt>
              <dd className="meta text-fg-muted">
                {profile.available ? "Open to new work" : "Currently booked"}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="meta">Local time</dt>
              <dd className="meta tabular-nums text-fg-muted">
                {localTime ?? "--:--"} {profile.utcOffset}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="meta">Response</dt>
              <dd className="meta text-fg-muted">Within 24 hours</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
