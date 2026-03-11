"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

export default function CookieBanner(): React.ReactElement | null {
  const t = useTranslations("cookie");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = useCallback((): void => {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(new Event("cookie-consent-updated"));
    setIsVisible(false);
  }, []);

  const handleDecline = useCallback((): void => {
    localStorage.setItem("cookie-consent", "declined");
    window.dispatchEvent(new Event("cookie-consent-updated"));
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-100 p-5 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-neutral-600 flex-1">{t("message")}</p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-neutral-500 hover:text-neutral-700 transition-colors rounded-lg hover:bg-neutral-100"
          >
            {t("decline")}
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 text-sm font-semibold text-white bg-primary-900 hover:bg-primary-800 transition-colors rounded-lg"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
