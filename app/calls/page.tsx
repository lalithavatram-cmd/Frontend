"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CallRecord {
  call_id: string;
  phone: string;
  transcript: string;
  duration: number;
  intent: string;
  summary: string;
  created_at: string;
}

type Filter = "all" | "appointment_booking" | "lead_inquiry" | "support_request" | "unknown";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All calls", value: "all" },
  { label: "Appointments", value: "appointment_booking" },
  { label: "Leads", value: "lead_inquiry" },
  { label: "Support", value: "support_request" },
  { label: "Other", value: "unknown" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function intentBadge(intent: string) {
  const map: Record<string, string> = {
    appointment_booking: "bg-[#546B41]/10 text-[#546B41] ring-[#546B41]/20",
    lead_inquiry: "bg-[#99AD7A]/15 text-[#546B41] ring-[#99AD7A]/25",
    support_request: "bg-[#DCCCAC]/30 text-[#546B41] ring-[#DCCCAC]/40",
    unknown: "bg-[var(--app-card)] text-[var(--app-text-muted)] ring-[var(--app-border)]",
  };
  const label: Record<string, string> = {
    appointment_booking: "Appointment",
    lead_inquiry: "Lead",
    support_request: "Support",
    unknown: "Unknown",
  };
  const cls = map[intent] ?? map.unknown;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${cls}`}>
      {label[intent] ?? intent}
    </span>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

const NAV = [
  {
    href: "/dashboard", label: "Dashboard",
    icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
  },
  {
    href: "/calls", label: "Calls",
    icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
  },
  {
    href: "/settings", label: "Settings",
    icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
];

function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="sticky top-6 rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-4">
      <Link href="/" className="flex items-center gap-2 px-2 py-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#546B41] shadow-sm">
          <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09Z" /></svg>
        </div>
        <span className="text-sm font-semibold text-[var(--app-text)]">Prompt2<span className="text-[#546B41]">Deploy</span></span>
      </Link>
      <nav className="mt-4 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-[#546B41]/10 text-[var(--app-text)] ring-1 ring-[#546B41]/20"
                  : "text-[var(--app-text-muted)] hover:bg-[#DCCCAC]/20 hover:text-[var(--app-text)]",
              ].join(" ")}
            >
              <span className={active ? "text-[#546B41]" : ""}>{item.icon}</span>
              {item.label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#546B41]" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

// ── Transcript Modal ──────────────────────────────────────────────────────────

function TranscriptModal({ call, onClose }: { call: CallRecord; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2937]/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-[var(--app-text)]">{call.phone || "Unknown"}</p>
            <p className="mt-0.5 text-xs text-[var(--app-text-muted)]">{formatDate(call.created_at)} · {formatDuration(call.duration)}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[var(--app-text-muted)] transition hover:bg-[#DCCCAC]/30 hover:text-[var(--app-text)]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        {call.summary && (
          <div className="mb-4 rounded-xl bg-[#FFF8EC] border border-[var(--app-border)] p-3 text-sm text-[var(--app-text-muted)]">
            <span className="font-medium text-[var(--app-text)]">Summary: </span>{call.summary}
          </div>
        )}
        <div className="max-h-72 overflow-y-auto rounded-xl bg-[#FFF8EC] border border-[var(--app-border)] p-3 text-xs leading-relaxed text-[var(--app-text-muted)]">
          {call.transcript || "No transcript available."}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function CallsPage() {
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<CallRecord | null>(null);

  useEffect(() => {
    const userId =
      typeof window !== "undefined"
        ? localStorage.getItem("agentflow_user_id") ?? ""
        : "";

    const url = userId
      ? `/api/calls?user_id=${encodeURIComponent(userId)}`
      : "/api/calls";

    fetch(url, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((data: CallRecord[]) => setCalls(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const visible =
    filter === "all" ? calls : calls.filter((c) => c.intent === filter);

  return (
    <div className="min-h-screen bg-[var(--app-bg-solid)]">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden w-60 shrink-0 lg:block"><Sidebar /></aside>

        <main className="min-w-0 flex-1 space-y-6">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] px-6 py-4"
          >
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--app-text)]">Call Logs</h1>
              <p className="mt-0.5 text-sm text-[var(--app-text-muted)]">
                All inbound calls handled by your AI agents.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] px-3 py-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-[#546B41] animate-ping-slow" />
              <span className="text-[var(--app-text-muted)]">{calls.length} total</span>
            </div>
          </motion.header>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="flex flex-wrap items-center gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={[
                  "rounded-xl border px-3.5 py-2 text-sm font-medium transition",
                  filter === f.value
                    ? "border-[#546B41]/40 bg-[#546B41]/10 text-[#546B41]"
                    : "border-[var(--app-border)] bg-[var(--app-card)] text-[var(--app-text-muted)] hover:bg-[#DCCCAC]/20 hover:text-[var(--app-text)]",
                ].join(" ")}
              >
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] overflow-hidden"
          >
            {loading ? (
              <div className="space-y-px">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-[var(--app-border)] px-6 py-4 last:border-0">
                    <div className="h-4 w-28 animate-pulse rounded bg-[#DCCCAC]/40" />
                    <div className="h-4 w-20 animate-pulse rounded bg-[#DCCCAC]/40" />
                    <div className="ml-auto h-4 w-16 animate-pulse rounded bg-[#DCCCAC]/40" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <p className="text-sm font-medium text-red-500">Failed to load calls</p>
                <p className="text-xs text-[var(--app-text-muted)]">{error}</p>
              </div>
            ) : visible.length === 0 ? (
              <div className="flex flex-col items-center gap-6 py-16 text-center px-6">
                {/* Stats row */}
                <div className="grid w-full max-w-lg grid-cols-3 gap-3">
                  {[
                    { label: "Total Calls", value: "0", icon: "📞" },
                    { label: "Avg Duration", value: "—", icon: "⏱" },
                    { label: "Leads Captured", value: "0", icon: "🎯" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-3 text-center">
                      <div className="text-lg">{s.icon}</div>
                      <div className="mt-1 text-base font-bold text-[var(--app-text)]">{s.value}</div>
                      <div className="text-[10px] text-[var(--app-text-muted)]">{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* Placeholder rows */}
                <div className="w-full max-w-lg space-y-2 opacity-30 pointer-events-none select-none">
                  {[
                    { phone: "+1 (555) 012-3456", intent: "Lead", dur: "2m 14s" },
                    { phone: "+1 (555) 098-7654", intent: "Support", dur: "4m 07s" },
                    { phone: "+1 (555) 321-0987", intent: "Appointment", dur: "1m 52s" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] px-4 py-3 text-sm">
                      <span className="font-mono text-[var(--app-text)]">{r.phone}</span>
                      <span className="rounded-full bg-[#546B41]/10 px-2.5 py-0.5 text-xs font-medium text-[#546B41]">{r.intent}</span>
                      <span className="text-[var(--app-text-muted)]">{r.dur}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--app-text)]">Waiting for your first call</p>
                  <p className="mt-1 max-w-xs text-xs text-[var(--app-text-muted)]">
                    Once your AI agent handles a call, every conversation appears here in real time.
                  </p>
                </div>
                <Link
                  href="/onboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#546B41] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#99AD7A]"
                >
                  Deploy your agent →
                </Link>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--app-border)] text-left text-xs font-medium text-[var(--app-text-muted)]">
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Intent</th>
                    <th className="px-6 py-3 hidden md:table-cell">Summary</th>
                    <th className="px-6 py-3 hidden sm:table-cell">Duration</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((call) => (
                    <tr
                      key={call.call_id}
                      onClick={() => setSelected(call)}
                      className="border-b border-[var(--app-border)] last:border-0 cursor-pointer transition hover:bg-[#DCCCAC]/10"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-[var(--app-text)]">
                        {call.phone || "—"}
                      </td>
                      <td className="px-6 py-4">{intentBadge(call.intent)}</td>
                      <td className="px-6 py-4 hidden md:table-cell max-w-xs truncate text-[var(--app-text-muted)]">
                        {call.summary || "—"}
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell text-[var(--app-text-muted)]">
                        {formatDuration(call.duration)}
                      </td>
                      <td className="px-6 py-4 text-[var(--app-text-muted)]">
                        {formatDate(call.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>
        </main>
      </div>

      {selected && (
        <TranscriptModal call={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
