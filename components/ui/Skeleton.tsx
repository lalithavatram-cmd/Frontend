import { cn } from "@/components/ui/cn";

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("skeleton rounded-xl", className)} />
  );
}

export function SkeletonText({ lines = 3, className }: SkeletonProps) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4 rounded-lg"
          style={{ width: i === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-5", className)}>
      <div className="skeleton mb-3 h-3 w-24 rounded-lg" />
      <div className="skeleton h-8 w-16 rounded-xl" />
      <div className="skeleton mt-2 h-3 w-20 rounded-lg" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5">
      <div className="skeleton h-4 flex-[1.2] rounded-lg" />
      <div className="skeleton h-4 flex-1 rounded-lg" />
      <div className="skeleton h-4 flex-1 rounded-lg opacity-70" />
      <div className="skeleton h-4 flex-1 rounded-lg opacity-70" />
      <div className="skeleton h-6 w-16 rounded-full" />
      <div className="skeleton h-4 w-20 rounded-lg" />
    </div>
  );
}
