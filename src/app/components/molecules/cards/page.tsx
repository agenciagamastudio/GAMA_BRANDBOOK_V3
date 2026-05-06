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

const CODE = `{/* Glass Card */}
<div className="glass-card" style={{ padding: 24 }}>
  <h3>Título</h3>
  <p>Conteúdo do card</p>
</div>

{/* Illuminated */}
<div className="glass-illuminated" style={{ padding: 24 }}>...</div>

{/* Subtle */}
<div className="glass-subtle" style={{ padding: 24 }}>...</div>`;

const METRICS = [
  { label: "Receita Mensal", value: "R$ 48.290", change: "+12.5%", positive: true, icon: "💰" },
  { label: "Usuários Ativos", value: "2.847", change: "+8.3%", positive: true, icon: "👥" },
  { label: "Taxa de Conversão", value: "3.24%", change: "-0.8%", positive: false, icon: "📈" },
  { label: "Ticket Médio", value: "R$ 169,40", change: "+5.1%", positive: true, icon: "🎫" },
];

export default function CardsPage() {
  return (
    <PageLayout
      title="Cards"
      accentWord="Cards"
      subtitle="Cards são contêineres de conteúdo com 3 variantes de glass: padrão, illuminated e subtle. Adaptáveis a qualquer conteúdo."
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Molecules", href: "/components/molecules/cards" },
        { label: "Cards" },
      ]}
      badge="MOLECULE"
    >
      {/* Glass variants */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Variantes Glass" desc="3 níveis de intensidade para diferentes hierarquias visuais." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <div className="glass-card" style={{ padding: 28 }}>
            <p style={{ margin: "0 0 8px", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--color-primary)", fontWeight: 700 }}>glass-card</p>
            <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700 }}>Padrão</h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              Card base do sistema. Use para conteúdo regular — features, listas, formulários.
            </p>
          </div>
          <div className="glass-illuminated" style={{ padding: 28 }}>
            <p style={{ margin: "0 0 8px", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--color-primary)", fontWeight: 700 }}>glass-illuminated</p>
            <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700 }}>Iluminado</h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              Card com brilho verde sutil. Use para destacar ações principais ou conteúdo featured.
            </p>
          </div>
          <div className="glass-subtle" style={{ padding: 28 }}>
            <p style={{ margin: "0 0 8px", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--color-primary)", fontWeight: 700 }}>glass-subtle</p>
            <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700 }}>Sutil</h3>
            <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              Card com menor contraste. Use para conteúdo secundário ou informações de suporte.
            </p>
          </div>
        </div>
        <div className="code-block" style={{ marginTop: 16 }}>
          <pre style={{ margin: 0, fontSize: 13 }}>{CODE}</pre>
        </div>
      </section>

      {/* Header/Body/Footer */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Estrutura Header / Body / Footer" desc="Layout de 3 zonas para cards complexos com ações." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[1, 2].map((i) => (
            <div key={i} className="glass-card" style={{ padding: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Relatório {i === 1 ? "Semanal" : "Mensal"}</h3>
                  <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-muted)" }}>Atualizado {i === 1 ? "hoje" : "há 3 dias"}</p>
                </div>
                <span className="pill pill-green">Novo</span>
              </div>
              <div style={{ padding: "20px 24px", flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                  {i === 1
                    ? "Métricas principais da semana: 847 novos usuários, R$ 12.430 em receita, 94% de uptime."
                    : "Comparativo mensal mostra crescimento de 18% em usuários ativos e aumento de 12% na receita recorrente."}
                </p>
              </div>
              <div style={{ padding: "16px 24px", borderTop: "1px solid var(--color-border)", display: "flex", gap: 10 }}>
                <button className="btn btn-primary btn-sm">Ver detalhes</button>
                <button className="btn btn-ghost btn-sm">Exportar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Metric cards */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Metric Cards" desc="Cards de métricas para dashboards — número grande + variação." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {METRICS.map((m) => (
            <div key={m.label} className="glass-card" style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.5 }}>{m.label}</span>
                <span style={{ fontSize: 20 }}>{m.icon}</span>
              </div>
              <p style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 800, letterSpacing: -1 }}>{m.value}</p>
              <span style={{ fontSize: 12, fontWeight: 600, color: m.positive ? "var(--color-success)" : "var(--color-error)" }}>
                {m.change} vs mês anterior
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal card */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Card Horizontal" desc="Imagem à esquerda, conteúdo à direita — ideal para listas de artigos." />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { title: "Como construir um Design System escalável", date: "5 Mai 2026", tag: "Design", read: "8 min" },
            { title: "Tokens de design: a base de tudo", date: "3 Mai 2026", tag: "Tokens", read: "5 min" },
            { title: "Dark mode sem dor: estratégias com CSS vars", date: "1 Mai 2026", tag: "CSS", read: "12 min" },
          ].map((art) => (
            <div key={art.title} className="glass-card" style={{ padding: 0, display: "flex", overflow: "hidden" }}>
              <div style={{ width: 120, flexShrink: 0, background: "var(--color-primary-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 36 }}>📄</span>
              </div>
              <div style={{ padding: 20, flex: 1 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span className="pill pill-green" style={{ fontSize: 10 }}>{art.tag}</span>
                  <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{art.read} de leitura</span>
                </div>
                <h4 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700 }}>{art.title}</h4>
                <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-muted)" }}>{art.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Feature Cards" desc="Cards de funcionalidades para landing pages e páginas de produto." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: "⚡", title: "Performance", desc: "Zero-runtime tokens compilados em CSS nativo. Sem overhead de JS." },
            { icon: "🎨", title: "Customizável", desc: "CSS vars permitem theming completo sem modificar componentes." },
            { icon: "♿", title: "Acessível", desc: "WCAG AA out of the box — contraste, foco, ARIA nativos." },
            { icon: "📱", title: "Responsivo", desc: "Mobile-first design com breakpoints sistemáticos." },
            { icon: "🌙", title: "Dark Mode", desc: "Dark theme nativo com suporte a preferência do sistema." },
            { icon: "🔧", title: "Developer DX", desc: "API simples, tipagem TypeScript, documentação inline." },
          ].map((f) => (
            <div key={f.title} className="glass-card" style={{ padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h4 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 700 }}>{f.title}</h4>
              <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
