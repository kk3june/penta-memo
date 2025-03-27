# 메모 애플리케이션 프로젝트
배포 주소 : https://penta-memo.vercel.app/
## 프로젝트 개요

이 프로젝트는 React와 TypeScript를 사용한 메모 애플리케이션으로, 사용자가 메모를 작성, 조회, 수정, 삭제할 수 있는 기능을 제공합니다. Material UI를 활용하여 직관적인 사용자 인터페이스를 구현했으며, 컨텍스트 API를 통한 상태 관리를 적용하였습니다.

## 주요 기능

- 메모 생성: 제목과 내용을 입력하여 새로운 메모 생성
- 메모 조회: 저장된 모든 메모 목록 확인 및 상세 내용 보기
- 메모 수정: 기존 메모의 제목 및 내용 수정
- 메모 삭제: 불필요한 메모 삭제 (확인 모달 제공)
- 폼 유효성 검사: 사용자 입력에 대한 적절한 피드백 제공
- 로컬 스토리지 연동: 브라우저 세션 간 메모 데이터 유지
- 컨텍스트 API를 통해 애플리케이션 전체에서 메모 데이터와 관련 기능을 공유

## 기술 스택

- **프론트엔드**: React, TypeScript
- **UI 라이브러리**: Material UI (@mui/material)
- **상태 관리**: React Context API
- **빌드 도구**: Vite
- **데이터 저장**: 로컬 스토리지

## 유틸리티 기능

- **formatter.ts**: 날짜 포맷 등 데이터 표시 형식을 처리
- **storage.ts**: 로컬 스토리지 저장 및 불러오기 기능 제공

## 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm run dev

# 빌드
pnpm run build

# 빌드 결과 미리보기
pnpm run preview
```

## 프로젝트 구조

```
src
│  ├── App.tsx                 # 애플리케이션 루트 컴포넌트
│  ├── components              # 컴포넌트 관리
│  │  ├── common               # 공통 컴포넌트
│  │  │  ├── Header.tsx
│  │  │  └── Notification.tsx
│  │  ├── DeleteConfirmModal.tsx
│  │  ├── MemoDetail.tsx
│  │  ├── MemoForm.tsx
│  │  └── MemoItem.tsx
│  ├── containers              # 주요 로직을 관리할 컨테이너 컴포넌트
│  │  └── MemoApp.tsx
│  ├── context                 # 전역 상태관리를 위한 context api
│  │  └── MemoContext.tsx
│  ├── main.tsx                # 애플리케이션 진입점
│  ├── mock                    # mock 데이터
│  │  └── index.ts
│  ├── styles                  # 스타일 속성 파일
│  │  ├── globalStyles.tsx
│  │  └── theme.ts
│  ├── types                   # 타입 정의
│  │  └── index.ts
│  ├── utils                   # 기능 구현하기 위한 유틸 함수
│  │  ├── formatter.ts
│  │  └── storage.ts
```
