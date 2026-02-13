#!/usr/bin/env node

/**
 * 画像最適化スクリプト
 * PNG/JPG画像をWebPに変換し、元ファイルを.backup/に退避
 */

import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'public/images');
const BACKUP_DIR = path.join(ROOT_DIR, '.backup/images');

// 変換設定
const WEBP_QUALITY = 80;
const MIN_SIZE_BYTES = 100 * 1024; // 100KB以上のファイルのみ変換

// 変換対象の拡張子
const TARGET_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

// 除外パターン（OGP画像など）
const EXCLUDE_PATTERNS = [
  /ogp/i,
  /favicon/i,
  /icon/i,
  /apple-touch/i,
];

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

async function getImageFiles(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await getImageFiles(fullPath, files);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (TARGET_EXTENSIONS.includes(ext)) {
        // 除外パターンチェック
        const shouldExclude = EXCLUDE_PATTERNS.some(pattern => pattern.test(fullPath));
        if (!shouldExclude) {
          files.push(fullPath);
        }
      }
    }
  }

  return files;
}

async function convertToWebP(imagePath) {
  const relativePath = path.relative(IMAGES_DIR, imagePath);
  const webpPath = imagePath.replace(/\.(png|jpe?g)$/i, '.webp');
  const backupPath = path.join(BACKUP_DIR, relativePath);

  // 既にWebPが存在する場合はスキップ
  try {
    await fs.access(webpPath);
    console.log(`[SKIP] ${relativePath} (WebP already exists)`);
    return { status: 'skipped', reason: 'exists' };
  } catch {
    // WebPが存在しない場合は続行
  }

  // ファイルサイズチェック
  const stats = await fs.stat(imagePath);
  if (stats.size < MIN_SIZE_BYTES) {
    console.log(`[SKIP] ${relativePath} (${(stats.size / 1024).toFixed(1)}KB < 100KB)`);
    return { status: 'skipped', reason: 'small' };
  }

  try {
    // WebPに変換
    await sharp(imagePath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath);

    const newStats = await fs.stat(webpPath);
    const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

    // 元ファイルをバックアップに移動
    await ensureDir(path.dirname(backupPath));
    await fs.rename(imagePath, backupPath);

    console.log(`[OK] ${relativePath} → .webp (${(stats.size / 1024 / 1024).toFixed(2)}MB → ${(newStats.size / 1024 / 1024).toFixed(2)}MB, -${reduction}%)`);

    return {
      status: 'converted',
      originalSize: stats.size,
      newSize: newStats.size,
      reduction: parseFloat(reduction),
    };
  } catch (err) {
    console.error(`[ERROR] ${relativePath}: ${err.message}`);
    return { status: 'error', error: err.message };
  }
}

async function main() {
  console.log('=== 画像最適化スクリプト ===\n');
  console.log(`対象ディレクトリ: ${IMAGES_DIR}`);
  console.log(`バックアップ先: ${BACKUP_DIR}`);
  console.log(`WebP品質: ${WEBP_QUALITY}`);
  console.log(`最小サイズ: ${MIN_SIZE_BYTES / 1024}KB\n`);

  // 対象ファイルを取得
  const imageFiles = await getImageFiles(IMAGES_DIR);
  console.log(`対象ファイル数: ${imageFiles.length}\n`);

  if (imageFiles.length === 0) {
    console.log('変換対象のファイルがありません。');
    return;
  }

  // 変換実行
  const results = {
    converted: 0,
    skipped: 0,
    errors: 0,
    totalSaved: 0,
  };

  for (const imagePath of imageFiles) {
    const result = await convertToWebP(imagePath);

    if (result.status === 'converted') {
      results.converted++;
      results.totalSaved += result.originalSize - result.newSize;
    } else if (result.status === 'skipped') {
      results.skipped++;
    } else {
      results.errors++;
    }
  }

  // サマリー
  console.log('\n=== 完了 ===');
  console.log(`変換成功: ${results.converted}`);
  console.log(`スキップ: ${results.skipped}`);
  console.log(`エラー: ${results.errors}`);
  console.log(`削減サイズ: ${(results.totalSaved / 1024 / 1024).toFixed(2)}MB`);
}

main().catch(console.error);
