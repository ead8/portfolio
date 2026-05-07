"use client";

import React, { useMemo } from "react";

/* =====================================================================
 * ProjectArtwork — programmatic SVG card artwork in the Virtual aesthetic
 * Pure white wireframe + ember accent on void bg. 4:3 aspect ratio.
 * One variant per project kind so every card looks unique.
 * ===================================================================== */

const VOID = "#000000";
const GHOST = "#ffffff";
const EMBER = "#ff5c00";
const ASH = "#666666";

const FrameDecor = () => (
  <g stroke={GHOST} strokeWidth="0.6" opacity="0.18" fill="none">
    {/* Subtle full grid */}
    {[...Array(12)].map((_, i) => (
      <line key={`v${i}`} x1={i * 33.3} y1="0" x2={i * 33.3} y2="300" />
    ))}
    {[...Array(9)].map((_, i) => (
      <line key={`h${i}`} x1="0" y1={i * 33.3} x2="400" y2={i * 33.3} />
    ))}
    {/* Corner brackets */}
    {[
      { x: 12, y: 12, dx: 1, dy: 1 },
      { x: 388, y: 12, dx: -1, dy: 1 },
      { x: 12, y: 288, dx: 1, dy: -1 },
      { x: 388, y: 288, dx: -1, dy: -1 },
    ].map((c, i) => (
      <g key={`c${i}`} stroke={EMBER} strokeWidth="1" opacity="0.8">
        <line x1={c.x} y1={c.y} x2={c.x + c.dx * 14} y2={c.y} />
        <line x1={c.x} y1={c.y} x2={c.x} y2={c.y + c.dy * 14} />
      </g>
    ))}
  </g>
);

const Label = ({ text }) => (
  <text
    x="20"
    y="285"
    fill={ASH}
    fontFamily="ui-monospace, JetBrains Mono, monospace"
    fontSize="9"
    letterSpacing="2"
  >
    {text}
  </text>
);

/* ---------- NETWORK (Omilink) — central hub + radiating links ---------- */
const NetworkArt = () => {
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2 - Math.PI / 2;
      const r = 70 + (i % 2) * 30;
      arr.push({
        x: 200 + Math.cos(angle) * r,
        y: 150 + Math.sin(angle) * r * 0.7,
        accent: i % 3 === 0,
      });
    }
    return arr;
  }, []);
  return (
    <g>
      {nodes.map((n, i) => (
        <line
          key={`line-${i}`}
          x1="200"
          y1="150"
          x2={n.x}
          y2={n.y}
          stroke={n.accent ? EMBER : GHOST}
          strokeWidth="0.8"
          opacity={n.accent ? 0.85 : 0.5}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={`node-${i}`}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.accent ? 5 : 4}
            stroke={n.accent ? EMBER : GHOST}
            strokeWidth="1.2"
            fill={VOID}
          />
          <circle cx={n.x} cy={n.y} r="1.5" fill={n.accent ? EMBER : GHOST} />
        </g>
      ))}
      {/* Hub */}
      <circle cx="200" cy="150" r="14" stroke={GHOST} strokeWidth="1.2" fill={VOID} />
      <circle cx="200" cy="150" r="6" stroke={EMBER} strokeWidth="1" fill={VOID} />
      <circle cx="200" cy="150" r="2" fill={EMBER} />
      <Label text="// LINK-IN-BIO · 9 SOCIALS" />
    </g>
  );
};

