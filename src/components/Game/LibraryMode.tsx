import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LIBRARY_BOOKS } from '../../constants';
import { useGame } from '../../context/GameContext';
import { BookOpen, ArrowLeft, ChevronRight, Bookmark } from 'lucide-react';
import { cn } from '../../lib/utils';

export const LibraryMode = () => {
  const { setMode, language } = useGame();
  const [selectedBook, setSelectedBook] = useState<typeof LIBRARY_BOOKS[0] | null>(null);
  const isFil = language === 'FIL';

  const handleSelectBook = (book: typeof LIBRARY_BOOKS[0]) => {
    setSelectedBook(book);
  };

  const handleBack = () => {
    if (selectedBook) {
      setSelectedBook(null);
    } else {
      setMode('HOME');
    }
  };

  return (
    <div className="w-full h-full bg-stone-50 flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {!selectedBook ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 p-6 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto">
              <header className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-stone-800 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-stone-200">
                    <BookOpen size={28} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-stone-900">{isFil ? 'Aklatan ng Kaalaman' : 'Learning Library'}</h1>
                    <p className="text-sm text-stone-500 font-medium">{isFil ? 'Alamin ang iyong mga karapatan' : 'Explore child rights & safety tips'}</p>
                  </div>
                </div>
                <button 
                  onClick={handleBack}
                  className="p-3 bg-white rounded-xl shadow-sm border border-stone-200 hover:bg-stone-100 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              </header>

              <div className="mb-12">
                <h2 className="text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-4">{isFil ? 'Tampok na Paksa' : 'Featured Bookmark'}</h2>
                {LIBRARY_BOOKS.filter(b => b.id === 'ph-constitution-rights').map((book) => (
                  <motion.button
                    key={book.id}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleSelectBook(book)}
                    className="w-full bg-stone-900 p-8 rounded-[40px] shadow-2xl shadow-stone-200 text-left flex items-center gap-8 group transition-all border border-stone-800"
                  >
                    <div className="w-24 h-32 bg-stone-800 rounded-2xl flex-shrink-0 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Bookmark size={48} fill="currentColor" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-500/20">
                          {isFil ? (book.categoryFil || book.category) : book.category}
                        </span>
                        <span className="text-stone-500 text-[10px] font-bold uppercase tracking-widest italic">{isFil ? 'Mahalagang Basahin' : 'Essential Reading'}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">{isFil ? (book.titleFil || book.title) : book.title}</h3>
                      <p className="text-stone-400 text-sm md:text-base line-clamp-2 leading-relaxed font-medium">
                        {isFil ? (book.contentFil || book.content) : book.content}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-white group-hover:bg-amber-500 transition-colors">
                      <ChevronRight size={24} />
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LIBRARY_BOOKS.filter(b => b.id !== 'ph-constitution-rights').map((book) => (
                  <motion.button
                    key={book.id}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectBook(book)}
                    className="bg-white p-6 rounded-[32px] shadow-sm border border-stone-100 text-left flex items-center gap-6 group hover:shadow-xl hover:shadow-stone-200/50 transition-all"
                  >
                    <div className="w-20 h-28 bg-stone-100 rounded-xl flex-shrink-0 flex items-center justify-center text-stone-400 group-hover:bg-stone-800 group-hover:text-white transition-colors">
                      <Bookmark size={32} />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 block">{isFil ? (book.categoryFil || book.category) : book.category}</span>
                      <h3 className="text-xl font-bold text-stone-800 mb-2">{isFil ? (book.titleFil || book.title) : book.title}</h3>
                      <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">
                        {isFil ? (book.contentFil || book.content) : book.content}
                      </p>
                    </div>
                    <ChevronRight className="text-stone-300 group-hover:text-stone-800 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="reader"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-1 flex flex-col h-full"
          >
            <div className="bg-white border-b border-stone-200 p-4 flex items-center justify-between sticky top-0 z-10">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-stone-600 font-bold text-sm hover:bg-stone-50 px-4 py-2 rounded-xl transition-colors"
              >
                <ArrowLeft size={18} />
                {isFil ? 'Bumalik sa Aklatan' : 'Back to Library'}
              </button>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{isFil ? (selectedBook.categoryFil || selectedBook.category) : selectedBook.category}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-16">
              <article className="max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-12 leading-tight">
                  {isFil ? (selectedBook.titleFil || selectedBook.title) : selectedBook.title}
                </h1>
                <div className="prose prose-stone prose-lg max-w-none">
                  <p className="text-stone-700 leading-relaxed text-xl whitespace-pre-wrap">
                    {isFil ? (selectedBook.contentFil || selectedBook.content) : selectedBook.content}
                  </p>
                </div>
                
                <div className="mt-24 p-8 bg-stone-100 rounded-[32px] border border-stone-200">
                  <h4 className="font-bold text-stone-900 mb-2">{isFil ? 'Alam mo ba?' : 'Did you know?'}</h4>
                  <p className="text-stone-600 text-sm italic">
                    {isFil ? 'Ang kaalaman ay kapangyarihan. Ang pag-unawa sa iyong mga karapatan ay tumutulong sa iyo na protektahan ang iyong sarili at ang iba.' : 'Knowledge is power. Understanding your rights helps you protect yourself and others.'}
                  </p>
                </div>
              </article>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
