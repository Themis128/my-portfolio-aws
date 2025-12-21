/**
 * Responsive Demo Component
 * Demonstrates Amplify UI compatible responsive styling patterns
 */

"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useBreakpointValue,
  useResponsiveProps,
  useResponsiveStyles,
  useResponsiveTheme,
} from "@/hooks/use-amplify-theme";

export function ResponsiveDemo() {
  const { currentBreakpoint, isMobile, isTablet, isDesktop } =
    useResponsiveTheme();

  // Example 1: Object syntax for responsive styles
  const responsiveStyles = useResponsiveStyles({
    backgroundColor: {
      base: "var(--amplify-colors-brand-primary-90)",
      small: "var(--amplify-colors-brand-primary-80)",
      medium: "var(--amplify-colors-brand-primary-70)",
      large: "var(--amplify-colors-brand-primary-60)",
    },
    padding: {
      base: "var(--amplify-space-medium)",
      small: "var(--amplify-space-large)",
      large: "var(--amplify-space-xl)",
    },
    fontSize: {
      base: "var(--amplify-font-sizes-medium)",
      small: "var(--amplify-font-sizes-large)",
      large: "var(--amplify-font-sizes-xl)",
    },
  });

  // Example 2: Array syntax for responsive values
  const fontSizeArray = ["1rem", "1.25rem", "1.5rem", "2rem", "2.5rem"];
  const currentFontSize = useBreakpointValue(fontSizeArray);

  // Example 3: Responsive props for components
  const responsiveProps = useResponsiveProps({
    width: "100%",
    backgroundColor: {
      base: "var(--amplify-colors-background-primary)",
      large: "var(--amplify-colors-background-secondary)",
    },
    padding: {
      base: "var(--amplify-space-medium)",
      large: "var(--amplify-space-large)",
    },
    borderRadius: {
      base: "var(--amplify-radii-medium)",
      large: "var(--amplify-radii-large)",
    },
  });

  return (
    <div className="p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Responsive Styling Demo</CardTitle>
          <CardDescription>
            Demonstrating Amplify UI compatible responsive patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Breakpoint Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Current Breakpoint</h3>
            <div className="flex gap-2 items-center">
              <Badge variant="outline">{currentBreakpoint}</Badge>
              <span className="text-sm text-muted-foreground">
                {isMobile && "Mobile"}
                {isTablet && "Tablet"}
                {isDesktop && "Desktop"}
              </span>
            </div>
          </div>

          {/* Example 1: Object Syntax */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Object Syntax</h3>
            <div className="p-4 border rounded-lg" style={responsiveStyles}>
              <p className="mb-2">
                This box uses <strong>object syntax</strong> for responsive
                styling. The background, padding, and font size change based on
                breakpoint.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Base:</strong> var(--amplify-colors-brand-primary-90)
                </div>
                <div>
                  <strong>Small:</strong> var(--amplify-colors-brand-primary-80)
                </div>
                <div>
                  <strong>Large:</strong> var(--amplify-colors-brand-primary-60)
                </div>
              </div>
            </div>
          </div>

          {/* Example 2: Array Syntax */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Array Syntax</h3>
            <div className="p-4 border rounded-lg">
              <p className="mb-2">
                This text uses <strong>array syntax</strong> for responsive font
                sizing. Current size: <strong>{currentFontSize}</strong>
              </p>
              <div className="text-sm text-muted-foreground">
                Array: ['1rem', '1.25rem', '1.5rem', '2rem', '2.5rem']
              </div>
            </div>
          </div>

          {/* Example 3: Responsive Props */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Responsive Props</h3>
            <div className="p-4 border rounded-lg" style={responsiveProps}>
              <p className="mb-2">
                This component uses <strong>responsive props</strong> that get
                converted to static values based on the current breakpoint.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Background:</strong>
                  {isDesktop ? "Secondary" : "Primary"}
                </div>
                <div>
                  <strong>Padding:</strong>
                  {isDesktop ? "Large" : "Medium"}
                </div>
                <div>
                  <strong>Border Radius:</strong>
                  {isDesktop ? "Large" : "Medium"}
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Code Examples</h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Object Syntax</h4>
                <pre className="text-xs overflow-x-auto bg-background p-3 rounded">
                  {`const responsiveStyles = useResponsiveStyles({
  backgroundColor: {
    base: 'var(--amplify-colors-brand-primary-90)',
    small: 'var(--amplify-colors-brand-primary-80)',
    medium: 'var(--amplify-colors-brand-primary-70)',
    large: 'var(--amplify-colors-brand-primary-60)',
  },
  padding: {
    base: 'var(--amplify-space-medium)',
    small: 'var(--amplify-space-large)',
    large: 'var(--amplify-space-xl)',
  },
});

return (
  <div style={responsiveStyles}>
    Responsive content
  </div>
);`}
                </pre>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Array Syntax</h4>
                <pre className="text-xs overflow-x-auto bg-background p-3 rounded">
                  {`const fontSizeArray = ['1rem', '1.25rem', '1.5rem', '2rem', '2.5rem'];
const currentFontSize = useBreakpointValue(fontSizeArray);

return (
  <div style={{ fontSize: currentFontSize }}>
    Responsive text
  </div>
);`}
                </pre>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Responsive Props</h4>
                <pre className="text-xs overflow-x-auto bg-background p-3 rounded">
                  {`const responsiveProps = useResponsiveProps({
  width: '100%',
  backgroundColor: {
    base: 'var(--amplify-colors-background-primary)',
    large: 'var(--amplify-colors-background-secondary)',
  },
  padding: {
    base: 'var(--amplify-space-medium)',
    large: 'var(--amplify-space-large)',
  },
  borderRadius: {
    base: 'var(--amplify-radii-medium)',
    large: 'var(--amplify-radii-large)',
  },
});

return (
  <div style={responsiveProps}>
    Responsive content
  </div>
);`}
                </pre>
              </div>
            </div>
          </div>

          {/* Resize Instructions */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h4 className="font-semibold mb-2">Test Responsiveness</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Resize your browser window to see the responsive styles change in
              real-time. The breakpoint indicator above will update
              automatically.
            </p>
            <div className="text-xs space-y-1">
              <div>• Base: 0px - 479px</div>
              <div>• Small: 480px - 767px</div>
              <div>• Medium: 768px - 991px</div>
              <div>• Large: 992px - 1279px</div>
              <div>• XL: 1280px - 1535px</div>
              <div>• XXL: 1536px+</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResponsiveDemo;
