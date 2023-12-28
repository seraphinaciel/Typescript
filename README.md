```bash
# package.json 초기화
npm init -y

# typescript설치
# -D를 입력하면 ts가 devDependencies에 설치됨
npm i -D typescript

# tsconfig.json 파일 만들기
code tsconfig.json
```

# tsconfig.json 설정

## include 속성

- 컴파일할 코드를 찾을 위치를 TS에 알려줌.

## outDir

`"outDir": "build"`

- TS에게 출력 코드를 어디에 넣을지 알려줌.
- 낮은 버전의 js로 컴파일 함(var) : 호환성이 좋으니께

```json
// package.json
"scripts": {
  "build": "tsc"
},
```

## target

- 컴파일할 JS 버전을 지정

`"target": "ES6"`

## lib

- 코드가 실행될 환경을 지정
- js API의 자동완성 기능 제공
  - ts는 document가 지닌 모든 이벤트와 메소드를 알려줌
  - document.querySelector(), localStorage.getItem(),window.Array
- 합쳐진 라이브러리 정의 파일(declaration files)을 특정해준다
- 브라우저 api를 알고 있당

`"lib": ["ES6", "DOM"]` : es6를 지원하는 서버와 dom(브라우저 환경)에서 코드 실행시킬 거다

# Declaration Files(유형 정의 파일)

- TS에 JS 코드 유형을 설명하는 주석이 포함된 TS 파일
  - 라이브러리, 패키지 등은 js로 만들어져 있으니 타입을 정의해준다.
  - ex. localStorage의 타입(옵션과 모양)을 설명해준다.
- `파일명.d.ts`

myPackage를 node의 모듈인것처럼 사용

```js
// myPackage.js
export function init(config) {
  return true;
}

export function exit(code) {
  return code + 1;
}
// myPackage.d.ts
// myPackage.js의 유형을 설명
interface Config {
  url: String;
}

declare module "myPackage" {
  function init(config: Config): Boolean;
  function exit(config: number): number;
}


// index.ts
import { init, exit } from "myPackage";
init({
  url: "true",
});

exit(1);
```

# 동일한 프로젝트에서 Typescript와 Javascript를 사용할 수 있나요?

- js에서 ts로 마이그레이션(이전)하는 경우가 대다수

`"allowJs": true`
질문 7/8
//@ts-check는 무엇을 합니까?

TS에게 JS 파일을 확인하라고 지시합니다.
TS에 JS 파일 확인을 입력하지 말라고 지시합니다.

질문 8/8
모든 JS 파일에서 JSDoc을 사용할 수 있나요?

예
아니요

#

```

```
