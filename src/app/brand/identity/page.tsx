import PageLayout from "@/components/layout/PageLayout";

function SectionHeader({ number, title, desc }: { number: string; title: string; desc: string }) {
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
      <h2 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 8px", letterSpacing: -0.5 }}>
        {title}
      </h2>
      <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: 14, maxWidth: 720 }}>
        {desc}
      </p>
    </header>
  );
}

function LogoMark({ bg, textColor }: { bg: string; textColor: string }) {
  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 16,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900,
        fontSize: 28,
        color: textColor,
        boxShadow: "0 0 32px rgba(136,206,17,0.3)",
        letterSpacing: -1,
        flexShrink: 0,
      }}
    >
      G
    </div>
  );
}

const PERSONALITY_TRAITS = [
  {
    word: "Inovadora",
    desc: "Não seguimos tendências — as criamos. O design system V3 introduz Liquid Glass quando a indústria ainda usa flat.",
    icon: "◆",
  },
  {
    word: "Premium",
    desc: "Cada pixel importa. Glassmorphism, volumetric lighting e animações fluidas garantem percepção de alta qualidade.",
    icon: "★",
  },
  {
    word: "Confiável",
    desc: "Tokens documentados, componentes testados e padrões consistentes. Zero surpresas em produção.",
    icon: "✓",
  },
  {
    word: "Ousada",
    desc: "Verde neon em dark mode, tipografia Black em 900, espaços vazios intencionais. Presença que não se desculpa.",
    icon: "⚡",
  },
];

export default function IdentityPage() {
  return (
    <PageLayout
      title="Identidade da Marca"
      accentWord="Marca"
      subtitle="Os elementos fundamentais da identidade visual GAMA — logomarca, cores primárias e tipografia de marca."
      breadcrumb={[
        { label: "Brand", href: "/brand/identity" },
        { label: "Identity" },
      ]}
      badge="V3 · BRAND"
    >
      {/* SECTION 01 — Logo */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="01"
          title="Logomarca"
          desc="O símbolo G da GAMA — quadrado com cantos arredondados, sempre em verde sobre escuro ou preto sobre verde."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
          {/* Dark bg */}
          <div
            className="glass-card"
            style={{
              padding: 40,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              background: "#161616",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <LogoMark bg="#88ce11" textColor="#0a0a0a" />
              <div>
                <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: -0.5 }}>GAMA</div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Design System
                </div>
              </div>
            </div>
            <span className="pill pill-muted" style={{ fontSize: 11 }}>
              Sobre escuro
            </span>
          </div>

          {/* Light bg */}
          <div
            style={{
              padding: 40,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              background: "#f0f0f0",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <LogoMark bg="#88ce11" textColor="#0a0a0a" />
              <div>
                <div
                  style={{ fontWeight: 900, fontSize: 24, letterSpacing: -0.5, color: "#111111" }}
                >
                  GAMA
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "#888888",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Design System
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#555",
                background: "rgba(0,0,0,0.06)",
                padding: "4px 10px",
                borderRadius: 20,
              }}
            >
              Sobre claro
            </span>
          </div>

          {/* Color bg */}
          <div
            style={{
              padding: 40,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              background: "linear-gradient(135deg, #88ce11 0%, #6fa80a 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: "#0a0a0a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 28,
                  color: "#88ce11",
                  flexShrink: 0,
                }}
              >
                G
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: -0.5, color: "#0a0a0a" }}>
                  GAMA
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "rgba(0,0,0,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Design System
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#0a0a0a",
                background: "rgba(0,0,0,0.1)",
                padding: "4px 10px",
                borderRadius: 20,
              }}
            >
              Sobre brand
            </span>
          </div>
        </div>

        {/* Clearspace rule */}
        <div
          className="glass-subtle"
          style={{ padding: "20px 24px", borderRadius: 14 }}
        >
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
            Regra de Espaço Livre
          </div>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>
            Mantenha ao redor da logomarca um espaço mínimo equivalente à <strong>altura da letra G</strong>. Nunca
            coloque outros elementos visuais dentro dessa zona de proteção.
          </p>
        </div>
      </section>

      {/* SECTION 02 — Brand Colors */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="02"
          title="Cores de Marca"
          desc="Três variações do verde GAMA — use Primary para CTA, Light para hover, Dark para pressed."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { hex: "#88ce11", name: "GAMA Green", role: "Primary CTA, logos, highlights" },
            { hex: "#a3d500", name: "GAMA Green Light", role: "Hover states, accents" },
            { hex: "#6fa80a", name: "GAMA Green Dark", role: "Pressed states, shadows" },
          ].map((c) => (
            <div key={c.hex} className="glass-subtle" style={{ borderRadius: 16, overflow: "hidden" }}>
              <div
                style={{
                  height: 100,
                  backgroundColor: c.hex,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 14,
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#0a0a0a",
                    letterSpacing: 0.5,
                  }}
                >
                  {c.hex.toUpperCase()}
                </span>
              </div>
              <div style={{ padding: "14px 18px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)", lineHeight: 1.4 }}>
                  {c.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 03 — Brand Typography */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="03"
          title="Tipografia de Marca"
          desc="Poppins Black (900) para headlines de impacto. SemiBold (600) para subtítulos. Regular (400) para corpo."
        />
        <div
          className="glass-illuminated"
          style={{ padding: 40, borderRadius: 24, textAlign: "center" }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              letterSpacing: -3,
              lineHeight: 1.0,
              marginBottom: 8,
            }}
          >
            Poppins
          </div>
          <div
            className="gradient-text"
            style={{
              fontSize: 80,
              fontWeight: 900,
              letterSpacing: -3,
              lineHeight: 1.0,
              marginBottom: 24,
            }}
          >
            Black 900
          </div>
          <p
            style={{
              fontSize: 16,
              color: "var(--color-text-secondary)",
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
          </p>
          <p
            style={{
              fontSize: 16,
              color: "var(--color-text-secondary)",
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: 560,
              margin: "8px auto 0",
            }}
          >
            0 1 2 3 4 5 6 7 8 9
          </p>
        </div>
      </section>

      {/* SECTION 04 — Personality */}
      <section style={{ marginBottom: 32 }}>
        <SectionHeader
          number="04"
          title="Personalidade da Marca"
          desc="4 pilares que definem como a GAMA se apresenta em todas as touchpoints."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {PERSONALITY_TRAITS.map((t) => (
            <div
              key={t.word}
              className="glass-illuminated liquid-edge"
              style={{ padding: 28, borderRadius: 20 }}
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
                  marginBottom: 16,
                }}
              >
                {t.icon}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 10px", letterSpacing: -0.5 }}>
                {t.word}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--color-text-secondary)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
