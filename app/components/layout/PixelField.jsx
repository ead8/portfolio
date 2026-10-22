"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Pixel critters, loose on the page.
 *
 * From groq.com: blocky ember creatures on a fixed canvas behind the content,
 * drifting with time and chasing the scroll position on an eased copy of it
 * (`eased += (target - eased) * 0.293` a frame), so they glide on after the
 * wheel stops. From novatsega.com: the creatures are pixel art with two frames
 * each, so they look alive rather than like particles.
 *
 * The play is ours: critters shy away from the pointer, and clicking one
 * catches it — it bursts into pixels and the scoreboard in the corner counts.
 * Catch them all and the board says so. Caught critters come back after a few
 * seconds, so the page is never left empty.
 *
 * Costs: one canvas, one rAF loop that stops while the tab is hidden, a few
 * hundred fillRects a frame. Under reduced motion the critters stand still
 * (no drift, no parallax, no burst) but can still be caught.
 */

// '#' is a pixel. Two frames per creature; they alternate a few times a second.
const SHAPES = [
  [
    [".####.", "##.#.#", "######", ".#..#."],
    [".####.", "#.#.##", "######", "#....#"],
  ],
  [
    ["..#..#..", "...##...", "..####..", ".##..##.", "########", "#.#..#.#"],
    ["..#..#..", "#..##..#", "#.####.#", "###..###", "########", ".#....#."],
  ],
  [
    [".###.", "#.#.#", "#####", "#.#.#"],
    [".###.", "#####", "#####", ".#.#."],
  ],
  [
    ["#.....#", "##...##", ".#####.", "..#.#.."],
    [".......", "##...##", "#######", "..#.#.."],
  ],
  [
    ["##.", "###", ".#."],
    [".##", "###", ".#."],
  ],
  [
    ["####..", "######", "..##.#"],
    ["..####", "######", "#.##.."],
  ],
].map((frames) => frames.map((rows) => rows.map((row) => [...row].map((c) => c === "#"))));

const FALLBACK = "#F43E01";
const REPEL_RADIUS = 150;
const RESPAWN_MS = 7000;
const INTERACTIVE = "a, button, input, textarea, select, label, summary, [role='button'], [contenteditable]";

const rand = (min, max) => min + Math.random() * (max - min);

function readSpriteColor() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--sprite").trim();
  return v ? `oklch(${v})` : FALLBACK;
}

