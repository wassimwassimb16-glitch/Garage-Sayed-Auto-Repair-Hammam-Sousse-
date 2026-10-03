import React, { useState, useEffect } from "react";
import { BarberPole } from "./BarberPole";

interface HeroModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  opacity?: number;
  mouseParallax?: { x: number; y: number };
}

export const HeroModel: React.FC<HeroModelProps> = (props) => {
  const [hasCustomModel, setHasCustomModel] = useState<boolean>(false);

  useEffect(() => {
    // Check if custom /models/hero.glb file is available
    fetch("/models/hero.glb", { method: "HEAD" })
      .then((res) => {
        if (res.ok && res.headers.get("content-type")?.includes("gltf")) {
          setHasCustomModel(true);
        }
      })
      .catch(() => {
        setHasCustomModel(false);
      });
  }, []);

  // If a custom hero.glb model is placed in public/models/hero.glb, it can be loaded here.
  // Defaults gracefully to our handcrafted procedural 3D barber pole.
  if (hasCustomModel) {
    // Custom model hook placeholder
  }

  return <BarberPole {...props} />;
};
