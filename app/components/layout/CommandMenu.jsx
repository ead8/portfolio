"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/app/data/projects";
import { profile, socials } from "@/app/data/profile";
import { useTheme } from "./ThemeProvider";
import { useCopy } from "@/app/lib/hooks";
import {
  ArrowUpRight,
  Calendar,
  Check,
  Copy,
  Download,
  Layers,
  Mail,
  Moon,
  Search,
  Sun,
  Terminal,
} from "@/app/components/ui/Icons";
import { cn } from "@/app/lib/utils";

/**
 * ⌘K command palette.
 *
 * Every navigational and contact action on the site is reachable from here, so
 * a visitor who knows the shortcut never has to hunt through the UI. Filtering
 * is a simple substring match over a `keywords` string per item; a fuzzy
 * matcher would be more code than this index size justifies.
 *
 * It opens and closes with NO animation, deliberately. This is a
 * keyboard-initiated action people trigger constantly, and animation on a
 * keyboard action makes the whole interface feel laggy and disconnected from
 * the keypress. Raycast has no open/close animation for exactly this reason.
 */
export default function CommandMenu() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [, copy] = useCopy();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef(null);
  const listRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const run = useCallback(
    (item) => {
      close();
      item.perform();
    },
    [close]
  );

  const groups = useMemo(() => {
    const go = (href) => () => router.push(href);
    const openExternal = (href) => () => window.open(href, "_blank", "noopener,noreferrer");

    return [
      {
        heading: "Navigation",
        items: [
          { id: "home", label: "Home", keywords: "index start", icon: Terminal, perform: go("/") },
          { id: "work", label: "All projects", keywords: "work index portfolio case studies", icon: Layers, perform: go("/projects") },
          { id: "about", label: "About", keywords: "bio experience background story", icon: Terminal, perform: go("/about") },
          { id: "contact", label: "Contact", keywords: "hire email reach out", icon: Mail, perform: go("/#contact") },
        ],
      },
      {
        heading: "Projects",
        items: projects.map((project) => ({
          id: project.slug,
          label: project.title,
          hint: project.category,
          keywords: `${project.tagline} ${project.category} ${project.stack.join(" ")}`,
          icon: Layers,
          perform: go(`/projects/${project.slug}`),
        })),
      },
      {
        heading: "Actions",
        items: [
          {
            id: "copy-email",
            label: copied ? "Email copied" : "Copy email address",
            hint: profile.email,
            keywords: "mail contact clipboard",
            icon: copied ? Check : Copy,
            perform: async () => {
              await copy(profile.email);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            },
          },
          { id: "book", label: "Book an intro call", hint: "30 min", keywords: "calendly meeting schedule", icon: Calendar, perform: openExternal(profile.calendly) },
          { id: "resume", label: "Download résumé", hint: "PDF", keywords: "cv pdf hire", icon: Download, perform: openExternal(profile.resume) },
          {
            id: "theme",
            label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
            keywords: "appearance colour color mode toggle",
            icon: theme === "dark" ? Sun : Moon,
            perform: toggle,
          },
        ],
      },
      {
        heading: "Elsewhere",
        items: socials.map((social) => ({
          id: social.label,
          label: social.label,
          hint: social.handle,
          keywords: `${social.handle} social profile`,
          icon: ArrowUpRight,
          perform: openExternal(social.href),
        })),
      },
    ];
  }, [router, theme, toggle, copy, copied]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          `${item.label} ${item.hint ?? ""} ${item.keywords}`.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  // Flat list drives keyboard traversal across group boundaries
  const flat = useMemo(() => filtered.flatMap((g) => g.items), [filtered]);

  // Global shortcut: ⌘K / Ctrl+K anywhere, plus "/" when not already typing
  useEffect(() => {
    const onKeyDown = (event) => {
      const isShortcut = event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
      const typing = /^(input|textarea|select)$/i.test(event.target?.tagName ?? "");

      if (isShortcut) {
        event.preventDefault();
        setOpen((v) => !v);
      } else if (event.key === "/" && !typing && !open) {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === "Escape" && open) {
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Lock the page behind the dialog and restore focus on close
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(id);
      previous?.focus?.();
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  // Keep the highlighted row inside the scroll viewport
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onListKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % Math.max(1, flat.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + flat.length) % Math.max(1, flat.length));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = flat[active];
      if (item) run(item);
    }
  };

  if (!open) return <CommandTrigger onOpen={() => setOpen(true)} />;

  let cursor = -1;

  return (
    <>
      <CommandTrigger onOpen={() => setOpen(true)} />

      <div
        className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
      >
        <button
          className="absolute inset-0 cursor-default bg-bg/70"
          onClick={close}
          tabIndex={-1}
          aria-label="Close command menu"
        />

        <div
          className="relative w-full max-w-[560px] overflow-hidden rounded-lg border border-line-strong bg-elevated"
          onKeyDown={onListKeyDown}
        >
          <div className="flex items-center gap-3 border-b border-line px-4">
            <Search className="h-4 w-4 shrink-0 text-fg-faint" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, pages, actions…"
              className="h-14 w-full bg-transparent text-fluid-sm text-fg outline-none placeholder:text-fg-faint"
              aria-label="Search"
              autoComplete="off"
              spellCheck="false"
            />
            <kbd className="hidden shrink-0 rounded-xs border border-line px-1.5 py-0.5 font-mono text-[0.625rem] text-fg-faint sm:block">
              ESC
            </kbd>
          </div>

          <div ref={listRef} className="max-h-[52vh] overflow-y-auto overscroll-contain p-2">
            {flat.length === 0 && (
              <p className="px-3 py-8 text-center text-fluid-sm text-fg-faint">
                No results for “{query}”
              </p>
            )}

            {filtered.map((group) => (
              <div key={group.heading} className="mb-1">
                <p className="meta px-3 pb-1 pt-3">{group.heading}</p>
                {group.items.map((item) => {
                  cursor += 1;
                  const index = cursor;
                  const isActive = index === active;
                  const ItemIcon = item.icon;

                  return (
                    <button
                      key={item.id}
                      data-active={isActive}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => run(item)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded px-3 py-2.5 text-left transition-colors duration-100",
                        isActive ? "bg-surface text-fg" : "text-fg-muted"
                      )}
                    >
                      <ItemIcon
                        className={cn("h-4 w-4 shrink-0", isActive ? "text-accent" : "text-fg-faint")}
                      />
                      <span className="flex-1 truncate text-fluid-sm">{item.label}</span>
                      {item.hint && (
                        <span className="shrink-0 truncate font-mono text-[0.625rem] uppercase tracking-label text-fg-faint">
                          {item.hint}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-label text-fg-faint">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span className="ml-auto">{flat.length} results</span>
          </div>
        </div>
      </div>
    </>
  );
}

/** Header affordance — also the only way in for pointer-only visitors. */
function CommandTrigger({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="group hidden items-center gap-2 rounded border border-line px-2.5 py-1.5 text-fg-muted transition-[color,border-color,transform] duration-150 hover:border-line-strong hover:text-fg active:scale-[0.97] md:inline-flex"
      aria-label="Open command menu"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="font-mono text-[0.6875rem] uppercase tracking-label">Search</span>
      <kbd className="rounded-xs border border-line px-1 py-px font-mono text-[0.625rem] text-fg-faint transition-colors group-hover:border-line-strong">
        ⌘K
      </kbd>
    </button>
  );
}
