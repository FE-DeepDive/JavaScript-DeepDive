우리는 객체와 배열이라는 자료구조를 배웠습니다.

하지만 현실 세계를 반영하기엔 이 두 자료구조 만으론 부족해서 `맵(Map)`과 `셋(Set)`이 등장하게 되었습니다.

Set은 중복되지 않는 값들의 집합이며, Map은 키가 중복되지 않는 키와 값의 쌍으로 이루어진 자료구조입니다.

## Set

> Set 객체는 중복되지 않은 unique한 값들의 집합입니다.

배열과 유사하지만 아래와 같은 차이점이 있습니다.

-   동일한 값을 중복하여 포함할 수 없습니다.
-   요소 순서에 의미가 없습니다.
-   인덱스로 요소에 접근할 수 없습니다.

#### Set 객체의 생성

> Set 객체는 Set 생성자 함수로 생성합니다.

Set 생성자 함수에 인수를 전달하지 않으면 빈 Set 객체가 생성됩니다.

```js
const set = new Set();

console.log(set); // Set(0) {}
```

Set 생성자 함수는 **이터러블**을 인수로 전달받아 Set 객체를 생성합니다.

이때 **이터러블의 중복된 값은 Set 객체에 저장되지 않습니다.**

```js
const set1 = new Set([1, 2, 2, 3, 3, 3]);
console.log(set1); // Set(3) { 1, 2, 3 }

const set2 = new Set('address');
console.log(set2); // Set(5) { 'a', 'd', 'r', 'e', 's' }
```

중복을 허용하지 않는 Set 객체의 특성을 활용하여 **배열에서 중복된 요소를 제거할 수 있습니다.**

```js
// Set을 이용한 배열의 중복 요소 제거
// Set은 이터러블이여서 스프레드 문법을 사용 가능합니다.
const unique = (arr) => [...new Set(arr)];

console.log(unique([1, 1, 2, 2, 2, 3, 4, 4])); // [ 1, 2, 3, 4 ]
```

#### 요소의 개수 확인

> Set.prototype.size 프로퍼티를 사용합니다.

```js
const { size } = new Set([1, 2, 2, 3, 3, 3]);

console.log(size); // 3
```

#### 요소 추가

> Set.prototype.add 메서드를 사용합니다.

`add` 메서드는 새로운 용소가 추가된 Set 객체를 반환합니다.

```js
const set = new Set();
console.log(set); // Set(0) {}

set.add('hi');
console.log(set); // Set(1) { 'hi' }
```

따라서 add 메서드를 호출한 이후에 add 메서드를 연속적으로 호출 가능합니다.

```js
const set = new Set();

set.add('hi').add('JungHEE');
console.log(set); // Set(2) { 'hi', 'JungHEE' }
```

Set 객체는 NaN과 NaN을 같다고 평가하여 중복 추가를 허용하지 않습니다.

이는 일치 비교 연산자가 `===`을 이용하여 NaN과 NaN을 다르다고 평가하는 것과 차이가 있습니다.

```js
const set = new Set();

console.log(NaN === NaN); // false
console.log(0 === -0); // true

set.add(NaN).add(NaN);
console.log(set); // Set(1) { NaN }

set.add(0).add(-0);
console.log(set); // Set(2) { NaN, 0 }
```

#### 요소의 존재 여부 확인

> Set.prototype.has 메서드를 사용합니다.

`has` 메서드는 특정 요소의 존재 여부를 나타내는 불리언 값을 반환합니다.

```js
const set = new Set([1, 2, 3]);

console.log(set.has(1)); // true
console.log(set.has(5)); // false
```

#### 요소 삭제

> Set.prototype.delete 메서드를 사용합니다.

`delete` 메서드는 삭제 성공 여부를 나타내는 **불리언 값을 반환합니다.**

인덱스가 아니라 삭제하려는 요소값을 인수로 전달해야 합니다.

왜냐하면 Set 객체는 순서에 의미가 없고 그래서 인덱스를 갖지 않기 때문입니다.

```js
const set = new Set([1, 2, 3]);

set.delete(2);
console.log(set); // Set(2) { 1, 3 }

set.delete(1);
console.log(set); // Set(1) { 3 }
```

연속적 호출이 불가능합니다. 왜냐하면 `add` 메서드와 달리 `delete` 메서드는 불리언 값을 반환하기 때문입니다.

