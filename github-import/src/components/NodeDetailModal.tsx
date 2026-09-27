import React from 'react';
import { X, Check, Lightbulb, CheckSquare, Tag, BookmarkCheck } from 'lucide-react';
import { RoadmapNode } from '../types';

interface NodeDetailModalProps {
  node: RoadmapNode | null;
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  node,
  onClose,
  isCompleted,
  onToggleComplete,
}) => {
  if (!node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[rgba(136,206,17,0.3)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative bg-[#181818]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#71717a] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Level & Stage Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="pill-green">Nível {node.level}</span>
          {node.stageNumber && (
            <span className="text-xs font-mono text-[#a1a1aa]">
              Macro-Fase {node.stageNumber}
            </span>
          )}
          <span className="text-xs px-2 py-0.5 rounded uppercase font-semibold text-[#88ce11] bg-[#88ce11]/10 border border-[#88ce11]/20">
            {node.importance}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
          {node.title}
        </h2>
        {node.subtitle && (
          <p className="text-sm font-semibold text-[#88ce11] mt-1">{node.subtitle}</p>
        )}

        {/* Description */}
        <div className="mt-5 text-sm text-[#d4d4d8] leading-relaxed border-t border-[rgba(255,255,255,0.06)] pt-4">
          <p>{node.description}</p>
        </div>

        {/* Dica de Mestre / Verificação Prática */}
        {node.practicalTip && (
          <div className="mt-6 p-4 rounded-xl bg-[rgba(136,206,17,0.08)] border border-[rgba(136,206,17,0.3)] shadow-[0_0_20px_rgba(136,206,17,0.08)]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#88ce11] uppercase tracking-wider mb-1.5">
              <Lightbulb className="w-4 h-4 text-[#88ce11]" />
              <span>Dica de Mestre / Verificação de Campo</span>
            </div>
            <p className="text-xs sm:text-sm text-[#f4f4f5] italic leading-relaxed">
              "{node.practicalTip}"
            </p>
          </div>
        )}

        {/* Checkpoints */}
        {node.checkpoints && node.checkpoints.length > 0 && (
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase text-[#a1a1aa] font-bold mb-3 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-[#88ce11]" />
              Marcos de Conhecimento & Execução:
            </h4>
            <div className="space-y-2">
              {node.checkpoints.map((cp, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#202020] border border-[rgba(255,255,255,0.05)] flex items-start gap-2.5 text-xs text-[#d4d4d8]"
                >
                  <div className="w-2 h-2 rounded-full bg-[#88ce11] mt-1 shrink-0" />
                  <span>{cp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {node.tags && node.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5 items-center">
            <Tag className="w-3.5 h-3.5 text-[#71717a]" />
            {node.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-[#222222] text-[#a1a1aa] text-[11px] font-mono border border-[rgba(255,255,255,0.06)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between gap-4">
          <button
            onClick={() => onToggleComplete(node.id)}
            className={`btn-primary !py-2.5 !px-5 text-xs flex items-center gap-2 transition-all ${
              isCompleted ? '!bg-[#27272a] !text-[#88ce11] !border !border-[#88ce11]/40' : ''
            }`}
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isCompleted ? 'Concluído ✓ (Clique para reverter)' : 'Marcar como Aprendido'}</span>
          </button>

          <button onClick={onClose} className="btn-secondary !py-2.5 !px-4 text-xs">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
