/**
 * UI Store - Jotai atomic state management for UI state
 * Following Next.js best practices for client-side UI state
 */

import { atom } from "jotai";

// Types
export interface Toast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success" | "warning";
  duration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Toast state atoms
export const toastsAtom = atom<Toast[]>([]);
export const toastLimitAtom = atom<number>(3);
export const toastRemoveDelayAtom = atom<number>(5000);

// Global loading states
export const globalLoadingAtom = atom<boolean>(false);
export const pageLoadingAtom = atom<boolean>(false);

// Modal/Dialog states
export const modalOpenAtom = atom<boolean>(false);
export const modalContentAtom = atom<React.ReactNode>(null);

// Navigation state
export const mobileMenuOpenAtom = atom<boolean>(false);
export const currentPathAtom = atom<string>("/");

// Toast action atoms
export const addToastAtom = atom(null, (get, set, toast: Omit<Toast, "id">) => {
  const id = generateId();
  const newToast: Toast = {
    ...toast,
    id,
    open: true,
    onOpenChange: (open: boolean) => {
      if (!open) {
        set(dismissToastAtom, id);
      }
    },
  };

  set(toastsAtom, (prev) => {
    const updated = [newToast, ...prev];
    return updated.slice(0, get(toastLimitAtom));
  });

  // Auto-dismiss after duration
  const duration = toast.duration ?? get(toastRemoveDelayAtom);
  if (duration > 0) {
    setTimeout(() => {
      set(dismissToastAtom, id);
    }, duration);
  }
});

export const dismissToastAtom = atom(null, (get, set, toastId?: string) => {
  set(toastsAtom, (prev) =>
    prev.map((t) =>
      t.id === toastId || toastId === undefined ? { ...t, open: false } : t,
    ),
  );

  // Schedule removal
  setTimeout(() => {
    set(removeToastAtom, toastId);
  }, 300); // Wait for animation
});

export const removeToastAtom = atom(null, (get, set, toastId?: string) => {
  set(toastsAtom, (prev) =>
    toastId === undefined ? [] : prev.filter((t) => t.id !== toastId),
  );
});

// Loading state actions
export const setGlobalLoadingAtom = atom(null, (get, set, loading: boolean) => {
  set(globalLoadingAtom, loading);
});

export const setPageLoadingAtom = atom(null, (get, set, loading: boolean) => {
  set(pageLoadingAtom, loading);
});

// Modal actions
export const openModalAtom = atom(
  null,
  (get, set, content: React.ReactNode) => {
    set(modalContentAtom as any, content);
    set(modalOpenAtom, true);
  },
);

export const closeModalAtom = atom(null, (get, set) => {
  set(modalOpenAtom, false);
  setTimeout(() => {
    set(modalContentAtom as any, null);
  }, 300);
});

// Navigation actions
export const setCurrentPathAtom = atom(null, (get, set, path: string) => {
  set(currentPathAtom, path);
});

export const toggleMobileMenuAtom = atom(null, (get, set) => {
  set(mobileMenuOpenAtom, (prev) => !prev);
});

export const setMobileMenuOpenAtom = atom(null, (get, set, open: boolean) => {
  set(mobileMenuOpenAtom, open);
});

// Utility functions
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Convenience toast creators
export const createSuccessToastAtom = atom(
  null,
  (
    get,
    set,
    { title, description }: { title?: string; description?: string },
  ) => {
    set(addToastAtom, {
      title,
      description,
      variant: "success",
      duration: 3000,
    });
  },
);

export const createErrorToastAtom = atom(
  null,
  (
    get,
    set,
    { title, description }: { title?: string; description?: string },
  ) => {
    set(addToastAtom, {
      title,
      description,
      variant: "destructive",
      duration: 5000,
    });
  },
);

export const createWarningToastAtom = atom(
  null,
  (
    get,
    set,
    { title, description }: { title?: string; description?: string },
  ) => {
    set(addToastAtom, {
      title,
      description,
      variant: "warning",
      duration: 4000,
    });
  },
);

// Derived atoms
export const hasActiveToastsAtom = atom((get) => get(toastsAtom).length > 0);
export const isLoadingAtom = atom(
  (get) => get(globalLoadingAtom) || get(pageLoadingAtom),
);
