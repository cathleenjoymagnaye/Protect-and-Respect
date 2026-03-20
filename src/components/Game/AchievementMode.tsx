import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../context/GameContext';
import { Trophy, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { CharacterModel } from './CharacterModel';

export const AchievementMode = () => {
  const { setMode, achievements, language } = useGame();
  const isFil = language === 'FIL';

  const handleBack = () => {
    setMode('HOME');
  };

  return (
    <div className="w-full h-full bg-amber-50 flex flex-col relative overflow-hidden">
      {/* 3D Character Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 1.5, 4]} fov={35} />
          <ambientLight intensity={0.8} />
          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <CharacterModel />
            </Float>
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      <div className="flex-1 p-6 overflow-y-auto z-10">
        <div className="max-w-4xl mx-auto w-full">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-amber-200">
                <Trophy size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-amber-900">{isFil ? 'Mga Nakamit' : 'Achievements'}</h1>
                <p className="text-sm text-amber-600 font-medium">{isFil ? 'Ang iyong paglalakbay bilang Tagapangalaga' : 'Your journey as a Guardian'}</p>
              </div>
            </div>
            <button 
              onClick={handleBack}
              className="p-3 bg-white rounded-xl shadow-sm border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-24">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-6 rounded-[32px] border-2 flex items-center gap-6 transition-all",
                  achievement.unlocked 
                    ? "bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg shadow-amber-100" 
                    : "bg-amber-100/50 border-transparent opacity-60"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0",
                  achievement.unlocked ? "bg-amber-500 text-white" : "bg-amber-200 text-amber-400"
                )}>
                  {achievement.unlocked ? <Trophy size={24} /> : <Lock size={24} />}
                </div>
                
                <div className="flex-1">
                  <h3 className={cn("font-bold text-lg mb-1", achievement.unlocked ? "text-slate-800" : "text-slate-400")}>
                    {isFil ? (achievement.titleFil || achievement.title) : achievement.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-tight">
                    {isFil ? (achievement.descriptionFil || achievement.description) : achievement.description}
                  </p>
                </div>

                {achievement.unlocked && (
                  <div className="text-emerald-500">
                    <CheckCircle2 size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
