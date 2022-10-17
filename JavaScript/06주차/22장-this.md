## this 키워드

> 자신이 속한 객체 or 생성할 인스턴스를 가리키는 자기 참조 변수입니다.

메서드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 합니다.

자신이 속한 객체의 프로퍼티를 참조하려면 우선 <u>자신이 속한 객체를 가리키는 식별자</u>를 참조할 수 있어야 합니다.

이 기능을 하는 것이 바로 **this** 입니다.

우선 `this` 가 없을 때 나타나는 현상부터 살펴보죠.

```js
// 객체 리터럴로 생성한 경우입니다.
const circle = {
    // 프로퍼티: 객체 고유의 상태 데이터
    radius: 5,
    // 메서드: 상태 데이터를 참조하고 조작하는 동작
    getDiameter() {
        // 자신이 속한 객체인 circle을 참조합니다.
        return 2 * circle.radius;
    },
};

console.log(circle.getDiameter()); // 10
```

이렇게 자기 자신이 속한 객체를 재귀적으로 참조하는 방식은 바람직하지 않습니다.

```js
// 생성자 방식으 인스턴스를 생성한 경우입니다.
function Circle(radius) {
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없죠?
  ????.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // 여기도 마찬가지입니다.
  return 2 * ????.radius;
};

// 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의해야합니다.
const circle = new Circle(5);
```

생성자 함수를 정의하는 시점에는 **아직 인스턴스를 생성하기 이전이므로 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없습니다.**

따라서 자신이 속한 객체 또는 인스턴스를 가리키는 특수한 식별자가 필요합니다.

이를 위해 JS는 `this`라는 특수 식별자를 제공합니다.

우리는 이 `this`를 통해 자신이 속한 객체 or 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있는 것이죠

`this`가 가지는 특징은 다음과 같습니다.

-   자바스크립트 엔진에 의해 암묵적으로 생성됩니다. 그래서 코드 어디서든 참조할 수 있습니다.
-   함수의 경우 호출하면 `arguments 객체`와 `this`가 암묵적으로 함수 내부에 전달됩니다. (this도 지역 변수처럼 사용가능합니다.)
-   **`this`가 가리키는 값은 함수 호출 방식에 의해 동적으로 결정됩니다.**

이제 `this` 키워드를 배웠으니 앞의 예제를 수정해보죠.

```js
const circle = {
    radius: 5,
    getDiameter() {
        //  this는 메서드를 호출한 객체를 가리킵니다.
        return 2 * this.radius;
    },
};

console.log(circle.getDiameter()); // 10
```

```js
function Circle(radius) {
    // this는 생성자 함수가 생성할 인스턴스를 가리킵니다.
    this.radius = radius;
}

Circle.prototype.getDiameter = function () {
    // this는 생성자 함수가 생성할 인스턴스를 가리킵니다.
    return 2 * this.radius;
};

// 생성자 함수로 인스턴스를 생성합니다.
const circle = new Circle(5);
```

`this`는 코드 어디서든 참조 가능합니다.

하지만 `this`는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수입니다.

따라서 일반적으로 객체의 메서드 내부 or 생성자 함수 내부에서만 의미가 있습니다.

따라서 strict mode가 적용된 `this`에는 undefined가 바인딩됩니다.

<br>

## 함수 호출 방식과 this 바인딩

> this 바인딩은 함수 호출 방식에 따라 동적으로 결정됩니다.

각각 함수 호출 방식에 따라 어떻게 `this` 바인딩이 달라지는지 살펴보겠습니다.

#### 일반 함수 호출

> 기본적으로 this에는 전역 객체가 바인딩됩니다.

**일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함)** 내부의 `this`에는 전역 객체가 바인딩됩니다.

```js
var value = 1;

const obj = {
    value: 100,
    foo() {
        console.log('foo의 this:', this); // foo의 this: {value: 100, foo: ƒ}

        setTimeout(function () {
            console.log('callback의 this:', this); // Window
            console.log('callback의 this.value:', this.value); // callback의 this.value: 1
        }, 100);
    },
};
```

하지만 외부 함수인 메서드와 중첩 함수 or 콜백 함수의 this가 일치하지 않는 다는 것은 헬퍼 함수로 동작하기 어렵게 만듭니다.

메서드 내부의 중첩 함수 or 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법이 있습니다.

