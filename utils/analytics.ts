// Analytics utility for tracking page views and events
// Replace with your actual analytics service (Google Analytics, etc.)

import {
  hasAnalyticsConsent,
  isGlobalPrivacyControlEnabled,
} from "@/lib/cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const trackPageView = (path: string, title?: string) => {
  if (isGlobalPrivacyControlEnabled() || !hasAnalyticsConsent()) {
    return;
  }

  // Google Analytics 4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "GA_MEASUREMENT_ID", {
      page_path: path,
      page_title: title || document.title,
    });
  }

  // Universal Analytics (legacy)
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

export const trackEvent = (
  eventName: string,
  eventParams?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: string | number | boolean | undefined;
  },
): void => {
  if (isGlobalPrivacyControlEnabled() || !hasAnalyticsConsent()) {
    return;
  }

  // Google Analytics 4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

// Initialize analytics (call this in your app initialization)
export const initAnalytics = (measurementId?: string) => {
  if (isGlobalPrivacyControlEnabled() || !hasAnalyticsConsent()) {
    return;
  }

  if (typeof window === "undefined" || !measurementId) {
    return;
  }

  // Add Google Analytics script
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
};
