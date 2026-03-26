"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ(): React.ReactElement {
  const t = useTranslations("faq");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Get FAQ items from translations
  const faqItems = (t.raw("items") as FAQItem[]) || [];

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-30" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase">
            {t("sectionTitle")}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mt-3">
            {t("sectionSubtitle")}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="group border border-neutral-200 rounded-2xl overflow-hidden hover:border-accent-200 transition-all duration-300"
            >
              {/* Question */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 lg:px-8 py-5 lg:py-6 flex items-center gap-4 bg-neutral-50 hover:bg-neutral-100 transition-colors text-left group-hover:bg-neutral-100"
              >
                <span className="flex-1">
                  <h3 className="font-semibold text-primary-900 text-lg leading-tight group-hover:text-accent-600 transition-colors">
                    {item.question}
                  </h3>
                </span>
                <div
                  className={`shrink-0 w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 lg:px-8 py-6 bg-white border-t border-neutral-100">
                  <p className="text-neutral-700 leading-relaxed text-[17px] whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 pt-12 border-t border-neutral-100 text-center">
          <p className="text-neutral-600 mb-6">
            Didn't find your answer? We're here to help!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-all hover:shadow-lg hover:shadow-accent-500/30"
          >
            Contact Us
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
