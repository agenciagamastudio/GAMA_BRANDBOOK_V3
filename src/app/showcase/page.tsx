import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

const SHOWCASE_ITEMS = [
  {
    title: "Aplicações Web",
    desc: "Dashboards, portais e SaaS construídos com o GAMA DS V3.",
    href: "/showcase/applications",
    icon: "▣",
    pill: "Apps",
    pillCls: "pill-blue",
    count: "Em breve",
  },
  {
    title: "Componentes Isolados",
    desc: "Galeria interativa de todos os átomos, moléculas e organismos do Design System.",
    href: "/components/atoms/buttons",
    icon: "◆",
    pill: "21+ itens",
    pillCls: "pill-green",
    count: "21+",
  },
  {
    title: "Templates",
    desc: "Layouts prontos para landing pages, dashboards, clínicas e agências.",
    href: "/templates",
    icon: "◇",
    pill: "4 Templates",
    pillCls: "pill-green",
    count: "4",
  },
  {
    title: "Efeitos Glass",
    desc: "Liquid Glass, volumetric lighting e animações — ao vivo no browser.",
    href: "/foundations/effects",
    icon: "◐",
    pill: "Interativo",
    pillCls: "pill-muted",
    count: "5+",
  },
];

const STATS = [
  { v: "21+", l: "Componentes" },
  { v: "5", l: "Glass Variants" },
  { v: "4", l: "Templates" },
  { v: "Dark + Light", l: "Temas" },
];

export default function ShowcasePage() {
  return (
    <PageLayout
      title="Showcase"
      accentWord="Showcase"
      subtitle="Galeria completa de projetos, aplicações e exemplos construídos com o GAMA Design System V3."
      breadcrumb={[{ label: "Showcase" }]}
      badge="V3 · GALERIA"
    >
      {/* Stats row */}
      <div
        className="glass-card vol-light"
        style={{
          display: "flex",
          borderRadius: 20,
          overflow: "hidden",
          marginBottom: 48,
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.l}
            style={{
              flex: 1,
              padding: "28px 16px",
              textAlign: "center",
              borderRight:
                i < STATS.length - 1 ? "1px solid var(--color-border)" : "none",
            }}
          >
            <div
              className="gradient-text"
              style={{
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: -1,
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              {s.v}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: 0.8,
                fontWeight: 700,
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>

      {/* Showcase grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          marginBottom: 48,
        }}
      >
        {SHOWCASE_ITEMS.map((item) => (
          <Link href={item.href} key={item.title} style={{ textDecoration: "none" }}>
            <div
              className="glass-illuminated liquid-edge"
              style={{
                padding: 32,
                borderRadius: 20,
                minHeight: 200,
                cursor: "pointer",
                transition: "all 300ms ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: "var(--color-primary-dim)",
                    border: "1px solid var(--color-border-green)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    color: "var(--color-primary)",
                    fontWeight: 900,
                  }}
                >
                  {item.icon}
                </div>
                <span className={`pill ${item.pillCls}`} style={{ fontSize: 11 }}>
                  {item.pill}
                </span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 10px" }}>{item.title}</h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                  margin: "0 0 20px",
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>
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
                Explorar →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div
        className="glass-card"
        style={{
          padding: "32px 40px",
          borderRadius: 20,
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(136,206,17,0.06) 0%, rgba(39,39,39,0.5) 50%, rgba(136,206,17,0.04) 100%)",
          border: "1px solid rgba(136,206,17,0.12)",
        }}
      >
        <span className="pill pill-green" style={{ marginBottom: 16, display: "inline-block" }}>
          GAMA DS V3
        </span>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 900,
            margin: "0 0 12px",
            letterSpacing: -1,
          }}
        >
          Pronto para{" "}
          <span className="gradient-text">construir?</span>
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "var(--color-text-secondary)",
            maxWidth: 560,
            margin: "0 auto 28px",
            lineHeight: 1.65,
          }}
        >
          Explore os componentes individuais ou use um template pronto como base do seu próximo projeto.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          <Link href="/components/atoms/buttons" className="btn btn-primary glow-green">
            Ver Componentes →
          </Link>
          <Link href="/templates" className="btn btn-secondary">
            Ver Templates
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
