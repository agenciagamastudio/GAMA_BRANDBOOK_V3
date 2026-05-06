interface ComingSoonCardProps {
  section: string;
  description?: string;
}

export default function ComingSoonCard({ section, description }: ComingSoonCardProps) {
  return (
    <div
      className="glass-illuminated liquid-edge"
      style={{
        padding: 48,
        textAlign: "center",
        borderRadius: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          margin: "0 auto 24px",
          borderRadius: "50%",
          background: "var(--color-primary-dim)",
          border: "1px solid var(--color-border-green)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          fontWeight: 900,
          color: "var(--color-primary)",
          boxShadow: "0 0 30px rgba(136,206,17,0.3)",
        }}
      >
        ◐
      </div>
      <h3 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 8px" }}>
        Em construção
      </h3>
      <p
        style={{
          color: "var(--color-text-secondary)",
          maxWidth: 480,
          margin: "0 auto",
          fontSize: 15,
          lineHeight: 1.6,
        }}
      >
        {description ||
          `A seção “${section}” está sendo construída com o novo padrão V3 — Liquid Glass, volumetric lighting e tokens unificados. Volte em breve.`}
      </p>
      <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 8 }}>
        <span className="pill pill-green">V3.0</span>
        <span className="pill pill-muted">PLANNED</span>
      </div>
    </div>
  );
}
