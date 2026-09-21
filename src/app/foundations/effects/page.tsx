"use client";

import dynamic from "next/dynamic";
import { useLang } from "@/components/layout/LanguageProvider";
import PageLayout from "@/components/layout/PageLayout";

const LoadingPlaceholder = () => (
  <div className="w-full h-96 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl animate-pulse" />
);

const ParticleField = dynamic(() => import("@/components/ui/ParticleField"), {
  ssr: false,
  loading: LoadingPlaceholder,
});
const ParticleFieldRain = dynamic(() => import("@/components/ui/ParticleFieldRain"), {
  ssr: false,
  loading: LoadingPlaceholder,
});
const ParticleFieldOrbits = dynamic(() => import("@/components/ui/ParticleFieldOrbits"), {
  ssr: false,
  loading: LoadingPlaceholder,
});
const ParticleFieldBurst = dynamic(() => import("@/components/ui/ParticleFieldBurst"), {
  ssr: false,
  loading: LoadingPlaceholder,
});
const ParticleFieldWaves = dynamic(() => import("@/components/ui/ParticleFieldWaves"), {
  ssr: false,
  loading: LoadingPlaceholder,
});
const ParticleFieldWindFlow = dynamic(() => import("@/components/ui/ParticleFieldWindFlow"), {
  ssr: false,
  loading: LoadingPlaceholder,
});
const ParticleFieldPulse = dynamic(() => import("@/components/ui/ParticleFieldPulse"), {
  ssr: false,
  loading: LoadingPlaceholder,
});
const ParticleFieldGridPulse = dynamic(() => import("@/components/ui/ParticleFieldGridPulse"), {
  ssr: false,
  loading: LoadingPlaceholder,
});

