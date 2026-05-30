import PageLayout from "@/components/layout/PageLayout";

const SETTINGS_SECTIONS = [
  {
    icon: "◑",
    title: "Aparência",
    desc: "Tema, modo de cor e densidade visual da interface.",
    items: ["Tema (Dark / Light)", "Densidade compacta / confortável", "Animações (ativar / desativar)"],
    pill: "Em breve",
    pillCls: "pill-muted",
  },
  {
    icon: "◐",
    title: "Tokens & Design",
    desc: "Exportação de tokens, configuração de paleta e variáveis CSS.",
    items: ["Exportar tokens.json", "Configurar escala de espaçamento", "Paleta customizada"],
    pill: "Em breve",
    pillCls: "pill-muted",
  },
  {
    icon: "◆",
    title: "Idioma",
    desc: "Seleção de idioma padrão para labels e documentação.",
    items: ["Português (BR) — padrão", "English (US)", "Auto-detect via browser"],
    pill: "PT/EN",
    pillCls: "pill-green",
  },
  {
    icon: "▣",
    title: "Integrações",
    desc: "Figma, Storybook e ferramentas de design conectadas ao DS.",
    items: ["Token Studio (Figma)", "Storybook export", "GitHub sync"],
    pill: "Em breve",
    pillCls: "pill-muted",
  },
];

export default function SettingsPage() {
  return (
    <PageLayout
      title="Configurações"
      accentWord="Configurações"
      subtitle="Personalize o Design System — aparência, tokens, idioma e integrações."
      breadcrumb={[{ label: "Configurações" }]}
      badge="V3 · SETTINGS"
    >
      {/* Em desenvolvimento banner */}
      <div
        className="glass-illuminated liquid-edge"
        style={{
          padding: "28px 32px",
          borderRadius: 20,
          marginBottom: 40,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "var(--color-primary-dim)",
            border: "1px solid var(--color-border-green)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            color: "var(--color-primary)",
            flexShrink: 0,
          }}
        >
          ⚙
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>
            Painel de configurações em desenvolvimento
          </h2>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>
            As seções abaixo mostram o que está planejado. Funcionalidades serão liberadas progressivamente.
          </p>
        </div>
        <span className="pill pill-green" style={{ marginLeft: "auto", flexShrink: 0 }}>
          Roadmap
        </span>
      </div>

      {/* Settings grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }}
      >
        {SETTINGS_SECTIONS.map((s) => (
          <div
            key={s.title}
            className="glass-card"
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
                fontWeight: 900,
                marginBottom: 16,
              }}
            >
              {s.icon}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{s.title}</h3>
              <span className={`pill ${s.pillCls}`} style={{ fontSize: 11, flexShrink: 0 }}>
                {s.pill}
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--color-text-secondary)",
                margin: "0 0 16px",
                lineHeight: 1.6,
              }}
            >
              {s.desc}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {s.items.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 0",
                    borderTop: "1px solid var(--color-border)",
                    fontSize: 13,
                    color: "var(--color-text-muted)",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--color-primary)",
                      flexShrink: 0,
                      opacity: 0.5,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Version info */}
      <div
        className="glass-subtle"
        style={{
          padding: "20px 24px",
          borderRadius: 14,
          marginTop: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              color: "#0a0a0a",
              fontSize: 13,
            }}
          >
            G
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>GAMA Design System</div>
            <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Versão 3.0.0 — Tokenizado · Dark + Light · PT/EN</div>
          </div>
        </div>
        <span
          className="pill pill-green"
          style={{ fontSize: 11 }}
        >
          V3.0
        </span>
      </div>
    </PageLayout>
  );
}
