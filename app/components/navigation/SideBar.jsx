"use client";

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { GeneralContext } from "@/app/context/GeneralContext";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "INDEX", url: "/" },
  { title: "ABOUT", url: "/about" },
  { title: "PROJECTS", url: "/projects" },
];

const TopNav = () => {
  const pathname = usePathname();
  const { isMenuOpen, toggleMenu } = useContext(GeneralContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-void/95 backdrop-blur transition-all duration-300 ${
        scrolled ? "border-b border-ghost-16" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-page mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-7 h-7 border-hud border-ghost grid place-items-center font-display text-[14px] leading-none text-ghost group-hover:border-ember group-hover:text-ember transition-colors">
            E
          </div>
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ghost group-hover:text-ember transition-colors">
            EBISA / DUGO
          </span>
        </Link>

        {/* CENTER NAV */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => {
            const active = pathname === item.url;
            return (
              <React.Fragment key={item.url}>
                {i > 0 && <span className="meta-mono text-ghost-16 px-2">/</span>}
                <Link
                  href={item.url}
                  className={`nav-link px-2 py-1 ${active ? "nav-link-active" : ""}`}
                >
                  {item.title}
                </Link>
              </React.Fragment>
            );
          })}
        </nav>

        {/* STATUS / CTA */}
        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-2 meta-mono">
            <span className="status-dot" />
            <span>AVAILABLE</span>
          </span>
          <a
            href="https://calendly.com/ebisadugo/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-light"
          >
            CONTACT
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 border-hud border-ghost-32 hover:border-ghost text-ghost transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isMenuOpen
                  ? "M6 18 18 6M6 6l12 12"
                  : "M3.75 9h16.5m-16.5 6.75h16.5"
              }
            />
          </svg>
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-ghost-16 bg-void">
          <nav className="px-6 py-8 flex flex-col gap-6">
            {navItems.map((item) => {
              const active = pathname === item.url;
              return (
                <Link
                  key={item.url}
                  href={item.url}
                  onClick={toggleMenu}
                  className={`font-display text-[28px] uppercase tracking-[-0.02em] leading-none ${
                    active ? "text-ember" : "text-ghost"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
            <a
              href="https://calendly.com/ebisadugo/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
              className="btn-pill-light w-fit mt-2"
            >
              CONTACT
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopNav;
