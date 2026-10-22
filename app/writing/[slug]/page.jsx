import Link from "next/link";
import { notFound } from "next/navigation";

import Reveal from "@/app/components/ui/Reveal";
import TextReveal from "@/app/components/ui/TextReveal";
import { ArrowLeft, ArrowUpRight } from "@/app/components/ui/Icons";
import Contact from "@/app/components/sections/Contact";
import { allPostParams, formatDate, getPost, readingTime, sortedPosts } from "@/app/data/writing";
import { SITE_URL, absolute } from "@/app/lib/site";

/**
 * A single post.
 *
 * Server-rendered and statically generated, so crawlers and link previews get
 * the whole thing rather than an empty shell. Body blocks come from
 * app/data/writing.js and are switched on `type` here; adding a block type means
 * adding a case, not loosening the renderer.
 */

export function generateStaticParams() {
  return allPostParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };

  const url = `/writing/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="headline mt-14">{block.text}</h2>;
    case "ul":
      return (
        <ul className="mt-6 flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="body flex gap-3 text-fluid-base">
              <span className="mt-[0.7em] h-px w-3.5 shrink-0 bg-annot/60" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="plate mt-6 overflow-x-auto bg-surface p-5 font-mono text-[0.8125rem] leading-[1.7] text-fg">
          <code>{block.code}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote className="mt-6 border-l border-annot pl-5">
          <p className="lede text-fg">{block.text}</p>
        </blockquote>
      );
    default:
      return <p className="body mt-6 max-w-prose text-fluid-base">{block.text}</p>;
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const later = sortedPosts().filter((p) => p.slug !== post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    url: absolute(`/writing/${post.slug}`),
    mainEntityOfPage: absolute(`/writing/${post.slug}`),
    author: { "@type": "Person", name: "Ebisa Dugo", url: SITE_URL },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="container-page pb-10 pt-16 sm:pt-20">
        <Reveal className="mb-10">
          <Link href="/writing" className="link-arrow">
            <ArrowLeft className="h-3.5 w-3.5" />
            All writing
          </Link>
        </Reveal>

        <Reveal className="mb-5 flex flex-wrap items-center gap-3">
          <span className="meta">{formatDate(post.date)}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
          <span className="meta">{readingTime(post)} min read</span>
        </Reveal>

        <TextReveal as="h1" className="display max-w-[20ch]" text={post.title} />

        <Reveal delay={180}>
          <p className="lede mt-6 max-w-prose">{post.summary}</p>
        </Reveal>
      </header>

      <section className="container-page grid gap-12 pb-20 lg:grid-cols-[1fr_17rem] lg:gap-20">
        <div>
          {post.body.map((block, i) => (
            <Reveal key={i} delay={0}>
              <Block block={block} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="lg:sticky lg:top-24 lg:self-start">
          <dl className="flex flex-col gap-6 border-t border-line pt-6">
            <div>
              <dt className="meta">Published</dt>
              <dd className="mt-1.5 text-fluid-sm text-fg">{formatDate(post.date)}</dd>
            </div>
            <div>
              <dt className="meta">Topics</dt>
              <dd className="mt-2 flex flex-col gap-1.5 text-fluid-sm text-fg-muted">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="meta">Feed</dt>
              <dd className="mt-2">
                <a href="/rss.xml" className="link-arrow">
                  RSS
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {later.length > 0 && (
        <section className="border-t border-line">
          <div className="container-page py-14">
            <p className="meta">More</p>
            <ul className="mt-6 flex flex-col gap-4">
              {later.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/writing/${other.slug}`}
                    className="text-fluid-lg font-medium tracking-title text-fg transition-colors duration-150 hover:text-accent"
                  >
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Contact />
    </article>
  );
}
