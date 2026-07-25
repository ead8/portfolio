import { projects } from "./data/projects";
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
  ];

  const projectRoutes = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    changeFrequency: "yearly",
    priority: project.featured ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    ...route,
    lastModified: now,
  }));
}
