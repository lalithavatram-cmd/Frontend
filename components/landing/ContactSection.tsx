"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--app-border)]" />

      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute left-0 bottom-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/4 rounded-full bg-[#99AD7A]/10 blur-[130px]" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] translate-x-1/4 -translate-y-1/4 rounded-full bg-[#DCCCAC]/15 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "circOut" }}
            className="flex flex-col gap-6"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#546B41]/20 bg-[#546B41]/6 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#546B41]">
              Get in touch
            </span>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-[var(--app-text)] sm:text-5xl">
              Ready to stop losing{" "}
              <span className="gradient-text">customers?</span>
            </h2>
            <p className="text-lg leading-relaxed text-[var(--app-text-muted)]">
              Talk to our team and we&apos;ll show you exactly how Prompt2Deploy can transform how your business handles calls, bookings, and follow-ups — starting today.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-4 pt-2">
              {[
                {
                  icon: (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  ),
                  label: "+91 95157 61284",
                  href: "tel:+919515761284",
                },
                {
                  icon: (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                  label: "contact@re4loai.com",
                  href: "mailto:contact@re4loai.com",
                },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 text-sm text-[var(--app-text-muted)] transition-colors hover:text-[#546B41]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#546B41]/10 text-[#546B41]">
                    {item.icon}
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "circOut", delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex flex-col items-center gap-4 rounded-2xl border border-[#546B41]/30 bg-[#546B41]/5 p-12 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#546B41] text-white">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--app-text)]">Message sent!</h3>
                <p className="text-[var(--app-text-muted)]">We&apos;ll be in touch within one business day.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-2xl border border-[var(--app-border)] bg-white/50 p-8 shadow-lg shadow-[#546B41]/5 backdrop-blur-sm"
              >
                <h3 className="text-lg font-bold text-[var(--app-text)]">Send us a message</h3>

                {[
                  { id: "name",    label: "Full name",     type: "text",  placeholder: "Jane Smith" },
                  { id: "email",   label: "Email address", type: "email", placeholder: "jane@company.com" },
                  { id: "company", label: "Company",       type: "text",  placeholder: "Acme Inc." },
                ].map((field) => (
                  <div key={field.id} className="flex flex-col gap-1.5">
                    <label htmlFor={field.id} className="text-xs font-semibold text-[var(--app-text-muted)] uppercase tracking-wide">
                      {field.label}
                    </label>
                    <motion.input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      onFocus={() => setFocused(field.id)}
                      onBlur={() => setFocused(null)}
                      animate={{
                        borderColor: focused === field.id ? "#546B41" : "var(--app-border)",
                        boxShadow: focused === field.id ? "0 0 0 3px rgba(84,107,65,0.12)" : "none",
                      }}
                      transition={{ duration: 0.2 }}
                      className="w-full rounded-xl border border-[var(--app-border)] bg-white px-4 py-2.5 text-sm text-[var(--app-text)] outline-none transition-colors placeholder:text-[var(--app-text-subtle)]"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-[var(--app-text-muted)] uppercase tracking-wide">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your business and what you need..."
                    required
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    animate={{
                      borderColor: focused === "message" ? "#546B41" : "var(--app-border)",
                      boxShadow: focused === "message" ? "0 0 0 3px rgba(84,107,65,0.12)" : "none",
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-full resize-none rounded-xl border border-[var(--app-border)] bg-white px-4 py-2.5 text-sm text-[var(--app-text)] outline-none transition-colors placeholder:text-[var(--app-text-subtle)]"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(84,107,65,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#546B41] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#546B41]/20 transition-all duration-300 hover:bg-[#3d5030]"
                >
                  Send Message
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
