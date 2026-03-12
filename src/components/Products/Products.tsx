"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useState } from "react";

const CATEGORY_KEYS = ["crowns", "veneers", "implants", "removable"] as const;
type CategoryKey = (typeof CATEGORY_KEYS)[number];

const PRODUCT_KEYS: Record<CategoryKey, string[]> = {
  crowns: [
    "zirconeMonolithic",
    "zirconeStratified",
    "ccm",
    "metalCrown",
    "emax",
  ],
  veneers: ["emaxVeneer", "stratifiedVeneer", "waxup"],
  implants: ["screwRetained", "cemented", "allOn", "tiBase"],
  removable: ["metalFrame", "valplast", "complete", "precision"],
};

// Stock images for each product line to make the grid look realistic
const PRODUCT_IMAGES: Record<CategoryKey, string[]> = {
  crowns: [
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop", // generic dental close up
    "https://images.unsplash.com/photo-1598256989467-3c58f96b994d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570534241772-2aa7f4c084ea?q=80&w=800&auto=format&fit=crop",
  ],
  veneers: [
    "https://images.unsplash.com/photo-1590664216202-14811a4c867a?q=80&w=800&auto=format&fit=crop", // bright smile
    "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
  ],
  implants: [
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop", // clinical / x-ray feeling
    "https://images.unsplash.com/photo-1598256989467-3c58f96b994d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
  ],
  removable: [
    "https://images.unsplash.com/photo-1570534241772-2aa7f4c084ea?q=80&w=800&auto=format&fit=crop", // dentures / models
    "https://images.unsplash.com/photo-1590664216202-14811a4c867a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
  ],
};

export default function Products(): React.ReactElement {
  const t = useTranslations("products");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("crowns");

  const handleCategoryChange = useCallback((key: CategoryKey): void => {
    setActiveCategory(key);
  }, []);

  return (
    <section
      id="products"
      className="py-24 lg:py-32 bg-neutral-50 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-100/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase">
            {t("sectionTitle")}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mt-3">
            {t("sectionSubtitle")}
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORY_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all tracking-wide ${
                activeCategory === key
                  ? "bg-primary-900 text-white shadow-lg shadow-primary-900/25"
                  : "bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-900 border border-neutral-200"
              }`}
            >
              <span>{t(`categories.${key}.title`)}</span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in"
          key={activeCategory}
        >
          {PRODUCT_KEYS[activeCategory].map((productKey, index) => (
            <div
              key={productKey}
              className="group bg-white rounded-2xl border border-neutral-100 p-6 hover:border-accent-200 hover:shadow-xl hover:shadow-accent-100/30 transition-all hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Product image placeholder */}
              <div className="aspect-[3/2] rounded-xl bg-neutral-100 mb-5 flex items-center justify-center overflow-hidden relative shadow-inner">
                <Image
                  src={
                    PRODUCT_IMAGES[activeCategory][
                      index % PRODUCT_IMAGES[activeCategory].length
                    ]
                  }
                  alt={productKey}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h4 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-700 transition-colors">
                {t(`categories.${activeCategory}.items.${productKey}.name`)}
              </h4>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {t(
                  `categories.${activeCategory}.items.${productKey}.description`,
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
