export interface RoadmapNode {
  id: string;
  level: 1 | 2 | 3 | 4;
  stageNumber?: number;
  title: string;
  subtitle?: string;
  description: string;
  practicalTip?: string;
  importance: 'essencial' | 'recomendado' | 'avancado';
  tags: string[];
  checkpoints: string[];
  parentId?: string;
}

export interface RoadmapData {
  title: string;
  topic: string;
  tagline: string;
  totalNodes: number;
  estimatedDuration: string;
  difficulty: 'Iniciante ao Avançado' | 'Intermediário' | 'Especialista';
  benchmarkSubject: string;
  nodes: RoadmapNode[];
}

export type ViewMode = 'graph' | 'tree' | 'checklist';
