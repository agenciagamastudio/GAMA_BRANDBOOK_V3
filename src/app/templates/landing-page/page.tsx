import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

const FEATURES = [
  { icon: "◆", title: "Hero Section", desc: "Headline de impacto, subheadline e CTA duplo. Partículas e efeitos volumétricos no fundo." },
  { icon: "▣", title: "Features Grid", desc: "6 cards em grid com ícones, título e descrição. Stagger de animação configurado." },
  { icon: "◐", title: "Social Proof", desc: "Depoimentos em carrossel com foto, nome e cargo. Logos de clientes embaixo." },
  { icon: "✦", title: "Pricing Table", desc: "3 planos com features comparadas. Plano destacado com glass-illuminated." },
  { icon: "◇", title: "FAQ Accordion", desc: "Perguntas frequentes com abertura suave. Reduz objeções antes do CTA final." },
  { icon: "→", title: "CTA Final", desc: "Seção de fechamento com urgência, benefício e botão primário com glow verde." },
];

const TESTIMONIALS = [
  { text: "Reduziu nosso tempo de desenvolvimento em 60%. Os tokens são perfeitos.", author: "Marina Silva", role: "Head of Design, Finteck" },
  { text: "O sistema glass funciona perfeitamente em dark e light. Zero retrabalho.", author: "Pedro Alves", role: "CTO, SaaS Co." },
  { text: "Templates prontos economizaram 3 semanas de trabalho do nosso time.", author: "Julia Santos", role: "Product Manager" },
];

export default function LandingPageTemplatePage() {
  return (
    <PageLayout
      title="Landing Page"
      accentWord="Landing"
      subtitle="Template de alta conversão — hero, features, depoimentos, pricing e CTA. Pronto para lançamentos."
      breadcrumb={[
        { label: "Templates", href: "/templates" },
        { label: "Landing Page" },
      ]}
      badge="V3 · TEMPLATE"
    >
      {/* Hero preview */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 16 }}>
          <span className="pill pill-green">HERO</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "8px 0 4px", letterSpacing: -0.3 }}>
            Seção principal
          </h2>
        </div>
        <div
          style={{
            borderRadius: 24,
            overflow: "hidden",
            border: "1px solid var(--color-border)",
            background:
              "linear-gradient(135deg, rgba(136,206,17,0.06) 0%, rgba(22,22,22,0.9) 50%, rgba(136,206,17,0.04) 100%)",
            padding: "56px 40px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            className="bg-blob bg-blob-1"
            style={{ width: 300, height: 300, top: -60, right: -40, opacity: 0.25 }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="pill pill-green fade-up fade-up-1" style={{ marginBottom: 16, display: "inline-block" }}>
              Lançamento · 2026
            </span>
            <h1
              style={{
                fontSize: 56,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: -2,
                margin: "0 0 16px",
              }}
            >
              Headline de{" "}
              <span className="gradient-text-animated">Impacto</span>
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "var(--color-text-secondary)",
                maxWidth: 520,
                margin: "0 auto 32px",
                lineHeight: 1.65,
              }}
            >
              Subheadline clara e direta que reforça o benefício principal em uma frase.
              Foco no resultado, não na feature.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <button className="btn btn-primary btn-lg glow-green" style={{ cursor: "default" }}>
                Começar agora →
              </button>
              <button className="btn btn-secondary btn-lg" style={{ cursor: "default" }}>
                Ver demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <span className="pill pill-blue">FEATURES</span>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: "10px 0 8px", letterSpacing: -0.5 }}>
            O que você{" "}
            <span className="gradient-text">ganha</span>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="glass-illuminated"
              style={{ padding: "22px 24px", borderRadius: 18 }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 11,
                  background: "var(--color-primary-dim)",
                  border: "1px solid var(--color-border-green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: "var(--color-primary)",
                  fontWeight: 900,
                  marginBottom: 14,
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 6px" }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 20 }}>
          <span className="pill pill-muted">DEPOIMENTOS</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "8px 0 4px", letterSpacing: -0.3 }}>
            O que dizem os clientes
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="glass-card"
              style={{ padding: "24px 22px", borderRadius: 18 }}
            >
              <div
                style={{
                  fontSize: 28,
                  color: "var(--color-primary)",
                  lineHeight: 1,
                  marginBottom: 12,
                  fontWeight: 900,
                }}
              >
                "
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                  margin: "0 0 16px",
                  fontStyle: "italic",
                }}
              >
                {t.text}
              </p>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{t.author}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final preview */}
      <section style={{ marginBottom: 32 }}>
        <div
          className="glass-illuminated volumetric-glow liquid-edge"
          style={{ padding: "48px 40px", borderRadius: 24, textAlign: "center" }}
        >
          <h2
            style={{
              fontSize: 40,
              fontWeight: 900,
              margin: "0 0 12px",
              letterSpacing: -1.2,
              lineHeight: 1.1,
            }}
          >
            Pronto para{" "}
            <span className="gradient-text-animated">começar?</span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--color-text-secondary)",
              maxWidth: 480,
              margin: "0 auto 28px",
              lineHeight: 1.65,
            }}
          >
            CTA de fechamento com urgência. Reforça o benefício principal em uma frase.
          </p>
          <button className="btn btn-primary btn-lg glow-green" style={{ cursor: "default" }}>
            Começar grátis — sem cartão →
          </button>
        </div>
      </section>

      <Link href="/templates" className="btn btn-ghost btn-sm" style={{ display: "inline-flex" }}>
        ← Voltar aos Templates
      </Link>
    </PageLayout>
  );
}
