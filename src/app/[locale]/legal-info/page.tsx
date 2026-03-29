interface LegalInfoPageProps {
  params: Promise<{ locale: string }>;
}

const CONTENT = {
  fr: {
    title: "Informations légales",
    intro:
      "Le contenu officiel sera remplacé après réception du document validé par le client.",
    items: [
      "Raison sociale: Dentcare Consultation SASU",
      "Adresse: 29 Rue de Cursol 33000 Bordeaux",
      "RCS Bordeaux: 832 04 30574",
      "TVA: FR52 832043574",
      "Contact: olivier@dentcare-consultation.com",
    ],
  },
  en: {
    title: "Legal Information",
    intro:
      "The official legal document will be replaced once the client provides the final approved version.",
    items: [
      "Company: Dentcare Consultation SASU",
      "Address: 29 Rue de Cursol 33000 Bordeaux",
      "RCS Bordeaux: 832 04 30574",
      "VAT: FR52 832043574",
      "Contact: olivier@dentcare-consultation.com",
    ],
  },
} as const;

export default async function LegalInfoPage({
  params,
}: LegalInfoPageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  const content = CONTENT[locale as "fr" | "en"] ?? CONTENT.fr;

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary-900 mb-5">
          {content.title}
        </h1>
        <p className="text-neutral-600 mb-8">{content.intro}</p>

        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <ul className="space-y-3 text-neutral-700">
            {content.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
