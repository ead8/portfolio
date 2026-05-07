"use client";

import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import PlanetBadge from "./components/generic/PlanetBadge";

const ThreeScene = dynamic(() => import("./components/hero/ThreeScene"), { ssr: false });

export default function Custom404() {
  return (
    <div className="page-warp-in w-full">
      {/* DEEP VOID SCENE */}
      <div className="relative w-full mb-12 lg:mb-16 overflow-hidden border border-ghost-16">
        <div className="absolute inset-0">
          <ThreeScene variant="void" />
        </div>
        <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-24 min-h-[400px] flex flex-col items-start justify-end">
          <PlanetBadge variant="void" className="mb-4" />
          <h2
            className="font-display text-[40px] lg:text-[64px] uppercase tracking-[-0.02em] text-ghost"
            style={{ textShadow: "0 0 32px rgba(0,0,0,0.85)" }}
          >
            DRIFTED OFF <span className="text-ember">CHARTS</span>
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-col items-start justify-center pb-24 lg:pb-32">
        <div className="flex items-center justify-between mb-8 meta-mono w-full">
          <span>
            <span className="section-index">[ ERR ]</span>
            <span className="text-ghost ml-2">404 // SIGNAL LOST</span>
          </span>
          <span>STATUS: NOT FOUND</span>
        </div>
        <h1 className="heading-display max-w-[18ch] mb-6">
          That page doesn&apos;t <span className="text-ember">exist.</span>
        </h1>
        <p className="body-md max-w-[58ch] mb-12">
          The page you&apos;re looking for has either moved or never existed in
          the first place. Try one of the routes below to return to a known
          orbit.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="btn-outline">
            <span className="btn-outline-label">RETURN HOME</span>
            <span className="btn-outline-sub">/ TERRA-001</span>
          </Link>
          <Link href="/projects" className="btn-outline">
            <span className="btn-outline-label">SEE PROJECTS</span>
            <span className="btn-outline-sub">/ CRONUS-006</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
