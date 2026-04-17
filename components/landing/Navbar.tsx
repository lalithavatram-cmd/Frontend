"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Prompt2Deploy home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 shadow-sm transition-opacity group-hover:opacity-85">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09Z" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-wide text-[var(--app-text)]">
            Prompt2<span className="text-emerald-400">Deploy</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {[
            { label: "How it works", href: "#how-it-works" },
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-xl px-3.5 py-2 text-sm font-medium text-[var(--app-text-muted)] transition-colors hover:bg-white/5 hover:text-[var(--app-text)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/signin"
            className="rounded-xl px-4 py-2 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-white/5 hover:text-[var(--app-text)]"
          >
            Sign In
          </Link>
          <Link
            href="/onboard"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
          >
            Get Started
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((p) => !p)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] text-[var(--app-text-muted)] transition hover:bg-white/5 hover:text-[var(--app-text)] md:hidden"
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
            className="overflow-hidden border-t border-[var(--app-border)] glass md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {[
                { label: "How it works", href: "#how-it-works" },
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-white/5 hover:text-[var(--app-text)]"
                >
                  {item.label}
                </a>
              ))}
              <div className="my-2 h-px bg-[var(--app-border)]" />
              <Link href="/signin" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-white/5">
                Sign In
              </Link>
              <Link
                href="/onboard"
                onClick={() => setMobileOpen(false)}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                Get Started →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
