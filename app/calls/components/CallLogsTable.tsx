"use client";

import { useEffect, useMemo, useState } from "react";

export type CallLogStatus = "answered" | "missed" | "voicemail" | "outbound";

export type CallLog = {
  caller: string;
  duration: string;
  status: CallLogStatus;
  timestamp: string;
  transcript?: string;
};

const STATUS_STYLES: Record<CallLogStatus, { label: string; className: string }> =
  {
    answered: {
      label: "Answered",
      className:
        "bg-emerald-500/10 text-emerald-200 ring-emerald-500/25",
    },
    missed: {
      label: "Missed",
      className: "bg-red-500/10 text-red-200 ring-red-500/25",
    },
    voicemail: {
      label: "Voicemail",
      className: "bg-amber-500/10 text-amber-200 ring-amber-500/25",
    },
    outbound: {
      label: "Outbound",
      className: "bg-teal-500/10 text-teal-300 ring-teal-500/20",
    },
  };

export function CallLogsTable({
  logs,
  title = "Call logs",
}: {
  logs: CallLog[];
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selected = useMemo(() => {
    if (selectedIndex === null) return null;
    return logs[selectedIndex] ?? null;
  }, [logs, selectedIndex]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (

    <section className="rounded-3xl border border-[var(--app-border)] bg-[color:var(--app-card)] p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.9)]">

    <section className="rounded-3xl border border-[var(--app-border)] bg-[color:var(--app-card)] p-6 shadow-xl shadow-[#546B41]/5">

      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-[color:var(--app-text)]">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[color:var(--app-text-muted)]">
            {logs.length} {logs.length === 1 ? "call" : "calls"}
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--app-border)]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead className="bg-white/5">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[color:var(--app-text-muted)]"
                >
                  Caller
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[color:var(--app-text-muted)]"
                >
                  Duration
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[color:var(--app-text-muted)]"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[color:var(--app-text-muted)]"
                >
                  Timestamp
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 bg-transparent">
              {logs.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-sm text-[color:var(--app-text-muted)]"
                  >
                    No calls yet.
                  </td>
                </tr>
              ) : (
                logs.map((log, idx) => {
                  const style = STATUS_STYLES[log.status];
                  return (
                    <tr
                      key={`${log.caller}-${log.timestamp}-${idx}`}
                      className="cursor-pointer transition hover:bg-white/5"
                      onClick={() => {
                        setSelectedIndex(idx);
                        setOpen(true);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedIndex(idx);
                          setOpen(true);
                        }
                      }}
                      aria-label={`Open transcript for ${log.caller}`}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-[color:var(--app-text)]">
                        {log.caller}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-[color:var(--app-text-muted)]">
                        {log.duration}
                      </td>
                      <td className="px-4 py-3 text-sm text-[color:var(--app-text-muted)]">
                        <span
                          className={[
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
                            style.className,
                          ].join(" ")}
                        >
                          {style.label}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-[color:var(--app-text-muted)]">
                        {log.timestamp}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-label="Call transcript"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            onClick={() => setOpen(false)}
            aria-label="Close modal"
          />


          <div className="relative w-full max-w-2xl rounded-3xl border border-[var(--app-border)] bg-[color:var(--app-card)] shadow-[0_30px_90px_-50px_rgba(0,0,0,0.95)]">

          <div className="relative w-full max-w-2xl rounded-3xl border border-[var(--app-border)] bg-[color:var(--app-card)] shadow-2xl shadow-[#546B41]/10">

            <div className="flex items-start justify-between gap-4 border-b border-white/5 p-5">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--app-text-muted)]">
                  Transcript
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-[color:var(--app-text)]">
                  {selected.caller} · {selected.duration} · {selected.timestamp}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-[var(--app-border)] bg-[color:var(--app-card)] px-3 py-2 text-sm font-semibold text-[color:var(--app-text)] shadow-sm transition hover:bg-white/5"
              >
                Close
              </button>
            </div>

            <div className="max-h-[60vh] overflow-auto p-5">
              <div className="rounded-2xl border border-[var(--app-border)] bg-white/5 p-4 text-sm leading-relaxed text-[color:var(--app-text)]">
                {selected.transcript?.trim()
                  ? selected.transcript
                  : "No transcript available for this call."}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

