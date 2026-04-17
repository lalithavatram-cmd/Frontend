import { cn } from "@/components/ui/cn";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full resize-none rounded-2xl border border-[var(--app-border)] bg-[color:var(--app-card)] px-4 py-3 text-sm text-[color:var(--app-text)] shadow-sm outline-none transition",
        "placeholder:text-[color:var(--app-text-muted)]/80",
        "focus-visible:ring-2 focus-visible:ring-indigo-500/35 focus-visible:border-indigo-500/60",
        className
      )}
      {...props}
    />
  );
}

