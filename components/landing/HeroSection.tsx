"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

/* ── Particle Canvas ─────────────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      radius: number; alpha: number; color: string;
    }> = [];

    const COLORS = [
      "rgba(84,107,65,",
      "rgba(153,173,122,",
      "rgba(220,204,172,",
      "rgba(148,163,184,",
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.25 + 0.05,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(84,107,65,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

/* ── Sparkle Button Wrapper ──────────────────────────────────────────────── */
function SparkleButton({ children, className, href }: { children: React.ReactNode; className: string; href: string }) {
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setSparks((prev) => [...prev.slice(-8), { id, x, y }]);
    setTimeout(() => setSparks((prev) => prev.filter((s) => s.id !== id)), 600);
  }, []);

  return (
    <Link href={href} className={`relative overflow-hidden ${className}`} onMouseMove={handleMouseMove}>
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          initial={{ scale: 0, opacity: 0.9, x: s.x - 6, y: s.y - 6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="pointer-events-none absolute h-3 w-3 rounded-full bg-white/50"
        />
      ))}
      {children}
    </Link>
  );
}

/* ── Animated Activity Card ──────────────────────────────────────────────── */
const ACTIVITY_ITEMS = [
  { icon: "📞", label: "Call answered",     sub: "Brew Bay Café — Inbound",        color: "text-[#546B41]", delay: 0 },
  { icon: "📅", label: "Booking confirmed", sub: "Apex Roofing — 14 Jan 10:00 AM", color: "text-[#99AD7A]",    delay: 1.2 },
  { icon: "🎯", label: "Lead qualified",    sub: "LexGroup — Budget confirmed",    color: "text-amber-600",   delay: 2.4 },
  { icon: "💬", label: "SMS sent",          sub: "Missed call follow-up",          color: "text-[#546B41]", delay: 3.6 },
];

function LiveActivityCard() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % ACTIVITY_ITEMS.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-[var(--app-border)] bg-white/90 shadow-[0_24px_60px_-16px_rgba(84,107,65,0.20)] backdrop-blur-sm"
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 rounded-t-2xl border-b border-[var(--app-border)] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#99AD7A]/80" />
        </div>
        <span className="flex-1 text-center font-mono text-[11px] text-[var(--app-text-muted)]">
          prompt2deploy · live dashboard
        </span>
        <span className="flex items-center gap-1 rounded-full bg-[#546B41]/12 px-2 py-0.5 text-[10px] font-semibold text-[#546B41]">
          <span className="h-1.5 w-1.5 animate-ping-slow rounded-full bg-[#546B41]" />
          LIVE
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-[var(--app-border)] border-b border-[var(--app-border)]">
        {[
          { label: "Calls Today", value: "142" },
          { label: "Booked",      value: "38" },
          { label: "Leads",       value: "21" },
        ].map((s) => (
          <div key={s.label} className="px-4 py-3 text-center">
            <p className="text-lg font-bold text-[var(--app-text)]">{s.value}</p>
            <p className="text-[10px] text-[var(--app-text-muted)]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div className="space-y-1 p-2">
        <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--app-text-muted)]">
          Live Activity
        </p>
        {ACTIVITY_ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            animate={{ opacity: active === i ? 1 : 0.35, x: active === i ? 0 : -4 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition"
            style={{ background: active === i ? "rgba(84,107,65,0.06)" : "transparent" }}
          >
            <span className="text-base">{item.icon}</span>
            <div className="min-w-0 flex-1">
              <p className={`text-xs font-semibold ${item.color}`}>{item.label}</p>
              <p className="truncate text-[10px] text-[var(--app-text-muted)]">{item.sub}</p>
            </div>
            {active === i && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="h-1.5 w-1.5 rounded-full bg-[#546B41]"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Agent status bar */}
      <div className="flex items-center gap-2 rounded-b-2xl border-t border-[var(--app-border)] px-4 py-2.5">
        <div className="h-2 w-2 animate-ping-slow rounded-full bg-[#546B41]" />
        <p className="text-[10px] font-medium text-[var(--app-text-muted)]">
          3 AI Agents active · 0 missed calls
        </p>
      </div>
    </motion.div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), { stiffness: 60, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-4, 4]), { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Particle layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <ParticleCanvas />
      </div>

      {/* Animated gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 60, -30, 0], y: [0, -50, 40, 0], scale: [1, 1.08, 0.95, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute -left-[15%] -top-[15%] h-[700px] w-[700px] rounded-full bg-[#99AD7A]/12 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -40, 50, 0], y: [0, 60, -30, 0], scale: [1, 1.1, 0.92, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute -right-[15%] top-[20%] h-[600px] w-[600px] rounded-full bg-[#e0f2fe]/50 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.06, 0.97, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full bg-[#DCCCAC]/15 blur-[130px]"
        />

        {/* Subtle grid */}
        <div className="absolute inset-0 grid-pattern opacity-[0.18]" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60" />
      </div>

      {/* Content grid */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-12">
        {/* Left — text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-7"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#546B41]/25 bg-[#546B41]/8 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#546B41]">
              <span className="h-1.5 w-1.5 animate-ping-slow rounded-full bg-[#546B41]" />
              Built for Small Business
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-[var(--app-text)] sm:text-6xl lg:text-[68px]">
              Expert-level AI,
              <br />
              <span className="gradient-text">without the expert-level invoice.</span>
            </h1>
            <p className="text-xl font-medium text-[var(--app-text)]">
              Build, deploy, and manage AI agents — <span className="font-semibold text-[#546B41]">without any AI skills.</span>
            </p>
          </motion.div>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="max-w-lg text-lg leading-relaxed text-[var(--app-text-muted)]"
          >
            Most businesses miss opportunities because they lack the time, team, or expertise to build automation. Our platform lets you create, deploy, and manage powerful AI agents in minutes — all in one place, no technical skills required.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <SparkleButton
                href="/onboard"
                className="inline-flex items-center gap-2 rounded-xl bg-[#546B41] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#546B41]/25 transition-all duration-300 hover:bg-[#3d5030] hover:shadow-[#546B41]/40 hover:shadow-xl"
              >
                Build Your Agent Free
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </SparkleButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--app-border)] bg-white/70 px-6 py-3.5 text-sm font-medium text-[var(--app-text-muted)] backdrop-blur-sm transition-all hover:bg-[#DCCCAC]/30 hover:text-[var(--app-text)]"
              >
                See how it works
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Trust signals */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-xs text-[var(--app-text-muted)]">
            {["No credit card required", "Up and running in 5 minutes", "Cancel any time"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-[#546B41]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — animated card */}
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "circOut", delay: 0.3 }}
          className="animate-float lg:block"
        >
          <LiveActivityCard />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#how-it-works" aria-label="Scroll down" className="flex flex-col items-center gap-1.5 text-[var(--app-text-subtle)] transition hover:text-[var(--app-text-muted)]">
          <span className="text-[10px] font-medium uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
