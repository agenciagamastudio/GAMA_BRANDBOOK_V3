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

const CODE_BASIC = `<input
  className="input-field"
  type="text"
  placeholder="Placeholder text"
/>`;

const CODE_STATES = `{/* Error */}
<input className="input-field" style={{ borderColor: "var(--color-error)" }} />
<p style={{ color: "var(--color-error)", fontSize: 12 }}>Mensagem de erro</p>

{/* Success */}
<input className="input-field" style={{ borderColor: "var(--color-success)" }} />
<p style={{ color: "var(--color-success)", fontSize: 12 }}>Campo válido</p>

{/* Disabled */}
<input className="input-field" disabled style={{ opacity: 0.4 }} />`;

export default function InputsPage() {
  const { t } = useLang();
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    color: "var(--color-text)",
  };
  const descStyle: React.CSSProperties = {
    fontSize: 12,
    color: "var(--color-text-muted)",
    marginTop: 6,
  };
  const fieldWrap: React.CSSProperties = { marginBottom: 0 };

  return (
    <PageLayout
      title={t("inputs")}
      accentWord={t("inputs")}
      subtitle={t("inputs_desc")}
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Atoms", href: "/components/atoms/buttons" },
        { label: "Inputs" },
      ]}
      badge="ATOM"
    >
      {/* Default state */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Estado Padrão" desc="O input-field base — aplica glass subtle, borda tokenizada e foco em verde." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={fieldWrap}>
              <label style={labelStyle}>Nome completo</label>
              <input className="input-field" type="text" placeholder="ex: João da Silva" style={{ width: "100%" }} />
              <p style={descStyle}>Usado para identificação no sistema.</p>
            </div>
            <div style={fieldWrap}>
              <label style={labelStyle}>Email</label>
              <input className="input-field" type="email" placeholder="nome@empresa.com" style={{ width: "100%" }} />
              <p style={descStyle}>Nunca compartilhamos seu email.</p>
            </div>
          </div>
        </div>
        <div className="code-block" style={{ marginTop: 16 }}>
          <pre style={{ margin: 0, fontSize: 13 }}>{CODE_BASIC}</pre>
        </div>
      </section>

      {/* States */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Estados" desc="Default, error, success e disabled — cada um com feedback visual claro." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={fieldWrap}>
              <label style={labelStyle}>Default</label>
              <input className="input-field" type="text" defaultValue="" placeholder="Digite algo..." style={{ width: "100%" }} />
              <p style={descStyle}>Estado neutro antes de interação.</p>
            </div>
            <div style={fieldWrap}>
              <label style={labelStyle}>Focused (simulado)</label>
              <input className="input-field" type="text" defaultValue="Texto em foco" style={{ width: "100%", borderColor: "var(--color-primary)", boxShadow: "0 0 0 3px var(--color-primary-dim)" }} />
              <p style={descStyle}>Borda verde + glow ao focar.</p>
            </div>
            <div style={fieldWrap}>
              <label style={labelStyle}>Error</label>
              <input className="input-field" type="email" defaultValue="email-invalido" style={{ width: "100%", borderColor: "var(--color-error)" }} />
              <p style={{ fontSize: 12, color: "var(--color-error)", marginTop: 6 }}>Email inválido. Verifique o formato.</p>
            </div>
            <div style={fieldWrap}>
              <label style={labelStyle}>Success</label>
              <input className="input-field" type="text" defaultValue="joao@empresa.com" style={{ width: "100%", borderColor: "var(--color-success)" }} />
              <p style={{ fontSize: 12, color: "var(--color-success)", marginTop: 6 }}>Email disponível! ✓</p>
            </div>
            <div style={fieldWrap}>
              <label style={{ ...labelStyle, opacity: 0.4 }}>Disabled</label>
              <input className="input-field" type="text" disabled defaultValue="Campo desabilitado" style={{ width: "100%", opacity: 0.4, cursor: "not-allowed" }} />
              <p style={{ ...descStyle, opacity: 0.4 }}>Usuário não pode editar.</p>
            </div>
            <div style={fieldWrap}>
              <label style={labelStyle}>Read Only</label>
              <input className="input-field" type="text" readOnly defaultValue="Somente leitura" style={{ width: "100%", cursor: "default" }} />
              <p style={descStyle}>Exibe valor sem edição.</p>
            </div>
          </div>
        </div>
        <div className="code-block" style={{ marginTop: 16 }}>
          <pre style={{ margin: 0, fontSize: 13 }}>{CODE_STATES}</pre>
        </div>
      </section>

      {/* Textarea */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Textarea" desc="Para textos longos. Mesmo padrão visual do input-field." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={fieldWrap}>
            <label style={labelStyle}>Descrição do projeto</label>
            <textarea
              className="input-field"
              rows={4}
              placeholder="Descreva o projeto em detalhes..."
              style={{ width: "100%", resize: "vertical", fontFamily: "inherit" }}
            />
            <p style={descStyle}>Máximo 500 caracteres. Seja objetivo.</p>
          </div>
        </div>
      </section>

      {/* With icons */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Com Ícone" desc="Use position relative/absolute para adicionar ícones." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={fieldWrap}>
              <label style={labelStyle}>Busca</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", fontSize: 16, pointerEvents: "none" }}>🔍</span>
                <input className="input-field" type="search" placeholder="Buscar componente..." style={{ width: "100%", paddingLeft: 38 }} />
              </div>
            </div>
            <div style={fieldWrap}>
              <label style={labelStyle}>Senha</label>
              <div style={{ position: "relative" }}>
                <input className="input-field" type="password" defaultValue="senhasegura123" style={{ width: "100%", paddingRight: 40 }} />
                <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", cursor: "pointer", fontSize: 16 }}>👁</span>
              </div>
            </div>
            <div style={fieldWrap}>
              <label style={labelStyle}>URL</label>
              <div style={{ display: "flex" }}>
                <span style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)", borderRight: "none", borderRadius: "var(--radius-md) 0 0 var(--radius-md)", padding: "0 12px", display: "flex", alignItems: "center", fontSize: 13, color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
                  https://
                </span>
                <input className="input-field" type="text" placeholder="seusite.com" style={{ borderRadius: "0 var(--radius-md) var(--radius-md) 0", width: "100%" }} />
              </div>
            </div>
            <div style={fieldWrap}>
              <label style={labelStyle}>Valor monetário</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", fontSize: 14, fontWeight: 700 }}>R$</span>
                <input className="input-field" type="number" placeholder="0,00" style={{ width: "100%", paddingLeft: 38 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Tamanhos" desc="Customize padding e font-size via inline style." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Small", style: { padding: "6px 12px", fontSize: 12 } as React.CSSProperties },
              { label: "Medium (default)", style: {} as React.CSSProperties },
              { label: "Large", style: { padding: "14px 18px", fontSize: 16 } as React.CSSProperties },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ width: 140, fontSize: 12, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{s.label}</span>
                <input className="input-field" placeholder={s.label} style={{ ...s.style, width: 280 }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
