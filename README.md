# Typescript 왜 만들어졌을까?

### JavaScript

**타입 안정성이 좋지 않은 언어** : 변수 타입을 지정하지 않아도 되는 유연성 좋은 언어. 타 언어에서는 허용되지 않는 것도 혀용해 주며 에러를 보여주지 않는다.

> ex) `[1, 2, 3, 4] + false` : 배열 + 불리언 코드를 입력하면 배열이 사라지고 string으로 출력됨 <br><br> `["안녕하세요"]+{hi:1}` : 얘도 실행됨 <br><br> 함수의 인자가 잘못 들어가도 실행됨.

### TypeScript

- javascript 기반으로 javascript의 여러 문제를 해결하고 보완하기 위해 MicroSoft에서 만든 언어.
- storngly typed programing language
- **타입 안정성이 좋은 언어** : 코드에 버그, 런타임(코드가 실행되는 동안 발생하는 오류) 오류가 줄어들고 생성성이 좋아진다.
- TS 코드가 JS로 컴파일 됨
- TS코드에 에러가 감지되면 JS로 컴파일 되지 않음(**컴파일 추론**) : 개발자 실수를 줄여줌
- 변수의 유형을 추론할 수 있으니 **매번 유형을 지정하지 않아도 된다**(가능한 알아서 추론하게 해주는 것도 좋다)

```ts
// 유효한 코드!
const kimchi = {
    맛있어: true
}
```
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
  age?: Age, //age는 number|undefiened, 선택사항
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

// any : TS에서 빠져나올 때, 탈출할 때(모두 비활성) 씀. 아무 타입이나 가능해서 웬만해서 사용하지 않음
const c: any[]=[1,2,3,4];
const d:any=true;
c+d

// unknown : 변수의 타입(typeof)을 먼저 확인 후 사용
let a : unknown;
if(typeof a === 'number'){
  let b = a+1
}
if(typeof a === "strong"){
  let b = a.toUpperCase();
}
// void : 함수가 아무것도 반환하지 않는다.
// never : 코드 경로가 실행되어서는 안 되는 경우
function hello():never{
  throw new Error("xxx")
}
```

### Call signature(호출 서명)

- 함수의 인수의 유형과 함수의 반환 값.
- 기능 구현이 없다.
- Javascript로 컴파일되지 않는다.
- 여러 함수에 동일한 호출 서명을 사용할 수 있다.
- 함수에 여러 호출 서명이 있는 경우 과부화가 발생.

```javascript
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b;
```

### Overloading

- 함수가 서로 다른 여러 호출 서명이 있는 경우 발생
- 함수가 다른 인수 유형을 허용해야 하는 경우 사용

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

<!--
정답
```javascript
type Word = {
  term:string;
  definition:string;
}

type Words = {
  [key: string]: string;
};

/*
const words = {
  "단어" -> string:
  `뜻` ->string
} */
class Dict {
  private words: Words;
  constructor() {
    this.words = {};
  }
  add(term: string, definition: string) {
    if (!this.get(term)) {
      this.words[term] = definition;
    }
  }
  get(term: string) {
    return this.words[term];
  }
  delete(term: string) {
    delete this.words[term];
  }
  update(term: string, newDef: string) {
    if (this.get(term)) {
      this.words[term] = newDef;
    }
  }
  showAll() {
    let output = "\n--- Dictionary Content ---\n"
    Object.keys(this.words).forEach((term) =>
      output += `${term}: ${this.words[term]}\n`
    );
    output += "--- End of Dictionary ---\n"
    console.log(output);
  }
  count() {
    return Object.keys(this.words).length;
  }
  upsert(term:string, definition:string){
    if(this.get(term)){
      this.update(term, definition);
    } else {
      this.add(term, definition);
    }
  }
  exists(term:string){
    return this.get(term) ? true : false;
  }
  bulkAdd(words: Word[]){
    words.forEach(word => this.add(word.term, word.definition))
  }
  bulkDelete(terms: string[]){
    terms.forEach(term => this.delete(term));
  }
}

const dictionary = new Dict();

const KIMCHI = "김치"


// Add
dictionary.add(KIMCHI, "밋있는 한국 음식");
dictionary.showAll();

// Count
console.log(dictionary.count());

// Update
dictionary.update(KIMCHI, "밋있는 한국 음식!!!");
console.log(dictionary.get(KIMCHI));

// Delete
dictionary.delete(KIMCHI);
console.log(dictionary.count());

// Upsert
dictionary.upsert(KIMCHI, "밋있는 한국 음식!!!");
console.log(dictionary.get(KIMCHI))
dictionary.upsert(KIMCHI, "진짜 밋있는 한국 음식!!!");
console.log(dictionary.get(KIMCHI))

// Exists
console.log(dictionary.exists(KIMCHI))

// Bulk Add
dictionary.bulkAdd([{term:"A", definition:"B"}, {term:"X", definition:"Y"}]);
dictionary.showAll();

