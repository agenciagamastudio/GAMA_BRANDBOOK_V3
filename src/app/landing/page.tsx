"use client";

import Link from "next/link";
import ParticleField from "@/components/ui/ParticleField";

const FEATURES = [
  {
    icon: "◐",
    title: "Liquid Glass",
    desc: "5 variantes de glassmorphism: glass, glass-card, glass-intense, glass-illuminated, glass-subtle. Cada uma com profundidade e comportamento únicos.",
    pill: "5 Variants",
    pillCls: "pill-green",
  },
  {
    icon: "◆",
    title: "Volumetric Lighting",
    desc: "Glows radiais, raios cônicos e pulsos de luz animados. Profundidade real que nenhum flat design consegue replicar.",
    pill: "4 Effects",
    pillCls: "pill-green",
  },
  {
    icon: "▣",
    title: "Tokenização Total",
    desc: "Zero hardcoded values. Cada cor, espaçamento e radius é CSS Custom Property. Dark e light com uma troca de atributo.",
    pill: "100% Tokens",
    pillCls: "pill-blue",
  },
  {
    icon: "◇",
    title: "Dark + Light Mode",
    desc: "Dois temas completos nativos. Transição suave, todos os componentes validados em ambos. Nenhum sacrifício de contraste.",
    pill: "2 Themes",
    pillCls: "pill-muted",
  },
  {
    icon: "✦",
    title: "PT/EN Nativo",
    desc: "LanguageProvider com toggle integrado. Todas as strings do sistema prontas em português e inglês.",
    pill: "i18n",
    pillCls: "pill-muted",
  },
  {
    icon: "→",
    title: "Motion System",
    desc: "Keyframes nomeados, classes .fade-up com stagger delays, page-enter transitions. Animação consistente em toda a interface.",
    pill: "8 Keyframes",
    pillCls: "pill-green",
  },
];

const STATS = [
  { v: "21+", l: "Componentes" },
  { v: "5", l: "Efeitos Glass" },
  { v: "Dark + Light", l: "Temas Nativos" },
  { v: "PT/EN", l: "Idiomas" },
];

const GLASS_SHOWCASE = [
  {
    cls: "glass",
    label: ".glass",
    desc: "Base — blur 30px, inset glow",
  },
  {
    cls: "glass-card",
    label: ".glass-card",
    desc: "Brandbook — gradient edge",
  },
  {
    cls: "glass-intense",
    label: ".glass-intense",
    desc: "Strong — blur 40px, green glow",
  },
  {
    cls: "glass-illuminated liquid-edge",
    label: ".glass-illuminated",
    desc: "Animated — illumination pulse",
  },
];

