import React, { useMemo } from "react";
import { Environment } from "@react-three/drei";
import { HeroModel } from "./HeroModel";
import { Scissors } from "./Scissors";

interface HeroSceneProps {
  scrollProgress: number; // 0.0 to 1.0
  mouseParallax: { x: number; y: number };
  isMobile: boolean;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  scrollProgress,
  mouseParallax,
  isMobile,
}) => {
  // Compute stage positions along the scroll timeline (0.0 -> 1.0)
  const { poleProps, scissorProps } = useMemo(() => {
    const p = Math.max(0, Math.min(1, scrollProgress));

    // Stage 1: Hero (0.00 -> 0.20)
    // Stage 2: About (0.20 -> 0.45)
    // Stage 3: Services (0.45 -> 0.70)
    // Stage 4: Reviews (0.70 -> 0.88)
    // Stage 5: Contact (0.88 -> 1.00)

    let poleX = 1.75;
    let poleY = 0;
    let poleZ = 0;
    let poleRotX = 0.14;
    let poleRotY = 0.2;
    let poleRotZ = 0.08;
    let poleScale = 1.05;
    let poleOpacity = 1;

    let scisX = 0;
    let scisY = 4;
    let scisZ = -2;
    let scisRotX = 0.2;
    let scisRotY = 0;
    let scisRotZ = -0.3;
    let scisScale = 0;
    let scisOpacity = 0;

    if (isMobile) {
      // Mobile positioning (centered & higher up to leave room for text)
      if (p < 0.2) {
        // Hero
        const t = p / 0.2;
        poleX = 0;
        poleY = 0.85 - t * 0.3;
        poleZ = -1.2;
        poleScale = 0.72;
        poleRotX = 0.14;
        poleRotY = 0.2 + t * 0.5;
        poleOpacity = 1 - t * 0.3;
      } else if (p < 0.45) {
        // About
        poleX = 0.8;
        poleY = 0.4;
        poleZ = -1.6;
        poleScale = 0.6;
        poleRotX = 0.3;
        poleRotY = 0.7;
        poleOpacity = 0.5;
      } else if (p < 0.7) {
        // Services
        poleOpacity = 0;
        scisX = 0;
        scisY = 0.4;
        scisZ = -1.2;
        scisScale = 0.68;
        scisOpacity = 0.9;
      } else if (p < 0.88) {
        // Reviews
        scisOpacity = 0;
        poleX = -0.7;
        poleY = 0.3;
        poleZ = -1.6;
        poleScale = 0.55;
        poleOpacity = 0.6;
      } else {
        // Contact
        scisOpacity = 0;
        poleX = 0;
        poleY = 0.5;
        poleZ = -1.3;
        poleScale = 0.7;
        poleRotY = Math.PI * 2 + 0.3;
        poleOpacity = 0.85;
      }
    } else {
      // Desktop positioning
      if (p <= 0.22) {
        // HERO -> Transition to ABOUT
        const t = p / 0.22;
        poleX = 1.75 + t * 0.45;
        poleY = 0 - t * 0.2;
        poleZ = 0 + t * 0.4;
        poleRotX = 0.14 + t * 0.21;
        poleRotY = 0.2 + t * 0.45;
        poleRotZ = 0.08 - t * 0.03;
        poleScale = 1.05 + t * 0.1;
        poleOpacity = 1;
      } else if (p <= 0.45) {
        // ABOUT -> Transition to SERVICES
        const t = (p - 0.22) / 0.23;
        poleX = 2.2 - t * 6.5;
        poleY = -0.2 + t * 0.2;
        poleZ = 0.4 - t * 2.0;
        poleRotX = 0.35 - t * 0.25;
        poleRotY = 0.65 + t * 0.8;
        poleScale = 1.15 - t * 0.45;
        poleOpacity = 1 - t; // fades out

        // Scissors enter center/right
        scisX = 1.4;
        scisY = 4 - t * 4;
        scisZ = 0.6;
        scisScale = t * 1.05;
        scisOpacity = t;
      } else if (p <= 0.7) {
        // SERVICES -> Transition to REVIEWS
        const t = (p - 0.45) / 0.25;
        poleOpacity = 0;

        // Scissors fade out right
        scisX = 1.4 + t * 2.5;
        scisY = 0 - t * 2.0;
        scisZ = 0.6 - t * 1.5;
        scisScale = 1.05 * (1 - t);
        scisOpacity = Math.max(0, 1 - t * 1.4);

        // Barber pole enters small from left edge
        if (t > 0.3) {
          const pt = (t - 0.3) / 0.7;
          poleOpacity = pt;
          poleX = -3.5 + pt * 1.4; // settles around -2.1
          poleY = 0;
          poleZ = -0.4;
          poleScale = 0.75;
          poleRotX = 0.08;
          poleRotY = 2.2;
          poleRotZ = -0.06;
        }
      } else if (p <= 0.88) {
        // REVIEWS -> Transition to CONTACT
        const t = (p - 0.7) / 0.18;
        scisOpacity = 0;
        poleOpacity = 0.9 + t * 0.1;
        poleX = -2.1 + t * 3.8; // moves towards right/center (1.7)
        poleY = 0;
        poleZ = -0.4 + t * 0.4;
        poleScale = 0.75 + t * 0.25;
        poleRotX = 0.08;
        poleRotY = 2.2 + t * (Math.PI * 2);
        poleRotZ = 0;
      } else {
        // CONTACT section: settled beside booking buttons
        const t = (p - 0.88) / 0.12;
        scisOpacity = 0;
        poleX = 1.7;
        poleY = 0;
        poleZ = 0;
        poleScale = 1.0;
        poleOpacity = 1;
        poleRotX = 0.1;
        poleRotY = 2.2 + Math.PI * 2 + t * 0.3;
        poleRotZ = 0.05;
      }
    }

    return {
      poleProps: {
        position: [poleX, poleY, poleZ] as [number, number, number],
        rotation: [poleRotX, poleRotY, poleRotZ] as [number, number, number],
        scale: poleScale,
        opacity: poleOpacity,
      },
      scissorProps: {
        position: [scisX, scisY, scisZ] as [number, number, number],
        rotation: [scisRotX, scisRotY, scisRotZ] as [number, number, number],
        scale: scisScale,
        opacity: scisOpacity,
      },
    };
  }, [scrollProgress, isMobile]);

  return (
    <>
      {/* Cinematic Lighting Setup */}
      {/* Soft cool ambient base */}
      <ambientLight intensity={0.45} color="#dbe5f1" />

      {/* Warm amber key light (top right) */}
      <pointLight
        position={[4, 5, 3]}
        intensity={2.2}
        color="#F8C471"
        distance={12}
        decay={2}
      />

      {/* Soft cool rim/key light (left side) */}
      <directionalLight
        position={[-4, 2, 2]}
        intensity={1.1}
        color="#85C1E9"
      />

      {/* Subtle under-glow highlighting the bottom brass cap */}
      <pointLight
        position={[1, -3, 1]}
        intensity={0.8}
        color="#E59866"
        distance={6}
      />

      {/* Low-intensity city environment for metallic & glass reflections */}
      <Environment preset="city" environmentIntensity={0.35} />

      {/* Procedural Barber Pole */}
      <HeroModel
        position={poleProps.position}
        rotation={poleProps.rotation}
        scale={poleProps.scale}
        opacity={poleProps.opacity}
        mouseParallax={mouseParallax}
      />

      {/* Procedural Scissors for Services */}
      <Scissors
        position={scissorProps.position}
        rotation={scissorProps.rotation}
        scale={scissorProps.scale}
        opacity={scissorProps.opacity}
      />
    </>
  );
};
