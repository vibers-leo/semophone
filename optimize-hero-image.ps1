# 히어로 이미지 최적화 스크립트
# 사용법: .\optimize-hero-image.ps1

# Sharp를 사용하여 이미지 최적화
npm install sharp-cli -g

# PNG를 WebP로 변환 (약 30-50% 용량 감소)
sharp-cli -i "public/landing/hero-banner-main.png" -o "public/landing/hero-banner-main.webp" -f webp -q 85

# 다양한 크기의 반응형 이미지 생성
sharp-cli -i "public/landing/hero-banner-main.png" -o "public/landing/hero-banner-main-mobile.webp" -f webp -q 85 --width 768
sharp-cli -i "public/landing/hero-banner-main.png" -o "public/landing/hero-banner-main-tablet.webp" -f webp -q 85 --width 1024
sharp-cli -i "public/landing/hero-banner-main.png" -o "public/landing/hero-banner-main-desktop.webp" -f webp -q 85 --width 1920

Write-Host "이미지 최적화 완료!" -ForegroundColor Green
Write-Host "생성된 파일:" -ForegroundColor Yellow
Write-Host "  - hero-banner-main.webp (원본 크기)"
Write-Host "  - hero-banner-main-mobile.webp (768px)"
Write-Host "  - hero-banner-main-tablet.webp (1024px)"
Write-Host "  - hero-banner-main-desktop.webp (1920px)"
