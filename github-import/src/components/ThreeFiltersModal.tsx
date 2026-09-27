import React, { useState } from 'react';
import { X, Filter, Sparkles, CheckCircle2, ShieldAlert, Target, ArrowRight, Lightbulb } from 'lucide-react';

interface ThreeFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyIdeaToRoadmap: (topic: string) => void;
}

export const ThreeFiltersModal: React.FC<ThreeFiltersModalProps> = ({
  isOpen,
  onClose,
  onApplyIdeaToRoadmap,
}) => {
  const [activeTab, setActiveTab] = useState<'benchmark' | 'custom' | 'manifesto'>('benchmark');

  // Custom user filters state
  const [customIdea, setCustomIdea] = useState('');
  const [customFilter1, setCustomFilter1] = useState('');
  const [customFilter2Essential, setCustomFilter2Essential] = useState('');
  const [customFilter2NiceToHave, setCustomFilter2NiceToHave] = useState('');
  const [customFilter3Limits, setCustomFilter3Limits] = useState('');

  if (!isOpen) return null;

  const handleGenerateFromIdea = () => {
    if (!customIdea.trim()) return;
    onApplyIdeaToRoadmap(customIdea.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="glass-card max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 border border-[rgba(136,206,17,0.35)] shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative bg-[#181818]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#71717a] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[rgba(136,206,17,0.15)] border border-[rgba(136,206,17,0.3)] flex items-center justify-center text-[#88ce11]">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <span className="pill-green text-[10px]">Método Vibe Code para Burros</span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              O Teste dos 3 Filtros (Antes de Qualquer IA)
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#a1a1aa] mt-2 leading-relaxed">
          "A primeira coisa que você tem que fazer não é escrever um prompt gigante. É tirar a ideia maluca da cabeça e passar pelos 3 filtros."
        </p>

        {/* Tabs */}
        <div className="flex border-b border-[rgba(255,255,255,0.08)] mt-6 mb-6">
          <button
            onClick={() => setActiveTab('benchmark')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'benchmark'
                ? 'border-[#88ce11] text-[#88ce11]'
                : 'border-transparent text-[#71717a] hover:text-white'
            }`}
          >
            1. O Caso Real (Construção Civil)
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'custom'
                ? 'border-[#88ce11] text-[#88ce11]'
                : 'border-transparent text-[#71717a] hover:text-white'
            }`}
          >
            2. Testar Minha Própria Ideia
          </button>
          <button
            onClick={() => setActiveTab('manifesto')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'manifesto'
                ? 'border-[#88ce11] text-[#88ce11]'
                : 'border-transparent text-[#71717a] hover:text-white'
            }`}
          >
            3. Os 5 Passos do Vibe Code
          </button>
        </div>

        {/* TAB 1: Benchmark Answers (Construção Civil) */}
        {activeTab === 'benchmark' && (
          <div className="space-y-6 text-sm">
            {/* Filtro 1 */}
            <div className="glass-card p-4 sm:p-5 border-l-4 border-l-[#88ce11] bg-[#1d1d1d]">
              <div className="flex items-center gap-2 text-[#88ce11] font-bold text-xs uppercase mb-2">
                <Target className="w-4 h-4" />
                <span>FILTRO 1 — O que resolve? Pra quem? É real?</span>
              </div>
              <p className="text-xs text-[#a1a1aa] mb-2 font-mono">
                "O que resolve, de fato, pra quem? E como eu sei que não é só fantasia?"
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-[#f4f4f5] bg-[#141414] p-3 rounded-lg border border-[rgba(255,255,255,0.05)]">
                <p>
                  <strong className="text-[#88ce11]">O que resolve:</strong> Resolve o problema de quem tem que ficar pesquisando, pesquisando e não sabe nem o que pesquisar. Faz uma pergunta genérica e perde muito tempo procurando e pouco aprendendo.
                </p>
                <p>
                  <strong className="text-[#88ce11]">Para quem serve:</strong> Pessoas com sede de aprender, mas que não têm quem ensine ou têm dificuldade com caminhos desestruturados.
                </p>
                <p>
                  <strong className="text-[#88ce11]">Como sei que é real:</strong> Eu sou uma dessas pessoas. E escolhi Construção Civil porque meu pai é mestre de obras/pedreiro — bato o olho no mapa gerado e sei na hora se é verdade ou bobagem.
                </p>
              </div>
            </div>

            {/* Filtro 2 */}
            <div className="glass-card p-4 sm:p-5 border-l-4 border-l-[#3b82f6] bg-[#1d1d1d]">
              <div className="flex items-center gap-2 text-[#3b82f6] font-bold text-xs uppercase mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>FILTRO 2 — Essencial (Versão 0) vs "Só Queria Ter"</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#141414] p-3 rounded-lg border border-[rgba(16,185,129,0.3)]">
                  <span className="font-bold text-[#10b981] block mb-1 uppercase font-mono">
                    ✓ Essencial na Versão 0:
                  </span>
                  <p className="text-[#d4d4d8] leading-relaxed">
                    O mapa mental aninhado estilo roadmap.sh com 3 a 4 níveis (fundamentos, projetos/plantas, fundação, alvenaria, instalações até entrega). Verificável por alguém experiente.
                  </p>
                </div>
                <div className="bg-[#141414] p-3 rounded-lg border border-[rgba(245,158,11,0.3)]">
                  <span className="font-bold text-[#f59e0b] block mb-1 uppercase font-mono">
                    ⏳ "Só Queria Ter" (Dispensável na v0):
                  </span>
                  <p className="text-[#d4d4d8] leading-relaxed">
                    Aba lateral com artigos externos, sistema de login com banco de dados, compartilhamento social ou multi-idioma. Se o mapa estiver claro, a v0 já resolve!
                  </p>
                </div>
              </div>
            </div>

            {/* Filtro 3 */}
            <div className="glass-card p-4 sm:p-5 border-l-4 border-l-[#e11d48] bg-[#1d1d1d]">
              <div className="flex items-center gap-2 text-[#e11d48] font-bold text-xs uppercase mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>FILTRO 3 — Limites Inaceitáveis</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#d4d4d8] bg-[#141414] p-3 rounded-lg border border-[rgba(255,255,255,0.05)]">
                <li>• <strong>Limite 1:</strong> 100% gratuito de primeira, sem mensalidade, sem servidor complexo.</li>
                <li>• <strong>Limite 2:</strong> Entrada simples estilo chat de conversa com IA, sem forms chatos.</li>
                <li>• <strong>Limite 3:</strong> Qualidade do mapa alta com tópicos aninhados e dicas reais.</li>
              </ul>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  onApplyIdeaToRoadmap('Construção Civil');
                  onClose();
                }}
                className="btn-primary w-full sm:w-auto"
              >
                <span>Carregar Roadmap de Construção Civil</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Custom Idea Interactive Form */}
        {activeTab === 'custom' && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-[#88ce11] uppercase mb-1">
                Nome da sua Ideia ou Assunto:
              </label>
              <input
                type="text"
                value={customIdea}
                onChange={(e) => setCustomIdea(e.target.value)}
                placeholder="Ex: Marcenaria de Bancada, Panificação com Fermentação Selvagem..."
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white uppercase mb-1">
                Filtro 1: O que isso resolve e pra quem? (Como você sabe que é real?)
              </label>
              <textarea
                rows={2}
                value={customFilter1}
                onChange={(e) => setCustomFilter1(e.target.value)}
                placeholder="Descreva cru, sem filtro, a dor real de quem precisa disso..."
                className="input-field resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#10b981] uppercase mb-1">
                  Filtro 2A: O que é ESSENCIAL na Versão 0?
                </label>
                <textarea
                  rows={2}
                  value={customFilter2Essential}
                  onChange={(e) => setCustomFilter2Essential(e.target.value)}
                  placeholder="Se tirar isso, o problema não se resolve..."
                  className="input-field resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#f59e0b] uppercase mb-1">
                  Filtro 2B: O que é "Só Queria Ter"?
                </label>
                <textarea
                  rows={2}
                  value={customFilter2NiceToHave}
                  onChange={(e) => setCustomFilter2NiceToHave(e.target.value)}
                  placeholder="Lindo, mas pode esperar a v1 ou v2..."
                  className="input-field resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#e11d48] uppercase mb-1">
                Filtro 3: Quais são os limites inaceitáveis pra você?
              </label>
              <textarea
                rows={2}
                value={customFilter3Limits}
                onChange={(e) => setCustomFilter3Limits(e.target.value)}
                placeholder="Ex: Não pagar mensalidade, não ter login, rodar direto no navegador..."
                className="input-field resize-none"
              />
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={handleGenerateFromIdea}
                disabled={!customIdea.trim()}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                <span>Gerar Roadmap com os 3 Filtros Aplicados</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Manifesto Steps */}
        {activeTab === 'manifesto' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#d4d4d8]">
            <div className="p-3 rounded-xl bg-[#202020] border border-[rgba(255,255,255,0.06)]">
              <h4 className="font-bold text-[#88ce11] mb-1">Passo 1: Tirar a ideia da cabeça com 3 filtros</h4>
              <p className="text-xs text-[#a1a1aa]">Antes de qualquer IA ou prompt gigante, dê bordas e limites para a sua ideia.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#202020] border border-[rgba(255,255,255,0.06)]">
              <h4 className="font-bold text-[#88ce11] mb-1">Passo 2: Apresentar pra IA em 3 camadas</h4>
              <p className="text-xs text-[#a1a1aa]">Camada 1: Mostre o problema. Camada 2: Responda perguntas com limites. Camada 3: Peça arquitetura, não código.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#202020] border border-[rgba(255,255,255,0.06)]">
              <h4 className="font-bold text-[#88ce11] mb-1">Passo 3: Folgar o escopo pra Versão 0</h4>
              <p className="text-xs text-[#a1a1aa]">Sem login, sem banco, sem complicação de servidor. Apenas: entrada por chat → mapa visual aninhado.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#202020] border border-[rgba(255,255,255,0.06)]">
              <h4 className="font-bold text-[#88ce11] mb-1">Passo 4: Pedir código em partes pequenas com controle</h4>
              <p className="text-xs text-[#a1a1aa]">Entenda primeiro a peça, rode, valide. Se funcionar, avance para a próxima.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#202020] border border-[rgba(255,255,255,0.06)]">
              <h4 className="font-bold text-[#88ce11] mb-1">Passo 5 & 6: Tokens CSS + Interface Viva</h4>
              <p className="text-xs text-[#a1a1aa]">Design System GAMA V3 com verde primário (#88CE11), glassmorphism, tipografia e scrollbar personalizada.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
