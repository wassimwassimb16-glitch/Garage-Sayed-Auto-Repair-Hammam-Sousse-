import React from "react";
import { Clock, MapPin, Navigation, ExternalLink, Calendar } from "lucide-react";
import { Lang, CONTENT, BUSINESS_INFO } from "../content";
import { useOpenNow } from "../hooks/useOpenNow";

interface HoursProps {
  currentLang: Lang;
}

export const Hours: React.FC<HoursProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang].hoursLocation;
  const status = useOpenNow(currentLang);

  const schedule = [
    { day: t.days.mon, time: t.days.closedText, isClosed: true },
    { day: t.days.tueSun, time: "08:00 – 18:00", isClosed: false },
  ];

  return (
    <section
      id="hours"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#181B20]/60 border-t border-[#8E96A3]/15"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-xl mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#C9A24B]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#C9A24B]">
              06 · Visit
            </span>
          </div>
          <h2 className="font-fraunces section-h2 font-bold text-[#F4EFE6] tracking-tight">
            {t.title}
          </h2>
          <p className="text-base text-[#8E96A3] mt-2">
            {t.medinaNote}
          </p>
        </div>

        {/* 2-Column Layout: Left Hours Table & Live Badge; Right Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Opening Schedule & Realtime Status */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-[8px] bg-[#181B20] border border-[#8E96A3]/20">
            <div>
              {/* Real-time Open/Closed Badge in Africa/Tunis Time */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#8E96A3]/20">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3.5 h-3.5 rounded-full ${
                      status.isOpen
                        ? "bg-[#1F5FA8] ring-4 ring-[#1F5FA8]/20 animate-pulse"
                        : "bg-[#C65D3B] ring-4 ring-[#C65D3B]/20"
                    }`}
                  />
                  <div>
                    <span
                      className={`text-sm font-semibold ${
                        status.isOpen ? "text-[#F4EFE6]" : "text-[#8E96A3]"
                      }`}
                    >
                      {status.statusText}
                    </span>
                    {status.tunisTimeStr && (
                      <span className="text-[11px] font-mono text-[#8E96A3]/70 block">
                        Tunis Time · {status.tunisTimeStr}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Schedule Table */}
              <h3 className="font-fraunces text-xl font-semibold text-[#F4EFE6] mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C9A24B]" />
                <span>{t.scheduleHeading}</span>
              </h3>

              <div className="space-y-4">
                {schedule.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 border-b border-[#8E96A3]/10 text-sm"
                  >
                    <span className="text-[#F4EFE6] font-medium">{row.day}</span>
                    <span
                      className={`font-mono ${
                        row.isClosed ? "text-[#C65D3B]" : "text-[#8E96A3]"
                      }`}
                    >
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Details */}
            <div className="mt-8 pt-6 border-t border-[#8E96A3]/20">
              <h4 className="text-xs uppercase font-mono tracking-wider text-[#8E96A3] mb-2 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#1F5FA8]" />
                <span>{t.addressHeading}</span>
              </h4>
              <p className="font-fraunces text-lg text-[#F4EFE6]">
                {BUSINESS_INFO.address}
              </p>
              <p className="text-xs text-[#8E96A3] mt-1 font-mono">
                {t.medinaNote}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Map & Directions */}
          <div className="lg:col-span-7 flex flex-col rounded-[8px] bg-[#181B20] border border-[#8E96A3]/20 overflow-hidden">
            {/* Dark Styled Google Maps Iframe */}
            <div className="w-full h-80 sm:h-96 relative bg-[#0E1013] overflow-hidden">
              <iframe
                title="Hair Style By Oussama Location in Sousse Medina"
                src="https://maps.google.com/maps?q=Hair+Style+By+Oussama+4+Rue+de+l'%C3%89glise+Sousse+Tunisia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "invert(92%) hue-rotate(180deg) contrast(95%) grayscale(20%)",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Map overlay chip */}
              <div className="absolute top-4 left-4 pointer-events-none bg-[#0E1013]/90 backdrop-blur-md px-3.5 py-1.5 rounded-[6px] border border-[#8E96A3]/30 text-xs font-mono text-[#F4EFE6]">
                📍 4 Rue de l'Église, Sousse
              </div>
            </div>

            {/* Directions & Open in Maps CTA */}
            <div className="p-6 bg-[#181B20] border-t border-[#8E96A3]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-[#8E96A3]">
                  Destination
                </span>
                <p className="text-sm font-medium text-[#F4EFE6]">
                  Near Sousse Medina central church & historic ramparts
                </p>
              </div>

              <a
                href={BUSINESS_INFO.googleMapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-slide inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#1F5FA8] hover:bg-[#184c87] text-[#F4EFE6] text-xs font-semibold uppercase tracking-wider transition-all shadow-md shadow-[#1F5FA8]/20 shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t.directionsBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
