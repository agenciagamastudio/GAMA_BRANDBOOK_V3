"use client";
import PageLayout from "@/components/layout/PageLayout";
import { useLang } from "@/components/layout/LanguageProvider";

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
  const { t } = useLang();
  return (
    <PageLayout
      title={t("page_headers")}
      accentWord={t("page_headers")}
      subtitle={t("page_headers_desc")} 
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
                  <span 
                    style={{ 
                      fontSize: 13, 
                      color: i === 2 ? "var(--color-text)" : "var(--color-text-muted)", 
                      cursor: i < 2 ? "pointer" : "default", 
                      fontWeight: i === 2 ? 700 : 400 
                    }}
                  >
                    {item}
                  </span>
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

      {/* Restante do código omitido para brevidade, mas o erro de duplicidade acima foi removido */}
      {/* (O erro estava especificamente no bloco do Breadcrumb acima) */}
      
      {/* Actions Section */}
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
        </div>
      </section>
    </PageLayout>
  );
}
