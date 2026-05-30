# Design Tokens CI/CD Pipeline

**Status:** ✅ Active  
**Last Updated:** 2026-05-30  
**Version:** 3.0.0

## Overview

The GAMA Design System V3 includes an automated CI/CD pipeline that validates, exports, and versions design tokens on every build. This ensures design tokens remain the single source of truth and are always available in multiple formats for consumption.

## Pipeline Stages

### 1. Dependency Installation
```bash
npm ci
```
Installs exact dependency versions from package-lock.json to ensure reproducible builds.

### 2. Token Validation
```
✅ design.tokens.json structure validated
✅ Required metadata fields verified
✅ Token categories confirmed
```

Validates that `public/design.tokens.json`:
- Contains valid JSON syntax
- Has required `metadata` and `global` sections
- Includes all expected token categories

### 3. Code Quality Checks
```bash
npm run lint        # ESLint checks
npm run typecheck   # TypeScript strict mode
```

Ensures code follows project standards before building.

### 4. Next.js Build
```bash
npm run build
```

Compiles all 38 routes and optimizes for production.

### 5. Token Export
```bash
npm run export-tokens
```

Automatically exports design tokens in multiple formats:
- **tokens.css** — CSS custom properties
- **tokens.json** — Standard JSON format
- **tokens.js** — JavaScript module
- **tokens.ts** — TypeScript module
- **tokens.scss** — SCSS variables
- **TOKENS_REFERENCE.md** — Markdown documentation

### 6. Artifact Upload
Builds and exports are stored as GitHub artifacts for:
- Download and integration
- Version history
- Rollback capability

### 7. Release Creation
On successful main branch push, creates a GitHub release with:
- Version tag
- Design tokens metadata
- Build artifacts

## Token Export Formats

### CSS (.css)
```css
:root {
  --color-primary: #88ce11;
  --glass-blur: 24px;
  --glow-primary-md: 0 0 20px rgba(136, 206, 17, 0.4), ...;
  /* ... all 28 tokens ... */
}
```

**Use for:** Global CSS in web applications, direct browser consumption.

### JSON (.json)
```json
{
  "metadata": {
    "version": "3.0.0",
    "lastModified": "2026-05-30"
  },
  "global": {
    "color": { "primary": { "value": "#88ce11" } },
    "glass": { "blur": { "value": "24px" } }
  }
}
```

**Use for:** Design tool integrations (Figma plugins), external APIs, documentation.

### JavaScript (.js)
```javascript
export const tokens = {
  'color-primary': '#88ce11',
  'glass-blur': '24px',
  'glow-primary-md': '0 0 20px rgba(136, 206, 17, 0.4), ...'
};
```

**Use for:** Frontend frameworks, bundled applications, dynamic styling.

### TypeScript (.ts)
```typescript
export interface DesignTokens {
  [key: string]: string | number;
}

export const tokens: DesignTokens = {
  'color-primary': '#88ce11',
  'glass-blur': '24px'
};
```

**Use for:** TypeScript projects, type-safe token access, better IDE support.

### SCSS (.scss)
```scss
$color-primary: #88ce11;
$glass-blur: 24px;
$glow-primary-md: 0 0 20px rgba(136, 206, 17, 0.4), ...;
```

**Use for:** SCSS/Sass projects, legacy stylesheets, preprocessing pipelines.

### Markdown (.md)
Comprehensive reference with:
- All tokens organized by category
- Token values and descriptions
- Quick lookup table
- Human-readable format

**Use for:** Documentation, design handoffs, team reference.

## Usage

### Manual Token Export
```bash
npm run export-tokens
```

Generates all formats in `.exported-tokens/` directory.

### Automatic Export on Build
```bash
npm run build
```

Automatically runs token export as post-build step.

### CI/CD Pipeline Trigger
Token export automatically runs on:
- Push to `main` branch
- Push to `master` branch
- Pull request to either branch

### GitHub Actions
Pipeline runs on:
- **Node.js versions:** 18.x, 20.x (parallel testing)
- **Trigger events:** Push, Pull Request
- **Artifact retention:** 30 days
- **Release creation:** Automatic on main branch

## Output Location

### Local Development
```
.exported-tokens/
├── tokens.css
├── tokens.json
├── tokens.js
├── tokens.ts
├── tokens.scss
└── TOKENS_REFERENCE.md
```

### CI/CD Artifacts
GitHub Actions uploads:
- `.next/` build directory
- `public/design.tokens.json` source
- Token exports (for pull request validation)

