import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars, Float, ContactShadows, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from '../../context/GameContext';
import { motion } from 'motion/react';
import { Apple, Bed, Heart, Smile, Coffee, Gamepad2, Sparkles, Trophy, Activity, Languages } from 'lucide-react';
import { cn } from '../../lib/utils';
import { CharacterModel } from './CharacterModel';
import { Room } from './Room';

export const HomeMode = () => {
  const { stats, updateStats, customization, score, setMode, language, setLanguage } = useGame();

  const handleAction = (action: () => void) => {
    action();
  };

  const handleModeChange = (mode: any) => {
    setMode(mode);
  };

  return (
    <div className="absolute inset-0 bg-slate-100 overflow-hidden">
      {/* 3D Scene */}
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1.8, 4.5]} fov={50} />
        <OrbitControls 
          enablePan={false} 
          minDistance={2} 
          maxDistance={7} 
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
          target={[0, 0.7, 0]}
        />
        
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={2} castShadow />
        <spotLight 
          position={[-5, 10, 5]} 
          angle={0.25} 
          penumbra={1} 
          intensity={3} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        
        <Room />
        <group position={[0, -0.45, 0]}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <CharacterModel />
          </Float>
        </group>
        
        <ContactShadows 
          position={[0, -0.48, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
        />
        
        <Suspense fallback={null}>
          <Environment preset="apartment" />
        </Suspense>
        <Preload all />
      </Canvas>

      {/* UI Overlays */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-8">
        {/* Top Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-start gap-4"
        >
          <div className="bg-white/90 backdrop-blur-md border border-white/50 p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-xl w-full md:w-auto">
            <div className="flex items-center gap-4 mb-2">
              <div 
                className="w-12 h-12 rounded-2xl shadow-inner flex items-center justify-center text-2xl"
                style={{ backgroundColor: customization.primaryColor + '20' }}
              >
                {customization.accessory === 'HAT' ? '🎩' : customization.accessory === 'GLASSES' ? '👓' : customization.accessory === 'SCARF' ? '🧣' : '👤'}
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase">
                  {customization.name}
                </h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guardian of Rights</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Online & Ready
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                  LVL {Math.floor(score / 100) + 1}
                </div>
                <button 
                  onClick={() => handleModeChange('ACHIEVEMENTS')}
                  className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-600 hover:bg-amber-500/20 transition-all pointer-events-auto"
                >
                  <Trophy size={14} />
                </button>
                <button 
                  onClick={() => handleModeChange('CUSTOMIZE')}
                  className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-600 hover:bg-indigo-500/20 transition-all pointer-events-auto"
                >
                  <Sparkles size={14} />
                </button>
                <button 
                  onClick={() => setLanguage(language === 'EN' ? 'FIL' : 'EN')}
                  className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-black transition-all pointer-events-auto flex items-center gap-1",
                    language === 'FIL' 
                      ? "bg-emerald-500 text-white" 
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  )}
                >
                  <Languages size={12} />
                  {language}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-3 w-full md:w-auto">
            <StatBar label="Health" value={stats.health} color="bg-emerald-400" icon={<Heart size={12} />} />
            <StatBar label="Energy" value={stats.energy} color="bg-blue-400" icon={<Bed size={12} />} />
            <StatBar label="Hunger" value={stats.hunger} color="bg-orange-400" icon={<Apple size={12} />} />
            <StatBar label="Happiness" value={stats.happiness} color="bg-pink-400" icon={<Smile size={12} />} />
          </div>
        </motion.div>

        {/* Bottom Actions */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-start md:justify-center gap-3 md:gap-4 pointer-events-auto pb-6 md:pb-12 overflow-x-auto no-scrollbar max-w-full"
        >
          <ActionButton 
            onClick={() => handleAction(() => updateStats({ hunger: 100, health: stats.health + 10 }))} 
            icon={<Coffee size={20} />} 
            label="Feed" 
            color="text-orange-500"
            hoverBg="hover:bg-orange-50"
          />
          <ActionButton 
            onClick={() => handleAction(() => updateStats({ energy: 100, health: stats.health + 20 }))} 
            icon={<Bed size={20} />} 
            label="Rest" 
            color="text-blue-500"
            hoverBg="hover:bg-blue-50"
          />
          <ActionButton 
            onClick={() => handleAction(() => updateStats({ happiness: 100, energy: stats.energy - 10 }))} 
            icon={<Gamepad2 size={20} />} 
            label="Play" 
            color="text-indigo-500"
            hoverBg="hover:bg-indigo-50"
          />
          <ActionButton 
            onClick={() => handleAction(() => updateStats({ health: 100, happiness: stats.happiness + 10 }))} 
            icon={<Sparkles size={20} />} 
            label="Clean" 
            color="text-emerald-500"
            hoverBg="hover:bg-emerald-50"
          />
          <ActionButton 
            onClick={() => handleAction(() => updateStats({ happiness: 100, hunger: stats.hunger - 10 }))} 
            icon={<Apple size={20} />} 
            label="Treat" 
            color="text-rose-500"
            hoverBg="hover:bg-rose-50"
          />
        </motion.div>
      </div>

      {/* Subtle Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-[circle_at_center,_transparent_0%,_rgba(0,0,0,0.1)_100%]" />
    </div>
  );
};

const ActionButton = ({ onClick, icon, label, color, hoverBg }: { onClick: () => void, icon: React.ReactNode, label: string, color: string, hoverBg: string }) => (
  <div className="flex flex-col items-center gap-1.5">
    <button
      onClick={onClick}
      className={cn(
        "p-4 md:p-5 bg-white rounded-[20px] md:rounded-[24px] shadow-lg border border-slate-100 transition-all active:scale-90",
        color,
        hoverBg
      )}
    >
      {icon}
    </button>
    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</span>
  </div>
);

const StatBar = ({ label, value, color, icon }: { label: string, value: number, color: string, icon: React.ReactNode }) => (
  <div className="w-full md:w-56 bg-white/80 backdrop-blur-xl p-2.5 md:p-3 rounded-[20px] md:rounded-[24px] shadow-lg border border-white/60">
    <div className="flex justify-between items-center mb-1 px-1">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
        <div className={cn("p-1 rounded-md bg-white shadow-sm", color.replace('bg-', 'text-'))}>
          {icon}
        </div>
        {label}
      </span>
      <span className="text-[9px] font-mono font-black text-slate-900">{Math.round(value)}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <div 
        style={{ width: `${value}%` }}
        className={cn("h-full rounded-full transition-all duration-1000", color)}
      />
    </div>
  </div>
);
