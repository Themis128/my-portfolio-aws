"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  type CookieConsentValue,
  getCookieConsentValue,
  isGlobalPrivacyControlEnabled,
  setCookieConsentValue,
} from "@/lib/cookie-consent";

export function CookieConsentBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const existing = getCookieConsentValue();
    if (existing) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
  }, []);

  const setConsent = (value: CookieConsentValue) => {
    setCookieConsentValue(value);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t bg-background">
      <div className="container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-sm">Cookies</p>
          <p className="text-muted-foreground text-sm">
            We use cookies to improve your experience. See our{" "}
            <Link className="underline underline-offset-4" href="/cookies">
              Cookies
            </Link>{" "}
            and{" "}
            <Link className="underline underline-offset-4" href="/privacy">
              Privacy
            </Link>{" "}
            pages.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button asChild type="button" variant="ghost">
            <Link href="/cookies">Manage cookies</Link>
          </Button>
          <Button
            onClick={() => setConsent("rejected")}
            type="button"
            variant="outline"
          >
            Decline
          </Button>
          <Button
            onClick={() =>
              setConsent(
                isGlobalPrivacyControlEnabled() ? "rejected" : "accepted",
              )
            }
            type="button"
          >
            Accept
          </Button>
        </div>
      </div>
    </aside>
  );
}
