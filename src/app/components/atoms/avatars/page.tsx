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

const COLORS = ["#88ce11", "#3b82f6", "#8b5cf6", "#f59e0b", "#e11d48", "#10b981", "#06b6d4", "#f97316"];

function Avatar({
  initials, size = 40, color = "#88ce11", status, image,
}: {
  initials: string; size?: number; color?: string; status?: "online" | "away" | "offline" | "busy"; image?: string;
}) {
  const fontSize = size < 30 ? 10 : size < 50 ? 14 : size < 68 ? 18 : 22;
  const statusColors = { online: "var(--color-success)", away: "var(--color-warning)", offline: "var(--color-text-muted)", busy: "var(--color-error)" };
  const statusSize = Math.round(size * 0.28);

  return (
    <div style={{ position: "relative", display: "inline-block", flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: image ? "transparent" : `${color}22`,
        border: `2px solid ${color}55`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize, fontWeight: 800, color, userSelect: "none", overflow: "hidden",
      }}>
        {image ? <img src={image} alt={initials} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
      </div>
      {status && (
        <span style={{
          position: "absolute", bottom: 1, right: 1,
          width: statusSize, height: statusSize, borderRadius: "50%",
          background: statusColors[status],
          border: "2px solid var(--color-surface)",
        }} />
      )}
    </div>
  );
}

const CODE = `function Avatar({ initials, size = 40, color = "#88ce11" }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color + "22",
      border: "2px solid " + color + "55",
      display: "flex", alignItems: "center",
      justifyContent: "center",
      fontSize: 14, fontWeight: 800, color,
    }}>
      {initials}
    </div>
  );
}`;

export default function AvatarsPage() {
  const people = [
    { initials: "GA", color: COLORS[0], name: "Gama Agency", role: "Admin" },
    { initials: "JD", color: COLORS[1], name: "João Dias", role: "Designer" },
    { initials: "MK", color: COLORS[2], name: "Maria K.", role: "Dev" },
    { initials: "RL", color: COLORS[3], name: "Roberto L.", role: "PM" },
    { initials: "AS", color: COLORS[4], name: "Ana S.", role: "QA" },
  ];

  return (
    <PageLayout
      title="Avatars"
      accentWord="Avatars"
      subtitle="Avatars identificam usuários com iniciais coloridas ou imagem. Suportam status, grupos sobrepostos e tamanhos escaláveis."
      breadcrumb={[
        { label: "Components", href: "/components" },
        { label: "Atoms", href: "/components/atoms/buttons" },
        { label: "Avatars" },
      ]}
      badge="ATOM"
    >
      {/* Sizes */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="01" title="Tamanhos" desc="4 tamanhos — XS 24px, SM 36px, MD 48px, LG 64px, XL 80px." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 32, alignItems: "flex-end", flexWrap: "wrap" }}>
            {[
              { size: 24, label: "XS" },
              { size: 36, label: "SM" },
              { size: 48, label: "MD" },
              { size: 64, label: "LG" },
              { size: 80, label: "XL" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Avatar initials="GA" size={s.size} color={COLORS[0]} />
                <span style={{ fontSize: 11, color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{s.label} {s.size}px</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colors */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="02" title="Cores" desc="Cada usuário recebe uma cor consistente derivada do seu ID ou nome." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {COLORS.map((color, i) => (
              <Avatar key={color} initials={["GA", "JD", "MK", "RL", "AS", "BT", "CP", "DV"][i]} size={48} color={color} />
            ))}
          </div>
        </div>
      </section>

      {/* With status */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="03" title="Com Status" desc="Dot colorido no canto inferior direito indica presença em tempo real." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            {[
              { status: "online" as const, label: "Online" },
              { status: "away" as const, label: "Away" },
              { status: "busy" as const, label: "Busy" },
              { status: "offline" as const, label: "Offline" },
            ].map((s) => (
              <div key={s.status} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Avatar initials="GA" size={52} color={COLORS[0]} status={s.status} />
                <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avatar group */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="04" title="Avatar Group" desc="Sobreposição para mostrar membros de uma equipe de forma compacta." />
        <div className="glass-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Compact group */}
            <div>
              <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 12 }}>Grupo compacto (sobreposição)</p>
              <div style={{ display: "flex" }}>
                {people.slice(0, 4).map((p, i) => (
                  <div key={p.initials} style={{ marginLeft: i === 0 ? 0 : -12, zIndex: people.length - i }}>
                    <Avatar initials={p.initials} size={40} color={p.color} />
                  </div>
                ))}
                <div style={{ marginLeft: -12, zIndex: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--color-surface-2)", border: "2px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--color-text-secondary)" }}>
                    +5
                  </div>
                </div>
              </div>
            </div>

            {/* With names */}
            <div>
              <p style={{ fontSize: 13, color: "var(--color-text-muted)", marginBottom: 12 }}>Com nome e cargo</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {people.map((p) => (
                  <div key={p.initials} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar initials={p.initials} size={40} color={p.color} status="online" />
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{p.name}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-muted)" }}>{p.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code */}
      <section style={{ marginBottom: 56 }}>
        <SectionHeader number="05" title="Código" />
        <div className="code-block">
          <pre style={{ margin: 0, fontSize: 13 }}>{CODE}</pre>
        </div>
      </section>
    </PageLayout>
  );
}
