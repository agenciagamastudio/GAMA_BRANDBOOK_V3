#!/usr/bin/env node

/**
 * Design Tokens Export Script
 * Exports design tokens from design.tokens.json to multiple formats
 */

const fs = require('fs');
const path = require('path');

const TOKENS_FILE = path.join(__dirname, '../public/design.tokens.json');
const EXPORT_DIR = path.join(__dirname, '../.exported-tokens');

function ensureExportDir() {
  if (!fs.existsSync(EXPORT_DIR)) {
    fs.mkdirSync(EXPORT_DIR, { recursive: true });
  }
}

function loadTokens() {
  try {
    const content = fs.readFileSync(TOKENS_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('❌ Failed to load design.tokens.json:', error.message);
    process.exit(1);
  }
}

function flattenTokens(tokens, prefix = '') {
  const flattened = {};
  for (const [key, value] of Object.entries(tokens)) {
    const fullKey = prefix ? `${prefix}-${key}` : key;
    if (typeof value === 'object' && value.value === undefined) {
      Object.assign(flattened, flattenTokens(value, fullKey));
    } else {
      flattened[fullKey] = value.value || value;
    }
  }
  return flattened;
}

function exportAsCSS(tokens) {
  let css = ':root {\n';
  const flattened = flattenTokens(tokens.global);
  for (const [key, value] of Object.entries(flattened)) {
    css += `  --${key}: ${value};\n`;
  }
  css += '}\n';
  return css;
}

function exportAsJSON(tokens) {
  return JSON.stringify(tokens, null, 2);
}

function exportAsJavaScript(tokens) {
  const flattened = flattenTokens(tokens.global);
  const jsContent = `/**
 * GAMA Design System V3 - JavaScript Tokens Export
 * Generated: ${new Date().toISOString()}
 * DO NOT EDIT MANUALLY
 */

export const tokens = ${JSON.stringify(flattened, null, 2)};

export default tokens;
`;
  return jsContent;
}

function exportAsTypeScript(tokens) {
  const flattened = flattenTokens(tokens.global);
  const tsContent = `/**
 * GAMA Design System V3 - TypeScript Tokens Export
 * Generated: ${new Date().toISOString()}
 * DO NOT EDIT MANUALLY
 */

export interface DesignTokens {
  [key: string]: string | number;
}

export const tokens: DesignTokens = ${JSON.stringify(flattened, null, 2)};

export default tokens;
`;
  return tsContent;
}

function exportAsSCSS(tokens) {
  let scss = `/// GAMA Design System V3 - SCSS Variables
/// Generated: ${new Date().toISOString()}
/// DO NOT EDIT MANUALLY

`;
  const flattened = flattenTokens(tokens.global);
  for (const [key, value] of Object.entries(flattened)) {
    scss += `$${key}: ${value};\n`;
  }
  return scss;
}

function exportAsMarkdown(tokens) {
  let markdown = `# GAMA Design System V3 - Tokens Reference

**Generated:** ${new Date().toISOString()}

## Overview

| Category | Count | Description |
|----------|-------|-------------|
`;

  for (const [category, values] of Object.entries(tokens.global)) {
    const count = Object.keys(values).length;
    markdown += `| ${category} | ${count} | ${tokens.category?.[category] || 'Design tokens'} |\n`;
  }

  markdown += '\n## All Tokens\n\n';

  for (const [category, values] of Object.entries(tokens.global)) {
    markdown += `### ${category}\n\n`;
    markdown += '| Token | Value | Description |\n';
    markdown += '|-------|-------|-------------|\n';
    for (const [key, data] of Object.entries(values)) {
      const value = data.value || data;
      const description = data.description || '—';
      markdown += `| \`${key}\` | \`${value}\` | ${description} |\n`;
    }
    markdown += '\n';
  }

  return markdown;
}

function writeFile(filename, content) {
  const filepath = path.join(EXPORT_DIR, filename);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✅ Exported: ${filename}`);
}

function main() {
  console.log('🚀 Exporting Design Tokens...\n');

  ensureExportDir();
  const tokens = loadTokens();

  // Export in multiple formats
  try {
    writeFile('tokens.css', exportAsCSS(tokens));
    writeFile('tokens.json', exportAsJSON(tokens));
    writeFile('tokens.js', exportAsJavaScript(tokens));
    writeFile('tokens.ts', exportAsTypeScript(tokens));
    writeFile('tokens.scss', exportAsSCSS(tokens));
    writeFile('TOKENS_REFERENCE.md', exportAsMarkdown(tokens));

    // Summary
    const flattened = flattenTokens(tokens.global);
    console.log(`\n📊 Summary:`);
    console.log(`   Total tokens: ${Object.keys(flattened).length}`);
    console.log(`   Categories: ${Object.keys(tokens.global).length}`);
    console.log(`   Export directory: ${EXPORT_DIR}`);
    console.log(`\n✨ All formats exported successfully!`);
  } catch (error) {
    console.error('❌ Export failed:', error.message);
    process.exit(1);
  }
}

main();
