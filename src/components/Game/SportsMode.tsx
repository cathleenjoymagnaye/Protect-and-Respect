import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useGame } from '../../context/GameContext';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ArrowLeft, Target, Activity, Info, Star, Heart, Zap } from 'lucide-react';
import { CHILD_RIGHTS } from '../../constants';
import { cn } from '../../lib/utils';

type SportType = 'BASKETBALL' | 'FISHING' | null;

interface RightModalProps {
  isOpen: boolean;
  onClose: () => void;
  right: { title: string; description: string; titleFil?: string; descriptionFil?: string } | null;
  color: string;
  icon: React.ReactNode;
  isFil: boolean;
}

const RightModal = ({ isOpen, onClose, right, color, icon, isFil }: RightModalProps) => (
  <AnimatePresence>
    {isOpen && right && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-6"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, rotate: -2 }}
          animate={{ scale: 1, y: 0, rotate: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-4 border-white text-center relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className={cn("absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10", color)} />
          <div className={cn("absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-10", color)} />
          
          <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl text-white transform -rotate-6", color)}>
            {icon}
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-3 uppercase tracking-tight leading-none">
            {isFil ? (right.titleFil || right.title) : right.title}
          </h2>
          
          <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-6" />
          
          <p className="text-slate-600 mb-8 leading-relaxed font-medium">
            {isFil ? (right.descriptionFil || right.description) : right.description}
          </p>
          
          <button
            onClick={onClose}
            className={cn(
              "w-full text-white font-black py-5 rounded-2xl shadow-lg transition-all active:scale-95 text-lg tracking-wider uppercase",
              color,
              "hover:brightness-110"
            )}
          >
            {isFil ? 'NAINTINDIHAN!' : 'GOT IT!'}
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const SportsMode = () => {
  const { setMode, updateStats, setScore, language } = useGame();
  const [selectedSport, setSelectedSport] = useState<SportType>(null);
  const isFil = language === 'FIL';

  const handleSportSelect = (sport: SportType) => {
    setSelectedSport(sport);
  };

  const handleGameFinish = (points: number, stats: Partial<{ happiness: number, health: number, energy: number }>) => {
    setScore(prev => prev + points);
    updateStats(stats);
  };

  return (
    <div className="w-full h-full bg-slate-50 flex flex-col p-6 overflow-y-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {selectedSport ? (
            <button 
              onClick={() => handleSportSelect(null)}
              className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all active:scale-90"
            >
              <ArrowLeft size={24} className="text-slate-600" />
            </button>
          ) : (
            <div className="p-4 bg-orange-500 text-white rounded-2xl shadow-lg shadow-orange-200">
              <Activity size={32} />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              {selectedSport 
                ? (isFil 
                    ? (selectedSport === 'BASKETBALL' ? 'BASKETBOL' : 'PANGINGISDA') 
                    : selectedSport.replace('_', ' ')) 
                : (isFil ? 'REKREASYON' : 'RECREATION')}
            </h1>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
              {selectedSport 
                ? (isFil ? 'Higitan ang iyong iskor!' : 'Beat your high score!') 
                : (isFil ? 'Pumili ng laro' : 'Choose a game to play')}
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedSport ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <SportCard 
              title={isFil ? "Basketbol" : "Basketball"}
              description={isFil ? "Mag-shoot ng bola at pagbutihin ang iyong asinta." : "Shoot some hoops and improve your accuracy."}
              icon="🏀"
              color="bg-orange-500"
              onClick={() => handleSportSelect('BASKETBALL')}
            />
            <SportCard 
              title={isFil ? "Pangingisda" : "Fishing"}
              description={isFil ? "Manghuli ng isda at alamin ang iyong mga karapatan!" : "Catch fish and learn about your rights!"}
              icon="🎣"
              color="bg-blue-400"
              onClick={() => handleSportSelect('FISHING')}
            />
          </motion.div>
        ) : selectedSport === 'BASKETBALL' ? (
          <BasketballGame key="basketball" onFinish={handleGameFinish} />
        ) : (
          <FishingGame key="fishing" onFinish={handleGameFinish} />
        )}
      </AnimatePresence>
    </div>
  );
};

const SportCard = ({ title, description, icon, color, onClick }: {
  title: string,
  description: string,
  icon: string,
  color: string,
  onClick: () => void
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex flex-col items-start p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-left group"
  >
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:rotate-12 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </motion.button>
);

const BasketballGame = ({ onFinish }: { onFinish: (points: number, stats: any) => void }) => {
  const { language } = useGame();
  const isFil = language === 'FIL';
  const [score, setScore] = useState(0);
  const [isShooting, setIsShooting] = useState(false);
  const [ballX, setBallX] = useState(50);
  const [ballPos, setBallPos] = useState({ x: 50, y: 80 });
  const [message, setMessage] = useState('');
  const [caughtRight, setCaughtRight] = useState<{ title: string, description: string; titleFil?: string; descriptionFil?: string } | null>(null);

  useEffect(() => {
    if (!isShooting) {
      setBallPos({ x: ballX, y: 80 });
    }
  }, [ballX, isShooting]);

  const shoot = () => {
    if (isShooting) return;
    setIsShooting(true);
    
    // Success depends on proximity to center (50)
    const accuracy = 1 - Math.abs(ballX - 50) / 50;
    const success = Math.random() < accuracy * 0.8;
    
    const targetY = success ? 20 : 10;
    const targetX = success ? 50 : ballX + (Math.random() - 0.5) * 40;

    setBallPos({ x: targetX, y: targetY });

    setTimeout(() => {
      if (success) {
        setScore(s => s + 1);
        setMessage(isFil ? 'PASOK! 🏀' : 'SWISH! 🏀');
        
        const right = CHILD_RIGHTS[Math.floor(Math.random() * CHILD_RIGHTS.length)];
        setTimeout(() => setCaughtRight(right), 500);
        
        onFinish(10, { happiness: 5, health: 2 });
      } else {
        setMessage(isFil ? 'SABLAY! 🧱' : 'Missed! 🧱');
      }
      
      setTimeout(() => {
        setBallPos({ x: ballX, y: 80 });
        setIsShooting(false);
        setMessage('');
      }, 1000);
    }, 600);
  };

  return (
    <div className="flex-1 bg-white rounded-[2.5rem] border-4 border-slate-100 p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[500px] shadow-inner">
      <div className="absolute top-8 right-8 flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-lg">
        <Star size={20} className="text-yellow-400 fill-yellow-400" />
        <span className="font-black text-xl">{score}</span>
      </div>

      {/* Hoop */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-40 h-32 border-8 border-slate-200 rounded-2xl flex flex-col items-center shadow-sm">
        <div className="w-24 h-3 bg-red-500 mt-auto rounded-full shadow-md" />
        <div className="w-20 h-20 border-x-4 border-b-4 border-slate-100 rounded-b-3xl opacity-50" />
      </div>

      {/* Ball */}
      <motion.div 
        animate={{ 
          left: `${ballPos.x}%`, 
          top: `${ballPos.y}%`,
          scale: isShooting ? 0.5 : 1,
          rotate: isShooting ? 720 : 0
        }}
        transition={{ duration: 0.6, ease: "circOut" }}
        className="absolute w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-2xl flex items-center justify-center text-4xl border-4 border-orange-700/20"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        🏀
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: message ? 1 : 0, scale: message ? 1.5 : 0.5, y: message ? -50 : 20 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black text-orange-600 z-10 drop-shadow-2xl"
      >
        {message}
      </motion.div>

      <RightModal 
        isOpen={!!caughtRight} 
        onClose={() => setCaughtRight(null)} 
        right={caughtRight}
        color="bg-orange-500"
        icon={<Star size={40} />}
        isFil={isFil}
      />

      <div className="mt-auto w-full max-w-xs flex flex-col gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{isFil ? 'Posisyon ng Asinta' : 'Aim Position'}</span>
            <span className={cn("text-lg font-black", Math.abs(ballX - 50) < 5 ? "text-emerald-500" : "text-slate-900")}>
              {Math.abs(ballX - 50) < 5 ? (isFil ? 'PERPEKTO!' : 'PERFECT!') : `${ballX}%`}
            </span>
          </div>
          <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200">
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-full bg-emerald-400/30" />
            <input 
              type="range" 
              min="10" 
              max="90" 
              value={ballX} 
              onChange={(e) => setBallX(parseInt(e.target.value))}
              disabled={isShooting}
              className="absolute inset-0 w-full h-full bg-transparent appearance-none cursor-pointer accent-orange-500 z-10"
            />
          </div>
        </div>

        <button
          onClick={shoot}
          disabled={isShooting}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black px-12 py-5 rounded-[2rem] shadow-[0_12px_24px_-8px_rgba(249,115,22,0.5)] transition-all active:scale-95 text-xl uppercase tracking-wider"
        >
          {isShooting ? (isFil ? 'TUMITIRA...' : 'SHOOTING...') : (isFil ? 'TIRA!' : 'SHOOT!')}
        </button>
      </div>
    </div>
  );
};

const FishingGame = ({ onFinish }: { onFinish: (points: number, stats: any) => void }) => {
  const { language } = useGame();
  const isFil = language === 'FIL';
  const [score, setScore] = useState(0);
  const [fish, setFish] = useState<{ id: number, x: number, y: number, type: string, speed: number, direction: number, isTrash?: boolean }[]>([]);
  const [caughtRight, setCaughtRight] = useState<{ title: string, description: string; titleFil?: string; descriptionFil?: string } | null>(null);

  useEffect(() => {
    const spawnFish = () => {
      const id = Date.now();
      const direction = Math.random() > 0.5 ? 1 : -1;
      const isTrash = Math.random() > 0.8;
      const newFish = {
        id,
        x: direction === 1 ? -10 : 110,
        y: 20 + Math.random() * 60,
        type: isTrash ? ['👞', '🥫', '🧴'][Math.floor(Math.random() * 3)] : ['🐠', '🐟', '🐡', '🐬', '🐙'][Math.floor(Math.random() * 5)],
        speed: 0.8 + Math.random() * 2,
        direction,
        isTrash
      };
      setFish(prev => [...prev, newFish]);
    };

    const interval = setInterval(spawnFish, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moveFish = setInterval(() => {
      setFish(prev => prev
        .map(f => ({ ...f, x: f.x + f.speed * f.direction }))
        .filter(f => f.x > -20 && f.x < 120)
      );
    }, 30);
    return () => clearInterval(moveFish);
  }, []);

  const catchFish = (f: any) => {
    setFish(prev => prev.filter(item => item.id !== f.id));
    
    if (f.isTrash) {
      // Negative feedback for trash
      return;
    }

    setScore(s => s + 1);
    const right = CHILD_RIGHTS[Math.floor(Math.random() * CHILD_RIGHTS.length)];
    setTimeout(() => setCaughtRight(right), 300);
    onFinish(15, { happiness: 8, energy: -2 });
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-blue-50 to-blue-100 rounded-[2.5rem] border-4 border-blue-200 p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[500px] shadow-inner">
      <div className="absolute top-8 right-8 flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-2xl shadow-lg z-20">
        <Star size={20} className="text-yellow-400 fill-yellow-400" />
        <span className="font-black text-xl">{score}</span>
      </div>

      {/* Water Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div 
          animate={{ 
            x: [-20, 20, -20],
            y: [-10, 10, -10]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 20% 30%, #3b82f6 2px, transparent 2px), radial-gradient(circle at 70% 60%, #3b82f6 2px, transparent 2px)',
            backgroundSize: '150px 150px'
          }} 
        />
      </div>

      {/* Fish */}
      {fish.map(f => (
        <motion.button
          key={f.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, left: `${f.x}%`, top: `${f.y}%` }}
          onClick={() => catchFish(f)}
          className="absolute text-5xl hover:scale-150 transition-transform cursor-pointer z-10 drop-shadow-lg active:scale-90"
          style={{ transform: `scaleX(${f.direction})` }}
        >
          {f.type}
        </motion.button>
      ))}

      <RightModal 
        isOpen={!!caughtRight} 
        onClose={() => setCaughtRight(null)} 
        right={caughtRight}
        color="bg-blue-500"
        icon={<Star size={40} />}
        isFil={isFil}
      />

      {score === 0 && fish.length === 0 && (
        <div className="text-blue-400 font-black text-2xl text-center animate-bounce z-10">
          {isFil ? 'NAGHIHINTAY NG ISDA... 🌊' : 'WAITING FOR FISH... 🌊'}
        </div>
      )}
      
      {score === 0 && fish.length > 0 && (
        <div className="absolute bottom-12 text-blue-400 font-black text-sm uppercase tracking-widest animate-pulse">
          {isFil ? 'Pindutin ang isda para mahuli! Iwasan ang basura!' : 'Tap the fish to catch them! Avoid the trash!'}
        </div>
      )}
    </div>
  );
};
