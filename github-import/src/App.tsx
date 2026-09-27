import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatInput } from './components/ChatInput';
import { RoadmapGraphView } from './components/RoadmapGraphView';
import { RoadmapListView } from './components/RoadmapListView';
import { ChecklistView } from './components/ChecklistView';
import { NodeDetailModal } from './components/NodeDetailModal';
import { ThreeFiltersModal } from './components/ThreeFiltersModal';
import { ExportModal } from './components/ExportModal';
import { verifiedRoadmaps } from './data/verifiedRoadmaps';
import { RoadmapData, RoadmapNode, ViewMode } from './types';
import { Search, Sparkles, Filter, Info, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [currentRoadmap, setCurrentRoadmap] = useState<RoadmapData>(
    verifiedRoadmaps['construção civil']
  );
  const [activeTopic, setActiveTopic] = useState<string>('Construção Civil');
  const [viewMode, setViewMode] = useState<ViewMode>('graph');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Completed nodes persistence
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('gama_roadmap_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gama_roadmap_completed', JSON.stringify(Array.from(completedNodes)));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [completedNodes]);

  const toggleComplete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Generate roadmap handler
  const handleGenerate = async (topic: string) => {
    setIsLoading(true);
    setActiveTopic(topic);

    try {
      const res = await fetch('/api/roadmap/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!res.ok) {
        throw new Error('Falha ao comunicar com a API');
      }

      const data = await res.json();
      if (data.roadmap && data.roadmap.nodes && data.roadmap.nodes.length > 0) {
        setCurrentRoadmap(data.roadmap);
      } else {
        // Fallback to verified matching
        const clean = topic.toLowerCase();
        const fallback = Object.entries(verifiedRoadmaps).find(([k]) => clean.includes(k) || k.includes(clean))?.[1] || verifiedRoadmaps['construção civil'];
        setCurrentRoadmap(fallback);
      }
    } catch (err) {
      console.warn('Usando fallback local:', err);
      const clean = topic.toLowerCase();
      const fallback = Object.entries(verifiedRoadmaps).find(([k]) => clean.includes(k) || k.includes(clean))?.[1] || verifiedRoadmaps['construção civil'];
      setCurrentRoadmap(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const completedCount = currentRoadmap.nodes.filter((n) => completedNodes.has(n.id)).length;

  return (
    <div className="min-h-screen bg-[#161616] text-[#f4f4f5] flex flex-col selection:bg-[#88ce11] selection:text-black">
      {/* Top Header */}
      <Header
        onOpenFilters={() => setIsFiltersOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        completedCount={completedCount}
        totalCount={currentRoadmap.nodes.length}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
      />

      <main className="flex-1 pb-16">
        {/* Chat Conversational Input */}
        <ChatInput
          onGenerate={handleGenerate}
          isLoading={isLoading}
          activeTopic={activeTopic}
        />

        {/* In-Roadmap Search & Filter Bar */}
        <div className="max-w-4xl mx-auto px-4 mb-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-[#71717a] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar por tópico, técnica ou dica de mestre..."
                className="w-full bg-[#1c1c1c] text-white placeholder-[#71717a] pl-9 pr-4 py-2 rounded-xl border border-[rgba(255,255,255,0.06)] text-xs focus:border-[#88ce11] outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#71717a] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
              <button
                onClick={() => setIsFiltersOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[rgba(136,206,17,0.08)] border border-[rgba(136,206,17,0.2)] text-[#88ce11] hover:bg-[rgba(136,206,17,0.15)] flex items-center gap-1.5 font-medium transition-all"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Os 3 Filtros (Versão 0)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Roadmap Content depending on viewMode */}
        {viewMode === 'graph' && (
          <RoadmapGraphView
            roadmap={currentRoadmap}
            completedNodes={completedNodes}
            onToggleComplete={toggleComplete}
            onSelectNode={setSelectedNode}
            searchQuery={searchQuery}
          />
        )}

        {viewMode === 'tree' && (
          <RoadmapListView
            roadmap={currentRoadmap}
            completedNodes={completedNodes}
            onToggleComplete={toggleComplete}
            onSelectNode={setSelectedNode}
            searchQuery={searchQuery}
          />
        )}

        {viewMode === 'checklist' && (
          <ChecklistView
            roadmap={currentRoadmap}
            completedNodes={completedNodes}
            onToggleComplete={toggleComplete}
            onSelectNode={setSelectedNode}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[#141414] py-8 text-xs text-[#71717a]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-white font-bold flex items-center justify-center sm:justify-start gap-1.5">
              GAMA Roadmap <span className="text-[#88ce11]">· Vibe Code para Burros</span>
            </p>
            <p className="mt-1 text-[11px] text-[#a1a1aa]">
              Construído com os tokens do Design System GAMA V3 (#88ce11). Foco no que é essencial.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-[#88ce11]">
              <ShieldCheck className="w-4 h-4" />
              Verificação Prática Mestre de Obras
            </span>
            <span>·</span>
            <button
              onClick={() => setIsFiltersOpen(true)}
              className="text-[#d4d4d8] hover:text-[#88ce11] underline underline-offset-2"
            >
              Revisar os 3 Filtros
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <NodeDetailModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        isCompleted={selectedNode ? completedNodes.has(selectedNode.id) : false}
        onToggleComplete={(id) => toggleComplete(id)}
      />

      <ThreeFiltersModal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApplyIdeaToRoadmap={handleGenerate}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        roadmap={currentRoadmap}
      />
    </div>
  );
}
