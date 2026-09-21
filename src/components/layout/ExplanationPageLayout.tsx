import type { ReactNode } from "react";

interface Section {
  title: string;
  content: ReactNode;
  icon?: string;
}

interface ExplanationPageLayoutProps {
  title: string;
  subtitle?: string;
  mainConcept?: string;
  sections: Section[];
  conclusion?: ReactNode;
  accentWord?: string;
}

export default function ExplanationPageLayout({
  title,
  subtitle,
  mainConcept,
  sections,
  conclusion,
  accentWord,
}: ExplanationPageLayoutProps) {
  // Render title with optional accent word
  let renderedTitle: ReactNode = title;
  if (accentWord && title.includes(accentWord)) {
    const parts = title.split(accentWord);
    renderedTitle = (
      <>
        {parts[0]}
        <span className="gradient-text">{accentWord}</span>
        {parts[1]}
      </>
    );
  }

  return (
    <div
      className="page-enter"
      style={{ padding: "32px 48px 64px", maxWidth: 960, margin: "0 auto" }}
    >
      {/* Header */}
      <header style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1.1,
            margin: "0 0 16px",
            letterSpacing: -0.5,
          }}
        >
          {renderedTitle}
        </h1>

        {subtitle && (
          <p
            style={{
              fontSize: 17,
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              maxWidth: 720,
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}
      </header>

      {/* Main Concept - Highlighted Box */}
      {mainConcept && (
        <div
          style={{
            backdropFilter: "blur(var(--glass-blur))",
            background: "var(--glass-surface)",
            border: "1px solid var(--glass-border)",
            borderRadius: 16,
            padding: 24,
            marginBottom: 48,
            boxShadow: "var(--shadow-elevation-2)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "var(--color-primary)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 8,
            }}
          >
            💡 Conceito Principal
          </div>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              margin: 0,
              color: "var(--color-text)",
            }}
          >
            {mainConcept}
          </p>
        </div>
      )}

      {/* Sections */}
      <div style={{ marginBottom: 48 }}>
        {sections.map((section, idx) => (
          <section
            key={idx}
            style={{
              marginBottom: 40,
              paddingBottom: 40,
              borderBottom:
                idx < sections.length - 1
                  ? "1px solid var(--color-border)"
                  : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              {section.icon && (
                <span style={{ fontSize: 24 }}>{section.icon}</span>
              )}
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  margin: 0,
                  color: "var(--color-text)",
                }}
              >
                {section.title}
              </h2>
            </div>

            <div
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              {section.content}
            </div>
          </section>
        ))}
      </div>

      {/* Conclusion */}
      {conclusion && (
        <div
          style={{
            backdropFilter: "blur(var(--glass-blur))",
            background: "var(--glass-surface)",
            border: "1px solid var(--glass-border)",
            borderRadius: 16,
            padding: 24,
            boxShadow: "var(--shadow-elevation-2)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "var(--color-primary)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 12,
            }}
          >
            ✓ Resumo
          </div>
          <div
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--color-text)",
            }}
          >
            {conclusion}
          </div>
        </div>
      )}
    </div>
  );
}
