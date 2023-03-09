# Typescript

javascript 기반으로 javascript의 여러 문제를 해결하고 보완하기 위해 MicroSoft에서 만든 언어.

## 왜 만들어졌을까?

### JavaScript

**타입 안정성이 좋지 않은 언어** : 변수 타입을 지정하지 않아도 되는 유연성 좋은 언어. 타 언어에서는 허용되지 않는 것도 혀용해 주며 에러를 보여주지 않는다.

> ex) `[1, 2, 3, 4] + false` : 배열 + 불리언 코드를 입력하면 배열이 사라지고 string으로 출력됨 <br><br> `["안녕하세요"]+{hi:1}` : 얘도 실행됨 <br><br> 함수의 인자가 잘못 들어가도 실행됨.

### TypeScript

> storngly typed programing language

**타입 안정성이 좋은 언어** : 코드에 버그, 런타임(코드 실행 중 발생하는) 오류가 줄어들고 생성성이 좋아진다.

- TS 코드가 JS로 컴파일 됨

- TS코드에 에러가 감지되면 JS로 컴파일 되지 않음(**컴파일 추론**) : 개발자 실수를 줄여줌

- 변수의 유형을 추론할 수 있으니 매번 유형을 지정하지 않아도 된다(가능한 알아서 추론하게 해주는 것도 좋다)

### 변수 설정

```javascript
const x: string = "안녕하세요";
const a: number[] = [1, 2];
// 함수가 문자열 배열을 반환하는 구문
function stringBox(): string[]

type Age = number;
type Name = string;

// Type Aliases(별칭) : 유형의 새 이름을 만듦, 객체 타입뿐만 아니라 모든 타입에 이름을 지정
// type 로 변수 선언하듯 지정해 '타입'처럼 사용, 과하게 재사용 하지 않는다.
type Player = {
  name: Name, // 필수 항목
  age?: Age, //age는 number 또는 undefiened, 선택사항
};

const playerA: Player = {name: "alice"};
const playerB: Player = {name: "patty", age: 12};

// 메이커 만들기
function playerMaker(name: string): Player {
  return {name: name};
}
// 화살표 함수는 이렇게 사용
// const playerMaker = (name: string): Player => ({name});

const alice = playerMaker("alice");
alice.age = 12;

```

### Type 알아보기

```javascript
// readonly : JS에서 컴파일 되지 않는다. TS에서는 불변성을 보장받는다.
const numbers: readonly number[]=[1,2,3,4];
numbers.push(1);

// Tuple : 최소값으로 배열, 길이 및 유형 위치
const player: [string, number, boolean] = ["betty", 1, true];
player[0]=1; // error

// 바꿀 수 없음
const player2: readonly [string, number, boolean] = ["betty", 1, true];

// any : TS에서 빠져나올 때(모두 비활성) 씀. 아무 타입이나 가능해서 웬만해서 사용하지 않음
const c: any[]=[1,2,3,4];
const d:any=true;
c+d

// unknown : 변수의 타입을 먼저 확인 후 사용
let a : unknown;
if(typeof a === 'number'){
  let b = a+1
}
if(typeof a === "strong"){
  let b = a.toUpperCase();
}
// void 아무것도 반환하지 않는다.
// never 코드 경로를 실행해서는 안 되는 경우
function hello():never{
  throw new Error("xxx")
}
```

### Call signature(호출 서명)

- 함수의 인수 및 반환 값의 유형.
- 함수 구현이 없다.
- Javascript로 컴파일되지 않는다.
- 여러 함수에 동일한 호출 서명을 사용할 수 있다.
- 함수에 여러 호출 서명이 있는 경우 과부화가 발생.

```javascript
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b;
```

### Overloading

- 함수가 서로 다른 여러개의 호출 서명을 가지고 있을 때 발생
- 함수가 다른 인수 유형을 수락해야 하는 경우 사용

```javascript
type Add = {
  (a: number, b: number) : number
  (a: number, b: string) : number
};
const add: Add = (a, b) => {
  if(typeof b ==="string") return a
  return a+b
};
```

다형성
여러개의 도형
Generic

- 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 하는 기법
- placehoder를 사용해서 작성한 코드의 타입 기준으로 바꿔줌, 요청만 하면 콜 시그니처를 생성할 수 있다.
- 일반 자바스크립트처럼 자동 타입 할당이 되고 소스 작성 과정중에 타입스크립이 해당 변수가 number타입인걸 알게되고 touppercase같이 스트링 전용 function이 사용이 불가능하다. 에러가 뜨게되서 런타임 과정중에 에러가 나지 않도록 막아준다.
- 구체적인 타입을 지정하지 않고 다양한 인수와 리턴 값에 대한 타입을 처리할 수 있다.
- 타입스크립트에서 제네릭을 통해 인터페이스, 함수 등의 재사용성을 높일 수 있습니다.

```javascript
type SuperPrint = {
  <TypePlaceholder>(arr: TypePlaceholder[]): TypePlaceholder,
};

const superPrint: SuperPrint = (arr) => arr[0];

const a = superPrint([1, 2, 3, 4]);
const b = superPrint([true, false, true]);
const c = superPrint(["a", "b", "c"]);
const d = superPrint([1, 2, true, false, "c"]);

// 제네릭의 순서를 기반으로 제네릭의 타입을 알게 된다.
type SuperPrint2 = <T, M>(arr: T[], bet: M) => T;
const superPrint2: SuperPrint2 = (arr) => arr[0];
const a2 = superPrint2([1, 2, 3, 4], "x");
const b2 = superPrint([true, false, true], 1);
const c2 = superPrint(["a", "b", "c"], false);
const d2 = superPrint([1, 2, true, false, "c"], []);

// Conclusions
function superPrint3<V>(a: V[]) {
  return a[0];
}
const a3 = superPrint2<number>([1, 2, 3, 4]); //굳이 타입을 안적어도 됨
const b3 = superPrint([true, false, true]);
const c3 = superPrint(["a", "b", "c"]);
const d3 = superPrint([1, 2, true, false, "c"]);

type Player<E>={
  name:string
  extraInfo:E
}
type aliceExtra={
  favFood:string
}
type alicePlayer=Player<{favFood:string}>

const alice:AlicePlayer={
  name:"alice",
  extraInfo:{
    favFood:"banana"
  }
}
const betty:BettyPlayer<null>={
  name:"betty",
  extraInfo:{
    favFood:"apple"
  }
}


type A=Array<number>
let a:A=[1,2,3,4]
```

현재까지 배운 것을 토대로, 두 함수에 대한 구현과 함께 호출 시그니처(call signatures) 를 작성해주세요

last(arr): 이 함수는 배열의 마지막 요소를 반환해야 합니다.

```javascript
type SuperPrint1 = <T>(arr: T[]) => T;
const last: SuperPrint1 = (arr) => arr[arr.length - 1];
const a = last([1, 2, 3, "apple"]);

console.log(a);
```

prepend(arr, item): 이 함수는 배열의 시작 부분에 item을 넣고 return해야 합니다.

```javascript
type SuperPrint2 = <T, M>(arr: T[], item?: M) => T | M;
const prepend: SuperPrint2 = (arr, item) => (arr[0] = item);
const b = prepend([1, 2, 3, 4], "banana");

console.log(b);
```
