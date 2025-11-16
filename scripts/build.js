/**
 * Build Script for Production Deployment
 * Prepares PWA for GitHub Pages deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🏗️  Building NeuroThrive PWA for production...\n');

// Create dist directory
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Files and directories to copy
const filesToCopy = [
  'index.html',
  'manifest.json',
  'sw.js',
  'oauth',
  'css',
  'js',
  'images'
];

// Copy files
console.log('📁 Copying files to dist/...');
filesToCopy.forEach(item => {
  const srcPath = path.join(__dirname, '..', item);
  const destPath = path.join(distDir, item);

  if (!fs.existsSync(srcPath)) {
    console.log(`⚠️  Warning: ${item} not found, skipping...`);
    return;
  }

  if (fs.statSync(srcPath).isDirectory()) {
    copyDir(srcPath, destPath);
    console.log(`  ✓ Copied ${item}/`);
  } else {
    fs.copyFileSync(srcPath, destPath);
    console.log(`  ✓ Copied ${item}`);
  }
});

// Create config.template.js as config.js for deployment
console.log('\n⚙️  Creating config placeholder...');
const configTemplatePath = path.join(__dirname, '../js/config.template.js');
const configDestPath = path.join(distDir, 'js/config.js');

if (fs.existsSync(configTemplatePath)) {
  fs.copyFileSync(configTemplatePath, configDestPath);
  console.log('  ✓ Created js/config.js from template');
  console.log('  ⚠️  Remember to update with actual OAuth credentials after deployment!');
}

// Create .nojekyll file for GitHub Pages
console.log('\n📝 Creating .nojekyll file...');
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
console.log('  ✓ Created .nojekyll');

// Create 404.html for SPA routing
console.log('\n🔗 Creating 404.html for SPA routing...');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
fs.writeFileSync(path.join(distDir, '404.html'), indexHtml);
console.log('  ✓ Created 404.html');

// Update service worker cache version
console.log('\n🔄 Updating service worker cache version...');
const swPath = path.join(distDir, 'sw.js');
if (fs.existsSync(swPath)) {
  let swContent = fs.readFileSync(swPath, 'utf-8');
  const cacheVersion = `v${Date.now()}`;
  swContent = swContent.replace(
    /const CACHE_VERSION = ['"].*?['"]/,
    `const CACHE_VERSION = '${cacheVersion}'`
  );
  fs.writeFileSync(swPath, swContent);
  console.log(`  ✓ Cache version updated to ${cacheVersion}`);
}

// Generate build info
console.log('\n📊 Generating build info...');
const buildInfo = {
  version: require('../package.json').version,
  buildDate: new Date().toISOString(),
  nodeVersion: process.version,
  platform: process.platform
};
fs.writeFileSync(
  path.join(distDir, 'build-info.json'),
  JSON.stringify(buildInfo, null, 2)
);
console.log('  ✓ Created build-info.json');

console.log('\n✅ Build complete! Files are ready in dist/');
console.log('\n📦 Next steps:');
console.log('  1. Test locally: cd dist && python -m http.server 8080');
console.log('  2. Deploy: npm run deploy');
console.log('  3. Update js/config.js with your OAuth credentials');

// Helper function to recursively copy directories
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
