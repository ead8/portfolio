"use client";

import React from "react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Reveal from "@/app/components/ui/Reveal";
import { stackGroups } from "@/app/data/stack";

/**
 * Stack, grouped by layer.
 *
 * A definition list, not a six-cell card grid: this is reference data someone
 * scans for one answer ("does he own the backend?"), and a table answers that
 * faster than six bordered boxes. Logos are gone — a wall of brand marks is
 * decoration, and the names carry the same information at a quarter of the
 * visual weight.
 */
export default function Stack() {
  return (
    <section id="stack" className="border-t border-line py-20 lg:py-28">
      <div className="container-page">
        <SectionHeader
          label="Stack"
          title={["The tools I reach for, ", { text: "by layer", accent: true }, "."]}
          description="Deep in Python and TypeScript, comfortable elsewhere. I pick boring infrastructure so the interesting part can be the product."
        />

        <dl>
          {stackGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 50}>
              <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="meta pt-1">{group.label}</dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-2">
                  {group.items.map((item) => (
                    <span key={item.name} className="text-fluid-base text-fg-muted">
                      {item.name}
                    </span>
                  ))}
                </dd>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </dl>
      </div>
    </section>
  );
}
