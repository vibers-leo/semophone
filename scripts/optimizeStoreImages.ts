import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const INPUT_DIR = 'public/images/세모폰 매장사진';
const OUTPUT_DIR = 'public/images/stores';
const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 800;
const QUALITY = 85;

interface ImageMapping {
  original: string;
  optimized: string;
  originalSize: number;
  optimizedSize: number;
  storeName: string;
}

async function optimizeImages() {
  console.log('🖼️  이미지 최적화 시작...\n');

  // 출력 디렉토리 생성
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // 원본 이미지 목록 가져오기
  const files = await fs.readdir(INPUT_DIR);
  const imageFiles = files.filter(f =>
    f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')
  );

  const mapping: ImageMapping[] = [];
  let counter = 1;

  for (const file of imageFiles) {
    // 로고나 테스트 파일 제외
    if (file.includes('세모폰.png') || file.includes('test')) {
      console.log(`⏭️  건너뜀: ${file}`);
      continue;
    }

    const inputPath = path.join(INPUT_DIR, file);
    const outputFilename = `${String(counter).padStart(3, '0')}.jpg`;
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    // 파일명에서 매장명 추출
    const storeName = file.replace(/^(상승|승승)\d+_/, '').replace(/\.jpe?g$/i, '');

    // Sharp로 리사이징 + 최적화
    await sharp(inputPath)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: QUALITY })
      .toFile(outputPath);

    // 파일 크기 가져오기
    const originalStats = await fs.stat(inputPath);
    const optimizedStats = await fs.stat(outputPath);

    mapping.push({
      original: file,
      optimized: `/images/stores/${outputFilename}`,
      originalSize: originalStats.size,
      optimizedSize: optimizedStats.size,
      storeName,
    });

    console.log(`✅ ${counter}. ${file}`);
    console.log(`   ${(originalStats.size / 1024 / 1024).toFixed(2)}MB → ${(optimizedStats.size / 1024 / 1024).toFixed(2)}MB (${((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1)}% 감소)\n`);

    counter++;
  }

  // 매핑 JSON 저장
  await fs.writeFile(
    'data/storeImageMapping.json',
    JSON.stringify(mapping, null, 2),
    'utf-8'
  );

  // 요약 통계
  const totalOriginal = mapping.reduce((sum, m) => sum + m.originalSize, 0);
  const totalOptimized = mapping.reduce((sum, m) => sum + m.optimizedSize, 0);

  console.log('\n📊 최적화 완료!');
  console.log(`   총 파일: ${mapping.length}개`);
  console.log(`   원본 크기: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   최적화 크기: ${(totalOptimized / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   절감률: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
}

optimizeImages().catch(console.error);
