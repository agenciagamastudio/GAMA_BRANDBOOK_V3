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

const ALERT_TYPES = [
  { type: "success", icon: "✓", label: "Sucesso", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", text: "var(--color-success)", title: "Operação realizada com sucesso!", desc: "Suas alterações foram salvas e estão visíveis para todos os usuários." },
  { type: "warning", icon: "⚠", label: "Atenção", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", text: "var(--color-warning)", title: "Ação requerida", desc: "Sua assinatura expira em 3 dias. Renove para manter o acesso." },
  { type: "error", icon: "✕", label: "Erro", bg: "rgba(225,29,72,0.1)", border: "rgba(225,29,72,0.3)", text: "var(--color-error)", title: "Falha ao processar pagamento", desc: "Cartão recusado. Verifique os dados ou use outro método de pagamento." },
  { type: "info", icon: "ℹ", label: "Info", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.3)", text: "var(--color-info)", title: "Atualização disponível", desc: "GAMA DS v3.1.0 está disponível com novos componentes e correções." },
];

const CODE = `function Alert({ type, title, message, dismissible, onDismiss }) {
  const styles = {
    success: { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", color: "var(--color-success)" },
    error: { bg: "rgba(225,29,72,0.1)", border: "rgba(225,29,72,0.3)", color: "var(--color-error)" },
    warning: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", color: "var(--color-warning)" },
    info: { bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.3)", color: "var(--color-info)" },
  };
  const s = styles[type];
  return (
    <div style={{
      background: s.bg, border: "1px solid " + s.border,
      borderLeft: "3px solid " + s.color,
      borderRadius: "var(--radius-md)", padding: "14px 16px",
      display: "flex", gap: 12, alignItems: "flex-start",
    }}>
      <span style={{ color: s.color, fontSize: 16, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 700, color: s.color }}>{title}</p>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--color-text-secondary)" }}>{message}</p>
      </div>
      {dismissible && <button onClick={onDismiss}>×</button>}
    </div>
  );
}`;

export default function AlertsPage() {
  const { t } = useLang();
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const dismiss = (type: string) => setDismissed((prev) => ({ ...prev, [type]: true }));

  return (
    <PageLayout
      title={t("alerts")}
      accentWord={t("alerts")}
      subtitle={t("alerts_desc")}
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Molecules", href: "/components/molecules/cards" },
        { label: "Alerts" },
      ]}
      badge="MOLECULE"
    >
      {/* Semantic variants */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Variantes Semânticas" desc="4 tipos — cada um com ícone, cor e significado distintos." />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ALERT_TYPES.map((a) => (
            <div key={a.type} style={{
              background: a.bg, border: `1px solid ${a.border}`,
              borderLeft: `3px solid ${a.text}`,
              borderRadius: "var(--radius-md)", padding: "14px 18px",
              display: "flex", gap: 14, alignItems: "flex-start",
            }}>
              <span style={{ color: a.text, fontSize: 18, flexShrink: 0, lineHeight: 1.2 }}>{a.icon}</span>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: a.text, fontSize: 14 }}>{a.title}</p>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--color-text-secondary)" }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dismissible */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Dismissível" desc="Botão × fecha o alerta via useState. Pode ser restaurado abaixo." />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ALERT_TYPES.map((a) => (
            dismissed[a.type] ? null : (
              <div key={a.type} style={{
                background: a.bg, border: `1px solid ${a.border}`,
                borderLeft: `3px solid ${a.text}`,
                borderRadius: "var(--radius-md)", padding: "14px 18px",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <span style={{ color: a.text, fontSize: 18, flexShrink: 0, lineHeight: 1.2 }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 700, color: a.text, fontSize: 14 }}>{a.title}</p>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--color-text-secondary)" }}>{a.desc}</p>
                </div>
                <button onClick={() => dismiss(a.type)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", fontSize: 18, padding: 0, lineHeight: 1, flexShrink: 0 }}>×</button>
              </div>
            )
          ))}
          {Object.values(dismissed).some(Boolean) && (
            <button className="btn btn-ghost btn-sm" onClick={() => setDismissed({})}>↩ Restaurar todos</button>
          )}
        </div>
      </section>

      {/* Banner */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Banner" desc="Alerta de largura total — geralmente no topo da página." />
        {!bannerDismissed && (
          <div style={{
            background: "rgba(136,206,17,0.1)", border: "1px solid rgba(136,206,17,0.25)",
            borderRadius: "var(--radius-md)", padding: "14px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 18 }}>🎉</span>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>GAMA DS V3 lançado! </span>
                <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Novos componentes, performance 40% melhor e dark mode completo.</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
              <button className="btn btn-primary btn-sm">Ver novidades</button>
              <button onClick={() => setBannerDismissed(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", fontSize: 18, padding: 0 }}>×</button>
            </div>
          </div>
        )}
        {bannerDismissed && (
          <button className="btn btn-ghost btn-sm" onClick={() => setBannerDismissed(false)}>↩ Restaurar banner</button>
        )}
      </section>

      {/* Inline small */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Inline (compacto)" desc="Para validação de campos em formulários." />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { text: "Email já cadastrado. Faça login.", color: "var(--color-warning)", icon: "⚠" },
            { text: "Senha deve ter mínimo 8 caracteres.", color: "var(--color-error)", icon: "✕" },
            { text: "Username disponível!", color: "var(--color-success)", icon: "✓" },
          ].map((n) => (
            <p key={n.text} style={{ margin: 0, fontSize: 12, color: n.color, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11 }}>{n.icon}</span>
              {n.text}
            </p>
          ))}
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
