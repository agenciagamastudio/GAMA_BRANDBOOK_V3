import React from 'react';
import { CheckSquare, Square, Check, Lightbulb, ExternalLink } from 'lucide-react';
import { RoadmapData, RoadmapNode } from '../types';

interface ChecklistViewProps {
  roadmap: RoadmapData;
  completedNodes: Set<string>;
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
  onSelectNode: (node: RoadmapNode) => void;
  searchQuery: string;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({
  roadmap,
  completedNodes,
  onToggleComplete,
  onSelectNode,
}) => {
  const allNodes = roadmap.nodes;
  const completedCount = allNodes.filter((n) => completedNodes.has(n.id)).length;
  const percentage = Math.round((completedCount / allNodes.length) * 100) || 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header bar */}
      <div className="glass-card p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-[#88ce11]" />
              Checklist Operacional & Acompanhamento
            </h3>
            <p className="text-xs text-[#a1a1aa] mt-1">
              Marque os itens conforme você estuda, executa ou valida na prática com quem entende da área.
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-[#88ce11] font-mono">
              {percentage}%
            </span>
            <span className="text-xs text-[#71717a] block font-mono">
              {completedCount} de {allNodes.length} concluídos
            </span>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="w-full h-2.5 bg-[#262626] rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#88ce11] to-[#a3e635] transition-all duration-300 shadow-[0_0_12px_rgba(136,206,17,0.5)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {allNodes.map((node) => {
          const isDone = completedNodes.has(node.id);
          return (
            <div
              key={node.id}
              className={`glass-card p-4 flex items-start justify-between gap-4 border transition-all ${
                isDone
                  ? 'border-[#88ce11]/40 bg-[#15220a]/20 opacity-80'
                  : 'border-[rgba(255,255,255,0.08)] hover:border-[#88ce11]/40'
              }`}
            >
              <div
                className="flex items-start gap-3 flex-1 cursor-pointer"
                onClick={() => onSelectNode(node)}
              >
                <button
                  type="button"
                  onClick={(e) => onToggleComplete(node.id, e)}
                  className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${
                    isDone
                      ? 'bg-[#88ce11] text-black shadow-[0_0_8px_rgba(136,206,17,0.4)]'
                      : 'border border-[rgba(255,255,255,0.3)] text-transparent hover:border-[#88ce11]'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="pill-green text-[9px] py-0.5 px-2">
                      Nível {node.level}
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        isDone ? 'line-through text-[#88ce11]' : 'text-white'
                      }`}
                    >
                      {node.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {node.description}
                  </p>
                  {node.practicalTip && (
                    <div className="mt-2 text-xs text-[#88ce11]/90 italic flex items-center gap-1.5 bg-[#88ce11]/5 px-2.5 py-1 rounded border border-[#88ce11]/15">
                      <Lightbulb className="w-3.5 h-3.5 text-[#88ce11] shrink-0" />
                      <span>{node.practicalTip}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectNode(node)}
                className="text-xs text-[#71717a] hover:text-[#88ce11] px-2 py-1 rounded bg-[#202020] border border-[rgba(255,255,255,0.06)] shrink-0 self-center"
              >
                Abrir
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
