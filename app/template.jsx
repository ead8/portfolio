/**
 * Route transition.
 *
 * A template remounts on every navigation, so a CSS animation on its wrapper
 * replays on each page without any JavaScript: the new page blooms in out of a
 * slight blur. It used to be a framer-motion `initial → animate` pair, which
 * left the page stuck at opacity 0 after a client-side navigation; a keyframe
 * animation always runs on mount and always ends at the element's own
 * (visible) style, so a page can never be left hidden by it.
 *
 * Keyframes and the reduced-motion fallback: globals.css, "Page enter".
 */
export default function Template({ children }) {
  return <div className="page-enter">{children}</div>;
}
