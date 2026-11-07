"use client";

import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

const links = ["About", "Skills", "Projects", "Experience"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

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

  useEffect(() => {
    const sectionIds = ["home", ...links.map((link) => link.toLowerCase()), "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const background = useTransform(scrollY, [0, 90], [
    isLightTheme ? "rgb(255 255 255 / 0.1)" : "rgb(0 0 0 / 0)",
    isLightTheme ? "rgb(255 255 255 / 0.8)" : "rgb(5 5 5 / 0.72)",
  ]);
  const border = useTransform(scrollY, [0, 90], [
    isLightTheme ? "rgb(148 163 184 / 0.3)" : "rgb(255 255 255 / 0)",
    isLightTheme ? "rgb(148 163 184 / 0.42)" : "rgb(255 255 255 / 0.1)",
  ]);

  const shellClass = isLightTheme
    ? "border-slate-200/80 bg-white/75 text-slate-800"
    : "border-white/10 bg-black/55 text-white";

  const navLinkClass = isLightTheme
    ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    : "text-white/68 hover:bg-white/8 hover:text-white";

  const mobilePanelClass = isLightTheme
    ? "border-slate-200 bg-white/90 text-slate-800"
    : "border-white/10 bg-black/85 text-white";

  const mobileLinkClass = isLightTheme
    ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    : "text-white/75 hover:bg-white/8 hover:text-white";

  return (
    <motion.header
      style={{ backgroundColor: background, borderColor: border }}
      className={`fixed left-1/2 top-4 z-40 w-[min(1120px,calc(100%-24px))] -translate-x-1/2 rounded-3xl border px-4 py-3 backdrop-blur-xl transition md:rounded-full ${shellClass}`}
    >
      <nav className="flex items-center justify-between gap-4" aria-label="Primary navigation">
        <a href="#home" className={`focus-ring rounded-full text-sm font-semibold ${isLightTheme ? "text-slate-900" : "text-white"}`}>
          {profile.name.split(" ").slice(-1)[0]}<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <a
            href="#home"
            className={`focus-ring rounded-full px-4 py-2 text-sm transition ${
              activeSection === "home"
                ? "bg-accent text-black shadow-[0_0_24px_rgb(var(--accent)/0.28)]"
                : navLinkClass
            }`}
          >
            Home
          </a>
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`focus-ring rounded-full px-4 py-2 text-sm transition ${
                activeSection === link.toLowerCase()
                  ? "bg-accent text-black shadow-[0_0_24px_rgb(var(--accent)/0.28)]"
                  : navLinkClass
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className={`focus-ring hidden rounded-full border px-4 py-2 text-sm font-medium shadow-[0_0_30px_rgb(var(--accent)/0.14)] transition md:inline-flex ${
            activeSection === "contact"
              ? "border-accent bg-accent text-black"
              : isLightTheme
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-accent/35 text-accent hover:bg-accent hover:text-black"
          }`}
        >
          Get in touch
        </a>

        <button
          type="button"
          className={`focus-ring grid h-10 w-10 place-items-center rounded-full border md:hidden ${
            isLightTheme ? "border-slate-200 text-slate-800" : "border-white/10 text-white"
          }`}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 grid gap-1 rounded-3xl border p-2 md:hidden ${mobilePanelClass}`}
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className={`rounded-2xl px-4 py-3 text-sm transition ${
                activeSection === link.toLowerCase()
                  ? "bg-accent text-black"
                  : mobileLinkClass
              }`}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`rounded-2xl px-4 py-3 text-sm transition ${
              activeSection === "contact"
                ? "bg-accent text-black"
                : mobileLinkClass
            }`}
          >
            Get in touch
          </a>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
