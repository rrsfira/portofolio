"use client";

import { useEffect, useState } from "react";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
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

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", theme.rgb);
    document.documentElement.style.setProperty("--accent-glow", theme.rgb);
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  }, [theme, mode]);

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
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
