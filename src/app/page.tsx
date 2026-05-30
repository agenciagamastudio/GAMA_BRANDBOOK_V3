"use client";

import Link from "next/link";
import { useState } from "react";

const PILLARS = [
  {
    title: "Brand",
    desc: "Identidade visual, voz e aplicações da marca GAMA.",
    href: "/brand/identity",
    icon: "◆",
  },
  {
    title: "Foundations",
    desc: "Cores, tipografia, espaçamento, ícones, efeitos e motion.",
    href: "/foundations/colors",
    icon: "◇",
  },
  {
    title: "Components",
    desc: "Atoms, molecules e organisms tokenizados, prontos para produção.",
    href: "/components/atoms/buttons",
    icon: "▣",
  },
  {
    title: "Templates",
    desc: "Layouts completos para SaaS, landing, dashboard e nichos verticais.",
    href: "/templates",
    icon: "▤",
  },
];

const NEW_V3 = [
  { title: "Liquid Glass nativo", desc: "Sistema de glassmorphism em camadas (subtle → intense → illuminated)." },
  { title: "Volumetric Lighting", desc: "Glows, raios cônicos e blob backgrounds animados." },
  { title: "Dark + Light", desc: "Tokens duais com transição suave entre temas." },
  { title: "Custom Scrollbar", desc: "Scrollbar verde, fina, com gradient — em todo o sistema." },
  { title: "Layout 100% estável", desc: "Zero overflow, sidebar e main scroll independentes." },
  { title: "PT/EN nativo", desc: "Toggle de idioma persistente em localStorage." },
];

const QUICK_LINKS = [
  { label: "Cores", href: "/foundations/colors" },
  { label: "Tipografia", href: "/foundations/typography" },
  { label: "Efeitos & Glass", href: "/foundations/effects" },
  { label: "Buttons", href: "/components/atoms/buttons" },
  { label: "Tokens", href: "/tokens" },
  { label: "Landing demo", href: "/landing" },
];

export default function HomePage() {
  const [metricsHoveredIdx, setMetricsHoveredIdx] = useState<number | null>(null);
  const [pillarsHoveredIdx, setPillarsHoveredIdx] = useState<number | null>(null);

  return (
    <div className="page-enter" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background blobs */}
      <div
        className="bg-blob bg-blob-1"
        style={{ width: 480, height: 480, top: -120, left: -120 }}
      />
      <div
        className="bg-blob bg-blob-2"
        style={{ width: 360, height: 360, top: 240, right: -80 }}
      />

      {/* Volumetric Lighting (God Rays) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: 800,
          height: 600,
          transform: "translateX(-50%)",
          background: `radial-gradient(ellipse 400px 300px at center top, rgba(136, 206, 17, 0.12), transparent)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          padding: "56px 48px 80px",
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Hero */}
        <header style={{ marginBottom: 56 }}>
          <span className="pill pill-green fade-up fade-up-1">
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "var(--color-primary)", boxShadow: "0 0 8px var(--color-primary)" }} />
            VERSÃO 3.0 · STABLE
          </span>
          <h1
            className="fade-up fade-up-2"
            style={{
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              margin: "16px 0 16px",
            }}
          >
            GAMA Design <span className="gradient-text">System V3</span>
          </h1>
          <p
            className="fade-up fade-up-3"
            style={{
              fontSize: 19,
              color: "var(--color-text-secondary)",
              maxWidth: 720,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            A nova geração do brandbook GAMA — completamente tokenizado, com Liquid
            Glass, volumetric lighting e suporte nativo a dark + light. Construído
            para escalar.
          </p>
        </header>

        {/* Metrics — Enhanced with Glass Material + Emissive Glow */}
        <section
          className="fade-up fade-up-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 64,
          }}
        >
          {[
            { v: "21+", l: "Componentes" },
            { v: "13+", l: "Páginas" },
            { v: "100%", l: "Tokenizado" },
            { v: "Dark + Light", l: "Modos" },
          ].map((m, idx) => (
            <div
              key={m.l}
              className="glass-card vol-light"
              onMouseEnter={() => setMetricsHoveredIdx(idx)}
              onMouseLeave={() => setMetricsHoveredIdx(null)}
              style={{
                padding: "24px 20px",
                textAlign: "center",
                backdropFilter: `blur(var(--glass-blur))`,
                background: `var(--glass-surface)`,
                border: `1px solid var(--glass-border)`,
                borderRadius: 16,
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: metricsHoveredIdx === idx
                  ? "var(--glow-primary-md), var(--shadow-elevation-2)"
                  : "var(--shadow-elevation-2)",
                transform: metricsHoveredIdx === idx ? "translateY(-4px)" : "translateY(0)",
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
                {m.v}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--color-text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: 0.1,
                  fontWeight: 600,
                }}
              >
                {m.l}
              </div>
            </div>
          ))}
        </section>

        {/* Pillars — Enhanced with Glass Material + Emissive Glow */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 24px" }}>
            Pilares
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            {PILLARS.map((p, i) => (
              <Link
                key={p.title}
                href={p.href}
                className={`glass-illuminated liquid-edge fade-up fade-up-${i + 1}`}
                onMouseEnter={() => setPillarsHoveredIdx(i)}
                onMouseLeave={() => setPillarsHoveredIdx(null)}
                style={{
                  padding: 32,
                  borderRadius: 20,
                  display: "block",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: `blur(var(--glass-blur))`,
                  background: `var(--glass-surface)`,
                  border: `1px solid var(--glass-border)`,
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: pillarsHoveredIdx === i
                    ? "var(--glow-primary-md), var(--shadow-elevation-2)"
                    : "var(--shadow-elevation-2)",
                  transform: pillarsHoveredIdx === i ? "translateY(-8px)" : "translateY(0)",
                }}
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
                    marginBottom: 20,
                    fontWeight: 900,
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: pillarsHoveredIdx === i ? "var(--glow-primary-sm)" : "none",
                  }}
                >
                  {p.icon}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px" }}>
                  {p.title}
                </h3>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    margin: 0,
                    lineHeight: 1.6,
                    fontSize: 14,
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    marginTop: 16,
                    color: "var(--color-primary)",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  Explorar →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* What's new in V3 */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 24px" }}>
            Novidades V3
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {NEW_V3.map((n) => (
              <div
                key={n.title}
                className="glass-card"
                style={{ padding: 24 }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: "var(--color-primary)",
                    marginBottom: 8,
                    fontWeight: 900,
                  }}
                >
                  +
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px" }}>
                  {n.title}
                </h4>
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    margin: 0,
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {n.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick links */}
        <section>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 24px" }}>
            Atalhos
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {QUICK_LINKS.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="glass-subtle"
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                <span>{q.label}</span>
                <span style={{ color: "var(--color-primary)" }}>→</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
