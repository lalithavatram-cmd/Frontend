"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
<<<<<<< HEAD
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 18);
=======
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
>>>>>>> 096e8fb (Initial commit - UI updates)
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

<<<<<<< HEAD
  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-[var(--app-border)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
=======
  const scrolled = scrollY > 24;
  const logoScale = scrolled ? 0.85 : 1;
  const navPy = scrolled ? "py-2" : "py-3.5";

  return (
    <motion.header
      animate={{ backdropFilter: scrolled ? "blur(20px)" : "blur(0px)" }}
      transition={{ duration: 0.4 }}
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 border-b border-[var(--app-border)] shadow-[0_2px_20px_rgba(84,107,65,0.08)]"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${navPy}`}>
>>>>>>> 096e8fb (Initial commit - UI updates)
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Prompt2Deploy home"
        >
<<<<<<< HEAD
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 shadow-sm transition-opacity group-hover:opacity-85">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09Z" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-wide text-[var(--app-text)]">
            Prompt2<span className="text-emerald-400">Deploy</span>
          </span>
=======
          <motion.div
            animate={{ scale: logoScale }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#546B41] shadow-sm transition-opacity group-hover:opacity-85"
          >
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09Z" />
            </svg>
          </motion.div>
          <motion.span
            animate={{ fontSize: scrolled ? "13px" : "14px" }}
            transition={{ duration: 0.4 }}
            className="font-semibold tracking-wide text-[var(--app-text)]"
          >
            Prompt2<span className="text-[#546B41]">Deploy</span>
          </motion.span>
>>>>>>> 096e8fb (Initial commit - UI updates)
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {[
            { label: "How it works", href: "#how-it-works" },
<<<<<<< HEAD
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
=======
            { label: "Features",     href: "#features" },
            { label: "Pricing",      href: "#pricing" },
            { label: "Contact",      href: "#contact" },
>>>>>>> 096e8fb (Initial commit - UI updates)
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
<<<<<<< HEAD
              className="rounded-xl px-3.5 py-2 text-sm font-medium text-[var(--app-text-muted)] transition-colors hover:bg-white/5 hover:text-[var(--app-text)]"
=======
              className="rounded-xl px-3.5 py-2 text-sm font-medium text-[var(--app-text-muted)] transition-all duration-200 hover:bg-[#DCCCAC]/30 hover:text-[var(--app-text)]"
>>>>>>> 096e8fb (Initial commit - UI updates)
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/signin"
<<<<<<< HEAD
            className="rounded-xl px-4 py-2 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-white/5 hover:text-[var(--app-text)]"
=======
            className="rounded-xl px-4 py-2 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-[#DCCCAC]/30 hover:text-[var(--app-text)]"
>>>>>>> 096e8fb (Initial commit - UI updates)
          >
            Sign In
          </Link>
          <Link
            href="/onboard"
<<<<<<< HEAD
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
          >
            Get Started
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
=======
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-[#546B41] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#3d5030] hover:shadow-[0_0_20px_rgba(84,107,65,0.4)]"
          >
            Get Started
            <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
>>>>>>> 096e8fb (Initial commit - UI updates)
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((p) => !p)}
<<<<<<< HEAD
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] text-[var(--app-text-muted)] transition hover:bg-white/5 hover:text-[var(--app-text)] md:hidden"
=======
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] text-[var(--app-text-muted)] transition hover:bg-[#DCCCAC]/30 hover:text-[var(--app-text)] md:hidden"
>>>>>>> 096e8fb (Initial commit - UI updates)
          aria-label="Toggle menu"
        >
          <motion.div
            animate={mobileOpen ? "open" : "closed"}
            className="flex h-4 w-4 flex-col justify-between"
          >
            <motion.span
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-full rounded-full bg-current"
            />
            <motion.span
              variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
              transition={{ duration: 0.15 }}
              className="block h-0.5 w-full rounded-full bg-current"
            />
            <motion.span
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-full rounded-full bg-current"
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "circOut" }}
<<<<<<< HEAD
            className="overflow-hidden border-t border-[var(--app-border)] glass md:hidden"
=======
            className="overflow-hidden border-t border-[var(--app-border)] bg-white/90 backdrop-blur-xl md:hidden"
>>>>>>> 096e8fb (Initial commit - UI updates)
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {[
                { label: "How it works", href: "#how-it-works" },
<<<<<<< HEAD
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
=======
                { label: "Features",     href: "#features" },
                { label: "Pricing",      href: "#pricing" },
                { label: "Contact",      href: "#contact" },
>>>>>>> 096e8fb (Initial commit - UI updates)
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
<<<<<<< HEAD
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-white/5 hover:text-[var(--app-text)]"
=======
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-[#DCCCAC]/30 hover:text-[var(--app-text)]"
>>>>>>> 096e8fb (Initial commit - UI updates)
                >
                  {item.label}
                </a>
              ))}
              <div className="my-2 h-px bg-[var(--app-border)]" />
<<<<<<< HEAD
              <Link href="/signin" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-white/5">
=======
              <Link href="/signin" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-[#DCCCAC]/30">
>>>>>>> 096e8fb (Initial commit - UI updates)
                Sign In
              </Link>
              <Link
                href="/onboard"
                onClick={() => setMobileOpen(false)}
<<<<<<< HEAD
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white"
=======
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-[#546B41] px-4 py-2.5 text-sm font-semibold text-white"
>>>>>>> 096e8fb (Initial commit - UI updates)
              >
                Get Started →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
<<<<<<< HEAD
    </header>
=======

      {/* ── Shining gradient line ── */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden"
      >
        {/* Base gradient bar */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #546B41, #7A9A5E, #99AD7A, #BFCDA0, #DCCCAC, #BFCDA0, #99AD7A, #7A9A5E, #546B41)",
            opacity: 0.85,
          }}
        />
        {/* Bright shine streak — sweeps left → right */}
        <div
          className="navbar-shine-streak absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, transparent 35%, rgba(255,255,255,0.0) 40%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.0) 60%, transparent 65%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
        />
        {/* Subtle glow beneath the line */}
        <div
          className="absolute inset-x-0 bottom-0 h-[6px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(153,173,122,0.3), rgba(220,204,172,0.2), rgba(153,173,122,0.3), transparent)",
            filter: "blur(4px)",
            opacity: 0.6,
          }}
        />
      </div>
    </motion.header>
>>>>>>> 096e8fb (Initial commit - UI updates)
  );
}
