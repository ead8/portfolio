"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "@/app/components/ui/Icons";

/**
 * Light/dark switch.
 *
 * Both icons stay mounted and cross-fade, so the swap reads as one control
 * changing state rather than two icons popping. 200ms and opacity/transform
 * only: this is a UI control, not a moment, and `transition: all` would sweep
 * in layout properties that can't run on the compositor.
 */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      className="relative grid h-8 w-8 place-items-center rounded text-fg-muted transition-colors duration-150 hover:text-fg active:scale-[0.94]"
      style={{ transition: "color 150ms ease, transform 160ms var(--ease-out)" }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <Sun
        className="absolute h-4 w-4"
        style={{
          transition: "opacity 200ms ease, transform 200ms var(--ease-out)",
          opacity: isDark ? 1 : 0,
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(-60deg) scale(0.7)",
        }}
      />
      <Moon
        className="absolute h-4 w-4"
        style={{
          transition: "opacity 200ms ease, transform 200ms var(--ease-out)",
          opacity: isDark ? 0 : 1,
          transform: isDark ? "rotate(60deg) scale(0.7)" : "rotate(0deg) scale(1)",
        }}
      />
    </button>
  );
}
