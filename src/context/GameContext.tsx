import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameMode, CharacterStats, Achievement, CharacterCustomization } from '../types';
import { INITIAL_STATS, ACHIEVEMENTS } from '../constants';

interface GameContextType {
  mode: GameMode;
  setMode: (mode: GameMode) => void;
  stats: CharacterStats;
  updateStats: (updates: Partial<CharacterStats>) => void;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  customization: CharacterCustomization;
  setCustomization: (customization: CharacterCustomization) => void;
  language: 'EN' | 'FIL';
  setLanguage: (lang: 'EN' | 'FIL') => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log("GameContext.tsx: Provider rendering...");
  const [mode, setMode] = useState<GameMode>('INTRO');
  const [stats, setStats] = useState(INITIAL_STATS);
  const [score, setScore] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [customization, setCustomization] = useState<CharacterCustomization>({
    name: 'Guardian',
    primaryColor: '#4f46e5',
    accessory: 'NONE'
  });
  const [language, setLanguage] = useState<'EN' | 'FIL'>('EN');

  // Passive stat decay
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 0.1),
        energy: Math.max(0, prev.energy - 0.05),
        happiness: Math.max(0, prev.happiness - 0.08),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStats = (updates: Partial<CharacterStats>) => {
    setStats(prev => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(updates).map(([key, val]) => [key, Math.min(100, Math.max(0, val as number))])
      )
    }));
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev => prev.map(a => a.id === id ? { ...a, unlocked: true } : a));
  };

  return (
    <GameContext.Provider value={{
      mode, setMode, stats, updateStats, score, setScore, achievements, unlockAchievement,
      customization, setCustomization, language, setLanguage
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
