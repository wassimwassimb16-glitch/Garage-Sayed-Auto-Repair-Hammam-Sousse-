import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BarberPoleProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  opacity?: number;
  mouseParallax?: { x: number; y: number };
}

export const BarberPole: React.FC<BarberPoleProps> = ({
  position = [1.8, 0, 0],
  rotation = [0.12, 0, 0.08],
  scale = 1,
  opacity = 1,
  mouseParallax = { x: 0, y: 0 },
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerCylinderRef = useRef<THREE.Mesh>(null);

  // Generate procedural barber pole spiral texture at runtime
  const { stripeTexture } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    // Colors: Terracotta, Pure White, Medina Blue
    const colors = ["#C65D3B", "#FFFFFF", "#1F5FA8", "#FFFFFF"];
    const stripeCount = 8;
    const stripeWidth = (canvas.width * 2) / stripeCount;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = -stripeCount; i < stripeCount * 2; i++) {
      const color = colors[Math.abs(i) % colors.length];
      ctx.fillStyle = color;
      ctx.beginPath();
      // 45-degree angle stripes
      ctx.moveTo(i * stripeWidth, 0);
      ctx.lineTo(i * stripeWidth + canvas.height, canvas.height);
      ctx.lineTo((i + 0.9) * stripeWidth + canvas.height, canvas.height);
      ctx.lineTo((i + 0.9) * stripeWidth, 0);
      ctx.closePath();
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1.5, 3.5);
    return { stripeTexture: texture };
  }, []);

  // Animation frame loop: spin stripes and smooth mouse parallax
  useFrame((_, delta) => {
    if (stripeTexture) {
      // Classic downward or upward barber pole spiral flow
      stripeTexture.offset.y += delta * 0.45;
    }
    if (groupRef.current) {
      // Smooth interpolation toward target position & parallax
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        position[0] + mouseParallax.x * 0.35,
        0.08
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        position[1] + mouseParallax.y * 0.25,
        0.08
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        position[2],
        0.08
      );

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        rotation[0] - mouseParallax.y * 0.1,
        0.08
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotation[1] + mouseParallax.x * 0.15,
        0.08
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        rotation[2],
        0.08
      );

      const targetScale = scale * opacity;
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08)
      );
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Central Striped Core Cylinder */}
      <mesh ref={innerCylinderRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.46, 0.46, 2.9, 32, 1, false]} />
        <meshStandardMaterial
          map={stripeTexture}
          roughness={0.25}
          metalness={0.1}
          emissive="#201510"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Outer Protective Glass Cylinder */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.54, 0.54, 3.05, 32, 1, true]} />
        <meshPhysicalMaterial
          transmission={0.92}
          roughness={0.04}
          ior={1.48}
          thickness={0.25}
          color="#f4f7fb"
          transparent={true}
          opacity={0.7}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Glass rim highlights */}
      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[0.53, 0.02, 16, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <torusGeometry args={[0.53, 0.02, 16, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* TOP BRASS CAP & FINIAL */}
      <group position={[0, 1.55, 0]}>
        {/* Base collar */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.58, 0.52, 0.16, 32]} />
          <meshStandardMaterial color="#C9A24B" metalness={0.94} roughness={0.26} />
        </mesh>
        {/* Tier 2 collar */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.48, 0.56, 0.14, 32]} />
          <meshStandardMaterial color="#C9A24B" metalness={0.94} roughness={0.26} />
        </mesh>
        {/* Main decorative dome */}
        <mesh position={[0, 0.42, 0]}>
          <sphereGeometry args={[0.44, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#C9A24B" metalness={0.94} roughness={0.26} />
        </mesh>
        {/* Top ball finial */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial color="#e0bb66" metalness={0.96} roughness={0.2} />
        </mesh>
        {/* Finial stem */}
        <mesh position={[0, 0.68, 0]}>
          <cylinderGeometry args={[0.07, 0.11, 0.28, 16]} />
          <meshStandardMaterial color="#C9A24B" metalness={0.94} roughness={0.26} />
        </mesh>
      </group>

      {/* BOTTOM BRASS CAP & MOUNT */}
      <group position={[0, -1.55, 0]} rotation={[Math.PI, 0, 0]}>
        {/* Base collar */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.58, 0.52, 0.16, 32]} />
          <meshStandardMaterial color="#C9A24B" metalness={0.94} roughness={0.26} />
        </mesh>
        {/* Tier 2 collar */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.48, 0.56, 0.14, 32]} />
          <meshStandardMaterial color="#C9A24B" metalness={0.94} roughness={0.26} />
        </mesh>
        {/* Bottom dome */}
        <mesh position={[0, 0.38, 0]}>
          <sphereGeometry args={[0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#C9A24B" metalness={0.94} roughness={0.26} />
        </mesh>
        {/* Bottom drop acorn */}
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.13, 20, 20]} />
          <meshStandardMaterial color="#e0bb66" metalness={0.96} roughness={0.2} />
        </mesh>
      </group>

      {/* Rear subtle wall brackets */}
      <mesh position={[-0.45, 1.1, -0.3]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.12, 0.45, 0.1]} />
        <meshStandardMaterial color="#8E96A3" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[-0.45, -1.1, -0.3]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.12, 0.45, 0.1]} />
        <meshStandardMaterial color="#8E96A3" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
};
