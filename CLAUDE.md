---
name: GAMA Design System V3
description: Canonical design system platform (Next.js 15, TypeScript, Tailwind CSS)
type: design-system
status: STABLE
doc_tier: 2
owner: GAMA Design Team
repository: https://github.com/agenciagamastudio/GAMA_BRANDBOOK_V3
---

# GAMA Design System V3 — Claude Context

## 📌 Project Overview

**GAMA Design System V3** is the canonical visual system for Agência GAMA and all GAMA_ ecosystem projects. This is a **single source of truth** for:
- Design tokens (28 CSS custom properties)
- Component library (atoms, molecules, organisms)
- Visual effects system (glassmorphism, volumetric lighting, emissive glow)
- Dark/light mode support
- TypeScript type definitions

**Key Fact:** Every GAMA_ project (GAMA_VOZ, GAMA_ORÇAMENTO, GAMA_EDUCACAO, etc.) references this design system as its canonical source.

---

## 🏗️ Tech Stack

### Core
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.6 (strict mode)
- **Styling:** Tailwind CSS 3.4 + CSS Variables
- **Runtime:** Node.js 18+
- **Package Manager:** npm

### Design Infrastructure
- **28 CSS Custom Properties** (globals.css)
- **Tailwind Config** (theme.extend)
- **Design Tokens JSON** (public/design.tokens.json — Tokens Studio format)
- **CSS Animations** (fade-up, pulse-green, shimmer)

### Dependencies (Key)
```json
{
  "next": "^15.0.0",
  "react": "^18.0.0",
  "typescript": "^5.6.0",
  "tailwindcss": "^3.4.0"
}
```

---

## 🎨 Design Tokens System

### Single Source of Truth: `globals.css`

All visual properties defined in `:root` scope:

```css
:root {
  /* Colors */
  --color-primary: #88ce11;        /* Neon Green */
  --color-bg: #161616;              /* Dark */
  --color-text: #ffffff;
  --color-border: rgba(255,255,255,0.1);

  /* Glass Material */
  --glass-blur: 24px;
  --glass-surface: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.15);

  /* Volumetric Lighting */
  --vol-light-color: rgba(136, 206, 17, 0.12);  /* God rays */

  /* Emissive Glow */
  --glow-primary-md: 0 0 20px rgba(136, 206, 17, 0.4), 0 0 40px rgba(136, 206, 17, 0.15);

  /* Shadows */
  --shadow-elevation-2: 0 8px 24px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
}
```

### Tailwind Mapping

All Tailwind utilities reference CSS variables (NO hardcoded values):

```javascript
// tailwind.config.ts
colors: {
  primary: "var(--color-primary)",
  text: "var(--color-text)",
  // ... all from globals.css
}
```

### JSON Export

`public/design.tokens.json` — Tokens Studio format for external tools (Figma plugins, code generators).

---

## 📂 Project Structure

```
src/app/
├── page.tsx                    # Home (hero with glass cards + god rays)
├── globals.css                 # 28 CSS custom properties
├── brand/
│   ├── identity/page.tsx       # Logo, colors, visual identity
│   ├── voice/page.tsx          # Tone of voice guidelines
│   └── applications/page.tsx   # Brand usage examples
├── components/                 # Components showcase
│   ├── atoms/buttons/page.tsx  # 12 atomic components
│   ├── molecules/cards/page.tsx # 5 composite components
│   └── organisms/tables/page.tsx # 4 complex components
├── foundations/
│   ├── colors/page.tsx         # Color palette (interactive)
│   ├── typography/page.tsx     # Font scales
│   ├── spacing/page.tsx        # Spacing system
│   ├── icons/page.tsx          # Icon library
│   ├── effects/page.tsx        # Glass, glow, shadows (INTERACTIVE with copy-paste)
│   └── motion/page.tsx         # Animation tokens
├── tokens/page.tsx             # Token reference (JSON-friendly)
├── changelog/page.tsx          # Version history
└── landing/page.tsx            # Landing page demo

src/components/
├── layout/
│   ├── Sidebar.tsx            # Navigation (8 sections, no dead links)
│   ├── PageLayout.tsx         # Root container
│   ├── ThemeProvider.tsx      # Dark/light mode toggle
│   └── LanguageProvider.tsx   # PT/EN language toggle
├── ui/atoms/
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   └── ... (19 total atoms)
└── ui/
    ├── ParticleField.tsx      # Animated background
    ├── ComingSoonCard.tsx     # Placeholder component
    └── GamaLogo.tsx           # Brand logo

public/
├── design.tokens.json         # Export (Tokens Studio format)
├── brand/
│   ├── gama-icon.svg         # Logo
│   └── ... (brand assets)
└── ... (images, static files)

docs/
├── PROJECT-BRIEF.md           # Project overview
├── PROJECT-CHECKLIST.md       # Validation checklist (Tier 2)
└── PROJECT-DOD.md            # Definition of Done

tailwind.config.ts            # CSS variable mappings (NO hardcoding)
next.config.ts                # Next.js configuration
package.json                  # Dependencies
tsconfig.json                 # TypeScript strict mode
```

