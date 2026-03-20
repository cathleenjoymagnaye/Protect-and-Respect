import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, XCircle, ShieldCheck, BookOpen, Star, Play, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const LANE_WIDTH = 2.5;
const INITIAL_SPEED = 0.25;
const MAX_SPEED = 0.6;

interface ObstacleData {
  id: number;
  z: number;
  lane: number;
  type: 'barrier' | 'item' | 'powerup';
  itemType?: 'book' | 'star' | 'badge';
  powerupType?: 'shield';
}

import { CharacterModel } from './CharacterModel';

const Player = ({ lane, hasShield, customization }: { lane: number, hasShield: boolean, customization: any }) => {
  const meshRef = useRef<THREE.Group>(null);
  const targetX = (lane - 1) * LANE_WIDTH;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.15);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, (meshRef.current.position.x - targetX) * 0.5, 0.1);
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      <CharacterModel customization={customization} hasShield={hasShield} isRunning={true} />
    </group>
  );
};

const Obstacle = ({ data, speed }: { data: ObstacleData, speed: number }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.z += speed;
    }
  });

  return (
    <group ref={ref} position={[(data.lane - 1) * LANE_WIDTH, 0, data.z]}>
      {data.type === 'barrier' ? (
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.8, 1, 0.5]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.2} />
        </mesh>
      ) : data.type === 'powerup' ? (
        <Float speed={4} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[0, 0.8, 0]}>
            <torusGeometry args={[0.4, 0.1, 16, 32]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
          </mesh>
        </Float>
      ) : (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[0, 0.8, 0]}>
            <octahedronGeometry args={[0.4]} />
            <meshStandardMaterial 
              color={data.itemType === 'badge' ? '#fbbf24' : data.itemType === 'book' ? '#10b981' : '#f472b6'} 
              emissive={data.itemType === 'badge' ? '#fbbf24' : data.itemType === 'book' ? '#10b981' : '#f472b6'} 
              emissiveIntensity={0.5} 
            />
          </mesh>
        </Float>
      )}
    </group>
  );
};

