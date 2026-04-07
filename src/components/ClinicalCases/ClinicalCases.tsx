"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, Search } from "lucide-react";

type GalleryTitleKey =
  | "caseCategoryBridge"
  | "caseCategoryLevitation"
  | "caseCategoryMan"
  | "caseCategoryTechnique";

type GalleryCollectionDef = {
  id: string;
  titleKey: GalleryTitleKey;
  imageSrcs: readonly string[];
};

const GALLERY_COLLECTIONS: readonly GalleryCollectionDef[] = [
  {
    id: "bridge-colle",
    titleKey: "caseCategoryBridge",
    imageSrcs: [
      "/images/gallery/bridge-colle/avant-apres-10.png",
      "/images/gallery/bridge-colle/img-2595.jpg",
    ],
  },
  {
    id: "levitation",
    titleKey: "caseCategoryLevitation",
    imageSrcs: [
      "/images/gallery/levitation/avant-apres-9.png",
      "/images/gallery/levitation/facette-levitation.jpg",
      "/images/gallery/levitation/img-2278.jpg",
      "/images/gallery/levitation/img-2582.jpg",
    ],
  },
  {
    id: "man",
    titleKey: "caseCategoryMan",
    imageSrcs: [
      "/images/gallery/man/avant-apres-4.png",
      "/images/gallery/man/avant-apres-6.png",
      "/images/gallery/man/1000009150.jpg",
      "/images/gallery/man/1000009616.jpg",
      "/images/gallery/man/img-2765.jpg",
      "/images/gallery/man/img-2786.jpg",
      "/images/gallery/man/img-2787-2.jpg",
    ],
  },
  {
    id: "technique",
    titleKey: "caseCategoryTechnique",
    imageSrcs: [
      "/images/gallery/technique/1000009144.jpg",
      "/images/gallery/technique/img-7793.jpg",
    ],
  },
] as const;

const STANDALONE_IMAGES: readonly string[] = [
  "/images/gallery/standalone/1.png",
  "/images/gallery/standalone/2.png",
  "/images/gallery/standalone/3.png",
  "/images/gallery/standalone/4.png",
  "/images/gallery/standalone/5.jpg",
  "/images/gallery/standalone/6.jpg",
  "/images/gallery/standalone/7.jpg",
] as const;

type GalleryLightboxItem = { src: string; alt: string };

type LightboxState =
  | { type: "single"; src: string; alt: string }
  | {
      type: "gallery";
      collectionId: string;
      title: string;
      items: GalleryLightboxItem[];
      index: number;
    };

type FilmstripCollectionEntry = {
  kind: "collection";
  key: string;
  collection: GalleryCollectionDef;
  categoryLabel: string;
  coverSrc: string;
  coverAlt: string;
  count: number;
  stripIndex: number;
};

type FilmstripStandaloneEntry = {
  kind: "standalone";
  key: string;
  src: string;
  alt: string;
  stripIndex: number;
};

type FilmstripEntry = FilmstripCollectionEntry | FilmstripStandaloneEntry;

