import { cn } from "@/components/ui/cn";

export function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
<<<<<<< HEAD
        "rounded-2xl border border-[var(--app-border)] bg-[color:var(--app-card)] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.85)]",
=======
        "rounded-2xl border border-[var(--app-border)] bg-[color:var(--app-card)] shadow-lg shadow-[#546B41]/5",
>>>>>>> 096e8fb (Initial commit - UI updates)
        className
      )}
      {...props}
    />
  );
}

