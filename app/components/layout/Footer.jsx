"use client";

import React from "react";
import Link from "next/link";
import { profile, socials } from "@/app/data/profile";
import { useCopy } from "@/app/lib/hooks";
import { Check, Copy } from "@/app/components/ui/Icons";

const siteLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [copied, copy] = useCopy();

  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <p className="text-fluid-lg font-medium tracking-title text-fg">
            {profile.name}
          </p>
          <p className="body mt-1 text-fluid-sm">{profile.role}</p>

          <button
            onClick={() => copy(profile.email)}
            className="mt-6 inline-flex items-center gap-2 text-fluid-sm text-fg-muted transition-colors duration-150 hover:text-fg active:scale-[0.98]"
          >
            {copied ? (
              <Check className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4 text-fg-faint" />
            )}
            {copied ? "Copied to clipboard" : profile.email}
          </button>
        </div>

        <nav aria-label="Site">
          <p className="meta mb-4">Site</p>
          <ul className="flex flex-col gap-2.5">
            {siteLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-fluid-sm text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Elsewhere">
          <p className="meta mb-4">Elsewhere</p>
          <ul className="flex flex-col gap-2.5">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-fluid-sm text-fg-muted transition-colors duration-150 hover:text-fg"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
          <p className="meta">
            © {year} {profile.name}
          </p>
          <p className="meta">{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
