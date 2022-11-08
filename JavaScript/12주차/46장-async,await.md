## 전체적인 흐름

**1. 프로미스는 뭐하는 녀석인가요?**

> “A promise is an object that may produce a single value some time in the future”

프로미스는 자바스크립트 비동기처리에 사용되는 객체입니다.

사전적 의미로는 말 그대로 '약속'이라는 뜻입니다.

즉, 언제 결과 값이 전달될지는 모르겠지만(지금은 없지만), 이상이 없으면 값을 전달해주고 이상이 생기면 알려줄게라는 약속인 것이죠.

new Promise로 Promise가 생성되는 직후부터 resolve 혹은 reject가 호출되기 전까지의 순간을 `pending` 상태라고 볼 수 있습니다.

이후 비동기 작업이 마친 뒤 결과물을 약속대로 잘 줄 수 있다면, resolve 함수를 호출하고, 실패를 했다면 reject 함수를 호출하는 것이 Promise의 주요한 개념입니다.

**2. 프로미스는 무엇을 해결했나요?**

우선적으로, 콜백이 중첩되는 문제를 해결했습니다.

즉, 기존 콜백 패턴의 경우 콜백으로 결과를 받은 뒤 순차적으로 다음 작업을 하기 위해서는 콜백 중첩, 이른바 콜백 지옥이라는 문제가 있었습니다.

Promise 패턴을 사용하면 비동기 작업들을 순차적으로 진행하거나 병렬로 진행하는 등 컨트롤이 수월해지고 코드의 가독성이 좋아졌습니다.

또한 기존 비동기 처리를 위한 콜백 패턴보다 오류처리가 용이해진다는 장점도 존재합니다.

**3. 프로미스의 문제는 무엇이었고, 해결책은 무엇이었나요?**

프로미스 패턴도 여러개의 프로미스가 서로 의존하고 있는 경우 코드의 가독성이 떨어지게 됩니다.

따라서 `async / await`를 사용하여 더욱 직관적인 코드를 작성할 수 있습니다.

다시 말해서 프로미스의 후속 처리 메서드 없이 마치 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현된 것입니다.

**4. 그 해결책은 어떻게 구성이 되어있나요?**

`async`와 `awiat`이라는 키워드로 구성이 되어있습니다.

함수 앞에는 `async`라는 예약어를 붙이고, 함수 내부 로직 중 HTTP 비동기 통신을 하는 비동기 처리 코드 앞에 `await`를 붙입니다.

async 함수는 언제나 프로미스를 반환하고, await 키워드는 프로미스가 settled 상태가 될 때까지 대기하다가, settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환합니다.

<br>

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

제너레이터 객체의 next 메서드를 호출하면 yield 표현식까지 실행되고 일시 중지됩니다.

이때 **함수의 제어권이 호출자로 양도(yield)됩니다.**

이후 필요한 시점에 호출자가 또 다시 next 메서드를 호출하면 일시 중지된 코드부터 실행을 재개합니다.

그리고 다음 yield 표현식까지 실행되고 또 다시 일시 중지됩니다.

이때 제너레이터 객체의 **next 메서드는 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환합니다.**

next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 yield 표현식에서 yield된 값(yield 키워드 뒤의 값)이 할당됩니다.

done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 불리언 값이 할당됩니다.

제너레이터 객체의 **next 메서드에 전달한 인수는 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당됩니다.**

다른 예제를 같이 살펴보죠.

```js
function* genFunc() {
    // 처음 next 메서드를 호출하면 첫 번째 yield 표현식까지 실행되고 일시 중단됩니다.
    // 이때 yield된 값 1은 next 메서드가 반환한 이터레이터 리절트 객체의 vlaue 프로퍼티에 할당됩니다.
    // a 변수에는 아직 아무것도 할당되지 않았습니다. a 변수의 값은 next 메서드가 두 번재 호출할 때 결정됩니다.
    const a = yield 1;

    // 두 번째 next 메서드를 호출할 때 전달한 인수 10은 첫 번째 yield 표현식을 할당받는 a 변수에 할당됩니다.
    // 즉, const a = yield 1;은 두 번째 next 메서드를 호출했을 때 완료됩니다.
    // 두 번째 next 메서드를 호출하면 두 번째 yield 표현식까지 실행되고 일시 중지됩니다.
    // 이때 yield된 값 a + 10은 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당됩니다.
    const b = yield a + 10;

    // 세 번째 next 메서드를 호출할 때 전달한 인수 20은 두 번째 yield 표현식을 할당받는 b 변수에 할당됩니다.
    // 즉, const b = yield (a+10);는 세 번째 next 메서드를 호출했을 때 완료됩니다.
    // 세 번째 next 메서드를 호출하면 함수 끝까지 실행됩니다.
    // 이때, 제너레이터 함수의 반환 값 a+b는 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당됩니다.
    return a + b;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환합니다.
const generator = genFunc();

// 처음 호출하는 next 메서드에는 인수를 전달하지 않습니다.
// 만약 처음 호출하는 next 메서드에 인수를 전달하면 무시됩니다.
// next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 첫 번째 yield된 값 1이 할당됩니다.
let res = generator.next();
console.log(res); // { value: 1, done: false }

// next 메서드에 인수로 전달한 10은 genFunc 함수의 a변수에 할당됩니다.
// next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 두 번째 yield된 값 20이 할당됩니다.
res = generator.next(10);
console.log(res); // { value: 20, done: false }

// next 메서드가 인수로 전달한 20은 genFunc 함수의 b 변수에 할당됩니다.
// next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 제너레이터 함수의 반환 값 30이 할당됩니다.
res = generator.next(20);
console.log(res); // { value: 30, done: true }
```

