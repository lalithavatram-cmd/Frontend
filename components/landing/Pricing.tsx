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
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "circOut" } },
};

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--app-border)]" />

      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#546B41]/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#546B41]/20 bg-[#546B41]/6 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#546B41]">
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: "circOut" }}
              whileHover={plan.highlight ? { y: -6 } : { y: -4 }}
              className={[
                "relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
                plan.highlight
                  ? "border-[#546B41]/50 bg-gradient-to-b from-[#546B41]/[0.07] to-[#99AD7A]/[0.04] shadow-lg shadow-[#546B41]/10"
                  : "border-[var(--app-border)] bg-white/50 backdrop-blur-sm hover:border-[#99AD7A]/60 hover:shadow-md",
              ].join(" ")}
            >
              {plan.badge && (
                <motion.span
                  initial={{ y: -4, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.3 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#546B41] px-3.5 py-1 text-[11px] font-semibold text-white shadow-sm"
                >
                  {plan.badge}
                </motion.span>
              )}

              <div>
                <p className="text-sm font-semibold text-[var(--app-text-muted)]">{plan.name}</p>
                <div className="mt-3 flex items-end gap-1">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.2, type: "spring", stiffness: 200 }}
                    className="text-4xl font-bold tracking-tight text-[var(--app-text)]"
                  >
                    {plan.price}
                  </motion.span>
                  {plan.period && <span className="mb-1 text-sm text-[var(--app-text-muted)]">{plan.period}</span>}
                </div>
                <p className="mt-3 text-sm text-[var(--app-text-muted)]">{plan.description}</p>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f, fi) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + fi * 0.05 + 0.3 }}
                    className="flex items-start gap-2.5 text-sm text-[var(--app-text-muted)]"
                  >
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#546B41]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </motion.li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8">
                <Link
                  href={plan.href}
                  className={[
                    "flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300",
                    plan.highlight
                      ? "bg-[#546B41] text-white shadow-md shadow-[#546B41]/20 hover:bg-[#3d5030] hover:shadow-lg hover:shadow-[#546B41]/30"
                      : "border border-[var(--app-border)] bg-white text-[var(--app-text)] hover:bg-[#DCCCAC]/30",
                  ].join(" ")}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
