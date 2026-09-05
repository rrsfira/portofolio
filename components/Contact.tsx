"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile, socials } from "@/lib/data";

export function Contact() {
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    const syncTheme = () => {
      setIsLightTheme(document.documentElement.dataset.theme === "light");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const panelClass = isLightTheme
    ? "border-slate-200 bg-white/80"
    : "border-white/10 bg-white/[0.04]";

  const titleClass = isLightTheme ? "text-slate-900" : "text-white";

  const socialClass = isLightTheme
    ? "border-slate-300 bg-white/80 text-slate-700 hover:border-accent/50 hover:text-accent"
    : "border-white/10 bg-white/[0.04] text-white/68 hover:border-accent/50 hover:text-accent";

  const fieldClass = isLightTheme
    ? "border-slate-300 bg-white/90 text-slate-800 placeholder:text-slate-500 focus:border-accent/60"
    : "border-white/10 bg-[#eef2f6]/10 text-white placeholder:text-white/30 focus:border-white/20";

  const labelClass = isLightTheme ? "text-slate-800" : "text-white";

  const submitClass = isLightTheme
    ? "border border-slate-300 bg-white text-slate-900 shadow-[0_0_0_1px_rgba(148,163,184,0.18)]"
    : "border border-white/10 bg-[#060d1a] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)]";

  return (
    <section id="contact" className="section-shell py-12 pb-16 sm:py-16 sm:pb-20 lg:py-20 lg:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative overflow-hidden rounded-[8px] border p-5 md:p-8 ${panelClass}`}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">
          Contact
        </p>
        <h2 className={`mt-3 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl ${titleClass}`}>
          Let&apos;s work together
        </h2>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}?subject=Project%20Inquiry%20-%20Reihan%20Rachma%20Shafira`}
            className="focus-ring group inline-flex items-center gap-3 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-black shadow-[0_0_55px_rgb(var(--accent)/0.26)] transition hover:scale-[1.02]"
          >
            <Mail className="h-4 w-4" />
            Get in touch
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm transition ${socialClass}`}
              >
                <Icon className="h-4 w-4" />
                {social.label}
              </a>
            );
          })}
        </div>

        <form className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="name"
              className={`mb-2 block text-sm font-medium tracking-tight md:text-base ${labelClass}`}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className={`h-12 w-full rounded-[12px] border px-4 text-sm outline-none transition ${fieldClass}`}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className={`mb-2 block text-sm font-medium tracking-tight md:text-base ${labelClass}`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`h-12 w-full rounded-[12px] border px-4 text-sm outline-none transition ${fieldClass}`}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className={`mb-2 block text-sm font-medium tracking-tight md:text-base ${labelClass}`}
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className={`w-full rounded-[12px] border px-4 py-3 text-sm outline-none transition ${fieldClass}`}
            />
          </div>

          <button
            type="submit"
            className={`group inline-flex w-full items-center justify-center gap-3 rounded-[14px] px-5 py-4 text-sm font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.12)] transition hover:brightness-110 ${submitClass}`}
          >
            <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-1 group-hover:translate-x-1" />
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
}
