# Ebisa Dugo — Portfolio

Personal site and case-study index. Next.js App Router, statically generated. Tailwind for styling, Framer Motion and Lenis for motion, no 3D runtime.

Set `NEXT_PUBLIC_SITE_URL` to your domain before deploying — it drives canonical URLs, the sitemap, OG tags, and JSON-LD.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + static generation
npm start
npm run lint
```

Node 20+.

---

## The idea

The site is drawn as an engineering document of itself. That gives the decoration a job: frames are plates, hairlines are datum rules, labels are annotations, and the numbers are measurements.

**The measurements are real.** `Dimension` in [app/components/ui/Measure.jsx](app/components/ui/Measure.jsx) puts a `ResizeObserver` on the element it spans and reports its actual rendered width, so the `H1 872PX` label under the headline changes when you resize the window. [ScaleAxis](app/components/layout/ScaleAxis.jsx) reads `window.scrollY` against real document height. Nothing on the page fakes telemetry — no pulsing dot, no hard-coded "live" figure.

**The grid is confined to plate interiors.** A grid across a whole page is decoration; inside a frame it is the surface being measured on.

**The page is ordered as an argument.** Claim (hero, with a face and a position) → first evidence (a strip of counted, linked figures and the names that shipped) → the work itself as a pile of plates that stack under the header as you scroll, outcomes before tools → what that adds up to → how it is built → how an engagement runs → where every claim can be checked without emailing → history and tools for the thorough reader → one clear next step. Every number and name in the proof layer lives in [app/data/profile.js](app/data/profile.js) and must be verifiable; the testimonials section renders nothing until real quotes exist.

**Motion carries information or it goes.** The boot sheet plays once per session and holds the hero's reveals until the paper lifts. Counters land on real figures. The marquee pauses so a name can be read. The cursor announces what a click will do. Everything respects `prefers-reduced-motion`, and everything is transform, opacity, or clip-path.

---

## Architecture

```
app/
├── data/                  Content — edit here, never in components
│   ├── profile.js         Identity, specification rows, experience, education
│   ├── projects.js        Case studies (slug + legacy numeric id)
│   ├── projectIndex.js    Server-only listing subsets for client components
│   ├── writing.js         Posts, as data blocks
│   └── stack.js           Technology groups
├── lib/
│   ├── site.js            Canonical URL, JSON-LD builders
│   ├── hooks.js           useInView, useReducedMotion, useLocalTime, useCopy
│   └── utils.js           cn(), pad(), prettyUrl()
├── components/
│   ├── layout/            Header, Footer, Preloader, Cursor, theme, smooth scroll, ⌘K, scale axis
│   ├── sections/          Page-level composed sections
│   └── ui/                Reveal, TextReveal, Measure, Counter, Marquee,
│                          StackedCase, ProjectRow, artwork
├── projects/[projectId]/  Statically generated case studies + OG image
├── writing/[slug]/        Statically generated posts
├── rss.xml/route.js       Feed, built from the same post data
├── sitemap.js robots.js   Generated at build time
└── opengraph-image.js     Social card, drawn from profile data
```

Adding a project means one object in `app/data/projects.js`. It appears in the index, on the home page (if `featured`), in the sitemap, and in the ⌘K palette, and gets its own social card. Adding a post means one object in `app/data/writing.js`, which gets it a page, an RSS item, and a sitemap entry; a new block type is a new case in the switch on the post page.

**Client components never import the corpus.** `projects.js` is the right shape for a case-study page and the wrong shape for a list, so anything the browser needs comes from `projectIndex.js`, trimmed and handed down as props by a server component. Letting the ⌘K palette import the corpus directly put every summary, highlight, and blur placeholder into the shared bundle on every route, since the palette lives in the root layout. A guard at the top of that module now fails loudly in development if a client component reaches for it.

**A claim with no evidence behind it does not go in.** `testimonials` in `app/data/profile.js` is empty on purpose and the section renders nothing while it is — invented praise would cost more than the missing section. The same rule retired the placeholder engagement dates: client work has `year: "Client"`, `projectYear()` returns `null` for it, and every year slot renders nothing rather than printing a category where a date belongs. Add a real four-digit year and the label appears everywhere it is supposed to.

---

## Colour

Everything is **OKLCH**, defined once in [app/globals.css](app/globals.css). Three rules hold it together:

1. **Perceptual lightness.** A 46% muted grey and a 55% vermilion read as the same weight on the page. Not true of hex or HSL.
2. **Neutrals are never dead grey.** They carry 0.003–0.016 chroma at a fixed hue, so the sheet reads as warm paper and the dark plate as cool graphite. Chroma on the sheet stays under 0.008 — past that it stops being warm white and becomes beige.
3. **Rules are the ink colour at low alpha**, never a separate grey, so a hairline can never drift out of harmony with adjacent text.

| Token | Light | Dark | Contrast on paper |
|---|---|---|---|
| `ink` | `oklch(24% .016 62)` | `oklch(93% .004 78)` | 15.8:1 |
| `ink-muted` | `oklch(46% .014 62)` | `oklch(72% .008 78)` | 6.9 / 7.8:1 |
| `ink-faint` | `oklch(54% .012 62)` | `oklch(60% .008 78)` | 4.9:1 |
| `vermilion` | `oklch(55% .17 38)` | `oklch(70% .16 40)` | 5.0 / 6.8:1 |
| `cyanotype` | `oklch(50% .13 254)` | `oklch(75% .12 254)` | 5.8 / 8.7:1 |

Two colours carry meaning and are never swapped: **vermilion** marks the subject (measured values, key figures), **cyanotype** is the annotation layer (dimensions, leaders, figure numbers, focus rings).

Every value was checked against WCAG AA on its own background and for sRGB gamut before being committed — the faint tier is 54% rather than 56% for exactly that reason. Light is the authored default; dark is derived.

---

## Type

**Archivo** for everything, **Martian Mono** for annotations. Weight carries the hierarchy *downward* as size goes up — display is light, body regular, small labels medium. Heavy type at display size is what makes a page read as a generic landing template; a drawing is set in fine, even line weights.

Sizes are a fluid `clamp()` scale (`text-fluid-*`) with deliberate gaps between steps, so the hierarchy can't read as flat. No per-breakpoint font-size overrides anywhere.

---

## Motion

The choice between Framer Motion and CSS is a rule, not a preference. **A one-shot entrance is a CSS transition on a `[data-reveal]` attribute that an `IntersectionObserver` flips once**, so a page of reveals costs one observer each and zero per-frame main-thread work. **Anything that is a function of scroll or pointer position goes through Framer motion values** (`useScroll`/`useTransform` on the hero portrait, the process marker, the stacked plates; `useSpring` on the cursor), which write straight to the DOM without a React render. `template.jsx` uses Framer for the route transition because it needs a remount hook. The scale axis and the assembly diagram stay hand-rolled `requestAnimationFrame`, since both only ever write one transform per node.

Only `transform`, `opacity`, and `clip-path` are animated — all three skip layout and paint.

Budgets, following [Emil Kowalski's standards](https://animations.dev/):

| | Duration |
|---|---|
| Hover | 150ms |
| Press feedback (`scale(0.97)`) | 160ms |
| State swap | 200ms |
| Mobile drawer | 250ms |
| Scroll entrance | 360ms |
| Headline words | 420ms |
| Dimension / datum / plate draw | 620ms |

Nothing interactive exceeds 300ms. The two longer values are first-view explanatory motion, which is the one place a longer beat earns its keep.

**The ⌘K palette has no open/close animation, deliberately.** It's a keyboard-initiated action triggered constantly, and animating those makes an interface feel laggy and disconnected from the keypress.

`prefers-reduced-motion: reduce` is honoured throughout: opacity transitions survive because they aid comprehension, every positional and drawing animation lands instantly at its final state, and Lenis is never initialised.

---

## Accessibility

- Skip-to-content link, semantic landmarks, labelled navs
- Heading outlines verified — no skipped levels on any route
- Focus rings via `:focus-visible` only, in cyanotype
- All text tiers meet WCAG AA in both themes (measured, see table above)
- Every `hover:` compiles to `@media (hover: hover)` via Tailwind's `hoverOnlyWhenSupported`, so a tap can't leave a hover state stuck on
- ⌘K palette: arrow-key traversal, `Escape` to dismiss, focus restored on close
- A `<noscript>` block forces reveals visible, so scripting-disabled visitors don't get a blank page

---

## Performance

- Client dependencies: framer-motion, lenis, clsx, tailwind-merge. Nothing else.
- Every route statically generated, including all case studies
- `next/image` with AVIF/WebP and blur placeholders
- `next build` prints the per-route First Load JS. Quote that number, never a figure copied into this file — Framer Motion is the largest client cost and it moves every time a motion component is added.

---

## Known constraint

The OG image routes are `force-dynamic` on purpose. Next's bundled `@vercel/og` resolves its font and wasm assets by running `path.join` over a `file://` URL, which produces an invalid URL on Windows and crashes the prerender step. Rendering on first request keeps `next build` working on every platform; the CDN caches the result after the first hit, so production behaviour is unchanged.
