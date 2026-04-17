"use client";

import { motion, type Variants } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "We went from missing 30% of after-hours calls to zero. The AI agent handles bookings overnight and our calendar fills itself. Genuinely transformed how we work.",
    name: "Marcus T.",
    role: "Owner, Apex Roofing",
    avatar: "MT",
    color: "bg-emerald-600",
  },
  {
    quote: "Set up in under 10 minutes. Our reception agent now handles initial qualifications and I only speak to clients who are actually ready. Revenue doubled in 60 days.",
    name: "Priya S.",
    role: "Managing Partner, LexGroup Legal",
    avatar: "PS",
    color: "bg-teal-600",
  },
  {
    quote: "The workflow automation was the surprise — every missed call gets an SMS follow-up automatically. We recaptured 40+ leads in the first month we would have lost.",
    name: "Jamie O.",
    role: "Director, Brew Bay Hospitality",
    avatar: "JO",
    color: "bg-emerald-700",
  },
  {
    quote: "I was skeptical about AI handling client calls in a medical spa. Within a week it was booking consultations better than our front desk — patients love it.",
    name: "Dr. Chen L.",
    role: "Founder, Luminary Aesthetics",
    avatar: "CL",
    color: "bg-teal-700",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "circOut" } },
};

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--app-border)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/6 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-400">
            Customer stories
          </span>
          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[var(--app-text)] sm:text-5xl">
            Small businesses{" "}
            <span className="gradient-text">growing with AI</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--app-text-muted)]">
            Real results from real business owners — live in hours, not weeks.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-5 rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-6 transition-colors duration-300 hover:border-[var(--app-border-light)]"
            >
              <StarRow />
              <p className="flex-1 text-sm leading-relaxed text-[var(--app-text-muted)]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${t.color} text-[11px] font-bold text-white`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--app-text)]">{t.name}</p>
                  <p className="text-[11px] text-[var(--app-text-muted)]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-border)] sm:grid-cols-4"
        >
          {[
            { value: "500+",  label: "Agents deployed" },
            { value: "98%",   label: "Call answer rate" },
            { value: "3 min", label: "Avg. setup time" },
            { value: "24/7",  label: "Always available" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 bg-[var(--app-card)] px-6 py-8 text-center">
              <span className="text-3xl font-bold text-[var(--app-text)]">{s.value}</span>
              <span className="text-sm text-[var(--app-text-muted)]">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
