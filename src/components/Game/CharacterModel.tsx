import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';

interface CharacterModelProps {
  hasShield?: boolean;
  isRunning?: boolean;
}

export const CharacterModel: React.FC<CharacterModelProps> = ({ hasShield, isRunning }) => {
  const { customization } = useGame();
  const groupRef = useRef<THREE.Group>(null);
  const armLRef = useRef<THREE.Mesh>(null);
  const armRRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      if (isRunning) {
        // Running bobbing animation
        groupRef.current.position.y = Math.abs(Math.sin(t * 10)) * 0.1;
        groupRef.current.rotation.x = Math.sin(t * 10) * 0.05;
        
        // Arm swing
        if (armLRef.current) armLRef.current.rotation.x = Math.sin(t * 10) * 0.8;
        if (armRRef.current) armRRef.current.rotation.x = -Math.sin(t * 10) * 0.8;
      } else {
        // Idle breathing animation
        groupRef.current.position.y = Math.sin(t * 1.5) * 0.05;
        if (armLRef.current) armLRef.current.rotation.x = 0;
        if (armRRef.current) armRRef.current.rotation.x = 0;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.35, 0.6, 8, 20]} />
        <meshStandardMaterial color={customization.primaryColor} roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#ffdbac" roughness={0.4} />
      </mesh>

      {/* Hair/Cap */}
      <mesh position={[0, 1.55, -0.05]} rotation={[-0.2, 0, 0]}>
        <sphereGeometry args={[0.46, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#312e81" />
      </mesh>

      {/* Eyes */}
      <group position={[0, 1.35, 0.38]}>
        <mesh position={[0.15, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[-0.15, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Eye highlights */}
        <mesh position={[0.17, 0.02, 0.04]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[-0.13, 0.02, 0.04]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>

      {/* Blush */}
      <mesh position={[0.25, 1.2, 0.35]} rotation={[0, 0.2, 0]}>
        <planeGeometry args={[0.1, 0.05]} />
        <meshStandardMaterial color="#fca5a5" transparent opacity={0.4} />
      </mesh>
      <mesh position={[-0.25, 1.2, 0.35]} rotation={[0, -0.2, 0]}>
        <planeGeometry args={[0.1, 0.05]} />
        <meshStandardMaterial color="#fca5a5" transparent opacity={0.4} />
      </mesh>

      {/* Mouth - Smile */}
      <mesh position={[0, 1.1, 0.42]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.1, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#991b1b" />
      </mesh>

      {/* Accessories */}
      {customization.accessory === 'GLASSES' && (
        <group position={[0, 1.35, 0.4]}>
          <mesh position={[0.15, 0, 0]}>
            <torusGeometry args={[0.12, 0.02, 16, 32]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[-0.15, 0, 0]}>
            <torusGeometry args={[0.12, 0.02, 16, 32]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.02, 0.02]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
      )}

      {customization.accessory === 'HAT' && (
        <group position={[0, 1.7, 0]}>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
            <meshStandardMaterial color="#991b1b" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
            <meshStandardMaterial color="#991b1b" />
          </mesh>
        </group>
      )}

      {customization.accessory === 'SCARF' && (
        <group position={[0, 0.95, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.38, 0.08, 16, 32]} />
            <meshStandardMaterial color="#1e40af" />
          </mesh>
          <mesh position={[0.2, -0.3, 0.3]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.15, 0.5, 0.05]} />
            <meshStandardMaterial color="#1e40af" />
          </mesh>
        </group>
      )}

      {/* Arms */}
      <mesh ref={armRRef} position={[0.45, 0.7, 0]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.08, 0.4, 4, 12]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh ref={armLRef} position={[-0.45, 0.7, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.08, 0.4, 4, 12]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Shield Effect */}
      {hasShield && (
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial color="#60a5fa" transparent opacity={0.3} wireframe />
        </mesh>
      )}
    </group>
  );
};
