"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
    id: "developer",
    title: "DEVELOPER",
    items: [
      { label: "Tokens", href: "/tokens" },
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
function PinIcon({ filled = false }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 17v5M9 2h6v7H9z" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedSubSections, setExpandedSubSections] = useState<Record<string, boolean>>({});

  // Load pin state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-pinned");
    if (saved) setIsPinned(JSON.parse(saved));
  }, []);

  // Persist pin state to localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-pinned", JSON.stringify(isPinned));
  }, [isPinned]);

  // Auto-expand subsections when hovered
  useEffect(() => {
    if (isHovered) {
      // Expand the COMPONENTS section automatically on hover
      setCollapsed((prev) => ({ ...prev, components: false }));
    }
  }, [isHovered]);

  // Inteligent toggle: expand section and auto-expand all subsections
  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => {
      const newCollapsed = { ...prev, [id]: !prev[id] };

      // Se está expandindo a seção, auto-expand todas as subsections também
      if (!newCollapsed[id]) {
        const section = SECTIONS.find(s => s.id === id);
        if (section?.subSections) {
          section.subSections.forEach(sub => {
            setExpandedSubSections((prevSub) => ({ ...prevSub, [sub.label]: true }));
          });
        }
      }

      return newCollapsed;
    });
  };

  const togglePin = () => setIsPinned(!isPinned);

  // Smart toggle for subsections: when parent is open, toggle subsection
  const toggleSubSection = (label: string) => {
    setExpandedSubSections((prev) => {
      const newExpanded = { ...prev, [label]: !prev[label] };
      return newExpanded;
    });
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isExpanded = isPinned || isHovered;
  const sidebarWidth = isExpanded ? 260 : 80;

  return (
    <aside
      className="sidebar-glass flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: sidebarWidth,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        zIndex: 40,
        transition: "width 0.3s ease-out, background 0.3s ease-out",
        overflow: "hidden",
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
          whiteSpace: "nowrap",
          transition: "opacity 0.3s ease-out",
        }}
      >
        {/* Top bar: Logo + Pin button */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              opacity: isExpanded ? 1 : 0.7,
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
            {isExpanded && (
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
            )}
          </Link>

          {/* Pin button - always visible */}
          <button
            onClick={togglePin}
            className="btn btn-ghost btn-sm"
            style={{
              padding: "6px 8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            aria-label={isPinned ? "Desafixar sidebar" : "Afixar sidebar"}
            title={isPinned ? "Sidebar fixada" : "Afixar sidebar"}
          >
            <PinIcon filled={isPinned} />
          </button>
        </div>

        {/* Theme + Lang toggle - only visible when expanded */}
        {isExpanded && (
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
        )}

        {/* Search - only visible when expanded */}
        {isExpanded && (
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
        )}
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "8px 12px 24px",
        }}
      >
        {SECTIONS.map((section) => {
          const isCollapsed = collapsed[section.id];
          const hasSubSections = section.subSections && section.subSections.length > 0;
          const hasContent = section.items.length > 0 || hasSubSections;

          return (
            <div key={section.id} style={{ marginBottom: 4 }}>
              {isExpanded && (
                <div
                  className="sidebar-section-title"
                  onClick={() => hasContent && toggleCollapse(section.id)}
                  style={{
                    cursor: hasContent ? "pointer" : "default",
                    opacity: hasContent ? 1 : 0.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    borderRadius: 6,
                    transition: "background 0.2s ease-out",
                    backgroundColor: isCollapsed ? "transparent" : "rgba(255,255,255,0.04)",
                  }}
                >
                  <span style={{ flex: 1, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
                    {section.title}
                  </span>
                  {hasContent && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease-out",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      <ChevronIcon />
                    </span>
                  )}
                </div>
              )}

              {!isCollapsed && (
                <div style={{ marginTop: 2 }}>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`sidebar-link ${isActive(item.href) ? "active" : ""}`}
                      title={!isExpanded ? item.label : undefined}
                      style={{
                        opacity: isExpanded ? 1 : 0.6,
                        minWidth: 0,
                        paddingLeft: isExpanded ? 12 : 8,
                      }}
                    >
                      {isExpanded ? item.label : item.label.substring(0, 1)}
                    </Link>
                  ))}

                  {isExpanded &&
                    section.subSections?.map((sub) => {
                      const subExpanded = expandedSubSections[sub.label] ?? true;
                      return (
                        <div key={sub.label} style={{ marginTop: 6 }}>
                          <div
                            onClick={() => toggleSubSection(sub.label)}
                            style={{
                              padding: "6px 12px",
                              fontSize: 10,
                              fontWeight: 700,
                              color: "var(--color-text-muted)",
                              letterSpacing: 0.08,
                              textTransform: "uppercase",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              userSelect: "none",
                              borderRadius: 4,
                              transition: "background 0.2s ease-out",
                              backgroundColor: subExpanded ? "rgba(136,206,17,0.08)" : "transparent",
                            }}
                          >
                            <span style={{ flex: 1 }}>{sub.label}</span>
                            <span
                              style={{
                                transform: subExpanded ? "rotate(0)" : "rotate(-90deg)",
                                transition: "transform 0.2s ease-out",
                                display: "flex",
                                alignItems: "center",
                                color: "var(--color-text-muted)",
                              }}
                            >
                              <ChevronIcon />
                            </span>
                          </div>
                          {subExpanded &&
                            sub.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`sidebar-link ${isActive(item.href) ? "active" : ""}`}
                                style={{
                                  paddingLeft: 24,
                                  fontSize: 12,
                                  transition: "all 0.2s ease-out",
                                }}
                              >
                                {item.label}
                              </Link>
                            ))}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer - only visible when expanded */}
      {isExpanded && (
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
      )}
    </aside>
  );
}
