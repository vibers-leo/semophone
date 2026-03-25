import { chromium } from 'playwright';

// 테스트용 매장 (첫 3개만)
const testStores = [
  {
    id: 22,
    name: "휴대폰성지 세모폰 서울대입구역점",
    link: "https://map.naver.com/p/entry/place/1589313355"
  },
  {
    id: 3,
    name: "휴대폰성지 세모폰 신중동역점",
    link: "https://map.naver.com/p/entry/place/2084724952"
  },
  {
    id: 36,
    name: "휴대폰성지 세모폰 송도학원가점",
    link: "https://map.naver.com/p/entry/place/2014732523"
  }
];

async function fetchDirections(url: string, storeName: string): Promise<string | null> {
  console.log(`\n🔍 크롤링 중: ${storeName}`);
  console.log(`   URL: ${url}`);

  const browser = await chromium.launch({
    headless: false, // 브라우저 보이게 (디버깅용)
    args: ['--no-sandbox']
  });

  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    // 여러 선택자 시도
    const selectors = [
      '.place_section_content',
      '.list_directions',
      '.place_details',
      'div[class*="direction"]',
      'div[class*="traffic"]'
    ];

    let directions = '';

    for (const selector of selectors) {
      try {
        const text = await page.locator(selector).first().textContent({ timeout: 5000 });
        if (text && text.trim()) {
          directions += text + ' ';
        }
      } catch (e) {
        // 선택자가 없으면 넘어감
      }
    }

    // 전체 페이지 텍스트에서 추출 시도
    if (!directions) {
      const bodyText = await page.locator('body').textContent();
      // "오시는길" 섹션 찾기
      const match = bodyText?.match(/오시는\s*길[^]+?(?=\n\n|\z)/);
      if (match) {
        directions = match[0];
      }
    }

    directions = directions
      .replace(/\s+/g, ' ')
      .replace(/오시는\s*길/g, '')
      .trim();

    console.log(`\n   📄 원본 텍스트:`);
    console.log(`   ${directions.substring(0, 300)}`);

    if (directions) {
      const summary = summarizeDirections(directions);
      console.log(`\n   ✅ 요약 결과:`);
      console.log(`   landmark: "${summary}"`);
      return summary;
    } else {
      console.log(`   ⚠️ 정보 없음`);
      return null;
    }
  } catch (error) {
    console.error(`   ❌ 오류: ${error}`);
    return null;
  } finally {
    await browser.close();
  }
}

function summarizeDirections(text: string): string {
  if (!text) return '';

  const parts: string[] = [];

  // 지하철역 (가장 중요)
  const stationMatch = text.match(/(\d+호선\s+[가-힣]+역|[가-힣]+역\s+\d+호선|[가-힣]+역)/);
  if (stationMatch) {
    parts.push(stationMatch[0].replace(/\s+/g, ' '));
  }

  // 출구 번호
  const exitMatch = text.match(/(\d+번\s*출구)/);
  if (exitMatch) {
    parts.push(exitMatch[0]);
  }

  // 거리/시간
  const distanceMatch = text.match(/(\d+m|\d+km|도보\s*\d+분)/);
  if (distanceMatch) {
    parts.push(distanceMatch[0]);
  }

  // 건물/상권명
  const buildingMatches = text.match(/(CGV|롯데|이마트|홈플러스|[가-힣]+빌딩|[가-힣]+타워|[가-힣]+센터|[가-힣]+공원|[가-힣]+대학교)/g);
  if (buildingMatches) {
    parts.push(buildingMatches[0]);
  }

  // 위치 (층수, 방향)
  const locationMatch = text.match(/(\d+층|지하\s*\d+층|건물\s+\d+층|맞은편|근처|옆)/);
  if (locationMatch) {
    parts.push(locationMatch[0]);
  }

  if (parts.length === 0) {
    // 키워드 추출 실패 시 첫 50자
    return text.substring(0, 50).replace(/\s+/g, ' ').trim();
  }

  return parts.join(' / ');
}

async function main() {
  console.log('🧪 랜드마크 크롤링 테스트 (3개 매장)\n');
  console.log('━'.repeat(60));

  for (const store of testStores) {
    await fetchDirections(store.link, store.name);
    console.log('\n' + '━'.repeat(60));

    // 2초 대기
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n✨ 테스트 완료!');
  console.log('\n💡 결과가 만족스러우면 fetchLandmarks.ts로 전체 크롤링 실행하세요:');
  console.log('   npx tsx scripts/fetchLandmarks.ts');
}

main().catch(console.error);
