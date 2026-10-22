"use client";

import React from "react";
import Link from "next/link";
import { profile, socials } from "@/app/data/profile";
import { ArrowUpRight } from "@/app/components/ui/Icons";

const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
];

/**
 * Footer.
 *
 * novatsega.com closes on a row of small pill links with offset shadows; groq's
 * footer is a thin rule, the mark and a line of small capitals. Both here. The
 * contact section above already carries the big type, so this stays quiet.
 * `revised` is the build date, passed in from the server.
 */
export default function Footer({ revised }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[1] border-t border-line bg-bg">
      <div className="container-page flex flex-col gap-10 py-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[1.5rem] font-extrabold tracking-title text-fg">{profile.name}</p>
          <p className="body mt-1">{profile.role} · {profile.location}</p>

          <nav aria-label="Site" className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {siteLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[0.6875rem] uppercase text-fg-muted transition-colors duration-150 hover:text-annot"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <nav aria-label="Elsewhere" className="flex flex-wrap gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              {social.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
          <p className="meta">
            © {year} {profile.name}
          </p>
          <p className="meta">
            {revised ? `Updated ${revised} · ` : ""}made by hand in {profile.location.split(",")[0]}
          </p>
        </div>
      </div>
    </footer>
  );
}
