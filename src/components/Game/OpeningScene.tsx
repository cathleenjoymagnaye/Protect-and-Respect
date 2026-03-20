import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../context/GameContext';
import { Shield, Sparkles, Heart, GraduationCap, Smile, Activity, Languages } from 'lucide-react';
import { cn } from '../../lib/utils';

export const OpeningScene = () => {
  const { setMode, language, setLanguage } = useGame();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFil = language === 'FIL';

  useEffect(() => {
    // Cute background music for opening scene
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=happy-kids-111912.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    const playAudio = () => {
      audioRef.current?.play().catch(e => console.log("Audio play blocked", e));
    };

    // Play on mount (might be blocked by browser until interaction)
    playAudio();

    // Also try to play on first click anywhere if blocked
    window.addEventListener('click', playAudio, { once: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener('click', playAudio);
    };
  }, []);

  const handleStart = () => {
    setMode('CUSTOMIZE');
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-sky-400 to-indigo-500 flex items-center justify-center overflow-hidden">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
        <button 
          onClick={() => setLanguage(language === 'EN' ? 'FIL' : 'EN')}
          className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm md:text-base font-black hover:bg-white/30 transition-all"
        >
          <Languages size={18} />
          {language === 'EN' ? 'ENGLISH' : 'FILIPINO'}
        </button>
      </div>

      {/* Playful Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              scale: 0.4 + Math.random() * 0.8,
              rotate: 0
            }}
            animate={{ 
              y: -200,
              rotate: 360,
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 8 + Math.random() * 12, 
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute"
          >
            {i % 4 === 0 ? <Heart className="text-rose-300 fill-rose-300/40" size={28} /> : 
             i % 4 === 1 ? <Sparkles className="text-amber-300" size={24} /> : 
             i % 4 === 2 ? <Smile className="text-sky-200" size={22} /> :
             <div className="w-4 h-4 bg-white rounded-full blur-[2px]" />}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.5 }}
          className="mb-10"
        >
          <div className="relative inline-block mb-8">
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-10 border-4 border-dashed border-white/30 rounded-full"
            />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 border-2 border-white/40 rounded-full"
            />
            <div className="w-36 h-36 bg-white rounded-[48px] flex items-center justify-center shadow-[0_25px_80px_rgba(0,0,0,0.3)] relative z-10">
              <Shield size={72} className="text-indigo-600" strokeWidth={2.5} />
            </div>
            
            {/* Rights Icons Orbiting */}
            <RightIcon icon={<GraduationCap size={18} />} color="bg-emerald-400" delay={0} x={-70} y={-50} />
            <RightIcon icon={<Heart size={18} />} color="bg-rose-400" delay={0.2} x={70} y={-50} />
            <RightIcon icon={<Smile size={18} />} color="bg-amber-400" delay={0.4} x={70} y={50} />
            <RightIcon icon={<Activity size={18} />} color="bg-sky-400" delay={0.6} x={-70} y={50} />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter mb-4 drop-shadow-[0_12px_15px_rgba(0,0,0,0.3)]">
            {isFil ? 'PROTEKTA AT RESPETO' : 'PROTECT AND RESPECT'}
          </h1>
          <p className="text-lg md:text-2xl font-bold text-amber-300 tracking-widest uppercase drop-shadow-md">
            {isFil ? 'PAGSULONG SA KAPAKANAN AT SEGURIDAD NG BATA' : 'PROMOTING CHILD WELFARE AND SECURITY'}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-8 md:mt-12"
        >
          <button
            onClick={handleStart}
            className="group relative px-12 py-6 md:px-20 md:py-8 bg-amber-400 rounded-[32px] md:rounded-[40px] font-black text-slate-900 text-2xl md:text-3xl shadow-[0_20px_50px_rgba(245,158,11,0.5)] hover:scale-110 active:scale-95 transition-all overflow-hidden border-b-[8px] md:border-b-[12px] border-amber-600"
          >
            <span className="relative z-10 flex items-center gap-4">
              {isFil ? 'MAGLARO NA' : 'PLAY NOW'} <Sparkles size={32} className="text-white animate-pulse" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const RightIcon = ({ icon, color, delay, x, y }: { icon: React.ReactNode, color: string, delay: number, x: number, y: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
    animate={{ scale: 1, opacity: 1, x, y }}
    whileHover={{ scale: 1.2, rotate: 15 }}
    transition={{ delay: 1.4 + delay, type: "spring", stiffness: 250 }}
    className={cn("absolute w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl z-20 cursor-pointer", color)}
  >
    {icon}
  </motion.div>
);
