import type { Metadata } from "next";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "DentCare Consultation",
  description: "Laboratoire spécialisé en Esthétique et Implantologie",
  openGraph: {
    title: "DentCare Consultation — Dental Prosthetics Laboratory",
    description: "Laboratory specialized in Aesthetics and Implantology. Over 30 years of experience.",
    url: "https://dentcare-pi.vercel.app",
    siteName: "DentCare Consultation",
    images: [
      {
        url: "https://dentcare-pi.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DentCare Consultation - Dental Prosthetics Laboratory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DentCare Consultation",
    description: "Dental Prosthetics Laboratory in Bordeaux & Hanoi",
    images: ["https://dentcare-pi.vercel.app/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>): React.ReactElement {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://dentcare-pi.vercel.app",
    "name": "DentCare Consultation",
    "url": "https://dentcare-pi.vercel.app",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dentcare-pi.vercel.app/logo-light.svg",
      "width": 512,
      "height": 512
    },
    "description": "Laboratory specialized in Aesthetics and Implantology with over 30 years of experience and ISO 13485 certification",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "29 Rue de Cursol",
        "addressLocality": "Bordeaux",
        "postalCode": "33000",
        "addressCountry": "FR"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "25D3AA Vuon Dao Villa",
        "addressLocality": "Hanoi",
        "postalCode": "100000",
        "addressCountry": "VN"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+33-6-78-09-47-49",
      "availableLanguage": ["en", "fr", "vi"]
    },
    "areaServed": ["FR", "VN", "EU"],
    "knowsAbout": [
      "Dental Prosthetics",
      "Implantology",
      "Aesthetic Dentistry",
      "CAD/CAM Design",
      "3D Printing",
      "Zirconia Manufacturing"
    ],
    "certifications": "ISO 13485:2016 - Medical Devices Quality Management Systems"
  };

  return (
    <html suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body suppressHydrationWarning className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
