import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

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
      <body className="min-h-full flex flex-col bg-[var(--app-bg-solid)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
