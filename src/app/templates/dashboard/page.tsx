import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

const KPI_CARDS = [
  { label: "Receita Mensal", value: "R$ 48.200", delta: "+12.4%", up: true, icon: "◆" },
  { label: "Usuários Ativos", value: "3.842", delta: "+8.7%", up: true, icon: "◐" },
  { label: "Conversão", value: "4.2%", delta: "-0.3%", up: false, icon: "▣" },
  { label: "Churn Rate", value: "1.8%", delta: "-0.5%", up: true, icon: "◇" },
];

const RECENT_USERS = [
  { name: "Ana Souza", email: "ana@empresa.com", plan: "Pro", status: "Ativo", statusCls: "pill-green" },
  { name: "Carlos Lima", email: "carlos@startup.io", plan: "Starter", status: "Trial", statusCls: "pill-blue" },
  { name: "Beatriz Costa", email: "bea@agencia.com", plan: "Enterprise", status: "Ativo", statusCls: "pill-green" },
  { name: "Rafael Mendes", email: "rafael@dev.br", plan: "Pro", status: "Inativo", statusCls: "pill-muted" },
  { name: "Julia Freitas", email: "julia@co.com", plan: "Starter", status: "Ativo", statusCls: "pill-green" },
];

const SIDEBAR_ITEMS = [
  { icon: "▣", label: "Dashboard", active: true },
  { icon: "◐", label: "Usuários", active: false },
  { icon: "◆", label: "Receita", active: false },
  { icon: "◇", label: "Analytics", active: false },
  { icon: "✦", label: "Configurações", active: false },
];

const CHART_BARS = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100];
const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function DashboardTemplatePage() {
  return (
    <PageLayout
      title="Dashboard"
      accentWord="Dashboard"
      subtitle="Template de painel administrativo — KPIs, tabela de usuários, gráfico e sidebar. Pronto para SaaS."
      breadcrumb={[
        { label: "Templates", href: "/templates" },
        { label: "Dashboard" },
      ]}
      badge="V3 · TEMPLATE"
    >
      {/* Dashboard mockup */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 16 }}>
          <span className="pill pill-green">PREVIEW</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "8px 0 4px", letterSpacing: -0.3 }}>
            Painel administrativo
          </h2>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>
            Layout com sidebar fixa, área de conteúdo e cards de KPI.
          </p>
        </div>

        {/* Mini dashboard layout */}
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: 24,
            overflow: "hidden",
            display: "flex",
            height: 440,
          }}
        >
          {/* Sidebar mini */}
          <div
            className="sidebar-glass"
            style={{
              width: 180,
              padding: "20px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 12px",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  background: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  color: "#0a0a0a",
                  fontSize: 11,
                  flexShrink: 0,
                }}
              >
                G
              </div>
              <span style={{ fontWeight: 800, fontSize: 12 }}>Admin Panel</span>
            </div>
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`sidebar-link${item.active ? " active" : ""}`}
                style={{ cursor: "default" }}
              >
                <span style={{ fontSize: 13 }}>{item.icon}</span>
                <span style={{ fontSize: 12 }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Main area */}
          <div
            style={{
              flex: 1,
              background: "var(--color-bg)",
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* KPI cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {KPI_CARDS.map((k) => (
                <div
                  key={k.label}
                  className="glass-card"
                  style={{ padding: "14px 16px", borderRadius: 14 }}
                >
                  <div style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
                    {k.label}
                  </div>
                  <div className="gradient-text" style={{ fontSize: 20, fontWeight: 900, letterSpacing: -0.5, marginBottom: 4 }}>
                    {k.value}
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: k.up ? "var(--color-success)" : "var(--color-error)",
                      background: k.up ? "rgba(16,185,129,0.1)" : "rgba(225,29,72,0.1)",
                      padding: "2px 6px",
                      borderRadius: 999,
                    }}
                  >
                    {k.delta}
                  </span>
                </div>
              ))}
            </div>

            {/* Mini chart */}
            <div
              className="glass-card"
              style={{ padding: "16px", borderRadius: 16, flex: 1 }}
            >
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Receita mensal</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 6,
                  height: 80,
                }}
              >
                {CHART_BARS.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: "4px 4px 0 0",
                      background: `linear-gradient(180deg, rgba(136,206,17,${0.4 + h * 0.005}) 0%, rgba(136,206,17,0.15) 100%)`,
                      border: "1px solid rgba(136,206,17,0.25)",
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                {MONTHS.map((m) => (
                  <span key={m} style={{ fontSize: 8, color: "var(--color-text-muted)", flex: 1, textAlign: "center" }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Users table */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 16 }}>
          <span className="pill pill-blue">TABELA</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "8px 0 4px", letterSpacing: -0.3 }}>
            Últimos usuários
          </h2>
        </div>
        <div className="glass-card" style={{ borderRadius: 20, overflow: "hidden" }}>
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 2fr 1fr 1fr",
              padding: "12px 20px",
              background: "var(--glass-bg-2)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            {["Usuário", "E-mail", "Plano", "Status"].map((col) => (
              <div key={col} style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: "var(--color-text-muted)" }}>
                {col}
              </div>
            ))}
          </div>
          {/* Rows */}
          {RECENT_USERS.map((user, i) => (
            <div
              key={user.email}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1fr 1fr",
                padding: "14px 20px",
                borderBottom: i < RECENT_USERS.length - 1 ? "1px solid var(--color-border)" : "none",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 13 }}>{user.name}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{user.email}</div>
              <div>
                <span className="pill pill-muted" style={{ fontSize: 10 }}>{user.plan}</span>
              </div>
              <div>
                <span className={`pill ${user.statusCls}`} style={{ fontSize: 10 }}>{user.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link href="/templates" className="btn btn-ghost btn-sm" style={{ display: "inline-flex" }}>
        ← Voltar aos Templates
      </Link>
    </PageLayout>
  );
}
