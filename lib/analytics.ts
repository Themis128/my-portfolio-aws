// Analytics utility for tracking custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
};

// Track page views (automatically handled by Vercel Analytics, but good to have)
export const trackPageView = (pagePath: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
  });
};

// Track user interactions
export const trackInteraction = (action: string, category: string, label?: string) => {
  trackEvent(action, {
    event_category: category,
    event_label: label,
  });
};

// Track contact form submissions
export const trackContactSubmission = () => {
  trackEvent('contact_form_submit', {
    event_category: 'engagement',
    event_label: 'contact_form',
  });
};

// Track project views
export const trackProjectView = (projectName: string) => {
  trackEvent('project_view', {
    event_category: 'engagement',
    event_label: projectName,
  });
};

// Track social media clicks
export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    event_category: 'engagement',
    event_label: platform,
  });
};

// Track download events
export const trackDownload = (fileName: string) => {
  trackEvent('file_download', {
    event_category: 'engagement',
    event_label: fileName,
  });
};