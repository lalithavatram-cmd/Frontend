"use client";

import { motion, type Variants } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Describe Your Business",
    description:
      "Tell us your business name, industry, and biggest challenge. No jargon, no tech forms — just plain English. Takes under 2 minutes.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
<<<<<<< HEAD
    accent: "bg-emerald-600",
=======
    accent: "bg-[#546B41]",
    glow: "rgba(84,107,65,0.25)",
>>>>>>> 096e8fb (Initial commit - UI updates)
  },
  {
    number: "02",
    title: "AI Builds Your Agent",
    description:
      "Our AI instantly configures a voice agent with custom scripts, workflows, and automations built specifically for your type of business.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
<<<<<<< HEAD
    accent: "bg-teal-600",
=======
    accent: "bg-[#99AD7A]",
    glow: "rgba(153,173,122,0.25)",
>>>>>>> 096e8fb (Initial commit - UI updates)
  },
  {
    number: "03",
    title: "Go Live — Instantly",
    description:
      "One click and your agent is live on a real phone number, handling customer calls 24/7. Your team focuses on the work that actually matters.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
<<<<<<< HEAD
    accent: "bg-emerald-700",
=======
    accent: "bg-[#546B41]",
    glow: "rgba(84,107,65,0.25)",
>>>>>>> 096e8fb (Initial commit - UI updates)
  },
];

const fadeUp: Variants = {
<<<<<<< HEAD
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" } },
=======
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: "circOut" } },
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
>>>>>>> 096e8fb (Initial commit - UI updates)
};

export function HowItWorks() {
  return (
<<<<<<< HEAD
    <section id="how-it-works" className="relative overflow-hidden py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--app-border)]" />

=======
    <section id="how-it-works" className="relative overflow-hidden py-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--app-border)]" />

      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#99AD7A]/8 blur-[120px]" />

>>>>>>> 096e8fb (Initial commit - UI updates)
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
<<<<<<< HEAD
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/6 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
=======
          <span className="inline-flex items-center gap-2 rounded-full border border-[#546B41]/20 bg-[#546B41]/6 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#546B41]">
>>>>>>> 096e8fb (Initial commit - UI updates)
            Simple 3-step process
          </span>
          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[var(--app-text)] sm:text-5xl">
            From sign-up to live{" "}
            <span className="gradient-text">in under 5 minutes</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--app-text-muted)]">
            No tech team needed. No complicated setup. No waiting weeks for results.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
<<<<<<< HEAD
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12 }}
              className="group relative"
            >
              {/* Connector line between steps */}
              {i < STEPS.length - 1 && (
                <div aria-hidden className="absolute -right-3 top-10 hidden h-px w-6 bg-[var(--app-border)] md:block" />
              )}

              <div className="relative overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-6 transition-colors duration-300 hover:border-[var(--app-border-light)]">
=======
              variants={slideIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.14 }}
              className="group relative"
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14 + 0.4, duration: 0.5 }}
                  style={{ originX: 0 }}
                  aria-hidden
                  className="absolute -right-3 top-10 hidden h-px w-6 bg-gradient-to-r from-[var(--app-border)] to-transparent md:block"
                />
              )}

              <motion.div
                whileHover={{ y: -4, boxShadow: `0 20px 40px -12px ${step.glow}` }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden rounded-2xl border border-[var(--app-border)] bg-white/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[#99AD7A]/60"
              >
>>>>>>> 096e8fb (Initial commit - UI updates)
                {/* Step number */}
                <span className="font-mono text-[11px] font-bold tracking-widest text-[var(--app-text-subtle)]">
                  STEP {step.number}
                </span>

                {/* Icon */}
<<<<<<< HEAD
                <div className={`mt-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${step.accent} text-white`}>
                  {step.icon}
                </div>
=======
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4 }}
                  className={`mt-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${step.accent} text-white shadow-md`}
                >
                  {step.icon}
                </motion.div>
>>>>>>> 096e8fb (Initial commit - UI updates)

                <h3 className="mt-5 text-lg font-semibold text-[var(--app-text)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--app-text-muted)]">
                  {step.description}
                </p>
<<<<<<< HEAD
              </div>
=======

                {/* Corner accent */}
                <div className={`absolute -bottom-6 -right-6 h-16 w-16 rounded-full ${step.accent} opacity-5 blur-lg`} />
              </motion.div>
>>>>>>> 096e8fb (Initial commit - UI updates)
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
