## DOM 조작

> 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 or 교체하는 것을 말합니다.

DOM 조작에 의해 DOM에 새로운 노드가 추가되거나 삭제되면 리플로우와 리페인트가 발생하는 원인이 되기에 성능에 영향을 줍니다.

#### innerHTML

> 요소 노드의 HTML 마크업을 취득하거나 변경합니다.

요소 노드의 innerHTML 프로퍼티를 참조하면 요소 노드의 콘텐츠 영역 (시작태그와 종료 태그 사이)내에 포함된 모든 HTML 마크업을 <u>문자열</u>로 반환합니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <div id="foo">
            Hello
            <span>world!</span>
        </div>
        <script>
            // #foo 요소의 콘텐츠 영역 내의 HTML 마크업을 문자열로 취득합니다.
            console.log(document.getElementById('foo').innerHTML);
            //   Hello  <span>world!</span>
        </script>
    </body>
</html>
```

textContent 프로퍼티를 참조하면 HTML 마크업을 무시하고 텍스트만 반환하지만, innerHTML 프로퍼티는 **HTML 마크업이 포함된 문자열을 그대로 반환합니다.**

요소 노드의 innerHTML 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열에 포함되어 있는 HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM에 반영됩니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <div id="foo">
            Hello
            <span>world!</span>
        </div>
        <script>
            // HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM에 반영됩니다.
            document.getElementById('foo').innerHTML = 'Hi <span>there!</span>';
        </script>
    </body>
</html>
```

innerHTML 프로퍼티를 사용하면 HTML 마크업 문자열로 간단히 DOM 조작이 가능합니다.

이때 사용자로부터 입력받은 데이터를 그대로 innerHTML 프로퍼티에 할당하는 것은 **크로스 사이트 스크립팅 공격(XSS: Cross-Site Scripting Attacks )** 에 취약하므로 위험합니다.

왜냐하면 HTML 마크업 내에 자바스크립트 악성 코드가 포함되어 있다면 파싱 과정에서 그대로 실행될 가능성이 있기 때문입니다.

이를 막고자, HTML5는 innerHTML 프로퍼티로 삽입된 script 요소 내의 자바스크립트 코드를 실행하지 않습니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <div id="foo"></div>
        <script>
            // innerHTML 프로퍼티로 스크립트 태그를 삽입하여 자바스크립트가 실행되도록 합니다.
            // HTML5는 innerHTML 프로퍼티로 삽입된 script 요소 내의 자바스크립트 코드를 실행하지 않습니다.
            document.getElementById('foo').innerHTML = '<script>alert(document.cookie)</script>';
        </script>
    </body>
</html>

```

❗️하지만 scipt 요소 없이도 크로스 사이트 스크립팅 공격은 가능합니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <div id="foo"></div>
        <script>
            // 에러 이벤트를 강제로 발생시켜 자바스크립트 코드가 실행되도록 합니다.
            document.getElementById('foo').innerHTML =
                '<img src="x" onerror="alert(document.cookie)">';
        </script>
    </body>
</html>
```

innerHTML 프로퍼티의 단점을 정리하면 다음과 같습니다.

-   크로스 사이트 스크립팅 공격에 취약합니다.
-   유지되어도 좋은 기존의 자식 노드까지 모두 제거하고 다시 처음부터 새롭게 자식 노드를 생성하여 DOM에 반영합니다.
-   새로운 요소를 삽입할 때 삽입될 위치를 지정할 수 없습니다.

<br>

#### insertAdjacentHTML 메서드

> 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입합니다.

insertAdjacentHTML 메서드는 기존 요소에는 영향을 주지 않고 새롭게 삽입될 요소만을 파싱하여 자식 요소로 추가합니다.

첫번째 인수로 전달할 수 있는 문자열은 beforebegin, afterbegin, beforeend, afterend 입니다.

그기존의 자식 노드를 모두 제거하고 다시 처음부터 새롭게 자식 노드를 생성하여 자식요소로 추가하는 innerHTML 프로퍼티보다 효율적이고 빠릅니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <!-- beforebegin -->
        <div id="foo">
            <!-- afterbegin -->

            text
            <!-- beforeend -->
        </div>
        <!-- afterend -->
        <script>
            const $foo = document.getElementById('foo');

            $foo.insertAdjacentHTML('beforebegin', '<p>beforebegin</p>');
            $foo.insertAdjacentHTML('afterbegin', '<p>afterbegin</p>');
            $foo.insertAdjacentHTML('beforeend', '<p>beforeend</p>');
            $foo.insertAdjacentHTML('afterend', '<p>afterend</p>');
        </script>
    </body>
