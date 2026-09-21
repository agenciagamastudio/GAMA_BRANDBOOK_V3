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

const CODE = `function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
      }} />
      {/* Dialog */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        width: "min(560px, 90vw)",
        zIndex: 1001,
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
      }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between" }}>
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </>
  );
}`;

function Overlay({ onClose }: { onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)", zIndex: 1000 }} />
  );
}

function ModalShell({ title, children, onClose, size = "md" }: {
  title: string; children: React.ReactNode; onClose: () => void; size?: "sm" | "md" | "lg" | "full";
}) {
  const widths = { sm: 400, md: 560, lg: 800, full: "95vw" };
  return (
    <>
      <Overlay onClose={onClose} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        background: "var(--color-surface)", border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)", width: `min(${widths[size]}px, 92vw)`,
        maxHeight: "85vh", display: "flex", flexDirection: "column",
        zIndex: 1001, boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
        overflowY: size === "full" ? "auto" : undefined,
      }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "var(--color-text-muted)", lineHeight: 1, padding: 0, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-sm)" }}>×</button>
        </div>
        <div style={{ padding: 24, overflowY: "auto" }}>{children}</div>
      </div>
    </>
  );
}

export default function ModalsPage() {
  const { t } = useLang();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <PageLayout
      title={t("modals")}
      accentWord={t("modals")}
      subtitle={t("modals_desc")}
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Organisms", href: "/components/organisms/tables" },
        { label: "Modals" },
      ]}
      badge="ORGANISM"
    >
      {/* Modals */}
      {open === "confirm" && (
        <ModalShell title="Confirmar exclusão" onClose={() => setOpen(null)} size="sm">
          <p style={{ margin: "0 0 24px", color: "var(--color-text-secondary)", fontSize: 14, lineHeight: 1.7 }}>
            Você está prestes a excluir o projeto <strong>"GAMA DS V3"</strong>. Esta ação é <strong style={{ color: "var(--color-error)" }}>irreversível</strong> e todos os dados serão perdidos.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button className="btn btn-ghost" onClick={() => setOpen(null)}>Cancelar</button>
            <button className="btn btn-destructive" onClick={() => setOpen(null)}>Sim, excluir</button>
          </div>
        </ModalShell>
      )}

      {open === "form" && (
        <ModalShell title="Criar novo projeto" onClose={() => setOpen(null)} size="md">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Nome do projeto *</label>
              <input className="input-field" placeholder="ex: GAMA DS V4" style={{ width: "100%" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Descrição</label>
              <textarea className="input-field" rows={3} placeholder="Descreva o projeto..." style={{ width: "100%", fontFamily: "inherit", resize: "vertical" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Visibilidade</label>
              <select className="input-field" style={{ width: "100%" }}>
                <option>Privado (só você)</option>
                <option>Equipe</option>
                <option>Público</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--color-border)" }}>
            <button className="btn btn-ghost" onClick={() => setOpen(null)}>Cancelar</button>
            <button className="btn btn-primary" onClick={() => setOpen(null)}>Criar projeto</button>
          </div>
        </ModalShell>
      )}

      {open === "large" && (
        <ModalShell title="Termos de Uso" onClose={() => setOpen(null)} size="lg">
          <div style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.8 }}>
            <h3 style={{ color: "var(--color-text)", marginTop: 0 }}>1. Aceitação dos Termos</h3>
            <p>Ao acessar ou utilizar o GAMA Design System, você concorda com estes termos de uso. Se você não concordar, não utilize o sistema.</p>
            <h3 style={{ color: "var(--color-text)" }}>2. Licença de Uso</h3>
            <p>Concedemos a você uma licença não exclusiva, não transferível e revogável para utilizar os componentes e tokens do GAMA DS nos seus projetos.</p>
            <h3 style={{ color: "var(--color-text)" }}>3. Propriedade Intelectual</h3>
            <p>Todos os direitos de propriedade intelectual relativos ao GAMA DS pertencem à Gama Agency. Os tokens de design, componentes e documentação são protegidos por direito autoral.</p>
            <h3 style={{ color: "var(--color-text)" }}>4. Uso Permitido</h3>
            <p>Você pode: usar em projetos comerciais, modificar os componentes, distribuir produtos derivados com atribuição adequada.</p>
            <h3 style={{ color: "var(--color-text)" }}>5. Uso Proibido</h3>
            <p>Você não pode: revender o sistema, remover atribuições de autoria, usar para criar sistemas de design concorrentes sem permissão.</p>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--color-border)" }}>
            <button className="btn btn-ghost" onClick={() => setOpen(null)}>Recusar</button>
            <button className="btn btn-primary" onClick={() => setOpen(null)}>Aceitar termos</button>
          </div>
        </ModalShell>
      )}

      {/* Triggers */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Variantes" desc="Confirmação simples, formulário e conteúdo longo." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div>
              <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--color-text-muted)" }}>Confirmação</p>
              <button className="btn btn-destructive" onClick={() => setOpen("confirm")}>Excluir projeto</button>
            </div>
            <div>
              <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--color-text-muted)" }}>Formulário</p>
              <button className="btn btn-primary" onClick={() => setOpen("form")}>Criar projeto</button>
            </div>
            <div>
              <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--color-text-muted)" }}>Grande</p>
              <button className="btn btn-secondary" onClick={() => setOpen("large")}>Ver termos</button>
            </div>
          </div>
        </div>
      </section>

      {/* Anatomy */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Anatomia" desc="Overlay + Dialog com Header, Body e Footer." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", background: "rgba(136,206,17,0.05)", borderBottom: "2px dashed rgba(136,206,17,0.3)" }}>
            <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--color-primary)" }}>OVERLAY — rgba(0,0,0,0.65) + blur(4px)</span>
          </div>
          <div style={{ padding: 24 }}>
            <div className="glass-card" style={{ maxWidth: 480, margin: "0 auto", padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", background: "rgba(136,206,17,0.04)" }}>
                <span style={{ fontWeight: 700 }}>Header — título + botão fechar</span>
                <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--color-primary)" }}>HEADER</span>
              </div>
              <div style={{ padding: 20, minHeight: 80 }}>
                <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--color-primary)" }}>BODY — conteúdo scrollável</span>
              </div>
              <div style={{ padding: "14px 20px", borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "flex-end", gap: 10, background: "rgba(136,206,17,0.04)" }}>
                <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--color-primary)" }}>FOOTER — ações</span>
              </div>
            </div>
          </div>
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
