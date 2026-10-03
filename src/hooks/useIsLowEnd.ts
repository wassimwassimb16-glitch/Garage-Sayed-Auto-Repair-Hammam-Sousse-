import { useState, useEffect } from "react";

export function useIsLowEnd(): boolean {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      // Check hardware concurrency
      const cores = navigator.hardwareConcurrency || 4;
      if (cores <= 2) {
        setIsLowEnd(true);
        return;
      }

      // Check WebGL2 support
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      if (!gl) {
        setIsLowEnd(true);
        return;
      }
    } catch {
      setIsLowEnd(false);
    }
  }, []);

  return isLowEnd;
}