```js
const set = new Set([1, 2, 3]);

set.delete(2).delete(1);
console.log(set); // 🚫TypeError: set.delete(...).delete is not a function
```

#### 요소 일괄 삭제

> Set.prototype.clear 메서드를 사용합니다.

`clear` 메서드는 언제나 undefined를 반환합니다.

```js
const set = new Set([1, 2, 3]);

set.clear();
console.log(set); // Set(0) {}
```

#### 요소 순회

> Set.prototype.forEach 메서드를 사용합니다.

다음과 같은 3개의 인수를 전달 받습니다.

-   1번째 인수: 현재 순회중인 요소값
-   2번째 인수: 1번째 인수와 같다. (Array.prototype.forEach 메서드와 인터페이스를 통일하기 위함이며 다른 의미는 없습니다.)
-   3번째 인수: 현재 순회중인 Set 객체 자체

```js
const set = new Set([1, 2, 3]);

set.forEach((v1, v2, set) => console.log(v1, v2, set));

/*
1 1 Set(3) { 1, 2, 3 }
2 2 Set(3) { 1, 2, 3 }
3 3 Set(3) { 1, 2, 3 }
*/
```

**Set 객체는 이터러블입니다.**

따라서 `for...of` 문으로 순회 가능하며, 스프레드 문법과 배열 디스트럭처링의 대상이 됩니다.

```js
const set = new Set([1, 2, 3]);

// Set 객체는 Set.prototype의 Symbol.iterator 메서드를 상속받는 이터러블입니다.
console.log(Symbol.iterator in set); // true

// for...of 문으로 순회 가능합니다.
for (const v of set) {
    console.log(v); // 1 2 3
}

// 스프레드 문법의 대상이 될 수 있습니다.
console.log([...set]); // [ 1, 2, 3 ]

// 배열 디스트럭처링 할당의 대상이 됩니다.
const [x, ...rest] = set;
console.log(x, rest); // 1 [ 2, 3 ]
```

#### 교집합

```js
Set.prototype.intersection = function (set) {
    const result = new Set();

    for (const value of set) {
        // 2개의 set의 요소가 공통되는 요소이면 교집합의 대상이 됩니다.
        // 여기서 this는 미래의 생성할 인스턴스가 맞을까요?
        if (this.has(value)) result.add(value);
    }
    return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.intersection(setB)); // Set(2) { 2, 4 }
console.log(setB.intersection(setA)); // Set(2) { 2, 4 }
```

#### 합집합

```js
Set.prototype.union = function (set) {
    // this(Set 객체)를 복사합니다.
    const result = new Set(this);

    for (const value of set) {
        result.add(value);
    }
    return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.union(setB)); // Set(4) { 1, 2, 3, 4 }
console.log(setB.union(setA)); // Set(4) { 2, 4, 1, 3 }
```

#### 차집합

```js
Set.prototype.difference = function (set) {
    // this(Set 객체)를 복사합니다.
    const result = new Set(this);

    for (const value of set) {
        result.delete(value);
    }
    return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]); // Set(4) { 2, 4, 1, 3 }

console.log(setA.difference(setB)); // Set(2) { 1, 3 }
console.log(setB.difference(setA)); // Set(0) {}
```

#### 부분집합

```js
Set.prototype.isSuperset = function (subset) {
    for (const value of subset) {
        if (!this.has(value)) return false;
    }
    return true;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.isSuperset(setB)); // true
console.log(setB.isSuperset(setA)); // false
```

<br>

## Map

> 키와 값의 쌍으로 이루어진 컬렉션입니다.

객체와 유사하지만 다음과 같은 차이가 있습니다.

-   키로 객체를 포함한 모든 값을 사용할 수 있습니다.
-   이터러블입니다.
-   map.size로 요소의 개수를 확인합니다.

#### Map 객체의 생성

> Map객체는 Map 생성자 함수로 생성합니다.

Map 생성자 함수에 인수를 전달하지 않으면 빈 Map 객체가 생성됩니다.

```js
const map = new Map();
console.log(map); // Map(0) {}
```

Map 생성자 함수는 **이터러블**을 인수로 전달받아 Map 객체를 생성합니다.

이때 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 합니다.

```js
const map1 = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
]);

console.log(map1); // Map(2) { 'key1' => 'value1', 'key2' => 'value2' }
```

