/**
 * Custom hook for Amplify UI theme integration
 * Provides enhanced theme functionality with utilities
 */

import { getTokenValue, themeUtils } from "@/lib/theme-utils";
import { useTheme as useAmplifyThemeBase } from "@aws-amplify/ui-react";
import { useCallback, useEffect, useState } from "react";

export interface UseAmplifyThemeReturn {
  /** Current theme object */
  theme: any;
  /** Current theme name */
  themeName: string;
  /** Whether dark mode is active */
  isDarkMode: boolean;
  /** Get token value by path */
  getToken: (path: string) => string | null;
  /** Get CSS variable name for token */
  getVariable: (path: string) => string;
  /** Apply theme to element */
  applyTheme: (element: HTMLElement) => void;
  /** Generate CSS for theme */
  generateCSS: () => string;
  /** Validate current theme */
  validateTheme: () => { isValid: boolean; errors: string[] };
}

/**
 * Enhanced hook for working with Amplify UI themes
 */
export function useAmplifyTheme(): UseAmplifyThemeReturn {
  const amplifyTheme = useAmplifyThemeBase();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode changes
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const checkDarkMode = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-color-mode") === "dark";
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-color-mode"],
    });

    return () => observer.disconnect();
  }, []);

  // Get token value by path
  const getToken = useCallback((path: string): string | null => {
    return getTokenValue(path);
  }, []);

  // Get CSS variable name for token
  const getVariable = useCallback((path: string): string => {
    return themeUtils.getTokenVariable(path);
  }, []);

  // Apply theme to element
  const applyTheme = useCallback(
    (element: HTMLElement) => {
      if (amplifyTheme?.name) {
        themeUtils.applyThemeClasses(element, amplifyTheme.name);
      }
    },
    [amplifyTheme],
  );

  // Generate CSS for current theme
  const generateCSS = useCallback((): string => {
    if (!amplifyTheme) return "";

    let css = themeUtils.cssUtils.generateCSSVariables(amplifyTheme as any);
    css += `\n${themeUtils.cssUtils.generateResponsiveCSS(amplifyTheme as any)}`;

    return css;
  }, [amplifyTheme]);

  // Validate current theme
  const validateTheme = useCallback(() => {
    if (!amplifyTheme) {
      return { isValid: false, errors: ["No theme loaded"] };
    }

    return themeUtils.validateTheme(amplifyTheme as any);
  }, [amplifyTheme]);

  return {
    theme: amplifyTheme,
    themeName: amplifyTheme?.name || "default",
    isDarkMode,
    getToken,
    getVariable,
    applyTheme,
    generateCSS,
    validateTheme,
  };
}

/**
 * Hook for theme-aware styling
 * Provides theme-aware utilities for components
 */
export function useThemeStyling() {
  const { getToken, isDarkMode } = useAmplifyTheme();

  // Get theme-aware color
  const getColor = useCallback(
    (lightPath: string, darkPath?: string) => {
      if (isDarkMode && darkPath) {
        return getToken(darkPath) || getToken(lightPath);
      }
      return getToken(lightPath);
    },
    [getToken, isDarkMode],
  );

  // Get theme-aware spacing
  const getSpace = useCallback(
    (size: "xs" | "small" | "medium" | "large" | "xl" | "xxl") => {
      return getToken(`space.${size}`) || "1rem";
    },
    [getToken],
  );

  // Get theme-aware font size
  const getFontSize = useCallback(
    (size: "small" | "medium" | "large" | "xl" | "2xl" | "3xl" | "4xl") => {
      return getToken(`fontSizes.${size}`) || "1rem";
    },
    [getToken],
  );

  // Get theme-aware border radius
  const getRadius = useCallback(
    (size: "xs" | "small" | "medium" | "large" | "xl" | "xxl" | "full") => {
      return getToken(`radii.${size}`) || "0.25rem";
    },
    [getToken],
  );

  // Get theme-aware shadow
  const getShadow = useCallback(
    (size: "small" | "medium" | "large" | "focus") => {
      return getToken(`shadows.${size}`) || "none";
    },
    [getToken],
  );

  // Generate theme-aware CSS object
  const getStyles = useCallback(
    (styles: Record<string, string>) => {
      const resolvedStyles: Record<string, string> = {};

      Object.entries(styles).forEach(([property, value]) => {
        // Replace token references with actual values
        if (value.startsWith("token:")) {
          const tokenPath = value.replace("token:", "");
          const tokenValue = getToken(tokenPath);
          resolvedStyles[property] = tokenValue || value;
        } else {
          resolvedStyles[property] = value;
        }
      });

      return resolvedStyles;
    },
    [getToken],
  );

  return {
    getColor,
    getSpace,
    getFontSize,
    getRadius,
    getShadow,
    getStyles,
    isDarkMode,
  };
}

/**
 * Hook for responsive theme utilities
 */
