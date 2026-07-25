import { ImageResponse } from "next/og";
import { headlineFigures, profile } from "./data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Rendered on first request instead of at build time.
 *
 * Next's bundled @vercel/og resolves its font and wasm assets by running
 * `path.join` over a `file://` URL, which produces an invalid URL on Windows and
 * crashes the prerender step. Deferring to request time keeps `next build`
 * working on every platform; the CDN caches the result after the first hit.
 */
export const dynamic = "force-dynamic";

const PAPER = "#FCFAF6";
const INK = "#251E18";
const MUTED = "#5E5650";
const RULE = "#E3DED6";
const VERMILION = "#BF4213";
const BLUEPRINT = "#2564AB";

/** Corner registration tick, matching the figure frames on the site. */
function Tick({ corner }) {
  const vertical = corner.includes("top") ? { top: 0 } : { bottom: 0 };
  const horizontal = corner.includes("left") ? { left: 0 } : { right: 0 };
  const borders = {
    "top-left": { borderTop: `2px solid ${BLUEPRINT}`, borderLeft: `2px solid ${BLUEPRINT}` },
    "bottom-right": { borderBottom: `2px solid ${BLUEPRINT}`, borderRight: `2px solid ${BLUEPRINT}` },
  }[corner];

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        width: 22,
        height: 22,
        ...vertical,
        ...horizontal,
        ...borders,
      }}
    />
  );
}

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <Tick corner="top-left" />
        <Tick corner="bottom-right" />

        {/* Annotation row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              color: BLUEPRINT,
              fontSize: 19,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              display: "flex",
              color: MUTED,
              fontSize: 19,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {profile.location}
          </div>
        </div>

        {/* Subject */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: INK,
              fontSize: 68,
              fontWeight: 400,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: 940,
            }}
          >
            {profile.tagline}
          </div>

          {/* Dimension line under the headline, as on the site */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 28 }}>
            <div style={{ display: "flex", width: 2, height: 16, background: BLUEPRINT }} />
            <div style={{ display: "flex", flex: 1, height: 1, background: RULE }} />
            <div style={{ display: "flex", width: 2, height: 16, background: BLUEPRINT }} />
          </div>
        </div>

        {/* Title block */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${INK}`,
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", color: INK, fontSize: 34, fontWeight: 400, letterSpacing: "-0.02em" }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", gap: 40 }}>
            {headlineFigures.map(({ label, value }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <div
                  style={{
                    display: "flex",
                    color: BLUEPRINT,
                    fontSize: 15,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </div>
                <div style={{ display: "flex", color: VERMILION, fontSize: 26, fontWeight: 600 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
