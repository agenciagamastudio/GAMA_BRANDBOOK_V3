"use client";
import PageLayout from "@/components/layout/PageLayout";
import { useLang } from "@/components/layout/LanguageProvider";

function SectionHeader({ number, title, desc }: { number: string; title: string; desc?: string }) {
  return (
    <header style={{ marginBottom: 24 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-primary)", fontWeight: 700, letterSpacing: 0.2 }}>── {number}</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 8px", letterSpacing: -0.5 }}>{title}</h2>
      {desc && <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: 14, maxWidth: 720 }}>{desc}</p>}
    </header>
  );
}

const CODE_SPINNER = `/* CSS */
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

/* Border spinner */
.spinner {
  width: 24px; height: 24px;
  border: 2.5px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}`;

const CODE_LOADING_BTN = `<button className="btn btn-primary" disabled>
  <span style={{ /* spinner styles */ }} />
  Carregando...
</button>`;

export default function SpinnersPage() {
  const { t } = useLang();
  const spinStyle = (size: number, color: string = "var(--color-primary)", thickness: number = 2.5): React.CSSProperties => ({
    width: size, height: size,
    border: `${thickness}px solid var(--color-border)`,
    borderTopColor: color,
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    flexShrink: 0,
  });

  const dotsStyle = (size: number, color: string = "var(--color-primary)"): React.CSSProperties => ({
    width: size, height: size,
    borderRadius: "50%",
    background: color,
    animation: "pulse 1.2s ease-in-out infinite",
  });

  return (
    <PageLayout
      title={t("spinners")}
      accentWord={t("spinners")}
      subtitle={t("spinners_desc")}
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Atoms", href: "/components/atoms/buttons" },
        { label: "Spinners" },
      ]}
      badge="ATOM"
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(0.6); } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
      `}</style>

      {/* Border spinners */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Border Spinner" desc="O padrão mais universal — borda com uma aresta colorida girando." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
            {[
              { size: 16, thickness: 2, label: "XS" },
              { size: 24, thickness: 2.5, label: "SM" },
              { size: 32, thickness: 3, label: "MD" },
              { size: 48, thickness: 3.5, label: "LG" },
              { size: 64, thickness: 4, label: "XL" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={spinStyle(s.size, "var(--color-primary)", s.thickness)} />
                <span style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{s.label} {s.size}px</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colors */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Cores" desc="Use as cores semânticas do sistema." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
            {[
              { color: "var(--color-primary)", label: "Primary" },
              { color: "#fff", label: "White" },
              { color: "var(--color-error)", label: "Error" },
              { color: "var(--color-warning)", label: "Warning" },
              { color: "var(--color-info)", label: "Info" },
            ].map((c) => (
              <div key={c.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={spinStyle(32, c.color, 3)} />
                <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dots spinner */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Dots Spinner" desc="3 pontos pulsando em sequência — elegante para estados de digitação." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
            {[
              { sizes: [6, 6, 6], color: "var(--color-primary)" },
              { sizes: [8, 8, 8], color: "#fff" },
              { sizes: [10, 10, 10], color: "var(--color-info)" },
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {d.sizes.map((sz, j) => (
                  <div key={j} style={{
                    ...dotsStyle(sz, d.color),
                    animationName: "pulse-dot",
                    animationDuration: "1.2s",
                    animationDelay: `${j * 0.2}s`,
                    animationTimingFunction: "ease-in-out",
                    animationIterationCount: "infinite",
                  }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pulse ring */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Pulse Ring" desc="Anel que expande e desaparece — ideal para estados ativos/online." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
            {[
              { color: "var(--color-primary)", label: "Primary" },
              { color: "var(--color-success)", label: "Success" },
              { color: "var(--color-error)", label: "Error" },
            ].map((p) => (
              <div key={p.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative", width: 32, height: 32 }}>
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: "50%",
                    border: `2px solid ${p.color}`,
                    animation: "pulse-ring 1.5s ease-out infinite",
                  }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: p.color, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                </div>
                <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loading buttons */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Loading Button" desc="Spinner integrado ao botão para feedback de ação em andamento." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            {[
              { cls: "btn btn-primary", label: "Salvando...", color: "#000" },
              { cls: "btn btn-secondary", label: "Carregando...", color: "var(--color-primary)" },
              { cls: "btn btn-ghost", label: "Aguarde...", color: "var(--color-text)" },
            ].map((b) => (
              <button key={b.cls} className={b.cls} disabled style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.7 }}>
                <div style={spinStyle(14, b.color, 2)} />
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Code */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="06" title="Código" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="code-block">
            <pre style={{ margin: 0, fontSize: 12 }}>{CODE_SPINNER}</pre>
          </div>
          <div className="code-block">
            <pre style={{ margin: 0, fontSize: 12 }}>{CODE_LOADING_BTN}</pre>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
