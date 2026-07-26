import React from "react";
import { cn } from "@/app/lib/utils";

/**
 * Generated cover art for projects with no screenshot.
 *
 * Each `kind` is a deterministic SVG diagram that gestures at what the project
 * actually does — a chart for market tooling, a supply chain for procurement,
 * and so on. Drawn with theme tokens so it recolours with light/dark instead of
 * sitting on the page as a foreign asset.
 *
 * Server-rendered: no client JS, no layout shift.
 */

// Drawn with the same tokens as the rest of the sheet, so generated artwork
// recolours with the theme instead of sitting on the page as a foreign asset.
const stroke = "oklch(var(--ink) / 0.5)";
const faint = "oklch(var(--ink) / 0.14)";
const accent = "oklch(var(--vermilion))";
const paper = "oklch(var(--paper))";

function Frame({ children, className }) {
  return (
    /* `meet`, not `slice`: the plate is 21/10 while this viewBox is 8/5, and
       slice was cropping the top and bottom off every diagram. Same reasoning as
       object-contain on the screenshot covers. */
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid meet"
      className={cn("h-full w-full", className)}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pa-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* No grid here: the enclosing plate already draws one, and two grids at
          different pitches read as moiré. */}
      {children}
    </svg>
  );
}

/** Market / analytics — candlesticks over a trend line. */
const Chart = () => (
  <Frame>
    <path
      d="M40 300 L120 250 L200 268 L280 190 L360 214 L440 140 L520 158 L600 92"
      fill="none"
      stroke={accent}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M40 300 L120 250 L200 268 L280 190 L360 214 L440 140 L520 158 L600 92 L600 400 L40 400 Z"
      fill="url(#pa-fade)"
    />
    {[
      [120, 236, 60],
      [200, 254, 44],
      [280, 176, 72],
      [360, 200, 52],
      [440, 126, 84],
      [520, 144, 48],
    ].map(([x, y, h], i) => (
      <g key={i}>
        <line x1={x} y1={y - 18} x2={x} y2={y + h + 18} stroke={stroke} strokeWidth="1" />
        <rect
          x={x - 7}
          y={y}
          width="14"
          height={h}
          fill={paper}
          stroke={stroke}
          strokeWidth="1.4"
        />
      </g>
    ))}
  </Frame>
);

/** Distributed system — nodes connected to a hub. */
const Network = () => {
  const nodes = [
    [140, 110],
    [500, 96],
    [96, 290],
    [545, 288],
    [320, 60],
    [318, 344],
  ];
  return (
    <Frame>
      {nodes.map(([x, y], i) => (
        <line
          key={`l${i}`}
          x1="320"
          y1="200"
          x2={x}
          y2={y}
          stroke={stroke}
          strokeWidth="1"
          strokeDasharray="4 5"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={`n${i}`}>
          <circle cx={x} cy={y} r="20" fill={paper} stroke={stroke} strokeWidth="1.4" />
          <circle cx={x} cy={y} r="4" fill={stroke} />
        </g>
      ))}
      <circle cx="320" cy="200" r="46" fill={paper} stroke={accent} strokeWidth="2" />
      <circle cx="320" cy="200" r="8" fill={accent} />
    </Frame>
  );
};

