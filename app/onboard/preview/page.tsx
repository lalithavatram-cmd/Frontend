"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

/* ── Types ──────────────────────────────────────────────────────────────────── */
type Suggestion = {
  id: string;
  name: string;
  description: string;
  icon: string;
  recommended: boolean;
  config: Record<string, unknown>;
};

type AnalysisData = {
  suggestions: Suggestion[];
  form: { business_name: string; industry: string; pain_points: string; goal: string };
};

type DeployResult = {
  tenant_id: string;
  agent: { id: string; status: string };
  n8n: { id: string; status: string };
  status: string;
};

/* ── Agent color / accent per type ─────────────────────────────────────────── */
const AGENT_ACCENTS: Record<string, { bg: string; text: string; border: string }> = {
  receptionist_v2:    { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/25" },
  appointment_booker: { bg: "bg-teal-500/10",    text: "text-teal-400",    border: "border-teal-500/25" },
  lead_qualifier:     { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/25" },
  order_taker:        { bg: "bg-teal-500/10",    text: "text-teal-400",    border: "border-teal-500/25" },
  support_agent:      { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/25" },
};

const DEFAULT_ACCENT = { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/25" };

/* ── Loading screen ─────────────────────────────────────────────────────────── */
const LOADING_STEPS = [
  "Understanding your business…",
  "Matching AI agent profiles…",
  "Configuring workflows…",
  "Preparing your recommendations…",
];

function LoadingScreen() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--app-bg-solid)] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-8 text-center"
      >
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-emerald-500/20 border-t-emerald-500" />
          <div className="absolute inset-3 animate-spin-slow rounded-full border border-teal-500/20 border-t-teal-500" style={{ animationDirection: "reverse", animationDuration: "3s" }} />
          <svg className="h-7 w-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09Z" />
          </svg>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[var(--app-text)]">Analysing your business</h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="mt-2 text-sm text-[var(--app-text-muted)]"
            >
              {LOADING_STEPS[step]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex gap-1.5">
          {LOADING_STEPS.map((_, i) => (
            <div
              key={i}
              className={[
                "h-1.5 rounded-full transition-all duration-300",
                i <= step ? "w-5 bg-emerald-500" : "w-1.5 bg-[var(--app-border)]",
              ].join(" ")}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Success screen ─────────────────────────────────────────────────────────── */
function SuccessScreen({ result }: { result: DeployResult }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--app-bg-solid)] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "circOut" }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-8 text-center shadow-2xl shadow-[#546B41]/10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 220, damping: 14 }}
            className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center"
          >
            <div className="absolute inset-0 animate-ping-slow rounded-full bg-emerald-500/20" />
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
              <svg className="h-9 w-9 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </motion.div>

          <h2 className="text-2xl font-bold text-[var(--app-text)]">Agent deployed!</h2>
          <p className="mt-2 text-sm text-[var(--app-text-muted)]">
            Your AI agent is live and ready to handle calls 24/7.
          </p>

          <div className="mt-6 space-y-2.5 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 text-left">
            {[
              { label: "Agent ID",     value: result.agent.id,     mono: true },
              { label: "Agent Status", value: result.agent.status, badge: true },
              { label: "Workflow ID",  value: result.n8n.id,       mono: true },
              { label: "Workflow",     value: result.n8n.status,   badge: true },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4">
                <span className="text-xs text-[var(--app-text-muted)]">{row.label}</span>
                {row.badge ? (
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium capitalize text-emerald-400">
                    {row.value}
                  </span>
                ) : (
                  <span className={["max-w-[200px] truncate text-xs text-[var(--app-text)]", row.mono ? "font-mono" : ""].join(" ")}>
                    {row.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          <Link
            href="/dashboard"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
          >
            Go to Dashboard
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Agent card ─────────────────────────────────────────────────────────────── */
function AgentCard({
  suggestion,
  goal,
  onDeploy,
  deploying,
  index,
}: {
  suggestion: Suggestion;
  goal: string;
  onDeploy: (id: string) => void;
  deploying: string | null;
  index: number;
}) {
  const accent = AGENT_ACCENTS[suggestion.id] ?? DEFAULT_ACCENT;
  const isDeploying = deploying === suggestion.id;
  const isOtherDeploying = deploying !== null && deploying !== suggestion.id;

  const bestForText = suggestion.recommended && goal
    ? `Best for your goal: "${goal.length > 55 ? goal.slice(0, 55) + "…" : goal}"`
    : getBestForFallback(suggestion.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "circOut" }}
      whileHover={{ scale: isOtherDeploying ? 1 : 1.015 }}
      className="group relative rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-5 shadow-sm transition-all duration-200 hover:border-[#374151]"
    >
      {suggestion.recommended && (
        <div className={`mb-4 inline-flex items-center gap-1.5 rounded-full border ${accent.border} ${accent.bg} px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${accent.text}`}>
          ✦ Recommended for you
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accent.bg} text-2xl`}>
          {suggestion.icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[var(--app-text)]">{suggestion.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-[var(--app-text-muted)]">
            {suggestion.description}
          </p>
          <p className={`mt-2 text-xs font-medium ${accent.text}`}>
            {bestForText}
          </p>
        </div>
      </div>

      {/* Deploy CTA */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => onDeploy(suggestion.id)}
          disabled={deploying !== null}
          className={[
            "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition",
            "bg-emerald-600 hover:bg-emerald-500",
            "disabled:pointer-events-none disabled:opacity-50",
          ].join(" ")}
        >
          {isDeploying ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Deploying…
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
              Deploy
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

/* ── Main preview page ──────────────────────────────────────────────────────── */
export default function PreviewPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalysisData | null>(null);
  const [deploying, setDeploying] = useState<string | null>(null);
  const [result, setResult] = useState<DeployResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("analysis");
    if (!stored) { router.replace("/onboard"); return; }
    try {
      const parsed = JSON.parse(stored) as AnalysisData;
      setData(parsed);
    } catch {
      router.replace("/onboard");
    }
  }, [router]);

  const handleDeploy = async (agentId: string) => {
    if (!data) return;
    setDeploying(agentId);
    setError(null);
    try {
      let userId = localStorage.getItem("agentflow_user_id");
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem("agentflow_user_id", userId);
      }

      const res = await fetch("/api/onboard/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data.form, user_id: userId }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? "Deployment failed. Please try again.");
      }
      const deployResult = (await res.json()) as DeployResult;
      setResult(deployResult);
      localStorage.removeItem("analysis");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setDeploying(null);
    }
  };

  if (!data) return <LoadingScreen />;
  if (result) return <SuccessScreen result={result} />;

  return (
    <div className="relative min-h-screen bg-[var(--app-bg-solid)] px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-900/12 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-2xl space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Personalised for you</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--app-text)]">
            Your AI Agents are ready
          </h1>
          <p className="mt-2 text-sm text-[var(--app-text-muted)]">
            Based on{" "}
            <span className="font-semibold text-[var(--app-text)]">{data.form.business_name}</span>
            {" "}in{" "}
            <span className="font-semibold text-[var(--app-text)]">{data.form.industry}</span>
            {" "}— 3 agents matched to your goals. Click Deploy to launch instantly.
          </p>
        </motion.div>

        {/* Agent cards */}
        <div className="space-y-4">
          {data.suggestions.map((s, i) => (
            <AgentCard
              key={s.id}
              suggestion={s}
              goal={data.form.goal}
              onDeploy={handleDeploy}
              deploying={deploying}
              index={i}
            />
          ))}
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => router.push("/onboard")}
            disabled={deploying !== null}
            className="flex items-center gap-2 rounded-xl border border-[var(--app-border)] px-4 py-2.5 text-sm font-medium text-[var(--app-text-muted)] transition hover:bg-white/[0.03] hover:text-[var(--app-text)] disabled:pointer-events-none disabled:opacity-50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────────────────── */
function getBestForFallback(id: string): string {
  const fallbacks: Record<string, string> = {
    receptionist_v2:    "Captures every inbound call without additional headcount.",
    appointment_booker: "Eliminates manual booking — calendar fills automatically.",
    lead_qualifier:     "Only warm, qualified leads reach your sales team.",
    order_taker:        "Reduces order errors and accelerates fulfilment handoff.",
    support_agent:      "Resolves repeat queries instantly, 24/7.",
  };
  return fallbacks[id] ?? "Strong alternative based on your industry profile.";
}
