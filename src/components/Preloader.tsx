import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
  reducedMotion: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, reducedMotion }) => {
  const [phase, setPhase] = useState<"drawing" | "revealing" | "done">("drawing");

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      setPhase("done");
      return;
    }

    // Step 1: Draw stripe and fade in name (0.7s)
    const t1 = setTimeout(() => {
      setPhase("revealing");
    }, 700);

    // Step 2: Arch-shaped reveal and finish (1.15s max)
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reducedMotion, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#0E1013] flex flex-col items-center justify-center pointer-events-none transition-all duration-500 ease-in-out ${
        phase === "revealing"
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100"
      }`}
      style={{
        clipPath:
          phase === "revealing"
            ? "ellipse(100% 100% at 50% 50%)"
            : "ellipse(150% 150% at 50% 50%)",
      }}
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Barber-pole stripe horizontal line */}
        <div className="w-56 h-[3px] rounded-full overflow-hidden bg-[#181B20] relative mb-6">
          <div
            className="absolute inset-0 w-full h-full animate-[stripeSlide_1s_linear_infinite]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #C65D3B 0px, #C65D3B 10px, #FFFFFF 10px, #FFFFFF 16px, #1F5FA8 16px, #1F5FA8 26px, #FFFFFF 26px, #FFFFFF 32px)",
              backgroundSize: "46px 46px",
            }}
          />
        </div>

        {/* Wordmark */}
        <h2 className="font-fraunces text-xl sm:text-2xl text-[#F4EFE6] tracking-tight font-semibold animate-pulse">
          Hair Style By Oussama
        </h2>
        <span className="text-xs uppercase tracking-widest text-[#8E96A3] mt-2 font-mono">
          Sousse Medina
        </span>
      </div>

      <style>{`
        @keyframes stripeSlide {
          from { background-position: 0 0; }
          to { background-position: 46px 0; }
        }
      `}</style>
    </div>
  );
};
