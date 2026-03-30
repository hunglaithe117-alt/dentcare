"use client";

import { useTranslations } from "next-intl";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
import { Search } from "lucide-react";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
}

function BeforeAfterSlider({
  beforeImage,
  afterImage,
}: BeforeAfterProps): React.ReactElement {
  const t = useTranslations("clinical");
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);

  const handleMove = useCallback(
    (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const clientX =
        "touches" in e
          ? e.touches[0].clientX
          : (e as globalThis.MouseEvent).clientX;

      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;

      setSliderPosition(percentage);
    },
    [],
  );

  const handleMouseDown = useCallback((): void => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback((): void => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleMove);
    };
  }, [handleMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-xl"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After image (full background) */}
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
        <Image
          src={afterImage}
          alt="After treatment"
          fill
          className="object-contain p-2"
        />
        {/* Fallback text if image fails/loads */}
        {/* <div className="text-center relative z-10">
          <span className="text-white font-semibold text-sm drop-shadow-md">{t("after")}</span>
        </div> */}
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-neutral-200"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt="Before treatment"
          fill
          className="object-contain p-2"
        />
        {/* <div className="text-center relative z-10">
          <span className="text-white font-semibold text-sm drop-shadow-md">{t("before")}</span>
        </div> */}
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <svg
            className="w-5 h-5 text-primary-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
        {t("before")}
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
        {t("after")}
      </div>
    </div>
  );
}

export default function ClinicalCases(): React.ReactElement {
  const t = useTranslations("clinical");
  const [selectedMacroImage, setSelectedMacroImage] = useState<
    number | null
  >(null);

  const macroImages = Array.from({ length: 6 }, (_, i) => i + 1);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setSelectedMacroImage(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <section
      id="clinical"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase">
            {t("sectionTitle")}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mt-3 mb-6">
            {t("sectionSubtitle")}
          </h2>
          <p className="text-neutral-600 leading-relaxed text-lg">
            {t("description")}
          </p>
        </div>

        {/* Before/After Sliders */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div>
            <BeforeAfterSlider
              beforeImage="/images/clinical/before-after/avant-apres-1.jpg"
              afterImage="/images/clinical/before-after/avant-apres-1.jpg"
            />
            <p className="text-center text-sm text-neutral-400 mt-3">
              {t("caseTitle")}
            </p>
          </div>
          <div>
            <BeforeAfterSlider
              beforeImage="/images/clinical/before-after/avant-apres-2.jpg"
              afterImage="/images/clinical/before-after/avant-apres-2.jpg"
            />
            <p className="text-center text-sm text-neutral-400 mt-3">
              {t("caseTitle")}
            </p>
          </div>
        </div>

        {/* Macro Photos */}
        <div id="macro" className="text-center mb-10 scroll-mt-28">
          <h3 className="font-heading text-2xl font-bold text-primary-900">
            {t("macroTitle")}
          </h3>
          <p className="text-neutral-500 mt-2">{t("macroSubtitle")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {macroImages.map((num) => (
            <div
              key={num}
              className="group relative aspect-square rounded-xl bg-neutral-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 shadow-inner"
              onClick={() => setSelectedMacroImage(num)}
            >
              <Image
                src={`/images/clinical/macro/macro-${num}.jpg`}
                alt={`Dental Macro ${num}`}
                fill
                className="object-contain p-2"
              />
              <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors flex items-center justify-center">
                <Search className="w-8 h-8 stroke-[1.5] text-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 drop-shadow-md" />
              </div>
            </div>
          ))}
        </div>

        {selectedMacroImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setSelectedMacroImage(null)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedMacroImage(null);
              }
            }}
          >
            <div className="relative mx-auto h-full w-full max-w-6xl">
              <Image
                src={`/images/clinical/macro/macro-${selectedMacroImage}.jpg`}
                alt={`Dental Macro ${selectedMacroImage}`}
                fill
                className="object-contain"
              />
            </div>
            <button
              type="button"
              aria-label="Close image preview"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 h-11 w-11 rounded-full bg-white/10 text-white text-2xl leading-none hover:bg-white/20 transition-colors"
              onClick={(e) => {
                 e.stopPropagation();
                setSelectedMacroImage(null);
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
