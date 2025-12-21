"use client";

import { useTheme } from "next-themes";

export default function SimpleThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      className="rounded-md border border-border bg-background p-2 hover:bg-accent"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      type="button"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
