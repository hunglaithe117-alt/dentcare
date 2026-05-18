<?php
/**
 * Static DentCare content and media mappings.
 *
 * @package DentCare
 */

if (!defined('ABSPATH')) {
    exit;
}

function dentcare_messages(string $locale = ''): array
{
    static $cache = [];
    $locale = in_array($locale, ['fr', 'en'], true) ? $locale : dentcare_current_locale();
    if (isset($cache[$locale])) {
        return $cache[$locale];
    }

    $file = DENTCARE_THEME_DIR . '/assets/data/' . $locale . '.json';
    $json = is_readable($file) ? file_get_contents($file) : '{}';
    $cache[$locale] = json_decode((string) $json, true) ?: [];
    return $cache[$locale];
}

function dentcare_t(string $key, string $locale = '', $fallback = ''): string
{
    $value = dentcare_messages($locale);
    foreach (explode('.', $key) as $segment) {
        if (!is_array($value) || !array_key_exists($segment, $value)) {
            return is_string($fallback) ? $fallback : '';
        }
        $value = $value[$segment];
    }
    return is_scalar($value) ? (string) $value : '';
}

function dentcare_data_get(string $key, string $locale = '', $fallback = [])
{
    $value = dentcare_messages($locale);
    foreach (explode('.', $key) as $segment) {
        if (!is_array($value) || !array_key_exists($segment, $value)) {
            return $fallback;
        }
        $value = $value[$segment];
    }
    return $value;
}

function dentcare_meta(string $locale, string $view = 'home'): array
{
    $meta = [
        'fr' => [
            'home' => [
                'title' => 'DentCare Consultation — Laboratoire Prothèse Dentaire Bordeaux',
                'description' => "Laboratoire spécialisé en Esthétique et Implantologie. Plus de 30 ans d'expérience. Production certifiée ISO 13485. Bordeaux & Hanoï.",
            ],
            'legal-info' => [
                'title' => 'Informations légales — DentCare Consultation',
                'description' => 'Informations légales de DentCare Consultation SASU.',
            ],
            'terms-and-conditions' => [
                'title' => 'Conditions Générales de Vente — DentCare Consultation',
                'description' => 'Conditions générales de vente de DentCare Consultation.',
            ],
        ],
        'en' => [
            'home' => [
                'title' => 'DentCare Consultation — Dental Prosthetics Laboratory Bordeaux',
                'description' => 'Laboratory specialized in Aesthetics and Implantology. Over 30 years of experience. ISO 13485 certified production. Bordeaux & Hanoi.',
            ],
            'legal-info' => [
                'title' => 'Legal Information — DentCare Consultation',
                'description' => 'Legal information for DentCare Consultation SASU.',
            ],
            'terms-and-conditions' => [
                'title' => 'General Terms of Sale — DentCare Consultation',
                'description' => 'General terms and conditions of sale for DentCare Consultation.',
            ],
        ],
    ];

    return $meta[$locale][$view] ?? $meta[$locale]['home'] ?? $meta['fr']['home'];
}

