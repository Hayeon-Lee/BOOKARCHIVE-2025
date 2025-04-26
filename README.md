📚 BOOKARCHIVE-2025
"기록은 곧 성장이다."

BOOKARCHIVE-2025는 독서 모임의 책 기록을 체계적으로 관리하고, 독서 목표를 성취하는 경험을 지원하는 웹 애플리케이션입니다.

<br />
👉 바로가기 | BOOKARCHIVE-2025 배포 링크

<br />
🎬 프로젝트 데모

메인 화면 책 추가하기 목표 달성하기
(※ GIF는 내가 예시로 넣은 거야! 직접 캡쳐해서 넣어야 해 ✨ 방법은 아래 참고)

<br />
🔥 프로젝트 개요
프로젝트명: BOOKARCHIVE-2025

개발 기간: 2025.04 ~ 진행 중

개발 인원: 개인 프로젝트

주요 기술: React, TypeScript, Vite, Zustand, Tailwind CSS, Ant Design, Firebase

<br />
🎯 프로젝트 기획 의도
왜 BOOKARCHIVE-2025를 만들게 되었을까?

소규모 독서 모임을 운영하며 느낀 불편함:
단순한 "책 제목" 기록을 넘어, 목표 설정과 진행 상황 관리가 필요했습니다.

기존 독서 관리 서비스들의 한계:
목표량, 목표 날짜 설정 기능이 제한적이거나, 단순 리뷰 위주였습니다.

그래서!
"사용자가 자신의 독서 목표를 주도적으로 설정하고, 성취 경험을 관리할 수 있는 맞춤형 플랫폼"
을 직접 만들기로 결심했습니다.

<br />
✨ 주요 기능

기능 설명
월별 보기 한 달 동안 모든 멤버가 등록한 책을 한눈에 확인
내 책장 본인이 등록한 책과 목표 진행 상황을 확인
멤버별 보기 특정 멤버의 독서 기록만 모아보기
목표 설정 책 추가 시 목표 분량과 목표 날짜를 설정
목표 달성 관리 카드 클릭 → 목표 달성 완료 버튼 활성화
목표/완료 날짜 구분 목표일(targetDate)과 실제 완료일(completedDate) 별도 관리
<br />
🛠️ 기술 스택
Frontend

React 18 + TypeScript

Vite

Zustand (상태 관리)

Tailwind CSS (디자인 커스터마이징)

Ant Design (UI 컴포넌트 라이브러리)

Backend / Infra

Firebase Authentication (회원가입 및 로그인)

Firebase Firestore (NoSQL 데이터베이스)

Firebase Hosting (배포 예정)

<br />
🗂️ 프로젝트 구조
bash
복사
편집
src/
├── components/      # 재사용 가능한 UI 컴포넌트
├── pages/           # 각 라우팅 별 페이지
├── store/           # Zustand 전역 상태 관리
├── services/        # Firebase API 통신 모듈
├── utils/           # 공통 유틸리티 함수
└── types/           # 타입 정의 (TypeScript)
<br />
🛠️ 핵심 문제 해결 경험
Ant Design과 Tailwind CSS 병행 사용 문제
: antd의 스타일링이 tailwind와 충돌하는 이슈가 있어, antd 기본 스타일을 초기화(reset.css)하여 Tailwind 기반 커스터마이징을 적용했습니다.

Firebase Firestore 구조 설계
: user/{userId}/books 구조로 컬렉션을 분리해 사용자별 데이터 관리를 명확히 하였고, 쿼리 효율화를 위해 날짜 기준 정렬 및 필터링 로직을 별도로 설계했습니다.

목표 날짜 vs 완료 날짜 관리
: 목표 날짜(targetDate)와 실제 완료 날짜(completedDate)를 분리 저장하여, 진행률/성취율을 더욱 정확히 분석할 수 있도록 설계했습니다.

<br />
✏️ 배운 점
상태 관리의 중요성
: Zustand를 통해 전역 로그인 상태, 페이지 전환 간 데이터 유지 관리에 대한 이해를 깊게 할 수 있었습니다.

컴포넌트 아키텍처 설계
: 기능별로 명확히 나눈 컴포넌트 트리 덕분에, 페이지별 유지보수성과 확장성을 높이는 경험을 얻었습니다.

Firebase 실전 적용 경험
: Authentication과 Firestore를 직접 연결하여 풀스택형 기능을 구현해본 경험이 쌓였습니다.

사용자 경험(UX) 최적화
: 목표 등록 → 달성 완료까지의 플로우를 짧고 직관적으로 만드는 것이 사용자 만족도를 높이는 데 중요함을 느꼈습니다.

성능 최적화와 실사용 지표 관리의 중요성
: Vercel Speed Insights를 통해 실사용자의 경험 데이터를 직접 분석하고,
Real Experience Score 100점을 달성하며 성능을 정량적으로 검증하는 경험을 했습니다.

<p align="center"> <img src="./README_img/bookarchive-res-performance.png" width="600" alt="Real Experience Score 100 - Vercel Speed Insights" /> </p>

<br />
🚀 설치 및 실행 방법
bash
복사
편집
# 저장소 클론
git clone https://github.com/본인계정/BOOKARCHIVE-2025.git

# 디렉토리 이동

cd BOOKARCHIVE-2025

# 의존성 설치

npm install

# 개발 서버 실행

npm run dev
<br />
📌 향후 업데이트 계획
책 목록 정렬 옵션 추가 (목표 날짜, 완료 여부 기준)

통계 대시보드 (읽은 책 수, 목표 달성률 시각화)

모바일 반응형 최적화

푸시 알림 기능 (목표일 리마인더)

<br />
🧡 마지막으로
BOOKARCHIVE-2025는 단순한 책 기록을 넘어
"목표를 설정하고, 완성해 나가는 즐거움"을 느낄 수 있도록 디자인된 프로젝트입니다.

작은 성취를 차곡차곡 쌓는 과정을 통해, 사용자의 성장 여정을 함께하고 싶습니다. 🚀
