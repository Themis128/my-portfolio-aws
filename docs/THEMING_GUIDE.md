# Amplify UI Theming Guide

This guide covers the enhanced Amplify UI theming implementation in your portfolio project.

## Overview

The theming system combines multiple approaches to provide a comprehensive, flexible, and maintainable theming solution:

- **Amplify UI Theme System** - Core theming with design tokens
- **Next-themes Integration** - System theme detection and persistence
- **Jotai State Management** - Atomic theme state management
- **Custom Utilities** - Enhanced theming utilities and hooks
- **CSS Custom Properties** - Runtime theme variable access

## Architecture

### Theme Provider Structure

```
ThemeProvider (next-themes)
├── ThemeContextProvider (custom context)
└── ThemeSelectorWrapper
    └── AmplifyThemeProvider (Amplify UI)
        ├── portfolioTheme (default)
        └── highContrastTheme (accessibility)
```

### Design Token System

The theme uses a hierarchical token system with references:

```typescript
// Base tokens
colors: {
  neutral: { 10: '#ffffff', 20: '#f8f9fa', ... },
  brand: { primary: { 10: '#e6f7ff', ... }, ... }
}

// Referenced tokens
colors: {
  font: {
    primary: { value: '{colors.neutral.100.value}' },
    secondary: { value: '{colors.neutral.80.value}' }
  }
}
```

## Usage

### Basic Theme Usage

```tsx
import { useTheme } from "@/components/theme-provider";

function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme("dark")}>Current theme: {theme}</button>
  );
}
```

### Advanced Theme Usage with Hooks

```tsx
import { useAmplifyTheme, useThemeStyling } from "@/hooks/use-amplify-theme";

function ThemedComponent() {
  const { getToken, isDarkMode } = useAmplifyTheme();
  const { getColor, getSpace, getStyles } = useThemeStyling();

  const styles = getStyles({
    backgroundColor: "token:colors.background.primary",
    color: "token:colors.font.primary",
    padding: "token:space.medium",
  });

  return <div style={styles}>Themed content</div>;
}
```

### Token Access Patterns

#### 1. Direct Token Access

```tsx
const { getToken } = useAmplifyTheme();
const primaryColor = getToken("colors.brand.primary.90");
```

#### 2. Theme-Aware Styling

```tsx
const { getColor } = useThemeStyling();
const textColor = getColor("colors.font.primary", "colors.font.primary.dark");
```

#### 3. CSS Variable Usage

```css
.my-component {
  background-color: var(--amplify-colors-background-primary);
  color: var(--amplify-colors-font-primary);
  padding: var(--amplify-space-medium);
}
```

## Design Tokens

### Color System

#### Neutral Colors

- `neutral.10` to `neutral.100` - Grayscale palette
- Used for text, backgrounds, borders

#### Brand Colors

- `brand.primary.10` to `brand.primary.100` - Primary brand palette
- `brand.secondary.10` to `brand.secondary.100` - Secondary brand palette

#### Feedback Colors

- `feedback.success` - Success states
- `feedback.warning` - Warning states
- `feedback.error` - Error states
- `feedback.info` - Information states

### Typography

#### Font Families

- `fonts.default` - Primary font stack (Inter)
- `fonts.mono` - Monospace font stack

#### Font Sizes

- `fontSizes.small` (0.875rem)
- `fontSizes.medium` (1rem)
- `fontSizes.large` (1.125rem)
- `fontSizes.xl` (1.25rem)
- `fontSizes.2xl` (1.5rem)
- `fontSizes.3xl` (1.875rem)
- `fontSizes.4xl` (2.25rem)

#### Font Weights

- `fontWeights.normal` (400)
- `fontWeights.medium` (500)
- `fontWeights.semibold` (600)
- `fontWeights.bold` (700)

### Spacing

- `space.xs` (0.25rem)
- `space.small` (0.5rem)
- `space.medium` (1rem)
- `space.large` (1.5rem)
- `space.xl` (2rem)
- `space.xxl` (3rem)
- `space.3xl` (4rem)

### Border Radius

- `radii.xs` (0.125rem)
- `radii.small` (0.25rem)
- `radii.medium` (0.375rem)
- `radii.large` (0.5rem)
- `radii.xl` (0.75rem)
- `radii.xxl` (1rem)
- `radii.full` (9999px)

### Shadows

- `shadows.small` - Subtle shadow
- `shadows.medium` - Standard shadow
- `shadows.large` - Prominent shadow
- `shadows.focus` - Focus ring shadow

### Breakpoints

- `base` (0px)
- `small` (480px)
- `medium` (768px)
- `large` (992px)
- `xl` (1280px)
- `xxl` (1536px)

## Theme Variations

### Light Theme (Default)

```typescript
const portfolioTheme = {
  name: "portfolio-theme",
  tokens: {
    colors: {
      font: { primary: "{colors.neutral.100.value}" },
      background: { primary: "{colors.neutral.10.value}" },
      // ... more tokens
    },
  },
};
```

### Dark Theme Override

