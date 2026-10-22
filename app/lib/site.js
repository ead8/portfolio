import { profile } from "@/app/data/profile";
import { projectYear } from "@/app/lib/utils";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ebisadugo.com"
).replace(/\/$/, "");

/** Build date, stamped on the sheet as its revision. Static builds freeze it at build time. */
export const BUILD_DATE = new Date().toISOString().slice(0, 10);

export const SITE_NAME = `${profile.name} — ${profile.role}`;
export const SITE_DESCRIPTION = profile.summary;

export const absolute = (path = "") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** schema.org Person graph with WebSite schema embedded for rich search snippets */
export function personJsonLd({ socials }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
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
          "Full-Stack Engineering",
          "Next.js",
          "React",
          "TypeScript",
          "Python",
          "FastAPI",
          "Django",
          "PostgreSQL",
          "LLM and RAG Systems",
          "Data Engineering",
          "High-Throughput Backends",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en-US",
      },
    ],
  };
}

/** schema.org CreativeWork / SoftwareApplication for project pages */
export function projectJsonLd(project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    headline: project.tagline,
    description: project.summary ? project.summary[0] : project.tagline,
    url: absolute(`/projects/${project.slug}`),
    // Omitted entirely for undated client work — an invalid date invalidates
    // the whole structured-data claim, which is worse than no date at all.
    datePublished: projectYear(project) ?? undefined,
    author: {
      "@type": "Person",
      name: profile.name,
      url: SITE_URL,
    },
    applicationCategory: project.category,
    programmingLanguage: project.stack,
    operatingSystem: "Web / Cross-Platform",
  };
}
