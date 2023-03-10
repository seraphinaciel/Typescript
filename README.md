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

last(arr) 함수

    last(arr) 함수는 배열 내 마지막 값을 반환해주는 함수입니다. 여기서 파라미터인 arr은 배열이기 때문에 이 부분에 유의해서 타입을 먼저 선언해보겠습니다.
    Last라는 이름의 제네릭 타입을 선언하겠습니다. 이 Last라는 타입은 last(arr) 함수에 대한 타입이기 때문에 type 또한 함수형으로 만들었습니다.
    여기서 파라미터는 배열입니다. 따라서, items에 해당하는 타입은 T[] 형식의 배열꼴로 만들었습니다. 그리고 반환값은 하나의 값이 되므로 T만 적습니다. 여기서 T의 이름은 Type의 앞 글자만 딴 것이므로 T가 아닌 다른 글자를 넣어도 상관은 없습니다만 모두 통일시켜야 합니다 → 공식 문서 확인

        type Last = <T>(items: T[]) => T;

    이후 last()라는 익명 함수를 생성하였고, 우리가 만들어준 Last라는 타입을 붙여주었습니다.
    자바스크립트에서 배열의 마지막 요소를 알아내기 위해 length라는 프로퍼티를 써서 마지막 값을 알아냅니다. 자바스크립트에서 배열은 맨 첫번째 인덱스가 0에서 시작하므로, 전체 길이에서 1을 뺀 [items.length - 1]이 배열의 마지막 인덱스가 됩니다.

prepend(arr, item): 이 함수는 배열의 시작 부분에 item을 넣고 return해야 합니다.

```javascript
type SuperPrint2 = <T, M>(arr: T[], item?: M) => T | M;
const prepend: SuperPrint2 = (arr, item) => (arr[0] = item);
const b = prepend([1, 2, 3, 4], "banana");

console.log(b);
```

    prepend(arr, item) 함수는 배열 arr에 새로운 아이템(item)을 맨 앞에 넣은 후 그렇게 만들어진 새로운 배열을 반환하는 함수였습니다.
    이번에는 Prepend라는 이름의 제네릭 타입을 선언해주겠습니다. 이 또한 함수에 들어가는 타입이므로 함수형 꼴로 만들었습니다.
    파라미터는 배열 하나와 값 하나 이렇게 총 2개가 들어갑니다. 따라서, 두개의 파라미터 타입으로 각각 T[]와 T로 부여했습니다. 반환값은 배열이어야 하므로 T[]로 붙여줬습니다.

        type Prepend = <T>(items: T[], item: T) => T[];

    전개 구문(Spread Operator)을 이용하여 맨 앞의 아이템과 기존 배열에 있던 아이템을 새로운 배열에 담아줍니다.

        예를 들어, 만일 기존 배열이 const items = [1, 2, 3, 4, 5]였다면 [...items]는 안에 있는 숫자들만 밖으로 뺀 1, 2, 3, 4, 5가 되고, 이걸 다시 새로 추가한 item의 값을 맨 앞에 붙여서 ([item, …items]) 하나의 배열로 묶어 새로운 배열로 만든 것입니다.

// class

```javascript

abstract class User{
    constructor(
    private firstName:string,
    private lastName:string,
    public nickName:string,
  ){}
  getFullName(){
    return `${this.firstName} ${this.lastName}`;
  }
}

class Player extends User{

}
const alice=new Player("alice","apple", "a");

alice.getFullName()

```

abstract

- 다른 곳에서만 상속 받을 수 있는 클래스, 직접적인 인스턴스 생성 불가
- 추상클래스 안에서는 추상 메소드 구현, 대신에 메소드의 콜 시그니처만 만든다.
- 메소드를 구현한다면 상속받는 클래스는 메소드 호출이 가능

추상 메소드:

| 구분      | 선언한 클래스 내 | 상속받은 클래스 내     | 인스턴스 |
| --------- | ---------------- | ---------------------- | -------- |
| public    | 　　　 ⭕ 　 　  | 　　　　　 ⭕ 　　　　 | 　 ⭕    |
| private   | 　　　 ⭕ 　 　  | 　　　　　 ❌ 　　　　 | 　 ❌    |
| protected | 　　　 ⭕ 　 　  | 　　　　　 ⭕ 　　　　 | 　 ❌    |

