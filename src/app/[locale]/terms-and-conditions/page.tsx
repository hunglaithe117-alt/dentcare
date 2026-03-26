interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

const CONTENT = {
  fr: {
    title: "Conditions générales de vente",
    intro:
      "Cette version est provisoire. Le texte complet sera mis a jour des reception du document officiel du client.",
    sections: [
      {
        title: "Objet",
        body: "Prestations de conception et fabrication de protheses dentaires sur prescription professionnelle.",
      },
      {
        title: "Commandes",
        body: "Toute commande doit etre accompagnee des informations techniques necessaires a la realisation.",
      },
      {
        title: "Livraison",
        body: "Les delais sont communiques a titre indicatif selon la nature du travail et la logistique disponible.",
      },
      {
        title: "Facturation",
        body: "Les modalites de reglement detaillees seront remplacees selon les CGV officielles transmises.",
      },
    ],
  },
  en: {
    title: "General Terms of Sale",
    intro:
      "This is a temporary version. The full official terms will be updated once the client sends the final legal document.",
    sections: [
      {
        title: "Scope",
        body: "Services include dental prosthetic design and manufacturing based on professional prescriptions.",
      },
      {
        title: "Orders",
        body: "Each order must include all technical details required for production and quality checks.",
      },
      {
        title: "Delivery",
        body: "Delivery timelines are indicative and depend on case complexity and available logistics.",
      },
      {
        title: "Billing",
        body: "Detailed payment terms will be replaced by the official approved terms once received.",
      },
    ],
  },
} as const;

export default async function TermsAndConditionsPage({
  params,
}: TermsPageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  const content = CONTENT[locale as "fr" | "en"] ?? CONTENT.fr;

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-primary-900 mb-5">
          {content.title}
        </h1>
        <p className="text-neutral-600 mb-8">{content.intro}</p>

        <div className="space-y-4">
          {content.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
            >
              <h2 className="font-semibold text-primary-900 mb-2">{section.title}</h2>
              <p className="text-neutral-700">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
