## Ajax (Asynchronous JavaScript and XML)

> 웹 페이지를 동적으로 갱신하는 프로그래밍 방식을 말합니다.

**Ajax**는 브라우저에서 제공하는 Web API인 **XMLHttpRequest** 객체를 기반으로 동작합니다.

(참고로 계속 XML 단어가 나오는 이유는 과거의 마이크로소프트가 XML 위주로 개발을 했기 때문이지, 다른 타입의 데이터도 가능합니다.)

이 객체를 이용하면 간단하게 데이터를 서버에 요청하고 받아올 수 있는 것이죠.

XMLHttpRequest는 HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공합니다.

Ajax는 전통적 방식에 비해 다음과 같은 장점이 있습니다.

-   **필요한 데이터만 서버로부터 전송받기에**, 불필요한 데이터 통신이 발생하지 않습니다.
-   변경할 필요가 없는 부분은 다시 렌더링하지 않습니다.(부드러운 화면 전환 효과)
-   서버와의 통신이 **비동기 방식으로 동작**하기에, 서버에게 요청을 보낸 이후 블록킹이 발생하지 않습니다.

<br>

## JSON (JavaScript Object Notation)

> HTTP 통신을 위한 텍스트 데이터 포맷입니다.

JSON은 데이터를 주고 받을 때 가장 간단한 포맷 중 하나입니다.

가장 큰 특징이자 장점은 바로 특정 언어에 종속되지 않기에, 대부분의 프로그래밍 언어에서 사용이 가능합니다. (independent programming language platform)

영어 이름에서도 알 수 있듯, 객체에서 착안했기에 객체 리터럴과 형태가 유사합니다.

바로 키와 값으로 구성된 순수한 텍스트의 형태이죠.

```json
{ "name": "Kim", "age": 27, "alive": true, "hobby": ["walking", "swimming"] }
```

앞으로 나올 내용은 서버에 요청을 할 때 어떻게 객체를 문자열로 변환하는지, 그리고 응답을 받을 때 어떻게 문자열 포맷을 객체로 변환하는지에 대한 내용입니다.

### JSON.stringify

> 객체를 JSON 포맷의 문자열로 변환합니다.

클라이언트가 서버로 객체를 전송하려면 객체를 문자열화 하는데 이를 **직렬화(serializing)** 라고 합니다.

❓ 직렬화는 왜 필요한 걸까요?

기기마다 다른 가상 메모리 주소 공간을 가지기 때문에 참조형 타입의 데이터들은 전달할 수 없다고 합니다.

따라서 주소 값이 아닌, Byte 형태(기본 원시 타입)로 직렬화된 데이터를 전달해야 파싱 가능한 데이터가 된다고 합니다.

```js
let json = JSON.stringify(value[, replacer, space])
// value: 인코딩 하려는 값
// replacer: JSON으로 인코딩 하길 원하는 프로퍼티가 담긴 배열. 또는 매핑 함수 function(key, value)
// space: 서식 변경 목적으로 사용할 공백 문자 수
```

```js
const cat = {
    name: 'Navi',
    color: 'white',
    size: null,
    age: 3,
    birthDate: new Date(),
    eat: () => {
        console.log(`${name} is eat!!`);
    },
};

const json = JSON.stringify(cat);
console.log(typeof json, json);
// string {"name":"Navi","color":"white","size":null,"birthDate":"2022-10-28T09:42:30.336Z"}

// 객체를 JSON 포맷의 문자열로 변환하면서 들여쓰기 합니다.
const preetyJson = JSON.stringify(cat, null, 2);
console.log(typeof preetyJson, preetyJson);
/*
string {
  "name": "Navi",
  "color": "white",
  "size": null,
  "birthDate": "2022-10-28T09:42:30.336Z"
}
*/

// replacer 함수. 값의 타입이 Number이면 필터링되어 반환되지 않습니다.
function filter(key, value) {
    // undefined: 반환하지 않습니다.
    return typeof value === 'number' ? undefined : value;
}

// JSON.strignify 메서드에 두 번째 인수로 replacer 함수를 전달합니다.
const strFilteredObject = JSON.stringify(cat, filter, 2);
console.log(typeof strFilteredObject, strFilteredObject);
/**
 string {
  "name": "Navi",
  "color": "white",
  "size": null,
  "birthDate": "2022-10-28T09:46:47.382Z"
}
 */
```

JSON.stringify 메서드는 객체 뿐 아니라, 배열도 JSON 포맷의 문자열로 변환합니다.