</html>
```

❗️그러나 innerHTML, insertAdjacentHTML 모두 HTML 마크업 문자열을 파싱하므로 **크로스 사이트 스크립팅 공격에 취약한 것은 동일합니다.**

## 어트리뷰트

#### 어트리뷰트 노드와 attributes 프로퍼티

HTML 요소는 여러 개의 **어트리뷰트(속성)** 를 가집니다.

HTML 어트리뷰트는 HTML 요소의 동작을 제어하기 위한 추가적인 정보를 제공하는 역할을 하게 됩니다.

```html
<input id="user" type="text" name="myInput" value="JungHee" />
```

HTML 문서가 파싱될때 HTML 요소의 어트리뷰트는 어트리뷰트 노드로 변환되어 요소 노드와 연결됩니다.

이때 HTML 어트리뷰트당 하나의 어트리뷰트 노드가 생성된다고 합니다.

즉 위의 예제는 총 4개의 어트리뷰트 노드가 생성되겠네요.

모든 어트리뷰트 노드의 참조는 NamedNodeMap 객체에 담겨서 요소 노드의 attribute 프로퍼티에 저장됩니다.

NamedNodeMap은 유사 배열 객체이자 이터러블입니다.

따라서 요소 노드의 모든 어트리뷰트 노드는 **요소 노드의 Element.prototype.attributes 프로퍼티로 취득** 할 수 있습니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <input id="user" type="text" name="myInput" value="JungHee" />
        <script>
            // 요소 노드의 attribute 프로퍼티는 요소 노드의 모든 어트리뷰트 노드의 참조가 담긴
            // NamedNodeMap 객체를 반환합니다.
            const { attributes } = document.getElementById('user');
            console.log(attributes);
            // NamedNodeMap {0: id, 1: type, 2: name, 3: value, id: id, type: type, name: name, value: value, length: 4}

            // 어트리뷰트 값 취득
            console.log(attributes.id); // user
            console.log(attributes.type); // text
            console.log(attributes.name); // myInput
            console.log(attributes.value); // JungHee
        </script>
    </body>
</html>
```

attribute 프로퍼티는 getter만 존재하는 읽기 전용 접근자 프로퍼티이며, 요소 노드의 모든 어트리뷰트 노드의 참조가 담긴 NamedNodeMap 객체를 반환합니다.

따라서 변경은 조금 힘들수도 있겠다는 유추를 해볼 수 있겠네요.

<br>

#### HTML 어트리뷰트 조작

앞에서 얘기한 것처럼 요소 노드의 attributes 프로퍼티는 getter만 존재하는 읽기 전용 접근자 프로퍼티이므로,

HTML 어트리뷰트 값을 취득할 수 있지만, 변경은 불가합니다.

그러나 **Element.prototype.getAttribute/setAttribute 메서드**를 사용하면 attribute 프로퍼티를 통하지 않고,요소 노드에서 메서드를 통해 직접 HTML 어트리뷰트 값을 취득하거나 변경할 수 있어서 편리합니다.

-   **HTML 어트리뷰트 값 참조:** Element.prototype.getAttribute (attributeName)
-   **HTML 어트리뷰트 값 변경:** Element.prototype.setAttribute (attributeName, attributeValue)
-   **HTML 어트리뷰트 존재 확인:** Element.prototype.hasAttribute (attributeName)
-   **HTML 어트리뷰트 삭제:** Element.prototype.removeAttribute

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <input id="user" type="text" name="myInput" value="JungHee" />
        <script>
            const $input = document.getElementById('user');
            // value 어트리뷰트 값 취득
            const inputValue = $input.getAttribute('value');
            console.log(inputValue); // JungHee

            // value 어트리뷰트 값 변경
            $input.setAttribute('value', 'Kim');
            console.log($input.getAttribute('value')); // Kim
        </script>
    </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <input id="user" type="text" name="myInput" value="JungHee" />
        <script>
            const $input = document.getElementById('user');
            // value 어트리뷰트 존재 확인
            if ($input.hasAttribute('value')) {
                // value 어트리뷰트 삭제
                $input.removeAttribute('value');
            }
            // value 어트리뷰트가 삭제되었습니다.
            console.log($input.hasAttribute('value'));
        </script>
    </body>
