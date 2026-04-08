import dynamic from "next/dynamic";
import Header from "@/components/Header/Header";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

const AboutUs = dynamic(() => import("@/components/AboutUs/AboutUs"));
const Products = dynamic(() => import("@/components/Products/Products"));
const ClinicalCases = dynamic(() => import("@/components/ClinicalCases/ClinicalCases"));
const Organization = dynamic(() => import("@/components/Organization/Organization"));
const FAQ = dynamic(() => import("@/components/FAQ/FAQ"));
const Contact = dynamic(() => import("@/components/Contact/Contact"));

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <AboutUs />
        <Products />
        <ClinicalCases />
        <Organization />
        <FAQ />
        <Contact />
      </main>
      <ScrollToTop />
    </>
  );
}
