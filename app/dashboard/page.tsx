"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SkeletonCard, SkeletonRow } from "@/components/ui/Skeleton";

/* ── Types ──────────────────────────────────────────────────────────────────── */
type DeploymentRow = {
  tenant_id: string;
  business_name: string;
  agent_id: string;
  agent_name: string;
  workflow_id: string;
  status: string;
  created_at: string;
};

/* ── Helpers ─────────────────────────────────────────────────────────────────── */
function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* ── Animated counter ────────────────────────────────────────────────────────── */
function AnimatedNumber({ value, duration = 1 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const start = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (value === 0) { setDisplay(0); return; }
    const animate = (ts: number) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [value, duration]);

  return <>{display}</>;
}

/* ── Status badge ────────────────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const isActive = status === "active";
  return (
    <span className={[
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
      isActive
        ? "bg-[#546B41]/12 text-[#546B41] ring-1 ring-[#546B41]/20"
        : "bg-[#DCCCAC]/30 text-[var(--app-text-muted)] ring-1 ring-[#DCCCAC]/50",
    ].join(" ")}>
      <span className={["h-1.5 w-1.5 rounded-full", isActive ? "bg-[#546B41] animate-ping-slow" : "bg-[var(--app-text-muted)]"].join(" ")} />
      {status || "unknown"}
    </span>
  );
}

/* ── Nav items ───────────────────────────────────────────────────────────────── */
const NAV = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    href: "/calls",
    label: "Calls",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "Settings",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

