"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

const NAV_ITEMS = ["about", "products", "clinical", "organization"] as const;

export default function Header(): React.ReactElement {
  const t = useTranslations("header");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((id: string): void => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToTop = useCallback((): void => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
          ? "glass shadow-lg py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center gap-2 group cursor-pointer"
            onClick={scrollToTop}
          >
            <img
              src={isScrolled ? "/logo-dark.svg" : "/logo-light.svg"}
              alt="DentCare Logo"
              width={240}
              height={60}
              className="drop-shadow-sm transition-transform group-hover:scale-105 object-contain"
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all hover:bg-white/20 ${isScrolled
                  ? "text-neutral-700 hover:text-primary-900 hover:bg-primary-50"
                  : "text-white/90 hover:text-white"
                }`}
            >
              {t(item)}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher isScrolled={isScrolled} />

          {/* Social icons */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${isScrolled ? "text-neutral-500 hover:text-primary-900 hover:bg-primary-50" : "text-white/70 hover:text-white hover:bg-white/10"}`}
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${isScrolled ? "text-neutral-500 hover:text-primary-900 hover:bg-primary-50" : "text-white/70 hover:text-white hover:bg-white/10"}`}
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>

          {/* Contact CTA */}
          <button
            onClick={() => handleNavClick("contact")}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-accent-500/25"
          >
            {t("contact")}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-5 h-0.5 transition-all ${isScrolled ? "bg-neutral-800" : "bg-white"} ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 transition-all ${isScrolled ? "bg-neutral-800" : "bg-white"} ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 transition-all ${isScrolled ? "bg-neutral-800" : "bg-white"} ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass border-t border-neutral-100 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="px-4 py-3 text-left text-neutral-700 hover:text-primary-900 hover:bg-primary-50 rounded-xl font-medium transition-colors"
              >
                {t(item)}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("contact")}
              className="mt-2 px-4 py-3 bg-accent-500 text-white rounded-xl font-semibold text-center"
            >
              {t("contact")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