</html>
```

<br>

#### HTML 어트리뷰트 vs DOM 프로퍼티

아까의 예시를 다시 살펴보겠습니다.

```html
<input id="user" type="text" name="myInput" value="JungHee" />
```

위 요소가 파싱되어 생성된 요소 노드 객체에는 id, type, name, value 어트리뷰트에 대응하는 id, type, name, value라는 프로퍼티가 존재하며 이 **DOM 프로퍼티들은 HTML 어트리뷰트의 값을 초기값으로 가지고 있습니다.**

이 DOM 프로퍼티는 getter,setter 모두 존재하는 접근자 프로퍼티입니다.

따라서 DOM 프로퍼티는 참조와 변경이 가능합니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <input id="user" type="text" name="myInput" value="JungHee" />
        <script>
            const $input = document.getElementById('user');

            // 요소 노드의 value 프로퍼티 값을 변경한다.
            $input.value = 'Kim';

            // 요소 노드의 value 프로퍼티 값을 참조
            console.log($input.value); // Kim
        </script>
    </body>
</html>
```

근데 조금 이상하지 않나요?

앞에서 우리는 요소 노드의 attribute 프로퍼티에서도 어트리뷰트 값들을 볼 수 있었습니다.

즉, HTML 어트리뷰트는 다음과 같이 DOM에서 중복 관리되어 있는 것처럼 보입니다.

-   요소 노드의 attributes 프로퍼티에서 관리하는 어트리뷰트 노드
-   HTML 어트리뷰트에 대응하는 요소 노드의 프로퍼티 (DOM 프로퍼티)

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <input id="user" type="text" name="myInput" value="JungHee" />
        <script>
            const $input = document.getElementById('user');

            // attribute 프로퍼티에 저장된 value 어트리뷰트 값
            console.log($input.getAttribute('value')); // JungHee

            // 요소 노드의 value 프로퍼티에 저장된 value 어트리뷰트 값
            console.log($input.value); // JungHee
        </script>
    </body>
</html>
```

결론부터 말씀드리면 **요소 노드의 초기 상태는 어트리뷰트 노드가 관리하며, 요소 노드의 최신 상태는 DOM 프로퍼티가 관리하게 됩니다.**

##### 어트리뷰트 노드

HTML 어트리뷰트의 역할은 HTML 요소의 **초기 상태를 지정하는 것입니다.**

어트리뷰트 노드에서 관리하는 어트리뷰트 값은 사용자의 입력에 의해 상태가 변경되어도 변하지 않고, HTML 어트리뷰트로 지정한 HTML 요소의 초기 상태를 그대로 유지합니다.

어트리뷰트 노드가 관리하는 초기 상태 값을 취득하거나 변경하려면 getAttribute/setAttribute 메서드를 사용합니다.

getAttribute 메서드로 취득한 값은 어트리뷰트 노드에서 관리하는 HTML 요소에 지정한 어트리뷰트 값, 즉 **초기값입니다.**

setAttribute 메서드는 어트리뷰트 노드에서 관리하는 HTML 요소에 지정한 어트리뷰트 값, 즉 **초기 상태 값을 변경**합니다.

##### DOM 프로퍼티

사용자가 입력한 **최신 상태는 HTML 어트리뷰트에 대응하는 요소 노드의 DOM 프로퍼티가 관리합니다.**

DOM 프로퍼티는 사용자의 입력에 의한 상태 변화에 반응하여 언제나 최신 상태를 유지합니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <input id="user" type="text" name="myInput" value="JungHee" />
        <script>
            const $input = document.getElementById('user');

            // 사용자가 input 요소의 입력 필드에 값을 입력할 때마다 input 요소 노드의 value 프로퍼티 값,
            // 즉 최신 상태 값을 취득합니다. value 프로퍼티 값은 사용자의 입력에 의해 동적으로 변경됩니다.
            $input.oninput = () => {
                console.log('value 프로퍼티 값', $input.value);
            };

            // getAttribute 메서드로 취득한 HTML 어트리뷰트 값, 즉 초기 상태 값은 변하지 않고 유지됩니다.
            console.log('value 어트리뷰트 값', $input.getAttribute('value'));
        </script>
    </body>
</html>
```

