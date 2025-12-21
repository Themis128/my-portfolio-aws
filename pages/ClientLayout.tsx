"use client";

import ThemeProvider from "@/components/theme-provider";
import "@/lib/amplify-client"; // This will configure Amplify
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import React from "react";

// Protected routes that require authentication
const PROTECTED_ROUTES = ["/demo"];

function ProtectedRoute({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  // Only show Authenticator for protected routes
  if (PROTECTED_ROUTES.some((route) => path.startsWith(route))) {
    return (
      <Authenticator
        variation="modal"
        components={{
          Header: () => (
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">Welcome to Portfolio</h2>
              <p className="text-gray-600 mb-3">
                Sign in to access your account
              </p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                <span>Secured with</span>
                <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <title>AWS Cognito</title>
                    <path d="M18.5 8.5C18.5 6.57 16.93 5 15.5S11.5 6.57 11.5 8.5 13.07 12 15 12 18.5 10.43 18.5 8.5zM15 10C14.17 10 13.5 9.33 13.5 8.5S14.17 7 15.7 16.5 7.67 16.5 8.5 15.83 10 15 10z" />
                    <path d="M21 3H3C1.9 3.9 1.5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 19V5C23 19H3V5H21V19z" />
                    <path d="M7 9H5V11H7V9zM7 13H5V15H7V13zM7 17H5V15H7V13z" />
                  </svg>
                  <span className="font-medium">AWS Cognito</span>
                </div>
              </div>
            </div>
          ),
        }}
      >
        {children}
      </Authenticator>
    );
  }

  // Public routes don't need authentication
  return <>{children}</>;
}

function ProtectedContent({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  return <ProtectedRoute path={path}>{children}</ProtectedRoute>;
}

import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname() || "/";

  return (
    <ThemeProvider>
      <ProtectedRoute path={currentPath}>{children}</ProtectedRoute>
    </ThemeProvider>
  );
}

export { ProtectedContent };