/* ── Sidebar ─────────────────────────────────────────────────────────────────── */
function Sidebar({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className={["rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-4", mobile ? "" : "sticky top-6"].join(" ")}>
      {/* Brand */}
      <div className="flex items-center justify-between px-2 py-2">
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#546B41] shadow-sm">
            <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09Z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[var(--app-text)]">
            Prompt2<span className="text-[#546B41]">Deploy</span>
          </span>
        </Link>
        {mobile && (
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--app-text-muted)] hover:bg-[#DCCCAC]/30 hover:text-[var(--app-text)]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <nav className="mt-4 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={[
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-[#546B41]/10 text-[var(--app-text)] ring-1 ring-[#546B41]/20"
                  : "text-[var(--app-text-muted)] hover:bg-[#DCCCAC]/20 hover:text-[var(--app-text)]",
              ].join(" ")}
            >
              <span className={active ? "text-[#546B41]" : ""}>{item.icon}</span>
              {item.label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#546B41]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* New agent CTA */}
      <div className="mt-6 rounded-xl border border-[#546B41]/20 bg-[#546B41]/[0.05] p-3">
        <p className="text-xs font-semibold text-[var(--app-text)]">Deploy another agent</p>
        <p className="mt-0.5 text-xs text-[var(--app-text-muted)]">Expand your automation fleet</p>
        <Link
          href="/onboard"
          onClick={onClose}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-[#546B41] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#99AD7A]"
        >
          + New agent
        </Link>
      </div>
    </div>
  );
}

/* ── Main dashboard ──────────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const [deployments, setDeployments] = useState<DeploymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("agentflow_user_id") ?? "";
    const url = userId
      ? `/api/deployments?user_id=${encodeURIComponent(userId)}`
      : "/api/deployments";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<DeploymentRow[]>;
      })
      .then((data) => { setDeployments(data); setLoading(false); })
      .catch((err) => { setFetchError(err.message ?? "Failed to load."); setLoading(false); });
  }, []);

  const activeCount = deployments.filter((d) => d.status === "active").length;
  const latestDate  = deployments.length > 0 ? formatDate(deployments[0].created_at) : "—";

  const stats = [
    { title: "Total Deployments", value: loading ? null : deployments.length, helper: "All time" },
    { title: "Active Agents",     value: loading ? null : activeCount, helper: "Currently running" },
    { title: "Last Deployed",     value: loading ? null : latestDate, helper: "Most recent", isText: true },
  ];

  return (
    <div className="min-h-screen bg-[var(--app-bg-solid)]">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-[#1F2937]/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="fixed inset-y-0 left-0 z-50 w-72 p-4 lg:hidden"
            >
              <Sidebar mobile onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 space-y-6">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] px-6 py-4"
          >
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--app-border)] text-[var(--app-text-muted)] transition hover:bg-[#DCCCAC]/30 hover:text-[var(--app-text)] lg:hidden"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold tracking-tight text-[var(--app-text)]">Your Automations</h1>
              <p className="mt-0.5 text-sm text-[var(--app-text-muted)]">
                Monitor all deployments, agents, and workflows.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] px-3 py-2 text-sm sm:flex">
                <span className="h-2 w-2 rounded-full bg-[#546B41] animate-ping-slow" />
                <span className="text-[var(--app-text-muted)]">
                  {loading ? "Loading…" : `${activeCount} active`}
                </span>
              </div>
              <Link
                href="/onboard"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#546B41] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#99AD7A]"
              >
                <span className="hidden sm:inline">+ New agent</span>
                <span className="sm:hidden">+</span>
              </Link>
            </div>
          </motion.header>

          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              >
                {loading ? (
                  <SkeletonCard className="h-[104px]" />
                ) : (
                  <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--app-text-muted)]">{s.title}</p>
                    <p className="mt-3 text-3xl font-bold tracking-tight text-[var(--app-text)]">
                      {s.isText ? s.value : (
                        typeof s.value === "number" ? <AnimatedNumber value={s.value} /> : s.value
                      )}
                    </p>
                    <p className="mt-1 text-xs text-[var(--app-text-muted)]">{s.helper}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Deployments table */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--app-border)] px-6 py-4">
              <div>
                <h2 className="font-semibold text-[var(--app-text)]">Your Automations</h2>
                <p className="mt-0.5 text-xs text-[var(--app-text-muted)]">
                  Every tenant, agent &amp; workflow deployed through Prompt2Deploy
                </p>
              </div>
              {!loading && deployments.length > 0 && (
                <span className="rounded-full bg-[#DCCCAC]/40 px-2.5 py-0.5 text-xs font-medium text-[var(--app-text-muted)]">
                  {deployments.length} total
                </span>
              )}
            </div>

            {/* Error */}
            {fetchError && (
              <div className="m-4 rounded-xl border border-red-400/20 bg-red-400/8 px-4 py-3 text-sm text-red-500">
                Could not load deployments: {fetchError}
              </div>
            )}

            {/* Skeleton rows */}
            {loading && !fetchError && (
              <div className="divide-y divide-[var(--app-border)]">
                {/* Header row */}
                <div className="grid min-w-[700px] grid-cols-[1.2fr_1fr_1fr_1fr_80px_100px] gap-4 px-6 py-3">
                  {["Business", "Agent Name", "Agent ID", "Workflow ID", "Status", "Deployed"].map((h) => (
                    <span key={h} className="text-xs font-semibold uppercase tracking-widest text-[var(--app-text-muted)]">{h}</span>
                  ))}
                </div>
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && !fetchError && deployments.length === 0 && (
              <div className="flex flex-col items-center gap-4 py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)]">
                  <svg className="h-6 w-6 text-[var(--app-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[var(--app-text)]">No automations yet</p>
                  <p className="mt-1 text-sm text-[var(--app-text-muted)]">
                    No automations yet. Create your first one.
                  </p>
                </div>
                <Link
                  href="/onboard"
                  className="mt-1 inline-flex items-center gap-2 rounded-xl bg-[#546B41] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#99AD7A]"
                >
                  Build your first agent →
                </Link>
              </div>
            )}

            {/* Table */}
            {!loading && !fetchError && deployments.length > 0 && (
              <div className="overflow-x-auto">
                {/* Column headers */}
                <div className="grid min-w-[700px] grid-cols-[1.2fr_1fr_1fr_1fr_80px_100px] gap-4 border-b border-[var(--app-border)] px-6 py-3">
                  {["Business", "Agent Name", "Agent ID", "Workflow ID", "Status", "Deployed"].map((h) => (
                    <span key={h} className="text-xs font-semibold uppercase tracking-widest text-[var(--app-text-muted)]">{h}</span>
                  ))}
                </div>

                <div className="divide-y divide-[var(--app-border)]">
                  {deployments.map((d, i) => (
                    <motion.div
                      key={d.tenant_id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="grid min-w-[700px] grid-cols-[1.2fr_1fr_1fr_1fr_80px_100px] items-center gap-4 px-6 py-4 transition hover:bg-[#DCCCAC]/10"
                    >
                      <p className="truncate text-sm font-semibold text-[var(--app-text)]">
                        {d.business_name || "—"}
                      </p>
                      <p className="truncate text-sm text-[var(--app-text-muted)]">
                        {d.agent_name || "—"}
                      </p>
                      <p className="truncate font-mono text-xs text-[var(--app-text-muted)]">
                        {d.agent_id?.slice(0, 12) + "…" || "—"}
                      </p>
                      <p className="truncate font-mono text-xs text-[var(--app-text-muted)]">
                        {d.workflow_id?.slice(0, 12) + "…" || "—"}
                      </p>
                      <StatusBadge status={d.status} />
                      <p className="text-xs text-[var(--app-text-muted)]">{formatDate(d.created_at)}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.section>
        </main>
      </div>
    </div>
  );
}
