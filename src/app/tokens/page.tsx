import PageLayout from "@/components/layout/PageLayout";

function SectionHeader({ number, title, desc }: { number: string; title: string; desc?: string }) {
  return (
    <header style={{ marginBottom: 24 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-primary)", fontWeight: 700, letterSpacing: 0.2 }}>── {number}</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 8px", letterSpacing: -0.5 }}>{title}</h2>
      {desc && <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: 14, maxWidth: 720 }}>{desc}</p>}
    </header>
  );
}

const thStyle: React.CSSProperties = { textAlign: "left", padding: "10px 14px", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)", fontSize: 11, textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.5 };
const tdStyle: React.CSSProperties = { padding: "12px 14px", borderBottom: "1px solid var(--color-border)", fontSize: 13, verticalAlign: "middle" };

const COLOR_TOKENS = [
  { name: "color-primary", var: "--color-primary", value: "#88CE11", type: "Brand" },
  { name: "color-primary-dim", var: "--color-primary-dim", value: "rgba(136,206,17,0.15)", type: "Brand" },
  { name: "color-primary-glow", var: "--color-primary-glow", value: "rgba(136,206,17,0.35)", type: "Brand" },
  { name: "color-success", var: "--color-success", value: "#10B981", type: "Semantic" },
  { name: "color-warning", var: "--color-warning", value: "#F59E0B", type: "Semantic" },
  { name: "color-error", var: "--color-error", value: "#E11D48", type: "Semantic" },
  { name: "color-info", var: "--color-info", value: "#3B82F6", type: "Semantic" },
  { name: "color-text", var: "--color-text", value: "#FFFFFF", type: "Text" },
  { name: "color-text-secondary", var: "--color-text-secondary", value: "#A1A1AA", type: "Text" },
  { name: "color-text-muted", var: "--color-text-muted", value: "#52525B", type: "Text" },
  { name: "color-surface", var: "--color-surface", value: "#161616", type: "Surface" },
  { name: "color-surface-2", var: "--color-surface-2", value: "#272727", type: "Surface" },
  { name: "color-border", var: "--color-border", value: "rgba(255,255,255,0.08)", type: "Surface" },
  { name: "color-border-green", var: "--color-border-green", value: "rgba(136,206,17,0.25)", type: "Surface" },
  { name: "glass-bg", var: "--glass-bg", value: "rgba(255,255,255,0.03)", type: "Glass" },
];

const SPACING_TOKENS = [
  { name: "sp-1", var: "--sp-1", value: "4px" },
  { name: "sp-2", var: "--sp-2", value: "8px" },
  { name: "sp-3", var: "--sp-3", value: "12px" },
  { name: "sp-4", var: "--sp-4", value: "16px" },
  { name: "sp-5", var: "--sp-5", value: "20px" },
  { name: "sp-6", var: "--sp-6", value: "24px" },
  { name: "sp-8", var: "--sp-8", value: "32px" },
];

const RADIUS_TOKENS = [
  { name: "radius-sm", var: "--radius-sm", value: "6px" },
  { name: "radius-md", var: "--radius-md", value: "12px" },
  { name: "radius-lg", var: "--radius-lg", value: "16px" },
  { name: "radius-xl", var: "--radius-xl", value: "24px" },
];

const TAILWIND_CONFIG = `// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
      },
      fontFamily: {
        main: "var(--font-main)",
        mono: "var(--font-mono)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
    },
  },
};
export default config;`;

export default function TokensPage() {
  return (
    <PageLayout
      title="Design Tokens"
      accentWord="Tokens"
      subtitle="Todos os tokens do GAMA DS V3. CSS custom properties que garantem consistência em toda a interface."
      breadcrumb={[{ label: "Tokens" }]}
      badge="REFERENCE"
    >
      {/* Color tokens */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Tokens de Cor" desc="15 tokens de cor categorizados por função: Brand, Semântico, Texto, Superfície e Glass." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Token", "CSS Var", "Valor", "Tipo", "Preview"].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COLOR_TOKENS.map((t) => (
                <tr key={t.name}>
                  <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", color: "var(--color-primary)", fontSize: 12 }}>{t.name}</td>
                  <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-secondary)" }}>{t.var}</td>
                  <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-secondary)" }}>{t.value}</td>
                  <td style={tdStyle}>
                    <span className="pill pill-muted" style={{ fontSize: 10 }}>{t.type}</span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ width: 28, height: 28, borderRadius: "var(--radius-sm)", background: t.value, border: "1px solid var(--color-border)", flexShrink: 0 }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Typography tokens */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Tipografia" desc="Fontes, escala e pesos usados no sistema." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Token", "Valor", "Preview"].map((h) => <th key={h} style={thStyle}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                { token: "font-main", value: "Poppins, sans-serif", preview: <span style={{ fontFamily: "Poppins" }}>GAMA Design System</span> },
                { token: "font-mono", value: "JetBrains Mono", preview: <span style={{ fontFamily: "monospace" }}>const token = "value";</span> },
                { token: "text-4xl", value: "48px / 900", preview: <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1 }}>Aa</span> },
                { token: "text-3xl", value: "36px / 800", preview: <span style={{ fontSize: 28, fontWeight: 800 }}>Aa</span> },
                { token: "text-2xl", value: "24px / 700", preview: <span style={{ fontSize: 22, fontWeight: 700 }}>Aa</span> },
                { token: "text-xl", value: "20px / 600", preview: <span style={{ fontSize: 18, fontWeight: 600 }}>Aa</span> },
                { token: "text-base", value: "16px / 500", preview: <span style={{ fontSize: 15, fontWeight: 500 }}>Aa — texto base do sistema</span> },
                { token: "text-sm", value: "14px / 400", preview: <span style={{ fontSize: 13 }}>Aa — texto secundário, labels</span> },
                { token: "text-xs", value: "12px / 600", preview: <span style={{ fontSize: 11, fontWeight: 600 }}>AA — CAPS LABELS</span> },
              ].map((row) => (
                <tr key={row.token}>
                  <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-primary)" }}>{row.token}</td>
                  <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-secondary)" }}>{row.value}</td>
                  <td style={tdStyle}>{row.preview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Spacing */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Espaçamento" desc="Escala baseada em 4px. Use os tokens para consistência." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Token", "CSS Var", "Valor", "Preview"].map((h) => <th key={h} style={thStyle}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {SPACING_TOKENS.map((t) => (
                <tr key={t.name}>
                  <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-primary)" }}>{t.name}</td>
                  <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-secondary)" }}>{t.var}</td>
                  <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: 12 }}>{t.value}</td>
                  <td style={tdStyle}>
                    <div style={{ height: 16, width: parseInt(t.value) * 2, background: "var(--color-primary)", borderRadius: 2, opacity: 0.8, maxWidth: 200 }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Radius */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Border Radius" desc="4 tamanhos para bordas arredondadas." />
        <div className="glass-card" style={{ padding: 28 }}>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {RADIUS_TOKENS.map((t) => (
              <div key={t.name} style={{ textAlign: "center" }}>
                <div style={{ width: 64, height: 64, background: "var(--color-primary-dim)", border: "2px solid rgba(136,206,17,0.3)", borderRadius: t.value, marginBottom: 8 }} />
                <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-primary)" }}>{t.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--color-text-muted)" }}>{t.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tailwind config */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Tailwind Config" desc="Integre os tokens no Tailwind para usá-los como classes." />
        <div className="code-block">
          <pre style={{ margin: 0, fontSize: 12 }}>{TAILWIND_CONFIG}</pre>
        </div>
      </section>
    </PageLayout>
  );
}
