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
  removable: ["metalFrame", "biosoft", "conventionalResin", "attachementPrecision"],
};

const PRODUCT_IMAGES: Record<CategoryKey, Record<string, string[]>> = {
  crowns: {
    zirconeMonolithic: [
      "/images/wetransfer/pict 7 zircone Monolithique/IMG_1410.jpg",
    ],
    zirconeStratified: [
      "/images/wetransfer/Pict 8 Zircone Stratifiee/PHOTO-2026-03-15-07-58-24.jpg",
      "/images/wetransfer/Pict 8 Zircone Stratifiee/PHOTO-2026-03-15-08-00-47.jpg",
      "/images/wetransfer/Pict 8 Zircone Stratifiee/PHOTO-2026-03-15-08-44-16.jpg",
    ],
    ccm: [
      "/images/wetransfer/Pict 9 CCM/PHOTO-2026-03-15-08-39-23.jpg",
      "/images/wetransfer/Pict 9 CCM/PHOTO-2026-03-15-08-48-36.jpg",
    ],
    inlayCore: [
      "/images/wetransfer/pict 10 inlay-core/Capture d’écran 2017-04-12 à 08.52.13.png",
    ],
  },
  veneers: {
    waxup: [
      "/images/wetransfer/Pict 13  Diagnostic wax  up/PHOTO-2026-03-15-08-01-26.jpg",
      "/images/wetransfer/Pict 13  Diagnostic wax  up/a7f225e8-4fcf-4ea7-b975-2ee801dfc8bc.jpg",
      "/images/wetransfer/Pict 13  Diagnostic wax  up/d2243eb2-03e6-4acc-99df-7b9b28a9c8bd.jpg",
      "/images/wetransfer/Pict 13  Diagnostic wax  up/fbd6874d-c143-459e-a27a-48f8cf54758d.jpg",
    ],
    stratifiedVeneer: [
      "/images/wetransfer/pict 12 Facettes stratifiees/IMG_5508.jpg",
      "/images/wetransfer/pict 12 Facettes stratifiees/IMG_5512 2.jpg",
      "/images/wetransfer/pict 12 Facettes stratifiees/PHOTO-2026-03-15-08-41-17.jpg",
    ],
    monolithicVeneer: [
      "/images/wetransfer/Pict 11 Facette emax/Capture d’écran 2018-01-20 à 19.27.56.png",
      "/images/wetransfer/Pict 11 Facette emax/PHOTO-2026-03-15-08-36-20.jpg",
      "/images/wetransfer/Pict 11 Facette emax/PHOTO-2026-03-15-08-38-03.jpg",
      "/images/wetransfer/Pict 11 Facette emax/PHOTO-2026-03-15-08-38-52.jpg",
    ],
  },
  implants: {
    screwRetained: [
      "/images/wetransfer/Pict 14 solution transvissee/IMG_9296.jpg",
      "/images/wetransfer/Pict 14 solution transvissee/PHOTO-2026-03-15-07-59-13.jpg",
      "/images/wetransfer/Pict 14 solution transvissee/PHOTO-2026-03-15-07-59-58.jpg",
      "/images/wetransfer/Pict 14 solution transvissee/PHOTO-2026-03-15-08-00-07.jpg",
      "/images/wetransfer/Pict 14 solution transvissee/PHOTO-2026-03-15-08-49-09.jpg",
    ],
    cemented: [
      "/images/wetransfer/Pict 15 Solution Scellee/PHOTO-2026-03-15-07-56-11.jpg",
      "/images/wetransfer/Pict 15 Solution Scellee/PHOTO-2026-03-15-07-56-22.jpg",
    ],
    allOn: [
      "/images/wetransfer/Pict 16 All on/IMG_0743.jpg",
      "/images/wetransfer/Pict 16 All on/PHOTO-2026-03-15-07-55-19.jpg",
      "/images/wetransfer/Pict 16 All on/PHOTO-2026-03-15-07-56-02.jpg",
      "/images/wetransfer/Pict 16 All on/PHOTO-2026-03-15-08-02-22.jpg",
    ],
  },
  removable: {
    metalFrame: [
      "/images/products/removable/pict-1662.jpg",
      "/images/wetransfer/Pict 17 Chassis/PHOTO-2026-03-15-07-56-37.jpg",
      "/images/wetransfer/Pict 17 Chassis/PHOTO-2026-03-15-07-56-47.jpg",
    ],
    biosoft: [
      "/images/products/removable/pict-1512.jpg",
      "/images/wetransfer/Pict 18 resine flex/PHOTO-2026-03-24-14-34-39.jpg",
      "/images/wetransfer/Pict 18 resine flex/PHOTO-2026-03-24-14-34-28.jpg",
    ],
    conventionalResin: [
      "/images/wetransfer/Pict 19 Resine/Capture d’écran 2026-03-21 à 11.55.13.png",
      "/images/products/removable/pict-1670.jpg",
    ],
    attachementPrecision: [
      "/images/wetransfer/pict 20 Attachement de precision/PHOTO-2026-03-15-07-57-21.jpg",
      "/images/wetransfer/pict 20 Attachement de precision/PHOTO-2026-03-15-07-57-37.jpg",
    ],
  },
};

