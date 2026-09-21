"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "pt" | "en";

type Dict = Record<string, { pt: string; en: string }>;

const DICT: Dict = {
  // Navigation
  search: { pt: "Buscar...", en: "Search..." },
  overview: { pt: "Visão Geral", en: "Overview" },
  brand: { pt: "Marca", en: "Brand" },
  foundations: { pt: "Fundamentos", en: "Foundations" },
  components: { pt: "Componentes", en: "Components" },
  templates: { pt: "Templates", en: "Templates" },
  showcase: { pt: "Showcase", en: "Showcase" },
  developer: { pt: "Developer", en: "Developer" },
  home: { pt: "Início", en: "Home" },
  changelog: { pt: "Changelog", en: "Changelog" },

  // Brand
  identity: { pt: "Identidade Visual", en: "Visual Identity" },
  voice: { pt: "Tom de Voz", en: "Voice & Tone" },
  applications: { pt: "Aplicações", en: "Applications" },

  // Foundations
  colors: { pt: "Cores", en: "Colors" },
  typography: { pt: "Tipografia", en: "Typography" },
  spacing: { pt: "Espaçamento", en: "Spacing" },
  icons: { pt: "Ícones", en: "Icons" },
  effects: { pt: "Efeitos & Glass", en: "Effects & Glass" },
  motion: { pt: "Motion & Animação", en: "Motion & Animation" },

  // Components - Atoms
  atoms: { pt: "Átomos", en: "Atoms" },
  buttons: { pt: "Botões", en: "Buttons" },
  badges: { pt: "Badges", en: "Badges" },
  inputs: { pt: "Inputs", en: "Inputs" },
  checkboxes: { pt: "Checkboxes", en: "Checkboxes" },
  toggles: { pt: "Toggles", en: "Toggles" },
  spinners: { pt: "Spinners", en: "Spinners" },
  avatars: { pt: "Avatares", en: "Avatars" },
  dividers: { pt: "Dividers", en: "Dividers" },
  progress: { pt: "Barras de Progresso", en: "Progress Bars" },
  radios: { pt: "Radio Groups", en: "Radio Groups" },
  skeletons: { pt: "Skeletons", en: "Skeletons" },
  tags: { pt: "Tags", en: "Tags" },

  // Components - Molecules
  molecules: { pt: "Moléculas", en: "Molecules" },
  cards: { pt: "Cards", en: "Cards" },
  alerts: { pt: "Alertas", en: "Alerts" },
  dropdowns: { pt: "Dropdowns", en: "Dropdowns" },
  tooltips: { pt: "Tooltips", en: "Tooltips" },
  formFields: { pt: "Form Fields", en: "Form Fields" },

  // Components - Organisms
  organisms: { pt: "Organismos", en: "Organisms" },
  modals: { pt: "Modais", en: "Modals" },
  tables: { pt: "Tabelas", en: "Tables" },
  pageHeaders: { pt: "Page Headers", en: "Page Headers" },
  waveform: { pt: "Waveform", en: "Waveform" },

  // Developer
  tokens: { pt: "Tokens", en: "Tokens" },
  settings: { pt: "Configurações", en: "Settings" },

  // Home Page - Pillars
  pillar_brand_title: { pt: "Brand", en: "Brand" },
  pillar_brand_desc: { pt: "Identidade visual, voz e aplicações da marca GAMA.", en: "Visual identity, voice and applications of the GAMA brand." },
  pillar_foundations_title: { pt: "Foundations", en: "Foundations" },
  pillar_foundations_desc: { pt: "Cores, tipografia, espaçamento, ícones, efeitos e motion.", en: "Colors, typography, spacing, icons, effects and motion." },
  pillar_components_title: { pt: "Components", en: "Components" },
  pillar_components_desc: { pt: "Atoms, molecules e organisms tokenizados, prontos para produção.", en: "Tokenized atoms, molecules and organisms, production-ready." },
  pillar_templates_title: { pt: "Templates", en: "Templates" },
  pillar_templates_desc: { pt: "Layouts completos para SaaS, landing, dashboard e nichos verticais.", en: "Complete layouts for SaaS, landing, dashboard and vertical niches." },

  // Home Page - V3 Features
  feature_liquid_glass: { pt: "Liquid Glass nativo", en: "Native Liquid Glass" },
  feature_liquid_glass_desc: { pt: "Sistema de glassmorphism em camadas (subtle → intense → illuminated).", en: "Layered glassmorphism system (subtle → intense → illuminated)." },
  feature_volumetric: { pt: "Volumetric Lighting", en: "Volumetric Lighting" },
  feature_volumetric_desc: { pt: "Glows, raios cônicos e blob backgrounds animados.", en: "Glows, conical rays and animated blob backgrounds." },
  feature_darklight: { pt: "Dark + Light", en: "Dark + Light" },
  feature_darklight_desc: { pt: "Tokens duais com transição suave entre temas.", en: "Dual tokens with smooth theme transitions." },
  feature_scrollbar: { pt: "Custom Scrollbar", en: "Custom Scrollbar" },
  feature_scrollbar_desc: { pt: "Scrollbar verde, fina, com gradient — em todo o sistema.", en: "Green, thin scrollbar with gradient — across the entire system." },
  feature_layout: { pt: "Layout 100% estável", en: "100% Stable Layout" },
  feature_layout_desc: { pt: "Zero overflow, sidebar e main scroll independentes.", en: "Zero overflow, independent sidebar and main scroll." },
  feature_language: { pt: "PT/EN nativo", en: "Native PT/EN" },
  feature_language_desc: { pt: "Toggle de idioma persistente em localStorage.", en: "Persistent language toggle in localStorage." },

  // Brand Section Titles & Descriptions
  brand_identity_desc: { pt: "4 pilares que definem como a GAMA se apresenta em todas as touchpoints.", en: "4 pillars that define how GAMA presents itself across all touchpoints." },
  brand_personality: { pt: "Personalidade", en: "Personality" },
  brand_inovadora: { pt: "Inovadora", en: "Innovative" },
  brand_inovadora_desc: { pt: "Não seguimos tendências — as criamos.", en: "We don't follow trends — we create them." },
  brand_premium: { pt: "Premium", en: "Premium" },
  brand_premium_desc: { pt: "Cada pixel importa.", en: "Every pixel matters." },
  brand_confiavel: { pt: "Confiável", en: "Reliable" },
  brand_confiavel_desc: { pt: "Tokens documentados, componentes testados e padrões consistentes.", en: "Documented tokens, tested components and consistent patterns." },
  brand_ousada: { pt: "Ousada", en: "Bold" },
  brand_ousada_desc: { pt: "Presença que não se desculpa.", en: "Presence that doesn't apologize." },
  brand_voice_intro: { pt: "4 pilares que guiam toda comunicação da GAMA.", en: "4 pillars that guide all GAMA communication." },
  brand_applications_intro: { pt: "6 padrões de animação da marca em uso real.", en: "6 brand animation patterns in real use." },

  // Foundations Details
  spacing_scale: { pt: "Escala de Espaçamento", en: "Spacing Scale" },
  spacing_scale_desc: { pt: "10 tokens de spacing — múltiplos de 4px para criar ritmo visual harmonioso.", en: "10 spacing tokens — multiples of 4px to create harmonious visual rhythm." },
  border_radius_desc: { pt: "4 tokens de border-radius — do radius-sm para inputs ao radius-xl para hero cards.", en: "4 border-radius tokens — from radius-sm for inputs to radius-xl for hero cards." },
  typography_hierarchy: { pt: "Hierarquia Tipográfica", en: "Typography Hierarchy" },
  typography_scales: { pt: "8 níveis hierárquicos — do display heading de 64px ao caption de 10px.", en: "8 hierarchical levels — from 64px display heading to 10px caption." },
  color_system: { pt: "15 tokens de cor categorizados por função.", en: "15 color tokens categorized by function." },
  icons_scale: { pt: "5 tamanhos padrão — use font-size para controlar o ícone.", en: "5 standard sizes — use font-size to control icon size." },

  // Component Details
  buttons_subtitle: { pt: "Botões são a unidade de ação do sistema. 5 variantes, 3 tamanhos, todos os estados — todos tokenizados.", en: "Buttons are the system's unit of action. 5 variants, 3 sizes, all states — all tokenized." },
  buttons_variants: { pt: "5 variantes para diferentes níveis de ênfase.", en: "5 variants for different emphasis levels." },
  buttons_sizes: { pt: "3 escalas de altura para hierarquias visuais.", en: "3 height scales for visual hierarchies." },

  badges_subtitle: { pt: "Badges & Pills", en: "Badges & Pills" },
  badges_desc: { pt: "3 variantes semânticas prontas. Clique em qualquer badge para copiar o class name.", en: "3 semantic variants ready. Click any badge to copy the class name." },

  alerts_subtitle: { pt: "Alertas comunicam estados importantes: erros, avisos, confirmações e informações.", en: "Alerts communicate important states: errors, warnings, confirmations and information." },
  alerts_types: { pt: "4 tipos — cada um com ícone, cor e significado distintos.", en: "4 types — each with distinct icon, color and meaning." },

  cards_subtitle: { pt: "3 níveis de intensidade para diferentes hierarquias visuais.", en: "3 intensity levels for different visual hierarchies." },

  modals_subtitle: { pt: "Modais focam a atenção do usuário em uma tarefa específica.", en: "Modals focus user attention on a specific task." },

  tables_subtitle: { pt: "Tabelas organizam dados estruturados com padrões de sorting, filtering e selection.", en: "Tables organize structured data with sorting, filtering and selection patterns." },

  progress_subtitle: { pt: "Barras de progresso comunicam o avanço de um processo.", en: "Progress bars communicate process advancement." },

  avatars_subtitle: { pt: "Avatars identificam usuários com iniciais coloridas ou imagem.", en: "Avatars identify users with colored initials or images." },

  spinners_subtitle: { pt: "Spinners comunicam que uma operação está em andamento.", en: "Spinners communicate that an operation is in progress." },

  dropdowns_subtitle: { pt: "Dropdowns oferecem múltiplas ações ou opções em espaço compacto.", en: "Dropdowns offer multiple actions or options in compact space." },

  tooltips_subtitle: { pt: "Tooltips oferecem dicas rápidas e contextuais sem sair da interface.", en: "Tooltips offer quick contextual tips without leaving the interface." },

  dividers_subtitle: { pt: "Divisores separam conteúdo de forma visual e lógica.", en: "Dividers separate content visually and logically." },

  checkboxes_subtitle: { pt: "Checkboxes permitem seleção múltipla de opções.", en: "Checkboxes allow multiple option selection." },

  toggles_subtitle: { pt: "Toggles alternam entre dois estados — on/off, sim/não, ativo/inativo.", en: "Toggles switch between two states — on/off, yes/no, active/inactive." },

  inputs_subtitle: { pt: "Inputs são campos para entrada de dados — texto, email, número, busca.", en: "Inputs are data entry fields — text, email, number, search." },

  // Brand Section Details
  isotipo_title: { pt: "Isotipo — Símbolo G", en: "Isotype — G Symbol" },
  isotipo_desc: { pt: "O símbolo isolado da GAMA. Forma geométrica com recorte triangular característico no canto superior direito.", en: "The isolated GAMA symbol. Geometric shape with characteristic triangular cutout in the upper right corner." },
  imagotipo_title: { pt: "Imagotipo — GAMA Studio", en: "Imagotype — GAMA Studio" },
  imagotipo_desc: { pt: "Combinação do símbolo G com o logotipo completo. Uso principal em contextos da agência.", en: "Combination of G symbol with full logotype. Primary use in agency contexts." },
  subbrands_title: { pt: "Sub-Marcas", en: "Sub-Brands" },
  subbrands_desc: { pt: "Família de marcas GAMA — cada vertical com identidade própria mantendo coerência com a marca-mãe.", en: "GAMA brand family — each vertical with its own identity while maintaining coherence with the parent brand." },
  brand_colors_title: { pt: "Cores de Marca", en: "Brand Colors" },
  brand_colors_desc: { pt: "Três variações do verde GAMA — use Primary para CTA, Light para hover, Dark para pressed.", en: "Three variations of GAMA green — use Primary for CTA, Light for hover, Dark for pressed." },
  brand_typography_title: { pt: "Tipografia de Marca", en: "Brand Typography" },
  brand_typography_desc: { pt: "Montserrat (wordmark, display) + Poppins (UI, corpo). Ambas em Black 900 para headlines de impacto.", en: "Montserrat (wordmark, display) + Poppins (UI, body). Both in Black 900 for impactful headlines." },

  // Voice Section
  voice_intro: { pt: "4 pilares que guiam toda comunicação da GAMA.", en: "4 pillars that guide all GAMA communication." },
  tone_strategic: { pt: "Estratégica", en: "Strategic" },
  tone_strategic_desc: { pt: "Comunicação orientada por objetivos. Cada palavra tem propósito.", en: "Goal-oriented communication. Every word has purpose." },
  tone_premium: { pt: "Premium", en: "Premium" },
  tone_premium_desc: { pt: "Linguagem refinada que eleva o status da marca em cada contexto.", en: "Refined language that elevates brand status in every context." },
  tone_accessible: { pt: "Acessível", en: "Accessible" },
  tone_accessible_desc: { pt: "Não perdemos qualidade, mas nunca soamos pretenciosos ou inatingível.", en: "We don't lose quality, but never sound pretentious or unattainable." },
  tone_human: { pt: "Humana", en: "Human" },
  tone_human_desc: { pt: "Conversamos com pessoas, não com abstrações. Empatia em cada mensagem.", en: "We talk with people, not abstractions. Empathy in every message." },

  // States
  comingSoon: { pt: "Em breve", en: "Coming soon" },
  comingSoonBody: {
    pt: "Esta seção está sendo construída com o novo padrão V3. Volte em breve.",
    en: "This section is being built with the new V3 standard. Come back soon.",
  },

  // Common UI Strings (for component pages)
  anatomy: { pt: "Anatomia", en: "Anatomy" },
  best_practices: { pt: "Boas Práticas", en: "Best Practices" },
  do_dont: { pt: "Faça e Não Faça", en: "Do's and Don'ts" },
  variants: { pt: "Variantes", en: "Variants" },
  examples: { pt: "Exemplos", en: "Examples" },
  usage: { pt: "Uso", en: "Usage" },
  copy_classname: { pt: "Copiar class name", en: "Copy class name" },
  copied: { pt: "Copiado!", en: "Copied!" },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: keyof typeof DICT) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "gama-ds-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "pt" || stored === "en") setLangState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      toggleLang: () => setLangState((l) => (l === "pt" ? "en" : "pt")),
      t: (key) => DICT[key]?.[lang] ?? String(key),
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: "pt",
      setLang: () => {},
      toggleLang: () => {},
      t: (key) => String(key),
    };
  }
  return ctx;
}