// Bulk Delete
dictionary.bulkDelete(["A", "X"])
dictionary.showAll();
```

### 변수 타입 생성 및 constructor() 생성자 메소드 정의

-Dict라는 이름의 클래스를 생성하시기 전에 제일 먼저 Dict 클래스에 들어갈 단어들 (여기서는 words라고 정했습니다) 객체에 대한 타입을 설정해주셔야 합니다. -여기서 words 객체에 들어갈 타입을 Words라는 이름으로 지정해주었고, 인덱스 서명이라는 것을 통해 words 객체에 어떤 식으로 들어가는지 지정해주었습니다. -여기서 key는 들어갈 단어를 의미하고 string 타입으로 지정하였습니다. 그리고 해당 단어에 대한 정의 또한 string으로 지정하였습니다.
-words 객체는 함부로 바뀌면 안 되므로 외부 그 어디서든 접근을 못 하게끔 하는 것이 좋을 것 같습니다. 따라서 접근 제한자를 private을 사용하였습니다. -자바스크립트 (혹은 타입스크립트)에서 클래스를 정의하기 위해서는 constructor() 생성자 메소드를 반드시 정의해야 합니다. 클래스 내부에서 words라는 객체에 접근할 수 있도록 this 연산자를 이용하여 빈 객체를 할당해주었습니다. 이것이 단어가 들어갈 우리의 딕셔너리인 것입니다.

### 메소드 정의

-add메소드는 제일 먼저 해당 딕셔너리에 똑같은 단어가 있는지 알아봐야 합니다. add의 경우 없는 경우에만 단어를 추가할 수 있으므로 if문에 ! 연산자를 써서 없는지 체크 후 없다면 파라미터로 제공한 term을 key로 전달 후 파라미터로 전달한 definition을 값으로 대입합니다.
-get 메소드는 해당 단어만 반환만 하면 됩니다. 그렇기에 단순히 this.words[term]으로 값을 접근한 후 그것을 return 해주었습니다.
-delete 메소드는 해당 단어를 삭제해야 합니다. delete 연산자를 이용하면 해당 객체 요소를 삭제할 수 있습니다.
-update 메소드는 해당 단어를 새 정의로 업데이트 해야 합니다. add 메소드 로직과 동일합니다.
-showAll() 메소드가 좀 복잡했을텐데요... -먼저 Object.keys()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)를 이용하여 words 객체 안의 모든 키값들을 배열 형태로 가져옵니다.
-->

### Type Aliases

```ts
type Person = {
  name: string;
  age: number;
};
```
- 모든(any) 타입에 이름을 부여
- 새로운 속성을 추가할 수 없다 : *확장 불가능*하다
  - 타입의 속성들이 추후에 추가될 수도 있다면, 개발자들은 타입이 변할 수도 있다는 생각을 하면서 개발을 해야함. 
    
### Interfaces

```ts
interface Person = {
	name: string;
	age: number;
}
interface Person extends
```
- 오직 객체 타입에만 이름을 부여
- 기존에 선언된 타입을 확장해서 다른 속성을 추가로 선언 : *확장 가능*하다(선언 병합, Declaration merging)
  - 라이브러리를 사용하는 상황에서 추가적으로 타입의 속성들을 선언할 때 유용하다.

### object에 대한 타입을 선언하는 데 type alias와 interface 중에 무엇을 사용해야함?

- Type Aliases과 interface는 매우 유사하며 많은 경우 자유롭게 선택할 수 있다. interface의 거의 모든 기능은 type에서 사용할 수 있으며, 주요 차이점은 type을 다시 열어 새 속성을 추가할 수 없는 것. 반면 interface는 항상 확장 가능.

결론: 대부분의 경우 개인 취향에 따라 선택 가능(interface 사용을 조금 더 추천, const 상수로 선언해주는 게 좋은 것과 동일 이유)

[더 알아보기](https://tecoble.techcourse.co.kr/post/2022-11-07-typeAlias-interface/)



### TS에게 오브젝트 모양을 설명해 주는 방법

### 1번 활용할 방법이 많다.

```javascript

type Nickname=string
type Team="red"|"blue"|"yellow"
type Health=1|5|10
type Friends=Array<string>
type Player ={
    nickname:string,
    team:Team
    health:Health
}
const nico:Player={
    nickname:"nico",
    team:"red",
    health:10
}
type Food=string;
const kimchi:Food="delicious"
```

### 2번 interface : 컴파일 시 JS로 바뀌지 않는다.(가벼움)

```javascript
interface User{
    readonly name:string
}
interface Player extends User {
    name:string,
}
// type Player = User &{
//     name:string,
// }

const nico:Player={
    name:"nico"
}

nico.name="lala"
```

추상클래스 사용하는 이유 : 표준화된 프로퍼티와 메소드를 갖도록 해주는 청사진을 만들기 위함

```javascript

abstract class User{
  constructor(
    protecte firstName:string,
    protecte lastName:string,
  ){}
  abstract fullName():string
  abstract sayHi(name:string):string
}
class Player extends User{
  fullName(){
    return `${this.firstName} ${this.lastName}`
  }
  sayHi(name:string){
    return `Hello ${name}. My name is ${this.fullName()}`
  }
}
```

implements : TS에만 있으며 JS로 컴파일되지 않는다.

class : 여러개의 interface를 상속받을 수 있다.

```javascript
interface class User{
  firstName:string,
  lastName:string
  fullName():string
  sayHi(name:string):string
}

