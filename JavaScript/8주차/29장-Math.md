## Math

`Math`는 표준빌트인 객체로서 수학적인 상수와 함수를 위한 프로퍼티와 메서드를 제공합니다.

`Math`는 생성자 함수가 아닙니다.

따라서 `Math`는 정적 프로퍼티와 정적 메서드만 제공합니다.

정적 프로퍼티와 정적 메서드에 대한 내용은 [여기](https://ko.javascript.info/static-properties-methods)를 참고하세요!

## Math 메서드

### Math.abs

> 인수로 전달된 숫자의 절대값을 반환합니다.

```js
console.log(Math.abs(-1)); // 1

console.log(Math.abs('-1')); // 1

console.log(Math.abs('')); // 0

console.log(Math.abs([])); // 0

console.log(Math.abs(null)); // 0

console.log(Math.abs(undefined)); // NaN

console.log(Math.abs({})); // NaN

console.log(Math.abs('string')); // NaN

console.log(Math.abs()); // NaN
```

<br>

### Math.floor

> 인수로 전달된 숫자의 소수점 이하를 내림한 정수를 반환합니다.

```js
console.log(Math.floor(2.5)); // 2

console.log(Math.floor(-2.5)); // -3

console.log(Math.floor(1)); // 1

console.log(Math.floor()); // NaN
```

<br>

### Math.sqrt

> 인수로 전달된 숫자의 제곱근을 반환합니다.

```js
console.log(Math.sqrt(4)); // 2

console.log(Math.sqrt(-4)); // NaN

console.log(Math.sqrt(2)); // 1.4142135623730951

console.log(Math.sqrt(1)); // 1

console.log(Math.sqrt(0)); // 0

console.log(Math.sqrt()); // NaN
```

<br>

### Math.random

> 임의의 랜덤 숫자를 반환합니다.

반환한 숫자는 0에서 1미만의 실수입니다.

따라서 **0은 포함되지만 1은 포함되지 않습니다.**

```js
console.log(Math.random()); // 0.3429787922329559
```

```js
// 1에서 10범위의 랜덤 정수 구하기

const random = Math.floor(Math.random() * 10 + 1);

console.log(random);
```

<br>

### Math.max

> 전달받은 인수 중에서 가장 큰 수를 반환합니다.

```js
console.log(Math.max(10, 20, 30)); // 30
```

배열을 인수로 전달 받아서 사용하면 안됩니다.

```js
console.log(Math.max([1, 2, 3])); // NaN
```

대신 배열을 인수로 전달받아 배열의 요소 중에서 최대 값을 구하려면 다음과 같은 방법을 사용해야 합니다.

-   Function.prototype.apply 메서드

    ```js
    console.log(Math.max.apply(null, [10, 20, 30])); // 30
    ```

-   스프레드 문법

    ```js
    console.log(Math.max(...[10, 20, 30])); // 30
    ```

<br>

### Math.min

> 전달받은 인수 중에서 가장 작은 수를 반환합니다.

```js
console.log(Math.min(10, 20, 30)); // 10
```

배열을 인수로 전달받아 배열의 요소 중에서 최대 값을 구하려면 다음과 같은 방법을 사용해야 합니다.

-   Function.prototype.apply 메서드

    ```js
    console.log(Math.min.apply(null, [10, 20, 30])); // 10
    ```

-   스프레드 문법

    ```js
    console.log(Math.min(...[10, 20, 30])); // 10
    ```
