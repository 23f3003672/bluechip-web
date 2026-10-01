const path = require('path');
const fs = require('fs');
const { createClient } = require(path.resolve('node_modules/@supabase/supabase-js'));
const sharp = require(path.resolve('node_modules/sharp'));

// 1. Load environment variables from .env.local
const envPath = path.resolve('.env.local');
if (!fs.existsSync(envPath)) {
  console.error('Error: .env.local not found.');
  process.exit(1);
}

const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let val = match[2] || '';
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[match[1]] = val.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('\nError: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local.');
  console.error('Please add SUPABASE_SERVICE_ROLE_KEY=your_key to .env.local and run this script again.\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false }
});

async function main() {
  console.log('--- Starting One-Time Supabase Image Optimization ---');
  console.log('Connecting to:', supabaseUrl);

  // 2. Collect unique project image URLs from DB
  const { data: projects, error: projErr } = await supabase.from('projects').select('id, title, thumbnail_url, gallery');
  if (projErr) {
    console.error('Error querying projects:', projErr.message);
    process.exit(1);
  }

  const urlMap = new Map(); // path -> original full URL
  projects.forEach(p => {
    const urls = [];
    if (p.thumbnail_url) urls.push(p.thumbnail_url);
    if (Array.isArray(p.gallery)) urls.push(...p.gallery);

    urls.forEach(u => {
      if (typeof u === 'string' && u.includes('/storage/v1/object/public/media/')) {
        const parts = u.split('/storage/v1/object/public/media/');
        if (parts[1]) {
          const storagePath = decodeURIComponent(parts[1]);
          urlMap.set(storagePath, u);
        }
      }
    });
  });

  const totalFiles = urlMap.size;
  console.log(`Found ${totalFiles} unique project images to verify and optimize.\n`);

  let count = 0;
  let totalOrigBytes = 0;
  let totalNewBytes = 0;
  let optimizedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const [storagePath, fullUrl] of urlMap.entries()) {
    count++;
    const progress = `[${count}/${totalFiles}]`;
    const filename = storagePath.split('/').pop();

    try {
      // Download original image
      const res = await fetch(fullUrl);
      if (!res.ok) {
        console.warn(`${progress} FAIL (HTTP ${res.status}): ${filename}`);
        errorCount++;
        continue;
      }

      const inputBuffer = Buffer.from(await res.arrayBuffer());
      const origSize = inputBuffer.length;
      totalOrigBytes += origSize;

      const meta = await sharp(inputBuffer).metadata();
      const origWidth = meta.width || 0;
      const origHeight = meta.height || 0;

      // Determine if downscaling is needed (max dimension 1920px)
      const maxDim = 1920;
      let shouldResize = origWidth > maxDim || origHeight > maxDim;
      let targetWidth = origWidth;
      let targetHeight = origHeight;

      if (shouldResize) {
        const scale = Math.min(maxDim / origWidth, maxDim / origHeight);
        targetWidth = Math.round(origWidth * scale);
        targetHeight = Math.round(origHeight * scale);
      }

      // If already small (< 250KB) and not oversized, skip re-encoding
      if (!shouldResize && origSize < 250 * 1024 && meta.format === 'webp') {
        console.log(`${progress} Skipped (already optimized): ${filename} (${Math.round(origSize / 1024)} KB, ${origWidth}x${origHeight})`);
        totalNewBytes += origSize;
        skippedCount++;
        continue;
      }

      // Re-encode with sharp: high-quality WebP, max 1920px, quality 82
      let pipeline = sharp(inputBuffer);
      if (shouldResize) {
        pipeline = pipeline.resize(targetWidth, targetHeight, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      const optimizedBuffer = await pipeline
        .webp({ quality: 82, effort: 4 })
        .toBuffer();

      const newSize = optimizedBuffer.length;

      // Only overwrite if it actually saved space
      if (newSize < origSize) {
        const { error: uploadErr } = await supabase.storage
          .from('media')
          .upload(storagePath, optimizedBuffer, {
            contentType: 'image/webp',
            cacheControl: '31536000',
            upsert: true
          });

        if (uploadErr) {
          console.error(`${progress} Storage upload error on ${filename}:`, uploadErr.message);
          errorCount++;
          totalNewBytes += origSize;
        } else {
          totalNewBytes += newSize;
          optimizedCount++;
          const savedKB = Math.round((origSize - newSize) / 1024);
          const percent = Math.round(((origSize - newSize) / origSize) * 100);
          console.log(
            `${progress} Optimized: ${filename} | ${Math.round(origSize / 1024)} KB -> ${Math.round(newSize / 1024)} KB (-${savedKB} KB, -${percent}%)`
          );
        }
      } else {
        totalNewBytes += origSize;
        skippedCount++;
        console.log(`${progress} Skipped (already minimal size): ${filename} (${Math.round(origSize / 1024)} KB)`);
      }
    } catch (err) {
      console.error(`${progress} Exception processing ${filename}:`, err.message);
      errorCount++;
    }
  }

  console.log('\n=============================================');
  console.log('--- Batch Optimization Complete ---');
  console.log(`Total verified: ${totalFiles}`);
  console.log(`Optimized: ${optimizedCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Original total size: ${(totalOrigBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`New total size:      ${(totalNewBytes / (1024 * 1024)).toFixed(2)} MB`);
  const totalSaved = totalOrigBytes - totalNewBytes;
  if (totalSaved > 0) {
    console.log(`Total space saved:   ${(totalSaved / (1024 * 1024)).toFixed(2)} MB (-${Math.round((totalSaved / totalOrigBytes) * 100)}%)`);
  }
  console.log('=============================================\n');
}

main().catch(err => {
  console.error('Fatal error running script:', err);
  process.exit(1);
});
