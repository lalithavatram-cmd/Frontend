import { cn } from "@/components/ui/cn";

export function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--app-border)] bg-[color:var(--app-card)] shadow-lg shadow-[#546B41]/5",
        className
      )}
      {...props}
    />
  );
}