function dentcare_schema(): array
{
    return [
        '@context' => 'https://schema.org',
        '@type' => 'MedicalOrganization',
        'medicalSpecialty' => 'Dentist',
        '@id' => home_url('/'),
        'name' => 'DentCare Consultation',
        'url' => home_url('/'),
        'logo' => dentcare_asset('logo-light.svg'),
        'description' => 'Laboratoire spécialisé en Esthétique et Implantologie. Plus de 30 ans d\'expérience. Production certifiée ISO 13485. Bordeaux & Hanoï.',
        'address' => [
            [
                '@type' => 'PostalAddress',
                'streetAddress' => '29 Rue de Cursol',
                'addressLocality' => 'Bordeaux',
                'postalCode' => '33000',
                'addressCountry' => 'FR',
                'addressRegion' => 'Nouvelle-Aquitaine',
            ],
            [
                '@type' => 'PostalAddress',
                'streetAddress' => '25D3AA Vuon Dao Villa',
                'addressLocality' => 'Hanoi',
                'postalCode' => '100000',
                'addressCountry' => 'VN',
            ],
        ],
        'geo' => [
            '@type' => 'GeoCoordinates',
            'latitude' => '44.8378',
            'longitude' => '-0.5792',
        ],
        'openingHoursSpecification' => [
            [
                '@type' => 'OpeningHoursSpecification',
                'dayOfWeek' => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                'opens' => '09:00',
                'closes' => '18:00',
            ],
        ],
        'priceRange' => '$$',
        'contactPoint' => [
            '@type' => 'ContactPoint',
            'contactType' => 'Customer Service',
            'telephone' => '+33-6-78-09-47-49',
            'availableLanguage' => ['en', 'fr', 'vi'],
        ],
        'areaServed' => ['FR', 'VN', 'EU'],
        'knowsAbout' => ['Dental Prosthetics', 'Implantology', 'Aesthetic Dentistry', 'CAD/CAM Design', '3D Printing', 'Zirconia Manufacturing'],
        'hasOfferCatalog' => [
            '@type' => 'OfferCatalog',
            'name' => 'Dental Services',
            'itemListElement' => [
                [
                    '@type' => 'Offer',
                    'itemOffered' => [
                        '@type' => 'Service',
                        'name' => 'Couronnes Dentaires',
                        'category' => 'Couronnes',
                    ],
                ],
                [
                    '@type' => 'Offer',
                    'itemOffered' => [
                        '@type' => 'Service',
                        'name' => 'Facettes',
                        'category' => 'Esthétique',
                    ],
                ],
                [
                    '@type' => 'Offer',
                    'itemOffered' => [
                        '@type' => 'Service',
                        'name' => 'Implantologie',
                        'category' => 'Implants',
                    ],
                ],
                [
                    '@type' => 'Offer',
                    'itemOffered' => [
                        '@type' => 'Service',
                        'name' => 'Prothèses Amovibles',
                        'category' => 'Removable',
                    ],
                ],
            ],
        ],
        'certifications' => 'ISO 13485:2016 - Medical Devices Quality Management Systems',
    ];
}

