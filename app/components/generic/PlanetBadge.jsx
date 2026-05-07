"use client";

import React from "react";
import { motion } from "framer-motion";
import { PLANET_META } from "../hero/ThreeScene";

const PlanetBadge = ({ variant = "earth", className = "" }) => {
  const meta = PLANET_META[variant] ?? PLANET_META.earth;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      className={`flex items-center gap-3 meta-mono ${className}`}
    >
      <span className="status-dot" />
      <span className="text-ghost">PLANET ::</span>
      <span className="text-ember">{meta.name}</span>
      <span className="text-ghost-32">/</span>
      <span className="text-ghost-64">{meta.code}</span>
      <span className="hidden md:inline text-ghost-32">·</span>
      <span className="hidden md:inline text-ghost-64">{meta.coords}</span>
    </motion.div>
  );
};

export default PlanetBadge;
