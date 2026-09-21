"use client";
import { useState } from "react";
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

const CODE = `const [selected, setSelected] = useState("pro");
const options = [
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
];

{options.map((opt) => (
  <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
    <span style={{
      width: 18, height: 18, borderRadius: "50%",
      border: "2px solid " + (selected === opt.value ? "var(--color-primary)" : "var(--color-border)"),
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--glass-bg)", flexShrink: 0,
    }}>
      {selected === opt.value && (
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-primary)" }} />
      )}
    </span>
    <input type="radio" value={opt.value} checked={selected === opt.value}
      onChange={() => setSelected(opt.value)} style={{ display: "none" }} />
    {opt.label}
  </label>
))}`;

function Radio({ value, selected, onChange, label, disabled = false }: {
  value: string; selected: string; onChange: (v: string) => void; label: string; disabled?: boolean;
}) {
  const isSelected = selected === value;
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1 }}>
      <span style={{
        width: 18, height: 18, borderRadius: "50%",
        border: `2px solid ${isSelected ? "var(--color-primary)" : "var(--color-border)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--glass-bg)", flexShrink: 0, transition: "border-color 0.15s",
      }}>
        {isSelected && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-primary)" }} />}
      </span>
      <input type="radio" value={value} checked={isSelected} onChange={() => !disabled && onChange(value)} style={{ display: "none" }} />
      <span style={{ fontSize: 14 }}>{label}</span>
    </label>
  );
}

export default function RadioGroupsPage() {
  const { t } = useLang();
  const [plan, setPlan] = useState("pro");
  const [size, setSize] = useState("md");
  const [payment, setPayment] = useState("annual");
  const [layout, setLayout] = useState("left");

  const plans = [
    { value: "starter", label: "Starter — Grátis", desc: "1 projeto, 2 usuários, 10MB" },
    { value: "pro", label: "Pro — R$ 49/mês", desc: "10 projetos, 10 usuários, 10GB" },
    { value: "enterprise", label: "Enterprise — R$ 199/mês", desc: "Ilimitado, suporte dedicado" },
  ];

  return (
    <PageLayout
      title={t("radio_groups")}
      accentWord={t("radio_groups")}
      subtitle={t("radio_groups_desc")}
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Atoms", href: "/components/atoms/buttons" },
        { label: "Radio Groups" },
      ]}
      badge="ATOM"
    >
      {/* Basic vertical */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Vertical (padrão)" desc="Layout padrão para formulários e configurações." />
        <div className="glass-card" style={{ padding: 32, maxWidth: 360 }}>
          <p style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 600 }}>Tamanho da camiseta</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {["XS", "SM", "MD (padrão)", "LG", "XL"].map((s) => (
              <Radio key={s} value={s} selected={size} onChange={setSize} label={s} />
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: "var(--color-text-muted)" }}>Selecionado: <strong>{size}</strong></p>
        </div>
      </section>

      {/* Horizontal */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Horizontal" desc="Para opções binárias ou com poucas escolhas." />
        <div className="glass-card" style={{ padding: 32 }}>
          <p style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 600 }}>Cobrança</p>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[
              { value: "monthly", label: "Mensal" },
              { value: "annual", label: "Anual (−20%)" },
              { value: "biennial", label: "Bienal (−35%)" },
            ].map((opt) => (
              <Radio key={opt.value} value={opt.value} selected={payment} onChange={setPayment} label={opt.label} />
            ))}
          </div>
        </div>
      </section>

      {/* With description */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Com Descrição" desc="Ideal para seleção de planos ou escolhas com impacto." />
        <div className="glass-card" style={{ padding: 32, maxWidth: 480 }}>
          <p style={{ margin: "0 0 20px", fontSize: 13, fontWeight: 600 }}>Selecione um plano</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {plans.map((p, i) => (
              <label key={p.value} onClick={() => setPlan(p.value)} style={{
                display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 0",
                borderBottom: i < plans.length - 1 ? "1px solid var(--color-border)" : "none",
                cursor: "pointer",
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                  border: `2px solid ${plan === p.value ? "var(--color-primary)" : "var(--color-border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--glass-bg)", transition: "border-color 0.15s",
                }}>
                  {plan === p.value && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-primary)" }} />}
                </span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{p.label}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--color-text-muted)" }}>{p.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Card style */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Card Style" desc="Radios estilizados como cards para seleção visual rica." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { value: "left", label: "Alinhado à Esquerda", icon: "⫷" },
            { value: "center", label: "Centralizado", icon: "⏤" },
            { value: "right", label: "Alinhado à Direita", icon: "⫸" },
          ].map((opt) => (
            <label key={opt.value} onClick={() => setLayout(opt.value)} style={{ cursor: "pointer" }}>
              <div className="glass-card" style={{
                padding: 20, textAlign: "center",
                borderColor: layout === opt.value ? "var(--color-primary)" : "var(--color-border)",
                background: layout === opt.value ? "var(--color-primary-dim)" : undefined,
                transition: "all 0.15s",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{opt.icon}</div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: layout === opt.value ? 700 : 400 }}>{opt.label}</p>
                <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: "50%",
                    border: `2px solid ${layout === opt.value ? "var(--color-primary)" : "var(--color-border)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {layout === opt.value && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-primary)" }} />}
                  </span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Disabled */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Com Disabled" desc="Opções desabilitadas ficam em 40% de opacidade." />
        <div className="glass-card" style={{ padding: 32, maxWidth: 360 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Radio value="a" selected="a" onChange={() => {}} label="Opção disponível (selecionada)" />
            <Radio value="b" selected="a" onChange={() => {}} label="Opção disponível" />
            <Radio value="c" selected="a" onChange={() => {}} label="Opção indisponível" disabled />
            <Radio value="d" selected="a" onChange={() => {}} label="Requer upgrade" disabled />
          </div>
        </div>
      </section>

      {/* Code */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="06" title="Código" />
        <div className="code-block">
          <pre style={{ margin: 0, fontSize: 12 }}>{CODE}</pre>
        </div>
      </section>
    </PageLayout>
  );
}
