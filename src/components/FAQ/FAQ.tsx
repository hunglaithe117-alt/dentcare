"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ(): React.ReactElement {
  const t = useTranslations("faq");
  const baseId = useId();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqItems = (t.raw("items") as FAQItem[]) || [];

  const toggleAccordion = (index: number): void => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-30" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase">
            {t("sectionTitle")}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mt-3 text-pretty">
            {t("sectionSubtitle")}
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const panelId = `${baseId}-panel-${index}`;
            const triggerId = `${baseId}-trigger-${index}`;
            const isOpen = expandedIndex === index;
            return (
              <div
                key={triggerId}
                className="group border border-neutral-200 rounded-2xl overflow-hidden hover:border-accent-200 transition-[border-color] duration-300"
              >
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 lg:px-8 py-5 lg:py-6 flex items-center gap-4 bg-neutral-50 hover:bg-neutral-100 transition-colors text-left group-hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500"
                >
                  <span className="flex-1 min-w-0">
                    <span className="font-semibold text-primary-900 text-lg leading-tight group-hover:text-accent-600 transition-colors block">
                      {item.question}
                    </span>
                  </span>
                  <div
                    className={`shrink-0 w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
                    isOpen ? "max-h-96 overflow-y-auto" : "max-h-0"
                  }`}
                >
                  <div className="px-6 lg:px-8 py-6 bg-white border-t border-neutral-100">
                    <p className="text-neutral-700 leading-relaxed text-[17px] whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 pt-12 border-t border-neutral-100 text-center">
          <p className="text-neutral-600 mb-6">{t("additionalInfo")}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-[background-color,box-shadow] hover:shadow-lg hover:shadow-accent-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500"
          >
            {t("contactUs")}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