/* ---------- CHART (TAO Detector) — candlesticks + sparkline ---------- */
const ChartArt = () => {
  const candles = useMemo(() => {
    const arr = [];
    let price = 150;
    for (let i = 0; i < 16; i++) {
      const open = price;
      const change = (Math.random() - 0.45) * 30;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 10;
      const low = Math.min(open, close) - Math.random() * 10;
      arr.push({ x: 30 + i * 22, open, close, high, low, up: close > open });
      price = close;
    }
    return arr;
  }, []);
  return (
    <g>
      {/* Y-axis ticks */}
      {[80, 130, 180, 230].map((y) => (
        <g key={y} stroke={ASH} strokeWidth="0.5" opacity="0.5">
          <line x1="20" y1={y} x2="380" y2={y} strokeDasharray="2 4" />
        </g>
      ))}
      {/* Candles */}
      {candles.map((c, i) => (
        <g key={i}>
          <line
            x1={c.x}
            y1={c.high}
            x2={c.x}
            y2={c.low}
            stroke={c.up ? EMBER : GHOST}
            strokeWidth="0.6"
            opacity="0.6"
          />
          <rect
            x={c.x - 5}
            y={Math.min(c.open, c.close)}
            width="10"
            height={Math.abs(c.close - c.open) || 1}
            fill={c.up ? EMBER : VOID}
            stroke={c.up ? EMBER : GHOST}
            strokeWidth="0.8"
            opacity={c.up ? 0.85 : 0.7}
          />
        </g>
      ))}
      {/* Detection markers */}
      <g stroke={EMBER} strokeWidth="1" fill="none">
        <circle cx="80" cy="120" r="10" opacity="0.9" />
        <circle cx="80" cy="120" r="14" opacity="0.4" />
        <circle cx="280" cy="170" r="10" opacity="0.9" />
        <circle cx="280" cy="170" r="14" opacity="0.4" />
      </g>
      <Label text="// NEW LISTING · BINANCE + OKX" />
    </g>
  );
};

/* ---------- VALIDATOR (JSONGuard) — code brackets + check rows ---------- */
const ValidatorArt = () => {
  const rows = ["name", "email", "age", "tags", "score"];
  return (
    <g>
      {/* Big brackets */}
      <text
        x="40"
        y="200"
        fill={GHOST}
        fontFamily="ui-monospace, monospace"
        fontSize="180"
        opacity="0.12"
      >
        {`{`}
      </text>
      <text
        x="320"
        y="200"
        fill={GHOST}
        fontFamily="ui-monospace, monospace"
        fontSize="180"
        opacity="0.12"
      >
        {`}`}
      </text>
      {/* Schema rows */}
      <g fontFamily="ui-monospace, monospace" fontSize="11">
        {rows.map((row, i) => {
          const y = 90 + i * 24;
          const valid = i !== 2;
          return (
            <g key={row}>
              <rect
                x="100"
                y={y - 12}
                width="200"
                height="20"
                stroke={valid ? GHOST : EMBER}
                strokeWidth="0.7"
                fill={VOID}
                opacity="0.9"
              />
              <text x="110" y={y + 2} fill={GHOST} opacity="0.8">
                {row}
              </text>
              <text x="200" y={y + 2} fill={ASH}>
                : str
              </text>
              {/* Check icon */}
              {valid ? (
                <g
                  transform={`translate(280 ${y - 4})`}
                  stroke={EMBER}
                  strokeWidth="1.4"
                  fill="none"
                >
                  <polyline points="0 4 4 8 10 0" />
                </g>
              ) : (
                <g
                  transform={`translate(280 ${y - 4})`}
                  stroke={EMBER}
                  strokeWidth="1.4"
                >
                  <line x1="0" y1="0" x2="10" y2="8" />
                  <line x1="0" y1="8" x2="10" y2="0" />
                </g>
              )}
            </g>
          );
        })}
      </g>
      <Label text="// SCHEMA VALIDATION · 116x FASTER" />
    </g>
  );
};

