import { projects } from "./projects";

// Dependency-free stand-in for the `server-only` package, which Next 16 no
// longer ships. Importing this module from a client component still bundles it,
// so the guard is a loud failure in development rather than a silent 40 kB.
if (typeof window !== "undefined") {
  throw new Error(
    "app/data/projectIndex.js is server-side. Pass its output down from a server component as props instead of importing it in a client component."
  );
}

/**
 * The listing subset of the project corpus.
 *
 * `projects.js` is the right shape for a case-study page: a four-paragraph
 * summary, a highlight list, a blur placeholder per cover. It is the wrong
 * shape for a list, and importing it from a client component used to put the
 * entire corpus into the shared JS bundle on *every* route — because the ⌘K
 * palette lives in the root layout and reads nothing but a title and a tagline.
 *
 * So the flow is: a server component imports this, trims it to the fields the
 * client component below it actually reads, and passes that down as props.
 * a guard at the top of this file turns an accidental client import into a loud
 * development error.
 */
export function projectIndex() {
  return projects.map(
    ({
      slug,
      title,
      tagline,
      category,
      year,
      stack,
      cover,
      artwork,
      featured,
      metrics,
      links,
    }) => ({
      slug,
      title,
      tagline,
      category,
      year,
      stack,
      cover,
      artwork,
      featured,
      metrics,
      links,
    })
  );
}

/** Distinct categories, for the index filter bar. */
export function projectCategories() {
  return ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
}

/**
 * What the ⌘K palette needs: enough to find a project and navigate to it.
 * A separate trim because this one is serialised into the payload of every
 * page on the site.
 */
export function commandItems() {
  return projects.map(({ slug, title, tagline, category, stack }) => ({
    slug,
    title,
    tagline,
    category,
    stack,
  }));
}
