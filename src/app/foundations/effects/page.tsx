import PageLayout from "@/components/layout/PageLayout";
import ParticleField from "@/components/ui/ParticleField";

const GLASS_VARIANTS = [
  {
    cls: "glass",
    label: ".glass",
    desc: "Base liquid glass — blur 30px, white-tinted border, subtle inset glow.",
  },
  {
    cls: "glass-card",
    label: ".glass-card",
    desc: "Spec brandbook — rgba(255,255,255,0.04), blur 30px, gradient left edge.",
  },
  {
    cls: "glass-intense",
    label: ".glass-intense",
    desc: "Stronger glass — blur 40px, thicker border, green outer glow.",
  },
  {
    cls: "glass-illuminated liquid-edge",
    label: ".glass-illuminated",
    desc: "Animated green illumination pulse + caustic top edge.",
  },
  {
    cls: "glass-subtle",
    label: ".glass-subtle",
    desc: "Light glass — blur 20px, minimal — perfect for inline cards.",
  },
];

const VOLUMETRIC = [
  {
    cls: "volumetric-glow",
    label: ".volumetric-glow",
    desc: "Pulsing radial green light at the center.",
  },
  {
    cls: "vol-light",
    label: ".vol-light",
    desc: "Static radial illumination from corner.",
  },
  {
    cls: "volumetric-rays",
    label: ".volumetric-rays",
    desc: "Conic rays rotating slowly behind content.",
  },
  {
    cls: "glow-green",
    label: ".glow-green",
    desc: "Multi-layer green box-shadow — for buttons & key elements.",
  },
];

const COMBO_CARDS = [
  { classes: "glass-card vol-light", title: "Glass + Vol-Light", body: "Boas para cards de feature." },
  { classes: "glass-illuminated", title: "Glass Illuminated", body: "Para cards de destaque animados." },
  { classes: "glass-intense liquid-edge", title: "Intense + Edge", body: "Para topnav e hero panels." },
  { classes: "glass-card volumetric-glow", title: "Glass + Volumetric Glow", body: "Hero sections premium." },
  { classes: "glass-subtle", title: "Subtle", body: "Para grids densos de informação." },
  { classes: "glass-card glow-green", title: "Glass + Glow Green", body: "CTAs e cards selecionados." },
];

export default function EffectsPage() {
  return (
    <PageLayout
      title="Efeitos & Glass"
      accentWord="Glass"
      subtitle="Sistema de Liquid Glass + Volumetric Lighting do GAMA DS V3. Camadas de profundidade, animação contínua e identidade verde unificada."
      breadcrumb={[
        { label: "Foundations", href: "/foundations/colors" },
        { label: "Effects" },
      ]}
      badge="V3 · LIQUID GLASS"
    >
      {/* SECTION 1 — Particle System */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="01"
          title="Particle System"
          desc="Canvas de partículas verdes flutuando para cima — interação com hover do cursor."
        />
        <ParticleField height={360} />
      </section>

      {/* SECTION 2 — Liquid Glass */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="02"
          title="Liquid Glass — variantes"
          desc="5 níveis de glassmorphism, do mais sutil ao mais intenso."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {GLASS_VARIANTS.map((g) => (
            <div
              key={g.label}
              className={g.cls}
              style={{
                padding: 28,
                borderRadius: 20,
                minHeight: 160,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--color-primary)",
                  marginBottom: 12,
                  fontWeight: 700,
                }}
              >
                {g.label}
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Volumetric */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="03"
          title="Volumetric Lighting"
          desc="Camadas de luz para profundidade e dinamismo."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {VOLUMETRIC.map((v) => (
            <div
              key={v.label}
              className={`${v.cls} glass-card`}
              style={{
                padding: 28,
                borderRadius: 20,
                minHeight: 200,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--color-primary)",
                  marginBottom: 8,
                  fontWeight: 700,
                }}
              >
                {v.label}
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — Combo cards */}
      <section style={{ marginBottom: 32 }}>
        <SectionHeader
          number="04"
          title="Combinações"
          desc="Misturar glass + volumetric produz o look V3 completo."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {COMBO_CARDS.map((c, i) => (
            <div
              key={i}
              className={c.classes}
              style={{
                padding: 24,
                borderRadius: 18,
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "var(--color-primary-dim)",
                  border: "1px solid var(--color-border-green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-primary)",
                  fontWeight: 900,
                  fontSize: 16,
                }}
              >
                ◐
              </div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, margin: "12px 0 6px" }}>
                  {c.title}
                </h4>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-secondary)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}

function SectionHeader({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
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
      <h2
        style={{
          fontSize: 28,
          fontWeight: 800,
          margin: "8px 0 8px",
          letterSpacing: -0.5,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: "var(--color-text-secondary)",
          margin: 0,
          fontSize: 14,
          maxWidth: 720,
        }}
      >
        {desc}
      </p>
    </header>
  );
}
