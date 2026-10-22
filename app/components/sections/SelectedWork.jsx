"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/app/components/ui/Reveal";
import TextReveal from "@/app/components/ui/TextReveal";
import HandNote from "@/app/components/ui/HandNote";
import ProjectArtwork from "@/app/components/ui/ProjectArtwork";
import { ArrowUpRight } from "@/app/components/ui/Icons";

/**
 * The work, after dark.
 *
 * A band in virvid.ai's night palette with novatsega.com's scalloped edge cut
 * into the top and bottom. Inside, each project is a dark card taped to the
 * band at a slight angle; hovering straightens it, lifts it and wakes a lime
 * glow (virvid's card shadow).
 *
 * The order is editorial, so it lives here. `projects` arrives as a prop: a
 * client component must not import the corpus itself — see projectIndex.js.
 */
const FEATURED = ["prediction-market-terminal", "sundial-lands", "jsonguard", "launchpad"];
const TILTS = ["-1.4deg", "1.1deg", "0.9deg", "-1deg"];

export default function SelectedWork({ projects = [] }) {
  const featured = FEATURED.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean);
  const more = projects.length - featured.length;

  return (
    <section id="work" className="theme-night scallop relative z-[1] bg-night py-28 lg:py-36">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="annot inline-flex items-center gap-2">
            <span className="px-dot" aria-hidden="true" />
            Selected work
          </span>
          <HandNote rotate={-2} className="text-[1.3rem] text-fg-faint">
            a few favourites, {more} more inside
          </HandNote>
        </Reveal>

        <TextReveal
          as="h2"
          className="headline mt-6 max-w-[14ch]"
          text={["Things I've ", { text: "shipped", accent: true }, " lately."]}
        />

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-14">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 120}>
              <WorkCard project={project} tilt={TILTS[i % TILTS.length]} priority={i < 2} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center gap-5">
          <Link href="/projects" className="btn btn-accent">
            All {projects.length} projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <HandNote arrow="left" rotate={-3} className="text-fg-faint">
            the full archive, warts and all
          </HandNote>
        </Reveal>
      </div>
    </section>
  );
}

function WorkCard({ project, tilt, priority }) {
  const metrics = (project.metrics ?? []).slice(0, 2);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="night-card group relative block p-2.5 [transform:rotate(var(--tilt))] hover:[transform:rotate(0deg)_translate3d(0,-6px,0)] focus-visible:[transform:rotate(0deg)]"
      style={{ "--tilt": tilt }}
    >
      <span className="tape -top-3 left-8" style={{ "--tape-r": tilt.startsWith("-") ? "-6deg" : "4deg" }} />

      <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] bg-surface">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 620px"
            priority={priority}
            placeholder={project.cover.blurDataURL ? "blur" : "empty"}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="plate-grid absolute inset-0 p-6">
            <ProjectArtwork kind={project.artwork} />
          </div>
        )}
      </div>

      <div className="px-3 pb-3 pt-5">
        <div className="flex items-center justify-between gap-4">
          <span className="meta">{project.category}</span>
          <span className="meta">{project.year}</span>
        </div>
        <h3 className="mt-3 flex items-start justify-between gap-4 text-fluid-xl font-bold tracking-title text-fg">
          {project.title}
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-fg-faint transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime" />
        </h3>
        <p className="body mt-1.5">{project.tagline}</p>

        {metrics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {metrics.map((m) => (
              <span
                key={m.label}
                className="inline-flex items-center gap-2 rounded-full border border-lime/40 px-3 py-1.5 text-[0.8125rem] leading-none text-fg-muted"
              >
                <span className="font-mono text-[0.75rem] text-lime">{m.value}</span>
                {m.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