DOM 프로퍼티에 값을 할당하는 것은 HTML 요소의 **최신 상태 값을 변경**하는 것을 의미합니다.

즉, 사용자가 상태를 변경하는 행위와 같습니다.

이때 HTML 요소에 지정한 어트리뷰트 값에는 어떤 영향도 주지 않습니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <input id="user" type="text" name="myInput" value="JungHee" />
        <script>
            const $input = document.getElementById('user');

            // DOM 프로퍼티에 값을 할당하여 HTML 요소의 최신 상태를 변경합니다.
            $input.value = 'Kim';

            // getAttribute 메서드로 취득한 HTML 어트리뷰트 값, 즉 초기 상태 값은 변하지 않고 유지됩니다.
            console.log($input.getAttribute('value')); // JungHee
        </script>
    </body>
</html>
```

살짝 조심해야할 지점은 사용자 입력에 의한 상태 변화와 관계있는 DOM 프로퍼티 최신 상태 값을 관리한다는 점입니다.

그 외의 사용자 입력에 의한 상태 변화와 관계 없는 어트리뷰트와 DOM 프로퍼티는 항상 동일한 값으로 연동됩니다.

예를 들어 사용자 입력에 의한 상태 변화와 관계없는 id 어트리뷰트와 id 프로퍼티는 사용자 입력과 관계없이 항상 동일한 값을 유지합니다.

즉, id 어트리뷰트 값이 변하면 id 프로퍼티 값도 변하고 그 반대도 마찬가지입니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <input id="user" type="text" name="myInput" value="JungHee" />
        <script>
            const $input = document.getElementById('user');

            // id 어트리뷰트와 id 프로퍼티는 사용자 입력과 관계없이 항상 동일한 값으로 연동합니다.
            $input.id = 'foo';

            console.log($input.id); // foo
            console.log($input.getAttribute('id')); // foo
        </script>
    </body>
</html>
```

<br>

#### data 어트리뷰트와 dataset 프로퍼티

> HTML 요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트 간에 데이터를 교환할 수 있습니다.

data 어트리뷰트는 data-user-id, data-role과 같이 data- 접두사 다음에 임의의 이름을 붙여서 사용하게 됩니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <ul class="users">
            <li id="'1" data-user-id="1234" data-role="admin">CEO</li>
            <li id="'2" data-user-id="9876" data-role="subscriber">직원1</li>
        </ul>
        <script>
            // HTMLColleciton은 유사배열 객체이므로, 배열 메서드를 사용하기 위해 배열안에 복사해줍니다.
            const users = [...document.querySelector('.users').children];

            console.log(users); // [li#'1, li#'2]

            // user-id가 '9876'인 요소 노드를 취득합니다.
            const user = users.find((user) => user.dataset.userId === '9876');

            // user-id가 '9876'인 요소 노드에서 data-role의 값을 취득합니다.
            console.log(user.dataset.role); // subscriber

            // user-id가 '9876'인 요소 노드의 data-role의 값을 변경합니다.
            user.dataset.role = 'admin';

            // dataset 프로퍼티는 DOmStringMap 객체를 반환합니다.
            console.log(user.dataset); // DOMStringMap {userId: '9876', role: 'admin'}
        </script>
    </body>
</html>
```

data 어트리뷰트의 data- 접두사 다음에 존재하지 않는 이름을 키로 사용하여 dataset 프로퍼티에 값을 할당하면 HTML 요소에 data 어트리뷰트가 추가됩니다.

```html
<!DOCTYPE html>
<html lang="ko">
    <body>
        <ul class="users">
            <li id="'1" data-user-id="1234">CEO</li>
            <li id="'2" data-user-id="9876">직원1</li>
        </ul>
        <script>
            const users = [...document.querySelector('.users').children];

            // user-id가 '9876'인 요소 노드를 취득합니다.
            const user = users.find((user) => user.dataset.userId === '9876');

            // user-id가 '9876'인 요소 노드에 새로운 data 어트리뷰트를 추가합니다.
            user.dataset.role = 'admin';
            console.log(user.dataset);
            // DOMStringMap {userId: '9876', role: 'admin'}
        </script>
    </body>
</html>
```
