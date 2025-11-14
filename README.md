## 기능 요구 사항

### 1. 환경 설정

- [x] Vite + React + TS 프로젝트 생성
- [x] 관련 라이브러리 설치
- [x] 모노 래포로 관리
  - [x] 학습 디렉토리(sandbox) 생성
- [x] `README.md` 기본 내용 작성

<br>

### 2. 학습

**R3F**

- [x] 인강 활용하여 R3F 기본 개념 학습

**Drei 공식문서**

- [x] ScrollControls
- [x] Html
- [x] shaderMaterial

Custom Shader / GLSL

- 목표: [블로그](https://tympanus.net/codrops/2024/03/21/case-study-design-embraced-portfolio-2024/)의 `curlPlane` 함수를 이해하고 사용할 수 있다.

  - `curlPlane` 소스코드

    ```c
    vec2 curlPlane(float x, float s, float r, float k, bool flip) {
    	float v1 = flip ? s*k : s - s*k;
    	float n1 = s > 0.0 ? 1.0 : -1.0;

    	// Threshold before going into the circle coords, because
    	// if r is 0, it will return infinity, and causes a short
    	// flicker, so we prevent that by setting a small
    	// non-noticable threshold
    	float t1 = 0.01;

    	// Start and endpoints of the plane before or after the curl
    	float e1 = flip ? n1*v1 : n1*x;
    	float e2 = flip ? n1*x : n1*v1;

    	// Some older gpus have troubles with "logical or operators"
    	// in the shader so we split it into two conditions instead.
    	// More on that later in the article
    	if (r <= t1) {
    		return vec2(x, 0.0);
    	}

    	if (e1 <= e2) {
    		return vec2(x, 0.0);
    	}

    	float r2 = abs(s) / r;
    	float hp = 1.5707963;

    	// Transform the point on the plane to the point
    	// on the new arc connected to the plane
    	return vec2(
    	  v1/r2 + cos(x/r2 - hp - v1/r2),
    	  -sin(x/r2 + hp - v1/r2) + 1.0
    	) * r2;
    }
    ```

- [x] vertex shader
- [x] r3f-shader 연결
  - [x] uniforms
  - [ ] attributes
- [x] GLSL 핵심 문법 (코드 이해용)

<br>

### **3. 인터랙션 구현**

**`스크롤`**

- 래퍼런스 이미지
  ![스크린샷 2025-10-05 오전 12.31.35 1.png](attachment:cd3bd62e-8768-42fe-a9a6-e232ae6526b8:스크린샷_2025-10-05_오전_12.31.35_1.png)
  ![스크린샷 2025-11-07 오후 3.47.00.png](attachment:422212b3-1131-4f67-96ca-6d7708c26274:스크린샷_2025-11-07_오후_3.47.00.png)
- [x] 스크롤했을 때 이미지가 한 장씩 넘어간다.
  - [x] 반시계 방향을 그리며 넘어간다.
    - [ ] 옆의 글씨도 함께 넘어간다.
  - [x] 다음 이미지는 화면 중앙에 배치된다.
  - [x] 순환 스크롤
        마지막 이미지의 다음 이미지는 첫 번째 이미지이다.
- [x] 스크롤 스냅
      이미지가 화면 중앙의 일정 범위 내로 들어오면
      이미지가 자동으로 정중앙으로 맞춰진다.

**`종이처럼 접히는`**

- 래퍼런스 이미지
  ![스크린샷 2025-10-05 오전 12.31.35 1.png](attachment:cd3bd62e-8768-42fe-a9a6-e232ae6526b8:스크린샷_2025-10-05_오전_12.31.35_1.png)
- [x] 스크롤 정도에 따라 이미지가 종이처럼 접힌다.
  - [x] 넘어갈 이미지는 아래서부터 접힌다.
  - [x] 다음으로 넘어올 이미지는 (접힌 상태에서) 위에서부터 펴진다.

**원본 인터랙션과 유사하게 느낌 살리기!**

- [x] 원을 조금 더 작게 그리면서 넘어오기
- [x] 원근법에 따라 접힌 부분이 (사다리꼴 형태로) 더 넓게 보이도록하여 현실감 부여

**`인디케이터`**

- 래퍼런스 이미지
  ![스크린샷 2025-11-07 오후 3.47.31.png](attachment:5edb103e-598d-4712-99b2-428f9130eae7:스크린샷_2025-11-07_오후_3.47.31.png)
- [ ] 이미지가 넘어간 개수에 따라 우측 인디케이터로 표시된다.
      원형을 그리며 아이템 개수 대비 진행도를 표시한다

**`호버`**

- 래퍼런스 이미지
  ![스크린샷 2025-11-07 오후 3.40.30.png](attachment:6c090219-74ba-446e-bb6f-b7ffec3357e7:스크린샷_2025-11-07_오후_3.40.30.png)
- [ ] 호버된 부분이 볼록해진다.

<br>

### 4. 쇼케이스 구현

- [ ] Phase 2에서 구현한 핵심 인터랙션을 명확히 보여줄 수 있는 단일 페이지 구성한다.
- [x] 데모 버전을 보여줄 수 있도록 배포한다.
- [ ] `README.md`에 최종 결과물 GIF 또는 스크린샷, 실행 방법 업데이트한다.
- [ ] 노션에 2주간의 학습/삽질 기록 최종 정리한다.
