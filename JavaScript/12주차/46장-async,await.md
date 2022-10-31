## 제너레이터 (generator)

> 코드 블록의 실행을 일시 중지 or 재개시킬 수 있는 특수한 함수입니다.

ES6에 도입된 제너레이터는 일반 함수와 어떠한 차이가 있을까요?

**✅ 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있습니다.**

일반 함수의 경우, 호출을 하게 되면 제어권이 함수로 넘어가게 되고 함수 코드를 일괄 실행해버리죠.

하지만, 제너레이터 함수의 경우에는 함수 호출자가 함수 호출을 일시적으로 중지 or 재개시킬 수 있습니다.

이것을 다르게 표현하면, 함수 실행을 함수 호출자가 제어할 수 있다고도 하죠.

이는 함수의 제어권을 **함수 호출자에게 양도(yield)** 할 수 있다는 뜻입니다.

**✅ 제너레이터 함수는 함수 호출자와 함수의 상태를 주고 받을 수 있습니다.**

일반 함수의 경우 함수가 실행되고 있는 동안에는 함수 내부로 값을 전달하여 함수의 상태를 변경하는 것은 불가능합니다.

그러나 제너레이터 함수의 경우 호출자와 양방향으로 함수의 상태를 주고 받을 수 있습니다.

**✅ 제너레이터 함수를 호출하면 제너레이터 객체를 반환합니다.**

일반 함수의 경우 함수를 호출하면 함수 코드를 실행하고 값을 반환을 합니다.

반면, 제너레이터 함수를 호출하면 함수 코드를 실행하지 않습니다.

제너레이터 **함수를 호출하면 제너레이터 객체를 반환**하게 됩니다.

제너레이터 객체는 **이터러블이면서 동시에 이터레이터**입니다.

<br>

## 제너레이터 함수의 정의

제너레이터 함수를 어떻게 정의하는지 살펴봅시다.

제너레이터 함수는 `function*` 키워드로 선언하게 됩니다.

그리고 하나 이상의 `yield` 표현식을 포함시켜야 합니다.

```js
// 제너레이터 함수 선언문
function* genDecFunc() {
    yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
    yield 1;
};

// 제너레이터 메서드
const obj = {
    *genObjMethod() {
        yield 1;
    },
};

// 제너레이터 클래스 메서드
class MyClass {
    *genClsMethod() {
        yield 1;
    }
}
```

❗️참고로 일관성을 유지하기 위해 `*`의 위치는 function 키워드 바로 뒤에 붙이는 것을 책에서는 권장하고 있습니다.

```js
function* genFunc() {
    yield 1;
}
```

<br>

## 제너레이터 객체

앞에서 말씀드린 것처럼 제너레이터 함수를 호출하면 제너레이터 객체를 생성해서 반환합니다.

여기서 반환된 **제너레이터 객체는 이터러블(iterable)이자 이터레이터(iterator)** 입니다.

이것을 조금 더 상세하게 설명해보겠습니다.

제너레이터 객체가 이터러블이라는 뜻은 Symbol.iterator 메서드를 상속받는다는 뜻입니다.

그리고 이터레이터라는 뜻은 value,done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 next 메서드를 소유한다는 뜻이죠.

따라서 제너레이터 객체는 Symbol.iterator 메서드를 호출해서 별도의 이터레이터를 생성할 필요가 없습니다.

```js
// 제너레이터 함수
function* genFucnc() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환합니다.
const generator = genFucnc();

// 제너레이터 객체는 이터러블이면서 동시에 이터레이터입니다.
// 이터러블은 Symbol.iterator 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체입니다.
console.log(Symbol.iterator in generator); // true

// 이터레이터는 next 메서드를 갖습니다.
console.log('next' in generator); // true
```

제너레이터의 객체는 이터레이터의 next 메서드와 달리, next 메서드에 **인수를 전달할 수 있다**는 특징을 가지고 있습니다.

또한 제너레이터 객체는 **`next` 메서드 뿐 아니라, 이터레이터에 없는 `return`, `throw` 메서드를 갖게 됩니다.**

<br>

## 제너레이터의 일시 중지와 재개

제너레이터는 함수 호출자에게 제어권을 양도하여 필요한 시점에 함수 실행을 재개할 수 있습니다.

즉, `yield` 키워드와 `next` 메서드를 통해서 실행을 일시 중지했다가 필요한 시점에 다시 재개를 할 수 있는 것이죠.

제너레이터의 next 메서드를 호출하면 **yield 표현식까지만 실행을 하게 됩니다.**

즉, 일반 함수처럼 한 번에 모든 코드를 일괄 실행하는 형태가 아닌 것입니다.

**yield 키워드는 제너레이터 함수의 실행을 일시 중지하거나, yield 키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환하는 역할을 합니다.**

```js
function* genFunc() {
    console.log('Before 1');
    yield 1;
    console.log('After 1');
    console.log('Before 2');
    yield 2;
    console.log('After 2');
    console.log('Before 3');
    yield 3;
    console.log('After 3');
}

const generator = genFunc();

console.log(generator.next()); // Before 1 { value: 1, done: false }

console.log(generator.next()); // After 1 Before 2 { value: 2, done: false }

console.log(generator.next()); // After 2 Before 3 { value: 3, done: false }

console.log(generator.next()); // After 3 { value: undefined, done: true }
```
