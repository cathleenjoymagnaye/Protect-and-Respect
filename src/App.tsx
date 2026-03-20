import React from 'react';
import { useGame } from './context/GameContext';
import { HomeMode } from './components/Game/HomeMode';
import { RunnerMode } from './components/Game/RunnerMode';
import { StudyMode } from './components/Game/StudyMode';
import { LibraryMode } from './components/Game/LibraryMode';
import { AchievementMode } from './components/Game/AchievementMode';
import { SportsMode } from './components/Game/SportsMode';
import { ChatMode } from './components/Game/ChatMode';
import { OpeningScene } from './components/Game/OpeningScene';
import { CharacterCustomization } from './components/Game/CharacterCustomization';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Play, GraduationCap, BookOpen, Trophy, Activity, MessageCircle } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  console.log("App.tsx: Component rendering...");
  const { mode, setMode } = useGame();

  const handleNavClick = (newMode: any) => {
    if (newMode !== mode) {
      setMode(newMode);
    }
  };

  const renderMode = () => {
    switch (mode) {
      case 'INTRO': return <OpeningScene />;
      case 'CUSTOMIZE': return <CharacterCustomization />;
      case 'HOME': return <HomeMode />;
      case 'RUNNER': return <RunnerMode />;
      case 'STUDY': return <StudyMode />;
      case 'LIBRARY': return <LibraryMode />;
      case 'ACHIEVEMENTS': return <AchievementMode />;
      case 'SPORTS': return <SportsMode />;
      case 'CHAT': return <ChatMode />;
      default: return <OpeningScene />;
    }
  };

  const showNav = mode !== 'INTRO' && mode !== 'CUSTOMIZE';

  return (
    <div className="fixed inset-0 h-[100dvh] w-screen flex flex-col bg-slate-50 font-sans text-slate-900 select-none overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {renderMode()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      {showNav && (
        <nav className="h-20 bg-white border-t border-slate-200 flex items-center justify-between px-2 pb-safe z-50 overflow-x-auto no-scrollbar">
            <NavButton 
              active={mode === 'HOME'} 
              onClick={() => handleNavClick('HOME')} 
              icon={<Home size={18} />} 
              label="Home" 
              color="text-indigo-600" 
              bgColor="bg-indigo-50" 
            />
            <NavButton 
              active={mode === 'RUNNER'} 
              onClick={() => handleNavClick('RUNNER')} 
              icon={<Play size={18} />} 
              label="Run" 
              color="text-rose-600" 
              bgColor="bg-rose-50" 
            />
            <NavButton 
              active={mode === 'STUDY'} 
              onClick={() => handleNavClick('STUDY')} 
              icon={<GraduationCap size={18} />} 
              label="Study" 
              color="text-emerald-600" 
              bgColor="bg-emerald-50" 
            />
            <NavButton 
              active={mode === 'LIBRARY'} 
              onClick={() => handleNavClick('LIBRARY')} 
              icon={<BookOpen size={18} />} 
              label="Library" 
              color="text-stone-600" 
              bgColor="bg-stone-50" 
            />
            <NavButton 
              active={mode === 'SPORTS'} 
              onClick={() => handleNavClick('SPORTS')} 
              icon={<Activity size={18} />} 
              label="Sports" 
              color="text-orange-600" 
              bgColor="bg-orange-50" 
            />
            <NavButton 
              active={mode === 'CHAT'} 
              onClick={() => handleNavClick('CHAT')} 
              icon={<MessageCircle size={18} />} 
              label="Ask AI" 
              color="text-blue-600" 
              bgColor="bg-blue-50" 
            />
            <NavButton 
              active={mode === 'ACHIEVEMENTS'} 
              onClick={() => handleNavClick('ACHIEVEMENTS')} 
              icon={<Trophy size={18} />} 
              label="Awards" 
              color="text-amber-600" 
              bgColor="bg-amber-50" 
            />
        </nav>
      )}
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label, color, bgColor }: { 
  active: boolean, 
  onClick: () => void, 
  icon: React.ReactNode, 
  label: string,
  color: string,
  bgColor: string
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center gap-1 transition-all relative px-4 py-2 rounded-2xl",
      active ? cn(color, bgColor) : "text-slate-400 hover:text-slate-600"
    )}
  >
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    {active && (
      <div 
        className={cn("absolute inset-0 rounded-2xl -z-10", bgColor)}
      />
    )}
  </button>
);
