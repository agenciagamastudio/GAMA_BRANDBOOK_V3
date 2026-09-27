import React, { useState } from 'react';
import { X, Copy, Check, Download, Printer, FileText, Code2 } from 'lucide-react';
import { RoadmapData } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  roadmap: RoadmapData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, roadmap }) => {
  const [copiedType, setCopiedType] = useState<'md' | 'json' | null>(null);

  if (!isOpen) return null;

  // Generate Markdown representation
  const generateMarkdown = () => {
    let md = `# ${roadmap.title}\n\n`;
    md += `> ${roadmap.tagline}\n\n`;
    md += `- **Duração Estimada:** ${roadmap.estimatedDuration}\n`;
    md += `- **Nível:** ${roadmap.difficulty}\n`;
    if (roadmap.benchmarkSubject) {
      md += `- **Referência Prática:** ${roadmap.benchmarkSubject}\n`;
    }
    md += `\n---\n\n`;

    roadmap.nodes.forEach((n) => {
      const indent = '  '.repeat(n.level - 1);
      const prefix = n.level === 1 ? `## ` : `${indent}- `;
      md += `${prefix}${n.title}\n`;
      if (n.description) md += `${indent}  ${n.description}\n`;
      if (n.practicalTip) md += `${indent}  *Dica de Mestre: ${n.practicalTip}*\n`;
      if (n.checkpoints?.length) {
        n.checkpoints.forEach((cp) => {
          md += `${indent}  - [ ] ${cp}\n`;
        });
      }
      md += `\n`;
    });

    return md;
  };

  const copyToClipboard = (text: string, type: 'md' | 'json') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(roadmap, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `${roadmap.topic.toLowerCase().replace(/\s+/g, '-')}-roadmap.json`);
    dlAnchor.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="glass-card max-w-xl w-full p-6 sm:p-8 border border-[rgba(136,206,17,0.3)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative bg-[#181818]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#71717a] hover:text-white hover:bg-[rgba(255,255,255,0.06)]"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-black text-white flex items-center gap-2 mb-2">
          <Download className="w-5 h-5 text-[#88ce11]" />
          Exportar & Compartilhar Roadmap
        </h3>
        <p className="text-xs text-[#a1a1aa] mb-6">
          Exporte o conteúdo estruturado para usar no Notion, Obsidian, GitHub ou imprimir.
        </p>

        <div className="space-y-3">
          {/* Copy Markdown */}
          <div className="p-4 rounded-xl bg-[#202020] border border-[rgba(255,255,255,0.06)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#88ce11]" />
              <div>
                <span className="text-sm font-bold text-white block">Formato Markdown (.md)</span>
                <span className="text-xs text-[#71717a]">Ideal para Notion, Obsidian e README</span>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(generateMarkdown(), 'md')}
              className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
            >
              {copiedType === 'md' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#88ce11]" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Download JSON */}
          <div className="p-4 rounded-xl bg-[#202020] border border-[rgba(255,255,255,0.06)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Code2 className="w-5 h-5 text-[#3b82f6]" />
              <div>
                <span className="text-sm font-bold text-white block">Estrutura JSON Completa</span>
                <span className="text-xs text-[#71717a]">Arquivo de dados puro com todos os nós</span>
              </div>
            </div>
            <button
              onClick={downloadJson}
              className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar</span>
            </button>
          </div>

          {/* Print / Save PDF */}
          <div className="p-4 rounded-xl bg-[#202020] border border-[rgba(255,255,255,0.06)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Printer className="w-5 h-5 text-[#f59e0b]" />
              <div>
                <span className="text-sm font-bold text-white block">Imprimir / Salvar PDF</span>
                <span className="text-xs text-[#71717a]">Gere uma versão limpa para leitura física</span>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] text-right">
          <button onClick={onClose} className="btn-secondary !py-2 !px-4 text-xs">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
