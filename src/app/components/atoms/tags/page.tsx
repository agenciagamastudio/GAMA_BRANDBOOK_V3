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

const COLORS: Record<string, { bg: string; text: string; border: string }> = {
  green: { bg: "rgba(136,206,17,0.12)", text: "var(--color-primary)", border: "rgba(136,206,17,0.3)" },
  blue: { bg: "rgba(59,130,246,0.12)", text: "var(--color-info)", border: "rgba(59,130,246,0.3)" },
  purple: { bg: "rgba(139,92,246,0.12)", text: "#8b5cf6", border: "rgba(139,92,246,0.3)" },
  orange: { bg: "rgba(245,158,11,0.12)", text: "var(--color-warning)", border: "rgba(245,158,11,0.3)" },
  red: { bg: "rgba(225,29,72,0.12)", text: "var(--color-error)", border: "rgba(225,29,72,0.3)" },
  muted: { bg: "rgba(255,255,255,0.06)", text: "var(--color-text-muted)", border: "var(--color-border)" },
};

function Tag({ label, color = "muted", removable = false, onRemove }: {
  label: string; color?: keyof typeof COLORS; removable?: boolean; onRemove?: () => void;
}) {
  const c = COLORS[color];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: c.bg, color: c.text,
      border: `1px solid ${c.border}`,
      borderRadius: 999, padding: "4px 10px",
      fontSize: 12, fontWeight: 600,
    }}>
      {label}
      {removable && (
        <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, lineHeight: 1, display: "flex", alignItems: "center", opacity: 0.7 }}>
          ×
        </button>
      )}
    </span>
  );
}

const PRESET_TAGS = ["React", "TypeScript", "Next.js", "TailwindCSS", "GraphQL", "Node.js", "PostgreSQL", "Docker"];
const PRESET_COLORS: (keyof typeof COLORS)[] = ["green", "blue", "purple", "orange", "red", "muted", "green", "blue"];

export default function TagsPage() {
  const { t } = useLang();
  const [tags, setTags] = useState(["Design System", "Componentes", "Tokens", "Dark Mode"]);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string[]>(["React", "TypeScript"]);

  const addTag = () => {
    const val = input.trim();
    if (val && !tags.includes(val)) {
      setTags((prev) => [...prev, val]);
      setInput("");
    }
  };

  const removeTag = (label: string) => setTags((prev) => prev.filter((t) => t !== label));

  const toggleSelect = (tag: string) => {
    setSelected((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  return (
    <PageLayout
      title={t("tags_chips")}
      accentWord={t("tags")}
      subtitle={t("tags_chips_desc")}
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Atoms", href: "/components/atoms/buttons" },
        { label: "Tags" },
      ]}
      badge="ATOM"
    >
      {/* Color variants */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Variantes de Cor" desc="6 cores semânticas para categorização visual." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {(Object.keys(COLORS) as (keyof typeof COLORS)[]).map((color) => (
              <Tag key={color} label={color.charAt(0).toUpperCase() + color.slice(1)} color={color} />
            ))}
          </div>
          <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {PRESET_TAGS.map((tag, i) => (
              <Tag key={tag} label={tag} color={PRESET_COLORS[i % PRESET_COLORS.length]} />
            ))}
          </div>
        </div>
      </section>

      {/* Removable tags */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Tags Removíveis" desc="Clique no × para remover. Gerenciado com useState." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20, minHeight: 40 }}>
            {tags.length === 0 ? (
              <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>Nenhuma tag. Adicione abaixo.</span>
            ) : (
              tags.map((tag, i) => (
                <Tag key={tag} label={tag} color={PRESET_COLORS[i % PRESET_COLORS.length]} removable onRemove={() => removeTag(tag)} />
              ))
            )}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              className="input-field"
              placeholder="Nova tag..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
              style={{ width: 200 }}
            />
            <button className="btn btn-secondary btn-sm" onClick={addTag}>+ Adicionar</button>
          </div>
        </div>
      </section>

      {/* Selectable chips */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Chips Selecionáveis" desc="Filtros e categorias com toggle de seleção." />
        <div className="glass-card" style={{ padding: 32 }}>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--color-text-muted)" }}>Filtrar por tecnologia (multi-select):</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {PRESET_TAGS.map((tag) => {
              const isSelected = selected.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleSelect(tag)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: isSelected ? "var(--color-primary-dim)" : "rgba(255,255,255,0.05)",
                    color: isSelected ? "var(--color-primary)" : "var(--color-text-secondary)",
                    border: `1px solid ${isSelected ? "var(--color-primary)" : "var(--color-border)"}`,
                    borderRadius: 999, padding: "5px 12px",
                    fontSize: 13, fontWeight: isSelected ? 700 : 400,
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {isSelected && <span style={{ fontSize: 10 }}>✓</span>}
                  {tag}
                </button>
              );
            })}
          </div>
          {selected.length > 0 && (
            <p style={{ marginTop: 16, fontSize: 13, color: "var(--color-text-muted)" }}>
              Selecionados: {selected.join(", ")}
            </p>
          )}
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Tamanhos" desc="Customize font-size e padding para adaptar ao contexto." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {[
              { label: "XS", style: { fontSize: 10, padding: "2px 8px" } as React.CSSProperties },
              { label: "SM (padrão)", style: {} as React.CSSProperties },
              { label: "MD", style: { fontSize: 14, padding: "6px 14px" } as React.CSSProperties },
              { label: "LG", style: { fontSize: 16, padding: "8px 18px" } as React.CSSProperties },
            ].map((s) => (
              <span key={s.label} style={{
                ...s.style,
                display: "inline-flex", alignItems: "center",
                background: "var(--color-primary-dim)", color: "var(--color-primary)",
                border: "1px solid rgba(136,206,17,0.3)",
                borderRadius: 999, padding: s.style.padding ?? "4px 10px",
                fontSize: s.style.fontSize ?? 12, fontWeight: 600,
              }}>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