/* ---------- PHONE (Mobile LMS) — phone mockup with content rows ---------- */
const PhoneArt = () => (
  <g>
    {/* Phone outline */}
    <rect
      x="155"
      y="40"
      width="90"
      height="180"
      rx="14"
      stroke={GHOST}
      strokeWidth="1.4"
      fill={VOID}
    />
    <rect
      x="160"
      y="50"
      width="80"
      height="155"
      rx="6"
      stroke={ASH}
      strokeWidth="0.6"
      fill="rgba(255,255,255,0.02)"
    />
    {/* Notch */}
    <rect
      x="180"
      y="46"
      width="40"
      height="6"
      rx="3"
      fill={ASH}
      opacity="0.4"
    />
    {/* Course rows inside phone */}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect
          x="166"
          y={62 + i * 32}
          width="68"
          height="24"
          stroke={i === 1 ? EMBER : GHOST}
          strokeWidth="0.8"
          fill={i === 1 ? "rgba(255,92,0,0.08)" : VOID}
          opacity="0.85"
        />
        <line
          x1="170"
          y1={70 + i * 32}
          x2="200"
          y2={70 + i * 32}
          stroke={i === 1 ? EMBER : GHOST}
          strokeWidth="0.6"
        />
        <line
          x1="170"
          y1={76 + i * 32}
          x2="220"
          y2={76 + i * 32}
          stroke={ASH}
          strokeWidth="0.5"
        />
        {/* Progress pill */}
        <rect
          x="170"
          y={80 + i * 32}
          width={i === 1 ? 30 : 14}
          height="2"
          fill={i === 1 ? EMBER : GHOST}
          opacity="0.7"
        />
      </g>
    ))}
    {/* Floating side dots */}
    <g fill={GHOST} opacity="0.5">
      <circle cx="80" cy="100" r="2" />
      <circle cx="60" cy="140" r="1.5" />
      <circle cx="100" cy="170" r="1.5" />
      <circle cx="320" cy="100" r="1.5" />
      <circle cx="340" cy="140" r="2" />
      <circle cx="310" cy="180" r="1.5" />
    </g>
    <Label text="// REACT NATIVE · IOS + ANDROID" />
  </g>
);

/* ---------- SUPPLY (OfBusiness) — buildings + supply arrows ---------- */
const SupplyArt = () => (
  <g>
    {/* 3 buildings */}
    {[0, 1, 2].map((i) => {
      const x = 60 + i * 110;
      const h = 90 + (i % 2) * 30;
      const y = 220 - h;
      return (
        <g key={i}>
          <rect
            x={x}
            y={y}
            width="60"
            height={h}
            stroke={i === 1 ? EMBER : GHOST}
            strokeWidth="1"
            fill={VOID}
            opacity="0.9"
          />
          {/* Windows */}
          {[...Array(Math.floor(h / 18))].map((_, r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={x + 8 + c * 16}
                y={y + 10 + r * 18}
                width="8"
                height="8"
                fill={i === 1 && r === 1 && c === 1 ? EMBER : ASH}
                opacity={i === 1 && r === 1 && c === 1 ? 0.9 : 0.5}
              />
            ))
          )}
          {/* Roof tag */}
          <text
            x={x + 30}
            y={y - 4}
            textAnchor="middle"
            fill={ASH}
            fontFamily="ui-monospace, monospace"
            fontSize="8"
          >
            {`B-0${i + 1}`}
          </text>
        </g>
      );
    })}
    {/* Ground line */}
    <line x1="20" y1="220" x2="380" y2="220" stroke={GHOST} strokeWidth="0.8" opacity="0.6" />
    {/* Supply arrows between */}
    <g stroke={EMBER} strokeWidth="1.2" fill="none">
      <path d="M120 195 L155 195" markerEnd="url(#arrowhead)" />
      <path d="M230 195 L265 195" markerEnd="url(#arrowhead)" />
    </g>
    <defs>
      <marker
        id="arrowhead"
        markerWidth="6"
        markerHeight="6"
        refX="5"
        refY="3"
        orient="auto"
      >
        <polygon points="0 0, 6 3, 0 6" fill={EMBER} />
      </marker>
    </defs>
    <Label text="// B2B PROCUREMENT · 500+ SKU" />
  </g>
);

