import Header from "@/components/Header/Header";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import AboutUs from "@/components/AboutUs/AboutUs";
import Products from "@/components/Products/Products";
import ClinicalCases from "@/components/ClinicalCases/ClinicalCases";
import Organization from "@/components/Organization/Organization";
import Contact from "@/components/Contact/Contact";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

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
        <Contact />
      </main>
      <ScrollToTop />
      <CookieBanner />
    </>
  );
}
