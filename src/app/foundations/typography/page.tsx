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

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="glass-subtle"
      style={{
        margin: "12px 0 0",
        padding: "14px 18px",
        borderRadius: 12,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        lineHeight: 1.7,
        color: "var(--color-text-secondary)",
        overflowX: "auto",
      }}
    >
      {children}
    </pre>
  );
}

const TYPE_SCALE = [
  { label: "H1 Display", size: 64, weight: 900, tag: "h1", varName: "font-size: 64px; font-weight: 900;" },
  { label: "H2 Heading", size: 48, weight: 800, tag: "h2", varName: "font-size: 48px; font-weight: 800;" },
  { label: "H3 Subheading", size: 36, weight: 700, tag: "h3", varName: "font-size: 36px; font-weight: 700;" },
  { label: "H4 Title", size: 28, weight: 700, tag: "h4", varName: "font-size: 28px; font-weight: 700;" },
  { label: "H5 Subtitle", size: 20, weight: 600, tag: "h5", varName: "font-size: 20px; font-weight: 600;" },
  { label: "Body", size: 15, weight: 400, tag: "p", varName: "font-size: 15px; font-weight: 400;" },
  { label: "Small", size: 12, weight: 400, tag: "small", varName: "font-size: 12px; font-weight: 400;" },
  { label: "Caption", size: 10, weight: 600, tag: "span", varName: "font-size: 10px; font-weight: 600; text-transform: uppercase;" },
];

const WEIGHTS = [
  { weight: 300, name: "Light" },
  { weight: 400, name: "Regular" },
  { weight: 500, name: "Medium" },
  { weight: 600, name: "SemiBold" },
  { weight: 700, name: "Bold" },
  { weight: 800, name: "ExtraBold" },
  { weight: 900, name: "Black" },
];

export default function TypographyPage() {
  return (
    <PageLayout
      title="Tipografia"
      accentWord="Tipografia"
      subtitle="Sistema tipográfico do GAMA DS V3 — Poppins para display e UI, JetBrains Mono para código."
      breadcrumb={[
        { label: "Foundations", href: "/foundations/colors" },
        { label: "Typography" },
      ]}
      badge="V3 · FOUNDATIONS"
    >
      {/* SECTION 01 — Font Families */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="01"
          title="Famílias de Fontes"
          desc="Duas fontes cuidadosamente selecionadas para performance, legibilidade e personalidade de marca."
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Poppins */}
          <div
            className="glass-illuminated"
            style={{ padding: 32, borderRadius: 20, minHeight: 200 }}
          >
            <span className="pill pill-green" style={{ marginBottom: 16 }}>
              Primária
            </span>
            <div
              style={{
                fontSize: 52,
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: -1.5,
                margin: "12px 0 16px",
              }}
            >
              Poppins
            </div>
            <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              Humanist sans-serif — uso principal para headlines, subtítulos e UI geral.
              <br />
              Pesos: 300–900
            </div>
            <CodeBlock>{"font-family: var(--font-main);\n/* Poppins, sans-serif */"}</CodeBlock>
          </div>

          {/* JetBrains Mono */}
          <div
            className="glass-card vol-light"
            style={{ padding: 32, borderRadius: 20, minHeight: 200 }}
          >
            <span className="pill pill-blue" style={{ marginBottom: 16 }}>
              Código
            </span>
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: -0.5,
                margin: "12px 0 16px",
                fontFamily: "var(--font-mono)",
              }}
            >
              JetBrains
            </div>
            <div style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              Monospaced — exclusivo para snippets, tokens, código e labels técnicos.
              <br />
              Pesos: 400–800
            </div>
            <CodeBlock>{"font-family: var(--font-mono);\n/* JetBrains Mono, monospace */"}</CodeBlock>
          </div>
        </div>
      </section>

      {/* SECTION 02 — Type Scale */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="02"
          title="Escala de Tamanhos"
          desc="8 níveis hierárquicos — do display heading de 64px ao caption de 10px."
        />
        <div
          className="glass-card"
          style={{ borderRadius: 20, overflow: "hidden" }}
        >
          {TYPE_SCALE.map((t, i) => (
            <div
              key={t.label}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr auto",
                alignItems: "center",
                gap: 24,
                padding: "16px 28px",
                borderBottom:
                  i < TYPE_SCALE.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--color-primary)",
                    fontWeight: 700,
                  }}
                >
                  {t.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--color-text-muted)",
                    marginTop: 2,
                  }}
                >
                  {`<${t.tag}>`} · {t.size}px / {t.weight}
                </div>
              </div>
              <div
                style={{
                  fontSize: Math.min(t.size, 40),
                  fontWeight: t.weight,
                  lineHeight: 1.1,
                  letterSpacing: t.size >= 36 ? -1 : 0,
                  textTransform: t.size === 10 ? "uppercase" : "none",
                  color: t.size >= 36 ? "var(--color-text)" : "var(--color-text-secondary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {t.size >= 20
                  ? "Construindo marcas"
                  : t.size >= 12
                  ? "The quick brown fox jumps"
                  : "CAPTION LABEL"}
              </div>
              <span
                className="pill pill-muted"
                style={{ fontFamily: "var(--font-mono)", fontSize: 10, whiteSpace: "nowrap" }}
              >
                {t.size}px
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 03 — Weights */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="03"
          title="Pesos — Poppins"
          desc="7 níveis de peso disponíveis. Bold (700) e acima são mais usados em headings."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {WEIGHTS.map((w) => (
            <div
              key={w.weight}
              className="glass-subtle"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderRadius: 14,
              }}
            >
              <span style={{ fontSize: 24, fontWeight: w.weight, letterSpacing: -0.3 }}>
                {w.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-text-muted)",
                }}
              >
                font-weight: {w.weight}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04 — Gradient text utilities */}
      <section style={{ marginBottom: 32 }}>
        <SectionHeader
          number="04"
          title="Gradient Text"
          desc="Classes utilitárias para texto com gradiente de marca — estático e animado."
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="glass-card" style={{ padding: 32, borderRadius: 20 }}>
            <span className="pill pill-muted" style={{ marginBottom: 16 }}>
              .gradient-text
            </span>
            <div
              className="gradient-text"
              style={{
                fontSize: 42,
                fontWeight: 900,
                letterSpacing: -1.5,
                lineHeight: 1.1,
                margin: "16px 0",
              }}
            >
              Impacto Visual
            </div>
            <CodeBlock>{'<span className="gradient-text">\n  Impacto Visual\n</span>'}</CodeBlock>
          </div>

          <div className="glass-card" style={{ padding: 32, borderRadius: 20 }}>
            <span className="pill pill-green" style={{ marginBottom: 16 }}>
              .gradient-text-animated
            </span>
            <div
              className="gradient-text-animated"
              style={{
                fontSize: 42,
                fontWeight: 900,
                letterSpacing: -1.5,
                lineHeight: 1.1,
                margin: "16px 0",
              }}
            >
              Em Movimento
            </div>
            <CodeBlock>
              {'<span className="gradient-text-animated">\n  Em Movimento\n</span>'}
            </CodeBlock>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
