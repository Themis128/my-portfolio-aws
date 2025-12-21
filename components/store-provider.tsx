"use client";

import { Provider } from "jotai";
import { ReactNode, useEffect } from "react";
import { useSetAtom } from "jotai";
import {
  initializeThemeAtom,
  loadThemePreferencesAtom,
} from "@/stores/theme-store";

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const initializeTheme = useSetAtom(initializeThemeAtom);
  const loadThemePreferences = useSetAtom(loadThemePreferencesAtom);

  // Initialize theme and preferences on mount
  useEffect(() => {
    // Initialize theme system
    initializeTheme();

    // Load theme preferences
    loadThemePreferences();
  }, [initializeTheme, loadThemePreferences]);

  return <Provider>{children}</Provider>;
}
