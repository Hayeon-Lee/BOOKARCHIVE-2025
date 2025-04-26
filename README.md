# 📚 BOOKARCHIVE-2025

> **"기록은 곧 성장이다."**
>
> **BOOKARCHIVE-2025**는 독서 모임의 책 기록을 체계적으로 관리하고,  
> 독서 목표를 성취하는 경험을 지원하는 웹 애플리케이션입니다.

<br />

[👉 배포 링크 바로가기](https://bookarchive-2025.vercel.app/)

---

## 🎬 프로젝트 데모

![](README_img/bookarchive-2025.gif)

---

## 🔥 프로젝트 개요

- **프로젝트명**: BOOKARCHIVE-2025
- **개발 기간**: 2025.04 ~ 진행 중
- **개발 인원**: 개인 프로젝트
- **주요 기술**: React, TypeScript, Vite, Zustand, Tailwind CSS, Ant Design, Firebase

---

## 🎯 프로젝트 기획 의도

- 기존의 책 기록 서비스는 단순한 제목/리뷰 중심이었음
- 목표량 설정, 달성 체크 등 **"과정 중심의 독서 관리"**에 대한 니즈 발견
- 8인 소규모 독서모임 운영 경험을 기반으로,  
  **책 + 목표 + 멤버 현황**을 효율적으로 관리할 수 있는 플랫폼 구축

---

## ✨ 주요 기능

| 기능                | 설명                                      |
| ------------------- | ----------------------------------------- |
| 월별 보기           | 모든 멤버의 독서 현황을 달별로 확인       |
| 내 책장             | 본인의 책과 목표를 확인 및 관리           |
| 멤버별 보기         | 특정 멤버의 독서 기록만 필터링            |
| 목표 설정           | 책 추가 시 목표 분량과 목표 날짜 설정     |
| 목표 달성 관리      | 책 카드 클릭 → ‘목표 달성 완료’ 처리      |
| 목표/완료 날짜 구분 | `targetDate` vs `completedDate` 별도 저장 |

---

## 🛠️ 기술 스택

### 🖥️ Frontend

- React 18 + TypeScript
- Vite
- Zustand (상태 관리)
- Tailwind CSS (스타일 커스터마이징)
- Ant Design (UI 컴포넌트)

### ☁️ Backend / Infra

- Firebase Authentication (로그인)
- Firebase Firestore (NoSQL DB)
- Firebase Hosting (배포)

---

## 🗂️ 프로젝트 구조

```
src/
├── components/      # 재사용 UI 컴포넌트
├── pages/           # 각 화면 단위
├── store/           # Zustand 상태 관리
├── services/        # Firebase API 모듈
├── utils/           # 공통 함수
└── types/           # TypeScript 타입 정의
```

---

## ✅ 구현 완료 목록

- [x] 로그인 / 회원가입
- [x] 월별 보기 / 내 책장 / 멤버별 보기 페이지 구성
- [x] 목표 분량 및 목표 날짜 설정
- [x] 목표 달성 처리 UI 및 상태 저장
- [x] 목표일과 완료일 별도 저장 로직 구현
- [ ] 모바일 반응형 개선 (예정)
- [ ] Firebase Hosting에 완전 배포 (진행 중)

---

## ✏️ 배운 점

- **상태 관리의 중요성**  
  Zustand를 활용해 로그인 상태, 사용자별 정보 공유를 효율적으로 구현

- **컴포넌트 아키텍처 설계**  
  페이지 단위 / 역할 단위로 구조를 나눠 확장성과 유지보수성을 높임

- **Firebase 연동 경험**  
  Firestore와 Authentication을 활용해 풀스택 흐름을 직접 구현

- **UX 중심 설계**  
  목표 등록 → 달성까지의 플로우를 짧고 직관적으로 구성하여 사용자 만족도 향상

- **실사용자 중심 성능 개선**  
  Vercel Speed Insights를 통해 실사용 데이터를 기반으로 성능을 최적화  
  → Real Experience Score **100점** 달성

### 📈 성능 지표 (Vercel 기준)

![Real Experience Score](README_img/bookarchive-res-performance.png)

| 항목                      | 측정값 | 설명                    |
| ------------------------- | ------ | ----------------------- |
| First Contentful Paint    | 0.82s  | 초기 콘텐츠 렌더링 속도 |
| Largest Contentful Paint  | 0.82s  | 주요 콘텐츠 렌더링 속도 |
| Interaction to Next Paint | 80ms   | 빠른 인터랙션 응답      |
| Cumulative Layout Shift   | 0.001  | 안정적인 레이아웃 유지  |
| First Input Delay         | 5ms    | 즉각적 반응             |
| Time to First Byte        | 0.08s  | 빠른 서버 응답          |

> ✅ **Real Experience Score = 100 (Great)**  
> 75% 이상의 사용자가 우수한 성능 경험을 했음을 의미합니다.

---

## 🚀 설치 및 실행 방법

```bash
# 저장소 클론
git clone https://github.com/your-username/BOOKARCHIVE-2025.git

# 디렉토리 이동
cd BOOKARCHIVE-2025

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

---

## 📌 향후 계획

- [ ] 달성률 기반 독서 통계 대시보드
- [ ] 푸시 알림 기능 (목표일 리마인더)
- [ ] 책 정렬 (목표일 / 완료 여부 기준)
- [ ] 모바일 UI 개선

---

## 🧡 한마디

**BOOKARCHIVE-2025**는 단순히 ‘읽은 책’을 기록하는 앱이 아닙니다.  
목표를 세우고, 그 과정을 관리하며 **성취감을 주는** 경험을 제공하는 것이 핵심입니다.

이 프로젝트를 통해,  
**"프론트엔드 개발자로서 사용자 경험과 기능 구현을 함께 고려하는 개발 역량"**을 직접 보여주고자 했습니다.
