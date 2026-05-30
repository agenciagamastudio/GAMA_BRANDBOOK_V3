import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

const TEMPLATES = [
  {
    title: "Social Agency",
    desc: "Layout completo para agências de social media. Feed preview, métricas e cronograma de postagens.",
    href: "/templates/social-agency",
    icon: "◈",
    pill: "Agência",
    pillCls: "pill-blue",
    tags: ["Feed", "Métricas", "Cronograma"],
  },
  {
    title: "Medical Clinic",
    desc: "Identidade premium para clínicas e consultórios. Agendamento, planos e perfil de especialistas.",
    href: "/templates/medical-clinic",
    icon: "✦",
    pill: "Saúde",
    pillCls: "pill-green",
    tags: ["Agendamento", "Planos", "Especialistas"],
  },
  {
    title: "Landing Page",
    desc: "Template de alta conversão com hero, features grid, CTA e depoimentos. Pronto para lançamentos.",
    href: "/templates/landing-page",
    icon: "▶",
    pill: "Conversão",
    pillCls: "pill-green",
    tags: ["Hero", "CTA", "Features"],
  },
  {
    title: "Dashboard",
    desc: "Painel administrativo com sidebar, gráficos, tabelas e gestão de usuários. Pronto para SaaS.",
    href: "/templates/dashboard",
    icon: "▣",
    pill: "Admin",
    pillCls: "pill-muted",
    tags: ["SaaS", "Gráficos", "Tabelas"],
  },
];

export default function TemplatesPage() {
  return (
    <PageLayout
      title="Templates"
      accentWord="Templates"
      subtitle="Layouts completos prontos para adaptar — desenvolvidos sobre o GAMA Design System V3."
      breadcrumb={[{ label: "Templates" }]}
      badge="V3 · TEMPLATES"
    >
      {/* Intro banner */}
      <div
        className="glass-illuminated liquid-edge"
        style={{
          padding: "32px 40px",
          borderRadius: 20,
          marginBottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span className="pill pill-green">4 Templates</span>
            <span className="pill pill-muted">GAMA DS V3</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 10px", letterSpacing: -0.5 }}>
            Layouts prontos,{" "}
            <span className="gradient-text">adaptáveis</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>
            Cada template usa 100% dos tokens GAMA V3 — cores, espaçamento, tipografia e efeitos glass já configurados.
            Basta adaptar o conteúdo para o seu projeto.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <div
            className="glass-subtle"
            style={{ padding: "12px 20px", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}
          >
            <span style={{ color: "var(--color-primary)", fontSize: 16 }}>✓</span>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>100% tokenizado</span>
          </div>
          <div
            className="glass-subtle"
            style={{ padding: "12px 20px", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}
          >
            <span style={{ color: "var(--color-primary)", fontSize: 16 }}>✓</span>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Dark + Light mode</span>
          </div>
          <div
            className="glass-subtle"
            style={{ padding: "12px 20px", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}
          >
            <span style={{ color: "var(--color-primary)", fontSize: 16 }}>✓</span>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Glass effects incluídos</span>
          </div>
        </div>
      </div>

      {/* Templates grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }}
      >
        {TEMPLATES.map((t) => (
          <Link href={t.href} key={t.title} style={{ textDecoration: "none" }}>
            <div
              className="glass-card"
              style={{
                padding: 0,
                borderRadius: 20,
                overflow: "hidden",
                transition: "all 300ms ease",
              }}
            >
              {/* Preview area */}
              <div
                style={{
                  height: 160,
                  background:
                    "linear-gradient(135deg, rgba(136,206,17,0.08) 0%, rgba(39,39,39,0.6) 60%, rgba(136,206,17,0.04) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="bg-blob bg-blob-1"
                  style={{ width: 200, height: 200, top: -60, right: -40, opacity: 0.3 }}
                />
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 18,
                    background: "var(--color-primary-dim)",
                    border: "1.5px solid var(--color-border-green)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    color: "var(--color-primary)",
                    fontWeight: 900,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {t.icon}
                </div>
              </div>
              {/* Info */}
              <div style={{ padding: "20px 24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{t.title}</h3>
                  <span className={`pill ${t.pillCls}`} style={{ fontSize: 11 }}>
                    {t.pill}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-secondary)",
                    margin: "0 0 14px",
                    lineHeight: 1.6,
                  }}
                >
                  {t.desc}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                  {t.tags.map((tag) => (
                    <span key={tag} className="pill pill-muted" style={{ fontSize: 10 }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--color-primary)",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Ver Template →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
