"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ParallaxBackground — renders the same background system used
 * on the landing page (gradient blobs, grid overlay, radial glows)
 * with a subtle mouse-driven parallax/zoom effect.
 *
 * The background layer translates + scales very slightly toward
 * the cursor position, creating a soft depth feel without
 * distracting from form content.
 */
export function ParallaxBackground() {
  const layerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const layer = layerRef.current;
    if (!layer) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetScale = 1;
    let currentScale = 1;

    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 to 1
      const cy = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      targetX = cx * 12; // max 12px shift
      targetY = cy * 8;  // max 8px shift
      targetScale = 1 + Math.abs(cx * cy) * 0.015; // max ~1.5% zoom
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      targetScale = 1;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      currentScale += (targetScale - currentScale) * 0.04;
      layer.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Parallax-moving layer */}
      <div
        ref={layerRef}
        className="absolute inset-[-40px]"
        style={{
          transition: mounted ? "none" : "transform 0.6s ease-out",
          willChange: "transform",
        }}
      >
        {/* ── Radial gradient background (matching landing page) ── */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 80% 10%, rgba(186,230,253,0.50) 0%, transparent 38%),
              radial-gradient(circle at 10% 15%, rgba(167,243,208,0.28) 0%, transparent 35%),
              radial-gradient(circle at 50% 60%, rgba(196,220,158,0.18) 0%, transparent 40%),
              radial-gradient(circle at 90% 85%, rgba(186,230,253,0.30) 0%, transparent 35%),
              radial-gradient(circle at 20% 80%, rgba(167,243,208,0.20) 0%, transparent 30%),
              #f8fafc
            `,
          }}
        />

        {/* ── Grid overlay ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,116,139,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,116,139,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />

        {/* ── Floating blobs ── */}
        <div className="animated-blob animated-blob--1" />
        <div className="animated-blob animated-blob--2" />
        <div className="animated-blob animated-blob--3" />
        <div className="animated-blob animated-blob--4" />

        {/* ── Central glow ── */}
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(153,173,122,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* ── Corner accent glow ── */}
        <div
          className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(220,204,172,0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>
    </div>
  );
}
