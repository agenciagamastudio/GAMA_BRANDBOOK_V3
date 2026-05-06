"use client";
import { useState, useEffect } from "react";
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

const CODE = `function ProgressBar({ value, color = "var(--color-primary)", size = "md" }) {
  const heights = { sm: 4, md: 8, lg: 12 };
  return (
    <div style={{
      width: "100%", height: heights[size],
      background: "var(--color-surface-2)",
      borderRadius: 999, overflow: "hidden",
    }}>
      <div style={{
        width: value + "%", height: "100%",
        background: color, borderRadius: 999,
        transition: "width 0.6s ease",
      }} />
    </div>
  );
}`;

function ProgressBar({ value, color = "var(--color-primary)", size = "md", striped = false, label = false }: {
  value: number;
  color?: string;
  size?: "sm" | "md" | "lg";
  striped?: boolean;
  label?: boolean;
}) {
  const heights = { sm: 4, md: 8, lg: 12 };
  const h = heights[size];
  return (
    <div>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
          <span style={{ color: "var(--color-text-secondary)" }}>Progresso</span>
          <span style={{ fontWeight: 700, color }}>{value}%</span>
        </div>
      )}
      <div style={{ width: "100%", height: h, background: "var(--color-surface-2)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{
          width: `${value}%`, height: "100%",
          background: striped
            ? `repeating-linear-gradient(45deg, ${color}, ${color} 8px, ${color}cc 8px, ${color}cc 16px)`
            : color,
          borderRadius: 999,
          transition: "width 0.6s ease",
          animation: striped ? "progress-stripe 0.8s linear infinite" : undefined,
        }} />
      </div>
    </div>
  );
}

export default function ProgressBarsPage() {
  const [animated, setAnimated] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimated((prev) => {
        if (prev >= 100) return 5;
        return prev + 3;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout
      title="Progress Bars"
      accentWord="Progress"
      subtitle="Barras de progresso comunicam o avanço de um processo. CSS-only com transição suave e suporte a variantes coloridas."
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Atoms", href: "/components/atoms/buttons" },
        { label: "Progress Bars" },
      ]}
      badge="ATOM"
    >
      <style>{`
        @keyframes progress-stripe {
          0% { background-position: 0 0; }
          100% { background-position: 32px 0; }
        }
      `}</style>

      {/* Basic percentages */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Percentuais" desc="0%, 25%, 50%, 75%, 100% com cor primária." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[0, 25, 50, 75, 100].map((v) => (
              <div key={v} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ width: 36, fontSize: 13, fontWeight: 700, color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)", textAlign: "right" }}>{v}%</span>
                <div style={{ flex: 1 }}>
                  <ProgressBar value={v} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colors */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Cores Semânticas" desc="Verde = sucesso, Laranja = aviso, Vermelho = erro, Azul = info." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { color: "var(--color-primary)", value: 75, label: "Primary" },
              { color: "var(--color-success)", value: 90, label: "Success" },
              { color: "var(--color-warning)", value: 55, label: "Warning" },
              { color: "var(--color-error)", value: 30, label: "Error" },
              { color: "var(--color-info)", value: 65, label: "Info" },
            ].map((b) => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ width: 60, fontSize: 12, color: "var(--color-text-muted)", flexShrink: 0 }}>{b.label}</span>
                <div style={{ flex: 1 }}>
                  <ProgressBar value={b.value} color={b.color} />
                </div>
                <span style={{ width: 36, fontSize: 12, fontWeight: 700, color: b.color, fontFamily: "var(--font-mono)", textAlign: "right", flexShrink: 0 }}>{b.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Tamanhos" desc="SM (4px), MD padrão (8px), LG (12px)." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {(["sm", "md", "lg"] as const).map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ width: 40, fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>{s}</span>
                <div style={{ flex: 1 }}>
                  <ProgressBar value={65} size={s} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* With label */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Com Label" desc="Label inline mostra o valor numérico ao lado da barra." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
            <ProgressBar value={68} label={true} size="md" />
            <ProgressBar value={45} label={true} size="md" color="var(--color-warning)" />
            <ProgressBar value={92} label={true} size="md" color="var(--color-success)" />
          </div>
        </div>
      </section>

      {/* Striped animated */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Striped Animado" desc="Listras diagonais animadas para indicar processo em andamento." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
            <ProgressBar value={65} striped={true} size="lg" />
            <ProgressBar value={40} striped={true} size="lg" color="var(--color-info)" />
          </div>
        </div>
      </section>

      {/* Animated live */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="06" title="Animado (live)" desc="Progresso em tempo real — atualiza a cada 200ms." />
        <div className="glass-card" style={{ padding: 32, maxWidth: 480 }}>
          <ProgressBar value={animated} label={true} size="md" color={animated >= 100 ? "var(--color-success)" : "var(--color-primary)"} />
          <p style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 12 }}>
            {animated >= 100 ? "Concluído!" : "Processando..."}
          </p>
        </div>
      </section>

      {/* Code */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="07" title="Código" />
        <div className="code-block">
          <pre style={{ margin: 0, fontSize: 13 }}>{CODE}</pre>
        </div>
      </section>
    </PageLayout>
  );
}
