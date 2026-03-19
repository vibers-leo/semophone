'use client';

import { Store } from '@/data/stores';
import Image from 'next/image';

interface StoreActionButtonsProps {
  store: Store;
  variant?: 'default' | 'compact' | 'modal' | 'infowindow';
  onStoreInfoClick?: () => void;
  showKakaoLabel?: boolean; // 카톡상담 버튼에 텍스트 표시 여부
}

export default function StoreActionButtons({
  store,
  variant = 'default',
  onStoreInfoClick,
  showKakaoLabel = true,
}: StoreActionButtonsProps) {
  // 매장안내 버튼 클릭 핸들러
  const handleStoreInfo = () => {
    if (onStoreInfoClick) {
      onStoreInfoClick();
    }
  };

  // variant별 스타일 설정
  const getContainerClass = () => {
    switch (variant) {
      case 'modal':
        return 'grid grid-cols-3 gap-3';
      case 'infowindow':
        return 'flex gap-2';
      case 'compact':
        return 'grid grid-cols-3 gap-2';
      default:
        return 'grid grid-cols-2 gap-3';
    }
  };

  const getButtonClass = (type: 'info' | 'nav' | 'kakao') => {
    const baseClass = 'flex items-center justify-center gap-2 font-bold transition-all';

    switch (variant) {
      case 'modal':
        return `${baseClass} flex-col gap-1.5 px-3 py-3.5 rounded-xl text-xs hover:shadow-lg hover:-translate-y-0.5`;
      case 'infowindow':
        return `${baseClass} flex-1 px-3 py-2 rounded-lg text-xs`;
      case 'compact':
        return `${baseClass} px-3 py-2.5 rounded-lg text-sm hover:shadow-lg hover:-translate-y-1`;
      default:
        return `${baseClass} px-4 py-3.5 rounded-xl hover:shadow-lg hover:-translate-y-1`;
    }
  };

  const iconSize = variant === 'modal' ? 20 : 18;

  // 카카오톡 링크 (매장별 링크가 없으면 기본 링크)
  const kakaoLink = store.kakaoLink || 'https://pf.kakao.com/_MvxaTn';

  return (
    <div className={getContainerClass()}>
      {/* 매장안내 버튼 */}
      <button
        onClick={handleStoreInfo}
        className={`${getButtonClass('info')} text-black relative overflow-hidden`}
        style={{ backgroundColor: '#FEE500' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDD835'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEE500'}
      >
        {variant !== 'infowindow' && (
          <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity"></div>
        )}
        {variant === 'modal' ? (
          <>
            <svg className="relative w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="relative">매장안내</span>
          </>
        ) : (
          <>
            <Image src="/icons/빈페이지.png" alt="" width={iconSize} height={iconSize} className="relative w-4.5 h-4.5 object-contain" />
            <span className="relative font-bold">매장안내</span>
          </>
        )}
      </button>

      {/* 길찾기 버튼 */}
      <a
        href={`https://map.naver.com/v5/directions/-/-/${store.lng},${store.lat},${encodeURIComponent(store.name)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${getButtonClass('nav')} bg-[#03C75A] text-white hover:bg-[#02b350] relative overflow-hidden`}
      >
        {variant !== 'infowindow' && (
          <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity"></div>
        )}
        {variant === 'modal' ? (
          <>
            <svg className="relative w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="relative">길찾기</span>
          </>
        ) : (
          <>
            <Image src="/icons/나침반.png" alt="" width={iconSize} height={iconSize} className="relative w-4.5 h-4.5 object-contain brightness-0 invert" />
            <span className="relative font-bold">길찾기</span>
          </>
        )}
      </a>

      {/* 카톡상담 버튼 */}
      <a
        href={kakaoLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`${getButtonClass('kakao')} text-black relative overflow-hidden ${variant === 'default' ? 'col-span-2' : ''}`}
        style={{ backgroundColor: '#FEE500' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDD835'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEE500'}
      >
        {variant !== 'infowindow' && (
          <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity"></div>
        )}
        {variant === 'modal' ? (
          <>
            <svg className="relative w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.8 1.8 5.2 4.5 6.6-.2.7-.6 2.5-.7 2.8-.1.4 0 .4.2.3.2-.1 2.5-1.7 3.2-2.2.6.1 1.2.2 1.8.2 5.523 0 10-3.477 10-7.8S17.523 3 12 3zm-3.5 10.5c-.4 0-.8-.3-.8-.8v-3.5h-.9c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h3.4c.4 0 .8.3.8.8s-.3.8-.8.8h-.9v3.5c0 .5-.3.8-.8.8zm4.5 0c-.4 0-.8-.3-.8-.8v-4.9c0-.4.3-.8.8-.8s.8.3.8.8v4.9c0 .5-.4.8-.8.8zm4.2 0c-.3 0-.5-.1-.7-.3l-1.8-2.4v2c0 .4-.3.8-.8.8s-.8-.3-.8-.8v-4.9c0-.4.3-.8.8-.8.3 0 .5.1.7.3l1.8 2.4v-2c0-.4.3-.8.8-.8s.8.3.8.8v4.9c0 .5-.4.8-.8.8z"/>
            </svg>
            <span className="relative">카톡상담</span>
          </>
        ) : showKakaoLabel ? (
          <>
            <svg className="relative w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.8 1.8 5.2 4.5 6.6-.2.7-.6 2.5-.7 2.8-.1.4 0 .4.2.3.2-.1 2.5-1.7 3.2-2.2.6.1 1.2.2 1.8.2 5.523 0 10-3.477 10-7.8S17.523 3 12 3zm-3.5 10.5c-.4 0-.8-.3-.8-.8v-3.5h-.9c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h3.4c.4 0 .8.3.8.8s-.3.8-.8.8h-.9v3.5c0 .5-.3.8-.8.8zm4.5 0c-.4 0-.8-.3-.8-.8v-4.9c0-.4.3-.8.8-.8s.8.3.8.8v4.9c0 .5-.4.8-.8.8zm4.2 0c-.3 0-.5-.1-.7-.3l-1.8-2.4v2c0 .4-.3.8-.8.8s-.8-.3-.8-.8v-4.9c0-.4.3-.8.8-.8.3 0 .5.1.7.3l1.8 2.4v-2c0-.4.3-.8.8-.8s.8.3.8.8v4.9c0 .5-.4.8-.8.8z"/>
            </svg>
            <span className="relative font-bold">카톡상담</span>
          </>
        ) : (
          // 로고만 표시 (지도마커용)
          <svg className="relative w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.8 1.8 5.2 4.5 6.6-.2.7-.6 2.5-.7 2.8-.1.4 0 .4.2.3.2-.1 2.5-1.7 3.2-2.2.6.1 1.2.2 1.8.2 5.523 0 10-3.477 10-7.8S17.523 3 12 3zm-3.5 10.5c-.4 0-.8-.3-.8-.8v-3.5h-.9c-.4 0-.8-.3-.8-.8s.3-.8.8-.8h3.4c.4 0 .8.3.8.8s-.3.8-.8.8h-.9v3.5c0 .5-.3.8-.8.8zm4.5 0c-.4 0-.8-.3-.8-.8v-4.9c0-.4.3-.8.8-.8s.8.3.8.8v4.9c0 .5-.4.8-.8.8zm4.2 0c-.3 0-.5-.1-.7-.3l-1.8-2.4v2c0 .4-.3.8-.8.8s-.8-.3-.8-.8v-4.9c0-.4.3-.8.8-.8.3 0 .5.1.7.3l1.8 2.4v-2c0-.4.3-.8.8-.8s.8.3.8.8v4.9c0 .5-.4.8-.8.8z"/>
          </svg>
        )}
      </a>
    </div>
  );
}
