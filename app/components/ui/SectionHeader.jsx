"use client";

import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";
import { ArrowUpRight } from "./Icons";
import { cn } from "@/app/lib/utils";

/**
 * Section heading, set out as a datum.
 *
 * The rule draws left to right beneath the annotation label, which is how a
 * baseline is established on a drawing. `label` names the section in the
 * annotation layer; there is no numbered kicker, because a number that indexes
 * nothing is scaffolding holding up nothing.
 */
export default function SectionHeader({ label, title, description, action, className }) {
  return (
    <header className={cn("mb-12 lg:mb-16", className)}>
      <Reveal>
        <div className="flex items-baseline justify-between gap-6">
          {label && <span className="annot">{label}</span>}
          {action && (
            <Link href={action.href} className="link-arrow shrink-0">
              {action.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
        <span className="datum mt-2.5 block h-px w-full bg-fg" />
      </Reveal>

      {title && (
        <TextReveal as="h2" text={title} className="headline mt-7 max-w-[20ch]" />
      )}

      {description && (
        <Reveal delay={100}>
          <p className="body mt-5 max-w-prose">{description}</p>
        </Reveal>
      )}
    </header>
  );
}
