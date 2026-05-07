"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState("default"); // default | link | text
  const [pressed, setPressed] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { damping: 28, stiffness: 350, mass: 0.4 });
  const ringY = useSpring(dotY, { damping: 28, stiffness: 350, mass: 0.4 });
  const labelX = useSpring(dotX, { damping: 22, stiffness: 250, mass: 0.5 });
  const labelY = useSpring(dotY, { damping: 22, stiffness: 250, mass: 0.5 });

  useEffect(() => {
    setMounted(true);
    // Disable on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const onMove = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };

    const onOver = (e) => {
      const t = e.target;
      if (!t.closest) return;
      if (t.closest("a, button, [role='button'], [data-cursor='link']")) {
        setHoverState("link");
      } else if (
        t.closest(
          "p, h1, h2, h3, h4, h5, span, li, [data-cursor='text'], input, textarea"
        )
      ) {
        setHoverState("text");
      } else {
        setHoverState("default");
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dotX, dotY]);

  if (!mounted || !enabled) return null;

  const isLink = hoverState === "link";
  const isText = hoverState === "text";

  return (
    <>
      {/* RING — slow follow */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        aria-hidden
      >
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ease-out ${
            isLink
              ? "w-12 h-12 border-2 border-[#ff5c00] opacity-100"
              : isText
              ? "w-3 h-6 border-white/80 rounded-[2px]"
              : "w-8 h-8 border-white/80"
          } ${pressed ? "scale-75" : "scale-100"}`}
        />
      </motion.div>

      {/* CROSSHAIR DOT — instant follow */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        aria-hidden
      >
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 ${
            isText ? "opacity-0" : "opacity-100"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            className={isLink ? "text-[#ff5c00]" : "text-white"}
            fill="none"
          >
            <line x1="7" y1="0" x2="7" y2="4" stroke="currentColor" strokeWidth="1.2" />
            <line x1="7" y1="10" x2="7" y2="14" stroke="currentColor" strokeWidth="1.2" />
            <line x1="0" y1="7" x2="4" y2="7" stroke="currentColor" strokeWidth="1.2" />
            <line x1="10" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="7" cy="7" r="1.2" fill="currentColor" />
          </svg>
        </div>
      </motion.div>

      {/* COORDS READOUT — slow follow */}
      <motion.div
        style={{ x: labelX, y: labelY }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        aria-hidden
      >
        <div
          className={`absolute translate-x-5 translate-y-3 font-mono text-[10px] uppercase whitespace-nowrap transition-opacity duration-200 ${
            isLink
              ? "text-[#ff5c00] opacity-100"
              : "text-white/70 opacity-80"
          }`}
          style={{ letterSpacing: "0.12em" }}
        >
          {isLink ? "// CLICK" : `X:${String(coords.x).padStart(4, "0")} Y:${String(coords.y).padStart(4, "0")}`}
        </div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
