import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { FULL_NAME } from "@/lib/site";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "AI that compounds revenue.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#06070b",
          color: "#e7e9ee",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 60% at 20% 20%, rgba(124,92,255,0.55), transparent 60%), radial-gradient(50% 50% at 80% 30%, rgba(34,211,238,0.4), transparent 60%), radial-gradient(60% 60% at 50% 100%, rgba(255,106,213,0.3), transparent 60%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background:
                "linear-gradient(135deg, #7c5cff 0%, #22d3ee 50%, #ff6ad5 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 6,
                background: "#06070b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e7e9ee",
                fontWeight: 800,
                fontSize: 16,
              }}
            >
              H
            </div>
          </div>
          <div style={{ fontSize: 20, letterSpacing: -0.5 }}>{FULL_NAME}</div>
          <div
            style={{
              marginLeft: 12,
              padding: "4px 10px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.12)",
              fontSize: 13,
              color: "#a4aab8",
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}
          >
            AI Business Consultant
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 80,
              lineHeight: 1,
              letterSpacing: -3,
              fontWeight: 700,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#a4aab8",
              maxWidth: 900,
            }}
          >
            Fractional AI leadership and done-with-you builds. Ship ROI in 90 days.
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, color: "#a4aab8" }}>
          <div style={{ display: "flex", gap: 20 }}>
            <span>himanshutaneja.com</span>
            <span>·</span>
            <span>London, UK</span>
          </div>
          <div style={{ fontFamily: "ui-monospace, monospace", letterSpacing: 2 }}>AVAILABLE Q3</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
