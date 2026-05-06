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

const CODE = `/* CSS shimmer */
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.skeleton {
  background: linear-gradient(90deg,
    var(--color-surface-2) 25%,
    var(--color-border) 50%,
    var(--color-surface-2) 75%
  );
  background-size: 200% auto;
  animation: shimmer 1.5s linear infinite;
  border-radius: var(--radius-sm);
}`;

function Skeleton({ width = "100%", height = 16, radius = 6, style }: { width?: number | string; height?: number; radius?: number; style?: React.CSSProperties }) {
  return (
    <div style={{
      width, height, borderRadius: radius,
      background: "linear-gradient(90deg, var(--color-surface-2) 25%, var(--color-border) 50%, var(--color-surface-2) 75%)",
      backgroundSize: "200% auto",
      animation: "shimmer 1.5s linear infinite",
      flexShrink: 0,
      ...style,
    }} />
  );
}

export default function SkeletonsPage() {
  return (
    <PageLayout
      title="Skeletons"
      accentWord="Skeletons"
      subtitle="Placeholder de carregamento com efeito shimmer. Reduz percepção de lentidão e mantém o layout estável durante fetches."
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Atoms", href: "/components/atoms/buttons" },
        { label: "Skeletons" },
      ]}
      badge="ATOM"
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* Text skeletons */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Texto" desc="Simule parágrafos e títulos com barras de diferentes comprimentos." />
        <div className="glass-card" style={{ padding: 32, maxWidth: 480 }}>
          <Skeleton width="60%" height={24} radius={6} style={{ marginBottom: 16 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Skeleton width="100%" height={14} radius={4} />
            <Skeleton width="95%" height={14} radius={4} />
            <Skeleton width="88%" height={14} radius={4} />
            <Skeleton width="92%" height={14} radius={4} />
            <Skeleton width="70%" height={14} radius={4} />
          </div>
        </div>
      </section>

      {/* Card skeleton */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Card" desc="Esqueleto de um card com header, mídia e corpo de texto." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
              <Skeleton width="100%" height={140} radius={0} />
              <div style={{ padding: 16 }}>
                <Skeleton width="70%" height={16} radius={4} style={{ marginBottom: 10 }} />
                <Skeleton width="100%" height={12} radius={4} style={{ marginBottom: 6 }} />
                <Skeleton width="85%" height={12} radius={4} style={{ marginBottom: 16 }} />
                <Skeleton width="40%" height={28} radius={8} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Avatar + text skeleton */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Perfil / Feed" desc="Padrão para listas de usuários, posts e feeds." />
        <div className="glass-card" style={{ padding: 24, maxWidth: 480 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <Skeleton width={44} height={44} radius={999} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <Skeleton width="40%" height={14} radius={4} />
                  <Skeleton width="100%" height={12} radius={4} />
                  <Skeleton width="75%" height={12} radius={4} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table skeleton */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Tabela" desc="Simule linhas de tabela durante carregamento de dados." />
        <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1fr", gap: 0, padding: "12px 20px", borderBottom: "1px solid var(--color-border)" }}>
            {["Nome", "Email", "Status", "Ações"].map((h) => (
              <span key={h} style={{ fontSize: 11, color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 700 }}>{h}</span>
            ))}
          </div>
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1fr", gap: 16, padding: "16px 20px", borderBottom: "1px solid var(--color-border)", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Skeleton width={32} height={32} radius={999} style={{ flexShrink: 0 }} />
                <Skeleton width="70%" height={12} radius={4} />
              </div>
              <Skeleton width="80%" height={12} radius={4} />
              <Skeleton width={60} height={20} radius={999} />
              <div style={{ display: "flex", gap: 8 }}>
                <Skeleton width={28} height={28} radius={6} />
                <Skeleton width={28} height={28} radius={6} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard skeleton */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Dashboard Metrics" desc="Esqueleto de cards de métricas no estilo dashboard." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card" style={{ padding: 20 }}>
              <Skeleton width="50%" height={12} radius={4} style={{ marginBottom: 12 }} />
              <Skeleton width="70%" height={32} radius={6} style={{ marginBottom: 10 }} />
              <Skeleton width="40%" height={10} radius={4} />
            </div>
          ))}
        </div>
      </section>

      {/* Code */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="06" title="Código" />
        <div className="code-block">
          <pre style={{ margin: 0, fontSize: 13 }}>{CODE}</pre>
        </div>
      </section>
    </PageLayout>
  );
}
