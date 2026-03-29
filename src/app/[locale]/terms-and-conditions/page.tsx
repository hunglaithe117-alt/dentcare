interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

const CONTENT = {
  fr: {
    title: "Conditions générales de vente",
    intro: "DentCare Consultation",
    sections: [
      {
        title: "1. Applicabilité des conditions générales",
        body: "Les présentes conditions générales régissent l'ensemble des relations commerciales entre le client et DentCare Consultation. En cas de commande et de livraison, le client reconnaît avoir préalablement pris connaissance des Conditions Générales de ventes et en accepte tous les termes sans réserve. Aucune condition contraire ne peut être appliquée sauf accord écrit préalable de DentCare.",
      },
      {
        title: "2. Devis et commandes",
        body: "Pour délais Dispositif Médical ou Mesure (DDMM) à établir, un bon de commande dûment rempli doit être adressé en laboratoire avec l'intégralité des informations techniques nécessaires. Pour chaque Dispositif Médical, le bon présente le numéro DDMM ainsi que l'ensemble des caractéristiques. Le client ne peut procéder à aucune modification de son bon de commande une fois celui-ci accepté sans accord écrit préalable de DentCare.",
      },
      {
        title: "3. Prix",
        body: "Les prix contractuels à la base du devis ou à la base de données au jour de la livraison ou à la base de la commande accepté sont à titre de travail. Pour chaque Dispositif Médical ou Mesure (DDMM) à réaliser, un bon de commande dûment rempli doit être fourni au prix convenu. Tout devis révoqué ou expiré dans les délais conviendront à titre informatif et commande n'en assure pas reproduction.",
      },
      {
        title: "4. Conditions de paiement",
        body: "Conformément à l'article L.441 du code de commerce, tout retard dans les paiements entraîne une indemnité de percent à titre de dommages et intérêts. Le client sera tenu de rembourser les frais réels de recouvrement engagés par Dentcare, notamment en cas de contentieux ou de procédure d'encaissement. La responsabilité est proportionnelle au montant non réglé conformément à la jurisprudence applicable.",
      },
      {
        title: "5. Clause de réserve de propriété",
        body: "Jusqu'au paiement intégral du prix, les biens demeurent la propriété exclusive de Dentcare. Nous nous réservons le droit d'utiliser les photos des cas traités à titre pédagogique ou de présentation lors de formations, publications ou sur le site internet du laboratoire, sauf désaccord écrit du client. L'emballage et l'expédition s'effectuent selon les exigences de sécurité conformément à la logistique du laboratoire.",
      },
      {
        title: "6. Garantie légale",
        body: "Conformément à la loi, les produits fournis par DentCare Consultation bénéficient d'une garantie légale. Celle-ci couvre les défauts d'exécution du travail ou les vices cachés relatifs aux articles 1641 et 1648 du code civil. Cette garantie ne s'applique pas à la marchandise livrée au client issues d'une utilisation différente de celle prévue ou en cas de défaut d'entretien.",
      },
      {
        title: "7. Responsabilité et modification des conditions",
        body: "Dentcare se réserve le droit de modifier unilatéralement les conditions tarifaires ou de prise en charge de ses services. Aucune modification de la clause contractuelle intervenue après son acceptation initiale par le client ne peut être effectuée sans accord écrit préalable. La responsabilité civile professionnelle du laboratoire est couverte par une assurance adaptée aux prescriptions légales.",
      },
      {
        title: "8. Clauses particulières et litiges contractuels",
        body: "Toute clause contractuelle complémentaire relative aux conditions spéciales doit faire l'objet d'un accord express et écrit entre les parties. Le client qui refuserait une clause particulière doit formuler ses réserves par écrit. En cas de non-accord, le laboratoire se réserve le droit de refuser la commande ou de proposer une alternative conforme à ses standards de qualité.",
      },
      {
        title: "9. Engagements de qualité et conformité réglementaire",
        body: "Dentcare s'engage à mettre en œuvre des compétences professionnelles et des protocoles de qualité conformément à la Directive 93/42 CEE sur les dispositifs médicaux modifiée et les réglementations nationales applicables. Tous les travaux sont réalisés selon les normes du secteur dentaire en laboratoire interne situé à Hanoï au Vietnam, avec certifications ISO 13485:2016. Le contrôle qualité est effectué selon les procédés validés internes du laboratoire.",
      },
      {
        title: "10. Sous-traitance et responsabilité",
        body: "Dentcare se réserve le droit de confier la réalisation tout ou en partie de ses prestations à un tiers partenaire agréé. Cette sous-traitance ne dégage aucunement Dentcare de ses responsabilités envers le praticien prescripteur ou le patient final. Le laboratoire reste responsable de la qualité et de la conformité globales de la prestation, indépendamment du recours à des prestataires externes.",
      },
      {
        title: "11. Litiges, réclamations et responsabilités",
        body: "En cas de non-exécution ou d'exécution défectueuse de la commande, le client doit notifier du litige à Dentcare par écrit dans un délai de 15 jours à compter de la réception de la marchandise. En cas de commande urgente, le laboratoire doit envoyer une notification de mise en urgence pour permettre au client un examen préalable de la marchandise. En cas de litige majeur, le laboratoire est exempté de responsabilité s'il peut démontrer que l'erreur provient de la prescription défaillante du praticien (impression imprécise, mauvaise prise de dimension, données incomplètes, erreur de diagnostic, etc.). La responsabilité est limitée au prix de la prestation en question exclusive de toute indemnité complémentaire.",
      },
    ],
  },
  en: {
    title: "General Terms and Conditions of Sale",
    intro: "DentCare Consultation",
    sections: [
      {
        title: "1. Applicability of General Conditions",
        body: "These General Terms and Conditions govern all commercial relations between the client and DentCare Consultation. By placing an order and upon delivery, the client acknowledges having reviewed the General Terms and Conditions of Sale and accepts all terms without reservation. No contrary conditions can be applied except by prior written agreement with DentCare.",
      },
      {
        title: "2. Quotations and Orders",
        body: "To obtain a Medical Device Quotation or Measurement (DDMM), a properly completed purchase order must be sent to the laboratory with all necessary technical information. For each Medical Device or Measurement, the order form must include the DDMM number and all specifications. The client cannot make any modification to their purchase order once accepted without prior written consent from DentCare.",
      },
      {
        title: "3. Pricing",
        body: "Contractual prices based on the accepted quotation or as per pricing on the date of delivery apply to the work. For each Medical Device or Measurement (DDMM) to be produced, a properly completed purchase order must be provided at the agreed price. Any revoked or expired quotations are provided for informational purposes only and do not guarantee reproduction or commitment.",
      },
      {
        title: "4. Payment Terms",
        body: "In accordance with Article L.441 of the Commercial Code, any payment delay incurs penalty interest as damages. The client is responsible for reimbursing all actual collection costs incurred by DentCare, including litigation and collection proceedings. Liability is proportional to the outstanding amount in accordance with applicable case law.",
      },
      {
        title: "5. Retention of Title and Intellectual Property",
        body: "Until full payment is received, goods remain the exclusive property of DentCare. We reserve the right to use photographs of treated cases for educational purposes, presentations, training sessions, publications, or on the laboratory's website, unless the client objects in writing. Packaging and shipping are carried out according to safety requirements and laboratory logistics standards.",
      },
      {
        title: "6. Legal Warranty and Product Liability",
        body: "In accordance with law, products supplied by DentCare Consultation come with legal warranty covering defects in workmanship or latent defects related to Articles 1641 and 1648 of the Civil Code. This warranty does not apply to delivered goods resulting from use other than intended or due to lack of maintenance or improper handling.",
      },
      {
        title: "7. Responsibility and Modification of Terms",
        body: "DentCare reserves the right to unilaterally modify tariff conditions or service coverage. No modification to contractual terms made after initial client acceptance can be made without prior written agreement. The laboratory's professional liability is covered by appropriate insurance compliant with legal requirements.",
      },
      {
        title: "8. Special Clauses and Contractual Disputes",
        body: "Any additional contractual clause relating to special conditions must be expressly agreed upon in writing by both parties. Any client objecting to a particular clause must submit their reservations in writing. In case of disagreement, the laboratory reserves the right to refuse the order or propose an alternative that meets its quality standards.",
      },
      {
        title: "9. Quality Commitments and Regulatory Compliance",
        body: "DentCare commits to implementing professional expertise and quality protocols in accordance with Directive 93/42 EEC on medical devices as amended and applicable national regulations. All work is performed according to dental industry standards in the laboratory located in Hanoi, Vietnam, with ISO 13485:2016 certification. Quality control is performed according to the laboratory's validated internal procedures.",
      },
      {
        title: "10. Subcontracting and Responsibility",
        body: "DentCare reserves the right to have all or part of its services performed by approved third-party partners. This subcontracting in no way relieves DentCare of its responsibilities to the prescribing practitioner or end patient. The laboratory remains responsible for the overall quality and compliance of the service, regardless of third-party involvement.",
      },
      {
        title: "11. Disputes, Claims, and Liabilities",
        body: "In case of non-execution or defective execution of an order, the client must notify DentCare of the dispute in writing within 15 days of receiving the goods. For urgent orders, the laboratory must send an urgent notification to allow the client preliminary inspection. In case of major dispute, the laboratory is exempt from liability if it can demonstrate that the error results from the practitioner's prescription failure (imprecise impression, incorrect measurements, incomplete data, diagnostic error, etc.). Liability is limited to the price of the service in question, excluding any additional compensation.",
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
