import PageLayout from "@/components/layout/PageLayout";

const VARIANTS = [
  { cls: "btn btn-primary", label: "Primary", desc: "Ação principal — sempre verde." },
  { cls: "btn btn-secondary", label: "Secondary", desc: "Ação secundária — superfície neutra." },
  { cls: "btn btn-ghost", label: "Ghost", desc: "Ação terciária — transparente." },
  { cls: "btn btn-destructive", label: "Destructive", desc: "Ações irreversíveis (delete)." },
  { cls: "btn btn-link", label: "Link", desc: "Ação inline em texto." },
];

const SIZES = [
  { cls: "btn btn-primary btn-sm", label: "sm — 12px" },
  { cls: "btn btn-primary", label: "md — 14px (default)" },
  { cls: "btn btn-primary btn-lg", label: "lg — 16px" },
];

const STATES = [
  { cls: "btn btn-primary", label: "Default" },
  { cls: "btn btn-primary glow-green", label: "Hover (com glow)" },
  { cls: "btn btn-primary", label: "Loading", loading: true },
  { cls: "btn btn-primary", label: "Disabled", disabled: true },
];

export default function ButtonsPage() {
  return (
    <PageLayout
      title="Buttons"
      accentWord="Buttons"
      subtitle="Botões são a unidade de ação do sistema. 5 variantes, 3 tamanhos, todos os estados — todos tokenizados."
      breadcrumb={[
        { label: "Components", href: "/components/atoms/buttons" },
        { label: "Atoms", href: "/components/atoms/buttons" },
        { label: "Buttons" },
      ]}
      badge="ATOM"
    >
      {/* Variants */}
      <Section title="Variantes" desc="5 variantes para diferentes níveis de ênfase.">
        <div className="glass-card" style={{ padding: 32 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 32,
              alignItems: "center",
            }}
          >
            {VARIANTS.map((v) => (
              <button key={v.label} className={v.cls}>
                {v.label}
              </button>
            ))}
          </div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Variant</th>
                <th style={thStyle}>Class</th>
                <th style={thStyle}>Quando usar</th>
              </tr>
            </thead>
            <tbody>
              {VARIANTS.map((v) => (
                <tr key={v.label}>
                  <td style={tdStyle}>
                    <strong>{v.label}</strong>
                  </td>
                  <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-primary)" }}>
                    {v.cls}
                  </td>
                  <td style={tdStyle}>{v.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Tamanhos" desc="3 escalas de altura — para hierarquias visuais.">
        <div
          className="glass-card"
          style={{ padding: 32, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}
        >
          {SIZES.map((s) => (
            <button key={s.label} className={s.cls}>
              {s.label}
            </button>
          ))}
        </div>
      </Section>

      {/* States */}
      <Section title="Estados" desc="Todos os estados visuais cobertos.">
        <div
          className="glass-card"
          style={{ padding: 32, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}
        >
          {STATES.map((s, i) => (
            <button
              key={i}
              className={s.cls}
              disabled={s.disabled || s.loading}
            >
              {s.loading && (
                <span
                  className="animate-spin-slow"
                  style={{
                    width: 14,
                    height: 14,
                    border: "2px solid currentColor",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              )}
              {s.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Code */}
      <Section title="Uso" desc="Importe a classe correta. Tokens e tema fazem o resto.">
        <pre className="code-block">
{`<button className="btn btn-primary">Salvar</button>
<button className="btn btn-secondary btn-sm">Cancelar</button>
<button className="btn btn-ghost btn-lg">Saiba mais</button>
<button className="btn btn-destructive">Excluir</button>
<a className="btn btn-link" href="#">Ver mais</a>`}
        </pre>
      </Section>

      {/* Best practices */}
      <Section title="Boas práticas" desc="Quando usar — e quando NÃO usar.">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div
            className="glass-card"
            style={{ padding: 28, borderTop: "3px solid var(--color-success)" }}
          >
            <h4 style={{ margin: "0 0 12px", fontSize: 16, color: "var(--color-success)" }}>
              ✓ Quando usar
            </h4>
            <ul style={listStyle}>
              <li>Sempre que houver uma ação clara para o usuário</li>
              <li>1 botão primário por região visual</li>
              <li>Verbos no infinitivo: "Salvar", "Continuar", "Enviar"</li>
              <li>Estado loading para ações &gt; 300ms</li>
            </ul>
          </div>
          <div
            className="glass-card"
            style={{ padding: 28, borderTop: "3px solid var(--color-error)" }}
          >
            <h4 style={{ margin: "0 0 12px", fontSize: 16, color: "var(--color-error)" }}>
              ✗ Quando NÃO usar
            </h4>
            <ul style={listStyle}>
              <li>Não use 2+ botões primary lado a lado</li>
              <li>Não use destructive para ações reversíveis</li>
              <li>Evite labels longas ({">="} 4 palavras)</li>
              <li>Não use ghost em hierarquias críticas</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 56 }}>
      <header style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 6px" }}>{title}</h2>
        <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: 14 }}>
          {desc}
        </p>
      </header>
      {children}
    </section>
  );
}

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13,
};
const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 12px",
  borderBottom: "1px solid var(--color-border)",
  color: "var(--color-text-muted)",
  textTransform: "uppercase",
  fontSize: 11,
  letterSpacing: 0.08,
  fontWeight: 700,
};
const tdStyle: React.CSSProperties = {
  padding: "12px 12px",
  borderBottom: "1px solid var(--color-border)",
  color: "var(--color-text)",
  verticalAlign: "top",
};
const listStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: 18,
  color: "var(--color-text-secondary)",
  fontSize: 14,
  lineHeight: 1.8,
};
