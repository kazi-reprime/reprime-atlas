import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RePrime Terminal — institutional CRE intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #091533 0%, #0F1E3D 60%, #1E3360 100%)",
          color: "#FAFAF7",
          padding: 80,
          fontFamily: "ui-serif, Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -200,
            top: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,118,58,0.45) 0%, rgba(232,118,58,0) 65%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: 18,
              color: "#E8763A",
              textTransform: "uppercase",
              letterSpacing: 4,
              fontWeight: 600,
              padding: "8px 16px",
              border: "1px solid rgba(232,118,58,0.5)",
              borderRadius: 999,
            }}
          >
            RePrime Terminal
          </div>
          <div style={{ fontSize: 14, color: "rgba(250,250,247,0.55)", letterSpacing: 2 }}>v1.0</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 88, lineHeight: 1.04, fontWeight: 600, letterSpacing: -1 }}>
            The institutional view of
          </div>
          <div style={{ fontSize: 88, lineHeight: 1.04, fontWeight: 600, color: "#E8763A", letterSpacing: -1 }}>
            commercial real estate.
          </div>
          <div
            style={{
              marginTop: 36,
              display: "flex",
              gap: 28,
              fontSize: 20,
              color: "rgba(250,250,247,0.75)",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            <span>22 live sources</span>
            <span style={{ color: "#D4AF37" }}>·</span>
            <span>1,155 catalog</span>
            <span style={{ color: "#D4AF37" }}>·</span>
            <span>one canvas</span>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 16,
            color: "rgba(250,250,247,0.5)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          <span>reprime-atlas.vercel.app</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#E8763A" }} />
            Live · 18 routes
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
