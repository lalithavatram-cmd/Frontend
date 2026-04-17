"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

/* ── Shared input + textarea styles ────────────────────────────────────────── */
const inputCls =
  "w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3 text-sm text-[var(--app-text)] outline-none transition " +
  "placeholder:text-[var(--app-text-muted)]/60 " +
  "focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/15";

const labelCls = "block text-xs font-semibold uppercase tracking-widest text-[var(--app-text-muted)] mb-2";

const SCALE_OPTIONS = [
  { value: "1-10",    label: "1–10 employees" },
  { value: "11-50",   label: "11–50 employees" },
  { value: "51-200",  label: "51–200 employees" },
  { value: "201-1000",label: "201–1,000 employees" },
  { value: "1000+",   label: "1,000+ employees" },
];

const STEP_META = [
  { title: "Business Profile",   desc: "Tell us who you are — we'll tailor your agent to your exact context." },
  { title: "Current Challenges", desc: "What's slowing you down? The more detail, the smarter your agent." },
  { title: "Define Your Goal",   desc: "What does success look like? This guides your agent's entire focus." },
];

const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.38, ease: "circOut" } },
  exit:  (dir: number) => ({ opacity: 0, x: dir * -40, transition: { duration: 0.25, ease: "circOut" } }),
};

export default function OnboardPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    business_name: "",
    industry: "",
    company_scale: "",
    pain_points: "",
    tools: "",
    goal: "",
  });

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScaleOptions, setShowScaleOptions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const canGoNext = step === 1
    ? form.business_name.trim().length > 0 && form.industry.trim().length > 0
    : true;

  const handleAnalyse = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/onboard/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Analysis failed. Please try again.");
      const data = await res.json();
      localStorage.setItem("analysis", JSON.stringify(data));
      router.push("/onboard/preview");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const meta = STEP_META[step - 1];

  return (
    <div className="relative min-h-screen bg-[var(--app-bg-solid)] px-4 py-8 sm:py-14">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-900/15 blur-[120px]" />

      {/* Back link */}
      <div className="relative mx-auto max-w-xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-[var(--app-text-muted)] transition hover:text-[var(--app-text)]"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to home
        </Link>
      </div>

      <div className="relative mx-auto w-full max-w-xl">
        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)]">
          {/* Top strip */}
          <div className="border-b border-[var(--app-border)] px-7 py-5">
            {/* Step dots */}
            <div className="mb-4 flex items-center gap-2">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={[
                    "h-1.5 flex-1 rounded-full transition-all duration-500",
                    n < step
                      ? "bg-emerald-500"
                      : n === step
                      ? "bg-emerald-500"
                      : "bg-[var(--app-border)]",
                  ].join(" ")}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--app-text-muted)]">
                Step {step} of 3
              </span>
              <span className="text-xs text-[var(--app-text-subtle)]">
                {Math.round((step / 3) * 100)}% complete
              </span>
            </div>
          </div>

          {/* Step content */}
          <div className="overflow-hidden px-7 py-7">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Title */}
                <div className="mb-7">
                  <h2 className="text-2xl font-bold tracking-tight text-[var(--app-text)]">
                    {meta.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-[var(--app-text-muted)]">{meta.desc}</p>
                </div>

                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Business Name *</label>
                      <input
                        name="business_name"
                        className={inputCls}
                        placeholder="e.g. Brew Bay, Apex Roofing, LexGroup"
                        value={form.business_name}
                        onChange={handleChange}
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Industry *</label>
                      <input
                        name="industry"
                        className={inputCls}
                        placeholder="e.g. Hospitality, HVAC, Legal, SaaS, Retail"
                        value={form.industry}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Team Size</label>
                      <button
                        type="button"
                        onClick={() => setShowScaleOptions((p) => !p)}
                        className={[
                          "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition",
                          showScaleOptions
                            ? "border-emerald-500/50 bg-emerald-500/8 text-[var(--app-text)]"
                            : "border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text-muted)] hover:bg-white/[0.03]",
                        ].join(" ")}
                      >
                        <span>{form.company_scale ? SCALE_OPTIONS.find((o) => o.value === form.company_scale)?.label : "Select team size"}</span>
                        <svg
                          className={["h-4 w-4 transition-transform duration-200", showScaleOptions ? "rotate-180" : ""].join(" ")}
                          fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                        >
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {showScaleOptions && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-wrap gap-2 pt-3">
                              {SCALE_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => { setForm((p) => ({ ...p, company_scale: opt.value })); setShowScaleOptions(false); }}
                                  className={[
                                    "rounded-xl border px-3.5 py-2 text-sm font-medium transition",
                                    form.company_scale === opt.value
                                      ? "border-emerald-500/50 bg-emerald-500/10 text-[var(--app-text)]"
                                      : "border-[var(--app-border)] text-[var(--app-text-muted)] hover:bg-white/[0.03]",
                                  ].join(" ")}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Current Challenges</label>
                      <textarea
                        name="pain_points"
                        className={inputCls + " min-h-[120px] resize-none"}
                        placeholder="e.g. Missed calls after hours, slow response times, manual bookings eating up staff time..."
                        value={form.pain_points}
                        onChange={handleChange}
                        autoFocus
                      />
                      <p className="mt-1.5 text-xs text-[var(--app-text-muted)]">
                        Be specific — the more detail, the better your agent match.
                      </p>
                    </div>

                    <div>
                      <label className={labelCls}>Tools You Already Use <span className="text-[var(--app-text-subtle)] normal-case tracking-normal font-normal">(optional)</span></label>
                      <input
                        name="tools"
                        className={inputCls}
                        placeholder="e.g. Google Calendar, HubSpot, Jobber, Xero"
                        value={form.tools}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Primary Goal *</label>
                      <input
                        name="goal"
                        className={inputCls}
                        placeholder="e.g. Never miss a lead, automate bookings, cut response times in half"
                        value={form.goal}
                        onChange={handleChange}
                        autoFocus
                      />
                      <p className="mt-1.5 text-xs text-[var(--app-text-muted)]">
                        Your AI agent will be purpose-built around this single objective.
                      </p>
                    </div>

                    {/* Summary preview */}
                    {(form.business_name || form.industry) && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4 space-y-2"
                      >
                        <p className="text-xs font-semibold text-emerald-400">Building agent for:</p>
                        <div className="flex flex-wrap gap-2">
                          {form.business_name && (
                            <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-[var(--app-text)]">
                              📍 {form.business_name}
                            </span>
                          )}
                          {form.industry && (
                            <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-[var(--app-text)]">
                              🏢 {form.industry}
                            </span>
                          )}
                          {form.company_scale && (
                            <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-[var(--app-text)]">
                              👥 {form.company_scale} employees
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm text-red-300"
                      >
                        {error}
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between gap-3 border-t border-[var(--app-border)] px-7 py-5">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 1 || isSubmitting}
              className="flex items-center gap-2 rounded-xl border border-[var(--app-border)] px-4 py-2.5 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-white/[0.03] hover:text-[var(--app-text)] disabled:pointer-events-none disabled:opacity-40"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!canGoNext}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:pointer-events-none disabled:opacity-50"
              >
                Continue
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAnalyse}
                disabled={isSubmitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:pointer-events-none disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Analysing your business…
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09Z" />
                    </svg>
                    Analyse & Build Agents
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-5 text-center text-xs text-[var(--app-text-subtle)]">
          Takes under 3 minutes · No credit card required · Deployed instantly
        </p>
      </div>
    </div>
  );
}
