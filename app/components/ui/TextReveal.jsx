"use client";

import React from "react";
import { useInView } from "@/app/lib/hooks";
import { cn } from "@/app/lib/utils";

/**
 * Headline reveal: each word rides up from behind a clipping mask, staggered.
 *
 * `text` accepts a plain string, or an array of segments so parts of a headline
 * can be accented:
 *   <TextReveal text={["I build ", { text: "systems", accent: true }]} />
 *
 * Splitting happens on word boundaries with the whitespace preserved as real
 * text nodes, so assistive tech reads a normal sentence. (Character-level
 * splitting is what forces the usual `aria-hidden` + `sr-only` duplicate, and
 * that duplicate is what makes crawlers see the headline twice.)
 */
export default function TextReveal({
  as: Tag = "h2",
  text,
  className,
  wordClassName,
  stagger = 42,
  delay = 0,
  threshold = 0.3,
}) {
  const [ref, inView] = useInView({ threshold, once: true });

  const segments = Array.isArray(text) ? text : [{ text }];

  // Flatten to a single word list while remembering which segment each came
  // from, so the stagger counter runs continuously across accented spans.
  let wordIndex = 0;
  const rendered = segments.map((segment, si) => {
    const value = typeof segment === "string" ? segment : segment.text;
    const accent = typeof segment === "string" ? false : segment.accent;

    return (
      <span key={si} className={accent ? "text-accent" : undefined}>
        {value.split(/(\s+)/).map((chunk, ci) => {
          // split() emits empty strings at segment boundaries — dropping them
          // avoids a doubled space where an accented span begins
          if (chunk === "") return null;
          if (!chunk.trim()) return <span key={ci}> </span>;
          const d = delay + wordIndex * stagger;
          wordIndex += 1;
          return (
            <span key={ci} className="text-reveal-line">
              <span
                className={cn("text-reveal-word", wordClassName)}
                style={{ "--word-delay": `${d}ms` }}
              >
                {chunk}
              </span>
            </span>
          );
        })}
      </span>
    );
  });

  return (
    <Tag
      ref={ref}
      data-revealed={inView ? "true" : "false"}
      className={cn("[&_.text-reveal-line]:inline-block", className)}
    >
      {rendered}
    </Tag>
  );
}
