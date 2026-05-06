"use client";
import { useState } from "react";
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

const CODE_BASIC = `<span className="pill pill-green">Active</span>
<span className="pill pill-blue">New</span>
<span className="pill pill-muted">Draft</span>`;

const CODE_WITH_DOT = `<span className="pill pill-green">
  <span style={{ width: 6, height: 6, borderRadius: "50%",
    background: "var(--color-success)", display: "inline-block",
    marginRight: 6 }} />
  Online
</span>`;

export default function BadgesPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (cls: string) => {
    navigator.clipboard.writeText(cls);
    setCopied(cls);
    setTimeout(() => setCopied(null), 1500);
  };

  const variants = [
    { cls: "pill pill-green", label: "pill-green", desc: "Ativo, sucesso, positivo" },
    { cls: "pill pill-blue", label: "pill-blue", desc: "Info, novo, destaque" },
    { cls: "pill pill-muted", label: "pill-muted", desc: "Neutro, rascunho, inativo" },
  ];

  const statusDots = [
    { color: "var(--color-success)", label: "Online", cls: "pill pill-green" },
    { color: "var(--color-warning)", label: "Away", cls: "pill pill-muted" },
    { color: "var(--color-error)", label: "Offline", cls: "pill pill-muted" },
    { color: "var(--color-info)", label: "Busy", cls: "pill pill-blue" },
  ];

  const withIcons = [
    { icon: "✓", label: "Verified", cls: "pill pill-green" },
    { icon: "★", label: "Premium", cls: "pill pill-blue" },
    { icon: "⚠", label: "Warning", cls: "pill", style: { background: "rgba(245,158,11,0.15)", color: "var(--color-warning)", border: "1px solid rgba(245,158,11,0.3)" } as React.CSSProperties },
    { icon: "✕", label: "Rejected", cls: "pill", style: { background: "rgba(225,29,72,0.15)", color: "var(--color-error)", border: "1px solid rgba(225,29,72,0.3)" } as React.CSSProperties },
  ];

  const sizes = [
    { label: "XS", style: { fontSize: 10, padding: "2px 8px" } as React.CSSProperties },
    { label: "SM (default)", style: {} as React.CSSProperties },
    { label: "MD", style: { fontSize: 13, padding: "5px 14px" } as React.CSSProperties },
    { label: "LG", style: { fontSize: 15, padding: "7px 18px" } as React.CSSProperties },
  ];

  return (
    <PageLayout
      title="Badges & Pills"
      accentWord="Badges"
      subtitle="Pills e badges comunicam estados, categorias e contagens de forma compacta. 3 variantes semânticas + customizações."
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Atoms", href: "/components/atoms/buttons" },
        { label: "Badges" },
      ]}
      badge="ATOM"
    >
      {/* Variants */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Variantes" desc="3 variantes semânticas prontas. Clique em qualquer badge para copiar o class name." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 32, alignItems: "center" }}>
            {variants.map((v) => (
              <button
                key={v.cls}
                className={v.cls}
                onClick={() => copy(v.cls)}
                style={{ cursor: "pointer", border: "none", position: "relative" }}
              >
                {copied === v.cls ? "Copiado!" : v.label}
              </button>
            ))}
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                {["Variant", "Class", "Quando usar"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 12px", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)", fontSize: 11, textTransform: "uppercase", fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((v) => (
                <tr key={v.cls}>
                  <td style={{ padding: "12px", borderBottom: "1px solid var(--color-border)" }}>
                    <span className={v.cls}>{v.label.split(" ")[1]}</span>
                  </td>
                  <td style={{ padding: "12px", borderBottom: "1px solid var(--color-border)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-primary)" }}>.{v.cls.replace("pill ", "")}</td>
                  <td style={{ padding: "12px", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>{v.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="code-block" style={{ marginTop: 16 }}>
          <pre style={{ margin: 0, fontSize: 13 }}>{CODE_BASIC}</pre>
        </div>
      </section>

      {/* With status dots */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Com Dot de Status" desc="Adicione um ponto colorido para indicar estado em tempo real." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            {statusDots.map((s) => (
              <span key={s.label} className={s.cls} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, display: "inline-block", flexShrink: 0 }} />
                {s.label}
              </span>
            ))}
          </div>
        </div>
        <div className="code-block" style={{ marginTop: 16 }}>
          <pre style={{ margin: 0, fontSize: 13 }}>{CODE_WITH_DOT}</pre>
        </div>
      </section>

      {/* With icons */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Com Ícones" desc="Prefixe badges com ícones para reforço visual do estado." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            {withIcons.map((b) => (
              <span key={b.label} className={b.cls} style={{ display: "inline-flex", alignItems: "center", gap: 5, ...(b.style || {}) }}>
                <span style={{ fontSize: 10 }}>{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Tamanhos" desc="O pill não tem classes de tamanho — use inline style para customizar." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            {sizes.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <span className="pill pill-green" style={s.style}>{s.label}</span>
                <span style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notification badges */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Notification Counters" desc="Badges numéricas para contagens em ícones e menus." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {[1, 9, 42, 99].map((n) => (
              <div key={n} style={{ position: "relative", display: "inline-flex" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--color-surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                  🔔
                </div>
                <span style={{
                  position: "absolute", top: -6, right: -6,
                  background: "var(--color-primary)", color: "#000",
                  borderRadius: 999, minWidth: 18, height: 18,
                  fontSize: 10, fontWeight: 800, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  padding: "0 4px", lineHeight: 1,
                }}>
                  {n > 99 ? "99+" : n}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Do / Don't */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="06" title="Boas Práticas" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="glass-card" style={{ padding: 24, borderTop: "3px solid var(--color-success)" }}>
            <h4 style={{ margin: "0 0 12px", color: "var(--color-success)", fontSize: 14, fontWeight: 700 }}>✓ Use assim</h4>
            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--color-text-secondary)", fontSize: 13, lineHeight: 2 }}>
              <li>Labels curtas (1–2 palavras)</li>
              <li>Cor consistente com significado</li>
              <li>Verde = positivo, Azul = info, Cinza = neutro</li>
              <li>Ícones para reforço, nunca substituto</li>
            </ul>
          </div>
          <div className="glass-card" style={{ padding: 24, borderTop: "3px solid var(--color-error)" }}>
            <h4 style={{ margin: "0 0 12px", color: "var(--color-error)", fontSize: 14, fontWeight: 700 }}>✕ Evite</h4>
            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--color-text-secondary)", fontSize: 13, lineHeight: 2 }}>
              <li>Labels longas (&gt; 3 palavras)</li>
              <li>Múltiplos badges coloridos juntos</li>
              <li>Usar apenas cor para transmitir significado</li>
              <li>Badges clicáveis sem feedback visual</li>
            </ul>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
