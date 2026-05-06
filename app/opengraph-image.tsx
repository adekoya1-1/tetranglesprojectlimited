import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tetrangles Projects Limited — Citadel Of Contemporary";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1C1C1C",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "64px",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Orange glow */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 500,
            height: 400,
            background: "radial-gradient(circle, rgba(224,58,26,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Brand mark */}
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 64,
            display: "flex",
            gap: 6,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ width: 8, height: 36, background: "#E03A1A" }} />
            <div style={{ width: 8, height: 36, background: "#E03A1A", opacity: 0.65 }} />
            <div style={{ width: 8, height: 36, background: "#E03A1A", opacity: 0.3 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 12 }}>
            <span
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              TETRANGLES
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 10,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              PROJECTS LIMITED
            </span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "33%",
            height: 6,
            background: "#E03A1A",
          }}
        />

        {/* Main text */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#E03A1A",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Nigeria's Premier Construction Company
          </span>
          <span
            style={{
              color: "white",
              fontSize: 72,
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            CITADEL OF
          </span>
          <span
            style={{
              color: "white",
              fontSize: 72,
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            CONTEMPORARY
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 20,
              marginTop: 24,
              maxWidth: 600,
            }}
          >
            Construction · Project Management · Architecture · Real Estate · Facility Management
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
