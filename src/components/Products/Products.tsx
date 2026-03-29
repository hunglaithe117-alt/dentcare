"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useState } from "react";

const CATEGORY_KEYS = ["crowns", "veneers", "implants", "removable"] as const;
type CategoryKey = (typeof CATEGORY_KEYS)[number];

const PRODUCT_KEYS: Record<CategoryKey, string[]> = {
  crowns: ["zirconeMonolithic", "zirconeStratified", "ccm", "inlayCore"],
  veneers: ["waxup", "stratifiedVeneer", "monolithicVeneer"],
  implants: ["screwRetained", "cemented", "allOn"],
  removable: ["metalFrame", "biosoft", "flexibleResin", "conventionalResin", "attachementPrecision"],
};

// Local DentCare images for each product line
const PRODUCT_IMAGES: Record<CategoryKey, string[]> = {
  crowns: [
    "/images/products/crowns/zircone-monolithic.jpg",
    "/images/products/crowns/zircone-stratified.jpg",
    "/images/products/crowns/ccm.jpg",
    "/images/products/crowns/emax-onlay-inlay-core.png",
  ],
  veneers: [
    "/images/products/veneers/facette-emax.jpg",
    "/images/products/veneers/facettes-stratifiees.jpg",
    "/images/products/veneers/diagnostic-wax-up.jpg",
  ],
  implants: [
    "/images/products/implants/solution-transvissee.jpg",
    "/images/products/implants/solution-scellee.jpg",
    "/images/products/implants/all-on.jpg",
  ],
  removable: [
    "/images/products/removable/chassis-metallique.jpg",
    "/images/products/removable/biosoft.jpg",
    "/images/products/removable/resine-flexible-placeholder.jpg",
    "/images/products/removable/prothese-resine-placeholder.jpg",
    "/images/products/removable/attachement-precision.jpg",
  ],
};

interface ProductSelection {
  category: CategoryKey;
  key: string;
  index: number;
}

const BRAND_LOGOS = {
  materials: [
    { name: "Dentaurum", src: "/images/brands/dentaurum-client.jpg" },
    { name: "Ivoclar", src: "/images/brands/ivoclar-client.jpg" },
    { name: "GC", src: "/images/brands/gc-client.jpg" },
    { name: "Triumph", src: "/images/brands/triumph-client.jpg" },
    { name: "Erkodent", src: "/images/brands/erkodent-client.jpg" },
    { name: "Lava", src: "/images/brands/lava-client.jpg" },
    { name: "UPCERA", src: "/images/brands/upcera-client.jpg" },
    { name: "Ceramotion", src: "/images/brands/ceramotion-client.jpg" },
    { name: "IPS e.max", src: "/images/brands/emax-client.jpg" },
  ],
  digitalFlow: [
    { name: "3shape", src: "/images/brands/3shape-client.jpg" },
    { name: "Medit", src: "/images/brands/medit-client.jpg" },
    { name: "DS Core", src: "/images/brands/ds-core-client.jpg" },
    { name: "Shining 3D", src: "/images/brands/shining3d-client.jpg" },
  ],
} as const;

export default function Products(): React.ReactElement {
  const t = useTranslations("products");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("crowns");
  const [selectedProduct, setSelectedProduct] = useState<ProductSelection | null>(
    null,
  );

  const handleCategoryChange = useCallback((key: CategoryKey): void => {
    setActiveCategory(key);
  }, []);

  const openProductDetails = useCallback(
    (category: CategoryKey, key: string, index: number): void => {
      setSelectedProduct({ category, key, index });
    },
    [],
  );

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
              role="button"
              tabIndex={0}
              onClick={() => openProductDetails(activeCategory, productKey, index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openProductDetails(activeCategory, productKey, index);
                }
              }}
              className="group cursor-pointer bg-white rounded-2xl border border-neutral-100 p-6 hover:border-accent-200 hover:shadow-xl hover:shadow-accent-100/30 transition-all hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Product image placeholder */}
              <div className="aspect-[3/2] rounded-xl bg-neutral-100 mb-5 flex items-center justify-center overflow-hidden relative shadow-inner">
                <Image
                  src={
                    PRODUCT_IMAGES[activeCategory][index]
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
              <p className="mt-4 text-sm font-semibold text-accent-700 group-hover:text-accent-800">
                {t("detail.view")}
              </p>
            </div>
          ))}
        </div>

        {activeCategory === "crowns" && (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-4">
                {t("labels.materials")}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {BRAND_LOGOS.materials.map((brand) => (
                  <div
                    key={brand.name}
                    className="h-20 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center p-3"
                  >
                    <Image
                      src={brand.src}
                      alt={brand.name}
                      width={180}
                      height={60}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-4">
                {t("labels.digitalFlow")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BRAND_LOGOS.digitalFlow.map((brand) => (
                  <div
                    key={brand.name}
                    className="h-20 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center p-3"
                  >
                    <Image
                      src={brand.src}
                      alt={brand.name}
                      width={180}
                      height={60}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeCategory === "removable" && (
          <div className="mt-8 rounded-2xl border border-primary-200 bg-primary-50 p-5">
            <p className="text-primary-900 font-semibold text-sm tracking-wide">
              {t("labels.toothRangeNote")}
            </p>
          </div>
        )}

        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setSelectedProduct(null)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedProduct(null);
              }
            }}
          >
            <div
              className="mx-auto max-w-3xl rounded-2xl bg-white p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-heading text-2xl font-bold text-primary-900 mb-2">
                {t(
                  `categories.${selectedProduct.category}.items.${selectedProduct.key}.name`,
                )}
              </h3>
              <p className="text-neutral-600 mb-4">
                {t(
                  `categories.${selectedProduct.category}.items.${selectedProduct.key}.description`,
                )}
              </p>

              <p className="text-sm text-neutral-700 leading-relaxed mb-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                {t(
                  `categories.${selectedProduct.category}.items.${selectedProduct.key}.technical`,
                )}
              </p>

              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-neutral-200 mb-5">
                <Image
                  src={
                    PRODUCT_IMAGES[selectedProduct.category][selectedProduct.index]
                  }
                  alt={t(
                    `categories.${selectedProduct.category}.items.${selectedProduct.key}.name`,
                  )}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-neutral-500">{t("detail.note")}</p>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="inline-flex items-center justify-center rounded-full bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
                >
                  {t("detail.close")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
