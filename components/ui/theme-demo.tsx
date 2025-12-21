/**
 * Theme Demo Component
 * Demonstrates the enhanced Amplify UI theming capabilities
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  useAmplifyTheme,
  useResponsiveTheme,
  useThemeStyling,
} from "@/hooks/use-amplify-theme";

export function ThemeDemo() {
  const { themeName, isDarkMode, generateCSS } = useAmplifyTheme();
  const { getColor, getSpace, getFontSize, getRadius, getShadow, getStyles } =
    useThemeStyling();
  const { currentBreakpoint, isMobile, isTablet, isDesktop } =
    useResponsiveTheme();

  // Example of using theme tokens for styling
  const cardStyles = getStyles({
    backgroundColor: "token:colors.background.primary",
    borderColor: "token:colors.border.primary",
    borderRadius: "token:radii.medium",
    padding: "token:space.large",
    boxShadow: "token:shadows.medium",
  });

  const headingStyles = getStyles({
    color: "token:colors.font.primary",
    fontSize: "token:fontSizes.xl",
    fontWeight: "600",
    marginBottom: "token:space.medium",
  });

  const textStyles = getStyles({
    color: "token:colors.font.secondary",
    fontSize: "token:fontSizes.medium",
    lineHeight: "token:lineHeights.normal",
  });

  const buttonStyles = getStyles({
    backgroundColor: "token:colors.brand.primary.90",
    color: "token:colors.brand.primary.10",
    border: "none",
    borderRadius: "token:radii.medium",
    padding: "token:space.medium token:space.xl",
    fontSize: "token:fontSizes.medium",
    fontWeight: "token:fontWeights.medium",
    cursor: "pointer",
    transition: "token:transitions.normal",
  });

  const buttonHoverStyles = getStyles({
    backgroundColor: "token:colors.brand.primary.80",
    transform: "translateY(-1px)",
    boxShadow: "token:shadows.large",
  });

  return (
    <div className="p-8 space-y-8">
      {/* Theme Information */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Information</CardTitle>
          <CardDescription>
            Current theme state and configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Badge variant="outline">Theme</Badge>
              <p className="mt-1 font-mono text-sm">{themeName}</p>
            </div>
            <div>
              <Badge variant="outline">Mode</Badge>
              <p className="mt-1 font-mono text-sm">
                {isDarkMode ? "Dark" : "Light"}
              </p>
            </div>
            <div>
              <Badge variant="outline">Breakpoint</Badge>
              <p className="mt-1 font-mono text-sm">{currentBreakpoint}</p>
            </div>
            <div>
              <Badge variant="outline">Device</Badge>
              <p className="mt-1 font-mono text-sm">
                {isMobile
                  ? "Mobile"
                  : isTablet
                    ? "Tablet"
                    : isDesktop
                      ? "Desktop"
                      : "Unknown"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Token Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Design Tokens</CardTitle>
          <CardDescription>
            Examples of using Amplify UI design tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Tokens */}
          <div>
            <h3 style={headingStyles}>Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-lg mx-auto mb-2 border"
                  style={{
                    backgroundColor:
                      getColor("colors.brand.primary.90") || "#1890ff",
                    borderColor: getColor("colors.border.primary") || "#ced4da",
                  }}
                />
                <p className="text-xs font-mono">brand.primary.90</p>
              </div>
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-lg mx-auto mb-2 border"
                  style={{
                    backgroundColor:
                      getColor("colors.brand.secondary.80") || "#52c41a",
                    borderColor: getColor("colors.border.primary") || "#ced4da",
                  }}
                />
                <p className="text-xs font-mono">brand.secondary.80</p>
              </div>
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-lg mx-auto mb-2 border"
                  style={{
                    backgroundColor:
                      getColor("colors.feedback.success") || "#52c41a",
                    borderColor: getColor("colors.border.primary") || "#ced4da",
                  }}
                />
                <p className="text-xs font-mono">feedback.success</p>
              </div>
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-lg mx-auto mb-2 border"
                  style={{
                    backgroundColor:
                      getColor("colors.feedback.error") || "#ff4d4f",
                    borderColor: getColor("colors.border.primary") || "#ced4da",
                  }}
                />
                <p className="text-xs font-mono">feedback.error</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Typography Tokens */}
          <div>
            <h3 style={headingStyles}>Typography</h3>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-muted-foreground">Small:</span>
                <p
                  style={{
                    fontSize: getFontSize("small"),
                    color: getColor("colors.font.primary") || "#212529",
                  }}
                >
                  Small text using theme font size tokens
                </p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Medium:</span>
                <p
                  style={{
                    fontSize: getFontSize("medium"),
                    color: getColor("colors.font.primary") || "#212529",
                  }}
                >
                  Medium text using theme font size tokens
                </p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Large:</span>
                <p
                  style={{
                    fontSize: getFontSize("large"),
                    color: getColor("colors.font.primary") || "#212529",
                  }}
                >
                  Large text using theme font size tokens
                </p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">XL:</span>
                <p
                  style={{
                    fontSize: getFontSize("xl"),
                    color: getColor("colors.font.primary") || "#212529",
                  }}
                >
                  Extra large text using theme font size tokens
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Spacing Tokens */}
          <div>
            <h3 style={headingStyles}>Spacing</h3>
            <div className="space-y-2">
              {(["xs", "small", "medium", "large", "xl", "xxl"] as const).map(
                (size) => (
                  <div key={size} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-12">
                      {size}:
                    </span>
                    <div
                      className="bg-primary rounded"
                      style={{
                        width: getSpace(size),
                        height: getSpace(size),
                        backgroundColor:
                          getColor("colors.brand.primary.90") || "#1890ff",
                      }}
                    />
                    <span className="text-xs font-mono text-muted-foreground">
                      {getSpace(size)}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          <Separator />

          {/* Border Radius Tokens */}
          <div>
            <h3 style={headingStyles}>Border Radius</h3>
            <div className="space-y-2">
              {(["xs", "small", "medium", "large", "xl", "xxl"] as const).map(
                (size) => (
                  <div key={size} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-12">
                      {size}:
                    </span>
                    <div
                      className="bg-primary"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: getRadius(size),
                        backgroundColor:
                          getColor("colors.brand.primary.90") || "#1890ff",
                      }}
                    />
                    <span className="text-xs font-mono text-muted-foreground">
                      {getRadius(size)}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          <Separator />

          {/* Shadow Tokens */}
          <div>
            <h3 style={headingStyles}>Shadows</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(["small", "medium", "large", "focus"] as const).map((size) => (
                <div key={size} className="text-center">
                  <div
                    className="w-16 h-16 rounded-lg mx-auto mb-2 bg-background border"
                    style={{
                      boxShadow: getShadow(size),
                      borderColor:
                        getColor("colors.border.primary") || "#ced4da",
                    }}
                  />
                  <p className="text-xs font-mono">{size}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Components</CardTitle>
          <CardDescription>Components styled with theme tokens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button
              style={buttonStyles}
              onMouseEnter={(e) => {
                Object.entries(buttonHoverStyles).forEach(([prop, value]) => {
                  e.currentTarget.style[prop as any] = value;
                });
              }}
              onMouseLeave={(e) => {
                Object.entries(buttonStyles).forEach(([prop, value]) => {
                  e.currentTarget.style[prop as any] = value;
                });
              }}
            >
              Themed Button
            </Button>

            <Button variant="outline">Outline Button</Button>

            <Button variant="secondary">Secondary Button</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card style={cardStyles}>
              <CardHeader>
                <CardTitle
                  style={{
                    color: getColor("colors.font.primary") || "#212529",
                  }}
                >
                  Themed Card
                </CardTitle>
                <CardDescription
                  style={{
                    color: getColor("colors.font.tertiary") || "#6c757d",
                  }}
                >
                  This card is styled using theme tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p style={textStyles}>
                  All colors, spacing, and typography in this card are derived
                  from the theme tokens.
                </p>
              </CardContent>
            </Card>

            <Card
              style={{
                ...cardStyles,
                backgroundColor:
                  getColor("colors.background.secondary") || "#f8f9fa",
              }}
            >
              <CardHeader>
                <CardTitle
                  style={{
                    color: getColor("colors.font.primary") || "#212529",
                  }}
                >
                  Alternative Card
                </CardTitle>
                <CardDescription
                  style={{
                    color: getColor("colors.font.tertiary") || "#6c757d",
                  }}
                >
                  Using different background token
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p style={textStyles}>
                  This card uses a different background token to show variation.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Generated CSS */}
      <Card>
        <CardHeader>
          <CardTitle>Generated CSS</CardTitle>
          <CardDescription>
            CSS variables generated from the current theme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{generateCSS()}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

export default ThemeDemo;
