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

function Field({ label, children, helper, error, required }: {
  label: string; children: React.ReactNode; helper?: string; error?: string; required?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, display: "flex", gap: 4 }}>
        {label}
        {required && <span style={{ color: "var(--color-error)", fontSize: 12 }}>*</span>}
      </label>
      {children}
      {error && <p style={{ margin: 0, fontSize: 12, color: "var(--color-error)" }}>{error}</p>}
      {helper && !error && <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-muted)" }}>{helper}</p>}
    </div>
  );
}

const CODE = `function Field({ label, error, helper, required, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600 }}>
        {label} {required && <span style={{ color: "var(--color-error)" }}>*</span>}
      </label>
      {children}
      {error && <p style={{ fontSize: 12, color: "var(--color-error)" }}>{error}</p>}
      {helper && !error && <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{helper}</p>}
    </div>
  );
}

// Usage
<Field label="Email" required helper="Nunca compartilhamos." error={emailError}>
  <input className="input-field"
    style={{ borderColor: emailError ? "var(--color-error)" : undefined }} />
</Field>`;

export default function FormFieldsPage() {
  return (
    <PageLayout
      title="Form Fields"
      accentWord="Form Fields"
      subtitle="Componentes de formulário completos: label + input + helper + error. Blocos reutilizáveis para qualquer formulário do sistema."
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Molecules", href: "/components/molecules/cards" },
        { label: "Form Fields" },
      ]}
      badge="MOLECULE"
    >
      {/* Field types */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Tipos de Campo" desc="Text, Email, Password, Select, Textarea — todos com label e helper." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <Field label="Nome completo" required helper="Como aparecerá no seu perfil.">
              <input className="input-field" type="text" placeholder="João da Silva" />
            </Field>
            <Field label="Email" required helper="Nunca compartilhamos seu email.">
              <input className="input-field" type="email" placeholder="joao@empresa.com" />
            </Field>
            <Field label="Senha" required helper="Mínimo 8 caracteres, 1 número.">
              <div style={{ position: "relative" }}>
                <input className="input-field" type="password" placeholder="••••••••" style={{ width: "100%", paddingRight: 40 }} />
                <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", cursor: "pointer", fontSize: 16 }}>👁</span>
              </div>
            </Field>
            <Field label="Cargo" helper="Selecione o cargo mais próximo do seu.">
              <select className="input-field" style={{ cursor: "pointer" }}>
                <option value="">Selecione um cargo...</option>
                <option>Designer</option>
                <option>Desenvolvedor</option>
                <option>Product Manager</option>
                <option>QA Engineer</option>
              </select>
            </Field>
            <Field label="Bio" helper="Máximo 280 caracteres.">
              <textarea className="input-field" rows={3} placeholder="Conte um pouco sobre você..." style={{ resize: "vertical", fontFamily: "inherit" }} />
            </Field>
            <Field label="Website">
              <div style={{ display: "flex" }}>
                <span style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)", borderRight: "none", borderRadius: "var(--radius-md) 0 0 var(--radius-md)", padding: "0 12px", display: "flex", alignItems: "center", fontSize: 13, color: "var(--color-text-muted)" }}>
                  https://
                </span>
                <input className="input-field" type="text" placeholder="seusite.com" style={{ borderRadius: "0 var(--radius-md) var(--radius-md) 0" }} />
              </div>
            </Field>
          </div>
        </div>
      </section>

      {/* Validation states */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Estados de Validação" desc="Default, error e success — todos com mensagem contextual." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            <Field label="Username" helper="Apenas letras, números e _.">
              <input className="input-field" type="text" defaultValue="" placeholder="@username" />
            </Field>
            <Field label="Username (erro)" error="Este username já está em uso.">
              <input className="input-field" type="text" defaultValue="joaosilva" style={{ borderColor: "var(--color-error)" }} />
            </Field>
            <Field label="Username (válido)" helper="Disponível! ✓">
              <input className="input-field" type="text" defaultValue="joao.silva.2026" style={{ borderColor: "var(--color-success)" }} />
            </Field>
          </div>
        </div>
      </section>

      {/* Full login form */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Formulário Completo — Login" desc="Exemplo real usando os form fields compostos." />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="glass-card" style={{ padding: 40, width: 420 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800 }}>Entrar</h3>
            <p style={{ margin: "0 0 28px", fontSize: 14, color: "var(--color-text-muted)" }}>Acesse sua conta GAMA</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Field label="Email" required>
                <input className="input-field" type="email" placeholder="nome@empresa.com" />
              </Field>
              <Field label="Senha" required>
                <div style={{ position: "relative" }}>
                  <input className="input-field" type="password" placeholder="••••••••" style={{ width: "100%", paddingRight: 40 }} />
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", cursor: "pointer", fontSize: 16 }}>👁</span>
                </div>
              </Field>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer", fontSize: 13 }}>
                  <input type="checkbox" /> Lembrar de mim
                </label>
                <a href="#" style={{ fontSize: 13, color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>Esqueceu a senha?</a>
              </div>

              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Entrar</button>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
                <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>OU</span>
                <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
              </div>

              <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>G</span>
                Continuar com Google
              </button>
            </div>

            <p style={{ marginTop: 24, textAlign: "center", fontSize: 13, color: "var(--color-text-muted)" }}>
              Não tem conta?{" "}
              <a href="#" style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}>Criar conta grátis</a>
            </p>
          </div>
        </div>
      </section>

      {/* Code */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Código" />
        <div className="code-block">
          <pre style={{ margin: 0, fontSize: 12 }}>{CODE}</pre>
        </div>
      </section>
    </PageLayout>
  );
}
