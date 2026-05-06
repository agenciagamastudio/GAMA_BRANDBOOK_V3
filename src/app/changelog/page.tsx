import PageLayout from "@/components/layout/PageLayout";

function SectionHeader({ number, title, desc }: { number: string; title: string; desc?: string }) {
  return (
    <header style={{ marginBottom: 24 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-primary)", fontWeight: 700, letterSpacing: 0.2 }}>── {number}</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 8px", letterSpacing: -0.5 }}>{title}</h2>
      {desc && <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: 14, maxWidth: 720 }}>{desc}</p>}
    </header>
  );
}

function ChangeEntry({ version, date, type, items, highlight }: {
  version: string; date: string; type: "major" | "minor" | "patch"; items: { cat: string; text: string }[]; highlight?: boolean;
}) {
  const typeColors = {
    major: { color: "var(--color-primary)", label: "MAJOR" },
    minor: { color: "var(--color-info)", label: "MINOR" },
    patch: { color: "var(--color-success)", label: "PATCH" },
  };
  const tc = typeColors[type];

  const catIcons: Record<string, string> = {
    "feat": "✨",
    "fix": "🐛",
    "breaking": "⚠️",
    "perf": "⚡",
    "docs": "📚",
    "refactor": "♻️",
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, marginBottom: 48 }}>
      <div style={{ paddingTop: 4 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 900, letterSpacing: -1, color: highlight ? "var(--color-primary)" : "var(--color-text)" }}>{version}</div>
        <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 4 }}>{date}</div>
        <span style={{ marginTop: 8, display: "inline-flex", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 4, background: `${tc.color}18`, color: tc.color, border: `1px solid ${tc.color}30` }}>
          {tc.label}
        </span>
      </div>
      <div className={highlight ? "glass-illuminated" : "glass-card"} style={{ padding: 24 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, paddingBottom: 12, marginBottom: 12, borderBottom: i < items.length - 1 ? "1px solid var(--color-border)" : "none" }}>
            <span style={{ fontSize: 16, flexShrink: 0, width: 24 }}>{catIcons[item.cat] ?? "•"}</span>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 3, background: "rgba(255,255,255,0.06)", color: "var(--color-text-muted)", marginRight: 8 }}>{item.cat}</span>
              <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{item.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <PageLayout
      title="Changelog"
      accentWord="Changelog"
      subtitle="Histórico completo de versões do GAMA Design System. Todas as adições, correções e breaking changes documentadas."
      breadcrumb={[{ label: "Changelog" }]}
      badge="REFERENCE"
    >
      {/* Current version */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Versões" />

        <ChangeEntry
          version="v3.0.0"
          date="6 de Maio, 2026"
          type="major"
          highlight
          items={[
            { cat: "feat", text: "Novo sistema de Liquid Glass com efeitos volumétricos e backdrop-blur nativo" },
            { cat: "feat", text: "48+ componentes documentados: átomos, moléculas, organismos e templates" },
            { cat: "feat", text: "Design tokens completos: cores, tipografia, espaçamento, raios e sombras" },
            { cat: "feat", text: "Dark mode nativo com CSS vars — zero JS no theme switching" },
            { cat: "feat", text: "Sidebar responsiva com 6 seções: Foundations, Components, Templates, Tokens, Settings, Changelog" },
            { cat: "feat", text: "ThemeProvider e LanguageProvider com suporte a PT/EN" },
            { cat: "feat", text: "Classes utilitárias: .glass, .glass-card, .glass-illuminated, .glass-subtle, .liquid-edge" },
            { cat: "feat", text: "Classes de animação: .fade-up, .page-enter, .glow-green, .gradient-text-animated" },
            { cat: "feat", text: "PageLayout component com breadcrumb, badge e accentWord" },
            { cat: "perf", text: "Performance 40% melhor vs V2 — zero runtime CSS-in-JS, tokens compilados" },
            { cat: "breaking", text: "API dos componentes V2 não é compatível — veja guia de migração abaixo" },
          ]}
        />

        <ChangeEntry
          version="v2.5.0"
          date="10 de Janeiro, 2026"
          type="minor"
          items={[
            { cat: "feat", text: "Adicionado suporte a temas por projeto (light/dark por instância)" },
            { cat: "feat", text: "Novos componentes: DataTable, CommandPalette, MultiSelect" },
            { cat: "fix", text: "Corrigido bug de contraste em badges no modo claro" },
            { cat: "fix", text: "Acessibilidade: foco visível em todos componentes interativos" },
            { cat: "docs", text: "Documentação reescrita com exemplos interativos" },
          ]}
        />

        <ChangeEntry
          version="v2.4.1"
          date="15 de Outubro, 2025"
          type="patch"
          items={[
            { cat: "fix", text: "Corrigido vazamento de CSS em componentes de formulário" },
            { cat: "fix", text: "Tooltip em Safari — posição incorreta em elementos fixed" },
            { cat: "fix", text: "Z-index conflict entre Modal e Dropdown sobrepostos" },
            { cat: "perf", text: "Tree-shaking melhorado — bundle 15% menor" },
          ]}
        />

        <ChangeEntry
          version="v2.0.0"
          date="3 de Março, 2025"
          type="major"
          items={[
            { cat: "feat", text: "Primeira versão pública com design system completo" },
            { cat: "feat", text: "30 componentes base + tokens de cor e tipografia" },
            { cat: "feat", text: "Suporte inicial a dark mode com classe .dark" },
            { cat: "breaking", text: "Migração de CSS modules para CSS custom properties" },
          ]}
        />
      </section>

      {/* Migration guide */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Migração V2 → V3" desc="O que mudou e como atualizar seu projeto." />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            {
              title: "CSS Variables renomeadas",
              before: "--ds-color-brand → --color-primary\n--ds-bg-dark → --color-surface\n--ds-text-light → --color-text",
              after: "Use find-replace para atualizar todas as referências de uma vez.",
            },
            {
              title: "Classes de componente removidas",
              before: ".ds-button-primary → .btn .btn-primary\n.ds-card → .glass-card\n.ds-pill → .pill",
              after: "Classes mais curtas e composição mais flexível.",
            },
            {
              title: "PageLayout — nova prop required",
              before: "<PageLayout title='...' /> // V2",
              after: "<PageLayout title='...' accentWord='...' /> // V3 — accentWord é obrigatório",
            },
          ].map((guide) => (
            <div key={guide.title} className="glass-card" style={{ padding: 24 }}>
              <h4 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>{guide.title}</h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--color-error)", fontWeight: 600 }}>Antes (V2)</p>
                  <div className="code-block"><pre style={{ margin: 0, fontSize: 12 }}>{guide.before}</pre></div>
                </div>
                <div>
                  <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--color-success)", fontWeight: 600 }}>Depois (V3)</p>
                  <div className="code-block"><pre style={{ margin: 0, fontSize: 12 }}>{guide.after}</pre></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Roadmap V3.1" desc="Próximas funcionalidades planejadas." />
        <div className="glass-card" style={{ padding: 24 }}>
          {[
            { status: "🔨", label: "Em desenvolvimento", items: ["CommandPalette component", "Date picker com range", "Drag-and-drop primitives"] },
            { status: "📋", label: "Planejado", items: ["Light mode completo", "Charts library (D3.js integration)", "Motion/animation system"] },
            { status: "💡", label: "Em consideração", items: ["Figma plugin para sync de tokens", "CSS-only animation kit", "Print stylesheet"] },
          ].map((section) => (
            <div key={section.label} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid var(--color-border)" }}>
              <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 14 }}>{section.status} {section.label}</p>
              <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
                {section.items.map((item) => (
                  <li key={item} style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
