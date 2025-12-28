"use client";

import { ReactPlugin } from "@21st-extension/react";
import { TwentyFirstToolbar } from "@21st-extension/toolbar-next";
import { useEffect, useState } from "react";

const STORAGE_KEY = "21st-toolbar-enabled";

export default function ToolbarMountController() {
  const [mounted, setMounted] = useState<boolean | null>(null);

  // Default behavior: enabled in development or when NEXT_PUBLIC_ENABLE_21ST_TOOLBAR=true
  const showByDefault =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_ENABLE_21ST_TOOLBAR === "true";

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) setMounted(showByDefault);
      else setMounted(stored === "true");
    } catch {
      setMounted(showByDefault);
    }
  }, [showByDefault]);

  const toggle = () => {
    const next = !mounted;
    setMounted(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // ignore
    }
  };

  // Avoid SSR/hydration mismatch by rendering nothing until mounted is known
  if (mounted === null) return null;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[9999]">
        <button
          onClick={toggle}
          className="px-3 py-2 bg-slate-800 text-white rounded shadow"
          aria-pressed={mounted}
        >
          {mounted ? "Hide 21st Toolbar" : "Show 21st Toolbar"}
        </button>
      </div>

      {mounted && (
        <div className="relative" aria-hidden="true">
          <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />
        </div>
      )}
    </>
  );
}

/*
  Notes:
  - Runtime preference is stored under `localStorage` key `21st-toolbar-enabled`.
  - The toolbar is shown by default in development or when NEXT_PUBLIC_ENABLE_21ST_TOOLBAR=true.
*/
