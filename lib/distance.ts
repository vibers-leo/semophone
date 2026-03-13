// Haversine 공식을 사용하여 두 좌표 간의 거리를 계산 (km 단위)
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // 지구의 반지름 (km)
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // 소수점 첫째자리까지
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// 수도권 지역 확인
export function isCapitalArea(region: string): boolean {
  return ['서울', '경기', '인천'].includes(region);
}
