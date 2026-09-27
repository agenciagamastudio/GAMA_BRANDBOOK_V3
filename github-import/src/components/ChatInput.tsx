import React, { useState } from 'react';
import { Sparkles, ArrowRight, CornerDownLeft, Loader2, RefreshCw } from 'lucide-react';

interface ChatInputProps {
  onGenerate: (topic: string) => Promise<void>;
  isLoading: boolean;
  activeTopic: string;
}

const QUICK_TOPICS = [
  { label: '🏗️ Construção Civil (Benchmark)', value: 'Construção Civil' },
  { label: '💻 Front-End Moderno', value: 'Front-End' },
  { label: '📸 Fotografia Profissional', value: 'Fotografia' },
  { label: '🪚 Marcenaria & Móveis', value: 'Marcenaria' },
  { label: '🍞 Panificação Artesanal', value: 'Panificação' },
  { label: '🤖 Engenharia de IA & LLMs', value: 'Engenharia de Prompt e IA' },
];

export const ChatInput: React.FC<ChatInputProps> = ({ onGenerate, isLoading, activeTopic }) => {
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = inputVal.trim();
    if (!clean || isLoading) return;
    onGenerate(clean);
  };

  const handleSelectQuick = (val: string) => {
    setInputVal(val);
    onGenerate(val);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 pt-8 pb-6">
      {/* Intro hero text */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(136,206,17,0.1)] border border-[rgba(136,206,17,0.25)] text-[#88ce11] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vibe Code para Burros · Passo 6 em Ação</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          De uma ideia crua a um <span className="gradient-text">mapa passo a passo</span>.
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#a1a1aa] max-w-2xl mx-auto">
          Digite qualquer tema técnico ou prático. O sistema gera uma árvore com 4 níveis de profundidade, dicas de mestre e pontos de verificação sem você precisar codar nada.
        </p>
      </div>

      {/* Chat Input Card */}
      <div className="glass-illuminated rounded-2xl p-3 sm:p-4 transition-all">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isLoading}
              placeholder="Digite o assunto que deseja dominar (ex: Construção Civil, Fotografia, Panificação...)"
              className="w-full bg-[#181818]/90 text-white placeholder-[#71717a] px-4 py-3.5 rounded-xl border border-[rgba(255,255,255,0.1)] focus:border-[#88ce11] focus:ring-2 focus:ring-[#88ce11]/20 outline-none text-sm sm:text-base transition-all pr-10"
            />
            {inputVal && !isLoading && (
              <button
                type="button"
                onClick={() => setInputVal('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#71717a] hover:text-white px-1.5 py-0.5 rounded"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !inputVal.trim()}
            className="btn-primary whitespace-nowrap !py-3.5 !px-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0c1202]" />
                <span>Estruturando...</span>
              </>
            ) : (
              <>
                <span>Gerar Roadmap</span>
                <CornerDownLeft className="w-4 h-4 hidden sm:inline" />
              </>
            )}
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[#71717a] whitespace-nowrap font-medium flex items-center gap-1">
            Exemplos testados:
          </span>
          <div className="flex items-center gap-1.5 flex-nowrap">
            {QUICK_TOPICS.map((topic) => {
              const isSelected = activeTopic.toLowerCase().includes(topic.value.toLowerCase());
              return (
                <button
                  key={topic.value}
                  type="button"
                  onClick={() => handleSelectQuick(topic.value)}
                  disabled={isLoading}
                  className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-all text-xs font-medium border ${
                    isSelected
                      ? 'bg-[rgba(136,206,17,0.15)] border-[#88ce11] text-[#88ce11]'
                      : 'bg-[#202020] border-[rgba(255,255,255,0.08)] text-[#d4d4d8] hover:border-[rgba(255,255,255,0.2)] hover:text-white'
                  }`}
                >
                  {topic.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
