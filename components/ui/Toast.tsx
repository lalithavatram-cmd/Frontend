"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

/* ─── Context ────────────────────────────────────────────────────────────── */
const ToastCtx = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */
const icons: Record<ToastType, React.ReactNode> = {
  success: (
    <svg className="h-4 w-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="h-4 w-4 shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  ),
  info: (
    <svg className="h-4 w-4 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
};

const styles: Record<ToastType, string> = {
  success: "border-emerald-500/20 bg-emerald-500/[0.07]",
  error:   "border-red-500/20    bg-red-500/[0.07]",
  warning: "border-amber-500/20  bg-amber-500/[0.07]",
  info:    "border-indigo-500/20 bg-indigo-500/[0.07]",
};

/* ─── Single Toast item ──────────────────────────────────────────────────── */
function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.94 }}
      transition={{ duration: 0.28, ease: "circOut" }}
      className={[
        "glass flex w-80 max-w-[calc(100vw-2rem)] items-center gap-3",
        "rounded-2xl border px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.45)]",
        styles[toast.type],
      ].join(" ")}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm font-medium text-[var(--app-text)]">
        {toast.message}
      </p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-1 rounded-lg p-0.5 text-[var(--app-text-muted)] transition hover:text-[var(--app-text)]"
        aria-label="Dismiss"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

/* ─── Provider ───────────────────────────────────────────────────────────── */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) { clearTimeout(timer); timers.current.delete(id); }
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev.slice(-4), { id, message, type }]);
      const timer = setTimeout(() => dismiss(id), 4500);
      timers.current.set(id, timer);
    },
    [dismiss]
  );

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
