"use client";

import { useState } from "react";
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

function AnimationCard({
  title,
  desc,
  cssClass,
  keyframeName,
  children,
}: {
  title: string;
  desc: string;
  cssClass: string;
  keyframeName: string;
  children: React.ReactNode;
}) {
  const [key, setKey] = useState(0);

  return (
    <div className="glass-card" style={{ padding: 24, borderRadius: 18 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-primary)",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            @keyframes {keyframeName}
          </div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{title}</div>
          <div style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 4, lineHeight: 1.4 }}>
            {desc}
          </div>
        </div>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => setKey((k) => k + 1)}
          style={{ flexShrink: 0 }}
        >
          ↺ Play
        </button>
      </div>

      {/* Animation preview area */}
      <div
        style={{
          height: 100,
          borderRadius: 12,
          background: "rgba(136,206,17,0.04)",
          border: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div key={key} className={cssClass} style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--color-text-muted)",
          background: "rgba(136,206,17,0.05)",
          padding: "8px 12px",
          borderRadius: 8,
        }}
      >
        {"."}{cssClass.replace(/\s/g, " .")}
      </div>
    </div>
  );
}

export default function MotionPage() {
  const { t } = useLang();
  return (
    <PageLayout
      title={t("motion")}
      accentWord={t("motion")}
      subtitle={t("motion")}
      breadcrumb={[
        { label: "Foundations", href: "/foundations/colors" },
        { label: "Motion" },
      ]}
      badge="V3 · FOUNDATIONS"
    >
      {/* SECTION 01 — Keyframes */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="01"
          title="Animações Disponíveis"
          desc="Clique em ↺ Play para reexecutar cada animação individualmente."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          <AnimationCard
            title="Fade Up"
            desc="Aparecer com movimento para cima — padrão para page transitions e staggered reveals."
            cssClass="fade-up"
            keyframeName="fadeUp"
          >
            <div
              style={{
                padding: "12px 24px",
                background: "var(--color-primary-dim)",
                border: "1px solid var(--color-border-green)",
                borderRadius: 12,
                fontWeight: 700,
                color: "var(--color-primary)",
              }}
            >
              Elemento aparecendo
            </div>
          </AnimationCard>

          <AnimationCard
            title="Pulse Green"
            desc="Pulso de glow verde para elementos de destaque e estados ativos."
            cssClass="animate-pulse-green"
            keyframeName="pulseGreen"
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                color: "#0a0a0a",
                fontSize: 20,
              }}
            >
              G
            </div>
          </AnimationCard>

          <AnimationCard
            title="Shimmer"
            desc="Gradiente animado para textos e elementos de carregamento (skeleton)."
            cssClass="gradient-text-animated"
            keyframeName="shimmer"
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: -1,
              }}
            >
              Shimmer Text
            </div>
          </AnimationCard>

          <AnimationCard
            title="Blob Float"
            desc="Translação suave para blobs de fundo volumétrico — cria profundidade orgânica."
            cssClass="bg-blob bg-blob-1"
            keyframeName="blobFloat"
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "radial-gradient(circle at 40% 30%, rgba(136,206,17,0.6) 0%, transparent 70%)",
              }}
            />
          </AnimationCard>

          <AnimationCard
            title="Volumetric Pulse"
            desc="Pulsação de opacidade para camadas de luz volumétrica."
            cssClass="volumetric-glow glass-card"
            keyframeName="volumetric-pulse"
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                border: "1px solid var(--color-border-green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-primary)",
                fontSize: 24,
              }}
            >
              ◆
            </div>
          </AnimationCard>

          <AnimationCard
            title="Liquid Refraction"
            desc="Mudança sutil de brightness/contrast — simula refração de vidro líquido no :active."
            cssClass="glass"
            keyframeName="liquid-refraction"
          >
            <div
              style={{
                padding: "10px 20px",
                fontWeight: 700,
                fontSize: 14,
                color: "var(--color-text-secondary)",
              }}
            >
              Refraction on click
            </div>
          </AnimationCard>
        </div>
      </section>

      {/* SECTION 02 — Stagger delays */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="02"
          title="Staggered Reveals — .fade-up-1 a .fade-up-6"
          desc="Classes de delay para criar entradas em cascata — add .fade-up + .fade-up-N em cada filho."
        />
        <div
          className="glass-card"
          style={{ borderRadius: 20, overflow: "hidden" }}
        >
          <div
            style={{
              padding: "10px 20px",
              borderBottom: "1px solid var(--color-border)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-text-muted)",
            }}
          >
            classes · delay progression
          </div>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 80px 1fr",
                alignItems: "center",
                gap: 24,
                padding: "12px 24px",
                borderBottom: n < 6 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-primary)",
                  fontWeight: 700,
                }}
              >
                .fade-up .fade-up-{n}
              </div>
              <span className="pill pill-muted" style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>
                {n * 100}ms
              </span>
              <div
                style={{
                  height: 8,
                  borderRadius: 4,
                  background: `linear-gradient(90deg, var(--color-primary), transparent)`,
                  width: `${n * 16}%`,
                  opacity: 0.6 + n * 0.06,
                }}
              />
            </div>
          ))}
        </div>

        <div
          className="glass-subtle"
          style={{ marginTop: 16, padding: "16px 20px", borderRadius: 14 }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-primary)",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Usage Example
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
            {`<div className="fade-up fade-up-1">First item</div>
<div className="fade-up fade-up-2">Second item</div>
<div className="fade-up fade-up-3">Third item</div>
{/* Each child appears 100ms after the previous */}`}
          </pre>
        </div>
      </section>

      {/* SECTION 03 — Timing principles */}
      <section style={{ marginBottom: 32 }}>
        <SectionHeader
          number="03"
          title="Princípios de Timing"
          desc="Convenções de duração e easing usadas em todo o sistema."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            {
              name: "Instant",
              duration: "0–100ms",
              easing: "linear",
              use: "Hover states, color changes",
            },
            {
              name: "Fast",
              duration: "150–200ms",
              easing: "ease-out",
              use: "Button press, toast appear",
            },
            {
              name: "Standard",
              duration: "300ms",
              easing: "cubic-bezier(0.4,0,0.2,1)",
              use: "Glass transitions, panel open",
            },
            {
              name: "Entrance",
              duration: "600ms",
              easing: "cubic-bezier(0.16,1,0.3,1)",
              use: "Page enter (fade-up default)",
            },
            {
              name: "Dramatic",
              duration: "800–1200ms",
              easing: "ease-in-out",
              use: "Hero reveals, loading screens",
            },
            {
              name: "Infinite",
              duration: "2–8s loop",
              easing: "ease-in-out",
              use: "Background blobs, pulse effects",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="glass-subtle"
              style={{ padding: "20px 24px", borderRadius: 14 }}
            >
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{t.name}</div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--color-primary)",
                  marginBottom: 4,
                }}
              >
                {t.duration}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-text-muted)",
                  marginBottom: 10,
                  lineHeight: 1.4,
                }}
              >
                {t.easing}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                {t.use}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
