import React from "react";
import IconSlider from "../generic/IconSlider";
import { techLogosArrayComplete } from "@/app/utils/iconExporter";
import Link from "next/link";
import { motion } from "framer-motion";
import BentoGrid from "./BentoGrid";

const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.23,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
};

const HeroSection = () => {
  return (
    <motion.section
      variants={contentContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
      }}
      id="hero-section"
      className="relative w-full flex flex-col items-center justify-between py-10 lg:py-16"
    >
      <div className="flex flex-col lg:flex-row items-center justify-evenly gap-0 z-10">
        <div className="w-full lg:w-1/2">
          <div className="w-full">
            <motion.div variants={contentVariants}>
              <Link
                href="#contact-section"
                className="inline-flex items-center gap-3 bg-base-300/20 px-3 py-2 rounded-lg cursor-pointer mb-5"
              >
                <span className="inline-block bg-accent w-2 h-2 rounded-full shadow-2xl shadow-accent animate-pulse" />
                <span className="text-accent font-bold text-xs uppercase mr-3 mt-px">
                  Available for Projects
                </span>
              </Link>
            </motion.div>
            <motion.h1
              variants={contentVariants}
              className="font-display text-4xl lg:text-5xl leading-snug text-secondary font-extrabold mb-8"
            >
              Crafting Digital Excellence Through Full-Stack Innovation!
            </motion.h1>
            <motion.p
              variants={contentVariants}
              className="text-base leading-relaxed tracking-normal font-semibold mb-3"
            >
              I'm a versatile Full-Stack Developer specializing in modern tech stacks including{" "}
              <span className="text-secondary">Next.js</span>,{" "}
              <span className="text-secondary">FastAPI</span>, and{" "}
              <span className="text-secondary">NestJS</span>. From crafting elegant{" "}
              <span className="text-secondary">Node.js</span> solutions to building robust{" "}
              <span className="text-secondary">Python</span> and{" "}
              <span className="text-secondary">Golang</span> applications.
            </motion.p>
            <motion.p
              variants={contentVariants}
              className="text-base leading-relaxed tracking-normal font-semibold"
            >
              As an <span className="text-secondary">AI Integration Specialist</span> and{" "}
              <span className="text-secondary">n8n Developer</span>, I create intelligent automation workflows and{" "}
              <span className="text-secondary">AI-powered solutions</span> that transform business processes. My expertise spans from{" "}
              <span className="text-secondary">API Development</span> to{" "}
              <span className="text-secondary">System Architecture</span>, delivering scalable and innovative solutions.
            </motion.p>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center">
          <BentoGrid />
        </div>
      </div>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
        className="w-full"
      >
        <IconSlider icons={techLogosArrayComplete} />
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
