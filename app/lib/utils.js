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

/** Strip protocol and trailing slash so URLs read as clean labels. */
export function prettyUrl(url) {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
