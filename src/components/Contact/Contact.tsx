"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import {
  Mail,
  Video,
  PhoneCall,
  ClipboardSignature,
  MapPin,
  Check,
  X,
} from "lucide-react";

const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

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
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            ...formData,
            from_name: "DentCare Website",
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
                        placeholder="Ex: Cabinet Dentaire Pasteur"
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
                        placeholder="docteur@exemple.com"
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
                      placeholder="+33 6 00 00 00 00"
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
                      placeholder={t("form.message")}
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

              {/* Quick info / Address block */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-primary-900">
                  <MapPin className="w-5 h-5 stroke-[1.5] text-accent-600 shrink-0" />
                  <span className="font-medium text-lg">
                    {t("info.address")}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-primary-900">
                  <PhoneCall className="w-5 h-5 stroke-[1.5] text-accent-600 shrink-0" />
                  <span className="font-medium text-lg">{t("info.phone")}</span>
                </div>
                <div className="flex items-center gap-4 text-primary-900">
                  <Mail className="w-5 h-5 stroke-[1.5] text-accent-600 shrink-0" />
                  <span className="font-medium text-lg">{t("info.email")}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Google Maps & Info */}
            <div className="lg:col-span-3 pb-2">
              {/* Map Iframe */}
              <div className="w-full h-[400px] lg:h-full min-h-[400px] rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 relative shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.4975549072976!2d-0.5786729235882069!3d44.83177897107062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5527ca3df11d8d%3A0x6bba355b9e7dfc92!2s29%20Rue%20de%20Cursol%2C%2033000%20Bordeaux%2C%20France!5e0!3m2!1sen!2svn!4v1741682855217!5m2!1sen!2svn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location Bordeaux"
                  className="absolute inset-0"
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