export default function LandingPage() {
  return (
    <div
      className="page-enter"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--color-bg)",
        minHeight: "100vh",
      }}
    >
      {/* Volumetric background blobs */}
      <div
        className="bg-blob bg-blob-1"
        style={{ width: 700, height: 700, top: -200, right: -160, opacity: 0.5 }}
      />
      <div
        className="bg-blob bg-blob-2"
        style={{ width: 500, height: 500, top: 400, left: -200, opacity: 0.35 }}
      />
      <div
        className="bg-blob bg-blob-3"
        style={{ width: 400, height: 400, top: 900, right: 60, opacity: 0.3 }}
      />

      {/* Sticky topnav */}
      <header
        className="topnav"
        style={{
          padding: "14px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            className="animate-pulse-green"
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              color: "#0a0a0a",
              fontSize: 15,
              flexShrink: 0,
            }}
          >
            G
          </div>
          <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: -0.3 }}>GAMA</span>
          <span style={{ fontSize: 12, color: "var(--color-text-muted)", fontWeight: 500 }}>
            Design System
          </span>
          <span className="pill pill-green" style={{ marginLeft: 4 }}>
            V3
          </span>
        </div>
        <nav
          style={{
            display: "flex",
            gap: 28,
            fontSize: 13,
            color: "var(--color-text-secondary)",
          }}
        >
          <a href="#features" style={{ transition: "color 200ms" }}>
            Features
          </a>
          <a href="#glass" style={{ transition: "color 200ms" }}>
            Glass
          </a>
          <a href="#stats" style={{ transition: "color 200ms" }}>
            Stats
          </a>
        </nav>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/foundations/colors" className="btn btn-ghost btn-sm">
            Docs
          </Link>
          <Link href="/" className="btn btn-primary btn-sm glow-green">
            Explorar DS →
          </Link>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        style={{
          padding: "100px 40px 80px",
          maxWidth: 1280,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Particle field behind headline */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 32,
            overflow: "hidden",
            opacity: 0.6,
          }}
        >
          <ParticleField height={480} />
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <span className="pill pill-green fade-up fade-up-1">
            NOVO · GAMA DESIGN SYSTEM V3
          </span>

          <h1
            className="fade-up fade-up-2"
            style={{
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: -3,
              margin: "24px auto 0",
              maxWidth: 1050,
            }}
          >
            Construindo Marcas
            <br />
            <span className="gradient-text-animated">de Impacto</span>
          </h1>

          <p
            className="fade-up fade-up-3"
            style={{
              fontSize: 20,
              color: "var(--color-text-secondary)",
              maxWidth: 680,
              margin: "28px auto 44px",
              lineHeight: 1.65,
            }}
          >
            Liquid Glass, volumetric lighting e tokens unificados — tudo que times
            de produto precisam para criar interfaces premium em horas, não meses.
          </p>

          <div
            className="fade-up fade-up-4"
            style={{ display: "flex", justifyContent: "center", gap: 12 }}
          >
            <Link
              href="/components/atoms/buttons"
              className="btn btn-primary btn-lg glow-green"
            >
              Explorar Componentes →
            </Link>
            <Link href="/foundations/effects" className="btn btn-secondary btn-lg">
              Ver Efeitos
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div
          id="stats"
          className="fade-up fade-up-5"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 0,
            marginTop: 72,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            className="glass-card vol-light"
            style={{
              display: "flex",
              borderRadius: 20,
              overflow: "hidden",
              width: "100%",
              maxWidth: 800,
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.l}
                style={{
                  flex: 1,
                  padding: "28px 16px",
                  textAlign: "center",
                  borderRight:
                    i < STATS.length - 1 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <div
                  className="gradient-text"
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    letterSpacing: -1,
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {s.v}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    fontWeight: 700,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <section
        id="features"
        style={{
          padding: "80px 40px",
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="pill pill-green">FEATURES</span>
          <h2
            style={{
              fontSize: 52,
              fontWeight: 900,
              margin: "16px 0 12px",
              letterSpacing: -1.5,
              lineHeight: 1.1,
            }}
          >
            Tudo que você{" "}
            <span className="gradient-text">precisa</span>
          </h2>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: 17,
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Componentes, tokens e padrões prontos. Consistência visual garantida
            em todo o produto.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`glass-illuminated liquid-edge fade-up fade-up-${Math.min(i + 1, 6)}`}
              style={{ padding: 32, borderRadius: 20, minHeight: 220 }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: "var(--color-primary-dim)",
                  border: "1px solid var(--color-border-green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  color: "var(--color-primary)",
                  fontWeight: 900,
                  marginBottom: 20,
                }}
              >
                {f.icon}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{f.title}</h3>
                <span className={`pill ${f.pillCls}`} style={{ fontSize: 11, flexShrink: 0 }}>
                  {f.pill}
                </span>
              </div>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.65,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GLASS SHOWCASE ────────────────────────────────── */}
      <section
        id="glass"
        style={{
          padding: "80px 40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "64px 56px",
            borderRadius: 32,
            background:
              "linear-gradient(135deg, rgba(136,206,17,0.06) 0%, rgba(39,39,39,0.5) 50%, rgba(136,206,17,0.04) 100%)",
            border: "1px solid rgba(136,206,17,0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="bg-blob bg-blob-1"
            style={{ width: 300, height: 300, top: -60, right: 60, opacity: 0.4 }}
          />
          <div style={{ textAlign: "center", marginBottom: 48, position: "relative", zIndex: 1 }}>
            <span className="pill pill-green">LIQUID GLASS</span>
            <h2
              style={{
                fontSize: 44,
                fontWeight: 900,
                margin: "16px 0 10px",
                letterSpacing: -1.2,
              }}
            >
              4 variantes,{" "}
              <span className="gradient-text">profundidade real</span>
            </h2>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: 16,
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Do glass sutil ao glass-illuminated animado — escolha o nível
              certo para cada contexto da interface.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              position: "relative",
              zIndex: 1,
            }}
          >
            {GLASS_SHOWCASE.map((g) => (
              <div
                key={g.label}
                className={g.cls}
                style={{
                  padding: 28,
                  borderRadius: 20,
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
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
                  {g.label}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--color-text-secondary)",
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 40px 100px",
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="glass-illuminated volumetric-glow liquid-edge"
          style={{
            padding: "80px 64px",
            borderRadius: 32,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="bg-blob bg-blob-1"
            style={{ width: 300, height: 300, top: -100, right: 80, opacity: 0.3 }}
          />
          <h2
            style={{
              fontSize: 60,
              fontWeight: 900,
              margin: "0 0 20px",
              letterSpacing: -2,
              lineHeight: 1.05,
              position: "relative",
              zIndex: 1,
            }}
          >
            Pronto para{" "}
            <span className="gradient-text-animated">usar?</span>
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--color-text-secondary)",
              maxWidth: 580,
              margin: "0 auto 40px",
              lineHeight: 1.65,
              position: "relative",
              zIndex: 1,
            }}
          >
            Todos os componentes, tokens e padrões em um só lugar. Comece
            explorando os átomos ou veja os efeitos glass ao vivo.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Link
              href="/components/atoms/buttons"
              className="btn btn-primary btn-lg glow-green"
            >
              Ver Componentes →
            </Link>
            <Link href="/foundations/effects" className="btn btn-secondary btn-lg">
              Ver Efeitos Glass
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="glass-card"
        style={{
          padding: "28px 40px",
          textAlign: "center",
          borderRadius: 0,
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "none",
          color: "var(--color-text-muted)",
          fontSize: 13,
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              background: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 9,
              color: "#0a0a0a",
            }}
          >
            G
          </div>
          <span>GAMA Design System V3.0</span>
        </div>
        <span>Tokenizado · Dark + Light · PT/EN</span>
        <Link href="/" style={{ color: "var(--color-primary)", fontWeight: 600, fontSize: 12 }}>
          Abrir DS →
        </Link>
      </footer>
    </div>
  );
}