export default function ClinicalCases(): React.ReactElement {
  const t = useTranslations("clinical");
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const lightboxRef = useRef<LightboxState | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxOpenerRef = useRef<Element | null>(null);
  const lightboxWasOpenRef = useRef(false);

  const macroImages = Array.from({ length: 6 }, (_, i) => i + 1).filter(
    (num) => num !== 5,
  );

  const filmstripItems = useMemo((): FilmstripEntry[] => {
    const out: FilmstripEntry[] = [];
    let stripIndex = 0;

    for (const col of GALLERY_COLLECTIONS) {
      const categoryLabel = t(col.titleKey);
      const total = col.imageSrcs.length;
      stripIndex += 1;
      out.push({
        kind: "collection",
        key: `col-${col.id}`,
        collection: col,
        categoryLabel,
        coverSrc: col.imageSrcs[0],
        coverAlt: t("galleryItemAlt", {
          category: categoryLabel,
          current: 1,
          total,
        }),
        count: total,
        stripIndex,
      });
    }

    const standaloneTotal = STANDALONE_IMAGES.length;
    for (let i = 0; i < standaloneTotal; i++) {
      stripIndex += 1;
      out.push({
        kind: "standalone",
        key: `solo-${STANDALONE_IMAGES[i]}`,
        src: STANDALONE_IMAGES[i],
        alt: t("standaloneAlt", {
          n: i + 1,
          total: standaloneTotal,
        }),
        stripIndex,
      });
    }

    return out;
  }, [t]);

  const openCollection = useCallback(
    (col: GalleryCollectionDef): void => {
      const title = t(col.titleKey);
      const total = col.imageSrcs.length;
      const items: GalleryLightboxItem[] = col.imageSrcs.map((src, i) => ({
        src,
        alt: t("galleryItemAlt", {
          category: title,
          current: i + 1,
          total,
        }),
      }));
      setLightbox({
        type: "gallery",
        collectionId: col.id,
        title,
        items,
        index: 0,
      });
    },
    [t],
  );

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  useEffect(() => {
    lightboxRef.current = lightbox;
  }, [lightbox]);

  useEffect(() => {
    const open = lightbox !== null;
    if (open && !lightboxWasOpenRef.current) {
      lightboxOpenerRef.current = document.activeElement;
      requestAnimationFrame(() => {
        lightboxCloseRef.current?.focus();
      });
    }
    if (!open && lightboxWasOpenRef.current) {
      const opener = lightboxOpenerRef.current;
      if (opener instanceof HTMLElement) {
        opener.focus();
      }
    }
    lightboxWasOpenRef.current = open;
  }, [lightbox]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      const current = lightboxRef.current;

      if (e.key === "Escape") {
        if (current !== null) {
          e.preventDefault();
          e.stopPropagation();
          closeLightbox();
        }
        return;
      }

      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
        return;
      }

      if (current === null) {
        return;
      }

      // Lightbox is open: block default so scroll containers (filmstrip) never see ArrowLeft/Right
      e.preventDefault();
      e.stopPropagation();

      if (current.type === "gallery" && current.items.length > 1) {
        const len = current.items.length;
        const delta = e.key === "ArrowRight" ? 1 : -1;
        const next = (current.index + delta + len) % len;
        setLightbox({ ...current, index: next });
      }
    };

    window.addEventListener("keydown", handleKey, true);
    return () => {
      window.removeEventListener("keydown", handleKey, true);
    };
  }, [closeLightbox]);

  return (
    <section
      id="clinical"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto text-pretty">
          <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase">
            {t("sectionTitle")}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mt-3 mb-6 text-balance">
            {t("sectionSubtitle")}
          </h2>
          <p className="text-neutral-600 leading-relaxed text-lg">
            {t("description")}
          </p>
        </div>

        {/* Strip: collection covers (open multi-image gallery) + standalone (single lightbox) */}
        <div
          id="standalone"
          className="mb-24 scroll-mt-28 relative"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-[min(12vw,8rem)] top-1/4 h-72 w-72 rounded-full bg-primary-200/25 blur-3xl motion-reduce:opacity-50"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[min(8vw,5rem)] bottom-0 h-80 w-80 rounded-full bg-accent-200/20 blur-3xl motion-reduce:opacity-50"
          />

          <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-primary-100/90 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/20 px-4 pt-8 pb-6 sm:px-6 sm:pt-10 sm:pb-8 shadow-[0_24px_80px_-28px_rgba(16,42,67,0.12)] ring-1 ring-white/80">
            <div
              className="mx-auto mb-6 flex max-w-md items-center justify-center gap-3 px-4"
              aria-hidden
            >
              <span className="h-px flex-1 max-w-[5rem] bg-gradient-to-r from-transparent to-accent-400/45" />
              <span className="size-2 rotate-45 border border-accent-500/50 bg-accent-50/80 shadow-sm" />
              <span className="h-px flex-1 max-w-[5rem] bg-gradient-to-l from-transparent to-accent-400/45" />
            </div>

            <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-12 sm:w-20 bg-gradient-to-r from-primary-50 via-primary-50/85 to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-12 sm:w-20 bg-gradient-to-l from-primary-50 via-primary-50/85 to-transparent"
              />

              <ul
                role="list"
                aria-label={t("sectionSubtitle")}
                className="list-none flex snap-x snap-mandatory gap-4 sm:gap-5 overflow-x-auto overflow-y-visible overscroll-x-contain scroll-smooth motion-reduce:scroll-auto py-2 pb-4 touch-pan-x [scrollbar-color:rgba(98,125,152,0.35)_transparent] px-6 sm:px-10 lg:px-14"
              >
                {filmstripItems.map((item, i) => {
                  const indexLabel = String(item.stripIndex).padStart(2, "0");
                  const isCollection = item.kind === "collection";

                  return (
                    <li
                      key={item.key}
                      className="snap-center shrink-0 list-none"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (item.kind === "collection") {
                            openCollection(item.collection);
                          } else {
                            setLightbox({
                              type: "single",
                              src: item.src,
                              alt: item.alt,
                            });
                          }
                        }}
                        className="group relative w-[min(78vw,17.5rem)] sm:w-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-2xl"
                      >
                        <div
                          className={`rounded-2xl bg-white p-2 sm:p-2.5 shadow-[0_10px_40px_-12px_rgba(16,42,67,0.14)] ring-1 ring-primary-200/80 motion-safe:transition-[transform,box-shadow,ring-color] duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:shadow-[0_20px_50px_-16px_rgba(16,42,67,0.2)] motion-safe:group-hover:ring-accent-300/55 ${isCollection ? "ring-accent-200/40" : ""}`}
                        >
                          <div
                            aria-hidden
                            className="mb-2 h-0.5 w-full rounded-full bg-gradient-to-r from-primary-100 via-accent-300/50 to-primary-100 opacity-80"
                          />
                          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-b from-primary-50/90 to-white ring-1 ring-primary-100/90">
                            <span
                              translate="no"
                              className="pointer-events-none absolute left-3 top-3 z-[1] rounded-md bg-white/95 px-2 py-1 font-heading text-base font-semibold tabular-nums leading-none text-primary-900 shadow-sm ring-1 ring-primary-100/90"
                              aria-hidden
                            >
                              {indexLabel}
                            </span>

                            {isCollection ? (
                              <div className="pointer-events-none absolute left-3 right-3 top-12 z-[1] flex flex-wrap items-center gap-1.5">
                                <span className="inline-flex max-w-full items-center gap-1 truncate rounded-md bg-primary-900/88 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm backdrop-blur-sm">
                                  <Images
                                    className="h-3 w-3 shrink-0 opacity-90"
                                    aria-hidden
                                  />
                                  <span className="truncate">
                                    {item.categoryLabel}
                                  </span>
                                </span>
                                <span className="inline-flex shrink-0 rounded-md bg-white/95 px-2 py-1 text-[10px] font-medium text-primary-800 shadow-sm ring-1 ring-primary-100/90">
                                  {t("galleryPhotoCount", {
                                    count: item.count,
                                  })}
                                </span>
                              </div>
                            ) : null}

                            <div
                              className="absolute inset-0 z-[1] bg-gradient-to-t from-primary-900/30 via-primary-900/5 to-transparent opacity-0 motion-safe:transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                              aria-hidden
                            />
                            <span className="absolute bottom-3 right-3 z-[2] rounded-full border border-accent-200/90 bg-accent-50/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-accent-800 opacity-0 shadow-sm motion-safe:transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                              {isCollection
                                ? t("openGallery")
                                : t("standaloneEnlarge")}
                            </span>
                            <Image
                              src={
                                isCollection ? item.coverSrc : item.src
                              }
                              alt={
                                isCollection ? item.coverAlt : item.alt
                              }
                              fill
                              className="object-contain p-2 sm:p-2.5 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover:scale-[1.02]"
                              sizes="(max-width: 640px) 78vw, 320px"
                              priority={i === 0}
                            />
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div id="macro" className="text-center mb-10 scroll-mt-28">
          <h3 className="font-heading text-2xl font-bold text-primary-900">
            {t("macroTitle")}
          </h3>
          <p className="text-neutral-500 mt-2">{t("macroSubtitle")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {macroImages.map((num) => (
            <button
              key={num}
              type="button"
              className="group relative aspect-square rounded-xl bg-neutral-100 overflow-hidden cursor-pointer hover:shadow-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              onClick={() =>
                setLightbox({
                  type: "single",
                  src: `/images/clinical/macro/macro-${num}.jpg`,
                  alt: t("macroImageAlt", { num: String(num) }),
                })
              }
            >
              <Image
                src={`/images/clinical/macro/macro-${num}.jpg`}
                alt={t("macroImageAlt", { num: String(num) })}
                fill
                className="object-contain p-2"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                <Search
                  className="w-8 h-8 stroke-[1.5] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100 drop-shadow-md"
                  aria-hidden
                />
              </div>
            </button>
          ))}
        </div>

        {lightbox !== null ? (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overscroll-contain flex flex-col p-3 sm:p-6"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={
              lightbox.type === "gallery" ? lightbox.title : lightbox.alt
            }
          >
            {lightbox.type === "single" ? (
              <>
                <div
                  className="relative flex-1 min-h-0 w-full max-w-6xl mx-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={lightbox.src}
                    alt={lightbox.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
                <button
                  ref={lightboxCloseRef}
                  type="button"
                  aria-label={t("closePreview")}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 h-11 w-11 rounded-full bg-white/10 text-white text-2xl leading-none hover:bg-white/20 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeLightbox();
                  }}
                >
                  <span aria-hidden>×</span>
                </button>
              </>
            ) : (
              <div
                className="flex flex-col flex-1 min-h-0 w-full mx-auto gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex shrink-0 items-center justify-between gap-3 text-white">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {lightbox.title}
                    </p>
                    <p className="text-xs text-white/70">
                      {lightbox.index + 1} / {lightbox.items.length}
                    </p>
                  </div>
                  <button
                    ref={lightboxCloseRef}
                    type="button"
                    aria-label={t("closePreview")}
                    className="shrink-0 h-11 w-11 rounded-full bg-white/10 text-2xl leading-none text-white hover:bg-white/20 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
                    onClick={closeLightbox}
                  >
                    <span aria-hidden>×</span>
                  </button>
                </div>

                <div className="flex min-h-0 flex-1 items-center gap-2 sm:gap-3 md:gap-5">
                  {lightbox.items.length > 1 ? (
                    <button
                      type="button"
                      aria-label={t("previousImage")}
                      className="shrink-0 self-center h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      onClick={() =>
                        setLightbox((prev) => {
                          if (!prev || prev.type !== "gallery") {
                            return prev;
                          }
                          const len = prev.items.length;
                          const next = (prev.index - 1 + len) % len;
                          return { ...prev, index: next };
                        })
                      }
                    >
                      <ChevronLeft className="h-6 w-6" aria-hidden />
                    </button>
                  ) : null}
                  <div className="relative min-h-[40vh] flex-1 min-w-0 sm:min-h-[50vh]">
                    <Image
                      key={lightbox.items[lightbox.index].src}
                      src={lightbox.items[lightbox.index].src}
                      alt={lightbox.items[lightbox.index].alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                  {lightbox.items.length > 1 ? (
                    <button
                      type="button"
                      aria-label={t("nextImage")}
                      className="shrink-0 self-center h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      onClick={() =>
                        setLightbox((prev) => {
                          if (!prev || prev.type !== "gallery") {
                            return prev;
                          }
                          const len = prev.items.length;
                          const next = (prev.index + 1) % len;
                          return { ...prev, index: next };
                        })
                      }
                    >
                      <ChevronRight className="h-6 w-6" aria-hidden />
                    </button>
                  ) : null}
                </div>

                {lightbox.items.length > 1 ? (
                  <div className="shrink-0 flex gap-2 overflow-x-auto pb-1 pt-1 [scrollbar-color:rgba(255,255,255,0.35)_transparent]">
                    {lightbox.items.map((img, idx) => (
                      <button
                        key={img.src}
                        type="button"
                        aria-label={img.alt}
                        aria-current={
                          idx === lightbox.index ? "true" : undefined
                        }
                        className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-2 transition-[ring-color,opacity] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                          idx === lightbox.index
                            ? "ring-white opacity-100"
                            : "ring-transparent opacity-60 hover:opacity-90"
                        }`}
                        onClick={() =>
                          setLightbox((prev) =>
                            prev && prev.type === "gallery"
                              ? { ...prev, index: idx }
                              : prev,
                          )
                        }
                      >
                        <Image
                          src={img.src}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
