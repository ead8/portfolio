import Link from "next/link";
import Reveal from "./components/ui/Reveal";
import TextReveal from "./components/ui/TextReveal";
import ProjectRow from "./components/ui/ProjectRow";
import { ArrowUpRight } from "./components/ui/Icons";
import { featuredProjects } from "./data/projects";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const suggestions = featuredProjects.slice(0, 3);

  return (
    <section className="container-page py-24 sm:py-32">
      <Reveal className="mb-5">
        <span className="meta">404</span>
      </Reveal>

      <TextReveal
        as="h1"
        className="display max-w-[14ch]"
        text={["This page doesn't ", { text: "exist", accent: true }, "."]}
      />

      <Reveal delay={180}>
        <p className="lede mt-6 max-w-prose">
          The link is broken or the page has moved. Here&apos;s the work index
          instead, or press{" "}
          <kbd className="rounded-xs border border-line px-1.5 py-0.5 font-mono text-[0.75rem] text-fg">
            ⌘K
          </kbd>{" "}
          to search everything.
        </p>
      </Reveal>

      <Reveal delay={250} className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-accent">
          Back to home
        </Link>
        <Link href="/projects" className="btn btn-secondary">
          Browse all work
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Reveal>

      <div className="mt-20">
        <Reveal>
          <h2 className="meta mb-2">Popular case studies</h2>
        </Reveal>
        {suggestions.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} />
        ))}
        <div className="border-t border-line" />
      </div>
    </section>
  );
}
