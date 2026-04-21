"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
 HEAD

import { ParallaxBackground } from "@/components/ui/ParallaxBackground";
 096e8fb (Initial commit - UI updates)

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

const inputCls =
 HEAD
  "w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3 text-sm text-[var(--app-text)] outline-none transition " +
  "placeholder:text-[var(--app-text-muted)]/50 " +
  "focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/15";

const inputErrCls = "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/15";

  "w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] px-4 py-3 text-sm text-[var(--app-text)] outline-none transition " +
  "placeholder:text-[var(--app-text-muted)]/50 " +
  "focus:border-[#546B41]/50 focus:ring-2 focus:ring-[#546B41]/15";

const inputErrCls = "border-red-400/50 focus:border-red-400/60 focus:ring-red-400/15";
 096e8fb (Initial commit - UI updates)

type Errors = Partial<Record<"name" | "email" | "form", string>>;

export default function SignInPage() {
  const router = useRouter();
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [touched, setTouched] = useState({ name: false, email: false });
  const [errors, setErrors]   = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const computed = useMemo<Errors>(() => {
    const e: Errors = {};
    if (!name.trim())              e.name = "Name is required.";
    else if (name.trim().length < 2) e.name = "Minimum 2 characters.";
    if (!email.trim())             e.email = "Email is required.";
    else if (!isValidEmail(email)) e.email = "Enter a valid email address.";
    return e;
  }, [name, email]);

  const canSubmit = Object.keys(computed).length === 0 && !isSubmitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true });
    setErrors({});
    if (Object.keys(computed).length > 0) { setErrors(computed); return; }
    setIsSubmitting(true);
    try {
      // Generate or reuse a persistent user_id
      let userId = localStorage.getItem("agentflow_user_id");
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem("agentflow_user_id", userId);
      }
      // Persist display name for dashboard greeting
      localStorage.setItem("agentflow_user_name", name.trim());
      router.push("/dashboard");
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  }

 HEAD

  function handleGoogleSignIn() {
    // Generate or reuse a persistent user_id
    let userId = localStorage.getItem("agentflow_user_id");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("agentflow_user_id", userId);
    }
    localStorage.setItem("agentflow_user_name", "Google User");
    router.push("/dashboard");
  }

 096e8fb (Initial commit - UI updates)
  const showNameErr  = (touched.name  || !!errors.name)  && computed.name;
  const showEmailErr = (touched.email || !!errors.email) && computed.email;

  return (
 HEAD
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--app-bg-solid)] px-4 py-12">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-900/15 blur-[120px]" />

      <div className="relative w-full max-w-md">

    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* ── Parallax background (consistent with landing page) ── */}
      <ParallaxBackground />

      <div className="relative z-10 w-full max-w-md">
 096e8fb (Initial commit - UI updates)
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col items-center gap-3"
        >
 HEAD
          <Link href="/" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 shadow-md">

          <Link href="/" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#546B41] shadow-md">
 096e8fb (Initial commit - UI updates)
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09Z" />
            </svg>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--app-text)]">Get started free</h1>
            <p className="mt-1 text-sm text-[var(--app-text-muted)]">Sign in to your Prompt2Deploy account</p>
          </div>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "circOut" }}
 HEAD
          className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-7 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] sm:p-8"

          className="rounded-2xl border border-[var(--app-border)] bg-white/80 backdrop-blur-xl p-7 shadow-[0_24px_80px_-20px_rgba(84,107,65,0.15)] sm:p-8"
 096e8fb (Initial commit - UI updates)
        >
          {/* Form error */}
          <AnimatePresence>
            {errors.form && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
 HEAD
                className="mb-5 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-300"

                className="mb-5 rounded-xl border border-red-400/20 bg-red-400/8 px-4 py-3 text-sm text-red-500"
 096e8fb (Initial commit - UI updates)
              >
                {errors.form}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[var(--app-text-muted)]">
                Your Name
              </label>
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                className={[inputCls, showNameErr ? inputErrCls : ""].join(" ")}
                placeholder="Jane Smith"
                aria-invalid={!!showNameErr}
              />
              {showNameErr && (
 HEAD
                <p className="mt-1.5 text-xs text-red-300">{showNameErr}</p>

                <p className="mt-1.5 text-xs text-red-500">{showNameErr}</p>
 096e8fb (Initial commit - UI updates)
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[var(--app-text-muted)]">
                Email
              </label>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                className={[inputCls, showEmailErr ? inputErrCls : ""].join(" ")}
                placeholder="you@company.com"
                aria-invalid={!!showEmailErr}
              />
              {showEmailErr && (
 HEAD
                <p className="mt-1.5 text-xs text-red-300">{showEmailErr}</p>

                <p className="mt-1.5 text-xs text-red-500">{showEmailErr}</p>
 096e8fb (Initial commit - UI updates)
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
 HEAD
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:pointer-events-none disabled:opacity-60"

              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#546B41] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#99AD7A] disabled:pointer-events-none disabled:opacity-60"
 096e8fb (Initial commit - UI updates)
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Setting up…
                </>
              ) : (
                "Continue →"
              )}
            </button>
          </form>

 HEAD

          {/* ── Divider ── */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--app-border)]" />
            <span className="text-xs font-medium text-[var(--app-text-subtle)]">or</span>
            <div className="h-px flex-1 bg-[var(--app-border)]" />
          </div>

          {/* ── Google Sign-In ── */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="group flex w-full items-center justify-center gap-3 rounded-xl border border-[var(--app-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--app-text)] shadow-sm transition-all duration-200 hover:border-[#546B41]/30 hover:bg-[#546B41]/[0.03] hover:shadow-[0_0_16px_rgba(84,107,65,0.08)]"
          >
            {/* Google "G" icon */}
            <svg width="18" height="18" viewBox="0 0 48 48" className="shrink-0">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 010-9.18l-7.98-6.19a24.006 24.006 0 000 21.56l7.98-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continue with Google
          </button>

 096e8fb (Initial commit - UI updates)
          {/* Trust signal */}
          <p className="mt-5 text-center text-xs text-[var(--app-text-muted)]">
            Free for 1 month &bull; No credit card required
          </p>
        </motion.div>

        {/* Footer links */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-xs text-[var(--app-text-muted)]"
        >
          New to Prompt2Deploy?{" "}
 HEAD
          <Link href="/onboard" className="font-semibold text-emerald-400 transition hover:text-emerald-300">

          <Link href="/onboard" className="font-semibold text-[#546B41] transition hover:text-[#99AD7A]">
 096e8fb (Initial commit - UI updates)
            Deploy your first agent free →
          </Link>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <Link href="/" className="text-xs text-[var(--app-text-subtle)] transition hover:text-[var(--app-text-muted)]">
            ← Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