function dentcare_products(): array
{
    return [
        'categories' => ['crowns', 'veneers', 'implants', 'removable'],
        'keys' => [
            'crowns' => ['zirconeMonolithic', 'zirconeStratified', 'ccm', 'inlayCore'],
            'veneers' => ['waxup', 'stratifiedVeneer', 'monolithicVeneer'],
            'implants' => ['screwRetained', 'cemented', 'allOn'],
            'removable' => ['metalFrame', 'biosoft', 'conventionalResin', 'attachementPrecision'],
        ],
        'images' => [
            'crowns' => [
                'zirconeMonolithic' => ['images/wetransfer/pict 7 zircone Monolithique/IMG_1410.jpg'],
                'zirconeStratified' => [
                    'images/wetransfer/Pict 8 Zircone Stratifiee/PHOTO-2026-03-15-07-58-24.jpg',
                    'images/wetransfer/Pict 8 Zircone Stratifiee/PHOTO-2026-03-15-08-00-47.jpg',
                    'images/wetransfer/Pict 8 Zircone Stratifiee/PHOTO-2026-03-15-08-44-16.jpg',
                ],
                'ccm' => [
                    'images/wetransfer/Pict 9 CCM/PHOTO-2026-03-15-08-39-23.jpg',
                    'images/wetransfer/Pict 9 CCM/PHOTO-2026-03-15-08-48-36.jpg',
                ],
                'inlayCore' => ['images/wetransfer/pict 10 inlay-core/inlay-core.png'],
            ],
            'veneers' => [
                'waxup' => [
                    'images/wetransfer/Pict 13  Diagnostic wax  up/PHOTO-2026-03-15-08-01-26.jpg',
                    'images/wetransfer/Pict 13  Diagnostic wax  up/a7f225e8-4fcf-4ea7-b975-2ee801dfc8bc.jpg',
                    'images/wetransfer/Pict 13  Diagnostic wax  up/d2243eb2-03e6-4acc-99df-7b9b28a9c8bd.jpg',
                    'images/wetransfer/Pict 13  Diagnostic wax  up/fbd6874d-c143-459e-a27a-48f8cf54758d.jpg',
                ],
                'stratifiedVeneer' => [
                    'images/wetransfer/pict 12 Facettes stratifiees/IMG_5508.jpg',
                    'images/wetransfer/pict 12 Facettes stratifiees/IMG_5512 2.jpg',
                    'images/wetransfer/pict 12 Facettes stratifiees/PHOTO-2026-03-15-08-41-17.jpg',
                ],
                'monolithicVeneer' => [
                    'images/wetransfer/Pict 11 Facette emax/facette-emax.png',
                    'images/wetransfer/Pict 11 Facette emax/PHOTO-2026-03-15-08-36-20.jpg',
                    'images/wetransfer/Pict 11 Facette emax/PHOTO-2026-03-15-08-38-03.jpg',
                    'images/wetransfer/Pict 11 Facette emax/PHOTO-2026-03-15-08-38-52.jpg',
                ],
            ],
            'implants' => [
                'screwRetained' => [
                    'images/wetransfer/Pict 14 solution transvissee/IMG_9296.jpg',
                    'images/wetransfer/Pict 14 solution transvissee/PHOTO-2026-03-15-07-59-13.jpg',
                    'images/wetransfer/Pict 14 solution transvissee/PHOTO-2026-03-15-07-59-58.jpg',
                    'images/wetransfer/Pict 14 solution transvissee/PHOTO-2026-03-15-08-00-07.jpg',
                    'images/wetransfer/Pict 14 solution transvissee/PHOTO-2026-03-15-08-49-09.jpg',
                ],
                'cemented' => [
                    'images/wetransfer/Pict 15 Solution Scellee/PHOTO-2026-03-15-07-56-11.jpg',
                    'images/wetransfer/Pict 15 Solution Scellee/PHOTO-2026-03-15-07-56-22.jpg',
                ],
                'allOn' => [
                    'images/wetransfer/Pict 16 All on/IMG_0743.jpg',
                    'images/wetransfer/Pict 16 All on/PHOTO-2026-03-15-07-55-19.jpg',
                    'images/wetransfer/Pict 16 All on/PHOTO-2026-03-15-07-56-02.jpg',
                    'images/wetransfer/Pict 16 All on/PHOTO-2026-03-15-08-02-22.jpg',
                ],
            ],
            'removable' => [
                'metalFrame' => [
                    'images/products/removable/pict-1662.jpg',
                    'images/wetransfer/Pict 17 Chassis/PHOTO-2026-03-15-07-56-37.jpg',
                    'images/wetransfer/Pict 17 Chassis/PHOTO-2026-03-15-07-56-47.jpg',
                ],
                'biosoft' => [
                    'images/products/removable/pict-1512.jpg',
                    'images/wetransfer/Pict 18 resine flex/PHOTO-2026-03-24-14-34-39.jpg',
                    'images/wetransfer/Pict 18 resine flex/PHOTO-2026-03-24-14-34-28.jpg',
                ],
                'conventionalResin' => [
                    'images/wetransfer/Pict 19 Resine/resine-conventionnelle.png',
                    'images/products/removable/pict-1670.jpg',
                ],
                'attachementPrecision' => [
                    'images/wetransfer/pict 20 Attachement de precision/PHOTO-2026-03-15-07-57-21.jpg',
                    'images/wetransfer/pict 20 Attachement de precision/PHOTO-2026-03-15-07-57-37.jpg',
                ],
            ],
        ],
    ];
}

