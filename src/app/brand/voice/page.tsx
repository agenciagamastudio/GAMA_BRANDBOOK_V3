"use client";

import { useLang } from "@/components/layout/LanguageProvider";
import PageLayout from "@/components/layout/PageLayout";

function SectionHeader({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <header style={{ marginBottom: 24 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--color-primary)",
          fontWeight: 700,
          letterSpacing: 0.2,
        }}
      >
        ── {number}
      </div>
      <h2 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 8px", letterSpacing: -0.5 }}>
        {title}
      </h2>
      <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: 14, maxWidth: 720 }}>
        {desc}
      </p>
    </header>
  );
}

const VOICE_PRINCIPLES = [
  {
    name: "Direto",
    desc: "Vá ao ponto. Sem jargão desnecessário, sem frases infladas. Uma frase comunica mais que um parágrafo quando bem escrita.",
    icon: "→",
    color: "var(--color-primary)",
  },
  {
    name: "Confiante",
    desc: "Afirmamos, não sugerimos. 'Use este componente' em vez de 'Você pode querer usar'. Sabemos o que fazemos.",
    icon: "★",
    color: "var(--color-primary)",
  },
  {
    name: "Inclusivo",
    desc: "Qualquer nível técnico deve entender o básico. Exemplos concretos antes de definições abstratas. Linguagem sem exclusão.",
    icon: "●",
    color: "var(--color-info)",
  },
  {
    name: "Técnico",
    desc: "Respeitamos a inteligência do usuário. Nomes corretos de propriedades CSS, referências precisas, sem simplificações enganosas.",
    icon: "◆",
    color: "var(--color-primary)",
  },
];

const CONTEXT_TONES = [
  {
    context: "Marketing",
    tone: "Entusiasmado, aspiracional",
    example: '"Construa interfaces premium. Em horas, não meses."',
    pillCls: "pill-green",
  },
  {
    context: "Documentação",
    tone: "Claro, técnico, preciso",
    example: '"Use .glass-intense para painéis de destaque que precisam de blur 40px e borda reforçada."',
    pillCls: "pill-blue",
  },
  {
    context: "Mensagem de Erro",
    tone: "Empático, útil, orientado à solução",
    example: '"Componente não encontrado. Verifique se o import está apontando para @/components/ui/Button."',
    pillCls: "pill-muted",
  },
  {
    context: "Sucesso / Confirmação",
    tone: "Celebratório, breve",
    example: '"Pronto! Seu componente foi publicado."',
    pillCls: "pill-green",
  },
];

const DOS_AND_DONTS = [
  {
    good: "Explore os 21 componentes prontos",
    bad: "Você pode explorar nossa gama de opções de componentes",
    why: "Ativo e direto em vez de passivo e inflado.",
  },
  {
    good: "Erro: prop `variant` é obrigatória",
    bad: "Parece que houve um pequeno probleminha com suas props",
    why: "Específico e técnico em vez de vago e condescendente.",
  },
  {
    good: "Dark mode nativo — zero config",
    bad: "Disponibilizamos funcionalidade de modo escuro para sua conveniência",
    why: "Conciso e orientado a valor em vez de formal e vazio.",
  },
  {
    good: "Tokens mudam tudo automaticamente",
    bad: "Nossa solução de tokenização CSS possibilita mudanças globais em variáveis",
    why: "Fala o benefício, não o mecanismo.",
  },
];

const VOCABULARY = [
  { use: "Componente", avoid: "Widget / Elemento / Peça" },
  { use: "Token", avoid: "Variável CSS / Valor de cor" },
  { use: "Dark mode", avoid: "Modo noturno / Tema escuro" },
  { use: "Design System", avoid: "Biblioteca de UI / Kit" },
  { use: "Glassmorphism", avoid: "Efeito de vidro / Blur" },
  { use: "Build", avoid: "Compilar / Processar" },
];

export default function VoicePage() {
  const { t } = useLang();

  return (
    <PageLayout
      title={t("voice")}
      accentWord={t("voice")}
      subtitle={t("voice_intro")}
      breadcrumb={[
        { label: "Brand", href: "/brand/identity" },
        { label: "Voice & Tone" },
      ]}
      badge="V3 · BRAND"
    >
      {/* SECTION 01 — Voice Principles */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="01"
          title="Princípios de Voz"
          desc="4 pilares que guiam toda comunicação da GAMA — marketing, docs, UX copy e mensagens do sistema."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {VOICE_PRINCIPLES.map((p) => (
            <div
              key={p.name}
              className="glass-card vol-light"
              style={{ padding: 28, borderRadius: 20 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "var(--color-primary-dim)",
                    border: "1px solid var(--color-border-green)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    color: p.color,
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{p.name}</h3>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                  margin: 0,
                  lineHeight: 1.65,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 02 — Tone by Context */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="02"
          title="Tom por Contexto"
          desc="A voz é constante, mas o tom muda conforme o momento de contato com o usuário."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {CONTEXT_TONES.map((t) => (
            <div
              key={t.context}
              className="glass-subtle"
              style={{ padding: "20px 24px", borderRadius: 16 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className={`pill ${t.pillCls}`}>{t.context}</span>
                  <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{t.tone}</span>
                </div>
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontStyle: "italic",
                  color: "var(--color-text-secondary)",
                  padding: "12px 16px",
                  background: "rgba(136,206,17,0.04)",
                  border: "1px solid var(--color-border)",
                  borderLeft: "3px solid var(--color-primary)",
                  borderRadius: "0 8px 8px 0",
                  lineHeight: 1.6,
                }}
              >
                {t.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 03 — Dos and Don'ts */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="03"
          title="Dos & Don'ts"
          desc="Exemplos concretos de copy bom versus problemático na prática."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {DOS_AND_DONTS.map((d, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 200px", gap: 12 }}>
              {/* Good */}
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: 14,
                  background: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.25)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "#10b981",
                    fontWeight: 700,
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  ✓ Use
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{d.good}</div>
              </div>

              {/* Bad */}
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: 14,
                  background: "rgba(225,29,72,0.06)",
                  border: "1px solid rgba(225,29,72,0.2)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "#e11d48",
                    fontWeight: 700,
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  ✗ Evite
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(225,29,72,0.4)",
                  }}
                >
                  {d.bad}
                </div>
              </div>

              {/* Why */}
              <div
                style={{
                  padding: "16px 18px",
                  borderRadius: 14,
                  background: "var(--color-primary-dim)",
                  border: "1px solid var(--color-border-green)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  {d.why}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04 — Vocabulary */}
      <section style={{ marginBottom: 32 }}>
        <SectionHeader
          number="04"
          title="Vocabulário Oficial"
          desc="Termos que a GAMA usa e sinônimos que evita — para consistência em toda a documentação."
        />
        <div
          className="glass-card"
          style={{ borderRadius: 20, overflow: "hidden" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              padding: "10px 24px",
              borderBottom: "1px solid var(--color-border)",
              background: "rgba(136,206,17,0.04)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 700,
                color: "#10b981",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              ✓ Usamos
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 700,
                color: "#e11d48",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              ✗ Evitamos
            </div>
          </div>
          {VOCABULARY.map((v, i) => (
            <div
              key={v.use}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                padding: "14px 24px",
                borderBottom: i < VOCABULARY.length - 1 ? "1px solid var(--color-border)" : "none",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14 }}>{v.use}</div>
              <div
                style={{
                  fontSize: 14,
                  color: "var(--color-text-muted)",
                  textDecoration: "line-through",
                  textDecorationColor: "rgba(225,29,72,0.3)",
                }}
              >
                {v.avoid}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
