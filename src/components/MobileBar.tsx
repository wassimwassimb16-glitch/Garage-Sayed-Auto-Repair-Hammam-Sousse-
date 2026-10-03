import React, { useEffect, useState } from "react";
import { MessageSquare, Phone } from "lucide-react";
import { Lang, CONTENT, BUSINESS_INFO } from "../content";

interface MobileBarProps {
  currentLang: Lang;
}

export const MobileBar: React.FC<MobileBarProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang].mobileBar;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show mobile bar only after hero buttons scroll out of view (~400px scroll)
      const heroCta = document.getElementById("hero-cta");
      if (heroCta) {
        const rect = heroCta.getBoundingClientRect();
        setIsVisible(rect.bottom < 0);
      } else {
        setIsVisible(window.scrollY > 450);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 bg-[#0E1013]/95 backdrop-blur-lg border-t border-[#8E96A3]/20 p-3 sm:hidden shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom duration-300"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="grid grid-cols-2 gap-3">
        <a
          href={BUSINESS_INFO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-[6px] bg-[#1F5FA8] hover:bg-[#184c87] text-[#F4EFE6] text-xs font-semibold uppercase tracking-wider shadow-md shadow-[#1F5FA8]/20 transition-all active:scale-95"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t.whatsapp}</span>
        </a>

        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-[6px] bg-[#181B20] hover:bg-[#181B20]/80 text-[#F4EFE6] border border-[#8E96A3]/30 text-xs font-semibold uppercase tracking-wider transition-all active:scale-95"
        >
          <Phone className="w-4 h-4 text-[#8E96A3]" />
          <span>{t.call}</span>
        </a>
      </div>
    </div>
  );
};
