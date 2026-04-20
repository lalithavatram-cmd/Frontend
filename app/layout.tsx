import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
<<<<<<< HEAD
=======
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
>>>>>>> 096e8fb (Initial commit - UI updates)

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prompt2Deploy — AI Automation for Small Business",
    template: "%s | Prompt2Deploy",
  },
  description:
    "Describe your business in plain English. Prompt2Deploy builds and launches your AI voice agent instantly. No code required.",
  keywords: [
    "AI agents",
    "voice AI",
    "automation",
    "workflow automation",
    "no-code AI",
    "AI receptionist",
    "business automation",
    "small business AI",
  ],
  authors: [{ name: "Prompt2Deploy" }],
  creator: "Prompt2Deploy",
  openGraph: {
    type: "website",
    title: "Prompt2Deploy — AI Automation for Small Business",
    description:
      "Describe your business in plain English. Prompt2Deploy builds and launches your AI voice agent instantly.",
    siteName: "Prompt2Deploy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt2Deploy — AI Automation for Small Business",
    description:
      "Stop losing customers to missed calls. Prompt2Deploy deploys your AI agent in minutes.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070912",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
<<<<<<< HEAD
      <body className="min-h-full flex flex-col bg-[var(--app-bg-solid)]">
        <Providers>{children}</Providers>
=======
      <body className="relative min-h-full flex flex-col">
        {/* ── Persistent pastel gradient background ── */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            background: `
              radial-gradient(circle at 80% 10%, rgba(186,230,253,0.55) 0%, transparent 38%),
              radial-gradient(circle at 10% 15%, rgba(167,243,208,0.30) 0%, transparent 35%),
              radial-gradient(circle at 50% 60%, rgba(196,220,158,0.20) 0%, transparent 40%),
              radial-gradient(circle at 90% 85%, rgba(186,230,253,0.35) 0%, transparent 35%),
              radial-gradient(circle at 20% 80%, rgba(167,243,208,0.22) 0%, transparent 30%),
              #f8fafc
            `,
          }}
        />
        {/* ── Subtle grid overlay ── */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,116,139,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,116,139,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />
        <Providers>
          <AnimatedBackground />
          {children}
        </Providers>
>>>>>>> 096e8fb (Initial commit - UI updates)
      </body>
    </html>
  );
}
