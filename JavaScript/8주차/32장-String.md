## String 생성자 함수

표준 빌트인 객체인 String 객체는 생성자 함수 객체입니다.

따라서 new 연산자와 함께 호출하여 String 인스턴스를 생성할 수 있습니다.

만약, String 생성자 함수에 인수를 전달하지 않고, new 연산자와 함께 호출하면 `[[StringData]]` 내부 슬롯에 빈 문자열을 할당한 String 래퍼 객체를 생성합니다.

```js
const strObj = new String();

console.log(strObj); // String {''}
```

String 생성자 함수에 인수로 문자열을 전달하면서, new 연산자와 함께 호출하면 `[[StringData]]` 내부 슬롯에 인수로 전달받은 문자열을 할당한 String 래퍼 객체를 생성합니다.

```js
const strObj = new String('Kim');

console.log(strObj); // [String: 'Kim']
/*
0: "K"
1: "i"
2: "m"
length: 3
*/
```

String 래퍼 객체는 배열과 마찬가지로 <u>length 프로퍼티</u>와 <u>인덱스</u>틀 나타내는 숫자 형식의 문자열을 프로퍼티 키로, 각 문자를 프로퍼티 값으로 갖는 **유사 배열 객체이면서 이터러블입니다.**

문자열은 원시 값이므로 변경 할 수 없습니다. 이때 에러는 발생하지 않는다고 하네요.

만약에 String 생성자 함수의 인수로 문자열이 아닌 값을 전달하면 인수를 문자열로 강제 변환한 후, `[[StringData]]` 내부 슬롯에 변환된 문자열을 할당한 String 래퍼 객체를 생성합니다.

new 연산자를 사용하지 않고 String 생성자 함수를 호출하면 String 인스턴스가 아닌 문자열을 반환합니다. 이를 이용해서 명시적 타입으로 변환하기도 하죠.

<br>

## String 메서드

> String 객체의 메서드는 언제나 새로운 문자열을 반환합니다.

배열은 원본 배열(배열 메서드를 호출한 배열)을 직접 변경하는 메서드가 있고, 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드가 있습니다.

String 객체에는 원본 String 래퍼 객체(String 메서드를 호출한 String 래퍼 객체)를 직접 변경하는 메서드는 존재하지 않습니다.

문자열은 변경 불가능한 원시 값이기 때문에 **String 래퍼 객체도 읽기 전용(read only) 객체로 제공됩니다.**

```js
const strObj = new String('Kim');

console.log(Object.getOwnPropertyDescriptors(strObj));

/*
0: {value: 'K', writable: false, enumerable: true, configurable: false}
1: {value: 'i', writable: false, enumerable: true, configurable: false}
2: {value: 'm', writable: false, enumerable: true, configurable: false}
length: {value: 3, writable: false, enumerable: false, configurable: false}
*/
```

<br>
