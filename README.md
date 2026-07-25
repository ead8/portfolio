# Ebisa Dugo — Portfolio

Personal site and case-study index. Next.js App Router, statically generated. No CSS framework beyond Tailwind, no animation library, no 3D runtime.

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

---

## Architecture

```
app/
├── data/                  Content — edit here, never in components
│   ├── profile.js         Identity, specification rows, experience, education
│   ├── projects.js        Case studies (slug + legacy numeric id)
│   └── stack.js           Technology groups
├── lib/
│   ├── site.js            Canonical URL, JSON-LD builders
│   ├── hooks.js           useInView, useReducedMotion, useLocalTime, useCopy
│   └── utils.js           cn(), pad(), prettyUrl()
├── components/
│   ├── layout/            Header, Footer, theme, smooth scroll, ⌘K, scale axis
│   ├── sections/          Page-level composed sections
│   └── ui/                Reveal, TextReveal, Measure, ProjectRow, artwork
├── projects/[projectId]/  Statically generated case studies + OG image
├── sitemap.js robots.js   Generated at build time
└── opengraph-image.js     Social card, drawn from profile data
```

Adding a project means one object in `app/data/projects.js`. It appears in the index, on the home page (if `featured`), in the sitemap, and in the ⌘K palette, and gets its own social card.

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

No animation library. Scroll entrances are CSS transitions on a `[data-reveal]` attribute that an `IntersectionObserver` flips once, so a page of reveals costs one observer each and zero per-frame main-thread work. The scale axis writes transforms directly to the DOM inside `requestAnimationFrame` rather than through React state.

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

- Client dependencies: Lenis, clsx, tailwind-merge. That's it.
- Every route statically generated, including all case studies
- `next/image` with AVIF/WebP and blur placeholders
- ~88 kB shared First Load JS

---

## Known constraint

The OG image routes are `force-dynamic` on purpose. Next's bundled `@vercel/og` resolves its font and wasm assets by running `path.join` over a `file://` URL, which produces an invalid URL on Windows and crashes the prerender step. Rendering on first request keeps `next build` working on every platform; the CDN caches the result after the first hit, so production behaviour is unchanged.
