import PageLayout from "@/components/layout/PageLayout";

function SectionHeader({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <header style={{ marginBottom: 24 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--color-primary)",
          fontWeight: 700,
          letterSpacing: 0.2,
        }}
      >
        ── {number}
      </div>
      <h2 style={{ fontSize: 28, fontWeight: 800, margin: "8px 0 8px", letterSpacing: -0.5 }}>
        {title}
      </h2>
      <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: 14, maxWidth: 720 }}>
        {desc}
      </p>
    </header>
  );
}

// Minimal UI mockup for a web app card
function WebAppMockup() {
  return (
    <div
      style={{
        background: "#111",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Topbar */}
      <div
        style={{
          height: 44,
          background: "rgba(22,22,22,0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: "#88ce11",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 10,
            color: "#0a0a0a",
          }}
        >
          G
        </div>
        <div style={{ fontSize: 12, fontWeight: 700 }}>GAMA App</div>
        <span className="pill pill-green" style={{ marginLeft: "auto", fontSize: 10 }}>
          V3
        </span>
      </div>
      {/* Content area */}
      <div style={{ padding: 16, display: "flex", gap: 12 }}>
        {/* Sidebar */}
        <div
          style={{
            width: 56,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                height: 36,
                borderRadius: 8,
                background: i === 1 ? "var(--color-primary-dim)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${i === 1 ? "var(--color-border-green)" : "transparent"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                color: i === 1 ? "var(--color-primary)" : "var(--color-text-muted)",
              }}
            >
              {["◆", "◇", "●", "○"][i - 1]}
            </div>
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Glass card */}
          <div
            className="glass-card"
            style={{ padding: 14, borderRadius: 12 }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Dashboard</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  style={{
                    flex: 1,
                    height: 40,
                    borderRadius: 8,
                    background: n === 2 ? "var(--color-primary-dim)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${n === 2 ? "var(--color-border-green)" : "var(--color-border)"}`,
                  }}
                />
              ))}
            </div>
          </div>
          {/* Table rows */}
          {[1, 2].map((r) => (
            <div
              key={r}
              style={{
                height: 28,
                borderRadius: 8,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--color-border)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile mockup
function MobileMockup() {
  return (
    <div
      style={{
        width: 160,
        background: "#111",
        borderRadius: 24,
        overflow: "hidden",
        border: "1.5px solid rgba(255,255,255,0.12)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        margin: "0 auto",
      }}
    >
      {/* Notch */}
      <div
        style={{
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0d0d",
        }}
      >
        <div
          style={{
            width: 40,
            height: 10,
            borderRadius: 10,
            background: "#222",
          }}
        />
      </div>
      {/* Content */}
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: -0.3 }}>GAMA</div>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "#88ce11",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 9,
              color: "#0a0a0a",
            }}
          >
            G
          </div>
        </div>
        {/* CTA */}
        <div
          style={{
            height: 32,
            borderRadius: 10,
            background: "#88ce11",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 10,
            color: "#0a0a0a",
          }}
        >
          Explorar →
        </div>
        {/* Cards */}
        {[1, 2, 3].map((c) => (
          <div
            key={c}
            className="glass-subtle"
            style={{ height: 36, borderRadius: 8, padding: "0 10px", display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#88ce11",
                marginRight: 8,
              }}
            />
            <div
              style={{
                height: 6,
                borderRadius: 3,
                background: "rgba(255,255,255,0.1)",
                flex: 1,
              }}
            />
          </div>
        ))}
      </div>
      {/* Bottom bar */}
      <div
        style={{
          height: 32,
          background: "#0d0d0d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {["◆", "○", "◇"].map((icon) => (
          <div key={icon} style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}

const MOTION_APPLICATIONS = [
  {
    name: "Page Enter",
    cls: "page-enter",
    desc: "Fade + translateY na entrada de cada página — 600ms cubic-bezier(0.16,1,0.3,1).",
  },
  {
    name: "Staggered Reveal",
    cls: "fade-up fade-up-1...6",
    desc: "Cards e listas entram em cascata com delays de 100ms — cria ritmo e profundidade.",
  },
  {
    name: "Glass Hover",
    cls: "glass (hover state)",
    desc: "Blur sobe de 30px para 35px, background fica levemente mais opaco — resposta ao cursor.",
  },
  {
    name: "Pulse Green",
    cls: "animate-pulse-green",
    desc: "Box-shadow do logo pulsa entre 20px e 40px de spread — marca viva e dinâmica.",
  },
  {
    name: "Blob Float",
    cls: "bg-blob",
    desc: "Translação tridimensional orgânica nos blobs de fundo — sensação de profundidade constante.",
  },
  {
    name: "Liquid Refraction",
    cls: "glass (:active)",
    desc: "Brightness 1.02 e contrast 1.01 em 200ms ao clicar — vidro líquido reagindo ao toque.",
  },
];

export default function ApplicationsPage() {
  return (
    <PageLayout
      title="Aplicações"
      accentWord="Aplicações"
      subtitle="Como o GAMA DS V3 se manifesta nos diferentes contextos de produto — web, mobile e motion."
      breadcrumb={[
        { label: "Brand", href: "/brand/identity" },
        { label: "Applications" },
      ]}
      badge="V3 · BRAND"
    >
      {/* SECTION 01 — Digital */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="01"
          title="Aplicações Digitais"
          desc="Web app, mobile e interfaces híbridas — o design system escala para todos os formatos."
        />
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
          {/* Web app */}
          <div>
            <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span className="pill pill-green">Web App</span>
              <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                Dashboard / SaaS / Plataformas
              </span>
            </div>
            <WebAppMockup />
          </div>

          {/* Mobile */}
          <div>
            <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span className="pill pill-blue">Mobile</span>
              <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                iOS / Android
              </span>
            </div>
            <MobileMockup />
          </div>
        </div>
      </section>

      {/* SECTION 02 — Motion Applied */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="02"
          title="Motion Aplicado"
          desc="6 padrões de animação da marca em uso real — cada um com propósito específico."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {MOTION_APPLICATIONS.map((m) => (
            <div
              key={m.name}
              className="glass-illuminated"
              style={{ padding: 24, borderRadius: 18 }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-primary)",
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                .{m.cls}
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px" }}>{m.name}</h4>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--color-text-secondary)",
                  margin: 0,
                  lineHeight: 1.55,
                }}
              >
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 03 — Contexts */}
      <section style={{ marginBottom: 32 }}>
        <SectionHeader
          number="03"
          title="Contextos de Uso"
          desc="Diferentes produtos demandam diferentes configurações do design system."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {/* Web App */}
          <div
            className="glass-card vol-light"
            style={{ padding: 28, borderRadius: 20 }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "var(--color-primary-dim)",
                border: "1px solid var(--color-border-green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "var(--color-primary)",
                marginBottom: 16,
              }}
            >
              ▣
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 10px" }}>Web App</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "Todos os 5 glass variants",
                "Volumetric full stack",
                "Particle field em hero",
                "Sidebar + topnav glass",
                "Motion completo",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                  <span style={{ color: "var(--color-primary)", fontSize: 10 }}>✓</span>
                  <span style={{ color: "var(--color-text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div
            className="glass-card vol-light"
            style={{ padding: 28, borderRadius: 20 }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "var(--color-info)",
                marginBottom: 16,
              }}
            >
              ◐
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 10px" }}>Mobile</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "glass-subtle preferred",
                "Sem volumetric pesado",
                "Tokens dark/light",
                "Spacing compactado",
                "Reduced motion ok",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                  <span style={{ color: "var(--color-primary)", fontSize: 10 }}>✓</span>
                  <span style={{ color: "var(--color-text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Print */}
          <div
            className="glass-card"
            style={{ padding: 28, borderRadius: 20 }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "var(--color-warning)",
                marginBottom: 16,
              }}
            >
              ◇
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 10px" }}>Print</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                "Cores sólidas (#88ce11)",
                "Sem glass/blur",
                "Poppins 900 mantido",
                "Espaçamento ampliado",
                "Alta resolução logos",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                  <span style={{ color: "var(--color-primary)", fontSize: 10 }}>✓</span>
                  <span style={{ color: "var(--color-text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
