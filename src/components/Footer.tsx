import React from "react";
import { Scissors, ArrowUp, Phone, MapPin, Clock } from "lucide-react";
import { Lang, CONTENT, BUSINESS_INFO } from "../content";
import { scrollToSection } from "../lib/scroll";

interface FooterProps {
  currentLang: Lang;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang].footer;

  return (
    <footer className="relative bg-[#0E1013] border-t border-[#8E96A3]/15 pt-16 pb-28 md:pb-16 px-4 sm:px-6 lg:px-8 bg-medina-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#8E96A3]/15">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-[#1F5FA8]/20 border border-[#1F5FA8]/40 flex items-center justify-center text-[#1F5FA8]">
                <Scissors className="w-4 h-4" />
              </div>
              <span className="font-fraunces text-2xl font-bold text-[#F4EFE6]">
                Hair Style By Oussama
              </span>
            </div>
            <p className="text-sm text-[#8E96A3] max-w-sm leading-relaxed mb-6">
              Premier men's barber shop located in the historic medina of Sousse, Tunisia. Dedicated to precision fades, beard sculpting, and authentic craft.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181B20] border border-[#C9A24B]/30 text-xs font-mono text-[#C9A24B]">
              ★ 4.9 from 116 Google Reviews
            </div>
          </div>

          {/* Quick Info */}
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#8E96A3] block mb-4">
              Visit & Contact
            </span>
            <ul className="space-y-3 text-sm text-[#8E96A3]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1F5FA8] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#1F5FA8] shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="hover:text-[#F4EFE6] transition-colors font-mono"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#1F5FA8] shrink-0 mt-0.5" />
                <span>{t.hoursSummary}</span>
              </li>
            </ul>
          </div>

          {/* Navigation & Back to Top */}
          <div className="flex flex-col justify-between items-start md:items-end">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#8E96A3] block mb-4 md:text-end">
                Navigation
              </span>
              <div className="flex flex-col gap-2 md:items-end text-sm text-[#8E96A3]">
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-[#F4EFE6] transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-[#F4EFE6] transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("reviews")}
                  className="hover:text-[#F4EFE6] transition-colors"
                >
                  Reviews
                </button>
                <button
                  onClick={() => scrollToSection("hours")}
                  className="hover:text-[#F4EFE6] transition-colors"
                >
                  Hours & Location
                </button>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("hero")}
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-[#8E96A3] hover:text-[#C9A24B] transition-colors group"
            >
              <span>{t.backToTop}</span>
              <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8E96A3]/70">
          <div>© {new Date().getFullYear()} {t.rights}</div>
          <div className="flex items-center gap-1">
            <span>Website handcrafted for Sousse Medina by</span>
            <span className="text-[#F4EFE6] font-medium">Dalil</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
