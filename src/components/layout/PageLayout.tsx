import type { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  accentWord?: string;
  breadcrumb?: { label: string; href?: string }[];
  children: ReactNode;
  badge?: string;
}

export default function PageLayout({
  title,
  subtitle,
  accentWord,
  breadcrumb,
  children,
  badge,
}: PageLayoutProps) {
  // Render title with optional accent word in gradient
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
      style={{ padding: "32px 48px 64px", maxWidth: 1280, margin: "0 auto" }}
    >
      {breadcrumb && breadcrumb.length > 0 && (
        <nav
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            fontSize: 12,
            color: "var(--color-text-muted)",
            marginBottom: 16,
          }}
        >
          {breadcrumb.map((crumb, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {crumb.href ? (
                <a href={crumb.href} style={{ color: "inherit" }}>
                  {crumb.label}
                </a>
              ) : (
                <span style={{ color: "var(--color-text)" }}>{crumb.label}</span>
              )}
              {i < breadcrumb.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>
      )}

      <header style={{ marginBottom: 40 }}>
        {badge && (
          <span className="pill pill-green" style={{ marginBottom: 12 }}>
            {badge}
          </span>
        )}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1.1,
            margin: "12px 0 12px",
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
              maxWidth: 720,
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}
      </header>

      <div>{children}</div>
    </div>
  );
}
