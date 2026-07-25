"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/app/components/ui/Reveal";
import SectionHeader from "@/app/components/ui/SectionHeader";
import ProjectArtwork from "@/app/components/ui/ProjectArtwork";
import { Callout, Figure } from "@/app/components/ui/Measure";
import { ArrowUpRight } from "@/app/components/ui/Icons";
import { featuredProjects, projects } from "@/app/data/projects";
import { cn, pad } from "@/app/lib/utils";

/**
 * Featured work as numbered plates.
 *
 * Each entry is a figure with registration ticks and a grid behind it, wiped
 * open with clip-path rather than faded — the image is uncovered, like a drawing
 * being laid down. Sides alternate so the sheet doesn't fall into a card grid.
 *
 * No hover zoom on the plates. Scaling an image under the cursor is decoration
 * on a surface the reader is trying to look at.
 */
export default function SelectedWork() {
  const entries = featuredProjects.slice(0, 3);

  return (
    <section id="work" className="border-t border-line py-16 lg:py-24">
      <div className="container-page">
        <SectionHeader
          label="Selected work"
          title={["Three of ", { text: `${projects.length} plates`, accent: true }, "."]}
          action={{ label: `Full index`, href: "/projects" }}
        />

        <div className="flex flex-col gap-16 lg:gap-24">
          {entries.map((project, i) => (
            <WorkPlate
              key={project.slug}
              project={project}
              number={pad(i + 1)}
              flipped={i % 2 === 1}
              priority={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkPlate({ project, number, flipped, priority }) {
  return (
    <article className="group relative grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
      {/* contain, not cover: every cover is a full browser screenshot, and
          cropping one to fill the plate hides most of the page. */}
      <Figure
        number={number}
        // The title is the heading immediately beside this plate; repeating it
        // in the caption is the same text twice in one container.
        caption={project.timeline}
        mounted={Boolean(project.cover)}
        className={cn(flipped && "lg:order-2")}
      >
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 620px"
            placeholder="blur"
            className="object-contain"
          />
        ) : (
          <ProjectArtwork kind={project.artwork} />
        )}
      </Figure>

      <div className={cn(flipped && "lg:order-1")}>
        <Reveal>
          <p className="meta">{project.category}</p>

          <h3 className="mt-3 text-fluid-xl font-medium tracking-title">
            <Link
              href={`/projects/${project.slug}`}
              className="text-fg transition-colors duration-150 hover:text-accent"
            >
              {project.title}
              {/* Stretched hit area: one anchor, one tab stop for the plate */}
              <span className="absolute inset-0" />
            </Link>
          </h3>

          <p className="body mt-3 max-w-[44ch]">{project.tagline}</p>

          {project.metrics?.length > 0 && (
            <div className="mt-7 flex flex-col gap-2.5 border-t border-line pt-5">
              {project.metrics.map((metric) => (
                <Callout
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                />
              ))}
            </div>
          )}

          <p className="mt-6 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.08em] text-fg-faint">
            {project.stack.slice(0, 5).join(" / ")}
          </p>

          <span className="link-arrow mt-6 inline-flex">
            Read the case study
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </Reveal>
      </div>
    </article>
  );
}