/* ---------- CART (Shopcart) — cart + product grid ---------- */
const CartArt = () => (
  <g>
    {/* Product grid */}
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 50 + col * 70;
      const y = 60 + row * 70;
      const isAccent = i === 2;
      return (
        <g key={i}>
          <rect
            x={x}
            y={y}
            width="56"
            height="56"
            stroke={isAccent ? EMBER : GHOST}
            strokeWidth="0.9"
            fill={VOID}
            opacity="0.9"
          />
          <line x1={x + 8} y1={y + 38} x2={x + 40} y2={y + 38} stroke={GHOST} strokeWidth="0.6" />
          <line x1={x + 8} y1={y + 44} x2={x + 30} y2={y + 44} stroke={ASH} strokeWidth="0.5" />
          <text
            x={x + 8}
            y={y + 14}
            fill={isAccent ? EMBER : ASH}
            fontFamily="ui-monospace, monospace"
            fontSize="9"
          >
            ${(i + 1) * 19}
          </text>
        </g>
      );
    })}
    {/* Cart at bottom-right */}
    <g transform="translate(280 215)" stroke={EMBER} strokeWidth="1.4" fill="none">
      <path d="M0 0 L8 0 L14 28 L52 28 L58 8 L18 8" />
      <circle cx="20" cy="36" r="3" fill={EMBER} />
      <circle cx="46" cy="36" r="3" fill={EMBER} />
    </g>
    <text
      x="298"
      y="232"
      fill={EMBER}
      fontFamily="ui-monospace, monospace"
      fontSize="11"
    >
      02
    </text>
    <Label text="// MULTI-CATEGORY · CART + WISHLIST" />
  </g>
);

/* ---------- FLOW (ContentFlow) — node graph with sparkle ---------- */
const FlowArt = () => (
  <g>
    {/* Stages */}
    {[
      { x: 60, y: 150, label: "PROMPT" },
      { x: 180, y: 80, label: "LLM" },
      { x: 180, y: 220, label: "MEDIA" },
      { x: 320, y: 150, label: "PUBLISH" },
    ].map((n, i) => (
      <g key={n.label}>
        <rect
          x={n.x - 36}
          y={n.y - 16}
          width="72"
          height="32"
          stroke={i === 1 ? EMBER : GHOST}
          strokeWidth="1"
          fill={VOID}
          opacity="0.95"
        />
        <text
          x={n.x}
          y={n.y + 4}
          textAnchor="middle"
          fill={i === 1 ? EMBER : GHOST}
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          letterSpacing="1.5"
        >
          {n.label}
        </text>
      </g>
    ))}
    {/* Connections */}
    <g stroke={GHOST} strokeWidth="0.8" fill="none" opacity="0.7">
      <path d="M96 150 Q140 120 144 80" />
      <path d="M96 150 Q140 180 144 220" />
      <path d="M216 80 Q260 120 284 150" />
      <path d="M216 220 Q260 180 284 150" />
    </g>
    {/* Sparkle */}
    <g transform="translate(180 80)" stroke={EMBER} strokeWidth="1.2">
      <line x1="0" y1="-22" x2="0" y2="-12" />
      <line x1="0" y1="22" x2="0" y2="12" />
      <line x1="-22" y1="0" x2="-12" y2="0" />
      <line x1="22" y1="0" x2="12" y2="0" />
    </g>
    {/* Tiny stars */}
    <g fill={GHOST} opacity="0.6">
      <circle cx="120" cy="60" r="1.2" />
      <circle cx="260" cy="50" r="1" />
      <circle cx="100" cy="240" r="1.5" />
      <circle cx="280" cy="245" r="1" />
      <circle cx="350" cy="100" r="1.2" />
    </g>
    <Label text="// AI CONTENT FLOW · 4-STAGE PIPELINE" />
  </g>
);

/* ---------- DEFAULT FALLBACK ---------- */
const DefaultArt = () => (
  <g>
    <rect x="100" y="80" width="200" height="140" stroke={GHOST} strokeWidth="1" fill={VOID} />
    <line x1="100" y1="80" x2="300" y2="220" stroke={EMBER} strokeWidth="0.6" opacity="0.5" />
    <line x1="300" y1="80" x2="100" y2="220" stroke={EMBER} strokeWidth="0.6" opacity="0.5" />
    <Label text="// PROJECT" />
  </g>
);

const ART_MAP = {
  network: NetworkArt,
  chart: ChartArt,
  validator: ValidatorArt,
  phone: PhoneArt,
  supply: SupplyArt,
  cart: CartArt,
  flow: FlowArt,
};

const ProjectArtwork = ({ kind, className = "" }) => {
  const Art = ART_MAP[kind] ?? DefaultArt;
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background: VOID }}
      aria-hidden
    >
      <FrameDecor />
      <Art />
    </svg>
  );
};

export default ProjectArtwork;
