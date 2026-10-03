import React, { useState, useEffect } from "react";
import { Scissors, Menu, X, Phone, MessageSquare } from "lucide-react";
import { Lang, CONTENT, BUSINESS_INFO } from "../content";
import { LangToggle } from "./LangToggle";
import { scrollToSection } from "../lib/scroll";

interface NavProps {
  currentLang: Lang;
  onSelectLang: (lang: Lang) => void;
}

export const Nav: React.FC<NavProps> = ({ currentLang, onSelectLang }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const t = CONTENT[currentLang].nav;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setHasScrolled(currentY > 40);

          if (currentY > 150) {
            if (currentY > lastScrollY && currentY - lastScrollY > 6) {
              // Scrolling down
              setIsVisible(false);
            } else if (lastScrollY - currentY > 6) {
              // Scrolling up
              setIsVisible(true);
            }
          } else {
            setIsVisible(true);
          }

          setLastScrollY(currentY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: "about", label: t.about },
    { id: "services", label: t.services },
    { id: "reviews", label: t.reviews },
    { id: "hours", label: t.hours },
    { id: "contact", label: t.contact },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          hasScrolled
            ? "bg-[#0E1013]/90 backdrop-blur-md border-b border-[#8E96A3]/15 shadow-lg shadow-black/20 py-3"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group text-start focus:outline-none"
            aria-label="Hair Style By Oussama - Back to top"
          >
            <div className="w-8 h-8 rounded-md bg-[#1F5FA8]/20 border border-[#1F5FA8]/40 flex items-center justify-center text-[#1F5FA8] group-hover:border-[#C65D3B] group-hover:text-[#C65D3B] transition-colors">
              <Scissors className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-200" />
            </div>
            <div className="flex flex-col">
              <span className="font-fraunces text-xl font-bold tracking-tight text-[#F4EFE6] leading-none">
                Oussama
              </span>
              <span className="text-[10px] tracking-wider text-[#8E96A3] uppercase font-mono mt-0.5">
                Medina · Sousse
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-sm font-medium text-[#8E96A3] hover:text-[#F4EFE6] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#C9A24B] after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <LangToggle currentLang={currentLang} onSelectLang={onSelectLang} />

            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-slide inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F4EFE6] bg-[#1F5FA8] hover:bg-[#184c87] rounded-[6px] transition-all shadow-sm shadow-[#1F5FA8]/20"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.bookNow}</span>
            </a>
          </div>

          {/* Mobile Hamburger & Lang Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <LangToggle currentLang={currentLang} onSelectLang={onSelectLang} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#F4EFE6] hover:bg-white/5 border border-[#8E96A3]/20"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0E1013]/98 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 sm:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-6">
            <span className="text-xs uppercase tracking-widest text-[#8E96A3] font-mono border-b border-[#8E96A3]/15 pb-2">
              Menu
            </span>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-2xl font-fraunces font-medium text-start text-[#F4EFE6] hover:text-[#1F5FA8] transition-colors py-1 flex items-center justify-between group"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-[#8E96A3] group-hover:text-[#1F5FA8]">
                    →
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Footer Contact Details */}
          <div className="flex flex-col gap-4 border-t border-[#8E96A3]/15 pt-6">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-3 text-sm text-[#F4EFE6] hover:text-[#C9A24B] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#8E96A3]" />
              <span className="font-mono">{BUSINESS_INFO.phone}</span>
            </a>

            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-[6px] bg-[#1F5FA8] hover:bg-[#184c87] text-[#F4EFE6] text-sm font-semibold tracking-wide transition-all shadow-md shadow-[#1F5FA8]/25"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.bookNow} (WhatsApp)</span>
            </a>

            <div className="text-[11px] text-[#8E96A3] text-center font-mono">
              4 Rue de l'Église, Sousse 4000, Tunisia
            </div>
          </div>
        </div>
      )}
    </>
  );
};