interface Human{
  health:number
}
class Player implements User, Human{
  constructor(
    public firstName:string,
    public lastName:string,
    public health:number,
  ){}
  fullName(){
    return `${this.firstName} ${this.lastName}`
  }
  sayHi(name:string){
    return `Hello ${name}. My name is ${this.fullName()}`
  }
}
```

### Polymorphism

제네릭(placehoder타입을 사용하게 해준다)을 사용

```javascript
interface SStorage {
  [key:string]: T
}
class LocalStorage<T> {
  private storage: SStorage<T> = {}
  set(key:string, value:T){
    this.storage[key]=value;
  }
  remove(key:string){
    delete this.storage[key]
  }
  get(key:string) : T{
    return this.storage[key]
  }
  clear(){
    this.storage={}
  }
}

const stringsStorage = new LocalStorage<string>{}

stringsStorage.get("ket")
stringsStorage.set("hello", "how are you")

const booleansStorage=new LocalStorage<boolean>{}

stringsStorage.get("xxx")
stringsStorage.set("hello", true)
```

<!--
classes 그리고 interfaces 를 활용하여, 아래 API를 위한 '미니' 버전을 구현하세요.

    LocalStorage API
    Geolocation API

LocalStorage API:

    Use abstract classes and generics.
    추상화 클래스와 제네릭을 사용하세요.

Usage:

localStorage.setItem(<key>, <value>)
localStorage.getItem(<key>)
localStorage.clearItem(<key>)
localStorage.clear()

Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Storage


>LocalStorage는 사용자 로컬 컴퓨터에 저장되는 공간 중 하나로 저장되는 데이터는 key값과 value값의 쌍 즉, key: value 값으로 저장이 됩니다.

>핵심 키워드는 추상화(abstract) 그리고 제네릭입니다.

    1. 타입 만들기: interface는 type과 더불어 꽤 많이 사용되는 타입 정의 키워드이며 상속에 굉장히 용이하다는 특징이 있습니다. 인풋 타입에 따라 아웃풋 타입이 유동적으로 변할 수 있도록 제네릭과 함께 적용해 보세요.
    2. 추상화(abstract)는 어떤 하위 클래스에 상속시킬 때 주로 사용이 되며 추상화 클래스 자체로는 인스턴스를 생성할 수 없습니다. 클래스 뿐만이 아니라 클래스 내부의 필드와 메소드에도 적용이 가능합니다. 어떤 부분에 추상화를 적용시킬지는 여러분들이 잘 판단해서 해보시기 바랍니다. 또한, 추상화 클래스에도 제네릭을 적용시킬 수 있습니다. 마찬가지로 클래스 내부 메소드에 제네릭을 어떻게 적용시키면 좋을지 생각해보세요.
    3. 추상화 클래스를 상속시킨 새로운 클래스를 정의한 후 내부 필요한 메소드들을 정의해보세요. 추상화 클래스를 상속시킨 이 새로운 클래스가 실제 API로써 사용될 클래스가 됩니다. 사용법에 적혀 있는 setItem(), getItem(), clearItem() 및 clear()들은 전부 LocalStorage와 관련있는 메소드입니다. 관련 공식 문서는 여기를 확인해주세요.


Geolocation API:

    overloading을 사용하세요.

geolocation.getCurrentPosition(successFn);
geolocation.getCurrentPosition(successFn, errorFn);
geolocation.getCurrentPosition(successFn, errorFn, optionsObj);
geolocation.watchPosition(success);
geolocation.watchPosition(success, error);
geolocation.watchPosition(success, error, options);
geolocation.clearWatch(id);

Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation

>GeoLocation API는 로컬 컴퓨터의 위치 정보를 가져오는 유용한 API입니다. 공식 문서의 링크를 통해 어떤 메소드들이 있는지 살펴보시기 바랍니다.

>핵심 키워드는 overloading입니다. 특히 함수 overloading은 동일한 함수 이름이되 서로 다른 타입의 매개변수를 받는 것을 의미합니다. 따라서, GeoLocation API 안에 어떤 필드들과 어떤 메소드들이 있는지 유심히 살펴보시고 어떤 식으로 타입을 적용시킬지 고민이 필요한 챌린지입니다.

    1. GeoLocation에 사용될 필드와 메소드에 적용될 수 있는 타입들을 정의해보세요.
    2. overloading을 적용될 수 있도록 GeoLocation API에 있는 기존 메소드의 이름을 쓰되 새로 만든 타입을 중복 시켜 적용해보세요.
    3. 사용법에 있는 getCurrentPosition(), watchPosition() 안에 Fn이 붙어 있는 파라미터들은 콜백 함수를 의미하며 나머지들은 전부 객체를 가리킵니다. 이에 유의하여 타입을 설정해보시기 바랍니다.
-->
