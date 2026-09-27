import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

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

// Preset verified roadmaps (including the flagship "Construção Civil" based on Mestre de Obras insights)
import { verifiedRoadmaps } from './src/data/verifiedRoadmaps';

app.post('/api/roadmap/generate', async (req, res) => {
  const { topic } = req.body;
  if (!topic || typeof topic !== 'string') {
    return res.status(400).json({ error: 'Tópico é obrigatório.' });
  }

  const cleanTopic = topic.trim().toLowerCase();

  // If topic matches one of the curated verified roadmaps, return it directly or with priority
  const matchedKey = Object.keys(verifiedRoadmaps).find(
    k => cleanTopic.includes(k) || k.includes(cleanTopic)
  );

  // If no Gemini API key is configured, return curated or smart generated fallback
  if (!process.env.GEMINI_API_KEY) {
    if (matchedKey && verifiedRoadmaps[matchedKey]) {
      return res.json({ roadmap: verifiedRoadmaps[matchedKey], source: 'verified-curated' });
    }
    // Return default civil construction or generated fallback
    return res.json({ 
      roadmap: verifiedRoadmaps['construção civil'] || verifiedRoadmaps['construção'],
      source: 'offline-verified' 
    });
  }

  try {
    const prompt = `Você é o arquiteto do GAMA Roadmap, especializado em gerar mapas mentais aninhados estilo "roadmap.sh" para QUALQUER assunto técnico, profissional ou prático.
O usuário quer aprender sobre: "${topic}".
O roadmap deve ter 4 níveis de profundidade:
- Nível 1: As macro-fases sequenciais do caminho (ex: 5 a 8 fases principais)
- Nível 2: Os pilares e competências essenciais dentro de cada fase
- Nível 3: As técnicas, ferramentas ou conhecimentos específicos
- Nível 4: Ação prática, dicas de verificação ("Dica de Mestre / Verificação Prática") e armadilhas comuns a evitar

MUITO IMPORTANTE:
- Crie um caminho 100% realista, praticável e verificável por quem entende do assunto.
- Todas as descrições e títulos devem estar em português natural, direto, sem rodeios ou enrolação.
- Gere entre 15 e 24 nós no total, com IDs limpos (ex: "n1", "n1-1", "n1-1-1").
- Forneça dicas práticas concretas que um especialista experiente daria.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Você é um gerador de roadmaps rigorosos estilo roadmap.sh. Devolva estritamente JSON válido conforme o esquema especificado.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            topic: { type: Type.STRING },
            tagline: { type: Type.STRING },
            estimatedDuration: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            benchmarkSubject: { type: Type.STRING },
            nodes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  level: { type: Type.INTEGER, description: '1 para Macro-fase, 2 para Tópico, 3 para Subtópico, 4 para Dica Prática/Ação' },
                  stageNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING },
                  description: { type: Type.STRING },
                  practicalTip: { type: Type.STRING },
                  importance: { type: Type.STRING, enum: ['essencial', 'recomendado', 'avancado'] },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  checkpoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                  parentId: { type: Type.STRING },
                },
                required: ['id', 'level', 'title', 'description', 'importance', 'tags', 'checkpoints'],
              },
            },
          },
          required: ['title', 'topic', 'tagline', 'estimatedDuration', 'nodes'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    parsed.totalNodes = parsed.nodes ? parsed.nodes.length : 0;
    return res.json({ roadmap: parsed, source: 'gemini-3.8-flash' });
  } catch (err: any) {
    console.error('Gemini generation error, falling back to verified template:', err);
    // If generation fails, gracefully serve curated benchmark
    const fallback = (matchedKey && verifiedRoadmaps[matchedKey]) 
      ? verifiedRoadmaps[matchedKey] 
      : verifiedRoadmaps['construção civil'];
    return res.json({ roadmap: fallback, source: 'fallback-verified', note: 'Exibindo roadmap verificado de alta precisão.' });
  }
});

// Endpoint to list curated roadmaps
app.get('/api/roadmap/templates', (_req, res) => {
  const templates = Object.entries(verifiedRoadmaps).map(([key, data]) => ({
    key,
    title: data.title,
    tagline: data.tagline,
    totalNodes: data.nodes.length,
    estimatedDuration: data.estimatedDuration,
  }));
  res.json({ templates });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GAMA Roadmap Dev Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
