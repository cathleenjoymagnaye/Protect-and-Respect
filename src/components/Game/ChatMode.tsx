import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useGame } from '../../context/GameContext';
import { cn } from '../../lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatMode: React.FC = () => {
  const { setMode, language, customization } = useGame();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: language === 'EN' 
        ? `Hello! I am your Guardian Assistant. You can ask me anything about child rights, safety, and welfare. How can I help you today?`
        : `Kamusta! Ako ang iyong Guardian Assistant. Maaari mo akong tanungin tungkol sa mga karapatan ng bata, kaligtasan, at kapakanan. Paano kita matutulungan ngayon?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = "gemini-3-flash-preview";
      
      const systemInstruction = language === 'EN'
        ? `You are the "Guardian Assistant" in an educational game about child rights and safety. 
           Your name is ${customization.name}. 
           Your goal is to educate children about their rights, how to stay safe, and who to talk to if they feel unsafe.
           Keep your answers child-friendly, encouraging, and informative. 
           If asked about dangerous situations, provide clear safety advice and encourage talking to a trusted adult.
           Respond in English.`
        : `Ikaw ang "Guardian Assistant" sa isang edukasyonal na laro tungkol sa mga karapatan at kaligtasan ng bata.
           Ang pangalan mo ay ${customization.name}.
           Ang layunin mo ay turuan ang mga bata tungkol sa kanilang mga karapatan, paano manatiling ligtas, at kung sino ang dapat lapitan kung sila ay hindi ligtas.
           Panatilihing bata-friendly, nakaka-encourage, at impormatibo ang iyong mga sagot.
           Kung tatanungin tungkol sa mga mapanganib na sitwasyon, magbigay ng malinaw na payong pangkaligtasan at hikayatin silang makipag-usap sa isang pinagkakatiwalaang matanda.
           Sumagot sa wikang Filipino.`;

      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction,
        },
      });

      const result = await chat.sendMessage({ message: userMessage });
      const response = result.text;

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: language === 'EN' 
          ? "I'm sorry, I'm having trouble connecting right now. Please try again later." 
          : "Paumanhin, may problema ako sa pag-konekta ngayon. Pakisubukang muli mamaya." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMode('HOME')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="font-black text-slate-900 leading-tight">
                {language === 'EN' ? 'Guardian AI' : 'Guardian AI'}
              </h2>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {language === 'EN' ? 'Online' : 'Online'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full">
          <Sparkles size={14} className="text-indigo-500" />
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
            {language === 'EN' ? 'AI Powered' : 'AI Powered'}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[85%] p-4 rounded-2xl shadow-sm",
                msg.role === 'user' 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
              )}>
                <div className="flex items-center gap-2 mb-1 opacity-60">
                  {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {msg.role === 'user' ? (language === 'EN' ? 'You' : 'Ikaw') : customization.name}
                  </span>
                </div>
                <p className="text-sm leading-relaxed font-medium">
                  {msg.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-3">
              <Loader2 size={16} className="text-indigo-500 animate-spin" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {language === 'EN' ? 'Thinking...' : 'Nag-iisip...'}
              </span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200 pb-safe">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'ENTER' && handleSend()}
            placeholder={language === 'EN' ? "Ask about your rights..." : "Magtanong tungkol sa iyong mga karapatan..."}
            className="flex-1 bg-slate-100 border-none rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={cn(
              "p-3 rounded-2xl transition-all shadow-lg active:scale-95",
              input.trim() && !isLoading
                ? "bg-indigo-600 text-white shadow-indigo-200"
                : "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
            )}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[9px] text-center mt-3 text-slate-400 font-bold uppercase tracking-widest">
          {language === 'EN' 
            ? "I'm here to help you learn and stay safe!" 
            : "Nandito ako para tulungan kang matuto at manatiling ligtas!"}
        </p>
      </div>
    </div>
  );
};
