import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check, Lightbulb, CheckSquare, Search, FileText } from 'lucide-react';
import { RoadmapData, RoadmapNode } from '../types';

interface RoadmapListViewProps {
  roadmap: RoadmapData;
  completedNodes: Set<string>;
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
  onSelectNode: (node: RoadmapNode) => void;
  searchQuery: string;
}

export const RoadmapListView: React.FC<RoadmapListViewProps> = ({
  roadmap,
  completedNodes,
  onToggleComplete,
  onSelectNode,
  searchQuery,
}) => {
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  const toggleCollapse = (id: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const level1Nodes = roadmap.nodes.filter((n) => n.level === 1);

  const getSubnodes = (parentId: string) => {
    return roadmap.nodes.filter(
      (n) => n.parentId === parentId || (n.level > 1 && n.id.startsWith(parentId))
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Intro info bar */}
      <div className="glass-card p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#88ce11]" />
            Visão Hierárquica Aninhada (Passo a Passo)
          </h3>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Estrutura clássica de tópicos com 3 a 4 níveis indentados conforme o método Vibe Code para Burros.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCollapsedIds(new Set())}
            className="px-2.5 py-1 text-xs rounded-lg bg-[#222] border border-[rgba(255,255,255,0.08)] text-[#d4d4d8] hover:text-white"
          >
            Expandir Tudo
          </button>
          <button
            onClick={() => setCollapsedIds(new Set(level1Nodes.map((n) => n.id)))}
            className="px-2.5 py-1 text-xs rounded-lg bg-[#222] border border-[rgba(255,255,255,0.08)] text-[#d4d4d8] hover:text-white"
          >
            Recolher Tudo
          </button>
        </div>
      </div>

      {/* Hierarchical list container */}
      <div className="space-y-4">
        {level1Nodes.map((macro, idx) => {
          const isCollapsed = collapsedIds.has(macro.id);
          const isCompleted = completedNodes.has(macro.id);
          const subnodes = getSubnodes(macro.id);

          return (
            <div
              key={macro.id}
              className={`glass-card overflow-hidden border transition-all ${
                isCompleted
                  ? 'border-[#88ce11]/40 bg-[#142008]/20'
                  : 'border-[rgba(255,255,255,0.08)]'
              }`}
            >
              {/* Level 1 Node Header */}
              <div className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 bg-[rgba(255,255,255,0.02)]">
                <div
                  className="flex items-start sm:items-center gap-3 cursor-pointer flex-1"
                  onClick={() => toggleCollapse(macro.id)}
                >
                  <button
                    type="button"
                    className="p-1 rounded text-[#a1a1aa] hover:text-white mt-0.5 sm:mt-0"
                  >
                    {isCollapsed ? (
                      <ChevronRight className="w-4 h-4 text-[#88ce11]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#88ce11]" />
                    )}
                  </button>

                  <span className="pill-green text-[10px]">
                    Nível 1 · Passo {macro.stageNumber || idx + 1}
                  </span>

                  <div>
                    <h4
                      className={`text-base sm:text-lg font-bold ${
                        isCompleted ? 'text-[#88ce11] line-through' : 'text-white'
                      }`}
                    >
                      {macro.title}
                    </h4>
                    {macro.subtitle && (
                      <p className="text-xs text-[#a1a1aa]">{macro.subtitle}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectNode(macro)}
                    className="text-xs text-[#a1a1aa] hover:text-[#88ce11] px-2.5 py-1 rounded bg-[#202020] border border-[rgba(255,255,255,0.05)]"
                  >
                    Ver Detalhes
                  </button>
                  <button
                    type="button"
                    onClick={(e) => onToggleComplete(macro.id, e)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-[#88ce11] text-black font-bold'
                        : 'border border-[rgba(255,255,255,0.2)] text-transparent hover:border-[#88ce11]'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>

              {/* Sub-levels (Nível 2, 3 & 4) */}
              {!isCollapsed && (
                <div className="p-4 sm:p-5 pt-2 border-t border-[rgba(255,255,255,0.06)] space-y-4">
                  <p className="text-xs text-[#d4d4d8] leading-relaxed pl-7">
                    {macro.description}
                  </p>

                  {/* Level 4 Dica de Mestre */}
                  {macro.practicalTip && (
                    <div className="ml-7 p-3 rounded-xl bg-[rgba(136,206,17,0.08)] border border-[rgba(136,206,17,0.25)] flex items-start gap-2.5 text-xs text-[#e4e4e7]">
                      <Lightbulb className="w-4 h-4 text-[#88ce11] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#88ce11] block mb-0.5 font-mono text-[10px] uppercase">
                          Nível 4 · Dica de Mestre / Validação Prática
                        </span>
                        <p className="italic">{macro.practicalTip}</p>
                      </div>
                    </div>
                  )}

                  {/* Checkpoints checklist */}
                  {macro.checkpoints && macro.checkpoints.length > 0 && (
                    <div className="ml-7 space-y-1.5 pt-2">
                      <span className="text-[11px] font-mono text-[#71717a] uppercase font-semibold">
                        Pontos de Checagem Essenciais:
                      </span>
                      {macro.checkpoints.map((cp, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#88ce11]" />
                          <span>{cp}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render Subnodes (Nível 2 & 3) */}
                  {subnodes.length > 0 && (
                    <div className="ml-7 mt-4 pt-3 border-t border-[rgba(255,255,255,0.05)] space-y-2.5">
                      <span className="text-[11px] font-mono text-[#88ce11] uppercase font-semibold block">
                        Pilares e Subtópicos (Nível 2 e 3):
                      </span>
                      {subnodes.map((sub) => {
                        const subCompleted = completedNodes.has(sub.id);
                        return (
                          <div
                            key={sub.id}
                            className={`p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                              subCompleted
                                ? 'bg-[#18230b]/30 border-[#88ce11]/40 text-[#a1a1aa]'
                                : 'bg-[#1e1e1e] border-[rgba(255,255,255,0.06)] hover:border-[#88ce11]/40'
                            }`}
                          >
                            <div className="flex-1 cursor-pointer" onClick={() => onSelectNode(sub)}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-1.5 py-0.5 rounded bg-[#2a2a2a] text-[#88ce11] text-[10px] font-mono font-bold">
                                  Nível {sub.level}
                                </span>
                                <span
                                  className={`text-xs font-semibold ${
                                    subCompleted ? 'line-through text-[#71717a]' : 'text-white'
                                  }`}
                                >
                                  {sub.title}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#a1a1aa] leading-relaxed">
                                {sub.description}
                              </p>
                              {sub.practicalTip && (
                                <p className="text-[11px] text-[#88ce11]/90 italic mt-1.5 flex items-center gap-1">
                                  <Lightbulb className="w-3 h-3 text-[#88ce11]" />
                                  {sub.practicalTip}
                                </p>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={(e) => onToggleComplete(sub.id, e)}
                              className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                                subCompleted
                                  ? 'bg-[#88ce11] text-black'
                                  : 'border border-[rgba(255,255,255,0.2)] text-transparent hover:border-[#88ce11]'
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
