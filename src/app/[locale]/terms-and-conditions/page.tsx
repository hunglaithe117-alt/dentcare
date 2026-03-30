interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

const CONTENT = {
  fr: {
    title: "CONDITIONS GENERALES DE VENTE",
    intro: "DentCare Consultation",
    sections: [
      {
        title: "1. Opposabilités des conditions générales",
        body: "En passant commande auprès de DentCare Consultation, notamment par l'envoi d'empreinte dentaire accompagne d'un bon de commande ou d'une prescription, le client reconnaît avoir préalablement pris connaissance des Conditions Générales de ventes et les avoir acceptées sans restriction.",
      },
      {
        title: "2. COMMANDES DU PRATICIEN",
        body: "Pour chaque Dispositif Médical Sur Mesure (DMSM) à réaliser, un bon de commande dûment rempli devra être remis au laboratoire avec les empreintes. Il précisera obligatoirement la nature du DMSM à réaliser, les références du patient, la nature des matériaux à utiliser, la teinte, le type morphologique du patient, l'âge, le sexe et la date de livraison souhaitée. Le praticien garantit l'hygiène et l'asepsie des empreintes et travaux délivrés. Il s'engage à accepter les essayages que nous serons amenés à lui demander. Le laboratoire est libéré de son obligation d'exécuter les commandes lors de la survenance d'évènements de force majeure rendant impossible toute livraison. Constituent, notamment, des cas de force majeure : grèves, incendies, accidents, incidents techniques, intempéries ou tout autre fait similaire.",
      },
      {
        title: "3. Prix",
        body: "Nos prix sont facturés sur la base des tarifs en vigueur au jour de la livraison ou sur la base du devis accepté lorsqu'il s'agit de travaux complexes. Les tarifs sont révisables au 1er janvier de chaque année ou suivant les conditions économiques. Nos prix sont exonérés de TVA (CGI art.261, 4-1°).",
      },
      {
        title: "4. CONDITIONS DE PAIEMENT",
        body: "Sauf stipulation contraire, nos factures sont payables au comptant sans escompte. Il pourra être exigé le versement d'une provision. Conformément à l'article L 441-6 du code de commerce, tout retard dans les paiements entraîne de plein droit, et sans mise en demeure préalable, le paiement d'intérêts de retard fixés à une fois et demie le taux légal applicable. En cas de retard de paiement, nous nous préservons la faculté de suspendre ou d'annuler les ordres en cours sans préjudice de tous autres recours.",
      },
      {
        title: "5. CLAUSE DE RESERVE DE PROPRIETE",
        body: "La vente n'est parfaite qu'après complet paiement du prix. Nous nous réservons le droit d'exiger la restitution des éléments prothétiques livrés tant qu'ils ne sont pas posés définitivement en bouche. En cas de désaccord, seule l'ordonnance de référé rendue par M. le Président du Tribunal de Grande Instance sera prise en considération.",
      },
      {
        title: "6. GARANTIE LEGALE",
        body: "Nous sommes tenus de la garantie des défauts non apparents de la chose vendue, dans les conditions des articles 1641 et suivants du Code Civil étant rappelé qu'entre professionnels appartenant à des spécialités complémentaires, le vendeur n'est pas tenu à garantie lorsque l'acheteur a eu connaissance au moment de la vente, du vice dont la chose était affectée. Il est formellement convenu en outre, que nous serons exonérés de toute garantie à raison des vices non apparents de la chose vendue, ayant leur origine dans un défaut d'objectivité de l'empreinte, une erreur de diagnostic, d'essayage ou de pose, ou dans une modification de la chose intervenue après son achèvement et sa livraison définitive, par notre laboratoire.",
      },
      {
        title: "7. GARANTIE CONVENTIONNELLE",
        body: "Le travail devra être considéré comme achevé, dès lors que le praticien, après tous les essayages, a demandé au prothésiste dentaire de le terminer. Après réception du travail terminé, nous garantissons les vices non apparents de la chose vendue pendant trois années à compter de son achèvement, excepté les provisoires pour lesquels la garantie est de six mois. Aucune garantie n'est due lorsque le vice est dû à une imprudence de l'utilisateur, à une cause étrangère ou à une évolution morphologique ou physiologique.",
      },
      {
        title: "8. CLAUSES PARTICULIERES",
        body: "Les travaux exécutés sur implants et ceux pour lesquels un avis contraire aura été émis par le laboratoire de prothèse dentaire au cours de la fabrication ne sauraient engager la responsabilité du dit laboratoire.",
      },
      {
        title: "9. ENGAGEMENTS DE QUALITE",
        body: "Nous nous engageons à n'employer que des matières premières et fournitures de qualité, en conformité avec la Directive 93/42 en l'absence de spécification. Nous garantissons l'hygiène du DMSM délivré, mais celui-ci reste un DMSM non stérile.",
      },
      {
        title: "10. SOUS-TRAITANCE",
        body: "Tout ou partie de la réalisation des processus de fabrication sont réalisés à l'étranger au Vietnam.",
      },
      {
        title: "11. GAMMES",
        body: "Serenity + cette gamme comprend :\nSélection rigoureuse des Matières Premières ( Ivoclar, Dentaurum, Dental Direkt).\nRespect des processus et des protocoles de fabrication.\nTraçabilité complète de chaque prothèse.\nResponsabilité et declaration de mise sur le marché assuré par DentCare Consultation.\nStructure/ Armature/ brut d'usinage, brut de pressée réalisé en sous-traitance au Vietnam.\nDernière ouvraison substantielle réalisée en France.\nContrôle Qualité réalisé en France.\n\nSerenity cette gamme comprend :\nSélection rigoureuse des Matières Premières ( Ivoclar, Dentaurum, Dental Direkt).\nRespect des processus et des protocoles de fabrication.\nTraçabilité complète de chaque prothèse.\nResponsabilité et declaration de mise sur le marché assuré par DentCare Consultation.\nProcessus de fabrication réalisé au Vietnam.\nContrôle Qualité réalisé au Vietnam.",
      },
      {
        title: "12. LIVRAISONS",
        body: "Les livraisons sont effectuées par remise directe des produits au client, en colis clos par le laboratoire, par un expéditeur ou un transporteur au cabinet du client. Frais de participation de 15 euros, franco de port à partir de 240 euros de commandes. Les délais de fabrication et de livraison sont de 14 jours à partir de la date de prise de l'empreinte. Toutefois en cas de commande particulière, un délai supplémentaire peut être demandé au client. En cas de commande urgente, le laboratoire peut envisager une livraison plus rapide avec une majoration tarifaire. Les livraisons sont effectuées dans les locaux du client qui s'oblige à les réceptionner. Dans le cas où le client exigerait le dépôt du ou des colis autre que dans ses locaux, sans réception de sa part, sera, dans tous les cas (fait dommageable quelconque, incident ou accident de toute nature) et de convention expresse, inopposable au laboratoire, qui se dégage de toute responsabilité. Les délais de fabrication et de livraison sont donnés à titre purement indicatif et n'engage en aucun cas le laboratoire.",
      },
    ],
  },
  en: {
    title: "GENERAL TERMS AND CONDITIONS OF SALE",
    intro: "DentCare Consultation",
    sections: [
      {
        title: "1. Enforceability of the General Terms",
        body: "By placing an order with DentCare Consultation, notably by sending a dental impression accompanied by an order form or prescription, the client acknowledges having read the General Terms and Conditions of Sale in advance and accepts them without restriction.",
      },
      {
        title: "2. PRACTITIONER ORDERS",
        body: "For each custom-made medical device (DMSM) to be produced, a duly completed order form must be submitted to the laboratory together with the impressions. It must specify the type of DMSM to be produced, patient references, materials to be used, shade, the patient's morphological type, age, sex, and requested delivery date. The practitioner guarantees hygiene and aseptic handling of submitted impressions and delivered work. The practitioner agrees to accept any try-ins that we may request. The laboratory is released from its obligation to fulfill orders in the event of force majeure making delivery impossible. Force majeure includes, in particular: strikes, fires, accidents, technical incidents, severe weather, or any similar event.",
      },
      {
        title: "3. Prix",
        body: "Our prices are billed based on the rates in effect on the day of delivery or on the accepted quotation in the case of complex work. Rates are subject to revision on January 1 of each year or according to economic conditions. Our prices are VAT-exempt (French Tax Code, CGI art.261, 4-1 deg).",
      },
      {
        title: "4. PAYMENT TERMS",
        body: "Unless otherwise stipulated, our invoices are payable in full and without discount. A deposit may be required. In accordance with Article L 441-6 of the French Commercial Code, any late payment automatically gives rise, without prior formal notice, to late-payment interest set at one and a half times the applicable legal rate. In the event of late payment, we reserve the right to suspend or cancel ongoing orders, without prejudice to any other remedies.",
      },
      {
        title: "5. RETENTION OF TITLE CLAUSE",
        body: "The sale is final only after full payment of the price. We reserve the right to require the return of delivered prosthetic elements as long as they have not been permanently placed in the mouth. In the event of disagreement, only an interim order issued by the President of the Tribunal de Grande Instance shall be considered.",
      },
      {
        title: "6. LEGAL WARRANTY",
        body: "We are bound by warranty for non-apparent defects of the sold item, under the conditions of Articles 1641 and following of the French Civil Code. It is recalled that between professionals in complementary specialties, the seller is not bound by warranty when the buyer was aware at the time of sale of the defect affecting the item. It is also expressly agreed that we are exempt from any warranty for hidden defects originating from lack of objectivity in the impression, diagnostic error, try-in or fitting error, or modification of the item after completion and final delivery by our laboratory.",
      },
      {
        title: "7. CONTRACTUAL WARRANTY",
        body: "Work shall be considered completed when the practitioner, after all try-ins, has asked the dental technician to finalize it. After receipt of the completed work, we warrant non-apparent defects of the sold item for three years from completion, except for temporary prostheses, for which the warranty period is six months. No warranty is due when the defect results from user negligence, an external cause, or morphological or physiological evolution.",
      },
      {
        title: "8. SPECIAL CLAUSES",
        body: "Work performed on implants, and work for which a contrary opinion was issued by the dental prosthetics laboratory during manufacturing, shall not engage the liability of said laboratory.",
      },
      {
        title: "9. QUALITY COMMITMENTS",
        body: "We undertake to use only quality raw materials and supplies, in compliance with Directive 93/42 in the absence of specific instructions. We guarantee the hygiene of the delivered DMSM; however, it remains a non-sterile DMSM.",
      },
      {
        title: "10. SUBCONTRACTING",
        body: "All or part of the manufacturing process is carried out abroad in Vietnam.",
      },
      {
        title: "11. PRODUCT RANGES",
        body: "Serenity + this range includes:\nRigorous selection of raw materials (Ivoclar, Dentaurum, Dental Direkt).\nCompliance with manufacturing processes and protocols.\nFull traceability of each prosthesis.\nResponsibility and declaration of market release ensured by DentCare Consultation.\nStructure/framework/milling blank/pressed blank produced through subcontracting in Vietnam.\nFinal substantial finishing performed in France.\nQuality control performed in France.\n\nSerenity this range includes:\nRigorous selection of raw materials (Ivoclar, Dentaurum, Dental Direkt).\nCompliance with manufacturing processes and protocols.\nFull traceability of each prosthesis.\nResponsibility and declaration of market release ensured by DentCare Consultation.\nManufacturing process carried out in Vietnam.\nQuality control carried out in Vietnam.",
      },
      {
        title: "12. DELIVERIES",
        body: "Deliveries are made by direct handover of products to the client, in sealed packages by the laboratory, by a sender or carrier to the client's practice. Participation fee: 15 euros; free shipping from 240 euros of orders. Manufacturing and delivery lead times are 14 days from the date the impression is taken. However, for special orders, an additional delay may be requested from the client. For urgent orders, the laboratory may consider faster delivery with a price surcharge. Deliveries are made to the client's premises, and the client undertakes to receive them. If the client requires that package(s) be left somewhere other than their premises, without reception on their part, then in all cases (any damaging event, incident, or accident of any kind) this shall, by express agreement, be unenforceable against the laboratory, which declines all liability. Manufacturing and delivery times are given for guidance only and in no way bind the laboratory.",
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
              <p className="text-neutral-700 whitespace-pre-line">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
