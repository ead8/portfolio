"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CommandMenu from "./CommandMenu";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/app/data/profile";
import { Close, Menu } from "@/app/components/ui/Icons";
import { cn } from "@/app/lib/utils";

const nav = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  // Track only the threshold crossing, not the scroll value — storing pixels in
  // state would re-render the header (and the command palette under it) on
  // every scroll frame.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCondensed(window.scrollY > 16);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Close the drawer on navigation — otherwise it stays open over the new page
  useEffect(() => setMenuOpen(false), [pathname]);

  // Prevent the page behind the drawer from scrolling
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href) =>
    href === "/projects" ? pathname.startsWith("/projects") : pathname === href;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-200",
        condensed
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
      style={{ height: "var(--header-height)" }}
    >
      <div className="container-page flex h-full items-center justify-between gap-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${profile.name} — home`}
        >
          <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-sm border border-line-strong font-mono text-[0.6875rem] font-medium text-fg transition-colors duration-150 group-hover:border-accent group-hover:text-accent">
            {profile.initials}
          </span>
          <span className="hidden text-fluid-sm font-medium tracking-title text-fg sm:block">
            {profile.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded px-3 py-1.5 text-fluid-sm transition-colors duration-200",
                isActive(item.href) ? "text-fg" : "text-fg-muted hover:text-fg"
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-3 -bottom-px h-px bg-accent" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CommandMenu />
          <ThemeToggle />

          <a
            href={profile.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent btn-sm hidden sm:inline-flex"
          >
            Book a call
          </a>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-8 w-8 place-items-center rounded border border-line text-fg transition-[color,border-color,transform] duration-150 hover:border-line-strong active:scale-[0.94] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <Close className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-x-0 top-[var(--header-height)] bottom-0 z-40 border-t border-line bg-bg md:hidden",
          "transition-[opacity,transform] duration-[250ms] ease-out",
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="container-page flex flex-col gap-1 py-8" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "border-b border-line py-5 text-fluid-xl font-medium tracking-title transition-colors duration-150",
                isActive(item.href) ? "text-accent" : "text-fg"
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-8 flex flex-col gap-3">
            <a href={profile.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-accent w-full">
              Book an intro call
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-secondary w-full">
              {profile.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
