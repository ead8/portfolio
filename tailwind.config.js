/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        // VIRTUAL — IPM substitute for hero/section headings
        display: ["var(--display)", "Staatliches", "Impact", "sans-serif"],
        // Neue Haas Grotesk substitute — body & nav
        inter: ["var(--inter)", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        // JetBrains Mono — console metadata, numbers, timestamps
        mono: ["var(--mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },

      colors: {
        // VIRTUAL PALETTE
        void: "#000000",
        ghost: "#ffffff",
        ash: "#666666",
        ember: "#ff5c00",
        // graduated whites for hover/borders
        "ghost-08": "rgba(255,255,255,0.08)",
        "ghost-16": "rgba(255,255,255,0.16)",
        "ghost-32": "rgba(255,255,255,0.32)",
        "ghost-64": "rgba(255,255,255,0.64)",

        // LEGACY ALIASES — remap so existing class names still resolve
        primary: "#ffffff",
        secondary: "#ffffff",
        accent: "#ff5c00",
        neutral: "#000000",
        "base-100": "#000000",
        "base-300": "#000000",
        info: "#ffffff",
        success: "#ff5c00",
        warning: "#ff5c00",
        error: "#ff5c00",
        // also keep Family aliases pointing to Virtual equivalents so any
        // unmigrated class still produces something legible
        canvas: "#000000",
        stone: "rgba(255,255,255,0.08)",
        parchment: "#0a0a0a",
        graphite: "#ffffff",
        charcoal: "#ffffff",
        midnight: "#000000",
        obsidian: "#000000",
        fog: "#666666",
        smoke: "#666666",
        pepper: "#000000",
        meadow: "#ff5c00",
        sky: "#ff5c00",
        sunburst: "#ff5c00",
        amber: "#ff5c00",
        ocean: "#ff5c00",
        ice: "#ff5c00",
        spearmint: "#ff5c00",
        flamingo: "#ff5c00",
        violet: "#ff5c00",
        coral: "#ff5c00",
        valid: "#ff5c00",
      },

      borderRadius: {
        pill: "10px",
        card: "10px",
        "card-lg": "10px",
        illustration: "10px",
      },

      borderWidth: {
        hud: "2px",
      },

      boxShadow: {
        "stone-inset": "inset 0 0 0 1px rgba(255,255,255,0.16)",
        "nav-outline": "inset 0 -1px 0 0 rgba(255,255,255,0.08)",
        "card-elevated": "inset 0 0 0 2px #ffffff",
        "phone-mockup": "0 0 0 1px rgba(255,255,255,0.16)",
      },

      maxWidth: {
        page: "1440px",
      },

      letterSpacing: {
        tightest: "-0.02em",
      },
    },
  },
};