function dentcare_brand_groups(): array
{
    return [
        'materials' => [
            ['name' => 'Material 1', 'src' => 'images/wetransfer/Logo Matiere Premiere/IMG_1539.jpg'],
            ['name' => 'Material 2', 'src' => 'images/wetransfer/Logo Matiere Premiere/IMG_1540.jpg'],
            ['name' => 'Material 3', 'src' => 'images/wetransfer/Logo Matiere Premiere/IMG_1541.jpg'],
            ['name' => 'Material 4', 'src' => 'images/wetransfer/Logo Matiere Premiere/IMG_1542.jpg'],
            ['name' => 'Material 5', 'src' => 'images/wetransfer/Logo Matiere Premiere/IMG_1543.jpg'],
            ['name' => 'Material 6', 'src' => 'images/wetransfer/Logo Matiere Premiere/IMG_1546.jpg'],
            ['name' => 'Material 7', 'src' => 'images/wetransfer/Logo Matiere Premiere/IMG_1589.jpg'],
            ['name' => 'Material 8', 'src' => 'images/wetransfer/Logo Matiere Premiere/IMG_1590.jpg'],
            ['name' => 'Material 9', 'src' => 'images/wetransfer/Logo Matiere Premiere/IMG_1591.jpg'],
        ],
        'digitalFlow' => [
            ['name' => 'Camera 1', 'src' => 'images/wetransfer/Logo camera 3D/IMG_1547.jpg'],
            ['name' => 'Camera 2', 'src' => 'images/wetransfer/Logo camera 3D/IMG_1586.jpg'],
            ['name' => 'Camera 3', 'src' => 'images/wetransfer/Logo camera 3D/IMG_1587.jpg'],
            ['name' => 'Camera 4', 'src' => 'images/wetransfer/Logo camera 3D/IMG_1588.jpg'],
        ],
        'toothChoices' => [
            ['name' => 'Ivoclar Vivadent', 'src' => 'images/brands/tooth-choice/ivoclar-vivadent.jpg'],
            ['name' => 'Triumph Dental', 'src' => 'images/brands/tooth-choice/triumph-dental.jpg'],
        ],
    ];
}

function dentcare_gallery(): array
{
    return [
        'collections' => [
            [
                'id' => 'bridge-colle',
                'titleKey' => 'caseCategoryBridge',
                'imageSrcs' => [
                    'images/gallery/bridge-colle/avant-apres-10.png',
                    'images/gallery/bridge-colle/img-2595.jpg',
                ],
            ],
            [
                'id' => 'levitation',
                'titleKey' => 'caseCategoryLevitation',
                'imageSrcs' => [
                    'images/gallery/levitation/avant-apres-9.png',
                    'images/gallery/levitation/facette-levitation.jpg',
                    'images/gallery/levitation/img-2278.jpg',
                    'images/gallery/levitation/img-2582.jpg',
                ],
            ],
            [
                'id' => 'man',
                'titleKey' => 'caseCategoryMan',
                'imageSrcs' => [
                    'images/gallery/man/avant-apres-4.png',
                    'images/gallery/man/avant-apres-6.png',
                    'images/gallery/man/1000009150.jpg',
                    'images/gallery/man/1000009616.jpg',
                    'images/gallery/man/img-2765.jpg',
                    'images/gallery/man/img-2786.jpg',
                    'images/gallery/man/img-2787-2.jpg',
                ],
            ],
            [
                'id' => 'technique',
                'titleKey' => 'caseCategoryTechnique',
                'imageSrcs' => [
                    'images/gallery/technique/1000009144.jpg',
                    'images/gallery/technique/img-7793.jpg',
                ],
            ],
        ],
        'standalone' => [
            'images/gallery/standalone/1.png',
            'images/gallery/standalone/2.png',
            'images/gallery/standalone/3.png',
            'images/gallery/standalone/4.png',
            'images/gallery/standalone/5.jpg',
            'images/gallery/standalone/6.jpg',
            'images/gallery/standalone/7.jpg',
        ],
    ];
}

function dentcare_hero_images(): array
{
    return [
        'images/wetransfer/Pict 1 presentation/IMG_9271.jpg',
        'images/wetransfer/Pict 1 presentation/IMG_9279.jpg',
        'images/wetransfer/Pict 1 presentation/IMG_9280.jpg',
        'images/wetransfer/Pict 1 presentation/PHOTO-2026-03-15-08-02-51.jpg',
        'images/wetransfer/Pict 1 presentation/PHOTO-2026-03-15-08-03-08.jpg',
    ];
}

