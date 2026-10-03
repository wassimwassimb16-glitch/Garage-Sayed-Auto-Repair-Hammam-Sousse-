import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene } from "./HeroScene";

interface ThreeCanvasProps {
  scrollProgress: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ scrollProgress }) => {
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Resize listener
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Visibility listener (pause rendering when tab hidden)
  useEffect(() => {
    function handleVisibility() {
      setIsTabVisible(!document.hidden);
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Mouse parallax on desktop
  useEffect(() => {
    if (isMobile) return;

    function handleMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouseParallax({ x, y });
    }

    window.addEventListener("pointermove", handleMouseMove);
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, [isMobile]);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft warm radial glow behind the barber pole */}
      <div
        className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[380px] h-[550px] rounded-full blur-[110px] pointer-events-none transition-opacity duration-700 hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(198, 93, 59, 0.12) 0%, rgba(31, 95, 168, 0.08) 50%, transparent 75%)",
          opacity: scrollProgress < 0.35 || scrollProgress > 0.85 ? 0.9 : 0.2,
        }}
      />

      {isTabVisible && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="w-full h-full"
        >
          <HeroScene
            scrollProgress={scrollProgress}
            mouseParallax={mouseParallax}
            isMobile={isMobile}
          />
        </Canvas>
      )}
    </div>
  );
};

export default ThreeCanvas;
