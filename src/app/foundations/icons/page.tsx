"use client";

import { useLang } from "@/components/layout/LanguageProvider";
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

const ICON_GRID = [
  { name: "home", glyph: "⌂" },
  { name: "search", glyph: "⌕" },
  { name: "settings", glyph: "⚙" },
  { name: "close", glyph: "×" },
  { name: "check", glyph: "✓" },
  { name: "add", glyph: "+" },
  { name: "arrow_right", glyph: "→" },
  { name: "arrow_left", glyph: "←" },
  { name: "arrow_up", glyph: "↑" },
  { name: "arrow_down", glyph: "↓" },
  { name: "star", glyph: "★" },
  { name: "star_outline", glyph: "☆" },
  { name: "circle", glyph: "●" },
  { name: "circle_outline", glyph: "○" },
  { name: "square", glyph: "■" },
  { name: "square_outline", glyph: "□" },
  { name: "diamond", glyph: "◆" },
  { name: "diamond_outline", glyph: "◇" },
  { name: "hexagon", glyph: "⬡" },
  { name: "triangle_up", glyph: "△" },
  { name: "triangle_down", glyph: "▽" },
  { name: "pentagon", glyph: "⬟" },
  { name: "info", glyph: "ℹ" },
  { name: "warning", glyph: "⚠" },
  { name: "error", glyph: "✗" },
  { name: "sparkle", glyph: "✦" },
  { name: "bolt", glyph: "⚡" },
  { name: "flag", glyph: "⚑" },
  { name: "lock", glyph: "🔒" },
  { name: "key", glyph: "🔑" },
  { name: "link", glyph: "🔗" },
  { name: "globe", glyph: "🌐" },
];

const ICON_SIZES = [
  { px: 16, label: "xs — 16px", use: "Inline em texto, dense UI" },
  { px: 20, label: "sm — 20px", use: "Botões, labels" },
  { px: 24, label: "md — 24px", use: "Ícones principais (padrão)" },
  { px: 32, label: "lg — 32px", use: "Feature icons, headers" },
  { px: 48, label: "xl — 48px", use: "Empty states, hero" },
];

const ICON_COLORS = [
  { color: "var(--color-primary)", label: "Primary Green", cls: "pill-green" },
  { color: "var(--color-text-secondary)", label: "Text Secondary", cls: "pill-muted" },
  { color: "var(--color-text)", label: "Text White", cls: "pill-muted" },
  { color: "var(--color-error)", label: "Error Red", cls: "pill-muted" },
  { color: "var(--color-warning)", label: "Warning Yellow", cls: "pill-muted" },
  { color: "var(--color-info)", label: "Info Blue", cls: "pill-blue" },
];

export default function IconsPage() {
  const { t } = useLang();
  return (
    <PageLayout
      title={t("icons")}
      accentWord={t("icons")}
      subtitle={t("icons_scale")}
      breadcrumb={[
        { label: "Foundations", href: "/foundations/colors" },
        { label: "Icons" },
      ]}
      badge="V3 · FOUNDATIONS"
    >
      {/* SECTION 01 — System Overview */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="01"
          title="Material Symbols"
          desc="Sistema de ícones do Google com suporte a font variation — ajuste de peso, preenchimento e tamanho via CSS."
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="glass-illuminated" style={{ padding: 28, borderRadius: 20 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--color-primary)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Package
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
              @material-symbols/font
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>
              Font-based icon system com variáveis CSS. Suporta outlined, rounded e sharp. Zero SVGs externos — uma única font file.
            </p>
          </div>
          <div className="glass-card vol-light" style={{ padding: 28, borderRadius: 20 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--color-primary)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Variáveis CSS
            </div>
            <pre
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--color-text-secondary)",
                margin: 0,
                lineHeight: 1.8,
              }}
            >
              {`font-variation-settings:
  'FILL' 0,     /* 0-1 */
  'wght' 400,   /* 100-700 */
  'GRAD' 0,     /* -50-200 */
  'opsz' 24;    /* 20-48 */`}
            </pre>
          </div>
        </div>
      </section>

      {/* SECTION 02 — Icon Grid */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="02"
          title="Referência Visual"
          desc="Amostra de ícones comuns — nomes para uso com Material Symbols."
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: 8,
          }}
        >
          {ICON_GRID.map((icon) => (
            <div
              key={icon.name}
              className="glass-subtle"
              style={{
                padding: "14px 8px",
                borderRadius: 12,
                textAlign: "center",
                cursor: "default",
                transition: "all 200ms ease",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  marginBottom: 6,
                  lineHeight: 1,
                }}
              >
                {icon.glyph}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "var(--color-text-muted)",
                  lineHeight: 1.3,
                }}
              >
                {icon.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 03 — Icon Sizes */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="03"
          title="Tamanhos de Ícone"
          desc="5 tamanhos padrão — use font-size para controlar o ícone quando usar Material Symbols."
        />
        <div className="glass-card" style={{ borderRadius: 20, overflow: "hidden" }}>
          {ICON_SIZES.map((s, i) => (
            <div
              key={s.px}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 80px 1fr 200px",
                alignItems: "center",
                gap: 24,
                padding: "18px 28px",
                borderBottom:
                  i < ICON_SIZES.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <div style={{ fontSize: s.px, lineHeight: 1, color: "var(--color-primary)" }}>
                ◆
              </div>
              <span className="pill pill-muted" style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>
                {s.px}px
              </span>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{s.use}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04 — Icon Colors */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="04"
          title="Cores de Ícone"
          desc="Ícones herdam a cor do elemento pai. Use as cores semânticas para comunicar estado."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {ICON_COLORS.map((ic) => (
            <div
              key={ic.label}
              className="glass-subtle"
              style={{
                padding: "20px 24px",
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 32, color: ic.color, lineHeight: 1 }}>◆</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{ic.label}</div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--color-text-muted)",
                    marginTop: 2,
                  }}
                >
                  color: {ic.color}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 05 — How to Use */}
      <section style={{ marginBottom: 32 }}>
        <SectionHeader
          number="05"
          title="Como Usar"
          desc="Instalação e uso básico do Material Symbols com React/Next.js."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="glass-card" style={{ borderRadius: 16, overflow: "hidden" }}>
            <div
              style={{
                padding: "10px 20px",
                borderBottom: "1px solid var(--color-border)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-text-muted)",
              }}
            >
              1. Instalar
            </div>
            <pre
              style={{
                margin: 0,
                padding: "16px 24px",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              {"npm install @material-symbols/font-400\n# ou usar via CDN no globals.css:"}
            </pre>
          </div>
          <div className="glass-card" style={{ borderRadius: 16, overflow: "hidden" }}>
            <div
              style={{
                padding: "10px 20px",
                borderBottom: "1px solid var(--color-border)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-text-muted)",
              }}
            >
              2. Usar (React / JSX)
            </div>
            <pre
              style={{
                margin: 0,
                padding: "16px 24px",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              {`<span className="material-symbols-outlined">
  home
</span>

{/* Filled variant */}
<span
  className="material-symbols-outlined"
  style={{ fontVariationSettings: "'FILL' 1" }}
>
  favorite
</span>`}
            </pre>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
