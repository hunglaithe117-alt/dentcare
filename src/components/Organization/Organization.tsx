"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Monitor,
  Search,
  ShieldCheck,
  FileText,
  Building2,
} from "lucide-react";

export default function Organization(): React.ReactElement {
  const t = useTranslations("organization");

  return (
    <section
      id="organization"
      className="py-24 lg:py-32 bg-neutral-50 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary-50 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl opacity-60" />

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

        {/* Digital Workflow Card */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-3xl p-8 lg:p-10 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "30px 30px",
              }}
            />
            <div className="relative flex flex-col lg:flex-row items-center gap-6">
              <div className="shrink-0 w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 relative overflow-hidden shadow-inner">
                <Image
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=400&auto=format&fit=crop"
                  alt="Digital Dentistry Workflow"
                  fill
                  className="object-cover opacity-80 mix-blend-overlay hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
                />
                <Monitor className="w-8 h-8 stroke-[1.5] text-white absolute z-10 drop-shadow-md" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  {t("digital.title")}
                </h3>
                <p className="text-white/70 leading-relaxed max-w-2xl">
                  {t("digital.description")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lab Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Hanoi Lab */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-8 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                <span className="text-xl font-heading font-bold text-red-600">
                  VN
                </span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-primary-900">
                  {t("hanoi.title")}
                </h3>
                <p className="text-sm text-neutral-500">
                  {t("hanoi.subtitle")}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(["item1", "item2", "item3", "item4", "item5"] as const).map(
                (key) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 p-4 bg-neutral-50 border border-neutral-100 rounded-xl"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0 mt-2" />
                    <span className="text-sm text-neutral-700 font-medium leading-relaxed">
                      {t(`hanoi.${key}`)}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Bordeaux Lab */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-8 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <span className="text-xl font-heading font-bold text-blue-600">
                  FR
                </span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-primary-900">
                  {t("bordeaux.title")}
                </h3>
                <p className="text-sm text-neutral-500">
                  {t("bordeaux.subtitle")}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  "item1",
                  "item2",
                  "item3",
                  "item4",
                  "item5",
                  "item6",
                  "item7",
                ] as const
              ).map((key) => (
                <div
                  key={key}
                  className="flex items-start gap-3 p-4 bg-neutral-50 border border-neutral-100 rounded-xl"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0 mt-2" />
                  <span className="text-sm text-neutral-700 font-medium leading-relaxed">
                    {t(`bordeaux.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-8">
          <h3 className="font-heading text-xl font-bold text-primary-900 mb-6 text-center">
            {t("policies.title")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(["traceability", "market", "warranty", "terms"] as const).map(
              (key) => (
                <div
                  key={key}
                  className="text-center p-4 bg-neutral-50 rounded-xl hover:bg-accent-50 transition-colors cursor-pointer group"
                >
                  <span className="text-neutral-400 group-hover:text-accent-500 transition-colors block mb-3 mx-auto flex justify-center">
                    {key === "traceability" ? (
                      <Search className="w-6 h-6 stroke-[1.5]" />
                    ) : key === "market" ? (
                      <Building2 className="w-6 h-6 stroke-[1.5]" />
                    ) : key === "warranty" ? (
                      <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
                    ) : (
                      <FileText className="w-6 h-6 stroke-[1.5]" />
                    )}
                  </span>
                  <span className="text-sm font-medium text-neutral-700 group-hover:text-accent-700 transition-colors">
                    {t(`policies.${key}`)}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
