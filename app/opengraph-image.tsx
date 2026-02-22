import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#ffe600",
        color: "#000000",
        padding: "64px",
        border: "16px solid #000000",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          border: "8px solid #000000",
          background: "#ffffff",
          padding: "16px 24px",
          fontSize: 88,
          fontWeight: 900,
          textTransform: "uppercase",
        }}
      >
        Nils Btr.
      </div>
      <div
        style={{
          border: "8px solid #000000",
          background: "#ffffff",
          padding: "12px 20px",
          fontSize: 36,
          fontWeight: 700,
          textTransform: "uppercase",
          alignSelf: "flex-start",
        }}
      >
        Connect
      </div>
      <div
        style={{
          fontSize: 30,
          fontWeight: 600,
        }}
      >
        {siteConfig.description}
      </div>
    </div>,
    {
      ...size,
    },
  );
}
