# Firebase 설정 가이드

세모폰 관리자 패널을 사용하기 위한 Firebase 설정 가이드입니다.

## 📋 목차

1. [Firebase 프로젝트 생성](#1-firebase-프로젝트-생성)
2. [Firestore Database 설정](#2-firestore-database-설정)
3. [Firebase Authentication 설정](#3-firebase-authentication-설정)
4. [Firebase Storage 설정](#4-firebase-storage-설정)
5. [환경변수 설정](#5-환경변수-설정)
6. [Security Rules 설정](#6-security-rules-설정)
7. [데이터 마이그레이션](#7-데이터-마이그레이션)
8. [관리자 계정 생성](#8-관리자-계정-생성)

---

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. **프로젝트 추가** 클릭
3. 프로젝트 이름 입력: `semophone` (또는 원하는 이름)
4. Google Analytics 설정 (선택사항)
5. **프로젝트 만들기** 클릭

---

## 2. Firestore Database 설정

1. Firebase Console 좌측 메뉴에서 **Firestore Database** 클릭
2. **데이터베이스 만들기** 클릭
3. **프로덕션 모드로 시작** 선택
4. 위치 선택: `asia-northeast3 (Seoul)` 권장
5. **사용 설정** 클릭

---

## 3. Firebase Authentication 설정

1. Firebase Console 좌측 메뉴에서 **Authentication** 클릭
2. **시작하기** 클릭
3. **Sign-in method** 탭 클릭
4. **이메일/비밀번호** 클릭
5. **사용 설정** 토글 ON
6. **저장** 클릭

---

## 4. Firebase Storage 설정

1. Firebase Console 좌측 메뉴에서 **Storage** 클릭
2. **시작하기** 클릭
3. **프로덕션 모드로 시작** 선택
4. 위치 선택: `asia-northeast3 (Seoul)` 권장
5. **완료** 클릭

---

## 5. 환경변수 설정

### 5.1 Firebase 설정 정보 가져오기

1. Firebase Console 좌측 메뉴에서 **프로젝트 설정** (톱니바퀴 아이콘) 클릭
2. **내 앱** 섹션에서 **웹 앱 추가** (</> 아이콘) 클릭
3. 앱 닉네임 입력: `semophone-web`
4. **앱 등록** 클릭
5. Firebase SDK 구성 정보 복사

### 5.2 .env.local 파일 수정

프로젝트 루트의 `.env.local` 파일에서 Firebase 환경변수를 업데이트하세요:

```bash
# ========== Firebase 클라이언트 SDK ==========
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# ========== 관리자 화이트리스트 ==========
NEXT_PUBLIC_ADMIN_EMAILS=admin@semophone.co.kr

# ========== Google Analytics (선택사항) ==========
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**⚠️ 주의**: `.env.local` 파일은 Git에 커밋하지 마세요!

---

## 6. Security Rules 설정

### 6.1 Firestore Security Rules

Firebase Console에서 **Firestore Database > Rules** 탭으로 이동한 후 아래 규칙을 붙여넣으세요:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null &&
             request.auth.token.email in [
               'admin@semophone.co.kr',
               // 추가 관리자 이메일을 여기에 입력하세요
             ];
    }

    // 모든 사용자 읽기 가능, 관리자만 쓰기 가능
    match /benefits/{benefitId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /stores/{storeId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /ogSettings/{pageId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // 통계는 클라이언트에서 쓰기 가능
    match /pageViews/{viewId} {
      allow read: if isAdmin();
      allow write: if true;
    }
  }
}
```

**중요**: `admin@semophone.co.kr`를 실제 관리자 이메일로 변경하세요!

### 6.2 Firebase Storage Rules

Firebase Console에서 **Storage > Rules** 탭으로 이동한 후 아래 규칙을 붙여넣으세요:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /stores/{storeId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null &&
                      request.resource.contentType.matches('image/.*') &&
                      request.resource.size < 5 * 1024 * 1024; // 5MB 제한
    }
  }
}
```

---

## 7. 데이터 마이그레이션

기존 하드코딩된 데이터를 Firestore로 마이그레이션합니다.

```bash
# 마이그레이션 스크립트 실행
npx ts-node scripts/migrateToFirestore.ts
```

마이그레이션이 완료되면:
- ✅ 4개의 혜택 데이터가 `benefits` collection에 추가됩니다
- ✅ 40개의 매장 데이터가 `stores` collection에 추가됩니다

Firebase Console에서 Firestore Database를 확인하여 데이터가 정상적으로 추가되었는지 확인하세요.

---

## 8. 관리자 계정 생성

1. Firebase Console에서 **Authentication > Users** 탭 클릭
2. **사용자 추가** 클릭
3. 이메일과 비밀번호 입력:
   - 이메일: `.env.local`의 `NEXT_PUBLIC_ADMIN_EMAILS`와 동일해야 함
   - 비밀번호: 안전한 비밀번호 입력
4. **사용자 추가** 클릭

---

## 9. 관리자 패널 접속

1. 개발 서버 실행:
   ```bash
   npm run dev
   ```

2. 브라우저에서 접속:
   ```
   http://localhost:3000/admin/login
   ```

3. 관리자 계정으로 로그인

4. 관리자 패널 확인:
   - `/admin` - 대시보드
   - `/admin/benefits` - 혜택 관리
   - `/admin/stores` - 매장 관리 (추후 구현)
   - `/admin/og-settings` - OG 설정 (추후 구현)

---

## 🎉 완료!

이제 관리자 패널에서 혜택 데이터를 자유롭게 수정할 수 있습니다!

- WhySection의 혜택 정보는 Firestore에서 실시간으로 가져옵니다
- 관리자 패널에서 혜택을 추가/수정/삭제하면 즉시 웹사이트에 반영됩니다

---

## 📝 추가 작업 예정

다음 기능들은 추후 구현 예정입니다:

- [ ] Stores CRUD + 이미지 업로드 최적화
- [ ] Open Graph 설정 관리
- [ ] 방문자 통계 대시보드
- [ ] Google Analytics 연동

---

## ⚠️ 주의사항

1. **환경변수 보호**: `.env.local` 파일을 Git에 커밋하지 마세요
2. **관리자 이메일 관리**: Security Rules의 관리자 이메일 리스트를 정확히 관리하세요
3. **정기 백업**: Firestore 데이터를 정기적으로 백업하세요
4. **Storage 비용**: 이미지 업로드 시 Firebase Storage 비용이 발생할 수 있습니다

---

## 🆘 문제 해결

### "Permission denied" 오류
→ Firestore Security Rules가 올바르게 설정되었는지 확인하세요

### 로그인 실패
→ Authentication에서 사용자가 생성되었는지, 이메일이 정확한지 확인하세요

### 데이터가 표시되지 않음
→ Firebase Console에서 Firestore Database를 확인하고, 마이그레이션이 완료되었는지 확인하세요

---

문의사항이 있으시면 개발팀에 연락해주세요! 🚀
