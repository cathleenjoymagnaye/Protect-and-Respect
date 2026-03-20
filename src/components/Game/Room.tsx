import React from 'react';

export const Furniture = () => {
  return (
    <group>
      {/* Bed */}
      <group position={[-3, 0, -3]}>
        <mesh position={[0, 0.2, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.5, 0.4, 4]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <mesh position={[0, 0.45, 0.5]} receiveShadow castShadow>
          <boxGeometry args={[2.4, 0.1, 3]} />
          <meshStandardMaterial color="#6366f1" />
        </mesh>
        {/* Pillow */}
        <mesh position={[0, 0.5, -1.4]} castShadow>
          <boxGeometry args={[1.8, 0.2, 0.8]} />
          <meshStandardMaterial color="white" />
        </mesh>
        {/* Headboard */}
        <mesh position={[0, 0.8, -1.95]} castShadow>
          <boxGeometry args={[2.5, 1.2, 0.1]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      </group>

      {/* Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]} receiveShadow>
        <circleGeometry args={[2.5, 32]} />
        <meshStandardMaterial color="#818cf8" transparent opacity={0.6} />
      </mesh>

      {/* Desk */}
      <group position={[3, 0, -3.5]}>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.1, 1.5]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[-1.1, 0.25, 0.6]} castShadow>
          <boxGeometry args={[0.1, 0.7, 0.1]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[1.1, 0.25, 0.6]} castShadow>
          <boxGeometry args={[0.1, 0.7, 0.1]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[-1.1, 0.25, -0.6]} castShadow>
          <boxGeometry args={[0.1, 0.7, 0.1]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[1.1, 0.25, -0.6]} castShadow>
          <boxGeometry args={[0.1, 0.7, 0.1]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        {/* Laptop/Book */}
        <mesh position={[0, 0.7, 0]} rotation={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.8, 0.05, 0.6]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* Window */}
      <group position={[0, 2.5, -4.95]}>
        <mesh receiveShadow>
          <planeGeometry args={[3, 2.5]} />
          <meshStandardMaterial color="#bae6fd" emissive="#bae6fd" emissiveIntensity={0.5} />
        </mesh>
        {/* Window Frame */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[3.2, 0.1, 0.1]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0, 1.25, 0.02]}>
          <boxGeometry args={[3.2, 0.1, 0.1]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0, -1.25, 0.02]}>
          <boxGeometry args={[3.2, 0.1, 0.1]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[1.55, 0, 0.02]}>
          <boxGeometry args={[0.1, 2.6, 0.1]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[-1.55, 0, 0.02]}>
          <boxGeometry args={[0.1, 2.6, 0.1]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.05, 2.5, 0.05]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      </group>

      {/* Posters */}
      <mesh position={[-4.95, 2.5, -1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.5, 2]} />
        <meshStandardMaterial color="#f472b6" />
      </mesh>
      <mesh position={[-4.95, 2.5, 1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.2, 1.5]} />
        <meshStandardMaterial color="#34d399" />
      </mesh>

      {/* Bookshelf */}
      <group position={[4.5, 0, 1]}>
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 3, 1.5]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        {/* Shelves */}
        {[0.5, 1.2, 1.9, 2.6].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[0.75, 0.05, 1.4]} />
            <meshStandardMaterial color="#92400e" />
          </mesh>
        ))}
        {/* Trophy on shelf */}
        <group position={[0, 2.1, 0]}>
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.1, 0.2, 16]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.35, 0]} castShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Plant */}
      <group position={[-4, 0, 4]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.2, 0.6, 16]} />
          <meshStandardMaterial color="#a16207" />
        </mesh>
        <mesh position={[0, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>
      </group>
    </group>
  );
};

export const Room = () => {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#eef2ff" />
      </mesh>
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#eef2ff" />
      </mesh>
      <mesh position={[5, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color="#eef2ff" />
      </mesh>
      
      <Furniture />
    </group>
  );
};