interface ProductSelection {
  category: CategoryKey;
  key: string;
}

const BRAND_LOGOS = {
  materials: [
    { name: "Material 1", src: "/images/wetransfer/Logo Matiere Premiere/IMG_1539.jpg" },
    { name: "Material 2", src: "/images/wetransfer/Logo Matiere Premiere/IMG_1540.jpg" },
    { name: "Material 3", src: "/images/wetransfer/Logo Matiere Premiere/IMG_1541.jpg" },
    { name: "Material 4", src: "/images/wetransfer/Logo Matiere Premiere/IMG_1542.jpg" },
    { name: "Material 5", src: "/images/wetransfer/Logo Matiere Premiere/IMG_1543.jpg" },
    { name: "Material 6", src: "/images/wetransfer/Logo Matiere Premiere/IMG_1546.jpg" },
    { name: "Material 7", src: "/images/wetransfer/Logo Matiere Premiere/IMG_1589.jpg" },
    { name: "Material 8", src: "/images/wetransfer/Logo Matiere Premiere/IMG_1590.jpg" },
    { name: "Material 9", src: "/images/wetransfer/Logo Matiere Premiere/IMG_1591.jpg" },
  ],
  digitalFlow: [
    { name: "Camera 1", src: "/images/wetransfer/Logo camera 3D/IMG_1547.jpg" },
    { name: "Camera 2", src: "/images/wetransfer/Logo camera 3D/IMG_1586.jpg" },
    { name: "Camera 3", src: "/images/wetransfer/Logo camera 3D/IMG_1587.jpg" },
    { name: "Camera 4", src: "/images/wetransfer/Logo camera 3D/IMG_1588.jpg" },
  ],
  toothChoices: [
    { name: "Ivoclar Vivadent", src: "/images/brands/tooth-choice/ivoclar-vivadent.jpg" },
    { name: "Triumph Dental", src: "/images/brands/tooth-choice/triumph-dental.jpg" },
  ],
} as const;

