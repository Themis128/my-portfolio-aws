import { ReactPlugin } from '@21st-extension/react';
import { TwentyFirstToolbar } from '@21st-extension/toolbar-next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import DevConsoleFilter from '../components/DevConsoleFilter';
import DevListenerPatch from '../components/DevListenerPatch';
import Navigation from '../components/Navigation';
import '../globals.css';
import { ThemeProvider } from '../lib/theme-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Themistoklis Baltzakis - Systems and Network Engineer',
  description: 'Systems and Network Engineer with over 15 years of experience in IT support, cloud solutions, and Cisco infrastructure management.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  if (typeof window === 'undefined') return;
                  const origConsoleError = console.error;
                  const origConsoleWarn = console.warn;
                  const origConsoleLog = console.log;
                  const origConsoleInfo = console.info;

                  const suppressedPatterns = [
                    /Max reconnection attempts reached/,
                    /Attempting to reconnect/i,
                    /Download the React DevTools/i,
                    /\\[HMR\\] connected/i,
                    /Added non-passive event listener to a scroll-blocking 'wheel' event/i,
                    /⬆️⬆️⬆️ Those two errors are expected!/i,
                  ];

                  function shouldSuppress(first) {
                    if (typeof first !== 'string') return false;
                    return suppressedPatterns.some(p => (p instanceof RegExp ? p.test(first) : first.includes(p)));
                  }

                  console.error = function(...args) {
                    try {
                      const first = args[0];
                      if (shouldSuppress(first)) return;
                    } catch (e) {}
                    return origConsoleError.apply(console, args);
                  };

                  console.warn = function(...args) {
                    try {
                      const first = args[0];
                      if (shouldSuppress(first)) return;
                    } catch (e) {}
                    return origConsoleWarn.apply(console, args);
                  };

                  console.log = function(...args) {
                    try {
                      const first = args[0];
                      if (shouldSuppress(first)) return;
                    } catch (e) {}
                    return origConsoleLog.apply(console, args);
                  };

                  console.info = function(...args) {
                    try {
                      const first = args[0];
                      if (shouldSuppress(first)) return;
                    } catch (e) {}
                    return origConsoleInfo.apply(console, args);
                  };
                })();
              `,
            }}
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          {/* Global tech overlay */}
          <div className="site-tech-overlay pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
          <Navigation />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'development' && <DevListenerPatch />}
        {process.env.NODE_ENV === 'development' && <DevConsoleFilter />}
        {/* 
          Dev-only patches for @21st-extension/toolbar console noise and passive listener violations.
          These can be removed if the upstream package addresses these issues.
          See: https://github.com/21st-dev/21st-extension
        */}
        <TwentyFirstToolbar
          config={{
            plugins: [ReactPlugin],
          }}
        />
      </body>
    </html>
  );
}