```js
const todos = [
    { id: 1, content: 'JS', completed: true },
    { id: 2, content: 'Reat', completed: false },
    { id: 3, content: 'Next.js', completed: false },
];

const json = JSON.stringify(todos, null, 2);
console.log(json);
/*
[
  {
    "id": 1,
    "content": "JS",
    "completed": true
  },
  {
    "id": 2,
    "content": "Reat",
    "completed": false
  },
  {
    "id": 3,
    "content": "Next.js",
    "completed": false
  }
]
*/
```

### JSON.parse

> JSON 포맷의 문자열을 객체로 변환합니다.

문자열을 객체로서 사용하려면 JSON 포맷의 문자열을 객체화해야하는데 이를 **역직렬화(deserializing)** 라고 합니다.

```js
const cat = {
    name: 'Navi',
    color: 'white',
    size: null,
    age: 3,
    birthDate: new Date(),
    eat: () => {
        console.log(`${name} is eat!!`);
    },
};

// 객체를 JSON 포맷의 문자열로 변환합니다.
const json = JSON.stringify(cat);

// JSON 포맷의 문자열을 객체로 변환합니다.
const parsed = JSON.parse(json);
console.log(typeof parsed, parsed);
/*
object {
  name: 'Navi',
  color: 'white',
  size: null,
  age: 3,
  birthDate: '2022-10-28T10:11:36.650Z'
}
*/
```

만약 배열이 JSON 포맷의 문자열로 변환되어 있는 경우 JSON.parse는 문자열을 배열 객체로 변환합니다.

이때 배열의 요소가 객체인 경우 배열의 요소까지 객체로 변환합니다.

```js
const todos = [
    { id: 1, content: 'JS', completed: true },
    { id: 2, content: 'Reat', completed: false },
    { id: 3, content: 'Next.js', completed: false },
];

const json = JSON.stringify(todos);

const parsed = JSON.parse(json);
console.log(typeof parsed, parsed);
/*
object [
  { id: 1, content: 'JS', completed: true },
  { id: 2, content: 'Reat', completed: false },
  { id: 3, content: 'Next.js', completed: false }
]
*/
```

<br>

## XMLHttpRequest

기본적으로 브라우저는 주소창이나 HTML form 태그 또는 a 태그를 통해 HTTP 요청 전송 기능을 제공합니다.

자바스크립트를 사용하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용해야합니다.

XMLHttpRequest 객체는 HTTP 요청 전송과 응답 수신을 위한 다양한 메서드와 프로퍼티를 제공합니다.

### XMLHttpRequest 생성

```js
const xhr = new XMLHttpRequest();
```

<br>

### XMLHttpRequest 객체의 프로퍼티와 메서드

#### XMLHttpRequest 객체의 프로퍼티

-   readyState: HTTP 요청의 현재 상태를 나타내는 정수입니다.
    -   UNSENT:0 -> open 메서드 호출 이전
    -   OPENED:1 -> open 메서드 호출 이후
    -   HEADERS_RECEIVED:2 -> send 메서드 호출 이후
    -   LOADING: 3 -> 서버 응답 중
    -   DONE: 4 -> 서버 응답 완료

<br>

-   status: HTTP 요청에 대한 응답 상태를 나타내는 정수입니다. ex) 200

<br>

#### XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티

-   onreadystatechange: readyState 프로퍼티 값이 변경된 경우입니다.
-   onerror: HTTP 요청에 에러가 발생한 경우입니다.
-   onload: HTTP 요청이 성공적으로 완료한 경우입니다.

<br>

#### XMLHttpRequest 객체의 메서드

-   open: HTTP 요청 초기화
-   send: HTTP 요청 전송
-   setRequestHeader: 특정 HTTP 요청 헤더의 값을 설정

<br>

### HTTP 요청 전송

1. XMLHttpRequest.prototype.open 메서드로 HTTP 요청을 초기화합니다.
2. XMLHttpRequest.prototype.setRequestHeader 메서드로 특정 HTTP 요청의 헤더 값을 설정합니다.
3. XMLHttpRequest.prototype.send 메서드로 HTTP 요청을 전송합니다.

<br>

#### XMLHttpRequest.prototype.open

```js
XMLHttpRequest.open(method, url[, async[, user[, password]]])
```

매개변수는 다음과 같습니다.

-   method: HTTP 요청 메서드 (GET, POST 등)
-   url: HTTP 요청을 전송할 URL
-   async: 비동기 요청 여부

<br>

#### XMLHttpRequest.prototype.send

> open 메서드로 초기화된 HTTP 요청을 서버에 전송합니다.

GET, POST 요청 메서드에 따라 전송 방식에 차이가 있습니다.

