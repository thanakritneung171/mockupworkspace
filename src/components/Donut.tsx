"use client";

import { useEffect, useRef } from "react";

type Slice = { value: number; color: string };

export default function Donut({
  data,
  centerValue,
  centerLabel,
  size = 240,
}: {
  data: Slice[];
  centerValue: string;
  centerLabel: string;
  size?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    cv.width = size * dpr;
    cv.height = size * dpr;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.38;
    const lw = size * 0.14;
    const total = data.reduce((s, d) => s + d.value, 0) || 1;

    let start = -Math.PI / 2;
    ctx.lineCap = "butt";
    data.forEach((d) => {
      const ang = (d.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, start, start + ang);
      ctx.strokeStyle = d.color;
      ctx.lineWidth = lw;
      ctx.stroke();
      start += ang;
    });

    const font = getComputedStyle(document.body).fontFamily;
    ctx.fillStyle = "#1f2a37";
    ctx.font = `700 30px ${font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(centerValue, cx, cy - 8);
    ctx.fillStyle = "#93a1b3";
    ctx.font = `500 13px ${font}`;
    ctx.fillText(centerLabel, cx, cy + 16);
  }, [data, centerValue, centerLabel, size]);

  return <canvas ref={ref} style={{ width: size, height: size, maxWidth: "100%" }} aria-hidden="true" />;
}