function dentcare_shipping_partners(): array
{
    return [
        ['name' => 'DHL', 'logoSrc' => 'images/wetransfer/Logo livraison dans toute la france/IMG_1628.jpg'],
        ['name' => 'Chronopost', 'logoSrc' => 'images/wetransfer/Logo livraison dans toute la france/IMG_1629.jpg'],
        ['name' => 'TNT / FedEx', 'logoSrc' => 'images/wetransfer/Logo livraison dans toute la france/IMG_1630.jpg'],
        ['name' => 'Deliverbag', 'logoSrc' => 'images/wetransfer/Logo livraison dans toute la france/IMG_1631.jpg', 'href' => 'https://www.deliverbag.com'],
    ];
}

function dentcare_partner_logos(): array
{
    return [
        ['src' => 'images/brands/dentaurum-client.jpg', 'alt' => 'Dentaurum'],
        ['src' => 'images/brands/ivoclar-client.jpg', 'alt' => 'Ivoclar'],
        ['src' => 'images/brands/gc-client.jpg', 'alt' => 'GC'],
        ['src' => 'images/brands/upcera-client.jpg', 'alt' => 'Upcera'],
        ['src' => 'images/brands/emax-client.jpg', 'alt' => 'IPS e.max'],
        ['src' => 'images/brands/erkodent-client.jpg', 'alt' => 'Erkodent'],
    ];
}

function dentcare_policy_details(string $locale = ''): array
{
    $locale = in_array($locale, ['fr', 'en'], true) ? $locale : dentcare_current_locale();
    $details = [
        'fr' => [
            'traceability' => "Traçabilité complète des dispositifs et matières premières selon les procédures internes de suivi et d'archivage.",
            'market' => 'Mise sur le marché conforme au cadre réglementaire applicable, avec contrôle documentaire à chaque étape.',
            'warranty' => 'Garantie de conformité sur les restaurations livrées selon les protocoles du laboratoire et les indications cliniques.',
            'terms' => 'Consultez les conditions générales de vente pour le cadre contractuel, les délais, la facturation et le service après-vente.',
        ],
        'en' => [
            'traceability' => 'Full traceability for devices and raw materials through documented production and archiving workflows.',
            'market' => 'Market release process aligned with applicable regulatory requirements and documentation checks.',
            'warranty' => 'Conformity warranty for delivered restorations according to laboratory protocols and clinical indications.',
            'terms' => 'Read the general terms of sale for contractual scope, timelines, billing conditions and after-sales service.',
        ],
    ];

    return $details[$locale] ?? $details['fr'];
}

function dentcare_legal_content(string $locale = ''): array
{
    $locale = in_array($locale, ['fr', 'en'], true) ? $locale : dentcare_current_locale();
    $content = [
        'fr' => [
            'title' => 'Informations légales',
            'intro' => 'Le contenu officiel sera remplacé après réception du document validé par le client.',
            'items' => [
                'Raison sociale: Dentcare Consultation SASU',
                'Adresse: 29 Rue de Cursol 33000 Bordeaux',
                'RCS Bordeaux: 832 04 30574',
                'TVA: FR52 832043574',
                'Contact: olivier@dentcare-consultation.com',
            ],
        ],
        'en' => [
            'title' => 'Legal Information',
            'intro' => 'The official legal document will be replaced once the client provides the final approved version.',
            'items' => [
                'Company: Dentcare Consultation SASU',
                'Address: 29 Rue de Cursol 33000 Bordeaux',
                'RCS Bordeaux: 832 04 30574',
                'VAT: FR52 832043574',
                'Contact: olivier@dentcare-consultation.com',
            ],
        ],
    ];

    return $content[$locale] ?? $content['fr'];
}