```typescript
overrides: [
  {
    colorMode: "dark",
    tokens: {
      colors: {
        neutral: {
          10: { value: "#212529" },
          100: { value: "#f8f9fa" },
        },
      },
    },
  },
];
```

### High Contrast Theme

Separate theme optimized for accessibility with maximum contrast ratios.

## Responsive Theming

### Breakpoint Overrides

```typescript
overrides: [
  {
    breakpoint: "large",
    tokens: {
      space: {
        medium: { value: "1.5rem" },
        large: { value: "2rem" },
      },
    },
  },
];
```

### Responsive Hook Usage

```tsx
import { useResponsiveTheme } from "@/hooks/use-amplify-theme";

function ResponsiveComponent() {
  const { isMobile, isDesktop, currentBreakpoint } = useResponsiveTheme();

  return (
    <div className={isMobile ? "mobile-layout" : "desktop-layout"}>
      Current breakpoint: {currentBreakpoint}
    </div>
  );
}
```

## Component Theming

### Component Token Pattern

Follow the Amplify UI pattern: `component[modifier][_state][child]`

```typescript
const buttonTokens = {
  // Base styles
  backgroundColor: { value: "{colors.brand.primary.90.value}" },

  // States
  _hover: {
    backgroundColor: { value: "{colors.brand.primary.80.value}" },
  },
  _focus: {
    boxShadow: { value: "{shadows.focus.value}" },
  },

  // Variations
  primary: {
    backgroundColor: { value: "{colors.brand.primary.90.value}" },
  },
  secondary: {
    backgroundColor: { value: "{colors.neutral.40.value}" },
  },

  // Variation with states
  primary_hover: {
    backgroundColor: { value: "{colors.brand.primary.80.value}" },
  },
};
```

### Styled Component Example

```tsx
import { useThemeStyling } from "@/hooks/use-amplify-theme";

function ThemedButton({ variant = "primary", children }) {
  const { getStyles } = useThemeStyling();

  const baseStyles = getStyles({
    backgroundColor: "token:colors.brand.primary.90",
    color: "token:colors.brand.primary.10",
    border: "none",
    borderRadius: "token:radii.medium",
    padding: "token:space.medium token:space.xl",
    cursor: "pointer",
    transition: "token:transitions.normal",
  });

  const hoverStyles = getStyles({
    backgroundColor: "token:colors.brand.primary.80",
    transform: "translateY(-1px)",
    boxShadow: "token:shadows.medium",
  });

  return (
    <button
      style={baseStyles}
      onMouseEnter={(e) => {
        Object.entries(hoverStyles).forEach(([prop, value]) => {
          e.currentTarget.style[prop as any] = value;
        });
      }}
      onMouseLeave={(e) => {
        Object.entries(baseStyles).forEach(([prop, value]) => {
          e.currentTarget.style[prop as any] = value;
        });
      }}
    >
      {children}
    </button>
  );
}
```

## Utilities

### Theme Utilities

```typescript
import { themeUtils } from "@/lib/theme-utils";

// Create custom theme
const customTheme = themeUtils.createCustomTheme({
  colors: {
    brand: { primary: { 90: { value: "#ff0000" } } },
  },
});

// Validate theme
const validation = themeUtils.validateTheme(customTheme);

// Generate CSS
const css = themeUtils.cssUtils.generateCSSVariables(customTheme);
```

### Color Utilities

```typescript
import { colorUtils } from "@/lib/theme-utils";

// Generate palette
const palette = colorUtils.generatePalette("#1890ff");

// Check contrast
const ratio = colorUtils.getContrastRatio("#ffffff", "#000000");

// Convert to RGB
const rgb = colorUtils.hexToRgb("#ff0000");
```

### Theme Persistence

```typescript
import { themePersistence } from "@/lib/theme-utils";

// Save preference
themePersistence.saveThemePreference("dark");

// Load preference
const saved = themePersistence.loadThemePreference();

// Clear preference
themePersistence.clearThemePreference();
```

## Best Practices

### 1. Use Token References

```typescript
// Good
primary: {
  value: "{colors.neutral.100.value}";
}

// Avoid
primary: {
  value: "#212529";
}
```

### 2. Follow Naming Conventions

- Use kebab-case for token names
- Group related tokens (colors, spacing, etc.)
- Use semantic names (primary, secondary, not blue, red)

### 3. Maintain Contrast Ratios

Ensure text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

### 4. Test Across Themes

Verify components work in:

- Light theme
- Dark theme
- High contrast theme
- Different breakpoints

### 5. Use Responsive Tokens

Leverage breakpoint overrides for adaptive spacing and typography.

## Migration Guide

### From Inline Styles

```tsx
// Before
<div style={{ backgroundColor: '#ffffff', color: '#000000' }}>

// After
<div style={{
  backgroundColor: getToken('colors.background.primary'),
  color: getToken('colors.font.primary')
 }}>
```

### From CSS Classes

