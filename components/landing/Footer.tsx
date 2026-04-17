import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features",     href: "#features" },
  { label: "Pricing",      href: "#pricing" },
];

const PLATFORM_LINKS = [
  { label: "Dashboard",    href: "/dashboard" },
  { label: "Deploy Agent", href: "/onboard" },
  { label: "Call Logs",    href: "/calls" },
  { label: "Settings",     href: "/settings" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--app-border)] bg-[var(--app-bg-solid)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand + Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 shadow-sm">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09Z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-[var(--app-text)]">
                Prompt2<span className="text-emerald-400">Deploy</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--app-text-muted)]">
              AI-powered voice agents and workflow automation built for small businesses that can&apos;t afford to miss a single customer call.
            </p>

            {/* Company details */}
            <div className="mt-6 space-y-2.5 text-xs text-[var(--app-text-muted)]">
              <p className="font-semibold uppercase tracking-widest text-[var(--app-text-subtle)]">RE4LO AI PRIVATE LIMITED</p>
              <p className="leading-relaxed">
                B4-12 Road no 3, Parvathipuram Colony,<br />
                Indreesham, Patancheru,<br />
                Telangana, India — 502319
              </p>
              <div className="space-y-1 pt-1">
                <p>
                  <span className="text-[var(--app-text-subtle)]">Phone: </span>
                  <a href="tel:+919515761284" className="transition hover:text-[var(--app-text)]">+91 95157 61284</a>
                </p>
                <p>
                  <span className="text-[var(--app-text-subtle)]">Email: </span>
                  <a href="mailto:contact@re4loai.com" className="transition hover:text-[var(--app-text)]">contact@re4loai.com</a>
                </p>
                <p>
                  <span className="text-[var(--app-text-subtle)]">Web: </span>
                  <a href="https://www.re4loai.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--app-text)]">www.re4loai.com</a>
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-ping-slow rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-400">All systems operational</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--app-text-subtle)]">
              Product
            </p>
            <ul className="mt-4 space-y-3">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-[var(--app-text-muted)] transition hover:text-[var(--app-text)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-[var(--app-text-subtle)]">
              Platform
            </p>
            <ul className="mt-4 space-y-3">
              {PLATFORM_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--app-text-muted)] transition hover:text-[var(--app-text)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--app-text-subtle)]">
              Legal
            </p>
            <ul className="mt-4 space-y-3">
              {LEGAL_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--app-text-muted)] transition hover:text-[var(--app-text)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Compliance badges */}
            <div className="mt-8 space-y-2">
              <span className="flex items-center gap-1.5 rounded-lg border border-[var(--app-border)] bg-white/[0.02] px-3 py-2 text-[11px] font-medium text-[var(--app-text-muted)]">
                <svg className="h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                SOC 2 Ready
              </span>
              <span className="flex items-center gap-1.5 rounded-lg border border-[var(--app-border)] bg-white/[0.02] px-3 py-2 text-[11px] font-medium text-[var(--app-text-muted)]">
                <svg className="h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                GDPR Compliant
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--app-border)] pt-8 sm:flex-row">
          <p className="text-xs text-[var(--app-text-muted)]">
            © {new Date().getFullYear()} RE4LO AI Private Limited. All rights reserved.
          </p>
          <p className="text-xs text-[var(--app-text-subtle)]">
            Prompt2Deploy is a product of RE4LO AI
          </p>
        </div>
      </div>
    </footer>
  );
}
