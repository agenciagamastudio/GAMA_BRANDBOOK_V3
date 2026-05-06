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
  identity: { pt: "Identidade Visual", en: "Visual Identity" },
  voice: { pt: "Tom de Voz", en: "Voice & Tone" },
  applications: { pt: "Aplicações", en: "Applications" },
  colors: { pt: "Cores", en: "Colors" },
  typography: { pt: "Tipografia", en: "Typography" },
  spacing: { pt: "Espaçamento", en: "Spacing" },
  icons: { pt: "Ícones", en: "Icons" },
  effects: { pt: "Efeitos & Glass", en: "Effects & Glass" },
  motion: { pt: "Motion & Animação", en: "Motion & Animation" },
  atoms: { pt: "Átomos", en: "Atoms" },
  molecules: { pt: "Moléculas", en: "Molecules" },
  organisms: { pt: "Organismos", en: "Organisms" },
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
  cards: { pt: "Cards", en: "Cards" },
  alerts: { pt: "Alertas", en: "Alerts" },
  dropdowns: { pt: "Dropdowns", en: "Dropdowns" },
  tooltips: { pt: "Tooltips", en: "Tooltips" },
  formFields: { pt: "Form Fields", en: "Form Fields" },
  modals: { pt: "Modais", en: "Modals" },
  tables: { pt: "Tabelas", en: "Tables" },
  pageHeaders: { pt: "Page Headers", en: "Page Headers" },
  waveform: { pt: "Waveform", en: "Waveform" },
  tokens: { pt: "Tokens", en: "Tokens" },
  settings: { pt: "Configurações", en: "Settings" },
  comingSoon: { pt: "Em breve", en: "Coming soon" },
  comingSoonBody: {
    pt: "Esta seção está sendo construída com o novo padrão V3. Volte em breve.",
    en: "This section is being built with the new V3 standard. Come back soon.",
  },
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
