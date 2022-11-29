## HOW TO CHECK

루트 디렉토리를 기준으로 다음을 순차적으로 입력해주세요.

### 현재 과제 디렉토리로 이동

```bash
cd JavaScript
cd 07주차
cd assignment
cd 재영
```

### 커맨드 실행

```bash
npm test
```

`pnpm`을 쓰신다면 `pnpm`으로 테스트 가능합니다.
```bash
pnpm test
```

`yarn`을 쓰신다면 `yarn`으로 테스트 가능합니다.
```bash
yarn test
```

### 테스트 코드 작성

`test.js`에서 테스트가 가능합니다.

#### 작성 방법

`expect`가 같은 것임을 확인하는 함수라면, `describe`는 일련의 `expect`를 단위로 묶어주는 grouping을 위한 함수입니다.

`describe`에 첫 번째 인자는 `"테스트 그룹명"`을, 두 번째 인자에는 `expect들의 배열`을 넣어주세요.