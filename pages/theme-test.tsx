/**
 * Theme Test Page
 * Test page for verifying enhanced Amplify UI theming implementation
 */

import { ThemeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsiveDemo } from "@/components/ui/responsive-demo";
import { ThemeDemo } from "@/components/ui/theme-demo";

export default function ThemeTestPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Theme Testing</h1>
          <p className="text-muted-foreground">
            Test and verify the enhanced Amplify UI theming implementation
          </p>
        </div>
        <ThemeToggle />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Theme System Overview</CardTitle>
          <CardDescription>
            This page demonstrates the enhanced theming capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">✅ Amplify UI Integration</h3>
              <p className="text-sm text-muted-foreground">
                Core theming with design tokens and references
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">✅ Next-themes Integration</h3>
              <p className="text-sm text-muted-foreground">
                System theme detection and persistence
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">✅ Custom Hooks</h3>
              <p className="text-sm text-muted-foreground">
                Enhanced theming utilities and helpers
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">✅ Design Token References</h3>
              <p className="text-sm text-muted-foreground">
                Hierarchical token system with references
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">✅ Responsive Theming</h3>
              <p className="text-sm text-muted-foreground">
                Breakpoint-specific token overrides and Amplify-compatible
                patterns
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">✅ Accessibility Support</h3>
              <p className="text-sm text-muted-foreground">
                High contrast theme and WCAG compliance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ThemeDemo />
      <ResponsiveDemo />
    </div>
  );
}
