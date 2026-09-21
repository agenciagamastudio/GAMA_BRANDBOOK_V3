"use client";

import Image from "next/image";
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

function LogoBg({ bg, label, children, border }: { bg: string; label: string; children: React.ReactNode; border?: string }) {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: border || "1px solid var(--color-border)" }}>
      <div
        style={{
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 160,
          position: "relative",
        }}
      >
        {children}
      </div>
      <div
        style={{
          padding: "10px 16px",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <span style={{ fontSize: 11, color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
          {label}
        </span>
      </div>
    </div>
  );
}

export default function IdentityPage() {
  const { t } = useLang();

  const PERSONALITY_TRAITS = [
    {
      word: t("brand_inovadora"),
      desc: t("brand_inovadora_desc"),
      icon: "◆",
    },
    {
      word: t("brand_premium"),
      desc: t("brand_premium_desc"),
      icon: "★",
    },
    {
      word: t("brand_confiavel"),
      desc: t("brand_confiavel_desc"),
      icon: "✓",
    },
    {
      word: t("brand_ousada"),
      desc: t("brand_ousada_desc"),
      icon: "⚡",
    },
  ];

  return (
    <PageLayout
      title={t("brand_identity")}
      accentWord={t("brand")}
      subtitle={t("brand_identity_desc")}
      breadcrumb={[
        { label: "Brand", href: "/brand/identity" },
        { label: "Identity" },
      ]}
      badge="V3 · BRAND"
    >
      {/* SECTION 01 — Isotipo */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="01"
          title={t("isotipo_title")}
          desc={t("isotipo_desc")}
        />

        {/* Hero isotipo showcase */}
        <div
          className="glass-illuminated"
          style={{
            padding: "40px 48px",
            borderRadius: 20,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 40,
          }}
        >
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 20,
              overflow: "hidden",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Image
              src="/brand/ISOTIPO_FULL_COLOR_GAMA_STUDIO.svg"
              alt="GAMA Isotipo Full Color"
              width={500}
              height={624}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 52%" }}
              unoptimized
            />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "var(--font-display, var(--font-poppins))",
                fontWeight: 900,
                fontSize: 48,
                letterSpacing: -1.5,
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              GAMA
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: 2.5,
                marginBottom: 16,
              }}
            >
              Marca Registrada · Símbolo Oficial
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="pill pill-green">Full Color</span>
              <span className="pill pill-muted">Isotipo</span>
              <span className="pill pill-muted">Símbolo G</span>
            </div>
          </div>
        </div>

        {/* Three color contexts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
          <LogoBg bg="#111111" label="Sobre escuro" border="1px solid rgba(255,255,255,0.06)">
            <Image
              src="/brand/ISOTIPO_LIGHT_GAMA_STUDIO.svg"
              alt="GAMA Isotipo Light"
              width={810}
              height={1012}
              style={{ width: 90, height: "auto", objectFit: "contain", filter: "brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(64deg)" }}
              unoptimized
            />
          </LogoBg>

          <LogoBg bg="#f5f5f5" label="Sobre claro">
            <Image
              src="/brand/ISOTIPO_LIGHT_GAMA_STUDIO.svg"
              alt="GAMA Isotipo Light"
              width={810}
              height={1012}
              style={{ width: 90, height: "auto", objectFit: "contain" }}
              unoptimized
            />
          </LogoBg>

          <LogoBg bg="linear-gradient(135deg, #88ce11 0%, #6fa80a 100%)" label="Sobre brand green">
            <Image
              src="/brand/ISOTIPO_LIGHT_GAMA_STUDIO.svg"
              alt="GAMA Isotipo Light"
              width={810}
              height={1012}
              style={{ width: 90, height: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              unoptimized
            />
          </LogoBg>
        </div>

        {/* Clearspace rule */}
        <div className="glass-subtle" style={{ padding: "20px 24px", borderRadius: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Regra de Espaço Livre</div>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>
            Mantenha ao redor do símbolo um espaço mínimo equivalente à <strong>altura da letra G</strong>. Nunca
            coloque outros elementos visuais dentro dessa zona de proteção.
          </p>
        </div>
      </section>

      {/* SECTION 02 — GAMA Studio Imagotipo */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="02"
          title={t("imagotipo_title")}
          desc={t("imagotipo_desc")}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* White bg — primary use */}
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--color-border)" }}>
            <div
              style={{
                background: "#f9f9f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px 20px",
              }}
            >
              <Image
                src="/brand/IMAGOTIPO_LIGHT_GAMA_STUDIO.svg"
                alt="GAMA Studio Imagotipo"
                width={810}
                height={1012}
                style={{ width: "100%", maxWidth: 420, height: "auto" }}
                unoptimized
              />
            </div>
            <div style={{ padding: "14px 20px", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>Versão Light</div>
              <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Sobre fundos claros · Uso principal</div>
            </div>
          </div>

          {/* Dark bg */}
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--color-border)" }}>
            <div
              style={{
                background: "#111111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px 20px",
              }}
            >
              <Image
                src="/brand/IMAGOTIPO_LIGHT_GAMA_STUDIO.svg"
                alt="GAMA Studio Imagotipo Dark"
                width={810}
                height={1012}
                style={{
                  width: "100%",
                  maxWidth: 420,
                  height: "auto",
                  filter: "brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(64deg)",
                }}
                unoptimized
              />
            </div>
            <div style={{ padding: "14px 20px", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>Versão Dark</div>
              <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Sobre fundos escuros · Dark mode</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — Sub-Marcas */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="03"
          title={t("subbrands_title")}
          desc={t("subbrands_desc")}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          {/* GAMA TV */}
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--color-border)" }}>
            <div
              style={{
                background: "#f9f9f9",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 16px",
                gap: 12,
              }}
            >
              <Image
                src="/brand/IMAGOTIPO_LIGHT_GAMA_TV.svg"
                alt="GAMA TV Imagotipo"
                width={810}
                height={1012}
                style={{ width: "100%", maxWidth: 380, height: "auto" }}
                unoptimized
              />
            </div>
            <div style={{ padding: "14px 20px", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>GAMA TV</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Vertical de mídia e conteúdo audiovisual</div>
                </div>
                <span className="pill pill-muted">Mídia</span>
              </div>
            </div>
          </div>

          {/* GAMA Engine */}
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--color-border)" }}>
            <div
              style={{
                background: "#111111",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 16px",
                gap: 12,
              }}
            >
              <Image
                src="/brand/IMAGOTIPO_DARK_GAMA_ENGINE.svg"
                alt="GAMA Engine Imagotipo"
                width={810}
                height={1012}
                style={{ width: "100%", maxWidth: 380, height: "auto" }}
                unoptimized
              />
            </div>
            <div style={{ padding: "14px 20px", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>GAMA Engine</div>
                  <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>Vertical de tecnologia e desenvolvimento</div>
                </div>
                <span className="pill pill-blue">Tech</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logotipos Engine */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div
            style={{
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                background: "#f9f9f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 16px",
                flex: 1,
              }}
            >
              <Image
                src="/brand/LOGOTIPO_LIGHT_GAMA_ENGINE.svg"
                alt="GAMA Engine Logotipo Light"
                width={810}
                height={1012}
                style={{ width: "100%", maxWidth: 300, height: "auto" }}
                unoptimized
              />
            </div>
            <div style={{ padding: "14px 16px", background: "var(--color-surface)", borderLeft: "1px solid var(--color-border)", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 110 }}>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 2 }}>Logotipo Light</div>
              <div style={{ fontSize: 10, color: "var(--color-text-muted)" }}>Wordmark engine</div>
            </div>
          </div>

          <div
            style={{
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                background: "#111111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px 16px",
                flex: 1,
              }}
            >
              <Image
                src="/brand/LOGOTIPO_DARK_GAMA_ENGINE.svg.svg"
                alt="GAMA Engine Logotipo Dark"
                width={810}
                height={1012}
                style={{ width: "100%", maxWidth: 300, height: "auto" }}
                unoptimized
              />
            </div>
            <div style={{ padding: "14px 16px", background: "var(--color-surface)", borderLeft: "1px solid var(--color-border)", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 110 }}>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 2 }}>Logotipo Dark</div>
              <div style={{ fontSize: 10, color: "var(--color-text-muted)" }}>Wordmark engine</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — Brand Colors */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="04"
          title={t("brand_colors_title")}
          desc={t("brand_colors_desc")}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { hex: "#88ce11", name: "GAMA Green", role: "Primary CTA, logos, highlights" },
            { hex: "#a3d500", name: "GAMA Green Light", role: "Hover states, accents" },
            { hex: "#6fa80a", name: "GAMA Green Dark", role: "Pressed states, shadows" },
          ].map((c) => (
            <div key={c.hex} className="glass-subtle" style={{ borderRadius: 16, overflow: "hidden" }}>
              <div style={{ height: 100, backgroundColor: c.hex, position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 14,
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#0a0a0a",
                    letterSpacing: 0.5,
                  }}
                >
                  {c.hex.toUpperCase()}
                </span>
              </div>
              <div style={{ padding: "14px 18px" }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-muted)", lineHeight: 1.4 }}>{c.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 05 — Brand Typography */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="05"
          title={t("brand_typography_title")}
          desc={t("brand_typography_desc")}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="glass-illuminated" style={{ padding: "32px 36px", borderRadius: 20, textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-display, var(--font-poppins))",
                fontSize: 52,
                fontWeight: 900,
                letterSpacing: -2,
                lineHeight: 1.0,
                marginBottom: 6,
              }}
            >
              Montserrat
            </div>
            <div
              className="gradient-text"
              style={{
                fontFamily: "var(--font-display, var(--font-poppins))",
                fontSize: 52,
                fontWeight: 900,
                letterSpacing: -2,
                lineHeight: 1.0,
                marginBottom: 16,
              }}
            >
              Black 900
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", margin: "0 0 12px" }}>
              Wordmark · Display · Hero
            </p>
            <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.7 }}>
              Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
            </p>
          </div>
          <div className="glass-card" style={{ padding: "32px 36px", borderRadius: 20, textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: 52,
                fontWeight: 900,
                letterSpacing: -2,
                lineHeight: 1.0,
                marginBottom: 6,
              }}
            >
              Poppins
            </div>
            <div
              className="gradient-text"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: 52,
                fontWeight: 900,
                letterSpacing: -2,
                lineHeight: 1.0,
                marginBottom: 16,
              }}
            >
              Black 900
            </div>
            <p style={{ fontSize: 13, color: "var(--color-text-muted)", margin: "0 0 12px" }}>
              UI · Componentes · Corpo
            </p>
            <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.7 }}>
              Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 06 — Personality */}
      <section style={{ marginBottom: 32 }}>
        <SectionHeader
          number="06"
          title={t("brand_personality")}
          desc={t("brand_identity_desc")}
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {PERSONALITY_TRAITS.map((t) => (
            <div
              key={t.word}
              className="glass-illuminated liquid-edge"
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
                {t.icon}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 10px", letterSpacing: -0.5 }}>
                {t.word}
              </h3>
              <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
