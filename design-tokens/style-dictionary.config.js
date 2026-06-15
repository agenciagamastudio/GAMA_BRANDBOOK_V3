const StyleDictionary = require('style-dictionary');
const path = require('path');

module.exports = {
  source: [path.join(__dirname, 'tokens.json')],
  platforms: {
    // ═══════════════════════════════════════════
    // CSS VARIABLES (for Web, used in globals.css)
    // ═══════════════════════════════════════════
    css: {
      transformGroup: 'css',
      buildPath: path.join(__dirname, '../dist/'),
      files: [
        {
          destination: 'design-tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            showFileHeader: true,
          },
        },
      ],
    },

    // ═══════════════════════════════════════════
    // TAILWIND CONFIG (for Tailwind CSS consumption)
    // ═══════════════════════════════════════════
    tailwind: {
      transformGroup: 'js',
      buildPath: path.join(__dirname, '../dist/'),
      files: [
        {
          destination: 'tailwind-tokens.js',
          format: 'javascript/esm',
          options: {
            showFileHeader: true,
          },
        },
      ],
    },

    // ═══════════════════════════════════════════
    // JSON (W3C DTCG Standard format)
    // ═══════════════════════════════════════════
    json: {
      transformGroup: 'js',
      buildPath: path.join(__dirname, '../dist/'),
      files: [
        {
          destination: 'design.tokens.json',
          format: 'json/flat',
          options: {
            outputReferences: true,
            showFileHeader: false,
          },
        },
      ],
    },

    // ═══════════════════════════════════════════
    // NPM PACKAGE EXPORT (for @gama/design-tokens)
    // ═══════════════════════════════════════════
    npm: {
      transformGroup: 'js',
      buildPath: path.join(__dirname, '../npm-dist/'),
      files: [
        {
          destination: 'index.js',
          format: 'javascript/esm',
          options: {
            showFileHeader: true,
            outputReferences: true,
          },
        },
        {
          destination: 'design.tokens.json',
          format: 'json/flat',
          options: {
            outputReferences: false,
            showFileHeader: false,
          },
        },
      ],
    },

    // ═══════════════════════════════════════════
    // TYPESCRIPT TYPES (for type-safe usage)
    // ═══════════════════════════════════════════
    ts: {
      transformGroup: 'js',
      buildPath: path.join(__dirname, '../dist/'),
      files: [
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
          options: {
            showFileHeader: true,
          },
        },
      ],
    },
  },
};