---

## 🔑 Key Implementation Patterns

### 1. Glass Material Card (Reusable Pattern)

```jsx
<div
  style={{
    backdropFilter: "blur(var(--glass-blur))",
    background: "var(--glass-surface)",
    border: "1px solid var(--glass-border)",
    borderRadius: 16,
    boxShadow: "var(--glow-primary-md), var(--shadow-elevation-2)",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  }}
>
  {children}
</div>
```

**Used in:** Home page metrics cards, pillar cards, all component showcases

### 2. Volumetric Lighting (God Rays)

```jsx
<div
  style={{
    position: "absolute",
    background: "radial-gradient(ellipse 400px 300px at center top, var(--vol-light-color), transparent)",
    pointerEvents: "none",
    zIndex: 0,
  }}
/>
```

**Used in:** Home hero section (atmospheric depth)

### 3. Hover State Management (React)

```jsx
const [hovered, setHovered] = useState<number | null>(null);

<div
  onMouseEnter={() => setHovered(index)}
  onMouseLeave={() => setHovered(null)}
  style={{
    boxShadow: hovered === index 
      ? "var(--glow-primary-md), var(--shadow-elevation-2)"
      : "var(--shadow-elevation-2)",
    transform: hovered === index ? "translateY(-4px)" : "translateY(0)",
  }}
/>
```

**Pattern:** All interactive cards use this for smooth hover effects

### 4. Cinematic Easing Curve (Applied Everywhere)

```css
transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
```

**Why:** Snappy, slightly bouncy feel. Creates premium perception.

### 5. Client Component Pattern (For Interactivity)

```jsx
"use client";
import { useState } from "react";

export default function InteractivePage() {
  const [state, setState] = useState(null);
  // ... component code
}
```

**Used in:** Page.tsx, effects/page.tsx, all interactive showcases

---

## 🚀 Development Workflow

### Start Dev Server
```bash
npm run dev
# Runs on http://localhost:3000
```

### Build Production
```bash
npm run build
# Output: .next/ folder (~38 routes compiled)
```

### Validate Quality
```bash
npm run lint        # ESLint checks
npm run typecheck   # TypeScript strict mode
npm test           # Unit tests (if added)
```

### Add New Token

1. **Define in `globals.css`:**
   ```css
   --my-new-token: value;
   ```

2. **Map in `tailwind.config.ts`:**
   ```javascript
   extend: {
     boxShadow: {
       "my-glow": "var(--my-new-token)",
     }
   }
   ```

3. **Document in `/foundations/effects`** or relevant page

4. **Export in `design.tokens.json`**

---

## 🎯 Code Patterns & Conventions

### Naming
- **CSS Variables:** `--kebab-case`
- **Component Files:** `PascalCase.tsx`
- **Tailwind Classes:** `lowercase-with-dashes`
- **File Paths:** `kebab-case/`

### Colors
- ✅ **ALWAYS** use `var(--color-*)` or `var(--glow-*)`
- ❌ **NEVER** hardcode hex values (except in globals.css)
- ❌ **NEVER** use Tailwind color utilities that aren't token-mapped

### Styling
- **Prefer:** Inline `style={{}}` for dynamic values
- **Use:** Tailwind classes for static utility values
- **Pattern:** Glass + glow for premium feel (backdrop-filter + box-shadow combo)

### TypeScript
- **Mode:** Strict (`tsconfig.json`)
- **Types:** Export explicit interfaces
- **Props:** Type all component props
- **Avoid:** `any` type

