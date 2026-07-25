"use client";

import React, { useMemo, useState } from "react";
import ProjectRow from "@/app/components/ui/ProjectRow";
import Reveal from "@/app/components/ui/Reveal";
import TextReveal from "@/app/components/ui/TextReveal";
import { projectCategories, projects } from "@/app/data/projects";
import { cn } from "@/app/lib/utils";

/**
 * Full work index.
 *
 * Filtering is client-side over an in-memory array; thirteen entries never
 * justify a round trip. Rows are not re-keyed on filter change, so switching
 * categories doesn't replay an entrance animation the visitor has already
 * watched once.
 */
export default function ProjectsIndex() {
  const [category, setCategory] = useState("All");

  const visible = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((project) => project.category === category),
    [category]
  );

  return (
    <>
      <section className="container-page pb-12 pt-20 sm:pt-28">
        <TextReveal
          as="h1"
          className="display max-w-[16ch]"
          text={["Everything I've ", { text: "shipped", accent: true }, "."]}
        />

        <Reveal delay={180}>
          <p className="lede mt-7 max-w-prose">
            Products, open-source libraries, and client engagements. Each entry
            covers the problem, the architecture, and exactly what I owned.
          </p>
        </Reveal>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[var(--header-height)] z-30 border-y border-line bg-bg/90 backdrop-blur">
        <div className="container-page no-scrollbar flex items-center gap-1 overflow-x-auto py-2.5">
          {projectCategories.map((item) => {
            const active = item === category;
            return (
              <button
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 rounded-xs border px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.08em] transition-colors duration-150 active:scale-[0.97]",
                  active
                    ? "border-fg bg-fg text-bg"
                    : "border-line text-fg-muted hover:border-fg-faint hover:text-fg"
                )}
              >
                {item}
              </button>
            );
          })}

          <span className="meta ml-auto hidden shrink-0 pl-4 sm:block">
            {visible.length} of {projects.length}
          </span>
        </div>
      </div>

      <section className="container-page pb-20">
        {visible.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            index={i}
            priority={i < 4}
          />
        ))}
        <div className="border-t border-line" />

        {visible.length === 0 && (
          <p className="py-20 text-center text-fluid-base text-fg-faint">
            Nothing in this category yet.
          </p>
        )}
      </section>
    </>
  );
}
