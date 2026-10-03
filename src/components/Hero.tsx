import React from "react";
import { MessageSquare, Phone, Star, Clock } from "lucide-react";
import { Lang, CONTENT, BUSINESS_INFO } from "../content";
import { scrollToSection } from "../lib/scroll";

interface HeroProps {
  currentLang: Lang;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang].hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-medina-pattern overflow-hidden"
    >
      {/* Soft gradient backdrop behind text for optimal contrast */}
      <div className="absolute inset-y-0 start-0 w-full lg:w-3/5 bg-gradient-to-r rtl:bg-gradient-to-l from-[#0E1013] via-[#0E1013]/90 to-transparent pointer-events-none z-10" />

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center relative z-20">
        <div className="max-w-2xl">
          {/* Rating & Hours Badges */}
          <div className="inline-flex flex-wrap items-center gap-2.5 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <a
              href={BUSINESS_INFO.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181B20]/90 border border-[#C9A24B]/30 text-xs font-medium text-[#F4EFE6] hover:border-[#C9A24B] transition-colors"
            >
              <div className="flex items-center text-[#C9A24B]">
                <Star className="w-3.5 h-3.5 fill-[#C9A24B]" />
              </div>
              <span className="font-semibold">{BUSINESS_INFO.googleRating}</span>
              <span className="text-[#8E96A3]">· 116 Google reviews</span>
            </a>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181B20]/80 border border-[#8E96A3]/20 text-xs text-[#8E96A3]">
              <Clock className="w-3.5 h-3.5 text-[#1F5FA8]" />
              <span>{t.hoursChip}</span>
            </div>
          </div>

          {/* Masked Headline Stagger Entrance */}
          <div className="overflow-hidden mb-6">
            <h1 className="font-fraunces hero-h1 font-bold text-[#F4EFE6] tracking-tight animate-in slide-in-from-bottom-6 duration-700">
              {t.h1}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#8E96A3] leading-relaxed max-w-xl mb-8 font-normal animate-in fade-in duration-700 delay-150">
            {t.sub}
          </p>

          {/* Action CTAs */}
          <div
            id="hero-cta"
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 animate-in fade-in duration-700 delay-300"
          >
            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-slide inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[6px] bg-[#1F5FA8] hover:bg-[#184c87] text-[#F4EFE6] font-semibold text-sm tracking-wide shadow-lg shadow-[#1F5FA8]/25 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.bookBtn}</span>
            </a>

            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[6px] bg-[#181B20]/80 hover:bg-[#181B20] text-[#F4EFE6] hover:text-[#C9A24B] border border-[#8E96A3]/25 hover:border-[#C9A24B]/50 font-medium text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-[#8E96A3]" />
              <span className="font-mono">{t.callBtn}</span>
            </a>
          </div>

          {/* Location reassurance tag */}
          <div className="mt-8 flex items-center gap-2 text-xs text-[#8E96A3]/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F5FA8]" />
            <span>4 Rue de l'Église, Medina of Sousse, Tunisia</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full relative z-20 pt-4 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("about")}
          className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-[#8E96A3] hover:text-[#F4EFE6] transition-colors focus:outline-none"
          aria-label="Scroll to About section"
        >
          <div className="w-[1px] h-9 bg-[#8E96A3]/30 overflow-hidden relative">
            <div className="w-full h-full bg-[#C9A24B] animate-[scrollIndicator_1.8s_ease-in-out_infinite]" />
          </div>
          <span className="font-mono">{t.scroll}</span>
        </button>

        <span className="text-[11px] font-mono text-[#8E96A3]/60 hidden sm:inline-block">
          35.8276° N, 10.6385° E
        </span>
      </div>

      <style>{`
        @keyframes scrollIndicator {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};
