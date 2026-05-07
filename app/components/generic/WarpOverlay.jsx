"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const PLANET_FOR_PATH = (path) => {
  if (path === "/") return { label: "EARTH", code: "TERRA-001", coords: "0.000°N · 0.000°E" };
  if (path?.startsWith("/about")) return { label: "MARS", code: "ARES-002", coords: "4.589°N · 137.441°E" };
  if (path?.startsWith("/projects/") && path !== "/projects/")
    return { label: "ASTEROID BELT", code: "BELT-MAIN", coords: "2.2 - 3.2 AU" };
  if (path?.startsWith("/projects")) return { label: "SATURN", code: "CRONUS-006", coords: "RING-DIVISION-A" };
  return { label: "DEEP VOID", code: "OUTER-RIM", coords: "SIGNAL LOST" };
};

const TOTAL_DURATION = 1.4; // seconds

/**
 * Warp-portal transition: concentric ember rings expand from center while a
 * three-line planet readout fades through. Slow (1.4s) and on-theme.
 */
const WarpOverlay = () => {
  const pathname = usePathname();
  const firstRender = useRef(true);
  const [active, setActive] = useState(false);
  const [target, setTarget] = useState({ label: "EARTH", code: "TERRA-001", coords: "" });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setTarget(PLANET_FOR_PATH(pathname));
    setActive(true);
    const t = setTimeout(() => setActive(false), TOTAL_DURATION * 1000 + 100);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="warp"
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden
        >
          {/* Vignette dim — mood plate behind everything */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0.85, 0] }}
            transition={{ duration: TOTAL_DURATION, times: [0, 0.18, 0.7, 1], ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.92) 75%)",
            }}
          />

          {/* Concentric warp rings — staggered expansion from center */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.04, opacity: 0 }}
              animate={{
                scale: [0.04, 0.5, 12],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: 1.1,
                delay: 0.1 + i * 0.18,
                ease: [0.16, 0.6, 0.36, 1],
                times: [0, 0.5, 1],
              }}
              className="absolute rounded-full border-2 border-ember"
              style={{
                width: 140,
                height: 140,
                boxShadow:
                  "0 0 24px rgba(255, 92, 0, 0.35), inset 0 0 12px rgba(255, 92, 0, 0.18)",
              }}
            />
          ))}

          {/* Inner pulse — bright dot at the center */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 0.4, 0], opacity: [0, 1, 0.6, 0] }}
            transition={{ duration: 1.0, times: [0, 0.3, 0.6, 1], ease: "easeOut" }}
            className="absolute w-3 h-3 rounded-full bg-ember"
            style={{ boxShadow: "0 0 30px 10px rgba(255, 92, 0, 0.7)" }}
          />

          {/* Crosshair brackets — tighten in toward the planet name */}
          <motion.div
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: [1.4, 1, 1, 1.05], opacity: [0, 1, 1, 0] }}
            transition={{ duration: TOTAL_DURATION, times: [0, 0.35, 0.75, 1], ease: "easeOut" }}
            className="absolute pointer-events-none"
            style={{ width: 480, height: 200 }}
          >
            <svg viewBox="0 0 480 200" className="w-full h-full">
              {[
                "M 0 12 L 0 0 L 12 0",
                "M 480 12 L 480 0 L 468 0",
                "M 0 188 L 0 200 L 12 200",
                "M 480 188 L 480 200 L 468 200",
              ].map((d, i) => (
                <path
                  key={i}
                  d={d}
                  stroke="#ff5c00"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.85"
                />
              ))}
            </svg>
          </motion.div>

          {/* Planet readout — three-line stack */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: [0, 0.9, 0.9, 0], y: 0 }}
              transition={{ duration: TOTAL_DURATION, times: [0.18, 0.4, 0.75, 1], ease: "easeOut" }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-ash"
            >
              WARPING TO
            </motion.span>

            <motion.span
              initial={{ opacity: 0, scale: 1.05, letterSpacing: "0.05em" }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [1.05, 1, 1, 1.02],
                letterSpacing: ["0.05em", "-0.02em", "-0.02em", "0.04em"],
              }}
              transition={{ duration: TOTAL_DURATION, times: [0.2, 0.42, 0.78, 1], ease: "easeOut" }}
              className="font-display text-[44px] lg:text-[64px] uppercase leading-none text-ghost"
              style={{ textShadow: "0 0 32px rgba(255, 92, 0, 0.55)" }}
            >
              {target.label}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: [0, 0.9, 0.9, 0], y: 0 }}
              transition={{ duration: TOTAL_DURATION, times: [0.25, 0.45, 0.75, 1], ease: "easeOut" }}
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-ember"
            >
              → {target.code}
            </motion.span>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.6, 0] }}
              transition={{ duration: TOTAL_DURATION, times: [0.32, 0.5, 0.75, 1] }}
              className="font-mono text-[9px] uppercase tracking-[0.24em] text-ghost-32"
            >
              {target.coords}
            </motion.span>
          </div>

          {/* Top + bottom edge marker bars — like a HUD calibration */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }}
            transition={{ duration: TOTAL_DURATION, times: [0.1, 0.4, 0.7, 1], ease: "easeOut" }}
            className="absolute top-4 left-0 right-0 h-px bg-ghost-32 origin-left"
          />
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 0.7, 0.7, 0] }}
            transition={{ duration: TOTAL_DURATION, times: [0.1, 0.4, 0.7, 1], delay: 0.05, ease: "easeOut" }}
            className="absolute bottom-4 left-0 right-0 h-px bg-ghost-32 origin-right"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WarpOverlay;
