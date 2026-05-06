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

const SPACING_SCALE = [
  { token: "--sp-1", name: "sp-1", px: 4 },
  { token: "--sp-2", name: "sp-2", px: 8 },
  { token: "--sp-3", name: "sp-3", px: 12 },
  { token: "--sp-4", name: "sp-4", px: 16 },
  { token: "--sp-5", name: "sp-5", px: 20 },
  { token: "--sp-6", name: "sp-6", px: 24 },
  { token: "--sp-8", name: "sp-8", px: 32 },
  { token: "--sp-10", name: "sp-10", px: 40 },
  { token: "--sp-12", name: "sp-12", px: 48 },
  { token: "--sp-16", name: "sp-16", px: 64 },
];

const RADIUS_SCALE = [
  { token: "--radius-sm", name: "sm", px: 6, desc: "Input borders, badges" },
  { token: "--radius-md", name: "md", px: 12, desc: "Cards, dropdowns" },
  { token: "--radius-lg", name: "lg", px: 16, desc: "Modals, panels" },
  { token: "--radius-xl", name: "xl", px: 24, desc: "Hero cards, featured" },
];

export default function SpacingPage() {
  return (
    <PageLayout
      title="Espaçamento"
      accentWord="Espaçamento"
      subtitle="Sistema de espaçamento baseado em múltiplos de 4px — consistência visual garantida em toda a interface."
      breadcrumb={[
        { label: "Foundations", href: "/foundations/colors" },
        { label: "Spacing" },
      ]}
      badge="V3 · FOUNDATIONS"
    >
      {/* SECTION 01 — Spacing Scale */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="01"
          title="Escala de Espaçamento"
          desc="10 tokens de spacing — múltiplos de 4px para criar ritmo visual harmonioso."
        />
        <div
          className="glass-card"
          style={{ borderRadius: 20, overflow: "hidden" }}
        >
          {SPACING_SCALE.map((s, i) => (
            <div
              key={s.token}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 80px 1fr 60px",
                alignItems: "center",
                gap: 20,
                padding: "14px 28px",
                borderBottom:
                  i < SPACING_SCALE.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              {/* Token name */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-primary)",
                  fontWeight: 700,
                }}
              >
                {s.token}
              </div>

              {/* Pixel value */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-text-secondary)",
                }}
              >
                {s.px}px
              </div>

              {/* Visual bar */}
              <div
                style={{
                  height: 16,
                  borderRadius: 4,
                  background: "linear-gradient(90deg, var(--color-primary), var(--color-primary-glow))",
                  width: Math.min(s.px * 5, 360),
                  opacity: 0.7 + (s.px / 64) * 0.3,
                }}
              />

              {/* rem value */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-text-muted)",
                  textAlign: "right",
                }}
              >
                {(s.px / 16).toFixed(4).replace(/\.?0+$/, "")}rem
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 02 — Padding Examples */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="02"
          title="Padding em Componentes"
          desc="Como o spacing se aplica na prática — do elemento inline ao container full-width."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Badge / Pill", h: 6, v: 12, desc: "padding: 6px 12px" },
            { label: "Button sm", h: 10, v: 16, desc: "padding: 10px 16px" },
            { label: "Button md", h: 12, v: 20, desc: "padding: 12px 20px" },
            { label: "Button lg", h: 16, v: 28, desc: "padding: 16px 28px" },
            { label: "Card sm", h: 20, v: 20, desc: "padding: 20px" },
            { label: "Card md", h: 24, v: 24, desc: "padding: 24px" },
            { label: "Card lg", h: 32, v: 32, desc: "padding: 32px" },
          ].map((item) => (
            <div
              key={item.label}
              className="glass-subtle"
              style={{ borderRadius: 14, padding: "16px 24px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 14 }}>{item.label}</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--color-primary)",
                  }}
                >
                  {item.desc}
                </span>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  background: "rgba(136,206,17,0.08)",
                  border: "1px dashed rgba(136,206,17,0.35)",
                  borderRadius: 8,
                  padding: `${item.h}px ${item.v}px`,
                }}
              >
                <div
                  style={{
                    background: "var(--color-primary-dim)",
                    border: "1px solid var(--color-border-green)",
                    borderRadius: 6,
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  content
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 03 — Radius */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="03"
          title="Border Radius"
          desc="4 tokens de border-radius — do radius-sm para inputs ao radius-xl para hero cards."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {RADIUS_SCALE.map((r) => (
            <div
              key={r.token}
              className="glass-subtle"
              style={{ padding: 24, borderRadius: 16, textAlign: "center" }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  background: "var(--color-primary-dim)",
                  border: "1.5px solid var(--color-border-green)",
                  borderRadius: r.px,
                  margin: "0 auto 16px",
                }}
              />
              <div style={{ fontWeight: 700, fontSize: 15 }}>{r.px}px</div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-primary)",
                  margin: "4px 0",
                }}
              >
                {r.token}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--color-text-muted)",
                  lineHeight: 1.4,
                  marginTop: 6,
                }}
              >
                {r.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04 — Grid System */}
      <section style={{ marginBottom: 32 }}>
        <SectionHeader
          number="04"
          title="Sistema de Grid"
          desc="Layout base — 12 colunas, gap de 16-24px, container max de 1280px."
        />
        <div className="glass-card" style={{ padding: 28, borderRadius: 20 }}>
          {/* Visual 12-column representation */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 6, marginBottom: 20 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 40,
                  background: i % 2 === 0
                    ? "var(--color-primary-dim)"
                    : "rgba(136,206,17,0.06)",
                  border: "1px solid var(--color-border-green)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-primary)",
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Grid usage examples */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { cols: "repeat(1, 1fr)", label: "1 col — full" },
              { cols: "repeat(2, 1fr)", label: "2 cols — split" },
              { cols: "repeat(3, 1fr)", label: "3 cols — thirds" },
              { cols: "repeat(4, 1fr)", label: "4 cols — quarters" },
              { cols: "1fr 2fr", label: "1/3 + 2/3" },
              { cols: "2fr 1fr", label: "2/3 + 1/3" },
            ].map((g) => (
              <div
                key={g.cols}
                className="glass-subtle"
                style={{ padding: "12px 16px", borderRadius: 10 }}
              >
                <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>
                  {g.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--color-text-muted)",
                  }}
                >
                  {g.cols}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
