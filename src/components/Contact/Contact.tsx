"use client";

import {
  Check,
  Mail,
  MapPin,
  PhoneCall,
  X
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

const STATICFORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_STATICFORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact(): React.ReactElement {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [activeLocation, setActiveLocation] = useState<"bordeaux" | "hanoi">("bordeaux");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      setStatus("sending");

      try {
        const response = await fetch("https://api.staticforms.xyz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accessKey: STATICFORMS_ACCESS_KEY,
            ...formData,
            subject: "New contact from DentCare Website",
          }),
        });

        if (response.ok) {
          setStatus("success");
          setFormData({ name: "", email: "", phone: "", message: "" });
          setTimeout(() => setStatus("idle"), 5000);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    },
    [formData],
  );

  const ctaButtons = [
    {
      key: "email" as const,
      icon: <Mail className="w-6 h-6 stroke-[1.5]" />,
      href: `mailto:${tFooter("email")}`,
    },
  ];

  return (
    <>
      <section
        id="contact"
        className="py-24 lg:py-32 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-accent-500 font-semibold text-sm tracking-widest uppercase">
              {t("sectionTitle")}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mt-3">
              {t("sectionSubtitle")}
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-stretch">
            {/* Contact Form */}
            <div className="lg:col-span-2 flex flex-col justify-between gap-12">
              <div className="w-full">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 w-full max-w-[600px]"
                >
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-1 w-full">
                      <label
                        htmlFor="contact-name"
                        className="text-[12px] font-medium text-slate-700 uppercase tracking-[0.3px]"
                      >
                        {t("form.name")} *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full h-12 bg-transparent border-b border-slate-400 focus:border-primary-900 outline-none transition-colors text-primary-900 placeholder-slate-300 text-base"
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label
                        htmlFor="contact-email"
                        className="text-[12px] font-medium text-slate-700 uppercase tracking-[0.3px]"
                      >
                        {t("form.email")} *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full h-12 bg-transparent border-b border-slate-400 focus:border-primary-900 outline-none transition-colors text-primary-900 placeholder-slate-300 text-base"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="contact-phone"
                      className="text-[12px] font-medium text-slate-700 uppercase tracking-[0.3px]"
                    >
                      {t("form.phone")}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-12 bg-transparent border-b border-slate-400 focus:border-primary-900 outline-none transition-colors text-primary-900 placeholder-slate-300 text-base"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor="contact-message"
                      className="text-[12px] font-medium text-slate-700 uppercase tracking-[0.3px]"
                    >
                      {t("form.message")} *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={1}
                      className="w-full h-auto min-h-[48px] pt-3 pb-2 bg-transparent border-b border-slate-400 focus:border-primary-900 outline-none transition-colors text-primary-900 placeholder-slate-300 text-base resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="h-14 px-8 bg-primary-900 hover:bg-primary-800 disabled:bg-slate-400 text-white font-medium text-[14px] uppercase tracking-[0.7px] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    {status === "sending"
                      ? t("form.sending")
                      : t("form.submit")}
                    {status !== "sending" && (
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    )}
                  </button>

                  {status === "success" && (
                    <p className="text-emerald-600 font-medium flex items-center gap-2 text-sm mt-4">
                      <Check className="w-4 h-4 stroke-[2]" />{" "}
                      {t("form.success")}
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-500 font-medium flex items-center gap-2 text-sm mt-4">
                      <X className="w-4 h-4 stroke-[2]" /> {t("form.error")}
                    </p>
                  )}
                </form>
              </div>

              {/* Locations block */}
              <div className="flex flex-col gap-4">
                {(["bordeaux", "hanoi"] as const).map((loc) => (
                  <div
                    key={loc}
                    onClick={() => setActiveLocation(loc)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveLocation(loc);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    className={`p-5 rounded-2xl text-left transition-all border outline-none cursor-pointer ${activeLocation === loc
                      ? "border-primary-500 bg-primary-50 shadow-md ring-1 ring-primary-500/20"
                      : "border-slate-200 bg-white hover:border-primary-300 hover:bg-slate-50 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-primary-500"
                      }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3
                        className={`font-semibold text-lg ${activeLocation === loc ? "text-primary-900" : "text-slate-800"
                          }`}
                      >
                        {t(`locations.${loc}.title`)}
                      </h3>
                      <div
                        className={`w-3 h-3 rounded-full ${activeLocation === loc ? "bg-primary-600" : "bg-transparent"
                          }`}
                      />
                    </div>
                    <div className="flex flex-col gap-2.5 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin
                          className={`w-[18px] h-[18px] mt-0.5 shrink-0 ${activeLocation === loc ? "text-primary-600" : "text-slate-400"
                            }`}
                        />
                        <span
                          className={`${activeLocation === loc ? "text-primary-900 font-medium" : "text-slate-600"
                            } leading-relaxed`}
                        >
                          {t(`locations.${loc}.address`)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <PhoneCall
                          className={`w-[18px] h-[18px] shrink-0 ${activeLocation === loc ? "text-primary-600" : "text-slate-400"
                            }`}
                        />
                        <a
                          href={`tel:${t(`locations.${loc}.phone`).replace(/\s+/g, '')}`}
                          onClick={(e) => e.stopPropagation()}
                          className={`${activeLocation === loc ? "text-primary-900 font-medium" : "text-slate-600"} hover:text-primary-600 hover:underline transition-colors`}
                        >
                          {t(`locations.${loc}.phone`)}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail
                          className={`w-[18px] h-[18px] shrink-0 ${activeLocation === loc ? "text-primary-600" : "text-slate-400"
                            }`}
                        />
                        <a
                          href={`mailto:${t(`locations.${loc}.email`)}`}
                          onClick={(e) => e.stopPropagation()}
                          className={`${activeLocation === loc ? "text-primary-900 font-medium" : "text-slate-600"} hover:text-primary-600 hover:underline transition-colors`}
                        >
                          {t(`locations.${loc}.email`)}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Google Maps & Info */}
            <div className="lg:col-span-3 pb-2">
              {/* Map Iframe */}
              <div className="w-full h-[450px] lg:h-full min-h-[450px] rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 relative shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.4975549072976!2d-0.5786729235882069!3d44.83177897107062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5527ca3df11d8d%3A0x6bba355b9e7dfc92!2s29%20Rue%20de%20Cursol%2C%2033000%20Bordeaux%2C%20France!5e0!3m2!1sen!2svn!4v1741682855217!5m2!1sen!2svn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location Bordeaux"
                  className={`absolute inset-0 transition-opacity duration-500 ${activeLocation === "bordeaux" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                />
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    "Khu Biệt Thự Vườn Đào, Tây Hồ, Hà Nội"
                  )}&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location Hanoi"
                  className={`absolute inset-0 transition-opacity duration-500 ${activeLocation === "hanoi" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center mb-4 mt-2">
                <img
                  src="/logo-light.svg"
                  alt="DentCare Logo"
                  width={220}
                  height={55}
                  className="drop-shadow-sm object-contain"
                />
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                {tFooter("tagline")}
              </p>
            </div>

            {/* Legal */}
            <div>
              <h5 className="font-semibold mb-3 text-white/80">
                {tFooter("company")}
              </h5>
              <div className="space-y-1.5 text-sm text-white/50">
                <p>{tFooter("address")}</p>
                <p>{tFooter("registration")}</p>
                <p>{tFooter("vat")}</p>
              </div>
            </div>

            {/* Links */}
            <div>
              <h5 className="font-semibold mb-3 text-white/80">Contact</h5>
              <div className="space-y-1.5 text-sm text-white/50">
                <p>{tFooter("phone")}</p>
                <p>{tFooter("email")}</p>
                <div className="flex gap-4 mt-4">
                  <a
                    href="#"
                    className="text-white/40 hover:text-accent-400 transition-colors text-xs"
                  >
                    {tFooter("privacy")}
                  </a>
                  <a
                    href="#"
                    className="text-white/40 hover:text-accent-400 transition-colors text-xs"
                  >
                    {tFooter("legal")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-white/30">
              © {new Date().getFullYear()} {tFooter("company")}.{" "}
              {tFooter("rights")}.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
