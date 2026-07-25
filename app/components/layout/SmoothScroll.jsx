"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useReducedMotion } from "@/app/lib/hooks";

/**
 * Momentum scrolling, plus anchor links that ease to their target.
 *
 * Skipped entirely under `prefers-reduced-motion` — hijacking the scroll wheel
 * is exactly what that setting exists to prevent, and native scrolling is the
 * correct fallback rather than a degraded version of this.
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Exponential ease-out: quick response, long glide, no rubber band
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Touch devices already have native momentum; doubling it feels wrong
      syncTouch: false,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Route in-page anchors through Lenis so they ease instead of jumping
    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"], a[href*="/#"]');
      if (!link) return;
      const hash = link.getAttribute("href").split("#")[1];
      if (!hash) return;
      const target = document.getElementById(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      history.replaceState(null, "", `#${hash}`);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // App Router restores scroll position on some transitions; a new page should
  // always open at the top. Reset through Lenis when it's driving, so its
  // internal position doesn't snap back on the next frame.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
