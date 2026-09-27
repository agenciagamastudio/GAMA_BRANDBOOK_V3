import React from 'react';
import { Check, ChevronRight, Lightbulb, Clock, Layers, Award, Tag } from 'lucide-react';
import { RoadmapData, RoadmapNode } from '../types';

interface RoadmapGraphViewProps {
  roadmap: RoadmapData;
  completedNodes: Set<string>;
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
  onSelectNode: (node: RoadmapNode) => void;
  searchQuery: string;
}

export const RoadmapGraphView: React.FC<RoadmapGraphViewProps> = ({
  roadmap,
  completedNodes,
  onToggleComplete,
  onSelectNode,
  searchQuery,
}) => {
  // Group nodes by Level 1 parents
  const level1Nodes = roadmap.nodes.filter((n) => n.level === 1);

  // If there are subnodes, group them under their parent or stage
  const getChildrenOf = (parentId: string) => {
    return roadmap.nodes.filter((n) => n.parentId === parentId || (n.level > 1 && n.id.startsWith(parentId)));
  };

  const filteredNodes = roadmap.nodes.filter((n) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) ||
      n.description.toLowerCase().includes(q) ||
      (n.practicalTip && n.practicalTip.toLowerCase().includes(q)) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Top Roadmap Info Header */}
      <div className="glass-card p-6 mb-10 border border-[rgba(136,206,17,0.2)] bg-gradient-to-b from-[#1c1c1c] to-[#161616]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="pill-green">{roadmap.difficulty || 'Trilha Completa'}</span>
            <span className="text-xs text-[#a1a1aa] font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#88ce11]" />
              {roadmap.estimatedDuration}
            </span>
          </div>
          <span className="text-xs font-mono text-[#71717a]">
            {roadmap.nodes.length} nós mapeados
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {roadmap.title}
        </h2>
        <p className="mt-2 text-[#a1a1aa] text-sm sm:text-base leading-relaxed">
          {roadmap.tagline}
        </p>

        {roadmap.benchmarkSubject && (
          <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-2 text-xs text-[#88ce11]">
            <Award className="w-4 h-4" />
            <span className="font-semibold">Validação de Campo:</span>
            <span className="text-[#d4d4d8]">{roadmap.benchmarkSubject}</span>
          </div>
        )}
      </div>

      {/* Main Roadmap Path Container */}
      <div className="relative">
        {/* Connecting central vertical timeline wire (styled roadmap.sh look) */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-12 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#88ce11] via-[rgba(136,206,17,0.4)] to-transparent hidden sm:block pointer-events-none" />

        <div className="space-y-12">
          {level1Nodes.map((macroNode, index) => {
            const isCompleted = completedNodes.has(macroNode.id);
            const children = getChildrenOf(macroNode.id);
            const stageNum = macroNode.stageNumber || index + 1;
            const isEven = index % 2 === 0;

            return (
              <div key={macroNode.id} className="relative">
                {/* Milestone Node Card */}
                <div
                  className={`flex flex-col sm:flex-row items-center gap-6 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Card Content */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    <div
                      onClick={() => onSelectNode(macroNode)}
                      className={`glass-card p-5 sm:p-6 cursor-pointer group transition-all duration-300 relative border ${
                        isCompleted
                          ? 'border-[#88ce11]/60 bg-[#162309]/30 shadow-[0_0_20px_rgba(136,206,17,0.15)]'
                          : 'border-[rgba(255,255,255,0.1)] hover:border-[#88ce11]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
                      }`}
                    >
                      {/* Top bar with stage number & mark complete */}
                      <div className="flex items-center justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-[#88ce11] text-[#0c1202] text-xs font-black flex items-center justify-center font-mono">
                            {stageNum}
                          </span>
                          <span className="text-[11px] font-bold text-[#88ce11] uppercase tracking-wider">
                            Nível 1 · Macro-Fase
                          </span>
                        </div>

                        {/* Complete Checkbox */}
                        <button
                          type="button"
                          onClick={(e) => onToggleComplete(macroNode.id, e)}
                          title={isCompleted ? 'Marcar como pendente' : 'Marcar como concluído'}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-[#88ce11] text-black shadow-[0_0_10px_rgba(136,206,17,0.5)]'
                              : 'bg-[#222222] border border-[rgba(255,255,255,0.2)] text-transparent hover:border-[#88ce11] hover:text-[#88ce11]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>

                      {/* Title & subtitle */}
                      <h3
                        className={`text-lg sm:text-xl font-bold transition-colors ${
                          isCompleted ? 'text-[#88ce11] line-through opacity-85' : 'text-white group-hover:text-[#88ce11]'
                        }`}
                      >
                        {macroNode.title}
                      </h3>

                      {macroNode.subtitle && (
                        <p className="text-xs font-medium text-[#88ce11]/90 mt-0.5">
                          {macroNode.subtitle}
                        </p>
                      )}

                      <p className="text-xs sm:text-sm text-[#a1a1aa] mt-2 line-clamp-3 leading-relaxed">
                        {macroNode.description}
                      </p>

                      {/* Practical Tip Callout Banner */}
                      {macroNode.practicalTip && (
                        <div className="mt-3.5 p-2.5 rounded-lg bg-[rgba(136,206,17,0.06)] border border-[rgba(136,206,17,0.2)] flex items-start gap-2 text-xs text-[#d4d4d8]">
                          <Lightbulb className="w-4 h-4 text-[#88ce11] shrink-0 mt-0.5" />
                          <p className="italic line-clamp-2">{macroNode.practicalTip}</p>
                        </div>
                      )}

                      {/* Tags & Action prompt */}
                      <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs">
                        <div className="flex flex-wrap gap-1.5">
                          {macroNode.tags?.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-[#202020] text-[#a1a1aa] text-[10px] font-mono border border-[rgba(255,255,255,0.05)]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <span className="text-[#88ce11] group-hover:translate-x-1 transition-transform flex items-center gap-0.5 text-xs font-semibold">
                          Detalhes <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center Node Indicator (Glowing Gem on Desktop) */}
                  <div className="hidden sm:flex w-10 h-10 rounded-full bg-[#161616] border-2 border-[#88ce11] items-center justify-center z-10 shadow-[0_0_15px_rgba(136,206,17,0.4)]">
                    <div
                      className={`w-3.5 h-3.5 rounded-full transition-all ${
                        isCompleted ? 'bg-[#88ce11] scale-125' : 'bg-[#88ce11]/40'
                      }`}
                    />
                  </div>

                  {/* Opposite Column: Children / Subnodes Preview */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    {children.length > 0 ? (
                      <div className="space-y-2.5 pl-4 sm:pl-0 border-l sm:border-l-0 border-[rgba(136,206,17,0.3)]">
                        <p className="text-[11px] font-mono uppercase text-[#71717a] font-semibold flex items-center gap-1">
                          <Layers className="w-3 h-3 text-[#88ce11]" />
                          Subtópicos & Execução (Nível 2 & 3):
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          {children.map((child) => {
                            const childCompleted = completedNodes.has(child.id);
                            return (
                              <div
                                key={child.id}
                                onClick={() => onSelectNode(child)}
                                className={`p-3 rounded-xl cursor-pointer border transition-all text-xs ${
                                  childCompleted
                                    ? 'bg-[#18230c]/40 border-[#88ce11]/40 text-[#a1a1aa]'
                                    : 'bg-[#1c1c1c]/80 border-[rgba(255,255,255,0.07)] hover:border-[#88ce11]/40 text-white'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={`font-semibold ${
                                      childCompleted ? 'line-through text-[#71717a]' : 'text-white'
                                    }`}
                                  >
                                    {child.title}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => onToggleComplete(child.id, e)}
                                    className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                                      childCompleted
                                        ? 'bg-[#88ce11] text-black'
                                        : 'border border-[rgba(255,255,255,0.2)] text-transparent hover:border-[#88ce11]'
                                    }`}
                                  >
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  </button>
                                </div>
                                {child.description && (
                                  <p className="text-[11px] text-[#71717a] mt-1 line-clamp-1">
                                    {child.description}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="hidden sm:block p-4 rounded-xl border border-dashed border-[rgba(255,255,255,0.05)] text-center text-xs text-[#71717a]">
                        Fase autocontida · Conclua todos os marcos práticos
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
