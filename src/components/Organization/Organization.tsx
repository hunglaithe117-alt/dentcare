"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  FileText,
  Building2,
} from "lucide-react";
import { useState } from "react";

type PolicyKey = "traceability" | "market" | "warranty" | "terms";

const SHIPPING_PARTNERS = [
  { name: "DHL", logoSrc: "/images/wetransfer/Logo livraison dans toute la france/IMG_1628.jpg" },
  { name: "Chronopost", logoSrc: "/images/wetransfer/Logo livraison dans toute la france/IMG_1629.jpg" },
  { name: "TNT / FedEx", logoSrc: "/images/wetransfer/Logo livraison dans toute la france/IMG_1630.jpg" },
  { name: "Deliverbag", logoSrc: "/images/wetransfer/Logo livraison dans toute la france/IMG_1631.jpg" },
] as const;

export default function Organization(): React.ReactElement {
  const t = useTranslations("organization");
  const locale = useLocale();
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);

  const policyDetails: Record<"fr" | "en", Record<PolicyKey, string>> = {
    fr: {
      traceability:
        "Traçabilité complète des dispositifs et matières premières selon les procédures internes de suivi et d'archivage.",
      market:
        "Mise sur le marché conforme au cadre réglementaire applicable, avec contrôle documentaire à chaque étape.",
      warranty:
        "Garantie de conformité sur les restaurations livrées selon les protocoles du laboratoire et les indications cliniques.",
      terms:
        "Consultez les conditions générales de vente pour le cadre contractuel, les délais, la facturation et le service après-vente.",
    },
    en: {
      traceability:
        "Full traceability for devices and raw materials through documented production and archiving workflows.",
      market:
        "Market release process aligned with applicable regulatory requirements and documentation checks.",
      warranty:
        "Conformity warranty for delivered restorations according to laboratory protocols and clinical indications.",
      terms:
        "Read the general terms of sale for contractual scope, timelines, billing conditions and after-sales service.",
    },
  };

  const currentPolicyLocale = locale === "en" ? "en" : "fr";

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
              <div className="shrink-0 w-full max-w-xs rounded-2xl bg-white/10 border border-white/20 relative overflow-hidden shadow-inner aspect-[16/9]">
                <Image
                  src="/images/organization/pict-31.jpg"
                  alt="Digital Dentistry Workflow"
                  fill
                  className="object-contain bg-neutral-100 p-2"
                />
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
          <div className="bg-white rounded-2xl border border-neutral-100 p-8 hover:shadow-xl transition-[transform,box-shadow] hover:-translate-y-1">
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
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-neutral-100">
              <Image
                src="/images/organization/pict-8319.jpg"
                alt={t("hanoi.title")}
                fill
                className="object-contain bg-neutral-100 p-2"
              />
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
              <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 flex items-center justify-center">
                <Image
                  src="/images/brands/certifications/pict-5456.png"
                  alt="ISO 13485"
                  width={240}
                  height={90}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Bordeaux Lab */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-8 hover:shadow-xl transition-[transform,box-shadow] hover:-translate-y-1">
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
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-neutral-100">
              <Image
                src="/images/organization/bordeaux-lab.jpg"
                alt={t("bordeaux.title")}
                fill
                className="object-contain bg-neutral-100 p-2"
              />
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

        <div className="mb-4 rounded-2xl border border-accent-200 bg-white p-5 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SHIPPING_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 flex items-center justify-center h-20"
                title={partner.name}
              >
                <Image
                  src={partner.logoSrc}
                  alt={partner.name}
                  width={180}
                  height={80}
                  className="max-h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-100 p-8">
          <h3 className="font-heading text-xl font-bold text-primary-900 mb-6 text-center">
            {t("policies.title")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(["traceability", "market", "warranty", "terms"] as const).map(
              (key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActivePolicy(key)}
                  className={`text-center p-4 rounded-xl transition-colors cursor-pointer group border ${
                    activePolicy === key
                      ? "bg-accent-50 border-accent-200"
                      : "bg-neutral-50 border-transparent hover:bg-accent-50"
                  }`}
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
                </button>
              ),
            )}
          </div>

          {activePolicy && (
            <div className="mt-5 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
              <h4 className="font-semibold text-primary-900 mb-2">
                {t(`policies.${activePolicy}`)}
              </h4>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {policyDetails[currentPolicyLocale][activePolicy]}
              </p>

              {activePolicy === "terms" && (
                <div className="mt-4">
                  <Link
                    href={`/${locale}/terms-and-conditions`}
                    className="inline-flex items-center rounded-full bg-primary-900 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
                  >
                    {locale === "en"
                      ? "Open terms document"
                      : "Ouvrir le document des conditions"}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
