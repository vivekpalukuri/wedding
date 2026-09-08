import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Target directories to scan and optimize
const TARGET_DIRS = [
  'src/images/pre_wedding',
  'src/images/touch_for_magic',
  'src/images/our_story',
  'src/images/meet_couple',
  'src/images/events'
];

const MAX_DIMENSION = 1800; // Max width/height in px (plenty for high-DPI Retina mobile & 4K screens)
const WEBP_QUALITY = 84;     // Visually lossless compression quality

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
    return null;
  }

  const statBefore = fs.statSync(filePath);
  const buffer = fs.readFileSync(filePath);

  try {
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // Check if image needs resizing or re-encoding
    const needsResize = (metadata.width && metadata.width > MAX_DIMENSION) || 
                        (metadata.height && metadata.height > MAX_DIMENSION);
    
    // Only optimize if file > 300KB or needs dimension resizing
    if (!needsResize && statBefore.size < 300 * 1024) {
      return { skipped: true, name: path.basename(filePath), size: statBefore.size };
    }

    let pipeline = image.rotate(); // Auto-orient based on EXIF camera orientation

    if (needsResize) {
      pipeline = pipeline.resize({
        width: metadata.width >= metadata.height ? MAX_DIMENSION : undefined,
        height: metadata.height > metadata.width ? MAX_DIMENSION : undefined,
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    let optimizedBuffer;

    if (ext === '.webp') {
      optimizedBuffer = await pipeline.webp({ quality: WEBP_QUALITY, effort: 4 }).toBuffer();
    } else if (ext === '.png') {
      optimizedBuffer = await pipeline.png({ quality: 82, compressionLevel: 9, palette: true }).toBuffer();
    } else {
      // JPEG / JPG
      optimizedBuffer = await pipeline.jpeg({ quality: 85, mozjpeg: true }).toBuffer();
    }

    // Only save if smaller than before
    if (optimizedBuffer.length < statBefore.size) {
      fs.writeFileSync(filePath, optimizedBuffer);
      return {
        success: true,
        oldName: path.basename(filePath),
        newName: path.basename(filePath),
        before: statBefore.size,
        after: optimizedBuffer.length,
        savedPercent: (((statBefore.size - optimizedBuffer.length) / statBefore.size) * 100).toFixed(1)
      };
    } else {
      return { skipped: true, name: path.basename(filePath), size: statBefore.size };
    }
  } catch (err) {
    console.error(`  ⚠️  Error processing ${path.basename(filePath)}:`, err.message);
    return null;
  }
}

async function runOptimization() {
  console.log('🖼️  Wedding Image Optimizer');
  console.log('============================================');
  console.log(`Target max resolution: ${MAX_DIMENSION}px | Quality: ${WEBP_QUALITY}%`);
  console.log('Scanning directories...\n');

  let totalBefore = 0;
  let totalAfter = 0;
  let countOptimized = 0;

  for (const relDir of TARGET_DIRS) {
    const dir = path.join(rootDir, relDir);
    if (!fs.existsSync(dir)) continue;

    console.log(`📁 Checking ${relDir}/...`);
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) continue;

      const result = await optimizeImage(fullPath);
      if (result && result.success) {
        countOptimized++;
        totalBefore += result.before;
        totalAfter += result.after;
        console.log(`   ✨ ${result.oldName} ➔ ${result.newName} [${formatBytes(result.before)} ➔ ${formatBytes(result.after)}] (-${result.savedPercent}%)`);
      } else if (result && result.skipped) {
        totalBefore += result.size;
        totalAfter += result.size;
        console.log(`   ✓ ${result.name} (already optimal: ${formatBytes(result.size)})`);
      }
    }
    console.log('');
  }

  console.log('============================================');
  if (countOptimized > 0) {
    const savedTotal = totalBefore - totalAfter;
    const totalPercent = (((savedTotal) / totalBefore) * 100).toFixed(1);
    console.log(`🎉 Successfully optimized ${countOptimized} photos!`);
    console.log(`📦 Size reduced from ${formatBytes(totalBefore)} ➔ ${formatBytes(totalAfter)} (Saved ${formatBytes(savedTotal)} / -${totalPercent}%)`);
    console.log('⚡ Your photos will now load with sub-second speeds on mobile phones!');
  } else {
    console.log('✅ All images in target folders are already fully optimized!');
  }
  console.log('============================================\n');
}

runOptimization();
