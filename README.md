# 🛒 Pickit (개인 프로젝트, 진행 중)

## 🚀 프로젝트 개요

포트폴리오 용도로 진행한 **백엔드 중심 쇼핑몰 프로젝트**입니다.  
실무에서 자주 사용되는 기능을 직접 구현하며 **Spring Boot, JWT 인증, Redis, JPA** 기반 구조를 경험했습니다.

- 주요 목표: 인증/권한 관리, 이메일 인증, 판매자 상품 관리, 일반 사용자 상품 조회 구현

---

## 🛠 기술 스택

### Backend

- Java 17, Spring Boot
- Spring Data JPA, MySQL
- Redis (이메일 인증/토큰 관리)
- JWT (인증/인가)
- Gradle

### Frontend

- React
- Redux
- Axios

### Infra & Tools

- GitHub, Swagger, Postman
- ERD 설계, REST API 문서화

---

## 🔑 구현 기능

### 1. 회원가입/로그인

- JWT 인증 기반 로그인/로그아웃
- 이메일 인증 + Redis TTL 적용
- 역할 기반 권한(Role: 일반, 판매자) 분리

### 2. 판매자 기능

- 판매자 회원가입
- 상품 등록/수정/삭제 (이미지 포함)
- 재고 관리

### 3. 일반 사용자 기능

- 전체 상품 조회, 카테고리별 조회
- 검색/필터링/정렬 기능
- 페이지네이션

---

## 📂 프로젝트 구조

```bash
pickit/
 ┣ backend/pickit
 ┃ ┣ src/main/java/com/pickit/
 ┃ ┃ ┣ cart/
 ┃ ┃ ┣ config/
 ┃ ┃ ┣ global/      # 예외 처리, JWT 인증/인가
 ┃ ┃ ┣ order/
 ┃ ┃ ┣ product/     # 상품 관련 API
 ┃ ┃ ┣ user/        # 회원가입, 로그인, 이메일 인증
 ┃ ┃ ┣ seller/      # 판매자 전용 기능
 ┃ ┃ ┗ global/
 ┣ frontend/
 ┃ ┣ src/           # React 컴포넌트, API 연동
 ┃ ┃ ┣ assets/
 ┃ ┃ ┣ components/
 ┃ ┃ ┣ pages/
 ┃ ┃ ┣ schemas/
 ┃ ┃ ┣ services/
 ┃ ┃ ┣ store/
 ┗ ┗ ┗ styles/
```

---

## 📑 ERD

![ERD](docs/erd.png)

---

## 🎨 와이어프레임

- Figma를 활용하여 사용자/판매자 중심의 주요 화면을 설계했습니다.

<table>
  <tr>
    <td><img src="docs/wireframe1.png" width="250"/></td>
    <td><img src="docs/wireframe2.png" width="250"/></td>
  </tr>
  <tr>
    <td><img src="docs/wireframe3.png" width="250"/></td>
    <td><img src="docs/wireframe4.png" width="250"/></td>
  </tr>
</table>

---

## 📑 기능 명세서

- Notion을 통해 서비스의 기능 요구사항을 정의하고 우선순위를 분류했습니다.

**주요 기능 요약**

- **회원가입/로그인**: 일반 사용자 / 판매자 구분
- **상품 관리**: 판매자 권한 기반 CRUD
- **주문 관리**: 장바구니, 결제, 주문 상태 조회
- **관리자 기능**: 판매자 승인 및 모니터링

![기능 명세 캡처](docs/feature_spec.png)

---

## 📖 API 명세

- API 설계는 Notion에서 정리했고, Swagger를 활용해 자동 문서화를 진행했습니다.

**Swagger 문서 예시**

- 회원가입 / 로그인 API
- 상품 등록 / 조회 API

![Swagger 캡처](docs/swagger_signup.png)

---

## 📌 현재 진행 상황

- ✅ 회원가입/로그인 기능
- ✅ 이메일 인증 (Redis 기반 코드 관리)
- ✅ JWT 인증/인가
- ✅ 판매자 전용 상품 관리 API
- ✅ 일반 사용자 상품 조회 API
- ⬜ 장바구니/주문 API 개발
- ⬜ 결제 관련 API 개발
- ⬜ 프론트엔드 UI 개발 및 API 연동
- ⬜ 배포 (AWS 예정)

---

## 📎 참고 자료

- [🔗와이어프레임 (Figma)](https://www.figma.com/design/fdgL72jU3f2m6CLIqoYq1v/Pick-it?m=auto&t=f7avU7sGKWfkmELj-6)
- [🔗기능 명세서 (Notion)](https://yujin19.notion.site/bd24d87996a04b3c801517d976cc9e68?pvs=73)
- [🔗API 문서 (Notion)](https://yujin19.notion.site/API-151079bd63e78084ae77de3772a33f7c?pvs=73)

---

## 🔜 진행 예정

- 프론트엔드 Axios 연동 후 배포
- UI 완성 및 배포 예정
- 지속적 기능 개선 및 코드 리팩토링

---

## 👤 개발자

- **이름**: 조유진
- **역할**: Fullstack Developer
- **GitHub**: [Pickit](https://github.com/YujinJo19/pickit)
