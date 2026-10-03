import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ScissorsProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  openAngle?: number; // radians
  opacity?: number;
}

export const Scissors: React.FC<ScissorsProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, -0.2],
  scale = 1,
  openAngle = 0.35,
  opacity = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const bladeARef = useRef<THREE.Group>(null);
  const bladeBRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth position interpolation
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        position[0],
        0.08
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        position[1],
        0.08
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        position[2],
        0.08
      );

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        rotation[0],
        0.08
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotation[1],
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

    // Gentle rhythmic opening and closing
    const dynamicAngle =
      openAngle + Math.sin(state.clock.getElapsedTime() * 2.8) * 0.15;

    if (bladeARef.current) {
      bladeARef.current.rotation.z = THREE.MathUtils.lerp(
        bladeARef.current.rotation.z,
        dynamicAngle,
        0.1
      );
    }
    if (bladeBRef.current) {
      bladeBRef.current.rotation.z = THREE.MathUtils.lerp(
        bladeBRef.current.rotation.z,
        -dynamicAngle,
        0.1
      );
    }
  });

  const steelMat = (
    <meshStandardMaterial
      color="#E2E6EC"
      metalness={0.96}
      roughness={0.2}
      envMapIntensity={1.2}
    />
  );

  const brassMat = (
    <meshStandardMaterial
      color="#C9A24B"
      metalness={0.95}
      roughness={0.25}
      envMapIntensity={1.5}
    />
  );

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Central Brass Pivot Screw */}
      <mesh position={[0, 0, 0.06]}>
        <cylinderGeometry args={[0.12, 0.12, 0.14, 24]} />
        {brassMat}
      </mesh>
      <mesh position={[0, 0, 0.14]}>
        <sphereGeometry args={[0.07, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        {brassMat}
      </mesh>

      {/* BLADE A */}
      <group ref={bladeARef} position={[0, 0, 0.02]}>
        {/* Forward Blade */}
        <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.11, 2.2, 0.03]} />
          {steelMat}
        </mesh>
        {/* Blade tip bevel */}
        <mesh position={[0.02, 2.25, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.08, 0.35, 0.028]} />
          {steelMat}
        </mesh>
        {/* Handle shank */}
        <mesh position={[0, -0.65, 0]}>
          <boxGeometry args={[0.09, 1.1, 0.035]} />
          {steelMat}
        </mesh>
        {/* Finger Ring */}
        <mesh position={[-0.15, -1.35, 0]} rotation={[0, 0, 0.2]}>
          <torusGeometry args={[0.3, 0.055, 16, 32]} />
          {steelMat}
        </mesh>
        {/* Tang (pinky rest) */}
        <mesh position={[-0.45, -1.6, 0]} rotation={[0, 0, -0.7]}>
          <cylinderGeometry args={[0.03, 0.045, 0.35, 16]} />
          {steelMat}
        </mesh>
      </group>

      {/* BLADE B */}
      <group ref={bladeBRef} position={[0, 0, -0.02]}>
        {/* Forward Blade */}
        <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.11, 2.2, 0.03]} />
          {steelMat}
        </mesh>
        {/* Blade tip bevel */}
        <mesh position={[-0.02, 2.25, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.08, 0.35, 0.028]} />
          {steelMat}
        </mesh>
        {/* Handle shank */}
        <mesh position={[0, -0.65, 0]}>
          <boxGeometry args={[0.09, 1.1, 0.035]} />
          {steelMat}
        </mesh>
        {/* Thumb Ring */}
        <mesh position={[0.15, -1.35, 0]} rotation={[0, 0, -0.2]}>
          <torusGeometry args={[0.3, 0.055, 16, 32]} />
          {steelMat}
        </mesh>
      </group>
    </group>
  );
};