/** Schema validation — a gate with passing and failing records. */
const Validator = () => (
  <Frame>
    <rect x="300" y="70" width="40" height="260" rx="6" fill={paper} stroke={accent} strokeWidth="2" />
    {[110, 170, 230, 290].map((y, i) => (
      <g key={i}>
        <rect
          x="90"
          y={y - 16}
          width="150"
          height="32"
          rx="4"
          fill={paper}
          stroke={stroke}
          strokeWidth="1.4"
        />
        <line x1="106" y1={y} x2="180" y2={y} stroke={stroke} strokeWidth="1.4" />
        <path d={`M248 ${y} h44`} stroke={stroke} strokeWidth="1.2" strokeDasharray="4 4" />
        {i === 2 ? (
          <path
            d={`M356 ${y - 8} l16 16 m0 -16 l-16 16`}
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : (
          <>
            <path d={`M350 ${y} h150`} stroke={stroke} strokeWidth="1.2" strokeDasharray="4 4" />
            <path
              d={`M508 ${y} l10 10 l20 -22`}
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </g>
    ))}
  </Frame>
);

/** Mobile app — a device frame with content rows. */
const Phone = () => (
  <Frame>
    <rect x="248" y="40" width="144" height="300" rx="22" fill={paper} stroke={stroke} strokeWidth="1.6" />
    <rect x="298" y="52" width="44" height="6" rx="3" fill={stroke} />
    <rect x="264" y="76" width="112" height="62" rx="6" fill={accent} opacity="0.16" stroke={accent} strokeWidth="1.2" />
    {[152, 186, 220, 254].map((y, i) => (
      <g key={i}>
        <rect x="264" y={y} width="112" height="24" rx="4" stroke={stroke} strokeWidth="1.2" fill="none" />
        <rect x="272" y={y + 8} width={64 - i * 10} height="4" rx="2" fill={stroke} />
      </g>
    ))}
    <rect x="264" y="296" width="112" height="4" rx="2" fill={faint} />
    <rect x="264" y="296" width="70" height="4" rx="2" fill={accent} />
    <path d="M150 120h60M150 150h40M430 250h60M430 280h40" stroke={faint} strokeWidth="8" strokeLinecap="round" />
  </Frame>
);

/** Procurement / logistics — a directed supply chain. */
const Supply = () => (
  <Frame>
    {[
      [110, 200],
      [270, 130],
      [270, 270],
      [430, 200],
      [570, 200],
    ].map(([x, y], i) => (
      <rect
        key={i}
        x={x - 34}
        y={y - 26}
        width="68"
        height="52"
        rx="6"
        fill={paper}
        stroke={i === 4 ? accent : stroke}
        strokeWidth={i === 4 ? 2 : 1.4}
      />
    ))}
    <path
      d="M144 195 L236 140 M144 205 L236 262 M304 140 L396 192 M304 262 L396 208 M464 200 L536 200"
      stroke={stroke}
      strokeWidth="1.4"
      fill="none"
      markerEnd=""
    />
    {[[236, 140], [236, 262], [396, 192], [396, 208], [536, 200]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3" fill={accent} />
    ))}
    <rect x="96" y="188" width="28" height="4" rx="2" fill={faint} />
  </Frame>
);

/** Pipeline / workflow — stages feeding a queue. */
const Flow = () => (
  <Frame>
    {[80, 240, 400].map((x, i) => (
      <g key={i}>
        <rect x={x} y="150" width="120" height="100" rx="8" fill={paper} stroke={stroke} strokeWidth="1.4" />
        <rect x={x + 16} y="174" width="56" height="5" rx="2.5" fill={stroke} />
        <rect x={x + 16} y="190" width="80" height="5" rx="2.5" fill={faint} />
        <rect x={x + 16} y="206" width="40" height="5" rx="2.5" fill={faint} />
        <circle cx={x + 100} cy="228" r="6" fill={i === 2 ? accent : faint} />
      </g>
    ))}
    <path d="M200 200h40m-8-6 8 6-8 6M360 200h40m-8-6 8 6-8 6" stroke={accent} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M520 200h60" stroke={accent} strokeWidth="1.8" strokeDasharray="5 6" strokeLinecap="round" />
    <circle cx="596" cy="200" r="12" fill="none" stroke={accent} strokeWidth="2" />
  </Frame>
);

/** Commerce — product tiles feeding a cart. */
const Cart = () => (
  <Frame>
    {[
      [110, 100],
      [230, 100],
      [110, 230],
      [230, 230],
    ].map(([x, y], i) => (
      <g key={i}>
        <rect x={x} y={y} width="100" height="78" rx="6" fill={paper} stroke={stroke} strokeWidth="1.4" />
        <rect x={x + 12} y={y + 12} width="76" height="34" rx="4" fill={faint} />
        <rect x={x + 12} y={y + 56} width="44" height="5" rx="2.5" fill={stroke} />
      </g>
    ))}
    <path d="M348 168h32m-10-8 10 8-10 8" stroke={accent} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M420 130h24l22 108h96l20-74H456"
      fill="none"
      stroke={accent}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="482" cy="266" r="11" fill="none" stroke={stroke} strokeWidth="1.6" />
    <circle cx="548" cy="266" r="11" fill="none" stroke={stroke} strokeWidth="1.6" />
  </Frame>
);

/**
 * Risk sizing — a price ladder with entry, stop and target levels, the risk band
 * shaded between entry and stop, and the resulting position size as a bar.
 * Text-free like the rest of the set; the geometry carries the meaning.
 */
const Ladder = () => {
  const TP = 104;
  const ENTRY = 196;
  const SL = 268;
  const x0 = 96;
  const x1 = 512;

  return (
    <Frame>
      {/* Price axis with graduations */}
      <line x1="72" y1="56" x2="72" y2="344" stroke={stroke} strokeWidth="1.2" />
      {Array.from({ length: 13 }).map((_, i) => (
        <line
          key={i}
          x1="72"
          y1={62 + i * 23}
          x2={i % 3 === 0 ? 86 : 79}
          y2={62 + i * 23}
          stroke={faint}
          strokeWidth="1.2"
        />
      ))}

      {/* Reward band, entry up to target */}
      <rect x={x0} y={TP} width={x1 - x0} height={ENTRY - TP} fill={stroke} opacity="0.05" />
      {/* Risk band, entry down to stop */}
      <rect x={x0} y={ENTRY} width={x1 - x0} height={SL - ENTRY} fill={accent} opacity="0.14" />

      {/* Target */}
      <line x1={x0} y1={TP} x2={x1} y2={TP} stroke={stroke} strokeWidth="1.4" strokeDasharray="7 5" />
      {/* Entry, the only solid level */}
      <line x1={x0} y1={ENTRY} x2={x1} y2={ENTRY} stroke={stroke} strokeWidth="2.2" />
      {/* Stop */}
      <line x1={x0} y1={SL} x2={x1} y2={SL} stroke={accent} strokeWidth="2" strokeDasharray="7 5" />

      {/* Dimension arrow spanning the risk band */}
      <line x1={x1 + 28} y1={ENTRY} x2={x1 + 28} y2={SL} stroke={accent} strokeWidth="1.2" />
      <line x1={x1 + 21} y1={ENTRY} x2={x1 + 35} y2={ENTRY} stroke={accent} strokeWidth="1.2" />
      <line x1={x1 + 21} y1={SL} x2={x1 + 35} y2={SL} stroke={accent} strokeWidth="1.2" />

      {/* Resulting size, as a stack of units */}
      {Array.from({ length: 7 }).map((_, i) => (
        <rect
          key={i}
          x={x1 + 62}
          y={300 - i * 17}
          width={26 + i * 9}
          height={11}
          fill={i > 4 ? accent : paper}
          stroke={i > 4 ? accent : stroke}
          strokeWidth="1.2"
        />
      ))}

      {/* Level markers on the axis */}
      {[TP, ENTRY, SL].map((y, i) => (
        <circle
          key={y}
          cx="72"
          cy={y}
          r="4"
          fill={i === 2 ? accent : paper}
          stroke={i === 2 ? accent : stroke}
          strokeWidth="1.6"
        />
      ))}
    </Frame>
  );
};

const artworks = {
  chart: Chart,
  network: Network,
  validator: Validator,
  phone: Phone,
  supply: Supply,
  flow: Flow,
  cart: Cart,
  ladder: Ladder,
};

export default function ProjectArtwork({ kind = "network", className }) {
  const Art = artworks[kind] ?? Network;
  return (
    <div className={cn("h-full w-full bg-transparent", className)}>
      <Art />
    </div>
  );
}
