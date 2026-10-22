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
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Site header.
 *
 * groq.com's chrome: small capitals for the links, an outlined ember pill for
 * the one action, and nothing else. It stays put while the page scrolls and
 * picks up a paper backing once there is content underneath it. The mark is a
 * pixel monogram, so the critters on the page look like they belong to it.
 *
 * On phones the menu is a full sheet with big type; links rise in one after
 * another.
 */
export default function Header({ paletteProjects = [] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  // Track only the threshold crossing, not the scroll value, so the header
  // (and the command palette under it) doesn't re-render every frame.
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

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // A section stays marked while its detail pages are open, and the home-page
  // anchor only counts on the home page.
  const isActive = (href) => (href.includes("#") ? false : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-200",
        condensed || menuOpen
          ? "border-b border-line bg-bg/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
      style={{ height: "var(--header-height)" }}
    >
      <div className="container-page flex h-full items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${profile.name}, home`}>
          <PixelMark className="h-7 w-7 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110" />
          <span className="hidden text-[1.0625rem] font-extrabold tracking-title text-fg sm:block">
            {profile.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative isolate font-mono text-[0.6875rem] uppercase leading-none transition-colors duration-150",
                isActive(item.href) ? "text-fg" : "text-fg-muted hover:text-annot"
              )}
            >
              {isActive(item.href) && (
                <span className="absolute -inset-x-1.5 -inset-y-1 -z-10 rounded-sm bg-lime" aria-hidden="true" />
              )}
              <span className={isActive(item.href) ? "text-[#0d0d0b]" : undefined}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CommandMenu projects={paletteProjects} />
          <ThemeToggle />

          <a
            href={profile.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline ml-1 hidden sm:inline-flex"
          >
            Book a call
          </a>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-fg text-fg shadow-hard-sm transition-transform duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <Close className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[var(--header-height)] z-40 bg-bg md:hidden",
          "transition-[opacity,transform] duration-300 ease-out",
          menuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        )}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <nav className="container-page flex h-full flex-col py-8" aria-label="Mobile">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "border-b border-line py-4 text-[2.75rem] font-extrabold uppercase leading-none tracking-headline transition-[color,opacity,transform] duration-500 ease-out",
                isActive(item.href) ? "text-accent" : "text-fg",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-auto flex flex-col gap-3">
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

/** The "ED" monogram, drawn on a 9×7 pixel grid */
function PixelMark({ className }) {
  // E: columns 0-3, D: columns 5-8
  const rows = ["####.###.", "#....#..#", "#....#..#", "###..#..#", "#....#..#", "#....#..#", "####.###."];
  return (
    <svg viewBox="-1 -2 11 11" shapeRendering="crispEdges" className={className} aria-hidden="true">
      <rect x="-1" y="-2" width="11" height="11" rx="2.2" className="fill-accent" />
      {rows.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" className="fill-accent-fg" /> : null
        )
      )}
    </svg>
  );
}
