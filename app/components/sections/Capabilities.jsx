"use client";

import React from "react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Reveal from "@/app/components/ui/Reveal";
import { disciplines } from "@/app/data/profile";

/**
 * What I get hired to do.
 *
 * Previously three identical cards, each with a rounded-square icon tile above
 * a heading — the universal generated feature-card template. There is no icon
 * that meaningfully depicts "backend and data", so the icons were decoration
 * pretending to be information. Now it's a plain definition list with a rule
 * between entries, which is what the content actually is.
 */
export default function Capabilities() {
  return (
    <section id="capabilities" className="border-t border-line py-20 lg:py-28">
      <div className="container-page">
        <SectionHeader
          label="Capability"
          title={["What I'm hired ", { text: "to do", accent: true }, "."]}
          description="Most engagements land in one of these three. The overlap is the point: an AI feature nobody can operate isn't shipped, and a fast API nobody can use isn't a product."
        />

        <dl className="grid gap-x-12 gap-y-10 lg:grid-cols-3">
          {disciplines.map((discipline, i) => (
            <Reveal key={discipline.id} delay={i * 60}>
              <div className="border-t border-line pt-6">
                <dt className="title">{discipline.title}</dt>
                <dd>
                  <p className="body mt-3">{discipline.description}</p>
                  <p className="meta mt-5 text-fg-muted">
                    {discipline.keywords.join(" · ")}
                  </p>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
