/**
 * Central store exports for Next.js application
 * Following Next.js best practices with Jotai atomic state management
 */

// Export all atoms and stores
export * from "./ui-store";
export * from "./theme-store";
export * from "./projects-store";

// Re-export commonly used Jotai utilities
export { atom } from "jotai";
export { useAtom } from "jotai";
export { useSetAtom } from "jotai";
