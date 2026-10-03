import React from "react";
import { MessageSquare, Phone, Scissors, MapPin } from "lucide-react";
import { Lang, CONTENT, BUSINESS_INFO } from "../content";

interface ContactProps {
  currentLang: Lang;
}

export const Contact: React.FC<ContactProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang].contact;

  return (
    <section
      id="contact"
      className="relative min-h-[85vh] py-24 sm:py-36 px-4 sm:px-6 lg:px-8 flex items-center bg-medina-pattern overflow-hidden"
    >
      {/* Soft gradient mask for readability */}
      <div className="absolute inset-y-0 start-0 w-full lg:w-3/5 bg-gradient-to-r rtl:bg-gradient-to-l from-[#0E1013] via-[#0E1013]/90 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-[#1F5FA8]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#1F5FA8]">
              07 · Instant Booking
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-fraunces hero-h1 font-bold text-[#F4EFE6] tracking-tight mb-6">
            {t.title}
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[#8E96A3] leading-relaxed mb-10 max-w-lg font-normal">
            {t.sub}
          </p>

          {/* Direct CTA Buttons (No contact form!) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-slide inline-flex items-center justify-center gap-3 px-8 py-4 rounded-[6px] bg-[#1F5FA8] hover:bg-[#184c87] text-[#F4EFE6] font-semibold text-base tracking-wide shadow-xl shadow-[#1F5FA8]/25 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t.bookBtn}</span>
            </a>

            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-[6px] bg-[#181B20] hover:bg-[#181B20]/80 text-[#F4EFE6] hover:text-[#C9A24B] border border-[#8E96A3]/30 hover:border-[#C9A24B]/50 font-medium text-base transition-all"
            >
              <Phone className="w-5 h-5 text-[#8E96A3]" />
              <span className="font-mono">{t.callBtn}</span>
            </a>
          </div>

          {/* Reassurance pills */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8E96A3]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F5FA8]" />
              <span>Quick WhatsApp reply</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
              <span>Reference photo welcome</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C65D3B]" />
              <span>Sousse Medina</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
