#!/usr/bin/env node

/**
 * Extract all Portuguese strings from src/app pages
 * and generate translation keys for LanguageProvider
 */

const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, '../src/app');
const translations = new Map();

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file === 'page.tsx') {
      extractFromPage(fullPath);
    }
  });
}

function extractFromPage(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(APP_DIR, filePath);

  // Extract PageLayout title, subtitle, accentWord
  const layoutMatches = content.match(/title="([^"]+)"|subtitle="([^"]+)"|accentWord="([^"]+)"|badge="([^"]+)"|label="([^"]+)"|desc="([^"]+)"|placeholder="([^"]+)"/g);

  if (layoutMatches) {
    layoutMatches.forEach(match => {
      const [key, value] = match.split('=');
      const cleanValue = value.replace(/^"|"$/g, '');

      // Skip if it's a template variable or already has t()
      if (cleanValue && !cleanValue.includes('{') && !cleanValue.includes('$')) {
        const translationKey = generateKey(cleanValue, key);
        if (!translations.has(translationKey)) {
          translations.set(translationKey, {
            pt: cleanValue,
            en: '', // To be filled manually
            file: relativePath,
            context: key
          });
        }
      }
    });
  }
}

function generateKey(value, context) {
  // Generate a sensible key from the Portuguese value
  const base = value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 30);

  return base || `${context}_unknown`;
}

walkDir(APP_DIR);

// Sort by key and output
const sorted = Array.from(translations.entries()).sort();
console.log(`Found ${sorted.length} unique translatable strings:\n`);

sorted.forEach(([key, data]) => {
  console.log(`  ${key}: { pt: "${data.pt}", en: "" },  // ${data.file} (${data.context})`);
});

console.log('\n\n📊 Summary:');
console.log(`   Total strings: ${sorted.length}`);
console.log(`   Files affected: ${new Set([...translations.values()].map(v => v.file)).size}`);
