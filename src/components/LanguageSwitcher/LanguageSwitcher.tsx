"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";

const LOCALES = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "vi", label: "VI" },
] as const;

export default function LanguageSwitcher({ isScrolled = false }: { isScrolled?: boolean }): React.ReactElement {
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-sm font-medium border backdrop-blur-md ${
          isScrolled
            ? "bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-primary-900"
            : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{currentLocale?.label}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-neutral-100 overflow-hidden z-50 animate-fade-in">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSwitch(l.code)}
              className={`block w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-neutral-50 ${
                l.code === locale ? "text-primary-900 font-semibold bg-neutral-50/50" : "text-neutral-600"
              }`}
              role="menuitem"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