-   this를 변수에 할당하기

    ```js
    var value = 1;

    const obj = {
        value: 100,
        foo() {
            // this 바인딩을 변수 that에 할당합니다.
            const that = this;
            // 콜백 함수 내부에서 this 대신 that을 참조합닌다.
            setTimeout(function () {
                console.log(that.value); // 100
            }, 100);
        },
    };

    obj.foo();
    ```

-   apply/call/bind 메서드 사용하기

    ```js
    var value = 1;

    const obj = {
        value: 100,
        foo() {
            // 콜백 함수에 명시적으로 this를 바인딩합니다.
            setTimeout(
                function () {
                    console.log(this.value); // 100
                }.bind(this),
                100
            );
        },
    };

    obj.foo();
    ```

-   화살표 함수 사용하기 : 화살표 함수의 this는 상위 스코프의 this와 바인딩됩니다.

    ```js
    var value = 1;

    const obj = {
    value: 100,
    value2 : this.value // 1
    foo() {
        // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킵니다.
        setTimeout(() => console.log(this.value), 100); // 100
    }
    };

    obj.foo();

    ```

<br>

#### 메서드 호출

> 메소드를 ❌소유한 객체가 아닌 ✅메서드를 호출한 객체에 바인딩됩니다.

```js
// 메서드 내부의 this는 메서드를 호출한 객체에 바인딩됩니다.
const person = {
    name: 'amy',
    getName() {
        return this.name;
    },
};

// 메서드 getName을 호출한 객체는 person이므로
console.log(person.getName()); // amy

const anotherPerson = {
    name: 'james',
};

// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체는 anotherPerson입니다.
console.log(anotherPerson.getName()); // james

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
console.log(getName()); // ''
```

프로토타입 내부에 사용된 this 바인딩도 동일합니다.

```js
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
};

const me = new Person('amy');
console.log(me.getName()); // amy

Person.prototype.name = 'james';
console.log(Person.prototype.getName()); // james
```

<br>

#### 생성자 함수 호출

> 생성자 함수가 미래에 생성할 인스턴스가 바인딩됩니다.

```js
function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

const circle1 = new Circle(5);
console.log(circle1.getDiameter()); // 10

const circle2 = new Circle(10);
console.log(circle2.getDiameter()); // 20

// new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않습니다. 일반 함수 호출입니다.
const circle3 = Circle(15);

// 일반 함수로 호출된 Circle에는 반환문이 없으므로 암묵적으로 undefined를 반환합니다.
console.log(circle3); // undefined

// 일반 함수로 호출된 Circle 내부의 this는 전역 객체를 가리킵니다.
console.log(radius); // 15
```

<br>

#### Function.prototype.apply/call/bind 메서드에 의한 간접 호출

> Function.prototype.apply/call/bind 메서드에 첫 번째 인수로 전달된 객체가 바인딩됩니다.

apply, call은 this로 사용할 객체와 인수 리스트를, bind는 this만을 인수로 받습니다.

-   apply : Function.prototype.apply(thisArg[, argsArray])

    -   thisArg : this로 사용할 객체
    -   argsArray : 함수에 전달할 인수 리스트

-   call : Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])

    -   thisArg : this로 사용할 객체
    -   arg1, arg2, ... : 함수에 전달할 인수 리스트

-   bind : Function.prototype.bind(thisArg)
    -   thisArg : this로 사용할 객체

다음은 getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수의 this에 바인딩시키는 코드입니다.

```js
function getThisBinding() {
    console.log(arguments);
    return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// 1. apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달
console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}

// 2. call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달
console.log(getThisBinding.call(thisArg, 1, 2, 3));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}
```

<br>

이들의 대표적인 용도는 유사 배열 객체에 배열 메서드를 사용하는 경우입니다.

```js
// 1. arguments 객체를 배열로 변환
function convertArgsToArray() {
    console.log(arguments);

    // Array.prototype.slice를 인수없이 호출하면 배열의 복사본을 생성
    const arr = Array.prototype.slice.call(arguments);
    // const arr = Array.prototype.slice.apply(arguments);
    console.log(arr);

    return arr;
}

convertArgsToArray(1, 2, 3); // [1, 2, 3]
```

<br>

bind 메서드는 메서드의 this와 메서드의 내부/콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용됩니다.

```js
const person = {
    name: 'amy',
    foo(callback) {
        // bind 메서드로 callback 함수 내부의 this 바인딩 전달
        setTimeout(callback.bind(this), 100);
    },
};

person.foo(function () {
    console.log(`Hi! ${this.name}.`); // Hi! amy.
});
```
