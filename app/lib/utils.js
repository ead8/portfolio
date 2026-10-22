import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Zero-padded index, e.g. 3 -> "03". Used for section and card numbering. */
export function pad(n, width = 2) {
  return String(n).padStart(width, "0");
}

/**
 * A project's year as a four-digit string, or `null` when it does not have one.
 *
 * Client engagements carry `year: "Client"` because the contracts do not let me
 * publish dates. That value is fine as data and wrong as a date: it rendered in
 * year slots as "Client engagement · Client", and it went into the JSON-LD as a
 * `datePublished` of "Client", which is not a date at all. Call sites render
 * nothing when this returns null, so adding a real year later is a one-word
 * data change.
 *
 * It lives here rather than in `app/data/projects.js` because importing *any*
 * export from that module drags the whole project corpus into the browser
 * bundle. See app/data/projectIndex.js.
 */
export function projectYear(project) {
  return /^\d{4}$/.test(String(project?.year)) ? project.year : null;
}

/** Strip protocol and trailing slash so URLs read as clean labels. */
export function prettyUrl(url) {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
