"use client";

import { useTranslations } from "next-intl";
import {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  TouchEvent,
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
          className="object-cover"
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
          className="object-cover"
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

  const macroImages = Array.from({ length: 6 }, (_, i) => i + 1);

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
            Découvrez notre expertise en esthétique dentaire à travers ces cas
            cliniques.
          </p>
        </div>

        {/* Before/After Sliders */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div>
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1598256989467-3c58f96b994d?q=80&w=1000&auto=format&fit=crop"
              afterImage="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop"
            />
            <p className="text-center text-sm text-neutral-400 mt-3">
              {t("dragToCompare")}
            </p>
          </div>
          <div>
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=1000&auto=format&fit=crop"
              afterImage="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop"
            />
            <p className="text-center text-sm text-neutral-400 mt-3">
              {t("dragToCompare")}
            </p>
          </div>
        </div>

        {/* Macro Photos */}
        <div className="text-center mb-10">
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
            >
              <Image
                src={`https://images.unsplash.com/photo-[TEMPLATE]?q=80&w=600&auto=format&fit=crop`.replace(
                  "[TEMPLATE]",
                  [
                    "1598256989467-3c58f96b994d",
                    "1606811841689-23dfddce3e95",
                    "1588776814546-1ffcf47267a5",
                    "1629909613654-28e377c37b09",
                    "1570534241772-2aa7f4c084ea",
                    "1522844990619-4951c40f7eda",
                  ][num - 1],
                )}
                alt={`Dental Macro ${num}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors flex items-center justify-center">
                <Search className="w-8 h-8 stroke-[1.5] text-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 drop-shadow-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
