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

export default function PageHeadersPage() {
  return (
    <PageLayout
      title="Page Headers"
      accentWord="Page Headers"
      subtitle="Cabeçalhos de página estabelecem contexto e hierarquia. 4 variantes — simples, com breadcrumb, com ações e com tabs."
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Organisms", href: "/components/organisms/tables" },
        { label: "Page Headers" },
      ]}
      badge="ORGANISM"
    >
      {/* Simple */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Simples" desc="Título + subtítulo — hierarquia mínima." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "32px 36px", borderBottom: "1px solid var(--color-border)" }}>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, letterSpacing: -1 }}>Dashboard</h1>
            <p style={{ margin: "6px 0 0", fontSize: 15, color: "var(--color-text-secondary)" }}>Visão geral das métricas e projetos ativos.</p>
          </div>
          <div style={{ padding: "16px 36px", background: "rgba(255,255,255,0.01)" }}>
            <code style={{ fontSize: 12, color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}>Variante: simple</code>
          </div>
        </div>
      </section>

      {/* With breadcrumb */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Com Breadcrumb" desc="Navegação hierárquica acima do título." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "32px 36px", borderBottom: "1px solid var(--color-border)" }}>
            <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              {["Configurações", "Equipe", "Permissões"].map((item, i) => (
                <span key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {i > 0 && <span style={{ color: "var(--color-text-muted)", fontSize: 12 }}>›</span>}
                  <span style={{
                    fontSize: 13, fontWeight: 500,
                    color: i === 2 ? "var(--color-text)" : "var(--color-text-muted)",
                    cursor: i < 2 ? "pointer" : "default",
                    fontWeight: i === 2 ? 700 : 400,
                  }}>{item}</span>
                </span>
              ))}
            </nav>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>Permissões</h1>
            <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--color-text-secondary)" }}>Gerencie o que cada membro da equipe pode ver e fazer.</p>
          </div>
          <div style={{ padding: "16px 36px", background: "rgba(255,255,255,0.01)" }}>
            <code style={{ fontSize: 12, color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}>Variante: with-breadcrumb</code>
          </div>
        </div>
      </section>

      {/* With actions */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Com Ações" desc="Botões de ação à direita — padrão CRUD." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "24px 36px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
            <div>
              <nav style={{ display: "flex", gap: 6, marginBottom: 10, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>Projetos</span>
                <span style={{ color: "var(--color-text-muted)", fontSize: 11 }}>›</span>
                <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>GAMA DS</span>
              </nav>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>GAMA Design System</h1>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
                <span className="pill pill-green">Ativo</span>
                <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>Atualizado hoje</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexShrink: 0, marginTop: 4 }}>
              <button className="btn btn-ghost btn-sm">⚙️ Config</button>
              <button className="btn btn-secondary btn-sm">📤 Exportar</button>
              <button className="btn btn-primary btn-sm">+ Nova versão</button>
            </div>
          </div>
          <div style={{ padding: "16px 36px", background: "rgba(255,255,255,0.01)" }}>
            <code style={{ fontSize: 12, color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}>Variante: with-actions</code>
          </div>
        </div>
      </section>

      {/* With tabs */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Com Tabs" desc="Header com navegação por abas — padrão para páginas com seções." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "24px 36px 0", borderBottom: "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, marginBottom: 20 }}>
              <div>
                <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>Componentes</h1>
                <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)" }}>Biblioteca completa de átomos, moléculas e organismos.</p>
              </div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 4 }}>+ Novo componente</button>
            </div>
            <nav style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--color-border)", marginLeft: -36, marginRight: -36, paddingLeft: 36 }}>
              {[
                { label: "Todos", count: 48, active: true },
                { label: "Átomos", count: 18 },
                { label: "Moléculas", count: 12 },
                { label: "Organismos", count: 8 },
                { label: "Templates", count: 10 },
              ].map((tab) => (
                <div key={tab.label} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "12px 20px", cursor: "pointer",
                  borderBottom: tab.active ? "2px solid var(--color-primary)" : "2px solid transparent",
                  marginBottom: -1,
                  color: tab.active ? "var(--color-primary)" : "var(--color-text-muted)",
                  fontWeight: tab.active ? 700 : 400, fontSize: 14,
                  transition: "color 0.15s",
                }}>
                  {tab.label}
                  <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 999, background: tab.active ? "var(--color-primary-dim)" : "rgba(255,255,255,0.06)", color: tab.active ? "var(--color-primary)" : "var(--color-text-muted)", fontWeight: 600 }}>
                    {tab.count}
                  </span>
                </div>
              ))}
            </nav>
          </div>
          <div style={{ padding: "16px 36px", background: "rgba(255,255,255,0.01)" }}>
            <code style={{ fontSize: 12, color: "var(--color-primary)", fontFamily: "var(--font-mono)" }}>Variante: with-tabs</code>
          </div>
        </div>
      </section>

      {/* Minimal hero */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Hero Compacto" desc="Para páginas internas com gradiente decorativo." />
        <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--color-border)" }}>
          <div style={{ padding: "48px 48px 40px", background: "linear-gradient(135deg, var(--color-primary-dim) 0%, var(--glass-bg) 60%)", position: "relative" }}>
            <div className="bg-blob bg-blob-1" style={{ opacity: 0.3 }} />
            <span className="pill pill-green" style={{ marginBottom: 16, display: "inline-flex" }}>ATOM</span>
            <h1 style={{ margin: "0 0 10px", fontSize: 36, fontWeight: 900, letterSpacing: -1 }}>
              <span className="gradient-text">Buttons</span>
            </h1>
            <p style={{ margin: "0 0 24px", fontSize: 16, color: "var(--color-text-secondary)", maxWidth: 560, lineHeight: 1.7 }}>
              Botões são a unidade de ação do sistema. 5 variantes, 3 tamanhos, todos os estados.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-primary">Ver exemplos</button>
              <button className="btn btn-ghost">Código fonte</button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
