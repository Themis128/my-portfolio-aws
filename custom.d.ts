declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// Google Analytics gtag function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}
