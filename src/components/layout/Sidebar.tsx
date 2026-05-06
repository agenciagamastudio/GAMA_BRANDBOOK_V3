"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { useLang } from "./LanguageProvider";

interface NavItem {
  label: string;
  href: string;
}

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
  subSections?: { label: string; items: NavItem[] }[];
}

const SECTIONS: NavSection[] = [
  {
    id: "overview",
    title: "OVERVIEW",
    items: [
      { label: "Home", href: "/" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    id: "brand",
    title: "BRAND",
    items: [
      { label: "Identidade Visual", href: "/brand/identity" },
      { label: "Tom de Voz", href: "/brand/voice" },
      { label: "Aplicações", href: "/brand/applications" },
    ],
  },
  {
    id: "foundations",
    title: "FOUNDATIONS",
    items: [
      { label: "Cores", href: "/foundations/colors" },
      { label: "Tipografia", href: "/foundations/typography" },
      { label: "Espaçamento", href: "/foundations/spacing" },
      { label: "Ícones", href: "/foundations/icons" },
      { label: "Efeitos & Glass", href: "/foundations/effects" },
      { label: "Motion & Animação", href: "/foundations/motion" },
    ],
  },
  {
    id: "components",
    title: "COMPONENTS",
    items: [],
    subSections: [
      {
        label: "Atoms",
        items: [
          { label: "Buttons", href: "/components/atoms/buttons" },
          { label: "Badges", href: "/components/atoms/badges" },
          { label: "Inputs", href: "/components/atoms/inputs" },
          { label: "Checkboxes", href: "/components/atoms/checkboxes" },
          { label: "Toggles", href: "/components/atoms/toggles" },
          { label: "Spinners", href: "/components/atoms/spinners" },
          { label: "Avatars", href: "/components/atoms/avatars" },
          { label: "Dividers", href: "/components/atoms/dividers" },
          { label: "Progress Bars", href: "/components/atoms/progress-bars" },
          { label: "Radio Groups", href: "/components/atoms/radio-groups" },
          { label: "Skeletons", href: "/components/atoms/skeletons" },
          { label: "Tags", href: "/components/atoms/tags" },
        ],
      },
      {
        label: "Molecules",
        items: [
          { label: "Cards", href: "/components/molecules/cards" },
          { label: "Alerts", href: "/components/molecules/alerts" },
          { label: "Dropdowns", href: "/components/molecules/dropdowns" },
          { label: "Tooltips", href: "/components/molecules/tooltips" },
          { label: "Form Fields", href: "/components/molecules/form-fields" },
        ],
      },
      {
        label: "Organisms",
        items: [
          { label: "Modals", href: "/components/organisms/modals" },
          { label: "Tables", href: "/components/organisms/tables" },
          { label: "Page Headers", href: "/components/organisms/page-headers" },
          { label: "Waveform", href: "/components/organisms/waveform" },
        ],
      },
    ],
  },
  {
    id: "templates",
    title: "TEMPLATES",
    items: [
      { label: "Overview", href: "/templates" },
      { label: "Social Agency", href: "/templates/social-agency" },
      { label: "Medical Clinic", href: "/templates/medical-clinic" },
      { label: "Landing Page", href: "/templates/landing-page" },
      { label: "Dashboard", href: "/templates/dashboard" },
    ],
  },
  {
    id: "showcase",
    title: "SHOWCASE",
    items: [
      { label: "Showcase", href: "/showcase" },
      { label: "Aplicações", href: "/showcase/applications" },
    ],
  },
  {
    id: "developer",
    title: "DEVELOPER",
    items: [
      { label: "Tokens", href: "/tokens" },
      { label: "Settings", href: "/settings" },
    ],
  },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (id: string) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      className="sidebar-glass flex-shrink-0"
      style={{
        width: 260,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Header / Brand */}
      <div
        style={{
          padding: "20px 16px 16px",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <div
            className="animate-pulse-green"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 0 20px rgba(136,206,17,0.4)",
            }}
          >
            <Image
              src="/brand/gama-icon.svg"
              alt="GAMA"
              width={436}
              height={436}
              style={{ width: 36, height: 36, display: "block" }}
              unoptimized
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span
              style={{
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: 0.5,
                color: "var(--color-text)",
              }}
            >
              GAMA DS
            </span>
            <span
              className="pill pill-green"
              style={{
                marginTop: 4,
                padding: "1px 6px",
                fontSize: 9,
                alignSelf: "flex-start",
              }}
            >
              V3.0
            </span>
          </div>
        </Link>

        {/* Theme + Lang toggle */}
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm"
            style={{ flex: 1, padding: "6px 8px" }}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Modo escuro" : "Modo claro"}
          >
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            <span style={{ fontSize: 11 }}>{theme === "dark" ? "Dark" : "Light"}</span>
          </button>
          <button
            onClick={toggleLang}
            className="btn btn-ghost btn-sm"
            style={{ flex: 1, padding: "6px 8px", fontSize: 11 }}
            aria-label="Toggle language"
          >
            {lang === "pt" ? "PT | en" : "pt | EN"}
          </button>
        </div>

        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            background: "var(--glass-bg-2)",
            border: "1px solid var(--color-border)",
            borderRadius: 10,
            color: "var(--color-text-muted)",
          }}
        >
          <SearchIcon />
          <input
            type="text"
            placeholder={t("search")}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--color-text)",
              fontSize: 12,
              flex: 1,
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 12px 24px",
        }}
      >
        {SECTIONS.map((section) => {
          const isCollapsed = collapsed[section.id];
          return (
            <div key={section.id} style={{ marginBottom: 4 }}>
              <div
                className="sidebar-section-title"
                onClick={() => toggleCollapse(section.id)}
              >
                <span>{section.title}</span>
                <span
                  className={`sidebar-chevron ${isCollapsed ? "collapsed" : ""}`}
                >
                  <ChevronIcon />
                </span>
              </div>

              {!isCollapsed && (
                <div>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`sidebar-link ${isActive(item.href) ? "active" : ""}`}
                    >
                      {item.label}
                    </Link>
                  ))}

                  {section.subSections?.map((sub) => (
                    <div key={sub.label} style={{ marginTop: 8 }}>
                      <div
                        style={{
                          padding: "6px 12px",
                          fontSize: 10,
                          fontWeight: 700,
                          color: "var(--color-text-muted)",
                          letterSpacing: 0.08,
                          textTransform: "uppercase",
                        }}
                      >
                        {sub.label}
                      </div>
                      {sub.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`sidebar-link ${isActive(item.href) ? "active" : ""}`}
                          style={{ paddingLeft: 18 }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid var(--color-border)",
          fontSize: 10,
          color: "var(--color-text-muted)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>GAMA DS V3.0</span>
        <span className="pill pill-green" style={{ padding: "1px 6px", fontSize: 9 }}>
          STABLE
        </span>
      </div>
    </aside>
  );
}
