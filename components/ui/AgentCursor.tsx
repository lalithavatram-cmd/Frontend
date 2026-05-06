"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────── types ─────────────────────────── */
interface Vec2 {
  x: number;
  y: number;
}

interface TrailDot {
  x: number;
  y: number;
  alpha: number;
  scale: number;
}

/**
 * AgentCursor — a minimal, modern robot-icon custom cursor.
 *
 *  • A clean robot head SVG as the outer cursor element
 *  • Spring-physics smooth trailing (slight easing lag)
 *  • A small inner crosshair dot for precision
 *  • On hover over interactive elements:
 *    – Robot scales up slightly
 *    – Eyes glow green
 *    – Subtle ring highlight appears
 *  • Trailing particle ghosts + click ripple
 *  • Fallback to native cursor on touch devices
 */
export function AgentCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);

  const mousePos = useRef<Vec2>({ x: -100, y: -100 });
  const renderPos = useRef<Vec2>({ x: -100, y: -100 });
  const velocity = useRef<Vec2>({ x: 0, y: 0 });
  const trail = useRef<TrailDot[]>([]);

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  const ripples = useRef<{ x: number; y: number; t: number }[]>([]);

  const isTouch =
    typeof window !== "undefined" && "ontouchstart" in window;

  const onOverInteractive = useCallback(() => setHovering(true), []);
  const onOutInteractive = useCallback(() => setHovering(false), []);

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onDown = () => {
      setClicking(true);
      ripples.current.push({
        x: mousePos.current.x,
        y: mousePos.current.y,
        t: 0,
      });
    };
    const onUp = () => setClicking(false);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const INTERACTIVE =
      "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]";

    const attach = () => {
      const els = document.querySelectorAll(INTERACTIVE);
      els.forEach((el) => {
        el.addEventListener("mouseenter", onOverInteractive);
        el.addEventListener("mouseleave", onOutInteractive);
      });
      return els;
    };

    let currentEls = attach();
    const observer = new MutationObserver(() => {
      currentEls.forEach((el) => {
        el.removeEventListener("mouseenter", onOverInteractive);
        el.removeEventListener("mouseleave", onOutInteractive);
      });
      currentEls = attach();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    /* Canvas for trail particles */
    const canvas = trailCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* Animation loop */
    const STIFFNESS = 0.09;
    const DAMPING = 0.74;
    const TRAIL_INTERVAL = 3;
    let frame = 0;
    let raf: number;

    const animate = () => {
      frame++;
      const target = mousePos.current;
      const cur = renderPos.current;
      const vel = velocity.current;

      // Spring physics
      const dx = target.x - cur.x;
      const dy = target.y - cur.y;
      vel.x = (vel.x + dx * STIFFNESS) * DAMPING;
      vel.y = (vel.y + dy * STIFFNESS) * DAMPING;
      cur.x += vel.x;
      cur.y += vel.y;

      // Position outer robot icon
      if (outerRef.current) {
        const size = hovering ? 44 : 34;
        outerRef.current.style.transform = `translate(${cur.x - size / 2}px, ${cur.y - size / 2}px)`;
      }

      // Inner crosshair dot (instant follow)
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${target.x - 3}px, ${target.y - 3}px)`;
      }

      // Trail dots
      if (frame % TRAIL_INTERVAL === 0) {
        const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2);
        if (speed > 1.8) {
          trail.current.push({
            x: cur.x,
            y: cur.y,
            alpha: Math.min(speed / 14, 0.45),
            scale: 1,
          });
          if (trail.current.length > 20) trail.current.shift();
        }
      }

      // Draw trail + ripples
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = trail.current.length - 1; i >= 0; i--) {
          const dot = trail.current[i];
          dot.alpha *= 0.91;
          dot.scale *= 0.95;
          if (dot.alpha < 0.01) {
            trail.current.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 2.5 * dot.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(84, 107, 65, ${dot.alpha})`;
          ctx.fill();
        }

        for (let i = ripples.current.length - 1; i >= 0; i--) {
          const r = ripples.current[i];
          r.t += 0.03;
          if (r.t >= 1) {
            ripples.current.splice(i, 1);
            continue;
          }
          const radius = r.t * 35;
          const alpha = (1 - r.t) * 0.25;
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(84, 107, 65, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      currentEls.forEach((el) => {
        el.removeEventListener("mouseenter", onOverInteractive);
        el.removeEventListener("mouseleave", onOutInteractive);
      });
    };
  }, [visible, hovering, isTouch, onOverInteractive, onOutInteractive]);

  if (isTouch) return null;

  /* ── Derived styles ── */
  const cursorSize = hovering ? 44 : 34;
  const glowShadow = hovering
    ? "0 0 14px rgba(84,107,65,0.25), 0 0 28px rgba(153,173,122,0.12)"
    : "0 1px 4px rgba(0,0,0,0.08)";
  const eyeColor = hovering ? "#99AD7A" : "#546B41";
  const eyeGlow = hovering ? "drop-shadow(0 0 3px rgba(153,173,122,0.6))" : "none";

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={trailCanvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden
      />

      {/* Outer — robot icon, spring-trailing */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          style={{
            width: cursorSize,
            height: cursorSize,
            transition:
              "width 0.3s cubic-bezier(.4,0,.2,1), height 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: hovering
              ? "rgba(255,255,255,0.92)"
              : "rgba(255,255,255,0.8)",
            boxShadow: glowShadow,
            backdropFilter: "blur(8px)",
            border: hovering
              ? "1.5px solid rgba(84,107,65,0.35)"
              : "1px solid rgba(84,107,65,0.15)",
          }}
        >
          {/* Robot head SVG — minimal, modern, outline style */}
          <svg
            width={hovering ? 22 : 18}
            height={hovering ? 22 : 18}
            viewBox="0 0 32 32"
            fill="none"
            style={{
              transition: "width 0.3s, height 0.3s, filter 0.3s",
              filter: eyeGlow,
            }}
          >
            {/* Antenna */}
            <line
              x1="16" y1="4" x2="16" y2="8"
              stroke={eyeColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{ transition: "stroke 0.3s" }}
            />
            <circle
              cx="16" cy="3" r="1.8"
              fill={hovering ? "#99AD7A" : "none"}
              stroke={eyeColor}
              strokeWidth="1.4"
              style={{ transition: "fill 0.3s, stroke 0.3s" }}
            />
            {/* Head — rounded rectangle */}
            <rect
              x="6" y="8" width="20" height="16" rx="5"
              stroke={eyeColor}
              strokeWidth="1.8"
              fill="none"
              style={{ transition: "stroke 0.3s" }}
            />
            {/* Left eye */}
            <circle
              cx="12" cy="16" r="2.2"
              fill={eyeColor}
              style={{ transition: "fill 0.3s" }}
            />
            {/* Right eye */}
            <circle
              cx="20" cy="16" r="2.2"
              fill={eyeColor}
              style={{ transition: "fill 0.3s" }}
            />
            {/* Mouth — a small horizontal line */}
            <line
              x1="12.5" y1="21" x2="19.5" y2="21"
              stroke={eyeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ transition: "stroke 0.3s" }}
            />
            {/* Left ear */}
            <rect
              x="3" y="13" width="3" height="6" rx="1.5"
              stroke={eyeColor}
              strokeWidth="1.4"
              fill="none"
              style={{ transition: "stroke 0.3s" }}
            />
            {/* Right ear */}
            <rect
              x="26" y="13" width="3" height="6" rx="1.5"
              stroke={eyeColor}
              strokeWidth="1.4"
              fill="none"
              style={{ transition: "stroke 0.3s" }}
            />
          </svg>
        </div>

        {/* Hover glow ring — appears only when hovering */}
        {hovering && (
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              border: "1.5px solid rgba(84,107,65,0.12)",
              boxShadow: "0 0 12px rgba(153,173,122,0.15)",
              animation: "cursor-ring-pulse 1.5s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Inner precision dot — instant follow */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <div
          style={{
            width: hovering ? 0 : clicking ? 4 : 6,
            height: hovering ? 0 : clicking ? 4 : 6,
            borderRadius: "50%",
            backgroundColor: "#546B41",
            transition: "width 0.2s, height 0.2s",
            boxShadow: "0 0 4px rgba(84,107,65,0.2)",
          }}
        />
      </div>
    </>
  );
}
