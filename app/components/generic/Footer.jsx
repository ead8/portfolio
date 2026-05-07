import React from "react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  const stamp = new Date().toISOString();

  return (
    <footer className="w-full border-t border-ghost-16 bg-void">
      <div className="max-w-page mx-auto px-4 lg:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <p className="font-display text-[28px] uppercase tracking-[-0.02em] text-ghost leading-none mb-3">
            EBISA / DUGO
          </p>
          <p className="meta-mono text-ghost-64">
            FULL-STACK · AVAILABLE FOR PROJECTS
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="meta-mono text-ash mb-1">// LINKS</span>
          <Link href="/" className="nav-link">INDEX</Link>
          <Link href="/about" className="nav-link">ABOUT</Link>
          <Link href="/projects" className="nav-link">PROJECTS</Link>
        </div>

        <div className="flex flex-col gap-2">
          <span className="meta-mono text-ash mb-1">// CHANNELS</span>
          <a href="https://github.com/ead8" target="_blank" rel="noopener noreferrer" className="nav-link">GITHUB · @EAD8</a>
          <a href="https://www.linkedin.com/in/ebisa-dugo/" target="_blank" rel="noopener noreferrer" className="nav-link">LINKEDIN · EBISA-DUGO</a>
          <a href="https://twitter.com/ebisaadw" target="_blank" rel="noopener noreferrer" className="nav-link">TWITTER · @EBISAADW</a>
          <a href="mailto:ebisadugo@gmail.com" className="nav-link">EMAIL · EBISADUGO@GMAIL.COM</a>
        </div>
      </div>

      <div className="border-t border-ghost-16">
        <div className="max-w-page mx-auto px-4 lg:px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 meta-mono text-ash">
          <span>© {year} EBISA DUGO · ALL RIGHTS RESERVED</span>
          <span className="text-ghost-32">{stamp}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
