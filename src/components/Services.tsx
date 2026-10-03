import React from "react";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { Lang, CONTENT, BUSINESS_INFO } from "../content";

interface ServicesProps {
  currentLang: Lang;
}

export const Services: React.FC<ServicesProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang].services;

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 flex items-center"
    >
      {/* Background gradient veil */}
      <div className="absolute inset-0 bg-[#0E1013]/85 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="max-w-xl mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#1F5FA8]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#1F5FA8]">
              02 · {t.title}
            </span>
          </div>
          <h2 className="font-fraunces section-h2 font-bold text-[#F4EFE6] tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#8E96A3] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Asymmetric Service Rows */}
        <div className="flex flex-col divide-y divide-[#8E96A3]/20 border-y border-[#8E96A3]/20">
          {t.items.map((item, index) => (
            <div
              key={item.num}
              className="group py-8 sm:py-10 transition-all duration-300 relative cursor-default"
            >
              {/* Animated Terracotta highlight line on hover */}
              <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#C65D3B] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-start" />

              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 transition-transform duration-300 group-hover:translate-x-3 rtl:group-hover:-translate-x-3">
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-sm sm:text-base text-[#8E96A3] group-hover:text-[#C65D3B] transition-colors">
                    {item.num}
                  </span>
                  <h3 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#F4EFE6] group-hover:text-[#F4EFE6] transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="md:max-w-md md:text-end rtl:md:text-start">
                  <p className="text-sm sm:text-base text-[#8E96A3] group-hover:text-[#F4EFE6] transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price transparency notice & WhatsApp CTA (No invented prices!) */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-[8px] bg-[#181B20]/90 border border-[#8E96A3]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="font-fraunces text-lg sm:text-xl font-semibold text-[#F4EFE6]">
              {t.priceNote}
            </span>
            <span className="text-xs sm:text-sm text-[#8E96A3] mt-1">
              Transparent, fair prices with no tourist surcharge. Message Oussama directly for instant quote.
            </span>
          </div>

          <a
            href={BUSINESS_INFO.whatsappPriceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-slide inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[6px] bg-[#1F5FA8] hover:bg-[#184c87] text-[#F4EFE6] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md shadow-[#1F5FA8]/20 self-start sm:self-auto shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.askPriceBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>
    </section>
  );
};