export default function PixelField() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState({ caught: 0, total: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let cell = 6;
    let frame = 0;
    let running = false;
    let color = FALLBACK;
    let caught = 0;
    let eased = window.scrollY;
    const pointer = { x: -9999, y: -9999 };
    const particles = [];

    const narrow = window.innerWidth < 768;
    const count = narrow ? 7 : 12;

    // Desktop keeps critters in the free margin either side of the content
    // column, so they never sit under a paragraph. A critter's position is a
    // side and a fraction `t` along that margin, recomputed against the real
    // margin every frame, so resizing can't strand one over the text. On a
    // phone there is no margin: fewer critters, fainter, anywhere.
    let margin = 0;
    const pickSide = () => (narrow ? 0 : Math.random() < 0.5 ? -1 : 1);
    const zone = (side, w) => {
      if (side === 0) return [6, Math.max(6, W - 6 - w)];
      const a = side < 0 ? 6 : W - margin + 8;
      const b = side < 0 ? margin - 8 - w : W - 6 - w;
      return [a, Math.max(a, b)];
    };

    const sprites = Array.from({ length: count }, (_, i) => ({
      shape: SHAPES[i % SHAPES.length],
      side: pickSide(),
      t: rand(0, 1),
      baseY: rand(0, 1),
      depth: rand(0.12, 0.55),
      drift: rand(0.03, 0.09) * (Math.random() < 0.5 ? -1 : 1),
      phase: rand(0, Math.PI * 2),
      tick: rand(380, 700),
      ox: 0,
      oy: 0,
      alive: true,
      born: -1e9,
      sx: 0,
      sy: 0,
      w: 0,
      h: 0,
    }));

    setScore({ caught: 0, total: count });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cell = W < 768 ? 4 : W < 1280 ? 5 : 6;
      // Mirrors .container-page: max-w-page (1320px) plus its side padding
      const pad = W >= 1024 ? 48 : W >= 640 ? 32 : 16;
      margin = Math.max(0, (W - Math.min(W, 1320)) / 2) + pad;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) draw(performance.now());
    };

    const setColor = () => {
      ctx.fillStyle = FALLBACK;
      ctx.fillStyle = readSpriteColor();
      color = ctx.fillStyle;
    };

    const spriteAt = (x, y) =>
      sprites.find(
        (s) => s.alive && x >= s.sx - 10 && x <= s.sx + s.w + 10 && y >= s.sy - 10 && y <= s.sy + s.h + 10
      );

    function draw(now) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = color;
      ctx.globalAlpha = narrow ? 0.55 : 1;

      const span = H + 160;
      for (const s of sprites) {
        const rows = s.shape[Math.floor((now + s.phase * 1000) / s.tick) % 2];
        s.w = rows[0].length * cell;
        s.h = rows.length * cell;

        const bob = reduced ? 0 : Math.sin(now * 0.0011 + s.phase) * 5;
        const raw = s.baseY * span - (reduced ? 0 : eased * s.depth);
        const wrapped = ((raw % span) + span) % span - 80;

        const [za, zb] = zone(s.side, s.w);
        s.bx = za + s.t * (zb - za);
        s.sx = Math.round(s.bx + s.ox);
        s.sy = Math.round(wrapped + bob + s.oy);

        if (!s.alive) continue;

        // Respawned critters grow back in over 600ms
        const age = now - s.born;
        const grow = age < 600 ? 1 - Math.pow(1 - age / 600, 3) : 1;
        const size = cell * grow;
        const inset = (cell - size) / 2;

        for (let r = 0; r < rows.length; r++) {
          for (let c = 0; c < rows[r].length; c++) {
            if (rows[r][c]) ctx.fillRect(s.sx + c * cell + inset, s.sy + r * cell + inset, size, size);
          }
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const t = (now - p.start) / p.life;
        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }
        const dt = (now - p.start) / 1000;
        ctx.globalAlpha = 1 - t;
        ctx.fillRect(p.x + p.vx * dt, p.y + p.vy * dt + 420 * dt * dt, p.size, p.size);
      }
      ctx.globalAlpha = 1;
    }

    const step = (now) => {
      if (!running) return;

      if (!reduced) {
        eased += (window.scrollY - eased) * 0.293;

        for (const s of sprites) {
          // Pace back and forth along the margin
          s.t += s.drift / 60;
          if ((s.t < 0 && s.drift < 0) || (s.t > 1 && s.drift > 0)) s.drift *= -1;

          // Shy of the pointer: push away inside the radius, ease home outside
          const cx = s.bx + s.w / 2;
          const cy = s.sy - s.oy + s.h / 2;
          const dx = cx - pointer.x;
          const dy = cy - pointer.y;
          const d = Math.hypot(dx, dy);
          let tx = 0;
          let ty = 0;
          if (d < REPEL_RADIUS && d > 0.01) {
            const push = (1 - d / REPEL_RADIUS) * 90;
            tx = (dx / d) * push;
            ty = (dy / d) * push;
          }
          s.ox += (tx - s.ox) * 0.12;
          s.oy += (ty - s.oy) * 0.12;
        }
      }

      for (const s of sprites) {
        if (!s.alive && now - s.diedAt > RESPAWN_MS) {
          s.alive = true;
          s.born = now;
          s.side = pickSide();
          s.t = rand(0, 1);
          s.baseY = rand(0, 1);
          s.ox = s.oy = 0;
        }
      }

      draw(now);
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduced || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      // A pointer cursor over a critter says "you can click this", but never
      // over a link or a button, which keep their own cursor.
      const over = !e.target.closest?.(INTERACTIVE) && spriteAt(e.clientX, e.clientY);
      document.documentElement.style.cursor = over ? "pointer" : "";
    };

    const onLeave = () => {
      pointer.x = pointer.y = -9999;
      document.documentElement.style.cursor = "";
    };

    const onClick = (e) => {
      if (e.target.closest?.(INTERACTIVE)) return;
      if (window.getSelection?.().toString()) return;
      const s = spriteAt(e.clientX, e.clientY);
      if (!s) return;

      s.alive = false;
      s.diedAt = performance.now();
      caught += 1;
      setScore({ caught, total: count });
      document.documentElement.style.cursor = "";

      if (!reduced) {
        const rows = s.shape[0];
        for (let r = 0; r < rows.length; r++) {
          for (let c = 0; c < rows[r].length; c++) {
            if (!rows[r][c]) continue;
            const angle = rand(0, Math.PI * 2);
            const speed = rand(80, 260);
            particles.push({
              x: s.sx + c * cell,
              y: s.sy + r * cell,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 120,
              size: cell * rand(0.5, 1),
              start: performance.now(),
              life: rand(500, 900),
            });
          }
        }
      }
      if (!running) draw(performance.now());
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    // Re-read the colour when the theme flips
    const themeObserver = new MutationObserver(() => {
      setColor();
      if (!running) draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    setColor();
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibility);
    // Under reduced motion the pointer only drives the cursor hint, not a chase
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    // Reduced motion still needs a loop for respawns, but a slow one
    if (reduced) {
      const id = setInterval(() => {
        const now = performance.now();
        let changed = false;
        for (const s of sprites) {
          if (!s.alive && now - s.diedAt > RESPAWN_MS) {
            s.alive = true;
            s.born = -1e9;
            changed = true;
          }
        }
        if (changed) draw(now);
      }, 1000);
      const onScroll = () => draw(performance.now());
      window.addEventListener("scroll", onScroll, { passive: true });
      draw(performance.now());
      return () => {
        clearInterval(id);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", resize);
        window.removeEventListener("click", onClick);
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
        document.removeEventListener("visibilitychange", onVisibility);
        themeObserver.disconnect();
        document.documentElement.style.cursor = "";
      };
    }

    start();

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
      document.documentElement.style.cursor = "";
    };
  }, []);

  const all = score.total > 0 && score.caught >= score.total;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 print:hidden"
      />

      {/* Scoreboard. Hidden until the first catch, so nobody is told to play. */}
      <div
        className={
          "fixed bottom-4 right-4 z-40 transition-[opacity,transform] duration-300 ease-out print:hidden " +
          (score.caught > 0 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0")
        }
        aria-live="polite"
      >
        <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-fg bg-elevated py-2 pl-3 pr-4 shadow-hard-sm">
          <span className="px-dot text-accent" aria-hidden="true" />
          {all ? (
            <Link href="/#contact" className="font-mono text-[0.6875rem] uppercase text-fg hover:text-annot">
              {score.total}/{score.total} caught · sharp eyes. say hi →
            </Link>
          ) : (
            <span className="font-mono text-[0.6875rem] uppercase text-fg">
              {score.caught}/{score.total} critters caught
            </span>
          )}
        </div>
      </div>
    </>
  );
}
