"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/dashboard", label: "Dashboard",
    icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> },
  { href: "/calls", label: "Calls",
    icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg> },
  { href: "/settings", label: "Settings",
    icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
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
            <Link key={item.href} href={item.href} className={["flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all", active ? "bg-[#546B41]/10 text-[var(--app-text)] ring-1 ring-[#546B41]/20" : "text-[var(--app-text-muted)] hover:bg-[#DCCCAC]/20 hover:text-[var(--app-text)]"].join(" ")}>
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

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[var(--app-text)]">{label}</p>
        {description && <p className="mt-0.5 text-xs text-[var(--app-text-muted)]">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      className={["relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200", enabled ? "bg-[#546B41]" : "bg-[var(--app-border)]"].join(" ")}
    >
      <span className={["pointer-events-none h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200", enabled ? "translate-x-5" : "translate-x-0"].join(" ")} />
    </button>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [callAlerts,    setCallAlerts]    = useState(true);
  const [weeklyReport,  setWeeklyReport]  = useState(false);

  const SECTIONS = [
    {
      title: "Account",
      rows: [
        { label: "Display Name", description: "Shown across your workspace", children: <input className="w-52 rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] px-3 py-2 text-sm text-[var(--app-text)] outline-none focus:border-[#546B41]/50 focus:ring-2 focus:ring-[#546B41]/15" defaultValue="My Organization" /> },
        { label: "Email", description: "Your account email address", children: <input className="w-52 rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] px-3 py-2 text-sm text-[var(--app-text)] outline-none focus:border-[#546B41]/50 focus:ring-2 focus:ring-[#546B41]/15" defaultValue="team@company.com" /> },
      ],
    },
    {
      title: "Notifications",
      rows: [
        { label: "Email notifications", description: "Get notified about new deployments and agent events", children: <Toggle enabled={notifications} onChange={() => setNotifications((p) => !p)} /> },
        { label: "Missed call alerts", description: "Instant email when a call is missed or fails", children: <Toggle enabled={callAlerts} onChange={() => setCallAlerts((p) => !p)} /> },
        { label: "Weekly performance report", description: "Summary of calls, bookings, and leads every Monday", children: <Toggle enabled={weeklyReport} onChange={() => setWeeklyReport((p) => !p)} /> },
      ],
    },
    {
      title: "Plan & Billing",
      rows: [
        { label: "Current Plan", description: "You are on the Starter (free) plan", children: <Link href="#" className="rounded-xl border border-[#546B41]/30 bg-[#546B41]/8 px-4 py-2 text-sm font-semibold text-[#546B41] transition hover:bg-[#546B41]/12">Upgrade →</Link> },
      ],
    },
    {
      title: "Danger Zone",
      rows: [
        { label: "Delete all data", description: "Permanently remove all agents, calls, and workflows", children: <button className="rounded-xl border border-red-400/30 bg-red-400/8 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-400/12">Delete account</button> },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--app-bg-solid)]">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden w-60 shrink-0 lg:block"><Sidebar /></aside>

        <main className="min-w-0 flex-1 space-y-6">
          <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] px-6 py-4"
          >
            <h1 className="text-xl font-bold tracking-tight text-[var(--app-text)]">Settings</h1>
            <p className="mt-0.5 text-sm text-[var(--app-text-muted)]">Manage your account, preferences, and integrations.</p>
          </motion.header>

          {SECTIONS.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + si * 0.08, duration: 0.4 }}
              className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)]"
            >
              <div className="border-b border-[var(--app-border)] px-6 py-4">
                <h2 className="text-sm font-semibold text-[var(--app-text)]">{section.title}</h2>
              </div>
              <div className="divide-y divide-[var(--app-border)] px-6">
                {section.rows.map((row) => (
                  <SettingRow key={row.label} label={row.label} description={row.description}>
                    {row.children}
                  </SettingRow>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end"
          >
            <button className="rounded-xl bg-[#546B41] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#99AD7A]">
              Save changes
            </button>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
