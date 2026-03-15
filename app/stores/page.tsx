'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { stores, type Store } from '@/data/stores';
import { calculateDistance, isCapitalArea } from '@/lib/distance';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoreDetailModal from '@/components/StoreDetailModal';
import { PullToRefresh } from '@/components/PullToRefresh';

const NaverMap = dynamic(() => import('@/components/NaverMap'), { ssr: false });

interface StoreWithDistance extends Store {
  distance?: number;
}

export default function StoresPage() {
  const [allStores, setAllStores] = useState<StoreWithDistance[]>(stores);
  const [filteredStores, setFilteredStores] = useState<StoreWithDistance[]>(stores);
  const [nearestStores, setNearestStores] = useState<StoreWithDistance[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('전체');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationState, setLocationState] = useState<'initial' | 'loading' | 'success' | 'error'>('initial');
  const [locationError, setLocationError] = useState<string>('');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const regions = ['전체', '서울', '경기', '인천'];

  const openStoreDetail = (store: Store) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const closeStoreDetail = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedStore(null), 300);
  };

  // 지역 필터링
  useEffect(() => {
    if (selectedRegion === '전체') {
      setFilteredStores(allStores);
    } else {
      setFilteredStores(allStores.filter((store) => store.region === selectedRegion));
    }
  }, [selectedRegion, allStores]);

  // Pull-to-Refresh 핸들러
  const handleRefresh = async () => {
    // 위치 권한을 받은 상태라면 위치 재갱신
    if (locationState === 'success') {
      return new Promise<void>((resolve) => {
        getMyLocation();
        setTimeout(resolve, 1000);
      });
    }
    // 그 외의 경우 간단히 새로고침
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        window.location.reload();
        resolve();
      }, 800);
    });
  };

  // 내 위치 가져오기
  const getMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('브라우저가 위치 서비스를 지원하지 않습니다.');
      setLocationState('error');
      return;
    }

    setLocationState('loading');
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        // 모든 매장에 거리 계산
        const storesWithDistance = stores.map((store) => ({
          ...store,
          distance: calculateDistance(latitude, longitude, store.lat, store.lng),
        }));

        // 거리순 정렬
        storesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));

        setAllStores(storesWithDistance);

        // 수도권 사용자인 경우 가장 가까운 3개 매장 찾기
        const capitalAreaStores = storesWithDistance.filter((store) =>
          isCapitalArea(store.region)
        );

        if (capitalAreaStores.length > 0) {
          setNearestStores(capitalAreaStores.slice(0, 3));
        } else {
          // 수도권이 아닌 경우 전체에서 가장 가까운 3개
          setNearestStores(storesWithDistance.slice(0, 3));
        }

        setLocationState('success');
      },
      (error) => {
        console.error('위치 정보를 가져올 수 없습니다:', error);
        let errorMessage = '위치 정보를 가져올 수 없습니다.';

        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = '위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = '위치 정보를 사용할 수 없습니다.';
        } else if (error.code === error.TIMEOUT) {
          errorMessage = '위치 요청 시간이 초과되었습니다. 다시 시도해주세요.';
        }

        setLocationError(errorMessage);
        setLocationState('error');
      }
    );
  };

  return (
    <>
      <Header />
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="min-h-screen pt-16 md:pt-20 bg-[#f6f6f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">성지찾기</h1>
          <p className="text-base md:text-lg text-gray-600">
            전국 40개 세모폰 매장을 찾아보세요
          </p>
        </div>

        {/* 내 위치 기반 검색 */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          {/* Step 1: Initial - 권한 요청 */}
          {locationState === 'initial' && (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-brand rounded-full animate-ping opacity-20"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-brand to-primary-hover rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                내 주변 가까운 성지 찾기
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-2 max-w-md mx-auto">
                위치 권한을 허용하면 가장 가까운 <span className="text-brand font-bold">매장 3곳</span>을 찾아드립니다
              </p>
              <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                (현재 서울·경기·인천 지역 서비스 중입니다)
              </p>
              <button
                onClick={getMyLocation}
                className="relative bg-gradient-to-r from-[#F2C811] to-[#D4AD00] text-black px-10 md:px-14 py-4 md:py-5 rounded-full text-xl font-black shadow-[0_8px_30px_rgba(242,200,17,0.5)] hover:shadow-[0_12px_40px_rgba(242,200,17,0.7)] hover:-translate-y-1 hover:scale-105 transition-all duration-300 animate-pulse"
              >
                📍 내 위치에서 찾기
              </button>
              <p className="text-xs text-gray-500 mt-4">
                위치 정보는 가까운 매장 찾기에만 사용되며 저장되지 않습니다
              </p>
            </div>
          )}

          {/* Step 2: Loading - 위치 확인 중 */}
          {locationState === 'loading' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6">
                <div className="w-20 h-20 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                가까운 성지를 찾고 있어요...
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                잠시만 기다려주세요 (3-5초 소요)
              </p>
            </div>
          )}

          {/* Step 3: Success - 결과 표시 */}
          {locationState === 'success' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  ✅ 내 주변 가까운 매장을 찾았어요!
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  위치 정보를 기반으로 가까운 매장을 표시합니다
                </p>
              </div>

              {/* 가까운 매장 3개 */}
              {nearestStores.length > 0 && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-black text-gray-900">🏆 가장 가까운 매장</h3>
                  </div>

                  <div className="space-y-4">
                    {nearestStores.map((store, index) => (
                      <div
                        key={store.id}
                        className="relative bg-white rounded-2xl border-2 border-gray-100 hover:border-brand overflow-hidden transition-all duration-300 hover:shadow-brand-card group"
                      >
                        {/* 순위 배지 */}
                        <div className="absolute top-4 left-4 z-10">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shadow-lg ${
                            index === 0 ? 'bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-black' :
                            index === 1 ? 'bg-gradient-to-br from-[#C0C0C0] to-[#808080] text-white' :
                            'bg-gradient-to-br from-[#CD7F32] to-[#8B4513] text-white'
                          }`}>
                            #{index + 1}
                          </div>
                        </div>

                        {/* 거리 배지 */}
                        {store.distance !== undefined && (
                          <div className="absolute top-4 right-4 z-10">
                            <div className="px-4 py-2 bg-black/90 text-[#F2C811] rounded-full font-bold text-base backdrop-blur-sm">
                              {store.distance}km
                            </div>
                          </div>
                        )}

                        <div className="p-6 pt-20">
                          {/* 매장명 */}
                          <h4 className="text-xl font-black text-gray-900 mb-3 group-hover:text-brand transition-colors">
                            {store.name}
                          </h4>

                          {/* 주소 */}
                          <div className="flex items-start gap-2 mb-3">
                            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-sm text-gray-600 leading-relaxed">{store.address}</p>
                          </div>

                          {/* 전화번호 */}
                          <div className="flex items-center gap-2 mb-6">
                            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-sm text-gray-600 font-medium">{store.phone}</span>
                          </div>

                          {/* 액션 버튼 */}
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => openStoreDetail(store)}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F2C811] text-black rounded-xl font-bold hover:bg-[#D4AD00] hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            >
                              매장안내
                            </button>
                            <a
                              href={`https://map.naver.com/v5/search/${encodeURIComponent(store.address)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#03C75A] text-white rounded-xl font-bold hover:bg-[#02b350] hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            >
                              길찾기
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Error - 에러 화면 */}
          {locationState === 'error' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                위치를 가져올 수 없습니다
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6 max-w-md mx-auto">
                {locationError}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={getMyLocation}
                  className="bg-brand text-black px-6 py-3 rounded-full font-bold shadow-brand hover:bg-primary-hover hover:shadow-brand-hover hover:-translate-y-0.5 hover:scale-105 transition-all duration-300"
                >
                  🔄 다시 시도
                </button>
                <button
                  onClick={() => setLocationState('initial')}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                  ← 처음으로
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 지도/리스트 뷰 전환 */}
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mb-6">
          <div className="flex flex-col gap-4">
            {/* 뷰 모드 전환 */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('map')}
                className={`flex-1 md:flex-none px-6 py-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap ${
                  viewMode === 'map'
                    ? 'bg-brand text-black shadow-brand hover:shadow-brand-hover hover:-translate-y-0.5 hover:scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:-translate-y-0.5'
                }`}
              >
                🗺️ 지도
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 md:flex-none px-6 py-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap ${
                  viewMode === 'list'
                    ? 'bg-brand text-black shadow-brand hover:shadow-brand-hover hover:-translate-y-0.5 hover:scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:-translate-y-0.5'
                }`}
              >
                📋 리스트
              </button>
            </div>

            {/* 지역 필터 */}
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedRegion === region
                      ? 'bg-brand text-black shadow-brand hover:shadow-brand-hover hover:-translate-y-0.5 hover:scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:-translate-y-0.5'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 지도 뷰 */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mb-6">
            <div style={{ height: '600px' }}>
              <NaverMap
                stores={filteredStores}
                userLocation={userLocation}
                onStoreClick={(store) => {
                  openStoreDetail(store);
                }}
              />
            </div>
          </div>
        )}

        {/* 매장 리스트 */}
        {viewMode === 'list' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredStores.map((store, index) => (
            <div
              key={store.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-100 hover:border-[#F2C811] hover:shadow-brand-card hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300"
            >
              {/* 카드 헤더 - 로고 배경 */}
              <div className="relative h-32 bg-gradient-to-br from-[#F2C811] to-[#D4AD00] flex items-center justify-center">
                <img
                  src="/images/logo/기본로고.png"
                  alt="세모폰"
                  className="h-16 w-16 object-contain opacity-90"
                />
                {/* 거리 배지 */}
                {store.distance !== undefined && (
                  <div className="absolute top-3 right-3 bg-black/80 text-[#F2C811] px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                    {store.distance}km
                  </div>
                )}
                {/* 순위 배지 (가까운 3개) */}
                {nearestStores.some(s => s.id === store.id) && (
                  <div className="absolute top-3 left-3 bg-white text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    #{nearestStores.findIndex(s => s.id === store.id) + 1}
                  </div>
                )}
              </div>

              {/* 카드 내용 */}
              <div className="p-5">
                {/* 매장명 */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{store.name}</h3>

                {/* 주소 */}
                <div className="flex items-start mb-2">
                  <svg
                    className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-xs text-gray-600 line-clamp-2">{store.address}</p>
                </div>

                {/* 전화번호 */}
                <div className="flex items-center mb-4">
                  <svg
                    className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-xs text-gray-500">{store.phone}</span>
                </div>

                {/* 액션 버튼 */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openStoreDetail(store)}
                    className="flex-1 bg-[#F2C811] text-black py-2.5 rounded-lg text-sm font-bold hover:bg-[#D4AD00] transition-colors text-center"
                  >
                    매장안내
                  </button>
                  <a
                    href={`https://map.naver.com/v5/search/${encodeURIComponent(store.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#03C75A] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#02b350] transition-colors text-center"
                  >
                    길찾기
                  </a>
                </div>

                {/* 지역 태그 */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                    📍 {store.region}
                  </span>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {filteredStores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">해당 지역에 매장이 없습니다.</p>
          </div>
        )}
      </div>
    </main>
      </PullToRefresh>
    <Footer />

    {/* 매장 상세 모달 */}
    <StoreDetailModal
      store={selectedStore}
      isOpen={isModalOpen}
      onClose={closeStoreDetail}
    />
    </>
  );
}
