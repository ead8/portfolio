"use client";

import React, { useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { GeneralContext } from "@/app/context/GeneralContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PlanetBadge from "@/app/components/generic/PlanetBadge";
import ProjectArtwork from "@/app/components/generic/ProjectArtwork";

const ThreeScene = dynamic(() => import("@/app/components/hero/ThreeScene"), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const ProjectPage = ({ params }) => {
  const { projectData, selectProject } = useContext(GeneralContext);
  const router = useRouter();

  useEffect(() => {
    selectProject(params?.projectId);
  }, [params]);

  if (projectData?.id === 0 || projectData?.isLocked === true) {
    router.push(`/not-found`);
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="page-warp-in w-full"
    >
      {/* ASTEROID SCENE — project detail planet */}
      <div className="relative w-full mb-10 lg:mb-14 overflow-hidden border border-ghost-16">
        <div className="absolute inset-0">
          <ThreeScene variant="asteroid" />
        </div>
        <div className="relative z-10 px-6 lg:px-12 py-12 lg:py-16 min-h-[260px] flex flex-col items-start justify-end">
          <PlanetBadge variant="asteroid" className="mb-3" />
          <span
            className="font-display text-[24px] lg:text-[32px] uppercase tracking-[-0.02em] text-ghost"
            style={{ textShadow: "0 0 32px rgba(0,0,0,0.85)" }}
          >
            CASE FILE / <span className="text-ember">{String(projectData?.id ?? "—").padStart(3, "0")}</span>
          </span>
        </div>
      </div>

      <section className="pt-8 pb-12 lg:pt-12">
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-10 meta-mono">
          <button onClick={() => router.back()} className="btn-ghost-link">
            ← BACK / INDEX
          </button>
          <span>
            <span className="text-ghost">ID</span>{" "}
            <span className="text-ember">
              {String(projectData?.id ?? "—").padStart(3, "0")}
            </span>
          </span>
        </motion.div>

        <motion.span variants={itemVariants} className="eyebrow block mb-6">
          {projectData?.details?.overview?.timeline}
        </motion.span>

        <motion.h1 variants={itemVariants} className="heading-display max-w-[20ch] mb-6">
          {projectData?.title}
        </motion.h1>

        <motion.p variants={itemVariants} className="body-md max-w-[62ch] text-ash">
          {projectData?.subTitle}
        </motion.p>
      </section>

      {/* COVER — real image OR generated artwork (full image, no cropping) */}
      <motion.div variants={itemVariants} className="card-recessed mb-16 lg:mb-24 bg-void">
        <div className="relative w-full aspect-video overflow-hidden">
          {projectData?.details?.coverImgSrc ? (
            <img
              src={projectData?.details?.coverImgSrc}
              alt={projectData?.title}
              className="absolute inset-0 w-full h-full object-contain object-center grayscale hover:grayscale-0 transition-all duration-700"
            />
          ) : (
            <ProjectArtwork
              kind={projectData?.details?.artworkKind ?? projectData?.artworkKind}
            />
          )}
        </div>
      </motion.div>

      {/* OVERVIEW BLOCK */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 pb-16 border-t border-ghost-16 pt-12">
        <motion.aside variants={itemVariants} className="lg:col-span-1 flex flex-col gap-8">
          <div>
            <p className="meta-mono mb-2">// ROLE</p>
            <p className="text-[15px] text-ghost leading-[1.55]">
              {projectData?.details?.overview?.myRole}
            </p>
          </div>
          <div>
            <p className="meta-mono mb-2">// TIMELINE</p>
            <p className="text-[15px] text-ghost leading-[1.55]">
              {projectData?.details?.overview?.timeline}
            </p>
          </div>
          <div>
            <p className="meta-mono mb-2">// STACK</p>
            <p className="text-[15px] text-ghost leading-[1.55]">
              {projectData?.details?.overview?.techUsed}
            </p>
          </div>
          <div>
            <p className="meta-mono mb-2">// LINKS</p>
            <div className="flex flex-col gap-2">
              {projectData?.details?.overview?.sourceCode && (
                <a
                  href={projectData?.details?.overview?.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-light w-fit"
                >
                  SOURCE
                </a>
              )}
              {projectData?.details?.overview?.liveUrl && (
                <a
                  href={projectData?.details?.overview?.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-dark w-fit"
                >
                  LIVE SITE
                </a>
              )}
              {!projectData?.details?.overview?.liveUrl &&
                !projectData?.details?.overview?.sourceCode && (
                  <p className="meta-mono text-ash">PRIVATE ENGAGEMENT</p>
                )}
            </div>
          </div>
        </motion.aside>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <h2 className="heading-section mb-8">// OVERVIEW</h2>
          <p className="body-md mb-4">
            {projectData?.details?.overview?.projectDesc?.para1}
          </p>
          <p className="body-md">
            {projectData?.details?.overview?.projectDesc?.para2}
          </p>
        </motion.div>
      </section>

      {/* FEATURES */}
      {projectData?.details?.features?.list && (
        <section className="border-t border-ghost-16 pt-12 pb-16">
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-10 meta-mono">
            <span>
              <span className="section-index">[ FEATURES ]</span>
              <span className="text-ghost ml-2">// WHAT I BUILT</span>
            </span>
            <span>
              COUNT: {String(projectData?.details?.features?.list?.length ?? 0).padStart(2, "0")}
            </span>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectData?.details?.features?.list?.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-feature"
              >
                <span className="meta-mono text-ash mb-4 block">
                  [ {String(index + 1).padStart(2, "0")} ]
                </span>
                <h3 className="font-display text-[22px] uppercase tracking-[-0.02em] text-ghost mb-3">
                  {item?.title}
                </h3>
                <p className="body-md">{item?.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-ghost-16 pt-12 pb-8">
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
          <Link href="/projects" className="btn-outline">
            <span className="btn-outline-label">ALL PROJECTS</span>
            <span className="btn-outline-sub">RETURN TO INDEX</span>
          </Link>
          <Link href="/#contact-section" className="btn-outline">
            <span className="btn-outline-label">GET IN TOUCH</span>
            <span className="btn-outline-sub">START A PROJECT</span>
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default ProjectPage;
