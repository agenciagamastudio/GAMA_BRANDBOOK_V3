# GAMA Design Tokens System

**Design System V3 Tokenized** — Single source of truth for all GAMA_ projects

## 📦 What is This?

This folder contains the **tokenized design system** for GAMA V3. All design decisions (colors, spacing, typography, effects) are defined once in `tokens.json` and exported to multiple formats for use across all GAMA_ projects.

## 🎨 Tokens Included

- **28 CSS Custom Properties** (colors, spacing, radius, glass effects, shadows, glows, motion)
- **W3C DTCG Standard Format** (open, no vendor lock-in)
- **Multiple Export Formats** (CSS, Tailwind, JSON, TypeScript, npm)

## 📁 Structure

```
design-tokens/
├── tokens.json                      # Single source of truth (W3C DTCG)
├── style-dictionary.config.js      # Export configuration
├── build.js                        # Build script
├── package.json                    # NPM package metadata
├── dist/                           # Generated exports
│   ├── design-tokens.css          # CSS Variables
│   ├── tailwind-tokens.js         # Tailwind Config
│   ├── design.tokens.json         # JSON Export (W3C standard)
│   └── tokens.d.ts                # TypeScript Definitions
├── npm-dist/                       # NPM Package Files
│   ├── index.js                   # Tokens as JavaScript
│   └── design.tokens.json         # JSON Export
└── README.md                       # This file
```

## 🚀 Building Tokens

### One-time setup
```bash
npm install
```

### Build (generates all exports)
```bash
npm run tokens:build
# or from root: npm run tokens:build
```

### Watch mode (auto-rebuild on changes)
```bash
npm run tokens:watch
```

## 📊 Generated Formats

### 1. **CSS Variables** (`dist/design-tokens.css`)
```css
:root {
  --color-primary: #88ce11;
  --glass-blur: 24px;
  --shadow-elevation-2: 0 8px 24px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
  /* ... 28 total tokens ... */
}
```

**Usage in React:**
```jsx
<div style={{ 
  background: "var(--glass-surface)",
  boxShadow: "var(--glow-primary-md)"
}} />
```

### 2. **Tailwind Config** (`dist/tailwind-tokens.js`)
```javascript
export default {
  colors: {
    primary: "var(--color-primary)",
    glass: "var(--glass-surface)",
    // ... auto-mapped tokens ...
  }
}
```

**Usage in Tailwind:**
```jsx
<div className="bg-glass text-primary shadow-glow-md" />
```

### 3. **JSON Export** (`dist/design.tokens.json`)
W3C Design Tokens Community Group standard format. Works with:
- Figma Tokens Plugin
- Tokens Studio
- Any standard design token tool

### 4. **TypeScript Types** (`dist/tokens.d.ts`)
```typescript
type DesignTokens = {
  color: {
    primary: string;
    // ... full type definitions ...
  }
}
```

### 5. **NPM Package** (`npm-dist/`)
Ready to publish as `@gama/design-tokens` to npm registry.

## 📖 How to Use in GAMA_ Projects

### Option A: Copy CSS Variables
```bash
# Copy to your project
cp dist/design-tokens.css ../some-project/src/tokens.css

# Import in your globals.css
@import './tokens.css';
```

### Option B: Copy Tailwind Config
```bash
# Copy to your project
cp dist/tailwind-tokens.js ../some-project/src/design-tokens-tailwind.js

# Use in tailwind.config.ts
import designTokens from './design-tokens-tailwind';
export default {
  theme: {
    extend: designTokens.theme
  }
}
```

### Option C: npm Package (Future)
```bash
npm install @gama/design-tokens

# In your project
import designTokens from '@gama/design-tokens/tailwind';
```

## 🔄 Workflow

### Adding a New Token

1. **Edit `tokens.json`**
   ```json
   {
     "color": {
       "my-new-color": {
         "$value": "#ff0000",
         "$type": "color",
         "$description": "My new color"
       }
     }
   }
   ```

2. **Rebuild**
   ```bash
   npm run tokens:build
   ```

3. **Use in projects**
   ```css
   /* In CSS */
   color: var(--color-my-new-color);
   
   /* In Tailwind */
   className="text-my-new-color"
   ```

## 📋 Token Categories

- **Colors** (primary, functional, background, text, border)
- **Typography** (fonts)
- **Radius** (border radius scales)
- **Spacing** (4px grid system, 10 scales)
- **Glass** (glassmorphism material - blur, opacity, surface)
- **Volumetric** (god rays lighting effect)
- **Shadow** (elevation levels, contact shadow)
- **Glow** (emissive glow for interactive states)
- **Motion** (easing curves, durations)

## 🎯 Replicability Guarantee

### How tokens ensure 100% consistency across 30 GAMA_ projects:

1. **Single source of truth** — All 28 tokens in `tokens.json`
2. **Generated, not hardcoded** — Exports created by Style Dictionary (no manual edits)
3. **Drift prevention** — Projects import generated tokens (not copy-paste)
4. **Auto-sync** — When tokens.json changes → rebuild → all imports update
5. **Standards-based** — W3C DTCG format (not proprietary)

### Replication Checklist

- [ ] Copy generated files to project
- [ ] Import tokens in globals.css or Tailwind config
- [ ] Remove all hardcoded colors/spacing (replace with tokens)
- [ ] Verify Tailwind autocomplete shows token names
- [ ] Test: color should match canonical (bit-perfect)
- [ ] CI/CD check: block if hardcoded color found

## 🔐 Version Control

```bash
# Commit structure
src/
├── tokens.json           # TRACK (source)
├── style-dictionary.config.js  # TRACK (config)
└── build.js             # TRACK (build script)

dist/                    # Generated (can .gitignore or track)
npm-dist/                # Generated (can .gitignore or track)
```

## 📚 References

- **Design Tokens Spec:** https://design-tokens.github.io/community-group/format/
- **Style Dictionary:** https://amzn.github.io/style-dictionary/
- **W3C DTCG:** https://www.designtokens.org/

## 🤝 Contributing

To add/modify tokens:
1. Edit `tokens.json`
2. Run `npm run tokens:build`
3. Test in localhost:3006
4. Commit + push
5. Document changes below

## 📝 Changelog

### v1.0.0 (2026-06-14)
- Initial tokenization with Style Dictionary
- 28 core tokens (colors, spacing, effects, motion)
- 5 export formats (CSS, Tailwind, JSON, TS, npm)
- W3C DTCG standard compliance

---

**Next Phase:** Apply to 30 GAMA_ projects (Phase 2)  
**Status:** ✅ Phase 1 COMPLETE (tokens created and exported)
