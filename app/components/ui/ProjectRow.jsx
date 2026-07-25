"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectArtwork from "./ProjectArtwork";
import { ArrowUpRight } from "./Icons";
import { pad } from "@/app/lib/utils";

/**
 * One line in the index, set out like a drawing register: plate number,
 * thumbnail, title, classification, date.
 *
 * A register of rows rather than a grid of equal cards — it scans faster, fits
 * the whole body of work above the fold, and doesn't force thirteen different
 * projects into one icon-heading-paragraph mould. The thumbnail is static: a
 * hover zoom on every row would be constant motion for no information.
 */
export default function ProjectRow({ project, index = 0, priority = false }) {
  return (
    <article className="group relative border-t border-line">
      <div className="flex items-center gap-4 py-5 sm:gap-6">
        <span className="annot hidden w-10 shrink-0 tabular-nums sm:block">
          {pad(index + 1)}
        </span>

        {/* A plain bordered thumbnail. Registration ticks on all fourteen rows
            would be noise; they belong to full plates. */}
        <div className="relative hidden h-14 w-20 shrink-0 overflow-hidden border border-line bg-surface sm:block">
          {project.cover ? (
            <Image
              src={project.cover}
              alt=""
              fill
              priority={priority}
              sizes="80px"
              placeholder="blur"
              className="object-cover object-top"
            />
          ) : (
            <ProjectArtwork kind={project.artwork} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          {/* h2, not h3: on the index each project sits directly under the page
              h1, and jumping a level breaks the outline. */}
          <h2 className="text-fluid-lg font-medium tracking-title">
            <Link
              href={`/projects/${project.slug}`}
              className="text-fg transition-colors duration-150 hover:text-accent"
            >
              {project.title}
              <span className="absolute inset-0" />
            </Link>
          </h2>
          <p className="body mt-1 line-clamp-1 text-fluid-sm">{project.tagline}</p>
        </div>

        <div className="hidden w-44 shrink-0 lg:block">
          <p className="meta">{project.category}</p>
          <p className="meta mt-1.5">{project.stack[0]}</p>
        </div>

        <span className="meta hidden w-12 shrink-0 text-right tabular-nums sm:block">
          {project.year}
        </span>

        <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-faint transition-colors duration-150 group-hover:text-accent" />
      </div>
    </article>
  );
}
