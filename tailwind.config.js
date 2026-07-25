/** @type {import('tailwindcss').Config} */

// Tokens hold `L C H` triplets, so `oklch(var(--x) / <alpha-value>)` keeps
// Tailwind's /opacity modifiers working while light and dark swap underneath.
const oklch = (name) => `oklch(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx,mdx}"],

  future: {
    // Every `hover:` compiles to @media (hover: hover), so a tap on a touch
    // device can't leave a hover state stuck on.
    hoverOnlyWhenSupported: true,
  },

  theme: {
    extend: {
      colors: {
        bg: oklch("paper"),
        elevated: oklch("raised"),
        surface: oklch("surface"),

        fg: oklch("ink"),
        "fg-muted": oklch("ink-muted"),
        "fg-faint": oklch("ink-faint"),

        accent: oklch("vermilion"),
        "accent-fg": oklch("on-vermilion"),
        // The annotation layer: dimensions, leaders, figure numbers, focus
        annot: oklch("cyanotype"),

        // Rules are the ink colour at low alpha rather than a separate grey, so
        // a hairline can never drift out of harmony with adjacent text. These
        // deliberately don't take an /opacity modifier — the alpha is the point.
        line: "oklch(var(--ink) / var(--rule-a))",
        "line-strong": "oklch(var(--ink) / var(--rule-strong-a))",
      },

      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },

      // Wide gaps between steps so the hierarchy can't read as flat
      fontSize: {
        "fluid-xs": ["clamp(0.6875rem, 0.66rem + 0.12vw, 0.75rem)", { lineHeight: "1.45" }],
        "fluid-sm": ["clamp(0.8125rem, 0.79rem + 0.12vw, 0.875rem)", { lineHeight: "1.6" }],
        "fluid-base": ["clamp(0.9375rem, 0.91rem + 0.14vw, 1rem)", { lineHeight: "1.75" }],
        "fluid-lg": ["clamp(1.0625rem, 1rem + 0.32vw, 1.25rem)", { lineHeight: "1.6" }],
        "fluid-xl": ["clamp(1.375rem, 1.22rem + 0.7vw, 1.875rem)", { lineHeight: "1.25" }],
        "fluid-2xl": ["clamp(1.875rem, 1.6rem + 1.3vw, 2.75rem)", { lineHeight: "1.12" }],
        "fluid-3xl": ["clamp(2.25rem, 1.85rem + 2vw, 3.5rem)", { lineHeight: "1.06" }],
        "fluid-4xl": ["clamp(2.75rem, 2.05rem + 3.2vw, 4.75rem)", { lineHeight: "1.02" }],
      },

      // Light display weights need less optical tightening than bold ones
      letterSpacing: {
        headline: "-0.02em",
        title: "-0.012em",
      },

      maxWidth: {
        page: "1240px",
        prose: "62ch",
      },

      borderRadius: {
        // Square by default. A drawing is set out with straight lines, and
        // rounded cards were half of why the earlier pass read as generic.
        none: "0",
        xs: "1px",
        sm: "2px",
        DEFAULT: "2px",
        lg: "3px",
      },

      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },

  plugins: [],
};
