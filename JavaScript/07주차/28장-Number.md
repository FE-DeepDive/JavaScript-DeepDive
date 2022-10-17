## Number 생성자 함수

표준 빌트인 객체인 Number 객체는 생성자 함수 객체입니다.

따라서 new 연산자와 함께 호출하여 Number 인스턴스를 생성할 수 있습니다.

-   Number 생성자 함수에 인수를 전달하지 않은 경우

`[[NumberData]]` 내부 슬롯에 0을 할당한 Number 래퍼 객체를 생성합니다.

```js
const numObj = new Number();

console.log(numObj); // Number {0}
```

-   Number 생성자 함수에 인수로 숫자를 전달한 경우

`[[NumberData]]` 내부 슬롯에 인수로 전달받은 숫자를 할당한 Number 래퍼 객체를 생성합니다.

```js
const numObj = new Number(10);

console.log(numObj); // Number {10}
```

<br>

## Number 프로퍼티

-   Number.MAX_SAFE_INTEGER

자바스크립트에서 안전하게 표현할 수 있는 가장 큰 정수 값입니다.

```js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
```

<br>

-   Number.MIN_SAFE_INTEGER

자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정수 값입니다.

```js
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
```

<br>

## Number 메서드

-   Number.isInteger

ES6에 도입되었고, 인수로 전달된 숫자 값이 정수인지 검사하여 그 결과 값을 불리언으로 반환합니다.

```js
console.log(Number.isInteger(345)); // true

console.log(Number.isInteger(-345)); // true

console.log(Number.isInteger(0.5)); // false

console.log(Number.isInteger('345')); // false

console.log(Number.isInteger(false)); // falses
```

<br>

-   Number.isNaN

ES6에 도입되었고, 인수로 전달된 숫자값이 NaN인지 검사하여 그 결과를 불리언 값으로 반환합니다.

```js
console.log(Number.isNaN(NaN)); // true

console.log(Number.isNaN(undefined)); // false
// 암묵적 타입 변환을 하지 않습니다.
```

<br>

-   Number.prototype.toFixed

숫자를 반올림하여 문자열로 반환합니다. 인수를 생략하면 기본값 0이 지정됩니다.

```js
// 소수점 이하 반올림
console.log((1234.5678).toFixed()); // 1235
// 소수점 이하 1 자릿수 유효, 나머지 반올림
console.log((1234.5678).toFixed(1)); // 1234.6
// 소수점 이하 2 자릿수 유효, 나머지 반올림
console.log((1234.5678).toFixed(2)); // 1234.57
```

<br>

-   Number.prototype.toString

숫자를 문자열로 변환하여 반환합니다. 인수를 생략하면 기본 값 10진법이 지정됩니다.

```js
console.log((5).toString()); // '5'
```