export function useResponsiveTheme() {
  const { theme } = useAmplifyTheme();
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("base");

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const breakpoints = (theme as any)?.tokens?.breakpoints?.values || {};

      let matchedBreakpoint = "base";
      for (const [name, value] of Object.entries(breakpoints)) {
        if (width >= (value as number)) {
          matchedBreakpoint = name;
        }
      }

      setCurrentBreakpoint(matchedBreakpoint);
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);

    return () => window.removeEventListener("resize", updateBreakpoint);
  }, [theme]);

  // Check if current breakpoint matches or is larger
  const isBreakpoint = useCallback(
    (breakpoint: string) => {
      const breakpoints = (theme as any)?.tokens?.breakpoints?.values || {};
      const current = (breakpoints[currentBreakpoint] as number) || 0;
      const target = (breakpoints[breakpoint] as number) || 0;

      return current >= target;
    },
    [theme, currentBreakpoint],
  );

  return {
    currentBreakpoint,
    isBreakpoint,
    isMobile: isBreakpoint("small"),
    isTablet: isBreakpoint("medium"),
    isDesktop: isBreakpoint("large"),
    isLargeDesktop: isBreakpoint("xl"),
  };
}

/**
 * Amplify UI compatible useBreakpointValue hook
 * Returns the value for the current breakpoint from object or array syntax
 */
export function useBreakpointValue<T = any>(
  values: Record<string, T> | T[],
): T {
  const { currentBreakpoint } = useResponsiveTheme();
  const breakpoints = [
    "base",
    "small",
    "medium",
    "large",
    "xl",
    "xxl",
  ] as const;

  if (Array.isArray(values)) {
    // Array syntax: return value at current breakpoint index
    const currentIndex = breakpoints.indexOf(currentBreakpoint as any);
    if (currentIndex === -1) return values[0];

    // Find the last defined value up to current breakpoint
    for (let i = currentIndex; i >= 0; i--) {
      if (values[i] !== undefined) return values[i];
    }
    return values[0];
  }

  if (typeof values === "object" && values !== null) {
    // Object syntax: return value for current breakpoint
    const breakpointOrder = ["xxl", "xl", "large", "medium", "small", "base"];

    for (const breakpoint of breakpointOrder) {
      if (
        breakpoint === currentBreakpoint &&
        values[breakpoint] !== undefined
      ) {
        return values[breakpoint];
      }
      // Find the largest breakpoint less than or equal to current
      if (
        breakpoints.indexOf(breakpoint as any) <=
        breakpoints.indexOf(currentBreakpoint as any)
      ) {
        if (values[breakpoint] !== undefined) return values[breakpoint];
      }
    }

    // Fallback to base
    return (
      values.base ||
      values.small ||
      values.medium ||
      values.large ||
      values.xl ||
      values.xxl
    );
  }

  return values as T;
}

/**
 * Hook for responsive style objects
 * Converts responsive style objects to CSS-in-JS compatible format
 */
export function useResponsiveStyles(
  styles: Record<string, Record<string, any> | any[]>,
) {
  const resolvedStyles: Record<string, any> = {};

  Object.entries(styles).forEach(([property, responsiveValue]) => {
    if (Array.isArray(responsiveValue)) {
      // Array syntax
      resolvedStyles[property] = useBreakpointValue(responsiveValue);
    } else if (
      typeof responsiveValue === "object" &&
      responsiveValue !== null
    ) {
      // Object syntax
      resolvedStyles[property] = useBreakpointValue(responsiveValue);
    } else {
      // Static value
      resolvedStyles[property] = responsiveValue;
    }
  });

  return resolvedStyles;
}

/**
 * Hook for responsive component props
 * Helps create components that accept responsive props like Amplify UI primitives
 */
export function useResponsiveProps<T extends Record<string, any>>(props: T) {
  const responsiveProps: Record<string, any> = {};
  const staticProps: Record<string, any> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Responsive object - convert using useBreakpointValue
      responsiveProps[key] = useBreakpointValue(value);
    } else if (Array.isArray(value)) {
      // Responsive array - convert using useBreakpointValue
      responsiveProps[key] = useBreakpointValue(value);
    } else {
      // Static value
      staticProps[key] = value;
    }
  });

  return { ...staticProps, ...responsiveProps };
}

/**
 * Hook for theme persistence
 */
export function useThemePersistence() {
  const { themeName } = useAmplifyTheme();

  const savePreference = useCallback((themeName: string) => {
    themeUtils.themePersistence.saveThemePreference(themeName);
  }, []);

  const loadPreference = useCallback(() => {
    return themeUtils.themePersistence.loadThemePreference();
  }, []);

  const clearPreference = useCallback(() => {
    themeUtils.themePersistence.clearThemePreference();
  }, []);

  // Auto-save theme changes
  useEffect(() => {
    if (themeName && themeName !== "default") {
      savePreference(themeName);
    }
  }, [themeName, savePreference]);

  return {
    savePreference,
    loadPreference,
    clearPreference,
  };
}

export default useAmplifyTheme;
