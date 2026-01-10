# SSAFY 15 Profile Website

SSAFY 15기 교육생들의 프로필을 모아둔 웹사이트입니다.
서로의 기술 스택과 관심사를 공유하고 연락처를 쉽게 찾을 수 있도록 만들었습니다.

## 🚀 프로젝트 실행 방법

이 프로젝트는 `fetch` API를 사용하여 데이터를 불러오므로, 로컬 파일(`file://`)로 직접 열면 보안 정책(CORS)으로 인해 작동하지 않습니다.

### VS Code 사용 시 (권장)
1. VS Code에서 이 프로젝트 폴더를 엽니다.
2. `Live Server` 확장 프로그램을 설치합니다.
3. `index.html` 파일 우클릭 -> **"Open with Live Server"** 선택.

---

## 🤝 프로필 등록 및 수정 가이드 (Contribution)

새로운 프로필을 등록하거나 정보를 수정하고 싶다면 **Pull Request(PR)**를 보내주세요!

### 1. 수정할 파일: `data.json`

`data.json` 파일의 배열(`[]`) 안에 본인의 정보를 아래 양식에 맞춰 추가하거나 수정합니다.
(배열의 순서는 상관없습니다. 웹사이트에서 이름순으로 자동 정렬됩니다.)

### 2. 데이터 양식 (예시)

```json
{
  "name": "홍길동",
  "profile_image": "https://api.dicebear.com/9.x/avataaars/svg?seed=홍길동",
  "contacts": {
      "github": "https://github.com/ssafy-hong",
      "email": "hong@ssafy.com",
      "blog": "https://velog.io/@hong"
  },
  "is_major": "전공",
  "tech_stack": ["Java", "Spring Boot", "MySQL"],
  "interest": "백엔드 개발, 클라우드",
  "experience": "SSAFY 1학기 우수상\n학부 연구생 6개월",
  "intro": "안녕하세요! 끊임없이 성장하는 개발자 홍길동입니다."
}
```

### 3. 필드별 상세 설명

| 필드명 | 설명 | 비고 |
| :--- | :--- | :--- |
| **name** | 본인 이름 | 필수 |
| **profile_image** | 프로필 이미지 URL | 기본값: DiceBear 아바타 링크 사용 권장 (`seed=본인이름`) |
| **contacts** | 연락처 링크 모음 | `github`, `email`, `blog`, `instagram`, `linkedin`, `website` 등 키워드 사용 시 아이콘 자동 적용 |
| **is_major** | 전공 여부 | `"전공"`, `"비전공"`, `"확인필요"` 중 택 1 (Boolean `true/false`도 가능) |
| **tech_stack** | 기술 스택 (배열) | 예: `["Python", "Django"]` |
| **interest** | 관심 분야 | 텍스트 |
| **experience** | 경력/경험 | 텍스트 (`\n`으로 줄바꿈 가능) |
| **intro** | 한 줄 소개 | 텍스트 |
| **memo** | 특이사항 | 텍스트 (예: 반장, 자치회 등) |

### 💡 프로필 이미지 설정 팁

**방법 1: 나만의 캐릭터 생성 (DiceBear API)**
별도의 이미지 파일 없이 이름만으로 고유한 캐릭터를 만들 수 있습니다.
URL의 `seed` 파라미터에 본인의 이름을 넣으면 됩니다.
- 예시: `https://api.dicebear.com/9.x/avataaars/svg?seed=홍길동`

**방법 2: GitHub 프로필 이미지 사용**
GitHub 프로필 이미지 주소를 그대로 사용해도 됩니다.
1. 본인의 GitHub 프로필 페이지 접속
2. 프사 우클릭 -> **"이미지 주소 복사"**
3. `profile_image` 필드에 붙여넣기

**방법 3: 직접 이미지 호스팅**
다른 웹사이트에 업로드된 이미지 URL을 사용해도 됩니다.
(단, 링크가 만료되지 않는지 확인해주세요.)

### 4. 주의사항
- JSON 문법을 준수해 주세요. (마지막 항목 뒤에는 콤마(`,`)를 붙이지 않습니다.)
- 이미지는 정사각형 비율을 권장합니다.

---
