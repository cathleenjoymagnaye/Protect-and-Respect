import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../../constants';
import { useGame } from '../../context/GameContext';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, GraduationCap } from 'lucide-react';
import { cn } from '../../lib/utils';

export const StudyMode = () => {
  const { setMode, updateStats, unlockAchievement, language } = useGame();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const shuffledQuestions = useMemo(() => {
    return [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  }, []);

  const currentQuestion = shuffledQuestions[currentIdx];
  const isFil = language === 'FIL';

  const handleAnswer = (idx: number) => {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);
    if (idx === currentQuestion.correctAnswer) {
      setCorrectCount(prev => prev + 1);
      updateStats({ happiness: 100, energy: 100 });
      if (correctCount + 1 >= 5) unlockAchievement('quiz-master');
    }
  };

  const nextQuestion = () => {
    if (currentIdx < shuffledQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setMode('HOME');
    }
  };

  const handleExit = () => {
    setMode('HOME');
  };

  return (
    <div className="w-full h-full bg-emerald-50 flex flex-col p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-900">{isFil ? 'Pag-aaral' : 'Study Mode'}</h1>
              <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                {isFil ? `Tanong ${currentIdx + 1} sa ${shuffledQuestions.length}` : `Question ${currentIdx + 1} of ${shuffledQuestions.length}`}
              </p>
            </div>
          </div>
          <button 
            onClick={handleExit}
            className="text-emerald-600 font-bold text-sm hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors"
          >
            {isFil ? 'Lumabas' : 'Exit'}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-emerald-100 rounded-full mb-12 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / shuffledQuestions.length) * 100}%` }}
            className="h-full bg-emerald-600"
          />
        </div>

        {/* Question Card */}
        <motion.div 
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[32px] p-8 shadow-xl shadow-emerald-100 border border-emerald-50 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-tight">
            {isFil ? currentQuestion.questionFil : currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {(isFil && currentQuestion.optionsFil ? currentQuestion.optionsFil : currentQuestion.options).map((option, idx) => {
              const isCorrect = idx === currentQuestion.correctAnswer;
              const isSelected = idx === selectedOption;
              
              let stateClasses = "border-slate-100 hover:border-emerald-200 hover:bg-emerald-50";
              if (showFeedback) {
                if (isCorrect) stateClasses = "border-emerald-500 bg-emerald-50 text-emerald-700";
                else if (isSelected) stateClasses = "border-red-500 bg-red-50 text-red-700";
                else stateClasses = "opacity-50 border-slate-100";
              }

              return (
                <button
                  key={idx}
                  disabled={showFeedback}
                  onClick={() => handleAnswer(idx)}
                  className={cn(
                    "w-full p-5 rounded-2xl border-2 text-left font-semibold transition-all flex items-center justify-between group",
                    stateClasses
                  )}
                >
                  <span>{option}</span>
                  {showFeedback && isCorrect && <CheckCircle2 className="text-emerald-500" size={20} />}
                  {showFeedback && isSelected && !isCorrect && <XCircle className="text-red-500" size={20} />}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Feedback Area */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-6 rounded-3xl mb-8 border-2",
                selectedOption === currentQuestion.correctAnswer 
                  ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
                  : "bg-amber-50 border-amber-100 text-amber-800"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "p-2 rounded-xl",
                  selectedOption === currentQuestion.correctAnswer ? "bg-emerald-200" : "bg-amber-200"
                )}>
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">
                    {selectedOption === currentQuestion.correctAnswer 
                      ? (isFil ? "Tama!" : "Correct!") 
                      : (isFil ? "Mali..." : "Not quite...")}
                  </h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {isFil ? currentQuestion.explanationFil : currentQuestion.explanation}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={nextQuestion}
                className="mt-6 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                {currentIdx === shuffledQuestions.length - 1 
                  ? (isFil ? "Tapusin ang Quiz" : "Finish Quiz") 
                  : (isFil ? "Susunod na Tanong" : "Next Question")}
                <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
