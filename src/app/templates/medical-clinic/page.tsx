import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

const SPECIALISTS = [
  { name: "Dra. Ana Ferreira", specialty: "Cardiologia", crm: "CRM 12345-SP", avail: "Seg · Qua · Sex" },
  { name: "Dr. Carlos Lima", specialty: "Ortopedia", crm: "CRM 67890-SP", avail: "Ter · Qui" },
  { name: "Dra. Beatriz Costa", specialty: "Dermatologia", crm: "CRM 11223-SP", avail: "Seg · Qua" },
  { name: "Dr. Rafael Souza", specialty: "Neurologia", crm: "CRM 44556-SP", avail: "Qui · Sex" },
];

const PLANS = [
  {
    name: "Básico",
    price: "R$ 89",
    period: "/mês",
    features: ["Consulta online", "Chat com médico", "Receituário digital"],
    highlighted: false,
    pillCls: "pill-muted",
    pillLabel: "Starter",
  },
  {
    name: "Saúde Plus",
    price: "R$ 189",
    period: "/mês",
    features: ["Tudo do Básico", "Consultas presenciais", "Exames de rotina", "App de monitoramento"],
    highlighted: true,
    pillCls: "pill-green",
    pillLabel: "Popular",
  },
  {
    name: "Premium",
    price: "R$ 349",
    period: "/mês",
    features: ["Tudo do Plus", "Especialistas ilimitados", "UTI domiciliar 24h", "Seguro de vida"],
    highlighted: false,
    pillCls: "pill-blue",
    pillLabel: "Completo",
  },
];

const SLOTS = [
  { time: "08:00", status: "Livre" },
  { time: "09:00", status: "Ocupado" },
  { time: "10:00", status: "Livre" },
  { time: "11:00", status: "Ocupado" },
  { time: "14:00", status: "Livre" },
  { time: "15:00", status: "Livre" },
];

export default function MedicalClinicTemplatePage() {
  return (
    <PageLayout
      title="Medical Clinic"
      accentWord="Medical"
      subtitle="Template premium para clínicas e consultórios — agendamento, planos e perfil de especialistas."
      breadcrumb={[
        { label: "Templates", href: "/templates" },
        { label: "Medical Clinic" },
      ]}
      badge="V3 · TEMPLATE"
    >
      {/* Agendamento preview */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 16 }}>
          <span className="pill pill-green">AGENDAMENTO</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "8px 0 4px", letterSpacing: -0.3 }}>
            Horários disponíveis
          </h2>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>
            Dra. Ana Ferreira · Cardiologia · Segunda-feira
          </p>
        </div>
        <div
          className="glass-illuminated"
          style={{ padding: "24px 28px", borderRadius: 20 }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
            {SLOTS.map((slot) => (
              <div
                key={slot.time}
                style={{
                  padding: "14px 8px",
                  borderRadius: 12,
                  textAlign: "center",
                  background:
                    slot.status === "Livre"
                      ? "var(--color-primary-dim)"
                      : "rgba(255,255,255,0.03)",
                  border:
                    slot.status === "Livre"
                      ? "1px solid var(--color-border-green)"
                      : "1px solid var(--color-border)",
                  cursor: slot.status === "Livre" ? "pointer" : "not-allowed",
                  opacity: slot.status === "Ocupado" ? 0.45 : 1,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: 15,
                    color: slot.status === "Livre" ? "var(--color-primary)" : "var(--color-text-muted)",
                    marginBottom: 4,
                  }}
                >
                  {slot.time}
                </div>
                <div style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {slot.status}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-primary glow-green" style={{ cursor: "default" }}>
              Confirmar horário →
            </button>
          </div>
        </div>
      </section>

      {/* Especialistas */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 16 }}>
          <span className="pill pill-blue">EQUIPE</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "8px 0 4px", letterSpacing: -0.3 }}>
            Especialistas
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          {SPECIALISTS.map((s) => (
            <div
              key={s.name}
              className="glass-card"
              style={{ padding: "20px 24px", borderRadius: 16, display: "flex", alignItems: "center", gap: 16 }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "var(--color-primary-dim)",
                  border: "2px solid var(--color-border-green)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 18,
                  color: "var(--color-primary)",
                  flexShrink: 0,
                }}
              >
                {s.name.charAt(4)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "var(--color-primary)", fontWeight: 600, marginBottom: 4 }}>
                  {s.specialty}
                </div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
                  {s.crm} · {s.avail}
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ cursor: "default", flexShrink: 0 }}>
                Agendar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Planos */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 20 }}>
          <span className="pill pill-muted">PLANOS</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "8px 0 4px", letterSpacing: -0.3 }}>
            Planos de saúde
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={p.highlighted ? "glass-illuminated liquid-edge" : "glass-card"}
              style={{ padding: "28px 24px", borderRadius: 20 }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontWeight: 800, fontSize: 16 }}>{p.name}</span>
                <span className={`pill ${p.pillCls}`} style={{ fontSize: 10 }}>{p.pillLabel}</span>
              </div>
              <div style={{ marginBottom: 20 }}>
                <span
                  className="gradient-text"
                  style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1 }}
                >
                  {p.price}
                </span>
                <span style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{p.period}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
                {p.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 0",
                      borderTop: "1px solid var(--color-border)",
                      fontSize: 13,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: 14 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`btn ${p.highlighted ? "btn-primary glow-green" : "btn-secondary"}`}
                style={{ width: "100%", cursor: "default" }}
              >
                Escolher plano
              </button>
            </div>
          ))}
        </div>
      </section>

      <Link href="/templates" className="btn btn-ghost btn-sm" style={{ display: "inline-flex" }}>
        ← Voltar aos Templates
      </Link>
    </PageLayout>
  );
}
