import { ImageResponse } from "next/og";
import { getProject } from "@/app/data/projects";
import { profile } from "@/app/data/profile";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Rendered on demand — see the note in app/opengraph-image.js. */
export const dynamic = "force-dynamic";

const PAPER = "#FCFAF6";
const INK = "#251E18";
const MUTED = "#5E5650";
const RULE = "#E3DED6";
const VERMILION = "#BF4213";
const BLUEPRINT = "#2564AB";

export default async function ProjectOpenGraphImage({ params }) {
  const project = getProject(params.projectId);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: PAPER,
            color: INK,
            fontSize: 44,
            fontFamily: "sans-serif",
          }}
        >
          {profile.name}
        </div>
      ),
      size
    );
  }

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
        {/* Registration ticks */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            width: 22,
            height: 22,
            borderTop: `2px solid ${BLUEPRINT}`,
            borderLeft: `2px solid ${BLUEPRINT}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            display: "flex",
            width: 22,
            height: 22,
            borderBottom: `2px solid ${BLUEPRINT}`,
            borderRight: `2px solid ${BLUEPRINT}`,
          }}
        />

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
            FIG.{String(project.id).padStart(2, "0")} · {project.category}
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
            {project.timeline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: INK,
              fontSize: 82,
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              display: "flex",
              color: MUTED,
              fontSize: 30,
              lineHeight: 1.35,
              maxWidth: 900,
              marginTop: 18,
            }}
          >
            {project.tagline}
          </div>

          <div style={{ display: "flex", alignItems: "center", marginTop: 28 }}>
            <div style={{ display: "flex", width: 2, height: 16, background: BLUEPRINT }} />
            <div style={{ display: "flex", flex: 1, height: 1, background: RULE }} />
            <div style={{ display: "flex", width: 2, height: 16, background: BLUEPRINT }} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${INK}`,
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", gap: 40 }}>
            {(project.metrics ?? []).slice(0, 3).map((metric) => (
              <div key={metric.label} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <div
                  style={{
                    display: "flex",
                    color: BLUEPRINT,
                    fontSize: 15,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {metric.label}
                </div>
                <div style={{ display: "flex", color: VERMILION, fontSize: 26, fontWeight: 600 }}>
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", color: INK, fontSize: 22 }}>{profile.name}</div>
        </div>
      </div>
    ),
    size
  );
}