-   GET: 데이터의 URL의 일부분인 쿼리 문자열로 서버에 전송합니다.
-   POST: 데이터(페이로드)를 몸체에 담아 전송합니다.

<br>

#### XMLHttpRequest.prototype.setRequestHeader

> 특정 HTTP 요청의 헤더 값을 설정합니다.

cf) HTTP 헤더는 클라이언트와 서버가 요청 또는 응답으로 부가적인 정보를 전송할 수 있도록 해줍니다.

setRequestHeader는 반드시 open 메서드 호출 이후에 호출해야합니다.

자주 사용하는 HTTP 요청 헤더는 Content-type과 Aceept가 있습니다.

Content-type은 HTTP 메시지에 보내는 데이터 형식을 알려주는 헤더입니다.

만약 Content-type 헤더가 없다면 데이터를 받는 입장에서 단순히 텍스트 데이터로 받아드립니다.

Accept는 서버에게 자신이 받을 수 있는 미디어 타입이 무엇인지 알려주기 위해 클라이언트가 사용합니다.

Content-type은 요청 몸체에 담아 전송할 데이터의 MIME 타입의 정보를 표현합니다.

-   text
-   application
-   multipart

```
MIME 타입이란 클라이언트에게 전송된 문서의 다양성을 알려주기 위한 메커니즘입니다
웹에서 파일의 확장자는 별 의미가 없습니다.
그러므로, 각 문서와 함께 올바른 MIME 타입을 전송하도록, 서버가 정확히 설정하는 것이 중요합니다.
브라우저들은 리소스를 내려받았을 때 해야 할 기본 동작이 무엇인지를 결정하기 위해 대게 MIME 타입을 사용합니다.
```

cf) 미디어 타입(media type), MIME 타입(MIME type), 콘텐츠 타입(content type)은 인터넷에 전달되는 파일 포맷과 포맷 콘텐츠를 위한 식별자이다.

```js
// XMLHttpRequest 객체를 생성합니다.
const xhr = new XMLHttpRequest();

// HTTP 요청을 초기화합니다.
xhr.open('GET', '/users');

// HTTP 요청 헤더를 설정합니다.
// 클라이언트가 서버로 전송할 데이터의 MIME 타입을 지정합니다: json
xhr.setRequestHeader('content-type', 'application/json');

// HTTP 요청 전송
xhr.send();
```

<br>

### HTTP 응답 처리

서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야합니다.

이는 XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티를 통해서 이루어집니다.

(onreadystatechange, onload, onerror)

예를 들어 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티 값이 변경된 경우 발생하는 readystatechange 이벤트를 캐치하여 HTTP 응답을 처리할 수 있습니다.

```js
// XMLHttpRequest 객체를 생성합니다.
const xhr = new XMLHttpRequest();

// HTTP 요청을 초기화합니다.
// Fake REST API 입니다.
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// HTTP 요청을 전송합니다.
xhr.send();

// readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가
// 변경될 때 마다 발생합니다.
xhr.onreadystatechange = () => {
    // readyState 프로퍼티는 HTTP 요청의 현재 상태를 나타냅니다.
    // readyState 프로퍼티 값이4가 아니면 서버 응답이 완료되지 않은 상태입니다.
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    // status 프로퍼티는 응답 상태 코드를 나타냅니다.
    // status 프로퍼티 값이 200이면 정상적으로 응답상태입니다.
    // 200이 아니면 에러가 발생한 상태입니다.
    // 정상적으로 응답한 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨있습니다.
    if (xhr.status === 200) {
        console.log(JSON.parse(xhr.response));
    } else {
        console.error('Error', xhr.status, xhr.statusText);
    }
};
```

onload 이벤트를 캐치해도 좋습니다.

load 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생합니다.

따라서 load 이벤트를 캐치하는 경우 xhr.readyState가 XMLHttpRequest.DONE인지 확인 할 필요가 없습니다.

```js
// XMLHttpRequest 객체를 생성합니다.
const xhr = new XMLHttpRequest();

// HTTP 요청을 초기화합니다.
// Fake REST API 입니다.
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

// HTTP 요청을 전송합니다.
xhr.send();

// load 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생합니다.
xhr.onload = () => {
    // status 프로퍼티는 응답 상태 코드를 나타냅니다.
    // status 프로퍼티 값이 200이면 정상적으로 응답상태입니다.
    // 200이 아니면 에러가 발생한 상태입니다.
    // 정상적으로 응답한 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨있습니다.
    if (xhr.status === 200) {
        console.log(JSON.parse(xhr.response));
    } else {
        console.error('Error', xhr.status, xhr.statusText);
    }
};
```
