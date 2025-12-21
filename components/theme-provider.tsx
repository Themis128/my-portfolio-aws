"use client";

import {
  Theme as AmplifyTheme,
  ThemeProvider as AmplifyThemeProvider,
} from "@aws-amplify/ui-react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme as useNextTheme,
} from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "high-contrast" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default values during SSR to prevent crashes
    if (typeof window === "undefined") {
      return {
        theme: "system" as Theme,
        setTheme: () => {},
        themes: ["light", "dark", "high-contrast", "system"] as Theme[],
      };
    }
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      themes={["light", "dark", "high-contrast"]}
      {...props}
    >
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </NextThemesProvider>
  );
}

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const { theme: nextTheme, setTheme: setNextTheme, themes } = useNextTheme();

  const contextValue: ThemeContextType = {
    theme: (nextTheme as Theme) || "system",
    setTheme: setNextTheme,
    themes: themes as Theme[],
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeSelectorWrapper>{children}</ThemeSelectorWrapper>
    </ThemeContext.Provider>
  );
}

function ThemeSelectorWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { theme: nextTheme } = useNextTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AmplifyThemeProvider theme={portfolioTheme}>
        {children}
      </AmplifyThemeProvider>
    );
  }

  const theme = (nextTheme as Theme) || "system";

  return (
    <AmplifyThemeProvider
      theme={theme === "high-contrast" ? highContrastTheme : portfolioTheme}
    >
      {children}
    </AmplifyThemeProvider>
  );
}

