"use client";

import { AgentCursor } from "@/components/ui/AgentCursor";

/**
 * AnimatedBackground — renders a stack of premium animated layers:
 *
 *  1. Six floating gradient blobs (palette colors at very low opacity)
 *     with staggered, long-duration CSS animations for organic movement
 *  2. A soft aurora/glow layer that slowly shifts colors
 *  3. An ultra-subtle noise grain overlay for texture depth
 *  4. The custom AgentCursor component
 *
 * No layout, spacing, or content changes — purely visual enhancement.
 */
export function AnimatedBackground() {
  return (
    <>
      {/* ── Layer 1: Floating gradient blobs ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden"
      >
        {/* Blob 1 — Large sage, top-left origin */}
        <div className="animated-blob animated-blob--1" />
        {/* Blob 2 — Dark green, right side */}
        <div className="animated-blob animated-blob--2" />
        {/* Blob 3 — Warm beige, bottom center */}
        <div className="animated-blob animated-blob--3" />
        {/* Blob 4 — Sage highlight, center-right */}
        <div className="animated-blob animated-blob--4" />
        {/* Blob 5 — Primary green, bottom-left (NEW) */}
        <div className="animated-blob animated-blob--5" />
        {/* Blob 6 — Accent beige, top-right (NEW) */}
        <div className="animated-blob animated-blob--6" />
      </div>

      {/* ── Layer 2: Aurora glow — a very soft, wide gradient that pulses ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-[4] overflow-hidden"
      >
        <div className="aurora-glow" />
      </div>

      {/* ── Layer 3: Noise grain overlay for depth ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-[3] noise-grain"
      />

      {/* ── Agent cursor ── */}
      <AgentCursor />
    </>
  );
}
