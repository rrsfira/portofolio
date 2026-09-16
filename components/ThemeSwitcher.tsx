"use client";

import { useState } from "react";
import { Moon, Palette, Sun, X } from "lucide-react";

export const themes = [
  { name: "Cyan", rgb: "34 211 238", swatch: "#22d3ee" },
  { name: "Blue", rgb: "59 130 246", swatch: "#3b82f6" },
  { name: "Purple", rgb: "168 85 247", swatch: "#a855f7" },
  { name: "Pink", rgb: "236 72 153", swatch: "#ec4899" },
  { name: "Green", rgb: "34 197 94", swatch: "#22c55e" },
  { name: "Orange", rgb: "249 115 22", swatch: "#f97316" },
  { name: "Red", rgb: "239 68 68", swatch: "#ef4444" }
];

type Theme = (typeof themes)[number];
type ThemeMode = "dark" | "light";

export function ThemeSwitcher({
  selected,
  onChange,
  mode,
  onModeChange
}: {
  selected: Theme;
  onChange: (theme: Theme) => void;
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
}) {
  const isDark = mode === "dark";
  const [isOpen, setIsOpen] = useState(false);

  const surfaceClass = isDark
    ? "border-white/10 bg-black/55 text-white"
    : "border-slate-200/80 bg-white/80 text-slate-800";

  return (
    <div className="fixed bottom-3 right-3 z-50 sm:bottom-5 sm:right-5">
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`grid h-11 w-11 place-items-center rounded-full border shadow-2xl backdrop-blur-xl transition hover:scale-105 ${surfaceClass}`}
          aria-label="Open theme settings"
          title="Open theme settings"
        >
          <Palette className="h-4 w-4 text-accent" />
        </button>
      )}

      {isOpen && (
        <div
          className={`relative flex w-[min(22rem,calc(100vw-1.5rem))] items-center justify-between gap-1 rounded-2xl border px-2 py-2 pr-10 shadow-2xl backdrop-blur-xl transition sm:w-auto sm:flex-col sm:gap-2 sm:rounded-3xl sm:px-2 sm:py-3 sm:pr-2 ${surfaceClass}`}
        >
          <div className="absolute right-2 top-2 flex items-center justify-between sm:static sm:w-auto">
            <Palette className="ml-1 hidden h-4 w-4 text-accent sm:block" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-white/10"
              aria-label="Close theme settings"
              title="Close theme settings"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

      <button
        type="button"
        onClick={() => onModeChange(isDark ? "light" : "dark")}
        className={`flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] transition sm:gap-2 ${
          isDark
            ? "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
            : "border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200"
        }`}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        title={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        <span className="hidden sm:inline">{isDark ? "Dark" : "Light"}</span>
      </button>

      <div
        className={`hidden h-px w-5 sm:block ${isDark ? "bg-white/10" : "bg-slate-200"}`}
        aria-hidden="true"
      />

      <div className="flex gap-0 sm:flex-col sm:gap-1" role="radiogroup" aria-label="Theme accent color">
        {themes.map((theme) => (
          <button
            key={theme.name}
            type="button"
            role="radio"
            aria-checked={selected.name === theme.name}
            aria-label={`${theme.name} accent`}
            title={theme.name}
            onClick={() => onChange(theme)}
            className="focus-ring grid h-6 w-6 place-items-center rounded-full sm:h-7 sm:w-7"
          >
            <span
              className={`block h-4 w-4 rounded-full transition ${
                selected.name === theme.name
                  ? isDark
                    ? "scale-100 ring-2 ring-white/80 ring-offset-2 ring-offset-black"
                    : "scale-100 ring-2 ring-slate-700/80 ring-offset-2 ring-offset-white"
                  : "scale-90 opacity-70 hover:scale-100 hover:opacity-100"
              }`}
              style={{ backgroundColor: theme.swatch }}
            />
          </button>
        ))}
      </div>
        </div>
      )}
    </div>
  );
}
