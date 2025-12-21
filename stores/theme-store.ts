/**
 * Theme Store - Jotai atomic state management for theme
 * Enhancing existing next-themes with atomic state management
 */

import { atom } from "jotai";

// Types
export type Theme = "light" | "dark" | "high-contrast" | "system";

// Theme state atoms
export const themeAtom = atom<Theme>("system");
export const mountedAtom = atom<boolean>(false);
export const systemThemeAtom = atom<Theme>("light");

// Derived atoms
export const effectiveThemeAtom = atom((get) => {
  const theme = get(themeAtom);
  const systemTheme = get(systemThemeAtom);
  const mounted = get(mountedAtom);

  if (!mounted) return "system";
  return theme === "system" ? systemTheme : theme;
});

export const isDarkAtom = atom((get) => {
  const effectiveTheme = get(effectiveThemeAtom);
  return effectiveTheme === "dark" || effectiveTheme === "high-contrast";
});

export const isHighContrastAtom = atom((get) => {
  const effectiveTheme = get(effectiveThemeAtom);
  return effectiveTheme === "high-contrast";
});

// Theme configuration
export const availableThemesAtom = atom<Theme[]>([
  "light",
  "dark",
  "high-contrast",
  "system",
]);

// Theme actions
export const setThemeAtom = atom(null, (get, set, theme: Theme) => {
  set(themeAtom, theme);

  // Persist to localStorage (client-side only)
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
  }
});

export const toggleThemeAtom = atom(null, (get, set) => {
  const currentTheme = get(themeAtom);
  const themes = get(availableThemesAtom);
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  const nextTheme = themes[nextIndex];

  set(setThemeAtom, nextTheme);
});

export const initializeThemeAtom = atom(null, (get, set) => {
  // Only run on client side
  if (typeof window === "undefined") return;

  set(mountedAtom, true);

  // Detect system theme
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const systemTheme: Theme = mediaQuery.matches ? "dark" : "light";
  set(systemThemeAtom, systemTheme);

  // Listen for system theme changes
  const handleChange = (e: MediaQueryListEvent) => {
    const newSystemTheme: Theme = e.matches ? "dark" : "light";
    set(systemThemeAtom, newSystemTheme);
  };

  mediaQuery.addEventListener("change", handleChange);

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("theme") as Theme;
  if (savedTheme && get(availableThemesAtom).includes(savedTheme)) {
    set(themeAtom, savedTheme);
  } else {
    set(themeAtom, "system");
  }

  // Cleanup function (this won't be called automatically, but it's good practice)
  return () => {
    mediaQuery.removeEventListener("change", handleChange);
  };
});

// Theme utility atoms
export const getThemeClassesAtom = atom((get) => {
  const effectiveTheme = get(effectiveThemeAtom);
  const isHighContrast = get(isHighContrastAtom);

  const baseClasses: Record<Theme, string> = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-gray-100",
    "high-contrast": "bg-white text-black border-2 border-black",
    system: "bg-white text-gray-900", // Fallback
  };

  const contrastClasses = isHighContrast ? "contrast-125" : "";

  return `${baseClasses[effectiveTheme]} ${contrastClasses}`;
});

export const getThemeColorsAtom = atom((get) => {
  const effectiveTheme = get(effectiveThemeAtom);

  const colors = {
    light: {
      primary: "#1a1a1a",
      secondary: "#666666",
      background: "#ffffff",
      surface: "#f8f9fa",
      border: "#dee2e6",
    },
    dark: {
      primary: "#ffffff",
      secondary: "#cccccc",
      background: "#1a1a1a",
      surface: "#2d2d2d",
      border: "#404040",
    },
    "high-contrast": {
      primary: "#000000",
      secondary: "#000000",
      background: "#ffffff",
      surface: "#f0f0f0",
      border: "#000000",
    },
    system: {
      primary: "#1a1a1a",
      secondary: "#666666",
      background: "#ffffff",
      surface: "#f8f9fa",
      border: "#dee2e6",
    },
  };

  return colors[effectiveTheme];
});

// Theme preference atoms
export const themePreferencesAtom = atom({
  autoSwitch: false, // Auto-switch based on time of day
  reduceMotion: false, // Respect prefers-reduced-motion
  highContrast: false, // Force high contrast mode
});

export const updateThemePreferencesAtom = atom(
  null,
  (
    get,
    set,
    preferences: Partial<{
      autoSwitch: boolean;
      reduceMotion: boolean;
      highContrast: boolean;
    }>,
  ) => {
    const current = get(themePreferencesAtom);
    set(themePreferencesAtom, { ...current, ...preferences });

    // Persist preferences
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "themePreferences",
        JSON.stringify({ ...current, ...preferences }),
      );
    }
  },
);

export const loadThemePreferencesAtom = atom(null, (get, set) => {
  if (typeof window === "undefined") return;

  try {
    const saved = localStorage.getItem("themePreferences");
    if (saved) {
      const preferences = JSON.parse(saved);
      set(themePreferencesAtom, preferences);
    }
  } catch (error) {
    console.warn("Failed to load theme preferences:", error);
  }
});
