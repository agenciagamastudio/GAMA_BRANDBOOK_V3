# GAMA Design System V3

**Design System e Plataforma de Marca da Agência GAMA**

Build status: ✅ 38 routes | 2.4 kB home page

---

## 🎨 Overview

GAMA Design System V3 é a próxima geração do brandbook da agência GAMA — completamente tokenizado, com suporte nativo a dark + light mode, glassmorphism avançado, volumetric lighting e emissive glow effects.

### Pilares

- **Brand** — Identidade visual, voz e aplicações da marca GAMA
- **Foundations** — Cores, tipografia, espaçamento, ícones, efeitos e motion
- **Components** — Atoms, molecules e organisms tokenizados, prontos para produção
- **Developer Tools** — Tokens JSON, configurações e padrões técnicos

---

## 🚀 Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS 3.4 + CSS Variables
- **Runtime:** Node.js 18+
- **Design Tokens:** 28 CSS custom properties (glass, volumetric, glow, depth)

---

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build production
npm run build

# Lint & check types
npm run lint
npm run typecheck
```

Development server runs at: **http://localhost:3000**

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home (hero with glass cards)
│   ├── globals.css           # 28 CSS custom properties (tokens)
│   ├── brand/                # Brand identity section
│   ├── components/           # Components showcase (atoms, molecules, organisms)
│   ├── foundations/          # Design foundations (colors, typography, effects)
│   ├── changelog/            # Version history
│   ├── landing/              # Landing page demo
│   └── tokens/               # Token reference page
│
├── components/
│   ├── layout/               # Sidebar, PageLayout, Theme/Lang providers
│   └── ui/                   # Reusable UI components
│
└── styles/                   # Global styles and animations

docs/
├── PROJECT-BRIEF.md          # Project overview and scope
├── PROJECT-CHECKLIST.md      # Validation checklist
└── PROJECT-DOD.md            # Definition of Done (Tier 1)
```

---

## 🎯 Key Features

### Visual Effects System
- **Glass Material** — Frosted glass with backdrop blur (24px default)
- **Liquid Glass** — Refractive distortion effects (32px blur)
- **Volumetric Lighting** — God rays and atmospheric depth
- **Emissive Glow** — Bloom effects (sm/md/lg sizes)
- **Depth System** — Z-index and elevation shadows (1-3 levels)

### Responsive & Accessible
- Dark + Light mode (CSS variable switching)
- WCAG AA compliant (form labels, colors, contrast)
- Mobile-first approach (sidebar collapses on mobile)
- Cinematic easing curves (cubic-bezier 0.16, 1, 0.3, 1)

### Developer-Friendly
- Single source of truth: `globals.css` CSS variables
- Tailwind utilities mapped to tokens
- Copy-paste token values on /foundations/effects
- TypeScript for type safety
- No hardcoded colors (all from tokens)

---

## 📐 Design Tokens

### Color System
```css
--color-primary: #88CE11 (Neon Green)
--color-bg: #161616 (Dark)
--color-text: #ffffff
--color-text-secondary: #a0a0a0
--color-border: rgba(255,255,255,0.1)
```

### Glass Material
```css
--glass-blur: 24px
--glass-surface: rgba(255,255,255,0.08)
--glass-border: rgba(255,255,255,0.15)
--glass-highlight: rgba(255,255,255,0.45)
```

### Emissive Glow
```css
--glow-primary-md: 0 0 20px rgba(136,206,17,0.4), 0 0 40px rgba(136,206,17,0.15)
--shadow-elevation-2: 0 8px 24px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)
```

**Full token reference:** Navigate to `/foundations/effects` for interactive documentation and copy-paste values.

---

## 🎓 Usage Examples

### Glass Card with Hover Glow
```jsx
<div
  style={{
    backdropFilter: "blur(var(--glass-blur))",
    background: "var(--glass-surface)",
    border: "1px solid var(--glass-border)",
    boxShadow: "var(--glow-primary-md), var(--shadow-elevation-2)",
    borderRadius: 16,
  }}
>
  {children}
</div>
```

### Tailwind Utility Classes
```html
<!-- Glass material + glow on hover -->
<div class="backdrop-blur-sm bg-glass border-glass rounded-lg hover:shadow-glow-md">
  Content
</div>
```

---

## 📚 Documentation

- **[Project Brief](./docs/PROJECT-BRIEF.md)** — Full project context
- **[Checklist](./docs/PROJECT-CHECKLIST.md)** — Validation items
- **[Definition of Done](./docs/PROJECT-DOD.md)** — Quality standards
- **[CLAUDE.md](./CLAUDE.md)** — AI agent instructions
- **[Visual Effects](http://localhost:3000/foundations/effects)** — Interactive token reference

---

## 🔗 Navigation

| Section | URL | Purpose |
|---------|-----|---------|
| Home | `/` | Hero + overview |
| Brand | `/brand/identity` | Logo, colors, voice |
| Foundations | `/foundations/colors` | Design tokens |
| Components | `/components/atoms/buttons` | UI library |
| Tokens | `/tokens` | JSON export reference |
| Changelog | `/changelog` | Version history |

---

## ✅ Quality Gates

- **Build:** All 38 routes compile successfully
- **Types:** TypeScript strict mode ✅
- **Lint:** ESLint passes all rules ✅
- **Accessibility:** WCAG AA compliant ✅
- **Performance:** First Contentful Paint < 2s ✅

---

## 🛠️ Development

### Add New Token

1. Define in `src/app/globals.css` under appropriate section
2. Map to Tailwind in `tailwind.config.ts`
3. Document on `/foundations/effects`
4. Test on a component page

### Add New Component

1. Create in `src/components/ui/`
2. Create demo page in `src/app/components/{category}/{name}/page.tsx`
3. Add link to Sidebar
4. Include copy-paste examples

---

## 📈 Roadmap

- [ ] **Phase 4** — Molecule/organism library completion
- [ ] **Phase 5** — Template marketplace (SaaS, landing, dashboard)
- [ ] **Phase 6** — API for design token consumption
- [ ] **Phase 7** — Figma plugin integration

---

## 🤝 Contributing

1. Follow token system (no hardcoded colors)
2. Use CSS custom properties
3. Test dark/light modes
4. Run `npm run lint` before committing
5. Update documentation

---

## 📝 License

Proprietary — Agência GAMA

---

## 📧 Contact

**Maintainer:** GAMA Design System Team  
**Repository:** https://github.com/agenciagamastudio/GAMA_BRANDBOOK_V3

---

**Last Updated:** May 30, 2026  
**Status:** STABLE (V3.0)
