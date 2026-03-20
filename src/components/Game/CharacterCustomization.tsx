import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../../context/GameContext';
import { CharacterModel } from './CharacterModel';
import { Check, ArrowRight, User, Palette, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

const COLORS = [
  { id: 'indigo', value: '#4f46e5', name: 'Indigo', nameFil: 'Indigo' },
  { id: 'rose', value: '#e11d48', name: 'Rose', nameFil: 'Rosas' },
  { id: 'emerald', value: '#10b981', name: 'Emerald', nameFil: 'Esmeralda' },
  { id: 'amber', value: '#f59e0b', name: 'Amber', nameFil: 'Amber' },
  { id: 'violet', value: '#8b5cf6', name: 'Violet', nameFil: 'Biyoleta' },
  { id: 'slate', value: '#475569', name: 'Slate', nameFil: 'Slate' },
];

const ACCESSORIES = [
  { id: 'NONE', name: 'None', nameFil: 'Wala', icon: '🚫' },
  { id: 'GLASSES', name: 'Glasses', nameFil: 'Salamin', icon: '👓' },
  { id: 'HAT', name: 'Hat', nameFil: 'Sumbrero', icon: '🎩' },
  { id: 'SCARF', name: 'Scarf', nameFil: 'Iskarp', icon: '🧣' },
];

export const CharacterCustomization = () => {
  const { customization, setCustomization, setMode, language } = useGame();
  const [step, setStep] = useState(1);
  const isFil = language === 'FIL';

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setMode('HOME');
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleColorSelect = (colorValue: string) => {
    setCustomization({ ...customization, primaryColor: colorValue });
  };

  const handleAccessorySelect = (accId: any) => {
    setCustomization({ ...customization, accessory: accId });
  };

  const handleEnterMission = () => {
    setMode('HOME');
  };

  return (
    <div className="absolute inset-0 bg-slate-50 flex flex-col md:flex-row overflow-hidden">
      {/* 3D Preview */}
      <div className="flex-1 relative h-[40vh] md:h-full bg-slate-100">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 1.5, 4]} fov={35} />
          <OrbitControls 
            enablePan={false} 
            minDistance={3} 
            maxDistance={6} 
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
          
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <CharacterModel />
            </Float>
            <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <h2 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">{isFil ? 'Preview ng Tagapangalaga' : 'Guardian Preview'}</h2>
        </div>
      </div>

      {/* Customization UI */}
      <div className="w-full md:w-[450px] bg-white p-8 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-950 tracking-tighter">{isFil ? 'I-CUSTOMIZE' : 'CUSTOMIZE'}</h1>
            <p className="text-slate-400 font-medium text-sm">{isFil ? `Hakbang ${step} ng 3` : `Step ${step} of 3`}</p>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className={cn("w-8 h-1.5 rounded-full transition-all duration-500", step >= i ? "bg-indigo-500" : "bg-slate-100")} />
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-indigo-500 mb-2">
                  <User size={20} />
                  <h3 className="font-black uppercase tracking-widest text-xs">{isFil ? 'Pagkakakilanlan' : 'Identity'}</h3>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-700">{isFil ? 'Pangalan ng Tagapangalaga' : 'Guardian Name'}</label>
                  <input
                    type="text"
                    value={customization.name}
                    onChange={(e) => setCustomization({ ...customization, name: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-950 focus:border-indigo-500 focus:outline-none transition-all"
                    placeholder={isFil ? "Ilagay ang pangalan..." : "Enter name..."}
                  />
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {isFil ? 'Ang pangalang ito ay gagamitin sa iyong misyon na protektahan ang mga karapatan ng bata.' : 'This name will be used throughout your mission to protect child rights.'}
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-indigo-500 mb-2">
                  <Palette size={20} />
                  <h3 className="font-black uppercase tracking-widest text-xs">{isFil ? 'Itsura' : 'Appearance'}</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorSelect(color.value)}
                      className={cn(
                        "group relative aspect-square rounded-2xl transition-all p-1",
                        customization.primaryColor === color.value ? "ring-4 ring-indigo-500 ring-offset-2" : "hover:scale-105"
                      )}
                    >
                      <div className="w-full h-full rounded-xl shadow-lg" style={{ backgroundColor: color.value }} />
                      {customization.primaryColor === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <Check size={24} strokeWidth={4} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-indigo-500 mb-2">
                  <Sparkles size={20} />
                  <h3 className="font-black uppercase tracking-widest text-xs">{isFil ? 'Mga Aksesorya' : 'Accessories'}</h3>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="pb-4"
                >
                  <button
                    onClick={handleEnterMission}
                    className="w-full py-5 bg-emerald-500 rounded-2xl font-black text-white shadow-xl hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    {isFil ? 'SIMULAN ANG MISYON' : 'ENTER MISSION'} <ArrowRight size={20} />
                  </button>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  {ACCESSORIES.map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => handleAccessorySelect(acc.id as any)}
                      className={cn(
                        "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all",
                        customization.accessory === acc.id 
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600" 
                          : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"
                      )}
                    >
                      <span className="text-3xl">{acc.icon}</span>
                      <span className="font-bold text-sm">{isFil ? acc.nameFil : acc.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-8 mt-auto flex gap-4">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-8 py-5 bg-slate-100 rounded-2xl font-black text-slate-600 hover:bg-slate-200 transition-all"
            >
              {isFil ? 'BALIK' : 'BACK'}
            </button>
          )}
          {step < 3 && (
            <button
              onClick={handleNext}
              className="flex-1 px-8 py-5 bg-indigo-500 rounded-2xl font-black text-white shadow-xl hover:bg-indigo-600 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              {isFil ? 'SUSUNOD' : 'NEXT'} <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
