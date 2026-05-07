"use client";

import React from "react";
import profilePic from "@/public/other/profile.jpeg";
import calculateYearCount from "@/app/utils/expCalculator";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.35, delay: 0.04 * i },
  }),
};

const Panel = ({ children, onClick, href, label, index = 0, className = "" }) => {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: href.startsWith("http") || href.startsWith("mailto") ? "_blank" : undefined, rel: "noopener noreferrer" }
    : { onClick };

  return (
    <motion.div custom={index} variants={cardVariants} className="contents">
      <Wrapper
        {...wrapperProps}
        className={`group card-feature flex flex-col justify-between min-h-[140px] cursor-pointer ${className}`}
      >
        <span className="meta-mono text-[10px]">[ {String(index + 1).padStart(2, "0")} ]</span>
        <div className="flex flex-col items-start gap-3 mt-4">
          {children}
        </div>
        <span className="meta-mono text-ghost-32 group-hover:text-ember transition-colors mt-4">
          {label} →
        </span>
      </Wrapper>
    </motion.div>
  );
};

const BentoGrid = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <Panel
        index={0}
        onClick={() => router.push("/about")}
        label="ABOUT"
      >
        <img
          className="w-14 h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          src={profilePic.src}
          alt="Ebisa Dugo"
        />
        <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ghost">
          Ebisa Dugo
        </span>
      </Panel>

      <Panel
        index={1}
        onClick={() => router.push("/projects")}
        label="EXPERIENCE"
      >
        <span className="font-display text-[60px] leading-none text-ghost group-hover:text-ember transition-colors">
          {calculateYearCount()}+
        </span>
        <span className="meta-mono text-ghost-64">YEARS BUILDING</span>
      </Panel>

      <Panel
        index={2}
        href="/doc/resume.pdf"
        label="DOWNLOAD"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-ghost group-hover:text-ember transition-colors"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ghost">
          Résumé.pdf
        </span>
      </Panel>

      <Panel
        index={3}
        href="https://calendly.com/ebisadugo/30min"
        label="BOOK SLOT"
        className="!border-ember"
      >
        <span className="status-dot" />
        <span className="font-display text-[24px] leading-tight text-ghost group-hover:text-ember transition-colors">
          HIRE ME.
        </span>
        <span className="meta-mono text-ghost-64">30-MIN INTRO CALL</span>
      </Panel>

      <SocialPanel
        index={4}
        href="https://github.com/ead8"
        label="GITHUB"
        handle="@ead8"
        icon={
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.6}
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
          </svg>
        }
      />
      <SocialPanel
        index={5}
        href="https://www.linkedin.com/in/ebisa-dugo/"
        label="LINKEDIN"
        handle="ebisa-dugo"
        icon={
          <svg viewBox="0 0 448 512" fill="currentColor" className="w-5 h-5">
            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 01107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
          </svg>
        }
      />
      <SocialPanel
        index={6}
        href="https://twitter.com/ebisaadw"
        label="TWITTER"
        handle="@ebisaadw"
        icon={
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        }
      />
      <SocialPanel
        index={7}
        href="mailto:ebisadugo@gmail.com"
        label="EMAIL"
        handle="ebisadugo@gmail.com"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        }
      />
    </div>
  );
};

const SocialPanel = ({ href, label, handle, icon, index }) => (
  <Panel index={index} href={href} label={label}>
    <span className="text-ghost group-hover:text-ember transition-colors">
      {icon}
    </span>
    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ghost-64 break-all">
      {handle}
    </span>
  </Panel>
);

export default BentoGrid;
