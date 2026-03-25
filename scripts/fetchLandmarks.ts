import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

interface Store {
  id: number;
  name: string;
  link?: string;
}

// stores.ts에서 필요한 정보만 추출
async function getAllStores(): Promise<Store[]> {
  // 실제로는 stores.ts를 import해야 하지만, 여기서는 간단히 처리
  const storesPath = path.join(process.cwd(), 'data', 'stores.ts');
  const content = fs.readFileSync(storesPath, 'utf-8');

  // ID와 link를 추출 (정규식 사용)
  const stores: Store[] = [];
  const idMatches = content.matchAll(/id:\s*(\d+),/g);
  const nameMatches = content.matchAll(/name:\s*"([^"]+)",/g);
  const linkMatches = content.matchAll(/link:\s*"([^"]+)",/g);

  const ids = Array.from(idMatches).map(m => parseInt(m[1]));
  const names = Array.from(nameMatches).map(m => m[1]);
  const links = Array.from(linkMatches).map(m => m[1]);

  for (let i = 0; i < ids.length; i++) {
    stores.push({
      id: ids[i],
      name: names[i],
      link: links[i]
    });
  }

  return stores;
}

// 네이버 플레이스에서 오시는길 정보 크롤링
async function fetchDirections(url: string, storeName: string): Promise<string | null> {
  console.log(`\n🔍 크롤링 중: ${storeName}`);
  console.log(`   URL: ${url}`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    // 페이지 로드 (더 빠르게)
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // 페이지가 로드될 때까지 대기
    await page.waitForTimeout(3000);

    // "오시는길" 정보 추출 시도
    let directions = '';

    // 방법 1: 일반적인 위치 정보
    const locationInfo = await page.locator('.place_section.no_margin').textContent().catch(() => null);

    // 방법 2: 상세 위치 안내
    const detailInfo = await page.locator('.list_directions').textContent().catch(() => null);

    // 방법 3: 교통 정보
    const transitInfo = await page.locator('.list_traffic').textContent().catch(() => null);

    directions = [locationInfo, detailInfo, transitInfo]
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (directions) {
      console.log(`   ✅ 수집 완료: ${directions.substring(0, 100)}...`);
      return directions;
    } else {
      console.log(`   ⚠️ 정보 없음`);
      return null;
    }
  } catch (error) {
    console.error(`   ❌ 오류 발생: ${error}`);
    return null;
  } finally {
    await browser.close();
  }
}

// 텍스트를 2~3줄로 요약 (간단한 규칙 기반)
function summarizeDirections(text: string): string {
  if (!text) return '';

  // 불필요한 텍스트 제거
  let cleaned = text
    .replace(/오시는 길/g, '')
    .replace(/위치 안내/g, '')
    .replace(/교통편/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // 역, 버스, 건물명 등 주요 키워드 추출
  const keywords: string[] = [];

  // 지하철/역 정보
  const stationMatch = cleaned.match(/(\d+호선\s+[가-힣]+역|[가-힣]+역)/);
  if (stationMatch) keywords.push(stationMatch[0]);

  // 출구 정보
  const exitMatch = cleaned.match(/(\d+번\s*출구)/);
  if (exitMatch) keywords.push(exitMatch[0]);

  // 거리 정보
  const distanceMatch = cleaned.match(/(\d+m|\d+km|도보\s*\d+분)/);
  if (distanceMatch) keywords.push(distanceMatch[0]);

  // 건물/상권 정보
  const buildingMatch = cleaned.match(/([가-힣]+빌딩|[가-힣]+타워|[가-힣]+센터|CGV|롯데|이마트|홈플러스)/);
  if (buildingMatch) keywords.push(buildingMatch[0]);

  // 층수 정보
  const floorMatch = cleaned.match(/(\d+층|지하\s*\d+층)/);
  if (floorMatch) keywords.push(floorMatch[0]);

  if (keywords.length > 0) {
    return keywords.join(' ');
  }

  // 키워드 추출 실패 시 첫 100자만 반환
  return cleaned.substring(0, 100);
}

// 메인 실행 함수
async function main() {
  console.log('🚀 네이버 플레이스 랜드마크 정보 수집 시작\n');

  const stores = await getAllStores();
  console.log(`📊 총 ${stores.length}개 매장 발견\n`);

  const results: Record<number, string> = {};

  // 각 매장별로 크롤링 (너무 빠르면 차단될 수 있으므로 간격 두기)
  for (const store of stores) {
    if (!store.link) {
      console.log(`⏭️  건너뛰기: ${store.name} (링크 없음)`);
      continue;
    }

    const directions = await fetchDirections(store.link, store.name);

    if (directions) {
      const summary = summarizeDirections(directions);
      results[store.id] = summary;
      console.log(`   📝 요약: ${summary}`);
    }

    // 요청 간격 (2초 대기)
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // 결과 저장
  const outputPath = path.join(process.cwd(), 'scripts', 'landmarks_output.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`\n✨ 완료! 결과 저장: ${outputPath}`);
  console.log(`📊 수집된 매장: ${Object.keys(results).length}개`);

  // TypeScript 코드 생성
  console.log('\n--- stores.ts에 추가할 코드 ---\n');
  for (const [id, landmark] of Object.entries(results)) {
    console.log(`  // ID ${id}에 추가:`);
    console.log(`  landmark: "${landmark}",\n`);
  }
}

main().catch(console.error);
