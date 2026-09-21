"use client";
import { useState, useRef, useEffect } from "react";
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

const MENU_ITEMS = [
  { icon: "✏️", label: "Editar", shortcut: "⌘E" },
  { icon: "📋", label: "Duplicar", shortcut: "⌘D" },
  null, // divider
  { icon: "📤", label: "Exportar", shortcut: "⌘⇧E" },
  { icon: "🔗", label: "Copiar link" },
  null,
  { icon: "🗑️", label: "Excluir", shortcut: "⌫", danger: true },
];

const CODE = `function Dropdown({ trigger, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setOpen(!open)}>{trigger}</button>
      {open && (
        <div style={{
          position: "absolute", top: "100%", left: 0,
          background: "var(--color-surface)", border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)", minWidth: 180,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          zIndex: 100, padding: "4px",
        }}>
          {items.map((item) =>
            item === null
              ? <div style={{ height: 1, background: "var(--color-border)", margin: "4px 0" }} />
              : <button style={{ display: "flex", width: "100%", padding: "8px 12px", ... }}>{item.label}</button>
          )}
        </div>
      )}
    </div>
  );
}`;

function DropdownMenu({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0,
          background: "var(--color-surface)", border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)", minWidth: 200,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
          zIndex: 100, padding: 4,
        }}>
          {MENU_ITEMS.map((item, i) =>
            item === null ? (
              <div key={i} style={{ height: 1, background: "var(--color-border)", margin: "4px 0" }} />
            ) : (
              <button key={item.label} onClick={() => setOpen(false)} style={{
                display: "flex", width: "100%", padding: "9px 12px",
                background: "none", border: "none", cursor: "pointer",
                borderRadius: "var(--radius-sm)", gap: 10, alignItems: "center",
                color: item.danger ? "var(--color-error)" : "var(--color-text)",
                fontSize: 14, textAlign: "left",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-surface-2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.shortcut && <span style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{item.shortcut}</span>}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

function SelectDropdown() {
  const [selected, setSelected] = useState("Todos os projetos");
  const [open, setOpen] = useState(false);
  const options = ["Todos os projetos", "GAMA DS", "GAMA Brandbook", "GAMA AIOS", "GAMA VOZ"];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", minWidth: 220 }}>
      <button
        onClick={() => setOpen(!open)}
        className="input-field"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", cursor: "pointer", gap: 10 }}
      >
        <span>{selected}</span>
        <span style={{ fontSize: 11, color: "var(--color-text-muted)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "var(--color-surface)", border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          zIndex: 100, padding: 4, maxHeight: 200, overflowY: "auto",
        }}>
          {options.map((opt) => (
            <button key={opt} onClick={() => { setSelected(opt); setOpen(false); }} style={{
              display: "block", width: "100%", padding: "9px 12px",
              background: selected === opt ? "var(--color-primary-dim)" : "none",
              color: selected === opt ? "var(--color-primary)" : "var(--color-text)",
              border: "none", cursor: "pointer", borderRadius: "var(--radius-sm)",
              fontSize: 14, textAlign: "left", fontWeight: selected === opt ? 700 : 400,
            }}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DropdownsPage() {
  const { t } = useLang();
  return (
    <PageLayout
      title={t("dropdowns")}
      accentWord={t("dropdowns")}
      subtitle={t("dropdowns_desc")}
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Molecules", href: "/components/molecules/cards" },
        { label: "Dropdowns" },
      ]}
      badge="MOLECULE"
    >
      {/* Context menu */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Menu Contextual" desc="Ações disponíveis para um item — com divisores, atalhos e ação destrutiva." />
        <div className="glass-card" style={{ padding: 32, minHeight: 280, position: "relative" }}>
          <div style={{ display: "flex", gap: 16 }}>
            <DropdownMenu trigger={<button className="btn btn-secondary">Opções ▾</button>} />
            <DropdownMenu trigger={<button className="btn btn-primary">Ações ▾</button>} />
            <DropdownMenu trigger={
              <button style={{ background: "none", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "8px 12px", cursor: "pointer", color: "var(--color-text)", fontSize: 18 }}>⋯</button>
            } />
          </div>
          <p style={{ position: "absolute", bottom: 16, left: 32, fontSize: 12, color: "var(--color-text-muted)" }}>Clique em qualquer botão para abrir o menu</p>
        </div>
      </section>

      {/* Select */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Select Customizado" desc="Select com styling consistente do DS — não depende do select nativo do browser." />
        <div className="glass-card" style={{ padding: 32, minHeight: 240 }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Projeto</label>
              <SelectDropdown />
            </div>
          </div>
        </div>
      </section>

      {/* User menu */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="User Menu" desc="Dropdown de perfil com avatar — padrão para headers de aplicação." />
        <div className="glass-card" style={{ padding: 32, minHeight: 280 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <DropdownMenu trigger={
              <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "6px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--glass-bg)" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--color-primary-dim)", border: "2px solid rgba(136,206,17,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "var(--color-primary)" }}>
                  GA
                </div>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Gama Agency</span>
                <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>▼</span>
              </div>
            } />
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
