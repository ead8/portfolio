import React from "react";
import SectionHeader from "@/app/components/ui/SectionHeader";
import Reveal from "@/app/components/ui/Reveal";
import { stackGroups } from "@/app/data/stack";

/**
 * Stack, grouped by layer.
 *
 * A definition list, not a grid of bordered cards: this is reference data
 * someone scans for one answer ("does he own the backend?"), and a
 * rule-separated table answers that faster than six boxes.
 *
 * There is deliberately no filter. Six rows fit on one screen, so a control
 * that hides rows would cost a click to save nothing — and the count badges it
 * needed only repeated numbers that were already visible.
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
              <div className="grid gap-3 border-t border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <dt className="annot pt-1">{group.label}</dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-2">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className="text-fluid-sm text-fg-muted transition-colors duration-150 hover:text-fg"
                    >
                      {item.name}
                    </span>
                  ))}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
