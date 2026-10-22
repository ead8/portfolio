import { projects } from "./data/projects";
import { sortedPosts } from "./data/writing";
import { SITE_URL } from "./lib/site";

/**
 * Only canonical slug URLs are listed. The numeric legacy routes still render
 * for anyone holding an old link, but advertising both would give crawlers two
 * URLs for identical content.
 */
export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/writing`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const projectRoutes = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    changeFrequency: "yearly",
    priority: project.featured ? 0.8 : 0.6,
  }));

  // `lastModified` defaults to the build date but is spread *first*, so a
  // post's real publication date wins over it — a sitemap that claims every
  // article changed today is a sitemap crawlers learn to distrust.
  const postRoutes = sortedPosts().map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}`,
    changeFrequency: "yearly",
    priority: 0.7,
    lastModified: new Date(`${post.date}T09:00:00Z`),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes].map((route) => ({
    lastModified: now,
    ...route,
  }));
}
