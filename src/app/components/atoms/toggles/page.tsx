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

const CODE_TOGGLE = `function Toggle({ checked, onChange, size = "md" }) {
  const sizes = {
    sm: { track: { width: 32, height: 18 }, thumb: { size: 12, offset: 2 } },
    md: { track: { width: 44, height: 24 }, thumb: { size: 18, offset: 3 } },
    lg: { track: { width: 56, height: 30 }, thumb: { size: 22, offset: 4 } },
  };
  const s = sizes[size];
  return (
    <span
      onClick={() => onChange(!checked)}
      style={{
        width: s.track.width, height: s.track.height,
        borderRadius: 999, cursor: "pointer",
        background: checked ? "var(--color-primary)" : "var(--color-border)",
        position: "relative", display: "inline-block",
        transition: "background 0.2s",
      }}
    >
      <span style={{
        position: "absolute",
        width: s.thumb.size, height: s.thumb.size,
        borderRadius: "50%", background: "#fff",
        top: s.thumb.offset,
        left: checked ? s.track.width - s.thumb.size - s.thumb.offset : s.thumb.offset,
        transition: "left 0.2s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
      }} />
    </span>
  );
}`;

function Toggle({ checked, onChange, size = "md", disabled = false }: {
  checked: boolean;
  onChange: (v: boolean) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}) {
  const sizes = {
    sm: { track: { width: 32, height: 18 }, thumb: { size: 12, offset: 3 } },
    md: { track: { width: 44, height: 24 }, thumb: { size: 18, offset: 3 } },
    lg: { track: { width: 56, height: 30 }, thumb: { size: 22, offset: 4 } },
  };
  const s = sizes[size];

  return (
    <span
      onClick={() => !disabled && onChange(!checked)}
      role="switch"
      aria-checked={checked}
      style={{
        width: s.track.width, height: s.track.height,
        borderRadius: 999,
        cursor: disabled ? "not-allowed" : "pointer",
        background: checked ? "var(--color-primary)" : "var(--color-surface-2)",
        border: `1px solid ${checked ? "var(--color-primary)" : "var(--color-border)"}`,
        position: "relative", display: "inline-block",
        transition: "background 0.2s, border-color 0.2s",
        opacity: disabled ? 0.4 : 1,
        flexShrink: 0,
      }}
    >
      <span style={{
        position: "absolute",
        width: s.thumb.size, height: s.thumb.size,
        borderRadius: "50%",
        background: checked ? "#000" : "var(--color-text-secondary)",
        top: s.thumb.offset,
        left: checked ? s.track.width - s.thumb.size - s.thumb.offset - 1 : s.thumb.offset,
        transition: "left 0.2s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
      }} />
    </span>
  );
}

export default function TogglesPage() {
  const [states, setStates] = useState({
    darkMode: true,
    notifications: false,
    analytics: true,
    beta: false,
  });

  const toggle = (key: keyof typeof states) => setStates((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <PageLayout
      title="Toggles"
      accentWord="Toggles"
      subtitle="Toggle switches para preferências e configurações on/off. Mais intuitivo que checkbox quando o contexto é binário e imediato."
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Atoms", href: "/components/atoms/buttons" },
        { label: "Toggles" },
      ]}
      badge="ATOM"
    >
      {/* States */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Estados" desc="Off, On (verde), Disabled off, Disabled on." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "center" }}>
            {[
              { label: "Off", checked: false, disabled: false },
              { label: "On", checked: true, disabled: false },
              { label: "Disabled Off", checked: false, disabled: true },
              { label: "Disabled On", checked: true, disabled: true },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Toggle checked={s.checked} onChange={() => {}} disabled={s.disabled} />
                <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Tamanhos" desc="SM (32px), MD padrão (44px), LG (56px)." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "center" }}>
            {(["sm", "md", "lg"] as const).map((s) => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Toggle checked={true} onChange={() => {}} size={s} />
                <span style={{ fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* With labels */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Com Label" desc="Layout padrão para telas de configurações." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          {[
            { key: "darkMode" as const, label: "Modo escuro", desc: "Interface escura para ambientes com pouca luz" },
            { key: "notifications" as const, label: "Notificações push", desc: "Receba alertas em tempo real no navegador" },
            { key: "analytics" as const, label: "Analytics de uso", desc: "Compartilhe dados anônimos para melhorar o produto" },
            { key: "beta" as const, label: "Acesso beta", desc: "Teste funcionalidades experimentais antes do lançamento" },
          ].map((item, idx) => (
            <div
              key={item.key}
              onClick={() => toggle(item.key)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "20px 28px",
                borderBottom: idx < 3 ? "1px solid var(--color-border)" : "none",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>{item.label}</p>
                <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--color-text-muted)" }}>{item.desc}</p>
              </div>
              <Toggle checked={states[item.key]} onChange={() => toggle(item.key)} />
            </div>
          ))}
        </div>
      </section>

      {/* Inline label */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Label Inline" desc="Toggle com texto à direita para contextos compactos." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Exibir linha de grade", state: true },
              { label: "Snap to grid", state: false },
              { label: "Regras visíveis", state: true },
            ].map((item) => (
              <label key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                <Toggle checked={item.state} onChange={() => {}} size="sm" />
                <span style={{ fontSize: 14 }}>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Code */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Código" />
        <div className="code-block">
          <pre style={{ margin: 0, fontSize: 12 }}>{CODE_TOGGLE}</pre>
        </div>
      </section>
    </PageLayout>
  );
}
