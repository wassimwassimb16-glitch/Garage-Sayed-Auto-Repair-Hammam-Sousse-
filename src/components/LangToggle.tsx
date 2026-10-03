import React from "react";
import { Lang } from "../content";

interface LangToggleProps {
  currentLang: Lang;
  onSelectLang: (lang: Lang) => void;
  className?: string;
}

export const LangToggle: React.FC<LangToggleProps> = ({
  currentLang,
  onSelectLang,
  className = "",
}) => {
  const languages: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "ar", label: "عربي" },
  ];

  return (
    <div
      className={`inline-flex items-center rounded-md border border-[#8E96A3]/20 bg-[#181B20]/80 p-0.5 backdrop-blur-sm ${className}`}
      role="group"
      aria-label="Language selection"
    >
      {languages.map((l) => {
        const isActive = currentLang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => onSelectLang(l.code)}
            className={`relative px-2.5 py-1 text-xs font-medium transition-all duration-150 rounded ${
              isActive
                ? "bg-[#1F5FA8] text-[#F4EFE6] shadow-sm font-semibold"
                : "text-[#8E96A3] hover:text-[#F4EFE6] hover:bg-white/5"
            }`}
            aria-pressed={isActive}
            aria-label={`Switch language to ${l.label}`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
};