// Portfolio theme with multiple variations using design token references
const portfolioTheme: AmplifyTheme = {
  name: "portfolio-theme",
  tokens: {
    colors: {
      // Neutral color palette for consistency
      neutral: {
        10: { value: "#ffffff" },
        20: { value: "#f8f9fa" },
        40: { value: "#e9ecef" },
        60: { value: "#ced4da" },
        80: { value: "#6c757d" },
        90: { value: "#495057" },
        100: { value: "#212529" },
      },
      font: {
        primary: { value: "{colors.neutral.100.value}" },
        secondary: { value: "{colors.neutral.80.value}" },
        tertiary: { value: "{colors.neutral.60.value}" },
        interactive: { value: "{colors.brand.primary.90.value}" },
      },
      background: {
        primary: { value: "{colors.neutral.10.value}" },
        secondary: { value: "{colors.neutral.20.value}" },
        tertiary: { value: "{colors.neutral.40.value}" },
        interactive: { value: "{colors.brand.primary.10.value}" },
      },
      border: {
        primary: { value: "{colors.neutral.40.value}" },
        secondary: { value: "{colors.neutral.60.value}" },
        focus: { value: "{colors.brand.primary.80.value}" },
      },
      brand: {
        primary: {
          10: { value: "#e6f7ff" },
          20: { value: "#bae7ff" },
          40: { value: "#91d5ff" },
          60: { value: "#69c0ff" },
          80: { value: "#40a9ff" },
          90: { value: "#1890ff" },
          100: { value: "#096dd9" },
        },
        secondary: {
          10: { value: "#f6ffed" },
          20: { value: "#d9f7be" },
          40: { value: "#b7eb8f" },
          60: { value: "#95de64" },
          80: { value: "#52c41a" },
          90: { value: "#389e0d" },
          100: { value: "#237804" },
        },
      },
      feedback: {
        success: { value: "{colors.brand.secondary.80.value}" },
        warning: { value: "#faad14" },
        error: { value: "#ff4d4f" },
        info: { value: "{colors.brand.primary.80.value}" },
      },
    },
    fonts: {
      default: {
        variable: {
          value:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        static: {
          value:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
      },
      mono: {
        variable: {
          value:
            '"Geist Mono", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
        },
        static: {
          value:
            '"Geist Mono", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
        },
      },
    },
    fontSizes: {
      small: { value: "0.875rem" },
      medium: { value: "1rem" },
      large: { value: "1.125rem" },
      xl: { value: "1.25rem" },
      "2xl": { value: "1.5rem" },
      "3xl": { value: "1.875rem" },
      "4xl": { value: "2.25rem" },
    },
    fontWeights: {
      normal: { value: "400" },
      medium: { value: "500" },
      semibold: { value: "600" },
      bold: { value: "700" },
    },
    lineHeights: {
      tight: { value: "1.25" },
      normal: { value: "1.5" },
      relaxed: { value: "1.75" },
    },
    space: {
      xs: { value: "0.25rem" },
      small: { value: "0.5rem" },
      medium: { value: "1rem" },
      large: { value: "1.5rem" },
      xl: { value: "2rem" },
      xxl: { value: "3rem" },
      "3xl": { value: "4rem" },
    },
    radii: {
      xs: { value: "0.125rem" },
      small: { value: "0.25rem" },
      medium: { value: "0.375rem" },
      large: { value: "0.5rem" },
      xl: { value: "0.75rem" },
      xxl: { value: "1rem" },
      full: { value: "9999px" },
    },
    shadows: {
      small: { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
      medium: {
        value:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      large: {
        value:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      focus: {
        value: "0 0 0 3px rgba(24, 144, 255, 0.2)",
      },
    },
    borderWidths: {
      thin: { value: "1px" },
      medium: { value: "2px" },
      thick: { value: "4px" },
    },
  },
  // Dark mode overrides using references
  overrides: [
    {
      colorMode: "dark",
      tokens: {
        colors: {
          neutral: {
            10: { value: "#212529" },
            20: { value: "#343a40" },
            40: { value: "#495057" },
            60: { value: "#6c757d" },
            80: { value: "#adb5bd" },
            90: { value: "#ced4da" },
            100: { value: "#f8f9fa" },
          },
          font: {
            primary: { value: "{colors.neutral.100.value}" },
            secondary: { value: "{colors.neutral.80.value}" },
            tertiary: { value: "{colors.neutral.60.value}" },
          },
          background: {
            primary: { value: "{colors.neutral.10.value}" },
            secondary: { value: "{colors.neutral.20.value}" },
            tertiary: { value: "{colors.neutral.40.value}" },
          },
          border: {
            primary: { value: "{colors.neutral.40.value}" },
            secondary: { value: "{colors.neutral.60.value}" },
          },
        },
      },
    },
    {
      breakpoint: "large",
      tokens: {
        space: {
          small: { value: "0.75rem" },
          medium: { value: "1.5rem" },
          large: { value: "2rem" },
        },
        fontSizes: {
          large: { value: "1.25rem" },
          xl: { value: "1.375rem" },
          "2xl": { value: "1.75rem" },
        },
      },
    },
  ],
};

// High contrast theme for accessibility
const highContrastTheme: AmplifyTheme = {
  name: "high-contrast-portfolio",
  tokens: {
    colors: {
      font: {
        primary: { value: "#000000" },
        secondary: { value: "#000000" },
        tertiary: { value: "#000000" },
      },
      background: {
        primary: { value: "#ffffff" },
        secondary: { value: "#f0f0f0" },
        tertiary: { value: "#e0e0e0" },
      },
      border: {
        primary: { value: "#000000" },
        secondary: { value: "#000000" },
      },
      brand: {
        primary: {
          10: { value: "#000000" },
          20: { value: "#000000" },
          40: { value: "#000000" },
          60: { value: "#000000" },
          80: { value: "#000000" },
          90: { value: "#000000" },
          100: { value: "#000000" },
        },
      },
    },
  },
  overrides: [
    {
      colorMode: "dark",
      tokens: {
        colors: {
          font: {
            primary: { value: "#ffffff" },
            secondary: { value: "#ffffff" },
            tertiary: { value: "#ffffff" },
          },
          background: {
            primary: { value: "#000000" },
            secondary: { value: "#1a1a1a" },
            tertiary: { value: "#333333" },
          },
          border: {
            primary: { value: "#ffffff" },
            secondary: { value: "#cccccc" },
          },
          brand: {
            primary: {
              10: { value: "#ffffff" },
              20: { value: "#ffffff" },
              40: { value: "#ffffff" },
              60: { value: "#ffffff" },
              80: { value: "#ffffff" },
              90: { value: "#ffffff" },
              100: { value: "#ffffff" },
            },
          },
        },
      },
    },
  ],
};

export default ThemeProvider;
export { ThemeProvider };
