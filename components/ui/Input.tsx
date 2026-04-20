import { cn } from "@/components/ui/cn";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-[var(--app-border)] bg-[color:var(--app-card)] px-4 py-3 text-sm text-[color:var(--app-text)] shadow-sm outline-none transition",
        "placeholder:text-[color:var(--app-text-muted)]/80",
<<<<<<< HEAD
        "focus-visible:ring-2 focus-visible:ring-indigo-500/35 focus-visible:border-indigo-500/60",
=======
        "focus-visible:ring-2 focus-visible:ring-[#546B41]/35 focus-visible:border-[#546B41]/60",
>>>>>>> 096e8fb (Initial commit - UI updates)
        className
      )}
      {...props}
    />
  );
}