export default function EffectsPage() {
  const { t } = useLang();
  return (
    <PageLayout
      title={t("effects")}
      accentWord={t("effects")}
      subtitle={t("color_system")}
      breadcrumb={[
        { label: "Foundations", href: "/foundations/colors" },
        { label: "Effects" },
      ]}
      badge="V3 · ADVANCED RENDERING"
    >
      {/* SECTION 1 — GLASS MATERIAL */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="01"
          title="Glass Material"
          desc="Frosted glass with soft blur and subtle borders — foundation of depth and transparency."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {/* Preview */}
          <div
            style={{
              backdropFilter: "blur(var(--glass-blur))",
              WebkitBackdropFilter: "blur(var(--glass-blur))",
              background: "var(--glass-surface)",
              border: "1px solid var(--glass-border)",
              borderRadius: 20,
              padding: 40,
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 48,
                marginBottom: 12,
                opacity: 0.8,
              }}
            >
              ◇
            </div>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: 14,
                margin: 0,
                lineHeight: 1.6,
                maxWidth: 280,
              }}
            >
              Glass surface with 24px blur, 8% white opacity, and 15% border opacity
            </p>
          </div>

          {/* Tokens */}
          <div>
            <div
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-text-muted)",
                  margin: "0 0 12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                CSS Tokens
              </p>
              <pre
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-primary)",
                  margin: 0,
                  overflow: "auto",
                  background: "rgba(0, 0, 0, 0.2)",
                  padding: 12,
                  borderRadius: 8,
                }}
              >
{`--glass-blur: 24px;
--glass-blur-sm: 12px;
--glass-blur-lg: 40px;
--glass-opacity: 0.08;
--glass-border-opacity: 0.15;
--glass-surface: rgba(255,255,255,0.08);
--glass-border: rgba(255,255,255,0.15);`}
              </pre>
            </div>
            <div
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: 20,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-text-muted)",
                  margin: "0 0 12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Tailwind Class
              </p>
              <pre
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "#fde68a",
                  margin: 0,
                  overflow: "auto",
                  background: "rgba(0, 0, 0, 0.2)",
                  padding: 12,
                  borderRadius: 8,
                }}
              >
                {`backdrop-blur backdrop-blur-lg`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — LIQUID GLASS */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="02"
          title="Liquid Glass"
          desc="Refractive glass variant with enhanced blur and distortion — creates premium, flowing aesthetic."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {/* Preview */}
          <div
            style={{
              backdropFilter: "blur(var(--liquid-glass-blur))",
              WebkitBackdropFilter: "blur(var(--liquid-glass-blur))",
              background: "var(--liquid-glass-surface)",
              border: "1.5px solid var(--glass-border)",
              borderRadius: 20,
              padding: 40,
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-40%",
                left: "-40%",
                width: "180%",
                height: "180%",
                background: "radial-gradient(circle, rgba(136,206,17,0.1) 0%, transparent 70%)",
                filter: "blur(60px)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 12,
                  opacity: 0.7,
                }}
              >
                ◈
              </div>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: 14,
                  margin: 0,
                  lineHeight: 1.6,
                  maxWidth: 280,
                }}
              >
                32px blur with refractive distortion and flowing light gradients
              </p>
            </div>
          </div>

          {/* Tokens */}
          <div>
            <div
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-text-muted)",
                  margin: "0 0 12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                CSS Tokens
              </p>
              <pre
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-primary)",
                  margin: 0,
                  overflow: "auto",
                  background: "rgba(0, 0, 0, 0.2)",
                  padding: 12,
                  borderRadius: 8,
                }}
              >
{`--liquid-glass-blur: 32px;
--liquid-glass-opacity: 0.06;
--liquid-glass-distortion: 4px;
--liquid-glass-surface:
  rgba(255,255,255,0.06);`}
              </pre>
            </div>
            <div
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: 20,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-text-muted)",
                  margin: "0 0 12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Use Case
              </p>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: 13,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Hero sections, premium cards, floating modals with flowing light animation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — VOLUMETRIC LIGHTING */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="03"
          title="Volumetric Lighting"
          desc="3D light rays and glow effects — creates depth and cinematic atmosphere."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {/* Preview with light rays */}
          <div
            style={{
              background: "var(--color-surface-2)",
              borderRadius: 20,
              padding: 40,
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Light ray from top */}
            <div
              style={{
                position: "absolute",
                top: "-60px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 200,
                height: 400,
                background: "linear-gradient(to bottom, rgba(136,206,17,0.4), transparent 80%)",
                filter: "blur(80px)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  fontSize: 48,
                  marginBottom: 12,
                  opacity: 0.7,
                  color: "var(--color-primary)",
                }}
              >
                ✦
              </div>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: 14,
                  margin: 0,
                  lineHeight: 1.6,
                  maxWidth: 280,
                }}
              >
                Green volumetric light rays emanating from top — creates depth and focus
              </p>
            </div>
          </div>

          {/* Tokens */}
          <div>
            <div
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: 20,
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-text-muted)",
                  margin: "0 0 12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                CSS Tokens
              </p>
              <pre
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-primary)",
                  margin: 0,
                  overflow: "auto",
                  background: "rgba(0, 0, 0, 0.2)",
                  padding: 12,
                  borderRadius: 8,
                }}
              >
{`--vol-light-opacity: 0.12;
--vol-light-color:
  rgba(136,206,17,0.12);
--vol-light-spread: 120px;`}
              </pre>
            </div>
            <div
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: 20,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-text-muted)",
                  margin: "0 0 12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Classes
              </p>
              <pre
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "#fde68a",
                  margin: 0,
                  overflow: "auto",
                  background: "rgba(0, 0, 0, 0.2)",
                  padding: 12,
                  borderRadius: 8,
                }}
              >
{`.vol-light
.volumetric-glow
.volumetric-rays`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — VOLUMETRIC SHADOWS */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="04"
          title="Volumetric Shadows"
          desc="Multi-layer elevation shadows — ambient occlusion and depth perception."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {/* Elevation 1 */}
          <div
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: 16,
              padding: 32,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "var(--shadow-elevation-1)",
              transition: "transform 200ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as any).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as any).style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 8, opacity: 0.6 }}>⬆</div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--color-primary)",
                margin: "0 0 8px",
                fontWeight: 700,
              }}
            >
              elevation-1
            </p>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: 12,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Subtle contact shadow — minimal depth
            </p>
          </div>

          {/* Elevation 2 */}
          <div
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: 16,
              padding: 32,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "var(--shadow-elevation-2)",
              transition: "transform 200ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as any).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as any).style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 8, opacity: 0.6 }}>⬆⬆</div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--color-primary)",
                margin: "0 0 8px",
                fontWeight: 700,
              }}
            >
              elevation-2
            </p>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: 12,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Medium elevation — lifted elements
            </p>
          </div>

          {/* Elevation 3 */}
          <div
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: 16,
              padding: 32,
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "var(--shadow-elevation-3)",
              transition: "transform 200ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as any).style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as any).style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 8, opacity: 0.6 }}>⬆⬆⬆</div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--color-primary)",
                margin: "0 0 8px",
                fontWeight: 700,
              }}
            >
              elevation-3
            </p>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: 12,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              High elevation — floating panels
            </p>
          </div>
        </div>

        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            padding: 20,
            marginTop: 24,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-muted)",
              margin: "0 0 12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            CSS Tokens (Tailwind: box-shadow-*)
          </p>
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-primary)",
              margin: 0,
              overflow: "auto",
              background: "rgba(0, 0, 0, 0.2)",
              padding: 12,
              borderRadius: 8,
            }}
          >
{`--shadow-elevation-1: 0 2px 8px rgba(0,0,0,0.3);
--shadow-elevation-2: 0 8px 24px rgba(0,0,0,0.5),
                      0 2px 8px rgba(0,0,0,0.3);
--shadow-elevation-3: 0 16px 48px rgba(0,0,0,0.7),
                      0 8px 24px rgba(0,0,0,0.5);`}
          </pre>
        </div>
      </section>

      {/* SECTION 5 — EMISSIVE GLOW */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="05"
          title="Emissive Glow"
          desc="Bloom and radiance effects — makes elements pop with green luminescence."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {/* Glow SM */}
          <button
            style={{
              background: "var(--color-primary)",
              color: "#161616",
              border: "none",
              borderRadius: 10,
              padding: 16,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "var(--glow-primary-sm)",
              transition: "all 200ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as any).style.boxShadow = "var(--glow-primary-md)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as any).style.boxShadow = "var(--glow-primary-sm)";
            }}
          >
            Glow Small
          </button>

          {/* Glow MD */}
          <button
            style={{
              background: "var(--color-primary)",
              color: "#161616",
              border: "none",
              borderRadius: 10,
              padding: 16,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "var(--glow-primary-md)",
              transition: "all 200ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as any).style.boxShadow = "var(--glow-primary-lg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as any).style.boxShadow = "var(--glow-primary-md)";
            }}
          >
            Glow Medium
          </button>

          {/* Glow LG */}
          <button
            style={{
              background: "var(--color-primary)",
              color: "#161616",
              border: "none",
              borderRadius: 10,
              padding: 16,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "var(--glow-primary-lg)",
              transition: "all 200ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as any).style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as any).style.transform = "scale(1)";
            }}
          >
            Glow Large
          </button>
        </div>

        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            padding: 20,
            marginTop: 24,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-muted)",
              margin: "0 0 12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            CSS Tokens (Tailwind: shadow-glow-*)
          </p>
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-primary)",
              margin: 0,
              overflow: "auto",
              background: "rgba(0, 0, 0, 0.2)",
              padding: 12,
              borderRadius: 8,
            }}
          >
{`--glow-primary-sm: 0 0 8px rgba(136,206,17,0.3);
--glow-primary-md: 0 0 20px rgba(136,206,17,0.4),
                   0 0 40px rgba(136,206,17,0.15);
--glow-primary-lg: 0 0 40px rgba(136,206,17,0.5),
                   0 0 80px rgba(136,206,17,0.2);`}
          </pre>
        </div>
      </section>

      {/* SECTION 6 — DEPTH LAYERS */}
      <section style={{ marginBottom: 32 }}>
        <SectionHeader
          number="06"
          title="Depth Layers"
          desc="Z-index system for stacking context — layer-1 (base) → layer-4 (topmost)."
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 400,
          }}
        >
          {/* Layer 1 */}
          <div
            style={{
              position: "relative",
              height: 80,
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 1,
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-primary)", fontWeight: 700 }}>
              Layer 1 (z: 0)
            </span>
            <span style={{ fontSize: 24, opacity: 0.5 }}>◾</span>
          </div>

          {/* Layer 2 */}
          <div
            style={{
              position: "relative",
              height: 80,
              background: "var(--color-surface-2)",
              border: "2px solid var(--color-border-green)",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 10,
              marginLeft: 20,
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-primary)", fontWeight: 700 }}>
              Layer 2 (z: 10)
            </span>
            <span style={{ fontSize: 24, opacity: 0.6 }}>◾◾</span>
          </div>

          {/* Layer 3 */}
          <div
            style={{
              position: "relative",
              height: 80,
              background: "var(--color-surface-2)",
              border: "2px solid var(--color-border-green)",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 20,
              marginLeft: 40,
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-primary)", fontWeight: 700 }}>
              Layer 3 (z: 20)
            </span>
            <span style={{ fontSize: 24, opacity: 0.7 }}>◾◾◾</span>
          </div>

          {/* Layer 4 */}
          <div
            style={{
              position: "relative",
              height: 80,
              background: "var(--color-surface-2)",
              border: "2px solid var(--color-border-green)",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 100,
              marginLeft: 60,
              boxShadow: "0 0 20px rgba(136,206,17,0.3)",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-primary)", fontWeight: 700 }}>
              Layer 4 (z: 100)
            </span>
            <span style={{ fontSize: 24, opacity: 1 }}>◾◾◾◾</span>
          </div>
        </div>

        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            padding: 20,
            marginTop: 32,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-muted)",
              margin: "0 0 12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            CSS Tokens
          </p>
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-primary)",
              margin: 0,
              overflow: "auto",
              background: "rgba(0, 0, 0, 0.2)",
              padding: 12,
              borderRadius: 8,
            }}
          >
{`--depth-layer-1: 0;      /* Base */
--depth-layer-2: 10;     /* Elevated */
--depth-layer-3: 20;     /* High */
--depth-layer-4: 100;    /* Topmost */`}
          </pre>
        </div>
      </section>

      {/* SECTION 7 — PARTICLE FIELD */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="07"
          title="Particle Field"
          desc="Floating particle system with mouse interaction — creates atmospheric depth and engagement."
        />
        <div style={{ marginBottom: 40 }}>
          {/* Preview */}
          <ParticleField height={400} />
          <p style={{ marginTop: 16, fontSize: 13, color: "var(--color-text-secondary)" }}>
            💡 Hover sobre as partículas para interagir. O efeito responde dinamicamente ao mouse.
          </p>
        </div>

        {/* Tokens */}
        <div style={{ marginBottom: 40 }}>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 16,
              color: "var(--color-text)",
            }}
          >
            Configuration Tokens
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {/* Token 1 */}
            <div
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "var(--color-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  margin: "0 0 8px",
                }}
              >
                Particle Count
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "0 0 8px",
                  color: "var(--color-text)",
                }}
              >
                90
              </p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>
                Total particles floating. Increase for denser field, decrease for minimal.
              </p>
            </div>

            {/* Token 2 */}
            <div
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "var(--color-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  margin: "0 0 8px",
                }}
              >
                Speed Range
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "0 0 8px",
                  color: "var(--color-text)",
                }}
              >
                0.2 - 1.0
              </p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>
                Vertical drift speed (pixels/frame). Higher = faster upward float.
              </p>
            </div>

            {/* Token 3 */}
            <div
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "var(--color-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  margin: "0 0 8px",
                }}
              >
                Drift Range
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "0 0 8px",
                  color: "var(--color-text)",
                }}
              >
                ±0.4
              </p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>
                Horizontal sway. Creates organic, non-linear movement.
              </p>
            </div>

            {/* Token 4 */}
            <div
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "var(--color-primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  margin: "0 0 8px",
                }}
              >
                Mouse Interaction
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 18,
                  fontWeight: 700,
                  margin: "0 0 8px",
                  color: "var(--color-text)",
                }}
              >
                140px radius
              </p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>
                Distance at which particles respond to cursor. Increases opacity on hover.
              </p>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div style={{ marginBottom: 40 }}>
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 16,
              color: "var(--color-text)",
            }}
          >
            Color Tokens
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
            }}
          >
            {[
              {
                color: "rgba(136, 206, 17, 1)",
                name: "Primary Green (100%)",
              },
              {
                color: "rgba(136, 206, 17, 0.85)",
                name: "Primary Green (85%)",
              },
              {
                color: "rgba(255, 255, 255, 0.6)",
                name: "White (60%)",
              },
              {
                color: "rgba(255, 255, 255, 0.4)",
                name: "White (40%)",
              },
            ].map((token, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 80,
                    background: token.color,
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                  }}
                />
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--color-text-secondary)",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  {token.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation */}
        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-muted)",
              margin: "0 0 12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Implementation
          </p>
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-primary)",
              margin: 0,
              overflow: "auto",
              background: "rgba(0, 0, 0, 0.2)",
              padding: 12,
              borderRadius: 8,
            }}
          >
{`import ParticleField from "@/components/ui/ParticleField";

{/* Default (320px height) */}
<ParticleField />

{/* Custom height */}
<ParticleField height={400} />

{/* Configuration */}
const particles = {
  count: 90,
  speedY: [0.2, 1.0],
  drift: [-0.4, 0.4],
  sizeRange: [1, 4],
  opacity: [0.3, 0.8],
  colors: ["rgba(136,206,17,1)", "rgba(255,255,255,0.6)"]
};`}
          </pre>
        </div>
      </section>

      {/* SECTION 8 — PARTICLE FIELD VARIATIONS (WAVES) */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="08"
          title="Particle Field: Waves"
          desc="Sinusoidal wave pattern — particles move horizontally while oscillating up and down."
        />
        <div style={{ marginBottom: 40 }}>
          <ParticleFieldWaves height={400} />
          <p style={{ marginTop: 16, fontSize: 13, color: "var(--color-text-secondary)" }}>
            💡 Partículas em movimento ondulatório sincronizado. Ótimo para efeito de fluxo contínuo.
          </p>
        </div>
        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-muted)",
              margin: "0 0 12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Implementation
          </p>
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-primary)",
              margin: 0,
              overflow: "auto",
              background: "rgba(0, 0, 0, 0.2)",
              padding: 12,
              borderRadius: 8,
            }}
          >
{`import ParticleFieldWaves from "@/components/ui/ParticleFieldWaves";

<ParticleFieldWaves height={400} />

{/* 80 particles moving in sinusoidal waves */}
{/* Frequency: 0.02-0.04 */}
{/* Amplitude: 30-80px */}`}
          </pre>
        </div>
      </section>

      {/* SECTION 9 — PARTICLE FIELD VARIATIONS (WIND FLOW) */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="09"
          title="Particle Field: Wind Flow"
          desc="Wind simulation — particles flow horizontally with turbulent vertical oscillations."
        />
        <div style={{ marginBottom: 40 }}>
          <ParticleFieldWindFlow height={400} />
          <p style={{ marginTop: 16, fontSize: 13, color: "var(--color-text-secondary)" }}>
            💡 Fluxo contínuo com turbulência natural. Perfeito para efeito de vento e movimento dinâmico.
          </p>
        </div>
        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-muted)",
              margin: "0 0 12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Implementation
          </p>
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-primary)",
              margin: 0,
              overflow: "auto",
              background: "rgba(0, 0, 0, 0.2)",
              padding: 12,
              borderRadius: 8,
            }}
          >
{`import ParticleFieldWindFlow from "@/components/ui/ParticleFieldWindFlow";

<ParticleFieldWindFlow height={400} />

{/* 100 particles flowing horizontally */}
{/* Turbulent vertical oscillations */}
{/* Continuous wrap-around effect */}`}
          </pre>
        </div>
      </section>

      {/* SECTION 10 — PARTICLE FIELD VARIATIONS (PULSE) */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="10"
          title="Particle Field: Pulse"
          desc="Radial pulse — particles expand and contract in synchronized waves from center."
        />
        <div style={{ marginBottom: 40 }}>
          <ParticleFieldPulse height={400} />
          <p style={{ marginTop: 16, fontSize: 13, color: "var(--color-text-secondary)" }}>
            💡 Efeito de pulsação rítmica. Ótimo para criar energia e movimento.
          </p>
        </div>
        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-muted)",
              margin: "0 0 12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Implementation
          </p>
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-primary)",
              margin: 0,
              overflow: "auto",
              background: "rgba(0, 0, 0, 0.2)",
              padding: 12,
              borderRadius: 8,
            }}
          >
{`import ParticleFieldPulse from "@/components/ui/ParticleFieldPulse";

<ParticleFieldPulse height={400} />

{/* 70 particles pulsing radially */}
{/* Distance oscillates with sine */}
{/* Glow intensity correlates with pulse */}`}
          </pre>
        </div>
      </section>

      {/* SECTION 11 — PARTICLE FIELD VARIATIONS (GRID PULSE) */}
      <section style={{ marginBottom: 64 }}>
        <SectionHeader
          number="11"
          title="Particle Field: Grid Pulse"
          desc="Grid formation with rhythmic pulsation — particles arrange in a matrix and distort with beat."
        />
        <div style={{ marginBottom: 40 }}>
          <ParticleFieldGridPulse height={400} />
          <p style={{ marginTop: 16, fontSize: 13, color: "var(--color-text-secondary)" }}>
            💡 Grid que distorce e pulsa ritmicamente. Perfeito para efeitos tecnológicos e visualizadores.
          </p>
        </div>
        <div
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-text-muted)",
              margin: "0 0 12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Implementation
          </p>
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-primary)",
              margin: 0,
              overflow: "auto",
              background: "rgba(0, 0, 0, 0.2)",
              padding: 12,
              borderRadius: 8,
            }}
          >
{`import ParticleFieldGridPulse from "@/components/ui/ParticleFieldGridPulse";

<ParticleFieldGridPulse height={400} />

{/* 48 particles arranged in 8x6 grid */}
{/* Sinusoidal distortion based on distance from center */}
{/* Synchronized global pulse + local phase shifts */}`}
          </pre>
        </div>
      </section>
    </PageLayout>
  );
}

function SectionHeader({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <header style={{ marginBottom: 32 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--color-primary)",
          fontWeight: 700,
          letterSpacing: 0.2,
          marginBottom: 4,
        }}
      >
        ── {number}
      </div>
      <h2
        style={{
          fontSize: 28,
          fontWeight: 800,
          margin: "0 0 8px",
          letterSpacing: -0.5,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: "var(--color-text-secondary)",
          margin: 0,
          fontSize: 14,
          maxWidth: 720,
          lineHeight: 1.5,
        }}
      >
        {desc}
      </p>
    </header>
  );
}
