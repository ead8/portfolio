/** @type {import('tailwindcss').Config} */

// Tokens hold `L C H` triplets, so `oklch(var(--x) / <alpha-value>)` keeps
// Tailwind's /opacity modifiers working while day and night swap underneath.
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

        // Ember: the one warm colour that says "this is the next step"
        accent: oklch("vermilion"),
        "accent-fg": oklch("on-vermilion"),
        // Small accent text: ember darkened until it passes AA at label sizes
        annot: oklch("cyanotype"),
        // Highlighter. Always carries dark text, in both themes.
        lime: oklch("lime"),
        // The night band is dark in both themes
        night: oklch("night"),
        "night-raised": oklch("night-raised"),
        "night-fg": oklch("night-ink"),
        "night-muted": oklch("night-muted"),
        sand: oklch("sand"),

        line: "oklch(var(--ink) / var(--rule-a))",
        "line-strong": "oklch(var(--ink) / var(--rule-strong-a))",
      },

      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Pixel face for labels and figures. Kept on the `mono` key so every
        // existing `font-mono` label picks it up.
        mono: ["var(--font-pixel)", "ui-monospace", "SFMono-Regular", "monospace"],
        hand: ["var(--font-hand)", "cursive"],
      },

      fontSize: {
        "fluid-xs": ["clamp(0.6875rem, 0.66rem + 0.12vw, 0.75rem)", { lineHeight: "1.45" }],
        "fluid-sm": ["clamp(0.8125rem, 0.79rem + 0.12vw, 0.875rem)", { lineHeight: "1.6" }],
        "fluid-base": ["clamp(0.9375rem, 0.91rem + 0.14vw, 1rem)", { lineHeight: "1.7" }],
        "fluid-lg": ["clamp(1.0625rem, 1rem + 0.32vw, 1.25rem)", { lineHeight: "1.55" }],
        "fluid-xl": ["clamp(1.375rem, 1.22rem + 0.7vw, 1.875rem)", { lineHeight: "1.2" }],
        "fluid-2xl": ["clamp(2rem, 1.6rem + 1.8vw, 3.25rem)", { lineHeight: "1.02" }],
        "fluid-3xl": ["clamp(2.5rem, 1.9rem + 2.8vw, 4.5rem)", { lineHeight: "0.98" }],
        "fluid-4xl": ["clamp(3rem, 2rem + 4.6vw, 6.25rem)", { lineHeight: "0.94" }],
      },

      // Large type is set tight; nothing on a heading is ever tracked out
      letterSpacing: {
        headline: "-0.035em",
        title: "-0.02em",
      },

      maxWidth: {
        page: "1320px",
        prose: "62ch",
      },

      // Pills for controls, soft corners for cards. Paper is cut, not drafted.
      borderRadius: {
        none: "0",
        xs: "4px",
        sm: "6px",
        DEFAULT: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
        full: "9999px",
      },

      boxShadow: {
        // Solid offset shadows: a cut-out sitting on the page, not a glow
        hard: "3px 3px 0 0 oklch(var(--hard))",
        "hard-sm": "2px 2px 0 0 oklch(var(--hard))",
        "hard-lg": "6px 6px 0 0 oklch(var(--hard))",
        glow: "0 18px 40px -12px oklch(var(--lime) / 0.35), 0 0 0 1px oklch(var(--lime) / 0.45)",
      },

      transitionTimingFunction: {
        out: "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },

  plugins: [],
};
