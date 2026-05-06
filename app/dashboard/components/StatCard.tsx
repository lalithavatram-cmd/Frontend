export function StatCard({
  title,
  value,
  helper,
}: {
  title: string;
  value: string | number;
  helper?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--app-border)] bg-[color:var(--app-card)] p-5 shadow-lg shadow-[#546B41]/5">
      <p className="text-sm font-medium text-[color:var(--app-text-muted)]">
        {title}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--app-text)]">
        {value}
      </p>
      {helper ? (
        <p className="mt-1 text-sm text-[color:var(--app-text-muted)]">
          {helper}
        </p>
      ) : (
        <div className="mt-1 h-5" />
      )}
    </div>
  );
}