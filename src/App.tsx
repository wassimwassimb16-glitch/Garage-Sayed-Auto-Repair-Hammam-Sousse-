/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from "react";
import { Lang, CONTENT } from "./content";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useIsLowEnd } from "./hooks/useIsLowEnd";
import { initSmoothScroll } from "./lib/scroll";

// Core Components
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Booking } from "./components/Booking";
import { Reviews } from "./components/Reviews";
import { Gallery } from "./components/Gallery";
import { Hours } from "./components/Hours";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MobileBar } from "./components/MobileBar";

// Lazy-load 3D WebGL Canvas for optimal Lighthouse Performance & fast initial paint
const ThreeCanvas = lazy(() => import("./components/ThreeCanvas"));

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("preferred_lang") as Lang | null;
      if (saved && (saved === "en" || saved === "fr" || saved === "ar")) {
        return saved;
      }
    } catch {
      // Ignore localStorage errors
    }
    return "en";
  });

  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const reducedMotion = useReducedMotion();
  const isLowEnd = useIsLowEnd();

  // Handle Language selection & RTL direction
  const handleSelectLang = (newLang: Lang) => {
    setLang(newLang);
    try {
      localStorage.setItem("preferred_lang", newLang);
    } catch {
      // Ignore localStorage errors
    }
  };

  useEffect(() => {
    // Update document language, direction, and title
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = CONTENT[lang].metaTitle;
  }, [lang]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const cleanup = initSmoothScroll(reducedMotion);
    return () => cleanup();
  }, [reducedMotion]);

  // Track global scroll progress (0.0 to 1.0) for the 3D cinematic timeline
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const progress = Math.max(
              0,
              Math.min(1, window.scrollY / totalScroll)
            );
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldSkip3D = reducedMotion || isLowEnd;

  return (
    <div
      className={`min-h-screen bg-[#0E1013] text-[#F4EFE6] relative overflow-x-hidden ${
        lang === "ar" ? "font-cairo" : "font-inter"
      }`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* 5.0 Preloader */}
      <Preloader
        onComplete={() => setPreloaderFinished(true)}
        reducedMotion={reducedMotion}
      />

      {/* Film Grain CSS Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Desktop Custom Magnetic Cursor */}
      <Cursor />

      {/* FIXED 3D BACKGROUND CANVAS / 2D POSTER FALLBACK */}
      {!shouldSkip3D ? (
        <Suspense
          fallback={
            <div
              className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-cover bg-center opacity-40 mix-blend-screen"
              style={{ backgroundImage: "url('/images/hero-poster.jpg')" }}
            />
          }
        >
          <ThreeCanvas scrollProgress={scrollProgress} />
        </Suspense>
      ) : (
        /* Static 2D Poster Fallback for Low-End Devices or Reduced Motion */
        <div
          className="fixed top-0 right-0 w-full md:w-1/2 h-screen pointer-events-none z-0 opacity-25 bg-contain bg-no-repeat bg-center transition-transform duration-300"
          style={{
            backgroundImage: "url('/images/hero-poster.jpg')",
            transform: `translateY(${scrollProgress * 40}px)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* 5.1 Fixed Navigation */}
      <Nav currentLang={lang} onSelectLang={handleSelectLang} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 5.2 Hero */}
        <Hero currentLang={lang} />

        {/* 5.3 About */}
        <About currentLang={lang} />

        {/* 5.4 Services */}
        <Services currentLang={lang} />

        {/* 5.5 How to Book */}
        <Booking currentLang={lang} />

        {/* 5.6 Reviews */}
        <Reviews currentLang={lang} />

        {/* 5.7 Gallery */}
        <Gallery currentLang={lang} />

        {/* 5.8 Hours & Location */}
        <Hours currentLang={lang} />

        {/* 5.9 Contact */}
        <Contact currentLang={lang} />
      </main>

      {/* 5.10 Footer */}
      <Footer currentLang={lang} />

      {/* 5.11 Mobile Action Bar (pinned bottom) */}
      <MobileBar currentLang={lang} />
    </div>
  );
}