---

## 🎓 Common Tasks

### Add New Component Page

```bash
# Create folder structure
mkdir -p src/app/components/molecules/my-component

# Create page.tsx with:
# 1. "use client" (if interactive)
# 2. Import component
# 3. Showcase with glass card
# 4. Include copy-paste code example
# 5. Link in Sidebar.tsx
```

### Add Color Variant

```css
/* globals.css */
--color-my-variant: #value;
```

```javascript
/* tailwind.config.ts */
colors: {
  "my-variant": "var(--color-my-variant)",
}
```

### Dark Mode Toggle

Already built in:
- `ThemeProvider.tsx` manages `[data-theme="dark"]` attribute
- CSS variables automatically switch via `:root[data-theme="dark"]`
- Button in Sidebar (sun/moon icon) toggles theme

---

## ⚠️ Known Constraints & Gotchas

### CSS Variables in Inline Styles
```javascript
// ❌ WRONG — CSS vars don't interpolate in JS template literals
style={{ background: `var(--glass-surface)` }}

// ✅ RIGHT — Use var() directly
style={{ background: "var(--glass-surface)" }}
```

### "Use Client" Directive
```javascript
// ❌ Missing "use client" causes event handler errors
export default function Page() {
  return <div onClick={handleClick} />  // ERROR
}

// ✅ Add at top of file
"use client";
export default function Page() {
  return <div onClick={handleClick} />  // OK
}
```

### Build Cache Issues
```bash
# If you get "Cannot find module './xyz.js'" at runtime:
rm -rf .next && npm run build  # Full clean rebuild
```

### Tailwind Color Conflicts
```javascript
// ❌ DON'T add gama.primary, gama.bg (duplicates globals.css)
// ✅ DO use "var(--color-primary)" directly in Tailwind config
```

---

## 🔗 Deployment & Export

### Static Export (Design Tokens)
```bash
# design.tokens.json is in public/
# Served at: /design.tokens.json
# Format: Tokens Studio JSON schema
```

### Next.js Build Output
```
Build output: .next/
Routes: 38 total
Page size: ~2.4 kB (home)
First Load JS: ~102 kB
```

---

## 📊 Quality Metrics

| Metric | Target | Status |
|--------|--------|--------|
| TypeScript Strict | ✅ | PASS |
| ESLint | ✅ | PASS |
| Build Routes | 38 | ✅ |
| Page Size | <5 kB | 2.4 kB ✅ |
| WCAG AA | ✅ | PASS |
| Dark/Light Mode | ✅ | PASS |
| Token Export | ✅ | design.tokens.json |

---

## 🤝 How Agents Should Use This

### @dev (Implementation)
- Follow CSS variable patterns (no hardcoding)
- Use glass + glow for premium feel
- Test in both dark/light modes
- Ensure TypeScript strict mode

### @architect (Design Decisions)
- Token system is canonical (don't invent new patterns)
- Reuse existing glass/glow/shadow tokens
- Reference design.tokens.json for exports

### @ux-design-expert (UI)
- All colors must map to CSS variables
- Glassmorphism is the preferred effect system
- Volumetric lighting creates depth
- Emissive glow is for interactive states

### @qa (Testing)
- Test dark/light mode switching
- Verify hover effects work smoothly
- Ensure no hardcoded colors slip through
- Check TypeScript compilation

---

## 📚 References

- **GitHub:** https://github.com/agenciagamastudio/GAMA_BRANDBOOK_V3
- **Interactive Docs:** http://localhost:3000/foundations/effects (copy-paste tokens)
- **Token Export:** `/design.tokens.json` (Tokens Studio format)
- **Project Brief:** `docs/PROJECT-BRIEF.md`
- **DOD Tier 2:** `docs/PROJECT-DOD.md`

---

## 🎯 Next Priorities (Sprint 2)

- [ ] Extract molecules/organisms as reusable components (6-8h)
- [ ] Integrate design.tokens.json into CI/CD export pipeline (1h)
- [ ] Performance baseline testing + optimization (2h)
- [ ] Phase 3: Template marketplace (future)

---

**Last Updated:** May 30, 2026  
**Status:** STABLE (V3.0)  
**Maintainer:** GAMA Design System Team
