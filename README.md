# Todo List

할 일 목록을 관리할 수 있는 웹 애플리케이션입니다. 태그 기능과 필터링, 통계 기능을 제공합니다.

## 배포 주소

todo-list-rouge-nu.vercel.app

## 주요 기능

- ✅ 할 일 추가, 수정, 삭제
- 🏷️ 태그 관리 (태그 추가, 수정, 삭제)
- 🔍 상태별 필터링 (진행 중, 완료)
- 📊 할 일 통계 (전체, 진행 중, 완료 개수)
- 🔄 로딩 상태 표시

## 기술 스택

### Core
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구 및 개발 서버

### 라우팅 & 상태 관리
- **TanStack Router** - 파일 기반 라우팅
- **TanStack Query (React Query)** - 서버 상태 관리 및 데이터 페칭

### 스타일링
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크
- **Lucide React** - 아이콘 라이브러리

### HTTP 클라이언트
- **Axios** - HTTP 요청 처리

### 개발 도구
- **MSW (Mock Service Worker)** - API 모킹
- **ESLint & Prettier** - 코드 품질 관리
- **TanStack Devtools** - 개발자 도구

## 프로젝트 구조

```
src/
├── features/          # 기능별 모듈
│   ├── todos/        # 할 일 관련 기능
│   │   ├── api/      # API 호출 훅
│   │   ├── components/ # UI 컴포넌트
│   │   └── hooks/    # 커스텀 훅
│   └── tags/         # 태그 관련 기능
├── pages/            # 페이지 컴포넌트
├── routes/           # 라우트 정의
├── shared/           # 공유 유틸리티 및 타입
│   ├── constants/    # 상수
│   ├── types/        # 타입 정의
│   ├── hooks/        # 커스텀 훅
│   └── utils/        # 유틸리티 함수
└── mocks/            # MSW 핸들러
```

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
```

## 스크립트

### 개발
```bash
npm run dev          # 개발 서버 실행
```

### 빌드
```bash
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
```

## 주요 구현 사항

### Feature-based 아키텍처
기능별로 모듈을 분리하여 유지보수성과 확장성을 높였습니다. 각 feature는 `api`, `components`, `hooks`로 구성됩니다.

### MSW를 활용한 API 모킹
개발 환경에서 실제 백엔드 없이도 API를 테스트할 수 있도록 MSW를 설정했습니다.

## 기술 스택 상세

### TanStack Router
파일 기반 라우팅을 사용합니다. `src/routes` 디렉토리에 라우트 파일을 추가하면 자동으로 라우트가 생성됩니다.

- 파일 기반 라우팅
- 타입 안전한 네비게이션
- 자동 코드 스플리팅

### TanStack Query (React Query)
서버 상태 관리와 데이터 페칭을 담당합니다.

- 자동 캐싱 및 재검증
- 낙관적 업데이트
- 에러 처리
- 로딩 상태 관리


### MSW (Mock Service Worker)
개발 환경에서 API를 모킹합니다. `src/mocks/handlers.ts`에서 핸들러를 정의합니다.


### AI tool

README.md 초안 작성과 화면 스타일링, MSW mocking 핸들러 템플릿 작성에 AI 를 활용하였습니다. 