이처럼 제너레이터 함수는 next 메서드와 yield 표현식을 통해 함수 호출자와 상태를 주고 받을 수 있습니다.

함수 호출자는 next 메서드를 통해 yield 표현식까지 함수를 실행시켜 리절트 객체의 value 프로퍼티에 할당된 값을 꺼내올 수 있습니다.

그리고 next 메서드에 인수를 전달해서 제너레이터 객체에 상태(yield 표현식을 할당받는 변수)를 밀어넣을 수 있습니다.

이러한 제너레이터 특성을 활용하면 비동기 처리를 동기처럼 구현할 수 있다고 합니다.
<br>

## async / await

> clear style of using Promise

ES8(2017)에서는 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 동작하도록 구현할 수 있는 `async/await`가 도입되었습니다.

`async/await`은 \*_프로미스를 기반으로 동작_\합니다.

그리고 프로미스의 후속 처리 메서드(then, catch, finally)없이 마치 동기처럼 프로미스가 처리 결과를 반환하도록 구현할 수 있습니다.

```js
async function fetchTodo() {
    try {
        const url = 'https://jsonplaceholder.typicode.com/todos/1';

        const response = await fetch(url);
        const todo = await response.json();
        console.log(todo);
        // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
    } catch (error) {
        console.log(error);
    }
}

fetchTodo();
```

### async 함수

async 키워드는 번거롭게 프로미스를 쓰지 않아도 자동적으로 함수안에 있는 코드 블록들을 프로미스로 변환합니다.

즉, async 함수는 async 키워드를 사용해 정의하며 언제나 반환값을 resolve 하는 프로미스를 반환합니다.

### await 키워드

await 키워드는 프로미스가 settled 상태(비동기 처리가 수행된 상태)가 될 때까지 대기합니다.

그러다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환합니다.

이는 프로미스 체이닝을 하는 것보다 훨씬 동기적으로 보이는 코드를 작성할 수 있다는 장점이 있습니다.

```js
const getGithubUserName = async (id) => {
    try {
        // fetch 함수가 반환한 프로미스가 settled 상태가 될때까지 대기합니다.
        // 이후 프로미스가 settled 상태가 되면 프로미스가 resolve한 처리 결과가 res 변수에 할당됩니다.
        const res = await fetch(`https://api.github.com/users/${id}`);

        const { name } = await res.json();
        console.log(name); // Junghee Kim
    } catch (error) {
        console.log(error);
    }
};
getGithubUserName('wjdgml3834');
```

이처럼 `await` 키워드는 **다음 실행을 일시 중지했다가 프로미스가 settled 상태가 되면 다시 재개합니다.**

그런데, 모든 프로미스에 await 키워드를 사용하는 것은 주의해야 합니다. 다음 예제를 살펴보죠.

```js
async function foo() {
    const a = await new Promise((resolve) => setTimeout(() => resolve(1), 3000));
    const b = await new Promise((resolve) => setTimeout(() => resolve(2), 2000));
    const c = await new Promise((resolve) => setTimeout(() => resolve(3), 1000));
    console.log([a, b, c]); // [ 1, 2, 3 ]
}
foo(); // 약 6초 소요됩니다.
```

서로 연관이 없이 개별적으로 수행되는 비동기 처리는 앞의 비동기 처리가 끝날 때까지 대기하여 순차적으로 처리할 필요가 없습니다.

따라서 다음과 같이 코드를 수정할 수 있습니다.

```js
async function foo() {
    const res = await Promise.all([
        new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
        new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
        new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
    ]);

    console.log(res); // [ 1, 2, 3 ]
}
foo(); // 약 3초 소요됩니다.
```

<br>

## 에러처리

> 에러는 호출자(caller) 방향으로 전파됩니다.

콜백 패턴의 가장 심각한 문제는 에러 처리가 곤란했다는 점입니다.

왜냐하면 비동기 함수의 콜백 함수를 호출한 것은 비동기 함수가 아니기 때문에 `try...catch`문을 사용해 에러를 잡을 수 없기 때문입니다.

반면, `async/await`에서 에러처리는 `try...catch`문을 사용할 수 있습니다.

콜백 함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출 할 수 있기에 호출자가 명확합니다.

```js
const foo = async () => {
    try {
        const wrongUrl = 'https://worong.url';

        const response = await fetch(wrongUrl);
        const data = response.json();
        console.log(data);
    } catch (error) {
        console.log(error); // 🚫TypeError: Failed to fetch
    }
};

foo();
```

HTTP 통신에서 발생한 네트워크 에러 뿐 아니라, try 코드 블록 내에서 발생한 일반적인 에러까지 모두 잡을 수 있습니다.

만약에 async 함수 내에서 catch 문을 사용해서 에러처리를 하지 않으면 어떻게될까요?

async 함수는 발생한 에러를 reject하는 프로미스를 반환합니다.

따라서 `Promise.prototype.catch` 후속 처리 메서드를 사용해 에러를 잡을 수도 있습니다.

```js
const foo = async () => {
    const wrongUrl = 'https://worong.url';

    const response = await fetch(wrongUrl);
    const data = response.json();
    console.log(data); // 🚫TypeError: Failed to fetch
};

foo().then(console.log).catch(console.error);
```
