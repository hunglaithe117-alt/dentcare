"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HeroBanner(): React.ReactElement {
  const t = useTranslations("hero");

  const handleScroll = (id: string): void => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-dental-closeup.jpg"
          alt="DentCare Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/60 via-primary-950/70 to-primary-950/75" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-500/3 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-snug mb-8 animate-fade-in-up">
          {t("title")}
        </h1>

        <p
          className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {t("subtitle")}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <button
            onClick={() => handleScroll("products")}
            className="px-8 py-3.5 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg transition-colors text-base shadow-lg shadow-accent-600/30"
          >
            {t("cta")}
          </button>
          <button
            onClick={() => handleScroll("macro")}
            className="px-8 py-3.5 bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 transition-colors text-base"
          >
            {t("ctaQuote")}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
}
