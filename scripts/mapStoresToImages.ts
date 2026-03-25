import fs from 'fs/promises';
import Papa from 'papaparse';

interface CSVRow {
  NO: string;
  '상호명(변경전)': string;
  '상호명(변경후)': string;
  주소: string;
  NaverPlaceURL: string;
}

interface ImageMapping {
  original: string;
  optimized: string;
  storeName: string;
}

async function mapStoresToImages() {
  // CSV 읽기
  const csvPath = 'C:/Users/desig/Documents/세모폰/FINAL_STORES_WITH_PLACE_URLS.csv';
  const csvContent = await fs.readFile(csvPath, 'utf-8');
  const { data: stores } = Papa.parse<CSVRow>(csvContent, { header: true });

  // 이미지 매핑 읽기
  const mappingContent = await fs.readFile('data/storeImageMapping.json', 'utf-8');
  const imageMapping: ImageMapping[] = JSON.parse(mappingContent);

  // 매칭 로직
  const results = stores.map((store, index) => {
    const storeNo = parseInt(store.NO);
    const newName = store['상호명(변경후)'];
    const oldName = store['상호명(변경전)'];

    // CSV 데이터 검증
    if (!oldName || !newName) {
      console.log(`⚠️  잘못된 CSV 데이터: ${JSON.stringify(store)}`);
      return {
        storeNo,
        oldName: oldName || '',
        newName: newName || '',
        address: store.주소 || '',
        naverUrl: store.NaverPlaceURL || '',
        imagePath: null,
        imageOriginal: null,
      };
    }

    // 파일명 기반 매칭 (fuzzy matching)
    const matchedImage = imageMapping.find(img => {
      // 예: "상승1_세모폰 부천중동점" → storeNo 16 (상승모바일 1호점)
      const match = img.original.match(/^(상승|승승)(\d+)_/);
      if (match) {
        const prefix = match[1];
        const number = parseInt(match[2]);

        // 상승1 → 상승모바일 1호점
        if (prefix === '상승' && oldName.includes(`상승모바일 ${number}호점`)) {
          return true;
        }
        // 승승24 → 승승장구텔레콤 24호점
        if (prefix === '승승' && oldName.includes(`승승장구텔레콤 ${number}호점`)) {
          return true;
        }
      }

      // 매장명 직접 매칭
      if (img.storeName && newName) {
        const shortName = newName.replace('휴대폰성지 세모폰 ', '');
        return img.storeName.includes(shortName);
      }

      return false;
    });

    return {
      storeNo,
      oldName,
      newName,
      address: store.주소,
      naverUrl: store.NaverPlaceURL,
      imagePath: matchedImage?.optimized || null,
      imageOriginal: matchedImage?.original || null,
    };
  });

  // 결과 저장
  await fs.writeFile(
    'data/storeDataWithImages.json',
    JSON.stringify(results, null, 2),
    'utf-8'
  );

  // 미매칭 이미지 보고
  const unmatchedImages = imageMapping.filter(img =>
    !results.some(r => r.imageOriginal === img.original)
  );

  console.log('\n📊 매핑 결과:');
  console.log(`   총 매장: ${results.length}개`);
  console.log(`   이미지 매칭: ${results.filter(r => r.imagePath).length}개`);
  console.log(`   미매칭: ${results.filter(r => !r.imagePath).length}개`);

  if (unmatchedImages.length > 0) {
    console.log('\n⚠️  미매칭 이미지:');
    unmatchedImages.forEach(img => console.log(`   - ${img.original}`));
  }
}

mapStoresToImages().catch(console.error);
