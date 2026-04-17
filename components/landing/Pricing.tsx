"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for trying AgentFlow and getting your first AI agent live.",
    features: [
      "1 AI voice agent",
      "Up to 100 calls/month",
      "2 automation workflows",
      "Basic call analytics",
      "Email support",
    ],
    cta: "Start free",
    href: "/onboard",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/month",
    description: "For small businesses ready to automate customer calls and bookings.",
    features: [
      "5 AI voice agents",
      "Unlimited calls",
      "Unlimited workflows",
      "Advanced analytics & reporting",
      "CRM integrations (HubSpot, Salesforce)",
      "Priority support",
      "Custom agent personalities",
    ],
    cta: "Get started",
    href: "/onboard",
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations requiring bespoke deployments and SLAs.",
    features: [
      "Unlimited agents",
      "White-label option",
      "Custom LLM fine-tuning",
      "Dedicated infrastructure",
      "SSO & SOC 2 compliance",
      "SLA guarantees",
      "Dedicated success manager",
    ],
    cta: "Talk to sales",
    href: "/onboard",
    highlight: false,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "circOut" } },
};

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-32">
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
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/6 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
            Transparent pricing
          </span>
          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[var(--app-text)] sm:text-5xl">
            Start free.{" "}
            <span className="gradient-text">Scale when ready.</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--app-text-muted)]">
            No hidden fees. No long-term contracts. Upgrade or downgrade any time.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className={[
                "relative flex flex-col rounded-2xl border p-8 transition-colors duration-300",
                plan.highlight
                  ? "border-emerald-500/40 bg-emerald-500/[0.05]"
                  : "border-[var(--app-border)] bg-[var(--app-card)] hover:border-[var(--app-border-light)]",
              ].join(" ")}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                  {plan.badge}
                </span>
              )}

              <div>
                <p className="text-sm font-semibold text-[var(--app-text-muted)]">{plan.name}</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-bold tracking-tight text-[var(--app-text)]">{plan.price}</span>
                  {plan.period && <span className="mb-1 text-sm text-[var(--app-text-muted)]">{plan.period}</span>}
                </div>
                <p className="mt-3 text-sm text-[var(--app-text-muted)]">{plan.description}</p>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--app-text-muted)]">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={[
                  "mt-8 flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition",
                  plan.highlight
                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                    : "border border-[var(--app-border)] bg-white/[0.03] text-[var(--app-text)] hover:bg-white/5",
                ].join(" ")}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
