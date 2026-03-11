"use client";

import { useEffect, useState, useCallback } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Analytics(): React.ReactElement | null {
  const [hasConsent, setHasConsent] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cookie-consent") === "accepted";
    }
    return false;
  });

  const checkConsent = useCallback(() => {
    const consent = localStorage.getItem("cookie-consent");
    setHasConsent(consent === "accepted");
  }, []);

  useEffect(() => {
    // Listen for consent updates from CookieBanner
    window.addEventListener("cookie-consent-updated", checkConsent);

    return () => {
      window.removeEventListener("cookie-consent-updated", checkConsent);
    };
  }, [checkConsent]);

  if (!hasConsent) {
    return null;
  }

  return <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-PLACEHOLDER"} />;
}
