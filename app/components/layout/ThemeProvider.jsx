"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "theme";
const ThemeContext = createContext({ theme: "light", setTheme: () => {}, toggle: () => {} });

/**
 * Runs before first paint to set `data-theme` on <html>.
 *
 * Injected as a blocking inline script rather than a React effect — anything
 * waiting on hydration produces a visible flash of the wrong theme.
 *
 * The site is authored light-first, so light is the default even when the OS
 * prefers dark. That is a deliberate identity choice, not an oversight: the
 * drawing is designed on paper. A visitor who wants dark gets it from the
 * toggle, and that choice persists.
 */
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var theme = stored === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");

  // Adopt whatever the inline script already decided, so React and the DOM
  // agree from the first render onward.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    setThemeState(current);
  }, []);

  const setTheme = useCallback((next) => {
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — the choice just won't persist */
    }
    setThemeState(next);
  }, []);

  const toggle = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
