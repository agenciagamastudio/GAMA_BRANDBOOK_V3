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

const DATA = [
  { name: "Fernanda Oliveira", email: "fernanda@gama.io", role: "Designer", status: "active", joined: "12 Jan 2026", last: "Hoje" },
  { name: "Carlos Mendes", email: "carlos@gama.io", role: "Developer", status: "active", joined: "8 Mar 2026", last: "Ontem" },
  { name: "Ana Beatriz Costa", email: "ana@gama.io", role: "PM", status: "away", joined: "2 Fev 2026", last: "3 dias" },
  { name: "Roberto Faria", email: "roberto@gama.io", role: "QA", status: "active", joined: "20 Abr 2026", last: "Hoje" },
  { name: "Mariana Santos", email: "mariana@gama.io", role: "Designer", status: "inactive", joined: "15 Jan 2026", last: "30 dias" },
];

const COLORS = ["#88ce11", "#3b82f6", "#8b5cf6", "#f59e0b", "#e11d48"];

const STATUS_BADGE: Record<string, { cls: string; label: string }> = {
  active: { cls: "pill pill-green", label: "Ativo" },
  away: { cls: "pill pill-muted", label: "Ausente" },
  inactive: { cls: "pill", label: "Inativo" },
};

const CODE = `<table style={{ width: "100%", borderCollapse: "collapse" }}>
  <thead>
    <tr>
      {headers.map((h) => (
        <th style={{
          padding: "12px 16px", textAlign: "left",
          borderBottom: "1px solid var(--color-border)",
          color: "var(--color-text-muted)",
          fontSize: 11, textTransform: "uppercase", fontWeight: 700,
          position: "sticky", top: 0,
          background: "var(--color-surface)",
        }}>{h}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {rows.map((row, i) => (
      <tr style={{
        borderBottom: "1px solid var(--color-border)",
        background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
      }}>
        {/* cells */}
      </tr>
    ))}
  </tbody>
</table>`;

export default function TablesPage() {
  const { t } = useLang();
  return (
    <PageLayout
      title={t("tables")}
      accentWord={t("tables")}
      subtitle={t("tables_desc")}
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Organisms", href: "/components/organisms/tables" },
        { label: "Tables" },
      ]}
      badge="ORGANISM"
    >
      {/* Full table */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Tabela de Usuários" desc="Com avatar, status badge, ações e linhas striped." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          {/* Table header with search + actions */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Equipe</span>
              <span className="pill pill-muted">{DATA.length} membros</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", fontSize: 14 }}>🔍</span>
                <input className="input-field" placeholder="Buscar..." style={{ paddingLeft: 32, width: 200 }} />
              </div>
              <button className="btn btn-primary btn-sm">+ Convidar</button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead>
                <tr>
                  {[
                    { label: "Nome", sort: true },
                    { label: "Cargo", sort: false },
                    { label: "Status", sort: true },
                    { label: "Entrou em", sort: true },
                    { label: "Última atividade", sort: true },
                    { label: "Ações", sort: false },
                  ].map((h) => (
                    <th key={h.label} style={{
                      padding: "12px 16px", textAlign: "left",
                      borderBottom: "1px solid var(--color-border)",
                      color: "var(--color-text-muted)", fontSize: 11,
                      textTransform: "uppercase", fontWeight: 700, letterSpacing: 0.5,
                      background: "var(--color-surface)",
                      whiteSpace: "nowrap",
                    }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {h.label}
                        {h.sort && <span style={{ fontSize: 10, opacity: 0.5 }}>↕</span>}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DATA.map((row, i) => (
                  <tr key={row.email} style={{
                    borderBottom: "1px solid var(--color-border)",
                    background: i % 2 !== 0 ? "rgba(255,255,255,0.015)" : "transparent",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "rgba(136,206,17,0.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = i % 2 !== 0 ? "rgba(255,255,255,0.015)" : "transparent"; }}
                  >
                    <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${COLORS[i]}22`, border: `2px solid ${COLORS[i]}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: COLORS[i], flexShrink: 0 }}>
                          {row.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{row.name}</p>
                          <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-muted)" }}>{row.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--color-text-secondary)" }}>{row.role}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span className={STATUS_BADGE[row.status].cls} style={row.status === "inactive" ? { background: "rgba(255,255,255,0.05)", color: "var(--color-text-muted)" } : {}}>
                        {STATUS_BADGE[row.status].label}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--color-text-secondary)" }}>{row.joined}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--color-text-secondary)" }}>{row.last}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        {["✏️", "📋", "🗑️"].map((icon, j) => (
                          <button key={j} style={{ width: 32, height: 32, background: "var(--color-surface-2)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ padding: "14px 20px", borderTop: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>Exibindo 1–5 de 47 resultados</span>
            <div style={{ display: "flex", gap: 8 }}>
              {["←", "1", "2", "3", "...", "10", "→"].map((p, i) => (
                <button key={i} style={{
                  width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)",
                  background: p === "1" ? "var(--color-primary-dim)" : "var(--color-surface-2)",
                  color: p === "1" ? "var(--color-primary)" : "var(--color-text-secondary)",
                  fontSize: 13, fontWeight: p === "1" ? 700 : 400, cursor: "pointer",
                }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simple table */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Tabela Simples" desc="Sem avatar nem ações — apenas dados tabulados." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Token", "CSS Var", "Valor", "Preview"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)", fontSize: 11, textTransform: "uppercase", fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { token: "primary", var: "--color-primary", val: "#88CE11" },
                { token: "success", var: "--color-success", val: "#10B981" },
                { token: "warning", var: "--color-warning", val: "#F59E0B" },
                { token: "error", var: "--color-error", val: "#E11D48" },
                { token: "info", var: "--color-info", val: "#3B82F6" },
              ].map((row, i) => (
                <tr key={row.token} style={{ borderBottom: "1px solid var(--color-border)", background: i % 2 !== 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 14 }}>{row.token}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-primary)" }}>{row.var}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-text-secondary)" }}>{row.val}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ width: 24, height: 24, borderRadius: 4, background: row.val }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Code */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Código" />
        <div className="code-block">
          <pre style={{ margin: 0, fontSize: 12 }}>{CODE}</pre>
        </div>
      </section>
    </PageLayout>
  );
}
