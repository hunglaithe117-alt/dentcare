import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams(): Promise<Array<{ locale: string }>> {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "DentCare Consultation — Laboratoire Prothèse Dentaire Bordeaux",
    en: "DentCare Consultation — Dental Prosthetics Laboratory Bordeaux",
    vi: "DentCare Consultation — Phòng Lab Nha Khoa Bordeaux",
  };

  const descriptions: Record<string, string> = {
    fr: "Laboratoire spécialisé en Esthétique et Implantologie. Plus de 30 ans d'expérience. Production certifiée ISO 13485. Bordeaux & Hanoï.",
    en: "Laboratory specialized in Aesthetics and Implantology. Over 30 years of experience. ISO 13485 certified production. Bordeaux & Hanoi.",
    vi: "Phòng thí nghiệm chuyên về Thẩm mỹ và Cấy ghép Implant. Hơn 30 năm kinh nghiệm. Sản xuất đạt chuẩn ISO 13485. Bordeaux & Hà Nội.",
  };

  return {
    title: titles[locale] ?? titles.fr,
    description: descriptions[locale] ?? descriptions.fr,
    alternates: {
      languages: {
        fr: "/fr",
        en: "/en",
        vi: "/vi",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>): Promise<React.ReactElement> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en" | "vi")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