function dentcare_terms_content(string $locale = ''): array
{
    $locale = in_array($locale, ['fr', 'en'], true) ? $locale : dentcare_current_locale();
    $content = [
        'fr' => [
            'title' => 'CONDITIONS GENERALES DE VENTE',
            'intro' => 'DentCare Consultation',
            'sections' => [
                ['title' => '1. Opposabilités des conditions générales', 'body' => "En passant commande auprès de DentCare Consultation, notamment par l'envoi d'empreinte dentaire accompagne d'un bon de commande ou d'une prescription, le client reconnaît avoir préalablement pris connaissance des Conditions Générales de ventes et les avoir acceptées sans restriction."],
                ['title' => '2. COMMANDES DU PRATICIEN', 'body' => "Pour chaque Dispositif Médical Sur Mesure (DMSM) à réaliser, un bon de commande dûment rempli devra être remis au laboratoire avec les empreintes. Il précisera obligatoirement la nature du DMSM à réaliser, les références du patient, la nature des matériaux à utiliser, la teinte, le type morphologique du patient, l'âge, le sexe et la date de livraison souhaitée. Le praticien garantit l'hygiène et l'asepsie des empreintes et travaux délivrés. Il s'engage à accepter les essayages que nous serons amenés à lui demander. Le laboratoire est libéré de son obligation d'exécuter les commandes lors de la survenance d'évènements de force majeure rendant impossible toute livraison. Constituent, notamment, des cas de force majeure : grèves, incendies, accidents, incidents techniques, intempéries ou tout autre fait similaire."],
                ['title' => '3. Prix', 'body' => "Nos prix sont facturés sur la base des tarifs en vigueur au jour de la livraison ou sur la base du devis accepté lorsqu'il s'agit de travaux complexes. Les tarifs sont révisables au 1er janvier de chaque année ou suivant les conditions économiques. Nos prix sont exonérés de TVA (CGI art.261, 4-1°)."],
                ['title' => '4. CONDITIONS DE PAIEMENT', 'body' => "Sauf stipulation contraire, nos factures sont payables au comptant sans escompte. Il pourra être exigé le versement d'une provision. Conformément à l'article L 441-6 du code de commerce, tout retard dans les paiements entraîne de plein droit, et sans mise en demeure préalable, le paiement d'intérêts de retard fixés à une fois et demie le taux légal applicable. En cas de retard de paiement, nous nous préservons la faculté de suspendre ou d'annuler les ordres en cours sans préjudice de tous autres recours."],
                ['title' => '5. CLAUSE DE RESERVE DE PROPRIETE', 'body' => "La vente n'est parfaite qu'après complet paiement du prix. Nous nous réservons le droit d'exiger la restitution des éléments prothétiques livrés tant qu'ils ne sont pas posés définitivement en bouche. En cas de désaccord, seule l'ordonnance de référé rendue par M. le Président du Tribunal de Grande Instance sera prise en considération."],
                ['title' => '6. GARANTIE LEGALE', 'body' => "Nous sommes tenus de la garantie des défauts non apparents de la chose vendue, dans les conditions des articles 1641 et suivants du Code Civil étant rappelé qu'entre professionnels appartenant à des spécialités complémentaires, le vendeur n'est pas tenu à garantie lorsque l'acheteur a eu connaissance au moment de la vente, du vice dont la chose était affectée. Il est formellement convenu en outre, que nous serons exonérés de toute garantie à raison des vices non apparents de la chose vendue, ayant leur origine dans un défaut d'objectivité de l'empreinte, une erreur de diagnostic, d'essayage ou de pose, ou dans une modification de la chose intervenue après son achèvement et sa livraison définitive, par notre laboratoire."],
                ['title' => '7. GARANTIE CONVENTIONNELLE', 'body' => "Le travail devra être considéré comme achevé, dès lors que le praticien, après tous les essayages, a demandé au prothésiste dentaire de le terminer. Après réception du travail terminé, nous garantissons les vices non apparents de la chose vendue pendant trois années à compter de son achèvement, excepté les provisoires pour lesquels la garantie est de six mois. Aucune garantie n'est due lorsque le vice est dû à une imprudence de l'utilisateur, à une cause étrangère ou à une évolution morphologique ou physiologique."],
                ['title' => '8. CLAUSES PARTICULIERES', 'body' => "Les travaux exécutés sur implants et ceux pour lesquels un avis contraire aura été émis par le laboratoire de prothèse dentaire au cours de la fabrication ne sauraient engager la responsabilité du dit laboratoire."],
                ['title' => '9. ENGAGEMENTS DE QUALITE', 'body' => "Nous nous engageons à n'employer que des matières premières et fournitures de qualité, en conformité avec la Directive 93/42 en l'absence de spécification. Nous garantissons l'hygiène du DMSM délivré, mais celui-ci reste un DMSM non stérile."],
                ['title' => '10. SOUS-TRAITANCE', 'body' => 'Tout ou partie de la réalisation des processus de fabrication sont réalisés à l’étranger au Vietnam.'],
                ['title' => '11. GAMMES', 'body' => "Serenity + cette gamme comprend :\nSélection rigoureuse des Matières Premières ( Ivoclar, Dentaurum, Dental Direkt).\nRespect des processus et des protocoles de fabrication.\nTraçabilité complète de chaque prothèse.\nResponsabilité et declaration de mise sur le marché assuré par DentCare Consultation.\nStructure/ Armature/ brut d'usinage, brut de pressée réalisé en sous-traitance au Vietnam.\nDernière ouvraison substantielle réalisée en France.\nContrôle Qualité réalisé en France.\n\nSerenity cette gamme comprend :\nSélection rigoureuse des Matières Premières ( Ivoclar, Dentaurum, Dental Direkt).\nRespect des processus et des protocoles de fabrication.\nTraçabilité complète de chaque prothèse.\nResponsabilité et declaration de mise sur le marché assuré par DentCare Consultation.\nProcessus de fabrication réalisé au Vietnam.\nContrôle Qualité réalisé au Vietnam."],
                ['title' => '12. LIVRAISONS', 'body' => "Les livraisons sont effectuées par remise directe des produits au client, en colis clos par le laboratoire, par un expéditeur ou un transporteur au cabinet du client. Frais de participation de 15 euros, franco de port à partir de 240 euros de commandes. Les délais de fabrication et de livraison sont de 14 jours à partir de la date de prise de l'empreinte. Toutefois en cas de commande particulière, un délai supplémentaire peut être demandé au client. En cas de commande urgente, le laboratoire peut envisager une livraison plus rapide avec une majoration tarifaire. Les livraisons sont effectuées dans les locaux du client qui s'oblige à les réceptionner. Dans le cas où le client exigerait le dépôt du ou des colis autre que dans ses locaux, sans réception de sa part, sera, dans tous les cas (fait dommageable quelconque, incident ou accident de toute nature) et de convention expresse, inopposable au laboratoire, qui se dégage de toute responsabilité. Les délais de fabrication et de livraison sont donnés à titre purement indicatif et n'engage en aucun cas le laboratoire."],
            ],
        ],
        'en' => [
            'title' => 'GENERAL TERMS AND CONDITIONS OF SALE',
            'intro' => 'DentCare Consultation',
            'sections' => [
                ['title' => '1. Enforceability of the General Terms', 'body' => 'By placing an order with DentCare Consultation, notably by sending a dental impression accompanied by an order form or prescription, the client acknowledges having read the General Terms and Conditions of Sale in advance and accepts them without restriction.'],
                ['title' => '2. PRACTITIONER ORDERS', 'body' => "For each custom-made medical device (DMSM) to be produced, a duly completed order form must be submitted to the laboratory together with the impressions. It must specify the type of DMSM to be produced, patient references, materials to be used, shade, the patient's morphological type, age, sex, and requested delivery date. The practitioner guarantees hygiene and aseptic handling of submitted impressions and delivered work. The practitioner agrees to accept any try-ins that we may request. The laboratory is released from its obligation to fulfill orders in the event of force majeure making delivery impossible. Force majeure includes, in particular: strikes, fires, accidents, technical incidents, severe weather, or any similar event."],
                ['title' => '3. Prix', 'body' => 'Our prices are billed based on the rates in effect on the day of delivery or on the accepted quotation in the case of complex work. Rates are subject to revision on January 1 of each year or according to economic conditions. Our prices are VAT-exempt (French Tax Code, CGI art.261, 4-1 deg).'],
                ['title' => '4. PAYMENT TERMS', 'body' => 'Unless otherwise stipulated, our invoices are payable in full and without discount. A deposit may be required. In accordance with Article L 441-6 of the French Commercial Code, any late payment automatically gives rise, without prior formal notice, to late-payment interest set at one and a half times the applicable legal rate. In the event of late payment, we reserve the right to suspend or cancel ongoing orders, without prejudice to any other remedies.'],
                ['title' => '5. RETENTION OF TITLE CLAUSE', 'body' => 'The sale is final only after full payment of the price. We reserve the right to require the return of delivered prosthetic elements as long as they have not been permanently placed in the mouth. In the event of disagreement, only an interim order issued by the President of the Tribunal de Grande Instance shall be considered.'],
                ['title' => '6. LEGAL WARRANTY', 'body' => 'We are bound by warranty for non-apparent defects of the sold item, under the conditions of Articles 1641 and following of the French Civil Code. It is recalled that between professionals in complementary specialties, the seller is not bound by warranty when the buyer was aware at the time of sale of the defect affecting the item. It is also expressly agreed that we are exempt from any warranty for hidden defects originating from lack of objectivity in the impression, diagnostic error, try-in or fitting error, or modification of the item after completion and final delivery by our laboratory.'],
                ['title' => '7. CONTRACTUAL WARRANTY', 'body' => 'Work shall be considered completed when the practitioner, after all try-ins, has asked the dental technician to finalize it. After receipt of the completed work, we warrant non-apparent defects of the sold item for three years from completion, except for temporary prostheses, for which the warranty period is six months. No warranty is due when the defect results from user negligence, an external cause, or morphological or physiological evolution.'],
                ['title' => '8. SPECIAL CLAUSES', 'body' => 'Work performed on implants, and work for which a contrary opinion was issued by the dental prosthetics laboratory during manufacturing, shall not engage the liability of said laboratory.'],
                ['title' => '9. QUALITY COMMITMENTS', 'body' => 'We undertake to use only quality raw materials and supplies, in compliance with Directive 93/42 in the absence of specific instructions. We guarantee the hygiene of the delivered DMSM; however, it remains a non-sterile DMSM.'],
                ['title' => '10. SUBCONTRACTING', 'body' => 'All or part of the manufacturing process is carried out abroad in Vietnam.'],
                ['title' => '11. PRODUCT RANGES', 'body' => "Serenity + this range includes:\nRigorous selection of raw materials (Ivoclar, Dentaurum, Dental Direkt).\nCompliance with manufacturing processes and protocols.\nFull traceability of each prosthesis.\nResponsibility and declaration of market release ensured by DentCare Consultation.\nStructure/framework/milling blank/pressed blank produced through subcontracting in Vietnam.\nFinal substantial finishing performed in France.\nQuality control performed in France.\n\nSerenity this range includes:\nRigorous selection of raw materials (Ivoclar, Dentaurum, Dental Direkt).\nCompliance with manufacturing processes and protocols.\nFull traceability of each prosthesis.\nResponsibility and declaration of market release ensured by DentCare Consultation.\nManufacturing process carried out in Vietnam.\nQuality control carried out in Vietnam."],
                ['title' => '12. DELIVERIES', 'body' => "Deliveries are made by direct handover of products to the client, in sealed packages by the laboratory, by a sender or carrier to the client's practice. Participation fee: 15 euros; free shipping from 240 euros of orders. Manufacturing and delivery lead times are 14 days from the date the impression is taken. However, for special orders, an additional delay may be requested from the client. For urgent orders, the laboratory may consider faster delivery with a price surcharge. Deliveries are made to the client's premises, and the client undertakes to receive them. If the client requires that package(s) be left somewhere other than their premises, without reception on their part, then in all cases (any damaging event, incident, or accident of any kind) this shall, by express agreement, be unenforceable against the laboratory, which declines all liability. Manufacturing and delivery times are given for guidance only and in no way bind the laboratory."],
            ],
        ],
    ];

    return $content[$locale] ?? $content['fr'];
}
