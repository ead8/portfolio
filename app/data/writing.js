/**
 * Writing.
 *
 * Posts are data, not MDX, so the site keeps its dependency list short and the
 * whole section is statically generated like everything else. A block is
 * `{ type, ... }` and the post page renders the four types below; anything more
 * elaborate should be a new type with a case in that switch rather than raw
 * HTML smuggled through a paragraph.
 *
 * Write for one reader: a senior engineer deciding whether to reply, with about
 * ninety seconds to spend. Every claim in a post has to be one I can defend in
 * the next sentence.
 */

export const posts = [
  {
    slug: "engineered-document",
    title: "An engineering document that happens to be a portfolio",
    summary:
      "A portfolio is read by people who do not want to read it. The rules I set to earn the ninety seconds: real measurements, a frame around the grid, and motion that carries information or goes.",
    date: "2026-09-18",
    tags: ["Design systems", "Front-end"],
    body: [
      {
        type: "p",
        text: "Most portfolios fail for a reason that has nothing to do with the work in them. They are built for a reader who settles in, and the reader is a hiring manager with four other tabs open who will give this one roughly ninety seconds. Every decision on this site follows from taking that reader seriously.",
      },
      { type: "h2", text: "Measurements have to be real" },
      {
        type: "p",
        text: "The headline on the home page carries a dimension line under it that reads out the rendered width of the h1 in pixels. It is a ResizeObserver on the element, so it changes when you resize the window and matches what DevTools would tell you. That is the only reason it is allowed to exist.",
      },
      {
        type: "p",
        text: "I held the whole page to that standard. There is no pulsing availability dot, because a hard-coded string animated to look like telemetry is a small lie and readers who notice small lies stop believing the numbers. The counters land on figures that appear in the case studies they link to. Nothing on the page reports a value it did not measure or read from data I wrote down.",
      },
      { type: "h2", text: "The grid belongs inside a frame" },
      {
        type: "p",
        text: "A blueprint grid across an entire page is decoration. The same grid inside a bordered plate is a surface being measured on. Confining it costs nothing and changes what the reader thinks it means: the frame is the drawing, and the drawing is a thing I made.",
      },
      {
        type: "p",
        text: "That is also why the type gets lighter as it gets larger. Heavy display weight is the single strongest visual signal of a generated landing page. A drawing is annotated in fine, even line weights, with the small labels carrying the weight instead.",
      },
      { type: "h2", text: "Colour in OKLCH, neutrals that are not dead" },
      {
        type: "p",
        text: "The palette is defined in OKLCH for one practical reason: lightness is perceptual. A 46% muted grey and a 55% vermilion genuinely read as the same weight on the page, which is not true in HSL or hex and is exactly the thing that makes hand-tuned palettes look slightly off.",
      },
      {
        type: "p",
        text: "The other rule is that no neutral is a dead grey. They all carry a small chroma at a fixed hue, so the sheet reads as warm paper instead of the default blue-grey. Chroma stays under 0.008 on the sheet; past that it stops being warm white and becomes beige. Every tier was checked against WCAG AA on its own background before it was committed, and the faint tier is 54% rather than 56% for precisely that reason.",
      },
      { type: "h2", text: "Motion carries information or it goes" },
      {
        type: "p",
        text: "Entrances are a CSS transition on a data attribute an IntersectionObserver flips once, so a page full of reveals costs one observer each and no per-frame work. Scroll-linked values — the portrait drift, the marker travelling the process rail, the plates stacking — go through motion values, which write to the DOM without a React render. Anything needing a per-frame React state update was cut.",
      },
      {
        type: "p",
        text: "The rule that did the most work was the negative one: a hover effect that does not tell you anything is not a hover effect, it is a delay. Cards do not lift. Images do not zoom under the cursor on a surface you are trying to look at.",
      },
      { type: "h2", text: "What I got wrong" },
      {
        type: "p",
        text: "The first version opened with a boot sheet: a sheet of paper with a counter running to 100, then lifting to reveal the page. It was beautifully made and it was a mistake. Once per session is not once per visitor — for a recruiter doing the rounds, their only visit is a first visit, and I had spent it on an animation instead of on the work. It is now 650 milliseconds. I would cut it entirely if I were starting again.",
      },
      {
        type: "p",
        text: "The second mistake was letting two design languages coexist for a while: a rule-separated document system, and a leftover pass of rounded cards with shadows and chips. It is not a style argument. When a site carries two systems, the reader cannot tell which parts are deliberate, and the craft signal inverts into evidence of drift.",
      },
      {
        type: "p",
        text: "The code for all of it is on GitHub, and the case studies behind the numbers are on the work page.",
      },
    ],
  },
];

/** Newest first. */
export function sortedPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug) {
  return posts.find((post) => post.slug === slug) ?? null;
}

export function allPostParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

/** Words in a post's body, for the minute estimate on the index. */
export function wordCount(post) {
  return post.body.reduce((total, block) => {
    if (block.type === "ul") return total + block.items.join(" ").split(/\s+/).length;
    if (block.type === "code") return total + block.code.split(/\s+/).length;
    return total + String(block.text ?? "").split(/\s+/).length;
  }, 0);
}

/** Rounded reading time in minutes, floored at one. */
export function readingTime(post) {
  return Math.max(1, Math.round(wordCount(post) / 220));
}

/** ISO date, formatted as a sheet would date a revision. */
export function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
