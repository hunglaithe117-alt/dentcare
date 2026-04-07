"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";

const LOCALES = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
] as const;

export default function LanguageSwitcher({ isScrolled = false }: { isScrolled?: boolean }): React.ReactElement {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const handleSwitch = useCallback(
    (newLocale: string): void => {
      const segments = pathname.split("/");
      segments[1] = newLocale;
      router.push(segments.join("/"));
      setIsOpen(false);
    },
    [pathname, router]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-[background-color,border-color,color] text-sm font-medium border backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500 ${
          isScrolled
            ? "bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-primary-900 focus-visible:ring-offset-white"
            : "bg-white/10 hover:bg-white/20 border-white/20 text-white focus-visible:ring-offset-primary-900/50"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`${t("chooseLanguage")} (${currentLocale.label})`}
      >
        <span>{currentLocale?.label}</span>
        <svg
          className={`w-3 h-3 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden z-50 animate-fade-in"
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => handleSwitch(l.code)}
              className={`block w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500 ${
                l.code === locale ? "text-primary-900 font-semibold bg-neutral-50/50" : "text-neutral-600"
              }`}
              role="menuitem"
            >
              {l.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
