import React, { useEffect, useState, useRef } from "react";
import { Lang, CONTENT } from "../content";

interface AboutProps {
  currentLang: Lang;
}

export const About: React.FC<AboutProps> = ({ currentLang }) => {
  const t = CONTENT[currentLang].about;
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animated counters state
  const [countReviews, setCountReviews] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate review count to 116
          let start = 0;
          const end = 116;
          const duration = 1200;
          const stepTime = 16;
          const totalSteps = duration / stepTime;
          const increment = end / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCountReviews(end);
              clearInterval(timer);
            } else {
              setCountReviews(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[90vh] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 flex items-center"
    >
      {/* Soft gradient backdrop behind content */}
      <div className="absolute inset-y-0 start-0 w-full md:w-3/5 bg-gradient-to-r rtl:bg-gradient-to-l from-[#0E1013]/95 via-[#0E1013]/85 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-[#C9A24B]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#C9A24B]">
              {t.eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-fraunces section-h2 font-bold text-[#F4EFE6] tracking-tight mb-6">
            {t.title}
          </h2>

          {/* Body */}
          <p className="text-base sm:text-lg text-[#8E96A3] leading-relaxed mb-12 max-w-xl">
            {t.text}
          </p>

          {/* Three small facts in a row */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-[#8E96A3]/20">
            {/* Fact 1 */}
            <div className="flex flex-col">
              <span className="font-fraunces text-2xl sm:text-4xl font-bold text-[#F4EFE6] tracking-tight">
                4.9<span className="text-base sm:text-xl text-[#C9A24B]">/5</span>
              </span>
              <span className="text-xs sm:text-sm text-[#8E96A3] mt-1">
                {t.fact1.replace("4.9 / 5", "").trim() || "on Google"}
              </span>
            </div>

            {/* Fact 2 */}
            <div className="flex flex-col">
              <span className="font-fraunces text-2xl sm:text-4xl font-bold text-[#F4EFE6] tracking-tight">
                {hasAnimated ? countReviews : "116"}
              </span>
              <span className="text-xs sm:text-sm text-[#8E96A3] mt-1">
                {t.fact2.replace("116", "").trim() || "reviews"}
              </span>
            </div>

            {/* Fact 3 */}
            <div className="flex flex-col">
              <span className="font-fraunces text-2xl sm:text-4xl font-bold text-[#1F5FA8] tracking-tight">
                6 <span className="text-base sm:text-xl text-[#F4EFE6]">Days</span>
              </span>
              <span className="text-xs sm:text-sm text-[#8E96A3] mt-1">
                {t.fact3}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