- public: 모든 클래스에서 접근 가능
- private: 해당 클래스 내에서만 접근 가능 (자식 클래스에서도 접근 불가)
- protected: 해당 클래스와 자식 클래스에서 접근 가능

타입스크립트의 클래스를 이용하여 Dict (딕셔너리. dictionary) 클래스를 만드세요. Dict 클래스는 아래와 같은 메소드들을 갖고 있어야 합니다.

- add: 단어를 추가함
- get: 단어의 정의를 반환함
- delete: 단어를 삭제함
- update: 단어를 업데이트 함
- showAll: 딕셔너리의 단어를 모두 프린트함
- count: 딕셔너리 단어들의 총 수를 반환함

> 자바스크립트에서 클래스를 만들기 위해서는 클래스 내부에 반드시 constructor() 생성자 함수를 정의해야 하고 그 내부에 필요한 변수들을 정의해야 합니다. 예제는 다음을 참고해보세요. 또한, 생성자 함수 내부의 변수를 위한 타입도 따로 만들어야 합니다. <br>변수들은 public, private 혹은 protected로 접근 제한자를 설정할 수 있습니다. 어떻게 사용하는 것이 좋을지 고민을 해보시기 바랍니다. <br>add 메소드는 먼저 배열 안에 해당 원소가 있는지 먼저 판별 후 없다면 해당 단어와 정의를 함께 추가하는 로직을 세워보세요. 객체 속성에 접근하는 방법도 함께 참조해보세요.<br>get 메소드는 단어의 정의를 return해야 합니다.<br>delete 메소드는 단어를 삭제시킵니다. delete 연산자를 이용해세요.<br>update 메소드는 단어를 업데이트 해야 합니다. 업데이트 하려면 제일 먼저 무엇을 해야 할까요? (add 메소드 참고)<br>showAll 메소드는 모든 단어들을 프린트하면 됩니다. 단어: 정의 형태로 객체에 담긴다면 단어들을 어떻게 빼올 수 있을까요? 그리고 그 빼온 단어들을 어떻게 하나씩 출력시킬 수 있을까요? Object.keys() 메소드와 forEach() 메소드를 참조해주세요.<br>count 메소드는 딕셔너리의 총 수를 반환해야 합니다. length를 한 번 이용해보세요.<br>모든 메소드는 적절하게 파라미터를 집어 넣고 각각의 파라미터에 올바른 타입을 집어넣어야 합니다.

```javascript
type Words={
    [key:string]:string
}

class Dict{
    private words:Words
    constructor(){
        this.words={}
    }
    add(word:Word){
        if(this.words[word.term] === undefined){
            this.words[word.term] = word.meaning;
        }
    }
    get(term: string) {
        return this.words[term]
    }
    update(word: Word) {
        if (this.words[word.term] !== undefined) {
            this.words[word.term] = word.meaning;
        }
    }
    del(term: string) {
        if (this.words[term] !== undefined) {
            delete this.words[term];
        }
    }
    showAll() {
        Object.keys(this.words).forEach(e => {
            console.log(e)
        })
    }
    count() {
        const dicCount = Object.keys(this.words).length
        console.log(dicCount)
        return dicCount
    }

}

class Word{
    constructor(
        public term:string,
        public meaning:string,
    ){}
}

const kimchi=new Word("Kimchi", "한국의 음식")
const dict = new Dict()
dict.add(kimchi);

const newKimchi = new Word("Kimchi", "소금에 절인 배추에 고춧가루, 마늘, 생강, 젓갈, 파 등을 섞어 만든 김치소를 버무려 만든 한국의 전통 음식")
dict.update(newKimchi);

const tteok = new Word("Tteok", "곡식가루 특히 쌀가루를 시루에 찌거나 삶아 만든 음식물")
dict.add(tteok);

dict.showAll();
dict.count();
```
