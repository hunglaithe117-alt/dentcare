import type { Metadata } from "next";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "DentCare Consultation",
  description: "Laboratoire spécialisé en Esthétique et Implantologie",
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>): React.ReactElement {
  return (
    <html suppressHydrationWarning>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
