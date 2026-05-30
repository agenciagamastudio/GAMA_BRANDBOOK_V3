import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

const APPS = [
  {
    title: "GAMA Orçamento",
    desc: "Sistema de orçamentação com catálogo de serviços, precificação dinâmica e exportação A4.",
    tags: ["Next.js", "TypeScript", "GAMA DS"],
    status: "Produção",
    statusCls: "pill-green",
    icon: "◆",
  },
  {
    title: "GAMA Voz",
    desc: "Plataforma de síntese de voz com Kokoro TTS, transcrição Whisper e audiobook generator.",
    tags: ["FastAPI", "React", "TTS"],
    status: "Produção",
    statusCls: "pill-green",
    icon: "▶",
  },
  {
    title: "GAMA Monitor",
    desc: "Dashboard de monitoramento de pipelines AIOS com WebSocket e visualização em tempo real.",
    tags: ["Streamlit", "Python", "WebSocket"],
    status: "Beta",
    statusCls: "pill-blue",
    icon: "▣",
  },
  {
    title: "GAMA Studio Site",
    desc: "Site institucional da GAMA Studio com páginas /solucoes, /metodo, /contato e painel admin.",
    tags: ["Next.js", "GAMA DS", "i18n"],
    status: "Em desenvolvimento",
    statusCls: "pill-muted",
    icon: "◇",
  },
];

const TECH_STACK = [
  { label: "Next.js 15", desc: "App Router + RSC" },
  { label: "TypeScript 5.6", desc: "100% tipado" },
  { label: "Tailwind 3.4", desc: "+ CSS Tokens" },
  { label: "Poppins / JetBrains Mono", desc: "Tipografia GAMA" },
];

export default function ShowcaseApplicationsPage() {
  return (
    <PageLayout
      title="Aplicações"
      accentWord="Aplicações"
      subtitle="Projetos reais construídos com o GAMA Design System V3 — do MVP ao produto em produção."
      breadcrumb={[
        { label: "Showcase", href: "/showcase" },
        { label: "Applications" },
      ]}
      badge="V3 · APPS"
    >
      {/* Apps grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          marginBottom: 48,
        }}
      >
        {APPS.map((app) => (
          <div
            key={app.title}
            className="glass-illuminated liquid-edge"
            style={{ padding: 28, borderRadius: 20 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
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
                  color: "var(--color-primary)",
                  fontWeight: 900,
                }}
              >
                {app.icon}
              </div>
              <span className={`pill ${app.statusCls}`} style={{ fontSize: 11 }}>
                {app.status}
              </span>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 8px" }}>{app.title}</h3>
            <p
              style={{
                fontSize: 13,
                color: "var(--color-text-secondary)",
                margin: "0 0 20px",
                lineHeight: 1.6,
              }}
            >
              {app.desc}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {app.tags.map((tag) => (
                <span
                  key={tag}
                  className="pill pill-muted"
                  style={{ fontSize: 10 }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tech stack used */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 24 }}>
          <span className="pill pill-green" style={{ marginBottom: 10, display: "inline-block" }}>
            STACK
          </span>
          <h2 style={{ fontSize: 32, fontWeight: 900, margin: "8px 0 8px", letterSpacing: -0.8 }}>
            Tecnologias{" "}
            <span className="gradient-text">utilizadas</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>
            O GAMA DS V3 foi construído e validado sobre esse stack de produção.
          </p>
        </div>

        <div
          className="glass-card vol-light"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {TECH_STACK.map((t, i) => (
            <div
              key={t.label}
              style={{
                padding: "24px 20px",
                textAlign: "center",
                borderRight:
                  i < TECH_STACK.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <div
                className="gradient-text"
                style={{ fontSize: 15, fontWeight: 800, marginBottom: 6 }}
              >
                {t.label}
              </div>
              <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Back link */}
      <Link
        href="/showcase"
        className="btn btn-ghost btn-sm"
        style={{ display: "inline-flex" }}
      >
        ← Voltar ao Showcase
      </Link>
    </PageLayout>
  );
}
