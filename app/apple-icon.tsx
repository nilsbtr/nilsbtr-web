import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffe600",
        border: "12px solid #000000",
        color: "#000000",
        fontSize: 98,
        fontWeight: 900,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      N
    </div>,
    size,
  );
}