Map 생성자 함수의 인수로 전달한 이터러블에 중복된 키를 갖는 요소가 존재하면 값이 덮어씌워집니다.

**따라서 Map 객체는 중복된 키를 갖는 요소가 존재할 수 없습니다.**

```js
const map1 = new Map([
    ['key1', 'value1'],
    ['key1', 'value2'],
]);

console.log(map1); // Map(1) { 'key1' => 'value2' }
```

#### 요소의 개수 확인

> Map.prototype.size 프로퍼티를 사용합니다.

```js
const map1 = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
]);

console.log(map1.size); // 2
```

#### 요소 추가

> Map.prototype.set 메서드를 사용합니다.

```js
const map = new Map();
console.log(map); // Map(0) {}

map.set('key1', 'key2');
console.log(map); // Map(1) { 'key1' => 'key2' }
```

**Map 객체는 키 타입에 제한이 없습니다.**

따라서 객체를 포함한 모든 값을 키로 사용할 수 있습니다.

```js
const map = new Map();

const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

map.set(lee, 'developer').set(kim, 'UX designer');

console.log(map);

/*
Map(2) {
  { name: 'Lee' } => 'developer',
  { name: 'Kim' } => 'UX designer'
}
*/
```

#### 요소 취득

> Map.prototype.get 메서드를 사용합니다.

```js
const map = new Map();

const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

map.set(lee, 'developer').set(kim, 'UX designer');

console.log(map.get(lee)); // developer
console.log(map.get('key')); // undefined
```

#### 요소의 존재 여부 확인

> Map.prototype.has 메서드를 사용합니다.

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([
    [lee, 'developer'],
    [kim, 'UX designer'],
]);

console.log(map.has(lee)); // true
console.log(map.has('key')); // false
```

#### 요소 삭제

> Map.prototype.delete 메서드를 사용합니다.

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([
    [lee, 'developer'],
    [kim, 'UX designer'],
]);

map.delete(lee);
console.log(map); // Map(1) { { name: 'Kim' } => 'UX designer' }
```

#### 요소 일괄 삭제

> Map.prototype.clear 메서드를 사용합니다.

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([
    [lee, 'developer'],
    [kim, 'UX designer'],
]);

map.clear();
console.log(map); // Map(0) {}
```

#### 요소 순회

> Map.prototype.forEach 메서드를 사용합니다.

다음과 같은 3개의 인수를 전달 받습니다.

-   1번째 인수: 현재 순회중인 요소값
-   2번째 인수: 현재 순회중인 요소키
-   3번째 인수: 현재 순회중인 Map 객체 자체

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([
    [lee, 'developer'],
    [kim, 'UX designer'],
]);

map.forEach((v, k, map) => console.log(v, k, map));

/*
developer { name: 'Lee' } Map(2) {
  { name: 'Lee' } => 'developer',
  { name: 'Kim' } => 'UX designer'
}
UX designer { name: 'Kim' } Map(2) {
  { name: 'Lee' } => 'developer',
  { name: 'Kim' } => 'UX designer'
}
*/
```

**Map 객체는 이터러블입니다.**

따라서 `for...of` 문으로 순회 가능하며, 스프레드 문법과 배열 디스트럭처링의 대상이 됩니다.

```js
const lee = { name: 'Lee' };
const kim = { name: 'Kim' };

const map = new Map([
    [lee, 'developer'],
    [kim, 'UX designer'],
]);

// Map 객체는 Set.prototype의 Symbol.iterator 메서드를 상속받는 이터러블입니다.
console.log(Symbol.iterator in map); // true

// for...of 문으로 순회 가능합니다.
for (const entry of map) {
    console.log(entry);
}

/*
[ { name: 'Lee' }, 'developer' ]
[ { name: 'Kim' }, 'UX designer' ]
*/

// 스프레드 문법의 대상이 될 수 있습니다.
console.log([...map]);
/*
[
  [ { name: 'Lee' }, 'developer' ],
  [ { name: 'Kim' }, 'UX designer' ]
]
 */

// 배열 디스트럭처링 할당의 대상이 됩니다.
const [a, b] = map;
console.log(a, b); // [ { name: 'Lee' }, 'developer' ] [ { name: 'Kim' }, 'UX designer' ]
```
