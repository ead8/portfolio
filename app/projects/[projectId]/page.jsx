import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Reveal from "@/app/components/ui/Reveal";
import TextReveal from "@/app/components/ui/TextReveal";
import ProjectArtwork from "@/app/components/ui/ProjectArtwork";
import Contact from "@/app/components/sections/Contact";
import { ArrowLeft, ArrowUpRight } from "@/app/components/ui/Icons";

import { allProjectParams, getProject, nextProject } from "@/app/data/projects";
import { projectJsonLd } from "@/app/lib/site";
import { Figure } from "@/app/components/ui/Measure";
import { pad, prettyUrl } from "@/app/lib/utils";

/**
 * Case study.
 *
 * Server-rendered and statically generated, so crawlers and link previews get
 * the full page rather than an empty shell.
 */

export function generateStaticParams() {
  return allProjectParams();
}

export function generateMetadata({ params }) {
  const project = getProject(params.projectId);
  if (!project) return { title: "Project not found" };

  const url = `/projects/${project.slug}`;

  return {
    title: project.title,
    description: `${project.tagline}. ${project.summary[0].slice(0, 150)}…`,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${project.title} — ${project.tagline}`,
      description: project.summary[0],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.tagline}`,
      description: project.tagline,
    },
  };
}

export default function ProjectPage({ params }) {
  const project = getProject(params.projectId);
  if (!project) notFound();

  const next = nextProject(project.slug);
  const { links } = project;

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />

      <header className="container-page pb-12 pt-16 sm:pt-20">
        <Reveal className="mb-12">
          <Link href="/projects" className="link-arrow">
            <ArrowLeft className="h-3.5 w-3.5" />
            All work
          </Link>
        </Reveal>

        <Reveal className="mb-5 flex items-center gap-3">
          <span className="meta">{project.year}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
          <span className="meta">{project.category}</span>
        </Reveal>

        <TextReveal as="h1" className="display max-w-[14ch]" text={project.title} />

        <Reveal delay={180}>
          <p className="lede mt-6 max-w-prose">{project.tagline}</p>
        </Reveal>

        {(links.live || links.source) && (
          <Reveal delay={250} className="mt-9 flex flex-wrap gap-3">
            {links.live && (
              <a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                Visit live site
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {links.source && (
              <a
                href={links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Source code
              </a>
            )}
          </Reveal>
        )}
      </header>

      {/* Cover plate */}
      <div className="container-page">
        <Figure
          number={pad(project.id, 2)}
          caption={project.role}
          mounted={Boolean(project.cover)}
        >
          {project.cover ? (
            <Image
              src={project.cover}
              alt={`${project.title} interface`}
              fill
              priority
              sizes="(max-width: 1240px) 100vw, 1240px"
              placeholder="blur"
              className="object-contain"
            />
          ) : (
            <ProjectArtwork kind={project.artwork} />
          )}
        </Figure>
      </div>

      {/* Headline figures, annotated on a datum */}
      {project.metrics?.length > 0 && (
        <div className="container-page mt-14">
          <dl className="grid gap-6 border-t border-fg pt-6 sm:grid-cols-3">
            {project.metrics.map((metric, i) => (
              <Reveal key={metric.label} delay={i * 60}>
                <div className="sm:pr-8">
                  <dt className="annot">{metric.label}</dt>
                  <dd className="mt-2.5 text-fluid-2xl font-medium tracking-headline text-accent">
                    {metric.value}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      )}

      {/* Body + fact sheet */}
      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1fr_17rem] lg:gap-20">
        <div>
          {project.summary.map((paragraph, i) => (
            <Reveal key={i} delay={i * 70}>
              <p className="mb-6 max-w-prose text-fluid-lg leading-[1.7] text-fg-muted last:mb-0">
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal>
            <h2 className="headline mt-16">What I built</h2>
          </Reveal>

          <dl className="mt-8">
            {project.highlights.map((highlight, i) => (
              <Reveal key={highlight.title} delay={i * 55}>
                <div className="grid gap-2 border-t border-line py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                  <dt className="title text-fluid-base">{highlight.title}</dt>
                  <dd className="body max-w-prose text-fluid-sm">{highlight.desc}</dd>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-line" />
          </dl>
        </div>

        {/* Follows the reader on desktop */}
        <Reveal delay={120} className="lg:sticky lg:top-24 lg:self-start">
          <dl className="flex flex-col gap-6 border-t border-line pt-6">
            <div>
              <dt className="meta">Role</dt>
              <dd className="mt-1.5 text-fluid-sm text-fg">{project.role}</dd>
            </div>
            <div>
              <dt className="meta">Timeline</dt>
              <dd className="mt-1.5 text-fluid-sm text-fg">{project.timeline}</dd>
            </div>
            <div>
              <dt className="meta">Stack</dt>
              <dd className="mt-2 text-fluid-sm leading-[1.7] text-fg-muted">
                {project.stack.join(", ")}
              </dd>
            </div>
            <div>
              <dt className="meta">Links</dt>
              <dd className="mt-2 flex flex-col gap-2">
                {links.live && (
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow"
                  >
                    {prettyUrl(links.live)}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {links.source && (
                  <a
                    href={links.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow"
                  >
                    Source on GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {!links.live && !links.source && (
                  <span className="text-fluid-sm text-fg-faint">
                    Private engagement, details on request
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* Up next */}
      <section className="border-t border-line">
        <Link href={`/projects/${next.slug}`} className="group block">
          <div className="container-page flex items-center justify-between gap-6 py-14">
            <div>
              <span className="meta">Up next</span>
              <p className="mt-2 text-fluid-2xl font-medium tracking-headline text-fg transition-colors duration-150 group-hover:text-accent">
                {next.title}
              </p>
              <p className="body mt-2">{next.tagline}</p>
            </div>
            <ArrowUpRight className="h-6 w-6 shrink-0 text-fg-faint transition-colors duration-150 group-hover:text-accent" />
          </div>
        </Link>
      </section>

      <Contact />
    </article>
  );
}
