/**
 * CreaCert — App Icon Generator
 * 產生 iOS / Android / PWA 所需的所有 icon 尺寸
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 深綠背景 + CC 文字的 PNG icon（用 SVG 轉換）
const SVG_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" rx="180" fill="#0f6e56"/>
  <circle cx="512" cy="512" r="430" fill="none" stroke="#d4af37" stroke-width="18" stroke-dasharray="40 20"/>
  <text x="512" y="440" font-family="Arial Black, sans-serif" font-size="220" font-weight="900"
        text-anchor="middle" fill="white" letter-spacing="-8">CC</text>
  <text x="512" y="560" font-family="Arial, sans-serif" font-size="76" font-weight="700"
        text-anchor="middle" fill="#d4af37" letter-spacing="12">CREACERT</text>
  <text x="512" y="720" font-size="140" text-anchor="middle">🦎🐱🐍</text>
</svg>`;

// iOS App Store 需要的所有尺寸
const IOS_SIZES = [
  { size: 20,   name: 'icon-20' },
  { size: 40,   name: 'icon-20@2x' },
  { size: 60,   name: 'icon-20@3x' },
  { size: 29,   name: 'icon-29' },
  { size: 58,   name: 'icon-29@2x' },
  { size: 87,   name: 'icon-29@3x' },
  { size: 40,   name: 'icon-40' },
  { size: 80,   name: 'icon-40@2x' },
  { size: 120,  name: 'icon-40@3x' },
  { size: 120,  name: 'icon-60@2x' },
  { size: 180,  name: 'icon-60@3x' },
  { size: 76,   name: 'icon-76' },
  { size: 152,  name: 'icon-76@2x' },
  { size: 167,  name: 'icon-83.5@2x' },
  { size: 1024, name: 'icon-1024' },  // App Store 上架用
];

// Android 需要的尺寸
const ANDROID_SIZES = [
  { size: 36,  folder: 'mipmap-ldpi',    name: 'ic_launcher' },
  { size: 48,  folder: 'mipmap-mdpi',    name: 'ic_launcher' },
  { size: 72,  folder: 'mipmap-hdpi',    name: 'ic_launcher' },
  { size: 96,  folder: 'mipmap-xhdpi',   name: 'ic_launcher' },
  { size: 144, folder: 'mipmap-xxhdpi',  name: 'ic_launcher' },
  { size: 192, folder: 'mipmap-xxxhdpi', name: 'ic_launcher' },
  { size: 512, folder: 'playstore',      name: 'ic_launcher' }, // Play Store 上架用
];

// PWA 需要的尺寸
const PWA_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  const svgBuffer = Buffer.from(SVG_ICON);

  // === iOS Icons ===
  const iosDir = path.join(__dirname, '../resources/ios');
  fs.mkdirSync(iosDir, { recursive: true });
  console.log('\n📱 產生 iOS icons...');
  for (const { size, name } of IOS_SIZES) {
    const outPath = path.join(iosDir, `${name}.png`);
    await sharp(svgBuffer).resize(size, size).png().toFile(outPath);
    console.log(`  ✅ ${name}.png (${size}x${size})`);
  }

  // === Android Icons ===
  console.log('\n🤖 產生 Android icons...');
  for (const { size, folder, name } of ANDROID_SIZES) {
    const dir = path.join(__dirname, '../resources/android', folder);
    fs.mkdirSync(dir, { recursive: true });
    const outPath = path.join(dir, `${name}.png`);
    await sharp(svgBuffer).resize(size, size).png().toFile(outPath);
    console.log(`  ✅ ${folder}/${name}.png (${size}x${size})`);
  }

  // === PWA Icons ===
  console.log('\n🌐 產生 PWA icons...');
  const pwaDir = path.join(__dirname, '../public');
  for (const size of PWA_SIZES) {
    const outPath = path.join(pwaDir, `icon-${size}.png`);
    await sharp(svgBuffer).resize(size, size).png().toFile(outPath);
    console.log(`  ✅ icon-${size}.png`);
  }

  // Splash Screen (2732x2732 for universal iOS)
  console.log('\n🖼️  產生 Splash Screen...');
  const splashSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732" width="2732" height="2732">
    <rect width="2732" height="2732" fill="#0f6e56"/>
    <text x="1366" y="1250" font-family="Arial Black" font-size="400" font-weight="900"
          text-anchor="middle" fill="white" letter-spacing="-16">CC</text>
    <text x="1366" y="1450" font-family="Arial" font-size="120" font-weight="700"
          text-anchor="middle" fill="#d4af37" letter-spacing="20">CREACERT</text>
    <text x="1366" y="1650" font-size="200" text-anchor="middle">🦎🐱🐍</text>
    <text x="1366" y="1820" font-family="Arial" font-size="80" font-weight="400"
          text-anchor="middle" fill="white" opacity="0.6">Know Every Creature</text>
  </svg>`;
  const splashDir = path.join(__dirname, '../resources');
  await sharp(Buffer.from(splashSVG)).resize(2732, 2732).png()
    .toFile(path.join(splashDir, 'splash.png'));
  console.log('  ✅ splash.png (2732x2732)');

  console.log('\n🎉 所有圖示產生完成！');
}

generateIcons().catch(console.error);
