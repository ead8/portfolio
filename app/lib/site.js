import { profile } from "@/app/data/profile";

/**
 * Canonical origin, used for OG tags, the sitemap, and JSON-LD.
 *
 * ⚠️ Set NEXT_PUBLIC_SITE_URL in your deployment environment. The fallback is a
 * placeholder — absolute URLs in social cards and structured data must match
 * the domain the site is actually served from, or previews break.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ebisadugo.com"
).replace(/\/$/, "");

export const SITE_NAME = `${profile.name} — ${profile.role}`;

export const SITE_DESCRIPTION = profile.summary;

export const absolute = (path = "") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** schema.org Person graph, embedded on every page. */
export function personJsonLd({ socials }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    image: absolute(profile.avatar),
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    description: profile.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
    knowsAbout: [
      "Full-stack engineering",
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "Django",
      "PostgreSQL",
      "LLM and RAG systems",
      "Data engineering",
    ],
  };
}

/** schema.org CreativeWork for an individual project page. */
export function projectJsonLd(project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.tagline,
    description: project.summary[0],
    url: absolute(`/projects/${project.slug}`),
    dateCreated: project.year,
    creator: {
      "@type": "Person",
      name: profile.name,
      url: SITE_URL,
    },
    keywords: project.stack.join(", "),
    genre: project.category,
  };
}
