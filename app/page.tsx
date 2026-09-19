"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Certifications } from "@/components/Certifications";
import { CustomCursor } from "@/components/CustomCursor";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { ThemeSwitcher, themes } from "@/components/ThemeSwitcher";

export default function Home() {
  const [theme, setTheme] = useState(themes[0]);
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", theme.rgb);
    document.documentElement.style.setProperty("--accent-glow", theme.rgb);
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  }, [theme, mode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative z-10 min-h-screen">
      <div className="noise" aria-hidden="true" />
      <CustomCursor />
      <Navbar />
      <ThemeSwitcher
        selected={theme}
        onChange={setTheme}
        mode={mode}
        onModeChange={setMode}
      />
      {showScrollTop ? (
        <button
          type="button"
          onClick={scrollToTop}
          className={`focus-ring fixed bottom-20 right-3 z-50 grid h-11 w-11 place-items-center rounded-full border shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 sm:bottom-24 sm:right-5 ${
            mode === "dark"
              ? "border-white/10 bg-black/55 text-white hover:border-accent/50 hover:text-accent"
              : "border-slate-200/80 bg-white/80 text-slate-800 hover:border-accent/50 hover:text-accent"
          }`}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      ) : null}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
    </main>
  );
}
