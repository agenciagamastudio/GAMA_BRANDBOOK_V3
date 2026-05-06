import PageLayout from "@/components/layout/PageLayout";

// ─── Swatch helpers ─────────────────────────────────────────────────────────

interface SwatchProps {
  hex: string;
  name: string;
  variable?: string;
  textDark?: boolean;
}

function Swatch({ hex, name, variable, textDark }: SwatchProps) {
  return (
    <div className="glass-subtle" style={{ borderRadius: 16, overflow: "hidden" }}>
      <div
        style={{
          width: "100%",
          height: 96,
          backgroundColor: hex,
          position: "relative",
        }}
      >
        {textDark !== false && (
          <span
            style={{
              position: "absolute",
              bottom: 8,
              right: 12,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              color: textDark ? "#0a0a0a" : "rgba(255,255,255,0.7)",
              letterSpacing: 0.5,
            }}
          >
            {hex.toUpperCase()}
          </span>
        )}
      </div>
      <div style={{ padding: "12px 16px 14px" }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{name}</div>
        {variable && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-primary)",
              fontWeight: 600,
            }}
          >
            {variable}
          </div>
        )}
      </div>
    </div>
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
      <h2 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 8px", letterSpacing: -0.5 }}>
        {title}
      </h2>
      <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: 14, maxWidth: 720 }}>
        {desc}
      </p>
    </header>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ColorsPage() {
  return (
    <PageLayout
      title="Sistema de Cores"
      accentWord="Cores"
      subtitle="Paleta completa do GAMA DS V3 — tokens de marca, semânticos e escalas neutras para dark e light mode."
      breadcrumb={[
        { label: "Foundations", href: "/foundations/colors" },
        { label: "Colors" },
      ]}
      badge="V3 · FOUNDATIONS"
    >
      {/* SECTION 01 — Brand Colors */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="01"
          title="Cores de Marca"
          desc="O verde GAMA — identidade principal da marca, com variações para uso em fundos, bordas e glows."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <Swatch
            hex="#88ce11"
            name="Primary"
            variable="--color-primary"
            textDark
          />
          <Swatch
            hex="#a3d500"
            name="Primary Light"
            variable="--color-primary-light"
            textDark
          />
          <Swatch
            hex="#6fa80a"
            name="Primary Dark"
            variable="--color-primary-dark"
            textDark
          />
        </div>

        {/* Dim + glow as inline strips */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="glass-subtle" style={{ borderRadius: 14, padding: "14px 18px" }}>
            <div
              style={{
                height: 40,
                borderRadius: 10,
                backgroundColor: "rgba(136,206,17,0.15)",
                marginBottom: 10,
                border: "1px solid rgba(136,206,17,0.25)",
              }}
            />
            <div style={{ fontWeight: 700, fontSize: 13 }}>Primary Dim</div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-primary)",
                marginTop: 2,
              }}
            >
              --color-primary-dim · rgba(136,206,17,0.15)
            </div>
          </div>
          <div className="glass-subtle" style={{ borderRadius: 14, padding: "14px 18px" }}>
            <div
              style={{
                height: 40,
                borderRadius: 10,
                backgroundColor: "rgba(136,206,17,0.35)",
                marginBottom: 10,
                border: "1px solid rgba(136,206,17,0.4)",
              }}
            />
            <div style={{ fontWeight: 700, fontSize: 13 }}>Primary Glow</div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-primary)",
                marginTop: 2,
              }}
            >
              --color-primary-glow · rgba(136,206,17,0.35)
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — Semantic */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="02"
          title="Cores Semânticas"
          desc="Cores funcionais para feedback do sistema — sucesso, aviso, erro e informação."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <Swatch hex="#10b981" name="Success" variable="--color-success" textDark={false} />
          <Swatch hex="#f59e0b" name="Warning" variable="--color-warning" textDark />
          <Swatch hex="#e11d48" name="Error" variable="--color-error" textDark={false} />
          <Swatch hex="#3b82f6" name="Info" variable="--color-info" textDark={false} />
        </div>
      </section>

      {/* SECTION 03 — Dark Neutrals */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="03"
          title="Escala Neutros — Dark"
          desc="Superfícies, bordas e tipografia do modo escuro."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <Swatch hex="#161616" name="BG / Base" variable="--color-bg" textDark={false} />
          <Swatch hex="#1f1f1f" name="Surface 2" variable="--color-surface-2" textDark={false} />
          <Swatch hex="#272727" name="Surface" variable="--color-surface" textDark={false} />
          <Swatch hex="#303030" name="Surface 3" variable="--color-surface-3" textDark={false} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 12 }}>
          <Swatch hex="#ffffff" name="Text" variable="--color-text" textDark />
          <Swatch hex="#a1a1aa" name="Text Secondary" variable="--color-text-secondary" textDark />
          <Swatch hex="#71717a" name="Text Muted" variable="--color-text-muted" textDark={false} />
          {/* Border — use glass-subtle */}
          <div className="glass-subtle" style={{ borderRadius: 16, overflow: "hidden" }}>
            <div
              style={{
                width: "100%",
                height: 96,
                background: "repeating-conic-gradient(#1f1f1f 0% 25%, #272727 0% 50%) 0 0 / 24px 24px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "2px solid rgba(255,255,255,0.1)",
                  borderRadius: 0,
                }}
              />
            </div>
            <div style={{ padding: "12px 16px 14px" }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>Border</div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-primary)",
                  fontWeight: 600,
                }}
              >
                --color-border
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — Light Neutrals */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="04"
          title="Escala Neutros — Light"
          desc="Equivalentes para modo claro — mesma hierarquia, semântica invertida."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <Swatch hex="#f8f8f8" name="BG Light" variable="(light) --color-bg" textDark />
          <Swatch hex="#f0f0f0" name="Surface 2 Light" variable="(light) --color-surface-2" textDark />
          <Swatch hex="#ffffff" name="Surface Light" variable="(light) --color-surface" textDark />
          <Swatch hex="#e8e8e8" name="Surface 3 Light" variable="(light) --color-surface-3" textDark />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 }}>
          <Swatch hex="#111111" name="Text Light" variable="(light) --color-text" textDark={false} />
          <Swatch hex="#555555" name="Text Secondary Light" variable="(light) --color-text-secondary" textDark={false} />
          <Swatch hex="#888888" name="Text Muted Light" variable="(light) --color-text-muted" textDark={false} />
        </div>
      </section>

      {/* SECTION 05 — Code reference */}
      <section style={{ marginBottom: 32 }}>
        <SectionHeader
          number="05"
          title="Referência CSS"
          desc="Copie e cole esses tokens nos seus estilos. Todas as cores são CSS Custom Properties."
        />
        <div
          className="glass-card"
          style={{ borderRadius: 16, overflow: "hidden" }}
        >
          <div
            style={{
              padding: "10px 20px",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#e11d48" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-text-muted)",
                marginLeft: 8,
              }}
            >
              globals.css — :root
            </span>
          </div>
          <pre
            style={{
              margin: 0,
              padding: "24px 28px",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
              overflowX: "auto",
            }}
          >
            <span style={{ color: "var(--color-text-muted)" }}>{"/* Brand */"}</span>{"\n"}
            <span style={{ color: "#88ce11" }}>{"--color-primary"}</span>
            {": #88ce11;\n"}
            <span style={{ color: "#88ce11" }}>{"--color-primary-dim"}</span>
            {": rgba(136, 206, 17, 0.15);\n"}
            <span style={{ color: "#88ce11" }}>{"--color-primary-glow"}</span>
            {": rgba(136, 206, 17, 0.35);\n\n"}
            <span style={{ color: "var(--color-text-muted)" }}>{"/* Semantic */"}</span>{"\n"}
            <span style={{ color: "#10b981" }}>{"--color-success"}</span>
            {": #10b981;\n"}
            <span style={{ color: "#f59e0b" }}>{"--color-warning"}</span>
            {": #f59e0b;\n"}
            <span style={{ color: "#e11d48" }}>{"--color-error"}</span>
            {": #e11d48;\n"}
            <span style={{ color: "#3b82f6" }}>{"--color-info"}</span>
            {": #3b82f6;\n\n"}
            <span style={{ color: "var(--color-text-muted)" }}>{"/* Dark mode (default) */"}</span>{"\n"}
            {"--color-bg: #161616;\n"}
            {"--color-surface: #272727;\n"}
            {"--color-surface-2: #1f1f1f;\n"}
            {"--color-surface-3: #303030;\n"}
            {"--color-text: #ffffff;\n"}
            {"--color-text-secondary: #a1a1aa;\n"}
            {"--color-text-muted: #71717a;\n"}
          </pre>
        </div>
      </section>
    </PageLayout>
  );
}
