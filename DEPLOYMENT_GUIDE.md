# app.semophone.co.kr 배포 및 도메인 설정 가이드

## 📋 개요
세모폰 프로젝트를 Vercel에 배포하고 Cloudflare DNS를 통해 `app.semophone.co.kr` 도메인으로 접속할 수 있도록 설정하는 가이드입니다.

---

## 🚀 1단계: Vercel 프로젝트 설정

### 1-1. Vercel 프로젝트 확인
1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. GitHub 연동 확인 (`juuuno-coder/semophone` 리포지토리)
3. 프로젝트가 없다면 "Add New Project" 클릭

### 1-2. 자동 배포 확인
- Git push 시 자동으로 배포됩니다
- 현재 커밋 (`3b956a3`)이 자동으로 배포 중입니다
- Vercel 대시보드에서 배포 상태 확인:
  - **Building**: 빌드 중
  - **Ready**: 배포 완료

### 1-3. 프로덕션 URL 확인
배포 완료 후 기본 URL이 생성됩니다:
```
https://semophone.vercel.app
또는
https://semophone-[random].vercel.app
```

---

## 🌐 2단계: Cloudflare DNS 설정

### 2-1. Cloudflare 대시보드 접속
1. [Cloudflare 로그인](https://dash.cloudflare.com/)
2. `semophone.co.kr` 도메인 선택
3. 좌측 메뉴에서 **DNS** 클릭

### 2-2. CNAME 레코드 추가
1. **Add record** 버튼 클릭
2. 다음 정보 입력:

| 항목 | 값 |
|------|-----|
| Type | `CNAME` |
| Name | `app` |
| Target | `cname.vercel-dns.com` |
| Proxy status | **DNS only** (회색 구름) ⚠️ 중요! |
| TTL | Auto |

3. **Save** 클릭

**중요**: Proxy status를 "DNS only"로 설정해야 합니다. "Proxied" (주황색 구름)로 하면 Vercel SSL이 작동하지 않습니다.

### 2-3. 설정 확인
추가한 레코드가 다음과 같이 표시되어야 합니다:
```
Type: CNAME
Name: app
Content: cname.vercel-dns.com
Proxy status: DNS only (회색 구름)
```

---

## 🔧 3단계: Vercel 도메인 연결

### 3-1. Vercel 프로젝트 설정
1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** 탭 클릭
3. 좌측 메뉴에서 **Domains** 클릭

### 3-2. 커스텀 도메인 추가
1. 입력 필드에 `app.semophone.co.kr` 입력
2. **Add** 버튼 클릭
3. Vercel이 자동으로 DNS 확인 시작

### 3-3. SSL 인증서 발급 대기
- Vercel이 자동으로 Let's Encrypt SSL 인증서 발급
- 보통 1-5분 소요
- 상태가 **Valid**로 변경되면 완료

---

## ✅ 4단계: 배포 확인

### 4-1. DNS 전파 확인
DNS 변경사항이 전파되는 데 1-10분 소요됩니다.

**터미널에서 확인**:
```bash
# Windows PowerShell
nslookup app.semophone.co.kr

# 또는
Resolve-DnsName app.semophone.co.kr
```

**결과 예시**:
```
Name:    cname.vercel-dns.com
Address: 76.76.21.21 (Vercel IP)
Aliases: app.semophone.co.kr
```

### 4-2. 웹 브라우저 접속
1. 브라우저에서 `https://app.semophone.co.kr` 접속
2. SSL 인증서 확인 (자물쇠 아이콘)
3. 메인 페이지 로딩 확인

### 4-3. 개선 효과 확인
**개발자 도구 (F12) → Network 탭**에서:
- **이미지 포맷**: WebP 확인
- **trust-support.png**: 26MB → ~2-3MB로 감소 확인
- **no-loss-customer.png**: 4.5MB → ~500KB로 감소 확인
- **전체 페이지 로딩 시간**: ~1.5초 이내 확인

---

## 🔍 5단계: 트러블슈팅

### 문제 1: "Invalid Configuration" 오류
**원인**: Cloudflare Proxy가 활성화됨

**해결책**:
1. Cloudflare DNS 설정으로 이동
2. `app` CNAME 레코드의 Proxy status를 **DNS only**로 변경
3. Vercel에서 도메인 제거 후 다시 추가

### 문제 2: DNS 레코드를 찾을 수 없음
**원인**: DNS 전파 중

**해결책**:
- 5-10분 대기 후 다시 확인
- Cloudflare 캐시 삭제: Caching → Purge Everything

### 문제 3: SSL 인증서 오류
**원인**: Vercel SSL 발급 실패

**해결책**:
1. Vercel Domains 설정에서 도메인 상태 확인
2. "Refresh" 버튼 클릭
3. 여전히 실패 시 도메인 제거 후 재추가

### 문제 4: 이미지가 최적화되지 않음
**원인**: 빌드 캐시

**해결책**:
1. Vercel 대시보드 → Deployments
2. 최신 배포 선택 → 우측 메뉴 (⋯) → Redeploy
3. "Use existing Build Cache" 체크 해제 후 Redeploy

---

## 📊 6단계: 성능 측정

### Lighthouse 점수 확인
1. Chrome 개발자 도구 (F12) → Lighthouse 탭
2. "Analyze page load" 클릭
3. 목표 점수:
   - **Performance**: 90+ (현재 60-70에서 개선)
   - **Accessibility**: 95+
   - **Best Practices**: 95+
   - **SEO**: 100

### Core Web Vitals 확인
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## 🎯 7단계: 비교 테스트

### 기존 사이트 vs 새 사이트
1. **기존**: `https://semophone.co.kr` (기존 버전)
2. **새 버전**: `https://app.semophone.co.kr` (Phase 1-2 적용)

### 비교 항목
| 항목 | 기존 | 새 버전 | 개선 |
|------|------|---------|------|
| 페이지 로딩 | ~4초 | ~1.5초 | 62% ⬇️ |
| 이미지 용량 | 35MB | 3MB | 91% ⬇️ |
| LCP | ~3-4초 | <2.5초 | 40% ⬇️ |
| Lighthouse | 60-70 | 90+ | +30점 |

---

## 📝 8단계: 추가 설정 (선택사항)

### 8-1. Vercel 환경변수 설정
Phase 3-5 진행 시 필요:
1. Vercel 프로젝트 → Settings → Environment Variables
2. 필요한 환경변수 추가 (.env.local 참고)

### 8-2. Cloudflare Page Rules (선택)
캐싱 최적화:
1. Cloudflare → Page Rules
2. `https://app.semophone.co.kr/*` 규칙 생성
3. Cache Level: Standard
4. Browser Cache TTL: 1 day

### 8-3. 프리뷰 도메인 (선택)
개발 테스트용:
1. Vercel에서 `dev.semophone.co.kr` 추가
2. Preview 배포에만 연결

---

## 🚦 배포 체크리스트

배포 전:
- [x] Phase 1-2 완료 (이미지 최적화 + 디자인 토큰)
- [x] 로컬 빌드 성공 (`npm run build`)
- [x] Git 커밋 및 푸시
- [ ] Vercel 자동 배포 확인

도메인 설정:
- [ ] Cloudflare CNAME 레코드 추가 (`app → cname.vercel-dns.com`)
- [ ] Proxy status = DNS only 확인
- [ ] Vercel Domains에서 `app.semophone.co.kr` 추가
- [ ] SSL 인증서 발급 완료 (Valid 상태)

배포 확인:
- [ ] DNS 전파 확인 (`nslookup app.semophone.co.kr`)
- [ ] HTTPS 접속 확인
- [ ] 이미지 WebP 변환 확인
- [ ] 페이지 로딩 속도 확인
- [ ] Lighthouse 점수 90+ 확인

---

## 🆘 추가 도움

### Vercel 공식 문서
- [커스텀 도메인 추가](https://vercel.com/docs/projects/domains/add-a-domain)
- [Cloudflare와 연동](https://vercel.com/docs/projects/domains/working-with-cloudflare)

### Cloudflare 공식 문서
- [CNAME 레코드 설정](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)

### 문제 발생 시
1. Vercel 대시보드에서 배포 로그 확인
2. Cloudflare DNS 설정 재확인
3. 5-10분 대기 후 다시 시도

---

## 📌 다음 단계 (Phase 3-5)

현재 Phase 1-2 완료:
- ✅ 이미지 최적화
- ✅ 디자인 토큰 통합

앞으로 진행할 Phase 3-5:
- Phase 3: UI/UX 개선 (벤토 그리드, 애니메이션, Gallery 리디자인)
- Phase 4: 컴포넌트 리팩토링
- Phase 5: 성능 최적화 (Lazy loading, Dynamic import)

필요 시 계속 진행 가능합니다!
