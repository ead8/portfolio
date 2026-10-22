"use client";

import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";
import { ArrowUpRight } from "./Icons";
import { cn } from "@/app/lib/utils";

/**
 * Section heading: a pixel label, a heavy headline whose accented words get the
 * lime highlighter, and an optional line of description. `action` puts a link
 * at the far end of the label row.
 */
export default function SectionHeader({ label, title, description, action, className }) {
  return (
    <header className={cn("mb-12 lg:mb-16", className)}>
      <Reveal>
        <div className="flex items-baseline justify-between gap-6">
          {label && (
            <span className="annot inline-flex items-center gap-2">
              <span className="px-dot" aria-hidden="true" />
              {label}
            </span>
          )}
          {action && (
            <Link href={action.href} className="link-arrow shrink-0">
              {action.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </Reveal>

      {title && <TextReveal as="h2" text={title} className="headline mt-6 max-w-[18ch]" />}

      {description && (
        <Reveal delay={100}>
          <p className="body mt-5 max-w-prose">{description}</p>
        </Reveal>
      )}
    </header>
  );
}
