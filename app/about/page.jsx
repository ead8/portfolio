import React from "react";
import Image from "next/image";
import Link from "next/link";

import Reveal from "@/app/components/ui/Reveal";
import TextReveal from "@/app/components/ui/TextReveal";
import Experience from "@/app/components/sections/Experience";
import Stack from "@/app/components/sections/Stack";
import Contact from "@/app/components/sections/Contact";
import { ArrowUpRight } from "@/app/components/ui/Icons";

import { education, principles, profile, yearsOfExperience } from "@/app/data/profile";

export const metadata = {
  title: "About",
  description: `${profile.name}, ${profile.role} based in ${profile.location}. Background, working principles, career history, and the stack behind 20+ production systems.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description: profile.summary,
    url: "/about",
  },
};

export default function AboutPage() {
  const years = yearsOfExperience();

  return (
    <>
      <section className="container-page pb-16 pt-20 sm:pt-28">
        <TextReveal
          as="h1"
          className="display max-w-[15ch]"
          text={[
            "I'm ",
            { text: profile.firstName, accent: true },
            ". I build things that run in production.",
          ]}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <Reveal delay={180}>
              <p className="lede max-w-prose">
                I&apos;m a full-stack engineer with {years} years building
                scalable backends, AI platforms, and automation pipelines for
                teams across four continents. My core stack is Python, FastAPI,
                Django, Next.js, and TypeScript, and I&apos;ve delivered more
                than twenty production systems through Upwork and direct
                engagements.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className="body mt-6 max-w-prose">
                The work ranges widely. A cross-exchange arbitrage terminal
                aggregating 400+ prediction markets in real time. A land-buying
                platform I built solo from empty repo to production. A JSON
                validator on PyPI that benchmarks 116&times; faster than the
                library it replaces. What they share is a bias toward shipping
                something people actually use.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="body mt-6 max-w-prose">
                I studied Computer Science at{" "}
                <Link
                  href="https://www.aau.edu.et/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Addis Ababa University
                </Link>{" "}
                and I&apos;m pursuing an MSc in Information Technology at the
                University of the People. Outside client work: distributed
                systems papers, whatever&apos;s shipping in AI, and side
                projects to stay sharp.
              </p>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <figure>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name}, ${profile.role}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
              <figcaption className="meta mt-3">
                {profile.location} · {profile.utcOffset}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-line py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <h2 className="headline max-w-[16ch]">How I work.</h2>
          </Reveal>

          <dl className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {principles.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 55}>
                <div className="border-t border-line pt-5">
                  <dt className="title">{principle.title}</dt>
                  <dd className="body mt-3 max-w-prose">{principle.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <Experience />

      {/* Education */}
      <section className="border-t border-line py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <h2 className="headline">Education.</h2>
          </Reveal>

          <ul className="mt-12">
            {education.map((entry, i) => (
              <li key={entry.degree}>
                <Reveal delay={i * 60}>
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1 border-t border-line py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <div>
                      <p className="text-fluid-lg font-medium tracking-title text-fg transition-colors duration-150 group-hover:text-accent">
                        {entry.degree}
                      </p>
                      <p className="body mt-1 text-fluid-sm">{entry.org}</p>
                    </div>
                    <span className="meta flex shrink-0 items-center gap-2">
                      {entry.period}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
            <div className="border-t border-line" />
          </ul>
        </div>
      </section>

      <Stack />
      <Contact />
    </>
  );
}
