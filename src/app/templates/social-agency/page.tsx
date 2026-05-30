import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

const METRICS = [
  { v: "12.4K", l: "Seguidores", delta: "+8.2%", up: true },
  { v: "4.7%", l: "Engajamento", delta: "+1.3%", up: true },
  { v: "38", l: "Posts/mês", delta: "-2", up: false },
  { v: "R$ 4.200", l: "Alcance pago", delta: "+24%", up: true },
];

const FEED_POSTS = [
  { type: "Carrossel", date: "Seg 09h", tag: "Educativo", cls: "pill-blue" },
  { type: "Reels", date: "Qua 18h", tag: "Entretenimento", cls: "pill-green" },
  { type: "Story", date: "Sex 12h", tag: "Institucional", cls: "pill-muted" },
  { type: "Carrossel", date: "Sáb 10h", tag: "Produto", cls: "pill-blue" },
  { type: "Reels", date: "Dom 17h", tag: "Tendência", cls: "pill-green" },
  { type: "Post Fixo", date: "Seg 11h", tag: "Campanha", cls: "pill-muted" },
];

const FEATURES = [
  { icon: "◐", title: "Feed Preview", desc: "Visualize como o feed fica antes de publicar." },
  { icon: "◆", title: "Cronograma", desc: "Calendário semanal de postagens com horários." },
  { icon: "▣", title: "Métricas", desc: "Acompanhe engajamento, alcance e crescimento." },
  { icon: "✦", title: "Clientes", desc: "Gerencie múltiplos perfis no mesmo painel." },
];

export default function SocialAgencyTemplatePage() {
  return (
    <PageLayout
      title="Social Agency"
      accentWord="Agency"
      subtitle="Template completo para agências de social media — feed preview, cronograma e métricas em um painel."
      breadcrumb={[
        { label: "Templates", href: "/templates" },
        { label: "Social Agency" },
      ]}
      badge="V3 · TEMPLATE"
    >
      {/* Metrics row */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 16 }}>
          <span className="pill pill-green">MÉTRICAS</span>
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
          {METRICS.map((m, i) => (
            <div
              key={m.l}
              style={{
                padding: "24px 20px",
                textAlign: "center",
                borderRight:
                  i < METRICS.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <div
                className="gradient-text"
                style={{ fontSize: 28, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1, marginBottom: 4 }}
              >
                {m.v}
              </div>
              <div style={{ fontSize: 11, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>
                {m.l}
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: m.up ? "var(--color-success)" : "var(--color-error)",
                  background: m.up ? "rgba(16,185,129,0.1)" : "rgba(225,29,72,0.1)",
                  padding: "2px 8px",
                  borderRadius: 999,
                }}
              >
                {m.delta}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Cronograma semanal preview */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 16 }}>
          <span className="pill pill-blue">CRONOGRAMA</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "8px 0 4px", letterSpacing: -0.3 }}>
            Semana atual
          </h2>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>
            Próximos 6 posts programados
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {FEED_POSTS.map((p, i) => (
            <div
              key={i}
              className="glass-illuminated"
              style={{
                padding: "18px 20px",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{p.type}</div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--color-primary)",
                    fontWeight: 600,
                  }}
                >
                  {p.date}
                </div>
              </div>
              <span className={`pill ${p.cls}`} style={{ fontSize: 10 }}>
                {p.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 20 }}>
          <span className="pill pill-green">FEATURES</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "8px 0 4px", letterSpacing: -0.3 }}>
            O que inclui
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="glass-subtle" style={{ padding: "20px 24px", borderRadius: 16, display: "flex", gap: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--color-primary-dim)",
                  border: "1px solid var(--color-border-green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: "var(--color-primary)",
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link href="/templates" className="btn btn-ghost btn-sm" style={{ display: "inline-flex" }}>
        ← Voltar aos Templates
      </Link>
    </PageLayout>
  );
}
