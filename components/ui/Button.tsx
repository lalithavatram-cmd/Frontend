import Link from "next/link";
import { cn } from "@/components/ui/cn";

type CommonProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
};

const base =
  "inline-flex items-center justify-center rounded-2xl font-semibold transition will-change-transform " +
<<<<<<< HEAD
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--app-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--app-bg)] " +
=======
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#546B41] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--app-bg)] " +
>>>>>>> 096e8fb (Initial commit - UI updates)
  "disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<NonNullable<CommonProps["size"]>, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary:
<<<<<<< HEAD
    "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-600 hover:shadow-indigo-500/30 hover:-translate-y-0.5",
  secondary:
    "border border-[var(--app-border)] bg-[color:var(--app-card)] text-[color:var(--app-text)] shadow-sm hover:bg-[#0f172a] hover:-translate-y-0.5",
  ghost:
    "text-[color:var(--app-text)] hover:bg-white/5 hover:-translate-y-0.5",
=======
    "bg-[#546B41] text-white shadow-lg shadow-[#546B41]/20 hover:bg-[#99AD7A] hover:shadow-[#546B41]/30 hover:-translate-y-0.5",
  secondary:
    "border border-[var(--app-border)] bg-[color:var(--app-card)] text-[color:var(--app-text)] shadow-sm hover:bg-[#FFF8EC] hover:-translate-y-0.5",
  ghost:
    "text-[color:var(--app-text)] hover:bg-[#DCCCAC]/30 hover:-translate-y-0.5",
>>>>>>> 096e8fb (Initial commit - UI updates)
};

export function Button({
  className,
  size = "md",
  variant = "primary",
  ...props
}: CommonProps &
  (
    | (Omit<React.ComponentProps<"button">, keyof CommonProps | "href"> & {
        href?: never;
      })
    | (Omit<React.ComponentProps<typeof Link>, keyof CommonProps> & {
        href: string;
      })
  )) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in props && typeof props.href === "string") {
    const { href, ...rest } = props;
    return <Link href={href} className={classes} {...rest} />;
  }

  return <button className={classes} {...props} />;
}