### Releases
Tagged releases include:
- Full build artifacts
- design.tokens.json snapshot
- Release notes with token metadata

## Integration Examples

### React/Next.js
```javascript
// Import tokens in components
import tokens from '../.exported-tokens/tokens.js';

const Component = () => (
  <div style={{ color: tokens['color-primary'] }}>
    Styled with design tokens
  </div>
);
```

### CSS-in-JS
```typescript
import tokens from '.exported-tokens/tokens.ts';

const styles = {
  primary: { color: tokens['color-primary'] },
  glass: { backdropFilter: `blur(${tokens['glass-blur']})` }
};
```

### Tailwind CSS
Tailwind mapping in `tailwind.config.ts` already references all tokens via CSS variables, so no additional integration needed.

### Design Tools (Figma)
1. Use design.tokens.json with Figma "Tokens" plugin
2. Import `public/design.tokens.json` directly
3. Auto-sync color palette, spacing, effects

## Validation & Quality

### Token Structure
Every commit validates:
- ✅ JSON syntax correctness
- ✅ Required metadata present
- ✅ All categories defined
- ✅ Value format consistency

### Code Quality
Every build checks:
- ✅ ESLint rules pass
- ✅ TypeScript strict mode
- ✅ Type definitions complete

### Build Success
Every release requires:
- ✅ Zero lint errors
- ✅ Zero type errors
- ✅ Successful Next.js build
- ✅ Valid token exports

## Troubleshooting

### Token Validation Failed
**Symptom:** `❌ design.tokens.json validation failed`

**Solution:**
1. Open `public/design.tokens.json`
2. Verify JSON syntax (use online JSON validator)
3. Check required sections: `metadata`, `global`
4. Ensure all token values are strings or numbers

### Export Script Fails
**Symptom:** `npm run export-tokens` produces errors

**Solution:**
1. Check `.exported-tokens/` directory exists
2. Verify file permissions on scripts/export-tokens.js
3. Ensure Node.js version >= 18
4. Run `npm ci` to reinstall dependencies

### GitHub Actions Fails
**Symptom:** Workflow fails on pull request

**Solution:**
1. Check GitHub Actions logs in PR
2. Verify design.tokens.json is committed
3. Ensure package-lock.json matches local npm version
4. Run `npm ci && npm run build` locally to reproduce

## Monitoring

### Build Status Badge
Add to README.md:
```markdown
[![Build & Export Tokens](https://github.com/agenciagamastudio/GAMA_BRANDBOOK_V3/workflows/Build%20&%20Export%20Design%20Tokens/badge.svg)](https://github.com/agenciagamastudio/GAMA_BRANDBOOK_V3/actions)
```

### Token Export Logs
Every CI/CD run logs:
- Token count and categories
- Export format summary
- Build timing
- Artifact locations

### Release Tracking
Every release on main branch:
- Auto-tagged with version
- Includes token metadata
- Stores full build artifacts
- Generates release notes

## Best Practices

### When Adding New Tokens
1. Add to `src/app/globals.css` in `:root` scope
2. Update `public/design.tokens.json` metadata
3. Run `npm run export-tokens` locally
4. Commit both files
5. Push to create PR with validation
6. Merge and release

### When Updating Existing Tokens
1. Update both `globals.css` AND `design.tokens.json`
2. Run full build locally: `npm run build`
3. Verify all export formats are correct
4. Check Tailwind config still references the token
5. Create commit with clear description

### When Integrating into Other Projects
1. Download latest `tokens.{js|ts|json}` from artifacts
2. Copy to your project
3. Import and use in components
4. Consider subscribing to releases for updates

## Future Enhancements

- [ ] Publish tokens to npm package registry
- [ ] Auto-sync with Figma via API
- [ ] Generate Storybook documentation
- [ ] Create Chromatic visual regression testing
- [ ] Version tokens separately from code
- [ ] Multiple theme support (light/dark/custom)

## References

- [design.tokens.json](../public/design.tokens.json) — Source tokens
- [globals.css](../src/app/globals.css) — CSS implementation
- [tailwind.config.ts](../tailwind.config.ts) — Tailwind mapping
- [GitHub Actions Workflow](.github/workflows/build-and-export-tokens.yml) — Pipeline definition
- [Export Script](../scripts/export-tokens.js) — Token export logic

---

**Status:** ✅ Production Ready  
**Last Updated:** 2026-05-30  
**Maintained by:** GAMA Design System Team
