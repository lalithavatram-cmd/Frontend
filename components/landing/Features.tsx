"use client";

import { motion, type Variants } from "framer-motion";

const FEATURES = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: "24/7 AI Receptionist",
    description: "Every call answered, every time — even at 2am. Your AI agent books, qualifies, and routes callers so you never lose a customer to voicemail again.",
    color: "emerald",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: "Automatic Bookings",
    description: "Syncs with your calendar to book, reschedule, and confirm appointments without lifting a finger — your schedule fills itself.",
    color: "teal",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Instant Automation",
    description: "Missed call SMS, lead follow-ups, support tickets — automated workflows deploy alongside every agent so nothing slips through the cracks.",
    color: "emerald",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Smart Lead Qualification",
    description: "Every caller is scored and qualified automatically — your team only speaks with people who are genuinely ready to buy or book.",
    color: "amber",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "Simple Dashboard",
    description: "Call volume, bookings, and agent activity — all in one clear view. Know exactly how your business is performing, any time.",
    color: "teal",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Works for Any Trade",
    description: "Roofers, restaurants, salons, legal firms, medical practices — pre-configured for your industry so it sounds like your business from day one.",
    color: "emerald",
  },
];

const colorMap: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  teal:    "bg-teal-500/10 text-teal-400 border-teal-500/20",
  amber:   "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "circOut" } },
};

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--app-border)]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/6 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
            Built for your business
          </span>
          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[var(--app-text)] sm:text-5xl">
            Everything a small business{" "}
            <span className="gradient-text">actually needs.</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--app-text-muted)]">
            Stop missing leads. Stop wasting staff time on repetitive calls. Start growing — without hiring more people.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-6 transition-colors duration-300 hover:border-[var(--app-border-light)]"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${colorMap[f.color]}`}>
                {f.icon}
              </div>

              <h3 className="mt-4 font-semibold text-[var(--app-text)]">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--app-text-muted)]">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
