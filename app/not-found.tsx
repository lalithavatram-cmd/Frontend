"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--app-bg-solid)] px-4 text-center">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
<<<<<<< HEAD
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-900/15 blur-[120px]" />
=======
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#99AD7A]/15 blur-[120px]" />
>>>>>>> 096e8fb (Initial commit - UI updates)

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="relative flex flex-col items-center gap-6"
      >
        {/* 404 number */}
        <div className="relative">
          <p className="text-[120px] font-black leading-none tracking-tighter text-[var(--app-border)] sm:text-[160px]">
            404
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-[120px] font-black leading-none tracking-tighter text-transparent sm:text-[160px]"
<<<<<<< HEAD
             style={{ WebkitTextStroke: "1px rgba(16,185,129,0.2)" }}>
=======
             style={{ WebkitTextStroke: "1px rgba(84,107,65,0.25)" }}>
>>>>>>> 096e8fb (Initial commit - UI updates)
            404
          </p>
        </div>

        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)]">
          <svg className="h-7 w-7 text-[var(--app-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[var(--app-text)]">Page not found</h1>
          <p className="mt-2 text-sm text-[var(--app-text-muted)]">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
<<<<<<< HEAD
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
=======
            className="inline-flex items-center gap-2 rounded-xl bg-[#546B41] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#99AD7A]"
>>>>>>> 096e8fb (Initial commit - UI updates)
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to home
          </Link>
          <Link
            href="/dashboard"
<<<<<<< HEAD
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] px-5 py-2.5 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-white/[0.03] hover:text-[var(--app-text)]"
=======
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] px-5 py-2.5 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-[#DCCCAC]/20 hover:text-[var(--app-text)]"
>>>>>>> 096e8fb (Initial commit - UI updates)
          >
            Go to dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
