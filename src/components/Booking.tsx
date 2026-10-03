import React, { useRef, useState, useEffect } from "react";
import { MessageSquare, Camera, MapPin, ArrowRight } from "lucide-react";
import { Lang, CONTENT, BUSINESS_INFO } from "../content";

interface BookingProps {
  currentLang: Lang;
}

export const Booking: React.FC<BookingProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang].booking;
  const sectionRef = useRef<HTMLElement>(null);
  const [fillProgress, setFillProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate progress of section in viewport
      const totalDist = windowHeight + rect.height;
      const currentDist = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentDist / totalDist));
      setFillProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const icons = [MessageSquare, Camera, MapPin];

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#181B20]/40 border-y border-[#8E96A3]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="max-w-xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#C65D3B]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#C65D3B]">
              03 · Booking
            </span>
          </div>
          <h2 className="font-fraunces section-h2 font-bold text-[#F4EFE6] tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-base text-[#8E96A3] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Sequential Steps with connecting timeline */}
        <div className="relative">
          {/* Connecting Progress Track */}
          <div className="hidden lg:block absolute top-7 inset-x-8 h-[2px] bg-[#8E96A3]/20 -z-0">
            <div
              className="h-full bg-[#1F5FA8] transition-all duration-300 origin-start"
              style={{ width: `${Math.min(100, fillProgress * 130)}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 relative z-10">
            {t.steps.map((step, idx) => {
              const Icon = icons[idx];
              return (
                <div
                  key={step.step}
                  className="flex flex-col p-6 sm:p-8 rounded-[8px] bg-[#181B20] border border-[#8E96A3]/20 relative group hover:border-[#1F5FA8]/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    {/* Step Icon Badge */}
                    <div className="w-14 h-14 rounded-[6px] bg-[#0E1013] border border-[#8E96A3]/30 flex items-center justify-center text-[#1F5FA8] group-hover:border-[#1F5FA8] group-hover:scale-105 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Step Number in Fraunces */}
                    <span className="font-fraunces text-3xl font-bold text-[#8E96A3]/40 group-hover:text-[#C9A24B] transition-colors">
                      0{step.step}
                    </span>
                  </div>

                  <h3 className="font-fraunces text-xl font-semibold text-[#F4EFE6] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#8E96A3] leading-relaxed flex-1">
                    {step.desc}
                  </p>

                  {idx === 0 && (
                    <a
                      href={BUSINESS_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#1F5FA8] hover:text-[#F4EFE6] transition-colors group-hover:translate-x-1"
                    >
                      <span>Open WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {idx === 2 && (
                    <a
                      href={BUSINESS_INFO.googleMapsDirections}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#C9A24B] hover:text-[#F4EFE6] transition-colors group-hover:translate-x-1"
                    >
                      <span>View in Maps</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
