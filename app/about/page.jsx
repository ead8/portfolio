"use client";

import React from "react";
import dynamic from "next/dynamic";
import { techLogosArrayComplete } from "../utils/iconExporter";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { motion } from "framer-motion";
import PlanetBadge from "../components/generic/PlanetBadge";

const ThreeScene = dynamic(() => import("../components/hero/ThreeScene"), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const SectionHeader = ({ index, label, title, accent }) => (
  <div className="mb-10">
    <motion.div variants={itemVariants} className="flex items-center justify-between mb-6 meta-mono">
      <span>
        <span className="section-index">[ {index} ]</span>
        <span className="text-ghost ml-2">{label}</span>
      </span>
      <span>SECTION</span>
    </motion.div>
    <motion.h2 variants={itemVariants} className="heading-section max-w-[24ch]">
      {title} {accent && <span className="text-ember">{accent}</span>}
    </motion.h2>
  </div>
);

const AboutPage = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="about-section"
      className="page-warp-in flex flex-col w-full"
    >
      {/* MARS SCENE — about page planet */}
      <div className="relative w-full mb-12 lg:mb-16 overflow-hidden border border-ghost-16">
        <div className="absolute inset-0">
          <ThreeScene variant="mars" />
        </div>
        <div className="relative z-10 px-6 lg:px-12 py-16 lg:py-24 min-h-[360px] flex flex-col items-start justify-end">
          <PlanetBadge variant="mars" className="mb-4" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="font-display text-[40px] lg:text-[64px] uppercase tracking-[-0.02em] text-ghost"
            style={{ textShadow: "0 0 32px rgba(0,0,0,0.85)" }}
          >
            APPROACH VECTOR / <span className="text-ember">ARES-002</span>
          </motion.h2>
        </div>
      </div>

      <section className="pt-8 pb-24 lg:pt-12 lg:pb-32">
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 meta-mono">
          <span>
            <span className="section-index">[ 00 ]</span>
            <span className="text-ghost ml-2">ABOUT // ENGINEER PROFILE</span>
          </span>
          <span>{new Date().toISOString().slice(0, 10)}</span>
        </motion.div>
        <motion.h1 variants={itemVariants} className="heading-display max-w-[18ch] mb-10">
          Hi, I&apos;m <span className="text-ember">Ebisa.</span> I build things on the web.
        </motion.h1>
        <motion.p variants={itemVariants} className="body-md max-w-[62ch]">
          Senior full-stack engineer with five-plus years shipping scalable
          backends, AI-powered platforms, and automation pipelines for global
          teams. Core stack:{" "}
          <span className="text-ghost">
            Python, FastAPI, Django, Next.js, TypeScript
          </span>
          . Track record: 20+ production systems for clients across Upwork
          and direct engagements.
        </motion.p>
      </section>

      {/* FOCUS */}
      <section className="py-16 lg:py-24 border-t border-ghost-16">
        <SectionHeader index="01" label="FOCUS // SPECIALTIES" title="Three areas where I do my best work." />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <motion.div variants={itemVariants} className="card-feature">
            <span className="meta-mono text-ash mb-4 block">[ 01 / 03 ]</span>
            <h3 className="font-display text-[22px] uppercase tracking-[-0.02em] text-ghost mb-3">
              AI &amp; LLM SYSTEMS
            </h3>
            <p className="body-md">
              RAG pipelines, multi-agent automations, and LLM evaluation
              workflows with LangChain and the OpenAI API. Contributor at
              Outlier and Turing on training and benchmarking projects.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="card-feature">
            <span className="meta-mono text-ash mb-4 block">[ 02 / 03 ]</span>
            <h3 className="font-display text-[22px] uppercase tracking-[-0.02em] text-ghost mb-3">
              BACKEND // DATA
            </h3>
            <p className="body-md">
              Scalable APIs and async ETL with FastAPI, Django, Pandas, and
              PostgreSQL. Processed millions of records and improved
              production API latency by up to 40%.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="card-feature">
            <span className="meta-mono text-ash mb-4 block">[ 03 / 03 ]</span>
            <h3 className="font-display text-[22px] uppercase tracking-[-0.02em] text-ghost mb-3">
              FULL-STACK PRODUCTS
            </h3>
            <p className="body-md">
              End-to-end web products with Next.js, React, TypeScript, and
              Tailwind on the front, Node.js or Python services behind. Clean
              APIs and tight feedback loops.
            </p>
          </motion.div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-16 lg:py-24 border-t border-ghost-16">
        <SectionHeader index="02" label="APPROACH // PROCESS" title="Pragmatic, fast, transparent." />
        <motion.p variants={itemVariants} className="body-md max-w-[62ch] mb-4">
          Every engagement is an engineering problem first: figure out what
          actually needs to ship, cut everything else, keep the feedback loop
          tight. Comfortable owning a project end-to-end or plugging into an
          existing team.
        </motion.p>
        <motion.p variants={itemVariants} className="body-md max-w-[62ch]">
          Studied{" "}
          <span className="text-ghost">Computer Science</span> at{" "}
          <Link
            href="https://www.aau.edu.et/"
            target="_blank"
            className="text-ember hover:opacity-70 transition-opacity"
          >
            Addis Ababa University
          </Link>{" "}
          and pursuing an MSc in Information Technology at the University of
          the People. Outside work: distributed systems papers, what&apos;s
          shipping in AI, side projects to stay sharp.
        </motion.p>
      </section>

      {/* STACK */}
      <section className="py-16 lg:py-24 border-t border-ghost-16">
        <SectionHeader index="03" label="STACK // TOOLBOX" title="A toolbox built around shipping." />
        <div className="-mx-4 lg:-mx-6 overflow-hidden">
          <Marquee speed={32} gradient gradientColor="rgb(0 0 0)" gradientWidth={80}>
            {techLogosArrayComplete?.map((item, index) => (
              <div
                key={index}
                className="mx-2 px-4 py-3 flex items-center gap-2 border border-ghost-16 hover:border-ghost transition-colors"
              >
                <img className="w-5 h-5" src={item.src} alt={item?.title} />
                <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ghost-64">
                  {item?.title}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
