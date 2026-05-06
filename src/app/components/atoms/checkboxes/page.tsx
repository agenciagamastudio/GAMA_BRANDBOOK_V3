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

const checkboxCSS = `/* globals.css */
.checkbox-custom {
  appearance: none;
  width: 18px; height: 18px;
  border: 2px solid var(--color-border);
  border-radius: 4px;
  background: var(--glass-bg);
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}
.checkbox-custom:checked {
  background: var(--color-primary);
  border-color: var(--color-primary);
}
.checkbox-custom:checked::after {
  content: "✓";
  display: block;
  text-align: center;
  color: #000;
  font-size: 12px;
  font-weight: 900;
  line-height: 14px;
}`;

const CODE_USAGE = `const [checked, setChecked] = useState(false);

<label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => setChecked(e.target.checked)}
    style={checkboxStyle}
  />
  Opção de exemplo
</label>`;

function Checkbox({ label, checked, onChange, disabled = false, indeterminate = false }: {
  label: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
}) {
  const baseStyle: React.CSSProperties = {
    appearance: "none" as const,
    WebkitAppearance: "none",
    width: 18, height: 18,
    border: `2px solid ${checked ? "var(--color-primary)" : "var(--color-border)"}`,
    borderRadius: 4,
    background: checked ? "var(--color-primary)" : "var(--glass-bg)",
    cursor: disabled ? "not-allowed" : "pointer",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
    position: "relative",
    opacity: disabled ? 0.4 : 1,
  };

  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      <span style={{ ...baseStyle, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {indeterminate && !checked && (
          <span style={{ width: 8, height: 2, background: "var(--color-text-muted)", display: "block", borderRadius: 1 }} />
        )}
        {checked && <span style={{ color: "#000", fontSize: 11, fontWeight: 900, lineHeight: 1 }}>✓</span>}
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
      />
      <span style={{ fontSize: 14, color: "var(--color-text)" }}>{label}</span>
    </label>
  );
}

export default function CheckboxesPage() {
  const [single, setSingle] = useState(false);
  const [items, setItems] = useState([
    { label: "Design tokens documentados", checked: true },
    { label: "Componentes base criados", checked: true },
    { label: "Testes de acessibilidade", checked: false },
    { label: "Deploy em produção", checked: false },
  ]);

  const allChecked = items.every((i) => i.checked);
  const someChecked = items.some((i) => i.checked) && !allChecked;

  const toggleAll = (v: boolean) => setItems((prev) => prev.map((i) => ({ ...i, checked: v })));
  const toggleItem = (idx: number, v: boolean) => setItems((prev) => prev.map((i, n) => n === idx ? { ...i, checked: v } : i));

  return (
    <PageLayout
      title="Checkboxes"
      accentWord="Checkboxes"
      subtitle="Checkboxes permitem seleção de múltiplas opções independentes. Construídos com CSS customizado para consistência visual."
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Atoms", href: "/components/atoms/buttons" },
        { label: "Checkboxes" },
      ]}
      badge="ATOM"
    >
      {/* States */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Estados" desc="Default, checked, indeterminate e disabled." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Checkbox label="Default (unchecked)" checked={false} />
              <Checkbox label="Checked" checked={true} />
              <Checkbox label="Indeterminate" checked={false} indeterminate={true} />
              <Checkbox label="Disabled unchecked" checked={false} disabled={true} />
              <Checkbox label="Disabled checked" checked={true} disabled={true} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--color-text-muted)", fontWeight: 600 }}>Interativo</p>
              <Checkbox label={single ? "Selecionado ✓" : "Clique para selecionar"} checked={single} onChange={setSingle} />
            </div>
          </div>
        </div>
      </section>

      {/* Group with select all */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Grupo com Selecionar Todos" desc="Padrão para listas de tarefas, filtros e seleção múltipla." />
        <div className="glass-card" style={{ padding: 32, maxWidth: 400 }}>
          <div style={{ paddingBottom: 16, marginBottom: 16, borderBottom: "1px solid var(--color-border)" }}>
            <Checkbox
              label={allChecked ? "Desmarcar todos" : "Selecionar todos"}
              checked={allChecked}
              indeterminate={someChecked}
              onChange={toggleAll}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {items.map((item, idx) => (
              <Checkbox
                key={item.label}
                label={item.label}
                checked={item.checked}
                onChange={(v) => toggleItem(idx, v)}
              />
            ))}
          </div>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--color-border)", fontSize: 13, color: "var(--color-text-muted)" }}>
            {items.filter((i) => i.checked).length} de {items.length} selecionados
          </div>
        </div>
      </section>

      {/* Card style checkboxes */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Card Style" desc="Checkboxes estilizados como cards para escolha de planos ou opções." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "Starter", desc: "1 projeto, 2 usuários", price: "Grátis" },
            { label: "Pro", desc: "10 projetos, 10 usuários", price: "R$ 49/mês", selected: true },
            { label: "Enterprise", desc: "Ilimitado", price: "R$ 199/mês" },
          ].map((opt) => (
            <label key={opt.label} style={{ cursor: "pointer" }}>
              <div className="glass-card" style={{ padding: 20, borderColor: opt.selected ? "var(--color-primary)" : "var(--color-border)", background: opt.selected ? "var(--color-primary-dim)" : undefined }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{opt.label}</span>
                  <span style={{ width: 18, height: 18, borderRadius: 4, background: opt.selected ? "var(--color-primary)" : "transparent", border: `2px solid ${opt.selected ? "var(--color-primary)" : "var(--color-border)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#000", fontWeight: 900 }}>
                    {opt.selected ? "✓" : ""}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 8px" }}>{opt.desc}</p>
                <span className="pill pill-green" style={{ fontSize: 11 }}>{opt.price}</span>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* CSS + Code */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Implementação" desc="CSS customizado + JSX para estilização consistente." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8, fontFamily: "var(--font-mono)" }}>CSS</p>
            <div className="code-block">
              <pre style={{ margin: 0, fontSize: 12 }}>{checkboxCSS}</pre>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8, fontFamily: "var(--font-mono)" }}>JSX</p>
            <div className="code-block">
              <pre style={{ margin: 0, fontSize: 12 }}>{CODE_USAGE}</pre>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
