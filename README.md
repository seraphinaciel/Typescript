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

TS를 JS로 컴파일 할 때 여러가지 설정들을 할 수 있는데 해당 설정들을 가능케 하는 파일

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
  [target](https://www.typescriptlang.org/tsconfig#target)

`"target": "ES6"`

## lib

[lib](https://www.typescriptlang.org/tsconfig#lib)

- js 코드가 실행될 환경을 지정
- [DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM) 속성을 추가하게 되면 DOM과 관련된 API 타입들을 자동 완성
  - ts는 document가 지닌 모든 이벤트와 메소드를 알려줌
  - document.querySelector(), localStorage.getItem(),window.Array
- 합쳐진 라이브러리 정의 파일(declaration files)을 특정해준다
- 브라우저 api를 알고 있당

`"lib": ["ES6", "DOM"]` : es6를 지원하는 서버와 dom(브라우저 환경)에서 코드 실행시킬 거다

# Declaration Files(유형 정의 파일)

- [JSDoc은 주석](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html)을 이용하여 자바스크립트 파일에 타입에 대한 정보를 제공 (TS에 JS 코드 유형을 설명하는 주석이 포함된 TS 파일)
  - 라이브러리, 패키지 등은 js로 만들어져 있으니 타입을 정의해준다.
  - ex. localStorage의 타입(옵션과 모양)을 설명해준다.
- `파일명.d.ts`

[JSDoc을 사용하는 방법](https://jsdoc.app/about-getting-started.html)

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

# 동일한 프로젝트에서 Typescript + Javascript를 사용

- js에서 ts로 마이그레이션(이전)하는 경우가 대다수
  tsconfig.json에 `"allowJs": true` 추가

- js 코드가 엄청 많을 때, 부분적으로만 ts로 바꾸고 싶을 때
  [@ts-check](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check) : TS에게 JS 파일을 확인하라고 지시, 자바스크립트에서 오류를 활성화. 해당 기능을 원치 않으실 경우 끌 수도 있다.

  - ts가 제공하는 보호장치는 사용하고 싶다 -> JSDoc `/**`만 치면 자동완성으로 나옴!(모든 JS 파일에서 JSDoc을 사용 가능)

완성작

```js
// myPackage.js
//@ts-check
/**
 * Initializes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */
export function init(config) {
  return true;
}

/**
 * Exits the program
 * @param {number} code
 * @returns {number}
 */
export function exit(code) {
  return code + 1;
}
```
