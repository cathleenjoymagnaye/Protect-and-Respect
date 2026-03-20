export type GameMode = 'INTRO' | 'CUSTOMIZE' | 'HOME' | 'RUNNER' | 'STUDY' | 'LIBRARY' | 'ACHIEVEMENTS' | 'SPORTS' | 'CHAT';

export interface CharacterCustomization {
  name: string;
  primaryColor: string;
  accessory: 'NONE' | 'GLASSES' | 'HAT' | 'SCARF';
}

export interface CharacterStats {
  hunger: number;
  energy: number;
  happiness: number;
  health: number;
}

export interface Achievement {
  id: string;
  title: string;
  titleFil?: string;
  description: string;
  descriptionFil?: string;
  unlocked: boolean;
  icon: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionFil?: string;
  options: string[];
  optionsFil?: string[];
  correctAnswer: number;
  explanation: string;
  explanationFil?: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  titleFil?: string;
  content: string;
  contentFil?: string;
  category: string;
  categoryFil?: string;
}
