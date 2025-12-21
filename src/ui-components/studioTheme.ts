import { Theme as AmplifyTheme } from "@aws-amplify/ui-react";
import figmaTokens from "./figmaTokens.generated";

// Portfolio theme for Amplify Studio integration
export const studioTheme: AmplifyTheme = {
  name: "portfolio-theme",
  tokens: {
    colors: {
      // Merge tokens generated from Figma (if any) first so they can override slots
      ...(figmaTokens?.colors || {}),

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
        primary: { value: "#212529" },
        secondary: { value: "#6c757d" },
        tertiary: { value: "#ced4da" },
        interactive: { value: "#1890ff" },
      },
      background: {
        primary: { value: "#ffffff" },
        secondary: { value: "#f8f9fa" },
        tertiary: { value: "#e9ecef" },
        interactive: { value: "#e6f7ff" },
      },
      border: {
        primary: { value: "#e9ecef" },
        secondary: { value: "#ced4da" },
        focus: { value: "#40a9ff" },
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
        success: { value: "#52c41a" },
        warning: { value: "#faad14" },
        error: { value: "#ff4d4f" },
        info: { value: "#40a9ff" },
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
    transitions: {
      fast: { value: "150ms ease-in-out" },
      normal: { value: "200ms ease-in-out" },
      slow: { value: "300ms ease-in-out" },
    },
    breakpoints: {
      values: {
        base: 0,
        small: 480,
        medium: 768,
        large: 992,
        xl: 1280,
        xxl: 1536,
      },
      defaultBreakpoint: "base" as const,
    },
  },
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
            primary: { value: "#f8f9fa" },
            secondary: { value: "#adb5bd" },
            tertiary: { value: "#ced4da" },
          },
          background: {
            primary: { value: "#212529" },
            secondary: { value: "#343a40" },
            tertiary: { value: "#495057" },
          },
          border: {
            primary: { value: "#495057" },
            secondary: { value: "#6c757d" },
          },
        },
      },
    },
  ],
} as unknown as AmplifyTheme;

// Re-export the theme type for TypeScript support
export type { AmplifyTheme };
