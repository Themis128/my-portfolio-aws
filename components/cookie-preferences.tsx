"use client";

import { useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  getCookieConsentValue,
  isGlobalPrivacyControlEnabled,
  setCookieConsentValue,
} from "@/lib/cookie-consent";

export function CookiePreferences() {
  const descriptionId = useId();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const existing = getCookieConsentValue();
    setAnalyticsEnabled(existing === "accepted");
  }, []);

  const gpcEnabled = isGlobalPrivacyControlEnabled();

  const save = () => {
    setIsSaving(true);
    setCookieConsentValue(
      analyticsEnabled && !gpcEnabled ? "accepted" : "rejected",
    );
    setIsSaving(false);
  };

  return (
    <section className="space-y-4 rounded-lg border p-4">
      <div className="space-y-1">
        <h2 className="font-medium text-base">Cookie preferences</h2>
        <p className="text-muted-foreground text-sm" id={descriptionId}>
          Essential cookies are always on. You can enable or disable analytics
          cookies.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-medium text-sm">Analytics cookies</p>
          <p className="text-muted-foreground text-sm">
            Help us understand site usage.
          </p>
        </div>

        <Switch
          aria-describedby={descriptionId}
          checked={analyticsEnabled}
          disabled={gpcEnabled}
          onCheckedChange={setAnalyticsEnabled}
        />
      </div>

      {gpcEnabled ? (
        <p className="text-muted-foreground text-sm">
          Global Privacy Control is enabled in your browser, so analytics stays
          disabled.
        </p>
      ) : null}

      <div>
        <Button disabled={isSaving} onClick={save} type="button">
          Save preferences
        </Button>
      </div>
    </section>
  );
}
