import Link from "next/link";

import Reveal from "@/app/components/ui/Reveal";
import TextReveal from "@/app/components/ui/TextReveal";
import { ArrowUpRight } from "@/app/components/ui/Icons";
import { formatDate, readingTime, sortedPosts } from "@/app/data/writing";

export const metadata = {
  title: "Writing",
  description:
    "Notes on building software that holds up: design systems, performance, and the engineering decisions behind the work.",
  alternates: {
    canonical: "/writing",
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    title: "Writing",
    description: "Notes on building software that holds up.",
    url: "/writing",
  },
};

/**
 * Writing index.
 *
 * A reverse-chronological register, same rules as the work index: one line per
 * entry, a rule between them, no cards and no thumbnails. Feeds are linked
 * twice — in the metadata for readers and in the ink for anyone who looks.
 */
export default function WritingPage() {
  const posts = sortedPosts();

  return (
    <>
      <section className="container-page pb-10 pt-20 sm:pt-28">
        <TextReveal
          as="h1"
          className="display max-w-[18ch]"
          text={["Notes on building things that ", { text: "hold up", accent: true }, "."]}
        />

        <Reveal delay={180}>
          <p className="lede mt-7 max-w-prose">
            Longer thinking that does not fit in a case study: design decisions,
            performance work, and the parts of an engineering problem that only
            show up once you have shipped it.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href="/rss.xml" className="link-arrow" data-cursor="Feed">
            RSS feed
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <span className="meta">{posts.length} post{posts.length === 1 ? "" : "s"}</span>
        </Reveal>
      </section>

      <section className="container-page pb-24">
        <h2 className="sr-only">All posts</h2>
        <ul>
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 60}>
                <article className="group relative grid gap-x-8 gap-y-3 border-t border-line py-8 sm:grid-cols-[10rem_1fr]">
                  <div>
                    <p className="meta">{formatDate(post.date)}</p>
                    <p className="meta mt-1.5">{readingTime(post)} min read</p>
                  </div>

                  <div>
                    <h3 className="title text-fluid-xl">
                      <Link
                        href={`/writing/${post.slug}`}
                        className="text-fg transition-colors duration-150 hover:text-accent"
                        data-cursor="Read"
                      >
                        {post.title}
                        {/* One anchor, one tab stop for the whole row */}
                        <span className="absolute inset-0" />
                      </Link>
                    </h3>
                    <p className="body mt-3 max-w-prose">{post.summary}</p>
                    <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-fg-faint">
                      {post.tags.join(" / ")}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="border-t border-line" />
      </section>
    </>
  );
}
