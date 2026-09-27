import React from 'react';
import { Compass, BookOpen, CheckCircle2, Share2, Sparkles, Filter } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  onOpenFilters: () => void;
  onOpenExport: () => void;
  completedCount: number;
  totalCount: number;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenFilters,
  onOpenExport,
  completedCount,
  totalCount,
  viewMode,
  onChangeViewMode,
}) => {
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[rgba(255,255,255,0.08)] bg-[#161616]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#88ce11] to-[#5d8e09] flex items-center justify-center shadow-[0_0_20px_rgba(136,206,17,0.4)]">
            <Compass className="w-6 h-6 text-[#0c1202]" strokeWidth={2.4} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                GAMA <span className="text-[#88ce11]">Roadmap</span>
              </h1>
              <span className="hidden sm:inline-flex pill-green text-[10px]">
                v0.1 · Beta
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] font-medium hidden sm:block">
              Vibe Code para Burros · Mapas Mentais Universais Estilo roadmap.sh
            </p>
          </div>
        </div>

        {/* View Switcher & Progress */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Progress Pill */}
          {totalCount > 0 && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#88ce11]" />
              <span className="text-xs font-mono text-[#f4f4f5]">
                {completedCount}/{totalCount} ({progressPercent}%)
              </span>
              <div className="w-16 h-1.5 bg-[#262626] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#88ce11] to-[#a3e635] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* View Mode Buttons */}
          <div className="flex items-center bg-[#202020] p-1 rounded-xl border border-[rgba(255,255,255,0.08)]">
            <button
              onClick={() => onChangeViewMode('graph')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'graph'
                  ? 'bg-[#88ce11] text-[#0c1202] shadow-[0_0_12px_rgba(136,206,17,0.3)]'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              Grafo Visual
            </button>
            <button
              onClick={() => onChangeViewMode('tree')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'tree'
                  ? 'bg-[#88ce11] text-[#0c1202] shadow-[0_0_12px_rgba(136,206,17,0.3)]'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              Lista Aninhada
            </button>
            <button
              onClick={() => onChangeViewMode('checklist')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                viewMode === 'checklist'
                  ? 'bg-[#88ce11] text-[#0c1202] shadow-[0_0_12px_rgba(136,206,17,0.3)]'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              Checklist
            </button>
          </div>

          {/* 3 Filters Modal Trigger */}
          <button
            onClick={onOpenFilters}
            className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
            title="Ver os 3 Filtros do Vibe Code para Burros"
          >
            <Filter className="w-3.5 h-3.5 text-[#88ce11]" />
            <span className="hidden lg:inline">Os 3 Filtros</span>
          </button>

          {/* Export / Share */}
          <button
            onClick={onOpenExport}
            className="btn-secondary !py-1.5 !px-3 text-xs"
            title="Exportar ou Compartilhar"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