const Road = ({ speed }: { speed: number }) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    // Light park path color
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, 0, 256, 256);
    
    // Path borders
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(0, 256);
    ctx.moveTo(256, 0); ctx.lineTo(256, 256);
    ctx.stroke();

    // Subtle path texture
    ctx.strokeStyle = '#e2e8f0';
    ctx.setLineDash([10, 20]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(85, 0); ctx.lineTo(85, 256);
    ctx.moveTo(170, 0); ctx.lineTo(170, 256);
    ctx.stroke();
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 20);

  useFrame(() => {
    texture.offset.y -= speed * 0.05;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -25]}>
      <planeGeometry args={[10, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Tree = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* Trunk */}
    <mesh position={[0, 1, 0]}>
      <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
      <meshStandardMaterial color="#78350f" />
    </mesh>
    {/* Leaves */}
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#166534" />
      </mesh>
      <mesh position={[0.4, 2.2, 0.4]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>
      <mesh position={[-0.4, 2.2, -0.4]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>
    </Float>
  </group>
);

const Bench = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => (
  <group position={position} rotation={rotation}>
    {/* Seat */}
    <mesh position={[0, 0.4, 0]}>
      <boxGeometry args={[1.5, 0.1, 0.6]} />
      <meshStandardMaterial color="#451a03" />
    </mesh>
    {/* Backrest */}
    <mesh position={[0, 0.7, -0.25]} rotation={[-0.2, 0, 0]}>
      <boxGeometry args={[1.5, 0.5, 0.1]} />
      <meshStandardMaterial color="#451a03" />
    </mesh>
    {/* Legs */}
    <mesh position={[0.6, 0.2, 0.2]}>
      <boxGeometry args={[0.1, 0.4, 0.1]} />
      <meshStandardMaterial color="#1e293b" />
    </mesh>
    <mesh position={[-0.6, 0.2, 0.2]}>
      <boxGeometry args={[0.1, 0.4, 0.1]} />
      <meshStandardMaterial color="#1e293b" />
    </mesh>
    <mesh position={[0.6, 0.2, -0.2]}>
      <boxGeometry args={[0.1, 0.4, 0.1]} />
      <meshStandardMaterial color="#1e293b" />
    </mesh>
    <mesh position={[-0.6, 0.2, -0.2]}>
      <boxGeometry args={[0.1, 0.4, 0.1]} />
      <meshStandardMaterial color="#1e293b" />
    </mesh>
  </group>
);

const Scenery = ({ speed }: { speed: number }) => {
  const group = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (group.current) {
      group.current.children.forEach((child) => {
        child.position.z += speed;
        if (child.position.z > 10) {
          child.position.z = -100 - Math.random() * 50;
        }
      });
    }
  });

  const elements = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      type: Math.random() > 0.3 ? 'tree' : 'bench',
      x: i % 2 === 0 ? -6 - Math.random() * 4 : 6 + Math.random() * 4,
      z: -i * 5,
      rotation: (i % 2 === 0 ? [0, Math.PI / 2, 0] : [0, -Math.PI / 2, 0]) as [number, number, number]
    }));
  }, []);

  return (
    <group ref={group}>
      {/* Grass floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -25]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#14532d" />
      </mesh>
      
      {elements.map((el) => (
        el.type === 'tree' ? (
          <Tree key={el.id} position={[el.x, 0, el.z]} />
        ) : (
          <Bench key={el.id} position={[el.x, 0, el.z]} rotation={el.rotation} />
        )
      ))}
    </group>
  );
};

const WindParticles = ({ speed }: { speed: number }) => {
  const points = useRef<THREE.Points>(null);
  const count = 100;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = Math.random() * 5;
      pos[i * 3 + 2] = Math.random() * -100;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (points.current) {
      const attr = points.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        attr.setZ(i, attr.getZ(i) + speed * 2);
        if (attr.getZ(i) > 10) {
          attr.setZ(i, -100);
        }
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.3} />
    </points>
  );
};

export const RunnerMode = () => {
  const { setMode, score, setScore, updateStats, unlockAchievement, language, customization } = useGame();
  const [lane, setLane] = useState(1);
  const [obstacles, setObstacles] = useState<ObstacleData[]>([]);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [hasShield, setHasShield] = useState(false);
  const [shieldTime, setShieldTime] = useState(0);
  const touchStart = useRef<number | null>(null);
  const isFil = language === 'FIL';

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;

    if (Math.abs(diff) > 30) { // Threshold for swipe
      if (diff > 0) {
        // Swipe Left
        if (lane > 0) {
          setLane(l => Math.max(0, l - 1));
        }
      } else {
        // Swipe Right
        if (lane < 2) {
          setLane(l => Math.min(2, l + 1));
        }
      }
    }
    touchStart.current = null;
  };

  const spawnObstacle = () => {
    const typeRand = Math.random();
    let type: ObstacleData['type'] = 'barrier';
    let itemType: ObstacleData['itemType'];
    let powerupType: ObstacleData['powerupType'];

    if (typeRand > 0.4) {
      type = 'item';
      itemType = ['book', 'star', 'badge'][Math.floor(Math.random() * 3)] as any;
    } else if (typeRand < 0.05) {
      type = 'powerup';
      powerupType = 'shield';
    }

    return {
      id: Date.now() + Math.random(),
      z: -60,
      lane: Math.floor(Math.random() * 3),
      type,
      itemType,
      powerupType
    };
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'PLAYING') return;
      if (e.key === 'ArrowLeft') {
        if (lane > 0) {
          setLane(l => Math.max(0, l - 1));
        }
      }
      if (e.key === 'ArrowRight') {
        if (lane < 2) {
          setLane(l => Math.min(2, l + 1));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Game Loop
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const gameLoop = setInterval(() => {
      setDistance(d => d + 1);
      setSpeed(s => Math.min(MAX_SPEED, s + 0.0001));
      
      if (hasShield) {
        setShieldTime(t => {
          if (t <= 0) setHasShield(false);
          return t - 50;
        });
      }

      setObstacles(prev => {
        const next = prev.map(o => ({ ...o, z: o.z + speed })).filter(o => o.z < 10);
        
        // Collision detection
        next.forEach(o => {
          if (o.z > -1 && o.z < 1 && o.lane === lane) {
            if (o.type === 'barrier') {
              if (hasShield) {
                setHasShield(false);
                o.z = 100; // Remove barrier
              } else {
                setGameState('GAMEOVER');
              }
            } else if (o.type === 'powerup') {
              setHasShield(true);
              setShieldTime(5000);
              o.z = 100;
            } else {
              setScore(score + 10);
              updateStats({ happiness: Math.min(100, score / 10) });
              o.z = 100; 
            }
          }
        });

        // Spawning
        if (next.length < 5 && Math.random() > 0.95) {
          next.push(spawnObstacle());
        }

        return next;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameState, lane, score, speed, hasShield]);

  return (
    <div 
      className="absolute inset-0 bg-sky-400 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Canvas camera={{ position: [0, 4, 8], fov: 45, rotation: [-0.3, 0, 0] }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        
        <Road speed={speed} />
        <Scenery speed={speed} />
        <WindParticles speed={speed} />
        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>
        <Player lane={lane} hasShield={hasShield} customization={customization} />
        {obstacles.map(o => (
          <Obstacle key={o.id} data={o} speed={speed} />
        ))}
        
        <fog attach="fog" args={['#7dd3fc', 10, 60]} />
      </Canvas>

      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 flex justify-between items-start pointer-events-none z-10">
        <div className="flex gap-2 md:gap-4">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 md:px-6 md:py-3 rounded-2xl md:rounded-3xl shadow-2xl">
            <span className="text-[8px] md:text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] block mb-0.5 md:mb-1">{isFil ? 'Puntos' : 'Score'}</span>
            <span className="text-xl md:text-3xl font-mono font-bold text-white leading-none">{score}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 md:px-6 md:py-3 rounded-2xl md:rounded-3xl shadow-2xl">
            <span className="text-[8px] md:text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] block mb-0.5 md:mb-1">{isFil ? 'Distansya' : 'Distance'}</span>
            <span className="text-xl md:text-3xl font-mono font-bold text-white leading-none tracking-tighter">{distance}m</span>
          </div>
        </div>

        {hasShield && (
          <div 
            className="bg-blue-500/20 backdrop-blur-xl border border-blue-400/50 px-4 py-2 md:px-6 md:py-3 rounded-2xl md:rounded-3xl flex items-center gap-2 md:gap-3"
          >
            <ShieldCheck className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
            <div className="h-1 w-16 md:h-1.5 md:w-24 bg-blue-900/50 rounded-full overflow-hidden">
              <div 
                style={{ width: `${(shieldTime / 5000) * 100}%` }}
                className="h-full bg-blue-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Overlays */}
      {gameState === 'START' && (
        <div 
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6"
        >
          <div 
            className="bg-white w-full max-w-md rounded-[40px] p-10 text-center shadow-2xl"
          >
              <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3">
                <Play size={48} fill="currentColor" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{isFil ? 'Handa ka na bang Tumakbo?' : 'Ready to Run?'}</h2>
              <p className="text-slate-500 mb-10 leading-relaxed font-medium">
                {isFil 
                  ? 'Iwasan ang mga pulang hadlang, mangolekta ng mga item para sa puntos, at kumuha ng mga asul na singsing para sa pansamantalang kalasag!' 
                  : 'Avoid the red barriers, collect items for points, and grab blue rings for a temporary shield!'}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl">
                  <ArrowLeft className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{isFil ? 'I-swipe Pakaliwa' : 'Swipe Left'}</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-2xl">
                  <ArrowRight className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{isFil ? 'I-swipe Pakanan' : 'Swipe Right'}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  setGameState('PLAYING');
                }}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95"
              >
                {isFil ? 'SIMULAN ANG MISYON' : 'START MISSION'}
              </button>
            </div>
          </div>
        )}

        {gameState === 'GAMEOVER' && (
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center z-50 p-6"
          >
            <div 
              className="bg-white w-full max-w-md rounded-[40px] p-10 text-center shadow-2xl"
            >
              <div className="w-24 h-24 bg-red-100 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 -rotate-3">
                <XCircle size={48} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{isFil ? 'Nabigo ang Misyon' : 'Mission Failed'}</h2>
              <p className="text-slate-500 mb-10 font-medium">
                {isFil ? `Ipinagtanggol mo ang mga karapatan sa loob ng ${distance} metro!` : `You defended rights for ${distance} meters!`}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-slate-50 p-6 rounded-3xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">{isFil ? 'Puntos' : 'Score'}</span>
                  <span className="text-3xl font-bold text-slate-900">{score}</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">{isFil ? 'Distansya' : 'Distance'}</span>
                  <span className="text-3xl font-bold text-slate-900">{distance}m</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => {
                    unlockAchievement('first-run');
                    setGameState('START');
                    setScore(0);
                    setDistance(0);
                    setObstacles([]);
                    setSpeed(INITIAL_SPEED);
                  }}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
                >
                  {isFil ? 'ULITIN ANG MISYON' : 'RETRY MISSION'}
                </button>
                <button 
                  onClick={() => {
                    unlockAchievement('first-run');
                    setMode('HOME');
                  }}
                  className="w-full py-5 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
                >
                  {isFil ? 'BALIK SA BASE' : 'BACK TO BASE'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};
