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

const CODE = `{/* Simple */}
<hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "24px 0" }} />

{/* Green gradient */}
<div style={{
  height: 1,
  background: "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
  margin: "24px 0",
}} />

{/* With label */}
<div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
  <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
  <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>OU</span>
  <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
</div>`;

export default function DividersPage() {
  return (
    <PageLayout
      title="Dividers"
      accentWord="Dividers"
      subtitle="Divisores separam conteúdo visualmente sem criar ruído. 4 variantes: simples, gradiente, com label e decorativo."
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Atoms", href: "/components/atoms/buttons" },
        { label: "Dividers" },
      ]}
      badge="ATOM"
    >
      {/* Horizontal variants */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Divisores Horizontais" desc="Variantes para separar seções de conteúdo." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <p style={{ fontSize: 12, color: "var(--color-text-muted)", margin: "0 0 4px", fontFamily: "var(--font-mono)" }}>Simple</p>
            <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "8px 0" }} />

            <p style={{ fontSize: 12, color: "var(--color-text-muted)", margin: "16px 0 4px", fontFamily: "var(--font-mono)" }}>Green Gradient</p>
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--color-primary), transparent)", margin: "8px 0" }} />

            <p style={{ fontSize: 12, color: "var(--color-text-muted)", margin: "16px 0 4px", fontFamily: "var(--font-mono)" }}>Dashed</p>
            <div style={{ height: 1, borderTop: "1px dashed var(--color-border)", margin: "8px 0" }} />

            <p style={{ fontSize: 12, color: "var(--color-text-muted)", margin: "16px 0 4px", fontFamily: "var(--font-mono)" }}>Thick accent</p>
            <div style={{ height: 2, background: "var(--color-primary)", borderRadius: 1, margin: "8px 0", width: "100%" }} />

            <p style={{ fontSize: 12, color: "var(--color-text-muted)", margin: "16px 0 4px", fontFamily: "var(--font-mono)" }}>Dot pattern</p>
            <div style={{ height: 1, backgroundImage: "repeating-linear-gradient(90deg, var(--color-border) 0px, var(--color-border) 4px, transparent 4px, transparent 10px)", margin: "8px 0" }} />
          </div>
        </div>
      </section>

      {/* With labels */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Com Label Central" desc="Usado em formulários para separar métodos alternativos (ex: 'OU')." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              { label: "OU", color: "var(--color-text-muted)" },
              { label: "Seção A", color: "var(--color-text-secondary)" },
              { label: "✦ Novidades ✦", color: "var(--color-primary)" },
            ].map((d) => (
              <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
                <span style={{ fontSize: 12, color: d.color, fontWeight: 600, whiteSpace: "nowrap" }}>{d.label}</span>
                <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Divisor Vertical" desc="Para separar itens em layouts horizontais como breadcrumbs e toolbars." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 0, alignItems: "center" }}>
            {["Home", "Produtos", "Categorias", "Contato"].map((item, i) => (
              <>
                <span key={item} style={{ fontSize: 14, color: i === 3 ? "var(--color-primary)" : "var(--color-text-secondary)", padding: "0 16px", fontWeight: i === 3 ? 700 : 400 }}>{item}</span>
                {i < 3 && <div key={`div-${i}`} style={{ width: 1, height: 16, background: "var(--color-border)" }} />}
              </>
            ))}
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 0, alignItems: "center" }}>
            {["Editar", "Duplicar", "Arquivar", "Excluir"].map((item, i) => (
              <>
                <button key={item} className={i === 3 ? "btn btn-ghost" : "btn btn-ghost"} style={{ fontSize: 13, padding: "6px 14px", color: i === 3 ? "var(--color-error)" : undefined }}>{item}</button>
                {i < 3 && <div key={`div-${i}`} style={{ width: 1, height: 20, background: "var(--color-border)" }} />}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Spacing variants */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Espaçamento" desc="Use margin para controlar o espaço ao redor dos divisores." />
        <div className="glass-card" style={{ padding: 32 }}>
          {[8, 16, 24, 40].map((m) => (
            <div key={m}>
              <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>Conteúdo acima — margem {m}px</p>
              <div style={{ height: 1, background: "var(--color-border)", margin: `${m}px 0` }} />
              <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>Conteúdo abaixo</p>
              {m < 40 && <div style={{ height: 16 }} />}
            </div>
          ))}
        </div>
      </section>

      {/* Code */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Código" />
        <div className="code-block">
          <pre style={{ margin: 0, fontSize: 13 }}>{CODE}</pre>
        </div>
      </section>
    </PageLayout>
  );
}
