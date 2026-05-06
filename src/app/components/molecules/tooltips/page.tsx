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

const CODE = `function Tooltip({ text, position = "top", children }) {
  const [visible, setVisible] = useState(false);
  const positions = {
    top:    { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left:   { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    right:  { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  };
  return (
    <span style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span style={{
          position: "absolute", ...positions[position],
          background: "var(--color-surface)", border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-sm)", padding: "6px 10px",
          fontSize: 12, color: "var(--color-text)", whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)", zIndex: 999,
          pointerEvents: "none",
        }}>
          {text}
        </span>
      )}
    </span>
  );
}`;

type TooltipPos = "top" | "bottom" | "left" | "right";

function Tooltip({ text, position = "top", children, variant = "default" }: {
  text: string; position?: TooltipPos; children: React.ReactNode; variant?: "default" | "dark" | "green";
}) {
  const [visible, setVisible] = useState(false);
  const positions: Record<TooltipPos, React.CSSProperties> = {
    top: { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  };
  const variantStyles = {
    default: { background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text)" },
    dark: { background: "#0a0a0a", border: "1px solid #333", color: "#fff" },
    green: { background: "var(--color-primary-dim)", border: "1px solid rgba(136,206,17,0.4)", color: "var(--color-primary)" },
  };
  const vs = variantStyles[variant];

  return (
    <span style={{ position: "relative", display: "inline-flex" }} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <span style={{
          position: "absolute", ...positions[position],
          ...vs,
          borderRadius: "var(--radius-sm)", padding: "7px 12px",
          fontSize: 12, fontWeight: 500, whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(0,0,0,0.5)", zIndex: 999,
          pointerEvents: "none", letterSpacing: 0.1,
        }}>
          {text}
        </span>
      )}
    </span>
  );
}

export default function TooltipsPage() {
  return (
    <PageLayout
      title="Tooltips"
      accentWord="Tooltips"
      subtitle="Tooltips revelam informações contextuais ao hover. Posições top/bottom/left/right e 3 variantes visuais."
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Molecules", href: "/components/molecules/cards" },
        { label: "Tooltips" },
      ]}
      badge="MOLECULE"
    >
      {/* Positions */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Posições" desc="4 direções — passe o mouse sobre os botões." />
        <div className="glass-card" style={{ padding: 64 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, maxWidth: 600, margin: "0 auto" }}>
            <div />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Tooltip text="Tooltip em cima (top)" position="top">
                <button className="btn btn-secondary btn-sm">Top ↑</button>
              </Tooltip>
            </div>
            <div />

            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <Tooltip text="Tooltip à esquerda (left)" position="left">
                <button className="btn btn-secondary btn-sm">← Left</button>
              </Tooltip>
            </div>
            <div />
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
              <Tooltip text="Tooltip à direita (right)" position="right">
                <button className="btn btn-secondary btn-sm">Right →</button>
              </Tooltip>
            </div>

            <div />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Tooltip text="Tooltip embaixo (bottom)" position="bottom">
                <button className="btn btn-secondary btn-sm">Bottom ↓</button>
              </Tooltip>
            </div>
            <div />
          </div>
        </div>
      </section>

      {/* Variants */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Variantes Visuais" desc="Default (glass), Dark e Green." />
        <div className="glass-card" style={{ padding: 48 }}>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
            <Tooltip text="Tooltip padrão (glass)" position="bottom" variant="default">
              <button className="btn btn-secondary">Default</button>
            </Tooltip>
            <Tooltip text="Tooltip escuro" position="bottom" variant="dark">
              <button className="btn btn-secondary">Dark</button>
            </Tooltip>
            <Tooltip text="Tooltip verde (destaque)" position="bottom" variant="green">
              <button className="btn btn-primary">Green</button>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* With icons */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Em Ícones e Labels" desc="Tooltips em ícones de ação e elementos de formulário." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            {[
              { icon: "✏️", text: "Editar item" },
              { icon: "📋", text: "Duplicar" },
              { icon: "📤", text: "Exportar como CSV" },
              { icon: "🗑️", text: "Excluir permanentemente" },
              { icon: "🔗", text: "Copiar link de compartilhamento" },
              { icon: "⚙️", text: "Configurações avançadas" },
            ].map((item) => (
              <Tooltip key={item.icon} text={item.text} position="top">
                <button style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", width: 40, height: 40, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
      </section>

      {/* Rich tooltip */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Tooltip Rico" desc="Tooltips com mais conteúdo — título + descrição." />
        <div className="glass-card" style={{ padding: 48 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
            <RichTooltip />
          </div>
        </div>
      </section>

      {/* Code */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Código" />
        <div className="code-block">
          <pre style={{ margin: 0, fontSize: 12 }}>{CODE}</pre>
        </div>
      </section>
    </PageLayout>
  );
}

function RichTooltip() {
  const [visible, setVisible] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex" }} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <button className="btn btn-secondary">
        Plano Pro ⓘ
      </button>
      {visible && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)",
          background: "var(--color-surface)", border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)", padding: 16, width: 240,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)", zIndex: 999, pointerEvents: "none",
        }}>
          <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 14, color: "var(--color-primary)" }}>Plano Pro — R$ 49/mês</p>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 2 }}>
            <li>10 projetos simultâneos</li>
            <li>Até 10 usuários</li>
            <li>10GB de armazenamento</li>
            <li>Suporte prioritário</li>
          </ul>
        </div>
      )}
    </span>
  );
}
