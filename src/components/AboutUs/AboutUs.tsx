"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useInView(
  threshold = 0.2,
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}

export default function AboutUs(): React.ReactElement {
  const t = useTranslations("about");
  const locale = useLocale();
  const [sectionRef, isVisible] = useInView(0.15);
  const videoTitle =
    locale === "fr" ? "Video de presentation" : "Introduction Video";
  const videoDescription =
    locale === "fr"
      ? "Decouvrez DentCare Consultation en video."
      : "Discover DentCare Consultation in video.";

  const methods = [
    {
      key: "scanner" as const,
      image: "/images/wetransfer/Pict 3 scanner intra oral/Capture d’écran 2026-03-15 à 09.10.39.png",
    },
    {
      key: "printing" as const,
      image: "/images/workflow/impression-3d.jpg",
    },
    {
      key: "milling" as const,
      image: "/images/workflow/usinage-zircone.jpg",
    },
    {
      key: "implant" as const,
      image: "/images/workflow/implantologie.jpg",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase">
            {t("sectionTitle")}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mt-3">
            {t("sectionSubtitle")}
          </h2>
        </div>

        {/* History */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="lg:col-span-7 pr-0 lg:pr-8">
            <h3 className="font-heading text-2xl font-bold text-primary-900 mb-6 italic">
              {t("history.title")}
            </h3>
            <p className="text-neutral-700 leading-relaxed text-[17px] mb-8 whitespace-pre-line">
              {t("history.description")}
            </p>
            <div className="flex flex-wrap gap-4">
            </div>
          </div>
          <div className="lg:col-span-5 relative h-full flex items-center justify-center">
            <div className="w-full aspect-[3/4] max-w-sm mx-auto lg:max-w-none rounded-2xl bg-neutral-100 flex items-center justify-center overflow-hidden relative shadow-lg">
              <Image
                src="/images/about/founder-portrait.jpg"
                alt={t("founderName")}
                fill
                priority
                className="object-contain p-2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 text-center p-8">
                <p className="text-white font-medium tracking-wide text-lg drop-shadow-md">
                  {t("founderName")}
                </p>
                <p className="text-white/80 text-sm mt-1 drop-shadow-md">
                  {t("founderRole")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto w-full py-12">
          <div className="flex justify-center">
            <Image
              src="/images/about/founder-signature.svg"
              alt={t("signatureAlt")}
              width={420}
              height={95}
              unoptimized
              className="h-36 sm:h-44 w-auto opacity-90"
            />
          </div>
        </div>

        {/* Method */}
        <div
          className={`mb-24 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="mb-16">
            <div className="max-w-5xl mx-auto">
              <h3 className="font-heading text-2xl lg:text-3xl font-bold text-primary-900 mb-2 text-center">
                {videoTitle}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-base sm:text-lg mb-6 text-center">
                {videoDescription}
              </p>
              <div className="h-px w-full bg-neutral-200 mb-6" />
              <div className="border border-neutral-300 bg-black shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
                <div className="relative w-full aspect-video overflow-hidden bg-black">
                  <iframe
                    className="absolute -inset-[1px] h-[calc(100%+2px)] w-[calc(100%+2px)] rounded-none"
                    src="https://www.youtube.com/embed/Gp1mmmbTzJk?autoplay=1&mute=1&playsinline=1&loop=1&playlist=Gp1mmmbTzJk&rel=0"
                    title="DentCare Consultation Introduction"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          <h3 className="font-heading text-2xl lg:text-3xl font-bold text-primary-900 mb-4 text-center">
            {t("method.title")}
          </h3>
          <p className="text-neutral-600 leading-relaxed text-lg mb-12 text-center max-w-3xl mx-auto">
            {t("method.description")}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methods.map(({ key, image }, index) => (
              <div
                key={key}
                className="group p-6 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-accent-200 hover:shadow-lg hover:shadow-accent-100/50 transition-all hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6 aspect-[4/3] w-full rounded-xl overflow-hidden bg-white relative">
                  <Image
                    src={image}
                    alt={t(`method.${key}`)}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <h4 className="font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">
                  {t(`method.${key}`)}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