export default function Products(): React.ReactElement {
  const t = useTranslations("products");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("crowns");
  const [selectedProduct, setSelectedProduct] = useState<ProductSelection | null>(
    null,
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleCategoryChange = useCallback((key: CategoryKey): void => {
    setActiveCategory(key);
  }, []);

  const openProductDetails = useCallback(
    (category: CategoryKey, key: string): void => {
      setSelectedProduct({ category, key });
      setSelectedImageIndex(0);
    },
    [],
  );

  const closeProductDetails = useCallback((): void => {
    setSelectedProduct(null);
    setSelectedImageIndex(0);
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
              className={`px-6 py-3 rounded-full font-medium text-sm transition-[background-color,color,box-shadow,border-color] tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-900 ${
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
              onClick={() => openProductDetails(activeCategory, productKey)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openProductDetails(activeCategory, productKey);
                }
              }}
              className="group cursor-pointer bg-white rounded-2xl border border-neutral-100 p-6 hover:border-accent-200 hover:shadow-xl hover:shadow-accent-100/30 transition-[transform,box-shadow,border-color] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Product image placeholder */}
              <div className="aspect-[3/2] rounded-xl bg-neutral-100 mb-5 flex items-center justify-center overflow-hidden relative shadow-inner">
                <Image
                  src={PRODUCT_IMAGES[activeCategory][productKey]?.[0] ?? "/images/hero/hero-dental-closeup.jpg"}
                  alt={productKey}
                  fill
                  className="object-contain p-2 transition-opacity duration-300 group-hover:opacity-95"
                />
                {(PRODUCT_IMAGES[activeCategory][productKey]?.length ?? 0) > 1 && (
                  <span className="absolute top-2 right-2 rounded-full bg-black/65 px-2 py-1 text-[11px] font-semibold text-white">
                    +{(PRODUCT_IMAGES[activeCategory][productKey]?.length ?? 1) - 1}
                  </span>
                )}
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
          <div className="mt-8 rounded-2xl border border-primary-200 bg-primary-50 p-5 sm:p-6 space-y-4">
            <p className="text-primary-900 font-semibold text-sm tracking-wide text-center sm:text-left">
              {t("labels.toothRangeNote")}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {BRAND_LOGOS.toothChoices.map((brand) => (
                <div
                  key={brand.name}
                  className="h-20 rounded-xl border border-primary-200 bg-white flex items-center justify-center p-3"
                >
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    width={180}
                    height={60}
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 sm:p-8 overflow-y-auto"
            onClick={closeProductDetails}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                closeProductDetails();
              }
            }}
          >
            <div
              className="mx-auto my-4 w-full max-w-5xl rounded-2xl bg-white p-5 sm:p-7"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-primary-900 mb-2">
                    {t(
                      `categories.${selectedProduct.category}.items.${selectedProduct.key}.name`,
                    )}
                  </h3>
                  <p className="text-neutral-600">
                    {t(
                      `categories.${selectedProduct.category}.items.${selectedProduct.key}.description`,
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeProductDetails}
                  className="inline-flex items-center justify-center rounded-full bg-primary-900 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-800 transition-colors"
                >
                  {t("detail.close")}
                </button>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed mb-5 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                {t(
                  `categories.${selectedProduct.category}.items.${selectedProduct.key}.technical`,
                )}
              </p>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 mb-4">
                <Image
                  src={
                    PRODUCT_IMAGES[selectedProduct.category][selectedProduct.key]?.[
                      selectedImageIndex
                    ] ??
                    PRODUCT_IMAGES[selectedProduct.category][selectedProduct.key]?.[0] ??
                    "/images/hero/hero-dental-closeup.jpg"
                  }
                  alt={t(
                    `categories.${selectedProduct.category}.items.${selectedProduct.key}.name`,
                  )}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {(PRODUCT_IMAGES[selectedProduct.category][selectedProduct.key]?.length ?? 0) > 1 && (
                <div className="mb-2 flex gap-3 overflow-x-auto pb-1">
                  {PRODUCT_IMAGES[selectedProduct.category][selectedProduct.key].map((src, imageIndex) => (
                    <button
                      key={`${src}-${imageIndex}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(imageIndex)}
                      className={`relative h-24 w-32 sm:h-28 sm:w-40 shrink-0 overflow-hidden rounded-lg border bg-neutral-100 transition-colors ${
                        imageIndex === selectedImageIndex
                          ? "border-primary-700 ring-2 ring-primary-200"
                          : "border-neutral-200"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${t(`categories.${selectedProduct.category}.items.${selectedProduct.key}.name`)} ${imageIndex + 1}`}
                        fill
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-2 text-xs text-neutral-500">
                {PRODUCT_IMAGES[selectedProduct.category][selectedProduct.key]?.length ?? 1} images
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
