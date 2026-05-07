"use client";

import React from "react";
import dynamic from "next/dynamic";
import ImageCard from "../components/generic/ImageCard";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { projectListData } from "../context/constants";
import PlanetBadge from "../components/generic/PlanetBadge";

const ThreeScene = dynamic(() => import("../components/hero/ThreeScene"), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const ProjectsPage = () => {
  const router = useRouter();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="page-warp-in w-full"
    >
      {/* SATURN SCENE — projects page planet */}
      <div className="relative w-full mb-12 lg:mb-16 overflow-hidden border border-ghost-16">
        <div className="absolute inset-0">
          <ThreeScene variant="saturn" />
        </div>
        <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-24 min-h-[360px] flex flex-col items-start justify-end">
          <PlanetBadge variant="saturn" className="mb-4" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="font-display text-[40px] lg:text-[64px] uppercase tracking-[-0.02em] text-ghost"
            style={{ textShadow: "0 0 32px rgba(0,0,0,0.85)" }}
          >
            ARRIVED AT <span className="text-ember">CRONUS-006</span>
          </motion.h2>
        </div>
      </div>

      <section className="pt-8 pb-16 lg:pt-12 lg:pb-20">
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 meta-mono">
          <span>
            <span className="section-index">[ INDEX ]</span>
            <span className="text-ghost ml-2">PROJECTS // SHIPPED &amp; OPEN-SOURCE</span>
          </span>
          <span>
            COUNT: {String(projectListData?.length ?? 0).padStart(2, "0")}
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="heading-display max-w-[18ch] mb-8">
          Things I&apos;ve built and <span className="text-ember">shipped.</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="body-md max-w-[62ch]">
          Personal projects, open-source work, and client builds I&apos;ve
          contributed to as a full-stack developer. Click any card for the
          full breakdown.
        </motion.p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-16">
        {projectListData?.map((project, index) => (
          <motion.div
            variants={itemVariants}
            key={project?.id ?? index}
            className="col-span-1"
          >
            <ImageCard
              data={project}
              clickHandler={() => router.push(`/projects/${project?.id}`)}
            />
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
};

export default ProjectsPage;