```css
/* Before */
.custom-card {
  background-color: white;
  color: black;
  padding: 1rem;
  border-radius: 0.5rem;
}

/* After */
.custom-card {
  background-color: var(--amplify-colors-background-primary);
  color: var(--amplify-colors-font-primary);
  padding: var(--amplify-space-medium);
  border-radius: var(--amplify-radii-medium);
}
```

## Troubleshooting

### Common Issues

1. **Tokens not updating**: Ensure theme provider wraps the component
2. **CSS variables not working**: Check data-amplify-theme attribute
3. **Dark mode not applying**: Verify override configuration
4. **Responsive tokens not working**: Check breakpoint values

### Debug Tools

Use the ThemeDemo component to inspect current theme state and generated CSS.

```tsx
import { ThemeDemo } from "@/components/ui/theme-demo";

// Add to any page for debugging
<ThemeDemo />;
```

## Performance Considerations

- Theme tokens are converted to CSS variables once at mount
- Token resolution is cached for performance
- Use CSS variables for frequent style updates
- Minimize dynamic style calculations

## Accessibility

- High contrast theme provided for accessibility
- Focus states use theme-aware colors
- Text contrast ratios meet WCAG standards
- Reduced motion respected in transitions

## Responsive Styling

Amplify UI provides powerful responsive styling capabilities that work seamlessly with the enhanced theming system.

### useBreakpointValue Hook

The `useBreakpointValue` hook provides Amplify-compatible responsive value resolution:

```tsx
import { useBreakpointValue } from "@/hooks/use-amplify-theme";

// Array syntax
const fontSizeArray = ["1rem", "1.25rem", "1.5rem", "2rem", "2.5rem"];
const currentFontSize = useBreakpointValue(fontSizeArray);

// Object syntax
const responsiveColors = {
  base: "var(--amplify-colors-brand-primary-90)",
  small: "var(--amplify-colors-brand-primary-80)",
  medium: "var(--amplify-colors-brand-primary-70)",
  large: "var(--amplify-colors-brand-primary-60)",
};
const currentColor = useBreakpointValue(responsiveColors);
```

### useResponsiveStyles Hook

Convert responsive style objects to CSS-in-JS compatible format:

```tsx
import { useResponsiveStyles } from "@/hooks/use-amplify-theme";

const styles = useResponsiveStyles({
  backgroundColor: {
    base: "var(--amplify-colors-brand-primary-90)",
    large: "var(--amplify-colors-brand-primary-60)",
  },
  padding: {
    base: "var(--amplify-space-medium)",
    large: "var(--amplify-space-large)",
  },
});
```

### useResponsiveProps Hook

Create components that accept responsive props like Amplify UI primitives:

```tsx
import { useResponsiveProps } from "@/hooks/use-amplify-theme";

const props = useResponsiveProps({
  width: "100%",
  backgroundColor: {
    base: "var(--amplify-colors-background-primary)",
    large: "var(--amplify-colors-background-secondary)",
  },
  padding: {
    base: "var(--amplify-space-medium)",
    large: "var(--amplify-space-large)",
  },
});
```

### Responsive Patterns

#### Object Syntax

Define different values for each breakpoint:

```tsx
const responsiveStyles = {
  backgroundColor: {
    base: "var(--amplify-colors-brand-primary-90)",
    small: "var(--amplify-colors-brand-primary-80)",
    medium: "var(--amplify-colors-brand-primary-70)",
    large: "var(--amplify-colors-brand-primary-60)",
  },
};
```

#### Array Syntax

Provide values in breakpoint order:

```tsx
const fontSizeArray = ["1rem", "1.25rem", "1.5rem", "2rem", "2.5rem"];
// Maps to: base→1rem, small→1.25rem, medium→1.5rem, large→2rem, xl→2.5rem
```

### Breakpoint System

The enhanced theming system uses these breakpoints:

- **base**: 0px - 479px
- **small**: 480px - 767px
- **medium**: 768px - 991px
- **large**: 992px - 1279px
- **xl**: 1280px - 1535px
- **xxl**: 1536px+

### Responsive Component Examples

#### Themed Card Component

```tsx
function ThemedCard() {
  const responsiveStyles = useResponsiveStyles({
    backgroundColor: {
      base: "var(--amplify-colors-background-primary)",
      large: "var(--amplify-colors-background-secondary)",
    },
    padding: {
      base: "var(--amplify-space-medium)",
      large: "var(--amplify-space-large)",
    },
  });

  return <div style={responsiveStyles}>Content</div>;
}
```

#### Responsive Button Component

```tsx
function ResponsiveButton() {
  const responsiveProps = useResponsiveProps({
    backgroundColor: {
      base: "var(--amplify-colors-brand-primary-90)",
      large: "var(--amplify-colors-brand-primary-80)",
    },
    padding: {
      base: "var(--amplify-space-medium)",
      large: "var(--amplify-space-large)",
    },
  });

  return <button style={responsiveProps}>Button</button>;
}
```

## Future Enhancements

- Dynamic theme generation
- Theme export/import functionality
- Advanced color palette generation
- Component-specific theme inheritance
- Theme animation system
- Enhanced responsive utilities (media queries, container queries)
- CSS-in-JS runtime theming
