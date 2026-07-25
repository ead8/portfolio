"use client";

import React from "react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Reveal from "@/app/components/ui/Reveal";
import { experience } from "@/app/data/profile";

/**
 * Career timeline.
 *
 * Period pinned left, detail right. The marker dots and connecting rail are
 * gone: they decorated a list that already reads chronologically, and on a
 * three-entry timeline a rail is scaffolding holding up nothing.
 */
export default function Experience() {
  return (
    <section id="experience" className="border-t border-line py-20 lg:py-28">
      <div className="container-page">
        <SectionHeader
          label="History"
          title={["Where I've ", { text: "worked", accent: true }, "."]}
        />

        <ol>
          {experience.map((role, i) => (
            <li key={`${role.org}-${role.period}`}>
              <Reveal delay={i * 60}>
                <div className="grid gap-4 border-t border-line py-10 lg:grid-cols-[11rem_1fr] lg:gap-12">
                  <div>
                    <p className="meta text-fg-muted">{role.period}</p>
                    <p className="meta mt-1">{role.location}</p>
                  </div>

                  <div>
                    <h3 className="title">{role.role}</h3>
                    <p className="mt-1 text-fluid-base text-fg-muted">{role.org}</p>

                    <p className="body mt-4 max-w-prose">{role.description}</p>

                    <ul className="mt-5 flex max-w-prose flex-col gap-2.5">
                      {role.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span
                            className="mt-[0.62em] h-px w-3 shrink-0 bg-line-strong"
                            aria-hidden="true"
                          />
                          <span className="body text-fluid-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="meta mt-6 text-fg-muted">
                      {role.stack.join(" · ")}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
          <div className="border-t border-line" />
        </ol>
      </div>
    </section>
  );
}
