"use client";

import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── Animated agent-activity card ─────────────────────────────────────────── */
const ACTIVITY_ITEMS = [
  { icon: "📞", label: "Call answered",     sub: "Brew Bay Café — Inbound",        color: "text-emerald-400", delay: 0 },
  { icon: "📅", label: "Booking confirmed", sub: "Apex Roofing — 14 Jan 10:00 AM", color: "text-teal-400",    delay: 1.2 },
  { icon: "🎯", label: "Lead qualified",    sub: "LexGroup — Budget confirmed",    color: "text-amber-400",   delay: 2.4 },
  { icon: "💬", label: "SMS sent",          sub: "Missed call follow-up",          color: "text-emerald-300", delay: 3.6 },
];

function LiveActivityCard() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % ACTIVITY_ITEMS.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] shadow-[0_24px_60px_-16px_rgba(0,0,0,0.6)]">
      {/* Header bar */}
      <div className="flex items-center gap-2 rounded-t-2xl border-b border-[var(--app-border)] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <span className="flex-1 text-center font-mono text-[11px] text-[var(--app-text-muted)]">
          prompt2deploy · live dashboard
        </span>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
          <span className="h-1.5 w-1.5 animate-ping-slow rounded-full bg-emerald-400" />
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
            style={{ background: active === i ? "rgba(255,255,255,0.03)" : "transparent" }}
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
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Agent status bar */}
      <div className="flex items-center gap-2 rounded-b-2xl border-t border-[var(--app-border)] px-4 py-2.5">
        <div className="h-2 w-2 animate-ping-slow rounded-full bg-emerald-400" />
        <p className="text-[10px] font-medium text-[var(--app-text-muted)]">
          3 AI Agents active · 0 missed calls
        </p>
      </div>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────────── */
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
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-pattern opacity-100" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--app-bg-solid)]" />

      {/* Subtle ambient — no neon */}
      <div aria-hidden className="pointer-events-none absolute left-1/3 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-900/20 blur-[140px]" />

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
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
              <span className="h-1.5 w-1.5 animate-ping-slow rounded-full bg-emerald-400" />
              Built for Small Business
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-bold leading-[1.08] tracking-tight text-[var(--app-text)] sm:text-6xl lg:text-[68px]"
          >
            Stop Losing Customers
            <br />
            <span className="gradient-text">to Missed Calls.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="max-w-lg text-lg leading-relaxed text-[var(--app-text-muted)]"
          >
            Built for small businesses that can&rsquo;t afford to miss a single call.
            Tell us about your business and we&rsquo;ll deploy a custom AI voice agent
            in minutes — no tech team, no complicated setup.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/onboard"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-500"
              >
                Build Your Agent Free
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--app-border)] bg-white/[0.02] px-6 py-3.5 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-white/[0.04] hover:text-[var(--app-text)]"
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
                <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
