"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import BentoGrid from "./BentoGrid";

// Three.js scene loaded only on client — no SSR
const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const HeroSection = () => {
  return (
    <motion.section
      id="hero-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full pt-0 pb-10 lg:pt-2 lg:pb-12"
    >
      {/* HUD STATUS ROW */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between mb-4 lg:mb-6 meta-mono relative z-10"
      >
        <span className="flex items-center gap-2">
          <span className="status-dot" />
          <span>PLANET :: <span className="text-ember">EARTH</span> · TERRA-001</span>
        </span>
        <span className="hidden md:inline">EBISA / FULL-STACK / 001</span>
      </motion.div>

      {/* IMMERSIVE 3D HERO BLOCK */}
      <div className="relative mb-10 lg:mb-14 overflow-hidden border border-ghost-16">
        {/* 3D scene canvas — fills hero block */}
        <div className="absolute inset-0 -z-0">
          <ThreeScene />
        </div>

        {/* Hero text overlaid — centered, transparent backdrop */}
        <div className="relative z-10 px-6 lg:px-12 py-10 lg:py-14 min-h-[380px] lg:min-h-[420px] flex flex-col items-center justify-center text-center">
          <motion.span variants={itemVariants} className="eyebrow block mb-8">
            {"// SELECT YOUR ENTRY POINT"}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="heading-display max-w-[18ch] mx-auto mb-6 lg:mb-8"
            style={{ textShadow: "0 0 40px rgba(0,0,0,0.85)" }}
          >
            Building digital products that just work.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="body-md max-w-[60ch] mx-auto mb-8 text-ghost"
            style={{ textShadow: "0 0 24px rgba(0,0,0,0.95)" }}
          >
            Senior full-stack engineer. Five-plus years shipping{" "}
            <span className="text-ghost font-medium">
              Next.js, FastAPI, and Python
            </span>{" "}
            systems for global teams. AI platforms, automation pipelines, and
            everything in between.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
          >
            <Link href="/projects" className="btn-outline">
              <span className="btn-outline-label">SEE PROJECTS</span>
              <span className="btn-outline-sub">13 SHIPPED</span>
            </Link>
            <Link href="#contact-section" className="btn-outline">
              <span className="btn-outline-label">GET IN TOUCH</span>
              <span className="btn-outline-sub">REPLIES &lt; 24H</span>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center gap-2 meta-mono text-ghost-32"
          >
            <span>MOVE MOUSE TO STEER · ORBITING TERRA-001</span>
          </motion.div>
        </div>
      </div>

      {/* SECONDARY GRID */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6 meta-mono">
          <span>
            <span className="section-index">[ 01 ]</span>{" "}
            <span className="text-ghost ml-2">QUICK ACCESS</span>
          </span>
          <span>{new Date().toISOString().slice(0, 10)}</span>
        </div>
        <BentoGrid />
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
