#!/usr/bin/env node

const StyleDictionary = require('style-dictionary').default;
const fs = require('fs');
const path = require('path');

console.log('\n🎨 GAMA Design System V3 — Token Builder\n');

async function build() {
  try {
    // Load config
    const config = require('./style-dictionary.config.js');

    console.log('📦 Building platforms...\n');

    // Create and build Style Dictionary
    const sd = new StyleDictionary(config);
    await sd.buildAllPlatforms();

    console.log('✅ Build completed successfully!\n');
    console.log('📂 Output locations:');
    console.log('   • CSS:      dist/design-tokens.css');
    console.log('   • Tailwind: dist/tailwind-tokens.js');
    console.log('   • JSON:     dist/design.tokens.json');
    console.log('   • TypeScript: dist/tokens.d.ts');
    console.log('   • NPM:      npm-dist/\n');

    // Verify files
    const distDir = path.join(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      const files = fs.readdirSync(distDir);
      if (files.length > 0) {
        console.log('📋 Generated files:');
        files.forEach(file => {
          const filePath = path.join(distDir, file);
          const stats = fs.statSync(filePath);
          console.log(`   ✓ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
        });
      }
    }

    console.log('\n🚀 Next step: Use tokens in your Tailwind config');
    console.log('   See: ../tailwind.config.ts\n');

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

build();
