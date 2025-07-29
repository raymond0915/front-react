# Todo React 애플리케이션

React 19와 JavaScript로 구현된 Todo 관리 애플리케이션입니다.

## 🎯 학습 목표

이 프로젝트를 통해 다음을 학습할 수 있습니다:

### React 기본 개념
- **컴포넌트**: 재사용 가능한 UI 조각
- **Props**: 부모에서 자식으로 데이터 전달
- **State**: 컴포넌트 내부 상태 관리
- **Hooks**: useState, useEffect, useMemo 등

### 주요 기능
- 사용자 인증 (로그인/로그아웃)
- Todo 목록 조회
- Todo 추가/수정/삭제
- Todo 상태 변경 (완료/미완료)
- Todo 필터링 (전체/완료/미완료)
- 반응형 디자인

## 📁 프로젝트 구조

```
front-react/
├── public/                 # 정적 파일
│   ├── index.html         # 메인 HTML 파일
│   ├── manifest.json      # PWA 설정
│   ├── favicon.ico        # 브라우저 탭 아이콘
│   ├── logo192.png        # 앱 아이콘 (192x192)
│   └── logo512.png        # 앱 아이콘 (512x512)
├── src/
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── auth/         # 인증 관련 컴포넌트
│   │   ├── todo/         # Todo 관련 컴포넌트
│   │   │   ├── TodoList.jsx      # 할 일 목록 표시
│   │   │   ├── TodoCard.jsx      # 개별 할 일 카드
│   │   │   ├── TodoForm.jsx      # 할 일 추가/수정 모달
│   │   │   └── TodoFilter.jsx    # 필터 버튼들
│   │   └── ui/           # 공통 UI 컴포넌트
│   │       ├── Header.jsx        # 헤더 컴포넌트
│   │       ├── TodoStats.jsx     # 통계 정보 표시
│   │       ├── TodoActions.jsx   # 액션 버튼 그룹
│   │       ├── EmptyState.jsx    # 빈 상태 표시
│   │       ├── LoadingSpinner.jsx # 로딩 스피너
│   │       └── ConfirmDialog.jsx # 확인 다이얼로그
│   ├── pages/            # 페이지 컴포넌트
│   │   ├── auth/         # 인증 페이지
│   │   │   └── LoginPage.jsx     # 로그인 페이지
│   │   └── todo/         # Todo 페이지
│   │       └── TodoPage.jsx      # 메인 할 일 페이지
│   ├── utils/            # 유틸리티 함수
│   │   └── data.js       # 초기 데이터 (할 일, 사용자)
│   ├── assets/           # 이미지, 스타일 등
│   │   ├── images/
│   │   └── styles/
│   │       ├── App.css   # 앱 전체 스타일
│   │       └── index.css # 전역 스타일
│   ├── App.jsx           # 메인 앱 컴포넌트
│   └── index.js          # 앱 진입점
├── package.json
└── README.md
```

## 🚀 주요 기능 설명

### 1. 사용자 인증
- **로그인**: 이메일/비밀번호로 로그인
- **세션 관리**: localStorage를 사용한 로그인 상태 유지
- **로그아웃**: 세션 종료 및 로그인 페이지로 이동

### 2. Todo 관리
- **목록 조회**: 모든 할 일을 카드 형태로 표시
- **추가**: 모달을 통해 새로운 할 일 추가
- **수정**: 할 일 상태 변경 (완료/미완료)
- **삭제**: 확인 다이얼로그를 통한 안전한 삭제

### 3. 필터링
- **전체**: 모든 할 일 표시
- **완료**: 완료된 할 일만 표시
- **미완료**: 미완료된 할 일만 표시

### 4. 성능 최적화
- **useMemo**: 불필요한 재계산 방지
- **컴포넌트 분리**: 재사용성과 유지보수성 향상

## 🛠️ 기술 스택

- **React 19** - 최신 React 버전
- **JavaScript (ES6+)** - 모던 JavaScript
- **React Router DOM 6.22** - 클라이언트 사이드 라우팅
- **Bootstrap 5.3.7** - UI 프레임워크
- **Bootstrap Icons** - 아이콘 라이브러리

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build
```

## 🧪 테스트 계정

프로젝트에 포함된 테스트 계정들:
- `user1@example.com` / `password123`
- `admin@example.com` / `adminpass`
- `guest@example.com` / `guest`

## 📚 학습 가이드

### 단계별 학습 순서

1. **기본 구조 이해**
   - 컴포넌트 구조 파악
   - Props와 State 개념 이해

2. **인증 기능 학습**
   - LoginPage 컴포넌트 분석
   - localStorage 사용법 이해

3. **Todo CRUD 기능**
   - TodoList, TodoCard 컴포넌트 분석
   - 상태 관리 패턴 이해

4. **UI 컴포넌트**
   - Bootstrap 활용법
   - 반응형 디자인 이해

5. **성능 최적화**
   - useMemo 사용법
   - 컴포넌트 분리 원칙

### 주요 React 개념

- **컴포넌트**: UI를 재사용 가능한 조각으로 나누는 방법
- **Props**: 부모 컴포넌트에서 자식 컴포넌트로 데이터 전달
- **State**: 컴포넌트 내부에서 관리하는 상태
- **Hooks**: 함수형 컴포넌트에서 상태와 생명주기 관리
- **useEffect**: 컴포넌트의 부수 효과 처리
- **useMemo**: 계산 결과 메모이제이션

## 🔧 커스터마이징

### 새로운 기능 추가하기
1. 새로운 컴포넌트 생성
2. 필요한 상태 추가
3. 이벤트 핸들러 구현
4. 스타일링 적용

### 데이터 구조 변경
- `src/utils/data.js`에서 초기 데이터 수정
- 컴포넌트에서 새로운 필드 활용

## 🐛 문제 해결

### 자주 발생하는 문제들
1. **컴포넌트가 렌더링되지 않음**: import 경로 확인
2. **상태가 업데이트되지 않음**: setState 함수 사용법 확인
3. **스타일이 적용되지 않음**: Bootstrap 클래스명 확인

## 📝 향후 개선 계획

- [ ] 검색 기능 추가
- [ ] 할 일 정렬 기능
- [ ] 카테고리 기능
- [ ] 마감일 설정
- [ ] 데이터베이스 연동
- [ ] 사용자 프로필 관리

## 📄 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다. 