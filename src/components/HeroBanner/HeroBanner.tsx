"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/images/wetransfer/Pict 1 presentation/IMG_9271.jpg",
  "/images/wetransfer/Pict 1 presentation/IMG_9279.jpg",
  "/images/wetransfer/Pict 1 presentation/IMG_9280.jpg",
  "/images/wetransfer/Pict 1 presentation/PHOTO-2026-03-15-08-02-51.jpg",
  "/images/wetransfer/Pict 1 presentation/PHOTO-2026-03-15-08-03-08.jpg",
] as const;

export default function HeroBanner(): React.ReactElement {
  const t = useTranslations("hero");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6200);
    return () => window.clearInterval(id);
  }, []);

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
        {HERO_IMAGES.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="DentCare Hero"
            fill
            className={`object-cover transition-[opacity,transform,filter] duration-[2600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${index === activeImageIndex ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.04] blur-[1px]"}`}
            priority={index === 0}
          />
        ))}
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

      {/* Slide controls */}
      <div className="absolute bottom-6 right-4 z-20 hidden sm:flex items-center gap-2.5 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 backdrop-blur-sm">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-white/70">
          {String(activeImageIndex + 1).padStart(2, "0")} / {String(HERO_IMAGES.length).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-1.5">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={`hero-dot-${index}`}
              type="button"
              onClick={() => setActiveImageIndex(index)}
              className={`h-1 rounded-full transition-all duration-700 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                index === activeImageIndex ? "w-7 bg-white/95" : "w-3.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
}
