---
title: "WebComponent (01) - Get Started"
toc: true
toc_sticky: true
categories:
  - javascript
tags:
  - javascript
  - webcomponent
---

컴포넌트는 최신 웹 애플리케이션의 빌딩블럭이다. 즉, 웹 컴포넌트는 웹 애플리케이션 제작 시에 사용 가능한 부품(Component)을 말하며, 재사용을 목적으로 캡슐화 된 커스텀 HTML 요소를 만들 수 있는 웹 플랫폼 API 세트를 말한다. 표준 HTML, DOM 기술 사양에 추가된 웹 컴포넌트 기술을 사용하면 HTML/CSS/JavaScript를 사용하여 재사용 가능한 컴포넌트를 제작할 수 있다.

웹 컴포넌트를 만들기 위해 구성해야 하는 주요 요소는 다음과 같다. 
* Custom Elements
* Shadow DOM 


# Custom Elememt 
사용자 정의 요소를 사용하면 개발자가 HTML을 확장하고 고유한 태그를 만들 수 있다. 사용자 정의 요소는 표준 기반이기 때문에 웹의 기본 제공 구성 요소 모델에서 이점을 얻는다. 그 결과 다양한 컨텍스트에서 재사용할 수 있는 보다 모듈화된 코드가 생성된다.


## 훓어보기 
커스텀 엘리먼트를 만드는 과정을 가볍게 훓어보자. 

* HTMLElement를 상속 받는아 JavaScript class를 작성한다. 
* window.customElements.define()를 사용하여 커스텀 엘리먼트를 등록한다. 
* Custom element를 HTML에서 사용한다. 


HTMLElement를 상속받는 클래스를 정의한다. 
```javascript
class MyElement extends HTMLElement { 
 // .... 
}
```
Custom Element를 사용하기 위해서 window.customElements.define()를 사용하여 커스텀 엘리먼트를 등록한다. 
```javascript
<script>
  class MyElement extends HTMLElement { 
   // .... 
  }
  window.customElements.define("my-element", MyElement);
</script>
```

define()으로 등록할 때 생성한 이름으로 HTML에 요소를 선언하여 사용한다. 

**사용자 정의 요소 생성 규칙**
* 이름에는 대시(-)가 포함되어야 한다. <tabs>나 <foo_bar>는 안된다.
* 동일한 태그를 두 번 이상 등록할 수 없다.
* 정의 요소는 자동으로 닫힐 수 없습니다 . 항상 닫는 태그( <my-element></my-element>)를 작성한다.


```html
<html>
  <body>
    <my-element></my-element>
  </body>
</html>
```


## Custom Element 작성 
### 시작하기 

**생성자를 만든다.** 
생성자를 만들고 제일먼저 super()를 두어 부모 생성자를 호출하도록 한다. 
```javascript
class MyElement extends HTMLElement { 
  constructor() {
    super();
  }
}
```

**connectedCallback 함수를 작성한다.** 
connectedCallback()은 요소가 DOM에 삽입될 때마다 호출된다. 리소스 가져오기 또는 렌더링과 같은 설정 코드를 실행하는 데 유용하다. 일반적으로 이 시간까지 작업을 미루도록 노력해야 한다

```javascript
class MyElement extends HTMLElement { 
  constructor() {
    super();
  }
  connectedCallback() {
    this.render(); // 요소를 그린다. 
  }
}
```

**요소를 그리기 위해 render() 함수를 작성한다.** 
this.innerHTML을 사용하여 요소를 그리는 마크업을 작성한다. 

```javascript
  render() {
    this.innerHTML = `
              <h1>hello</h1>
              `;
  }
```

**모으기** 
전체코드는 다음과 같다. 
```html
  <body>
    <my-element></my-element>
    <script>
      class MyElement extends HTMLElement {
        constructor() {
          super();
        }
        connectedCallback() {
          this.render(); // 요소를 그린다.
        }
        render() {
          this.innerHTML = `
            <h1>hello</h1>`;
        }
      }
      window.customElements.define("my-element", MyElement);
    </script>
  </body>
````




### Property 사용하기 
**title 속성을 만든다.** 
title 속성에 대한 getter를 정의한다. 

```javascript
class MyElement extends HTMLElement {
  get title() {
    return this.getAttribute("title");
  }
}
```




**title 속성 사용하기** 
${}을 사용하여 render() 함수에 title을 표시한다. 
```javascript
render() {
    this.innerHTML = `
      <h1>${this.title}</h1>`;
}
```

**attribute 설정**
custom element에 title attribue값을 설정한다. 
```html
<my-element title="MyElement"></my-element>
```
화면에 "MyElement"가 표시될 것이다. 


### attribute 변경 관찰하기 
관찰할 attribute를 정의하기 위해 observedAttributes() 정적 함수를 구현한다. 
```javascript
static get observedAttributes() {
  return ["title"];
}
```
attribute가 추가, 제거, 업데이트, 교체되었을 때 호출되는 attributeChangedCallback() 함수를 구현한다. 
```javascript
attributeChangedCallback(attrName, oldVal, newVal) {
  this.render();
}
```
커스텀 요소 밖에서 title attribue를 변경할 수 있도록 setter를 정의한다. 
```javascript
set title(val) {
  this.setAttribute("title", val);
}
```
이제 title을 변경해 보자.

button 요소를 하나 생성한다. 
```html
<my-element id="my-element" title="MyElement2"></my-element>
<div>
  <button id="btn">Chagne Title</button>
</div>
```
버튼 클릭 이벤트 리스너를 추가하고 커스텀 요소를 구한 다음에 title을 변경한다. 
```javascript
    window.addEventListener("load", () => {
        let btn = document.querySelector("#btn");
        btn.addEventListener("click", () => {
          let myele = document.querySelector("#my-element");
          myele.title = "Latte";
        });
      });
```      
커스텀 요소에 변경된 타이트롤 표시되는 것을 확인할 수 있을 것이다. 

**전체코드** 
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <my-element id="my-element" title="MyElement2"></my-element>
    <div>
      <button id="btn">Chagne Title</button>
    </div>
    <script>
      class MyElement extends HTMLElement {
        constructor() {
          super();
        }
        connectedCallback() {
          this.render(); // 요소를 그린다.
        }
        get title() {
          return this.getAttribute("title");
        }
        set title(val) {
          this.setAttribute("title", val);
        }
        static get observedAttributes() {
          return ["title"];
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
          //alert("changed");
          this.render();
        }
        render() {
          this.innerHTML = `
            <h1>${this.title}</h1>`;
        }
      }
      window.customElements.define("my-element", MyElement);

      window.addEventListener("load", () => {
        let btn = document.querySelector("#btn");
        btn.addEventListener("click", () => {
          let myele = document.querySelector("#my-element");
          myele.title = "Latte";
        });
      });
    </script>
  </body>
</html>
```

* this는 DOM element 자체를 의미한다. 이 예시에서 <my-element>를 참조한다.
* 전체 DOM API는 element code 내에서 유효하다.
* 요소의 properties에 접근하려면 this를 사용한다.




### Properties와 Attributes
**attribute**
다음의 마크업을 보자. href는  \<a\> 태그의 attribute이다. 
```html
<a href="http://www.naver.com">
```
attribute에 값을 변경하려면 javascript에서 다음과 같이 할 수 있다. 이것은 attribute로서 그 값을 live DOM에 적용한다. 
```javascript
aEle.href="http://www.google.com";
```

**property** 
사용자 요소를 정의할 때 title이라는 getter를 만들었다. 이것은 클래스의 property이다. 
```javascript
get title() {
  return this.getAttribute("title");
}
```
**property를 attribute에 반영하기** 
JavaScript에서 property를 변경하려면 setter를 구현한다. 
```javascript
set title(val) {
  this.setAttribute("title", val);
}
```
그러면 다음과 같이 property를 attribute에 반영할 수 있다. 
```javascript
myele.title = 'Latte'; 
```

### 요소 업그레이드(Element upgrades) 
이미 customElemtns.define()를 호출하여 커스텀 요소를 정의하는 방법을 배웠다. 그러나 이것은 한 번에 사용자 요소를 define + register 해야 하는 것은 아니다. 

**사용자 요소는 정의가 등록되기 전에 사용될 수 있다.** 

진보적인 확장(progressive enhancement)는 사용자 요소의 특징이다. 다른말로 , 한 페이지에 \<app-arawer\> 요소들의 묶음을 선언할 수 있고 훨씬 이후까지 customEmements.define('app-drawer',...)를 invoke하지 않을 수 있다. 이것은 unkonwn tags 덕분에 브라우저가 잠재적인 사용자 요소들을 다르게 다룰 수 있다.  define()을 호출하는 과정과 존재하는 요소에 클래스 정의를 부여하는 것을 'element upgreade'라고 부른다. 

tag name이 정의될 때를 알기 위해서, window.customElements.whenDefined()를 사용할 수 있다. 그것은 정의될 때 resolve하는 Promise를 반환한다. 

```javascript
window.customElements.whenDefined("my-element").then(() => {
  console.log("custom element registered.");
});
```

### 요소에서 정의된 컨텐트(Element-defined content)
사용자 요소들은 DOM API를 사용하여 그들 자신의 컨텐트(content)를 관리할 수 있다. 

**예시: 몇가지 기본 HTML로 요소를 생성하기** 
```javascript
customElements.define('x-foo-with-markup', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
  }
  ...
});
```
이 태그를 선언하는 것은 다음을 생성할 것이다. 
```html
<x-foo-with-markup>
 <b>I'm an x-foo-with-markup!</b>
</x-foo-with-markup>
```

### Custom Element Reaction 

| Name | called when |
|---|---|
|**constructor** | 요소의 인스턴스가 생성되거나 업그레이드 된다. 상태 초기화, 이벤트 리스터 설정 또는 새로두 dom 생성에 유용하다. |
|**connectedCallback**| 요소가 DOM에 삽입될 때마다 호출된다. 리소스 가져오기 또는 렌더링과 같은 설정 코드를 실행하는 데 유용하다. 일반적으로 이 시간까지 작업을 미루도록 노력해야 한다. |
|**disconnectedCallback**| DOM에서 요소가 제거될 때마다 호출된다. 정리 코드를 실행하는 데 유용하다. |
|**attributeChangedCallback(attrName, oldVal, newVal)** | 관찰된 속성 이 추가, 제거, 업데이트 또는 교체 되었을 때 호출된다.. 요소가 파서에 의해 생성되거나 업그레이드 될 때 초기 값에 대해서도 호출된다.|

> 참고: 속성에 나열된 속성만 observedAttributes이 콜백을 받는다. 

반응 콜백은 동기식 이다.  누군가가 el.setAttribute() 요소를 호출 하면 브라우저는 즉시 을 호출 attributeChangedCallback()을 호출한다. 마찬가지로 disconnectedCallback()DOM에서 요소가 제거된 직후(예: 사용자가 호출 el.remove())를 받게 된다. 

# \<template\>로부터 요소 생성
\<template\> tag를 사용하여 사용자 요소를 생성할 수 있다.  HTML에 다음과 같이 마크업을 생성한다. 
```html
<template id="my-template">
  <h1>Template</h1>
</template>
```

사용자 요소에서 Shadow DOM을 사용하기 위해서,  this.attachShadow를 constructor 내부에서 호출한다. shadow DOM은 나중에 알아보기로 하자. 
```javascript
class MyElement extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({ mode: "open" });
    let tmpl = document.querySelector("#my-template");
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }
}
```
아래와 같이 JS 안에서 직접 템플릿을 사용할 수 있다. 
```javascript
let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>:host { ... }</style> <!-- look ma, scoped styles -->
  <b>I'm in shadow dom!</b>
  <slot></slot>
`;
```



# Shadow DOM을 사용한 요소 생성
앞에서 attachShadow 를 이용하여 Shadow Tree 를 생성하고 shadow root 에 요소들을 추가 하였다. 
```javascript
class MyElement extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({ mode: "open" });
    let tmpl = document.querySelector("#my-template");
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }
}
```
Shadow DOM은 요소가 페이지의 나머지 부분과 분리된 DOM 청크를 소유, 렌더링 및 스타일 지정하는 방법을 제공한다. ShadowDOM 은 일반적으로 DOM 노드를 만들어 다른 요소의 자식으로 추가하는 것과는 달리,요소에 연결은 되지만 독립된 범위가 지정된 DOM 트리를 만든다.

Shadow Host 가 생성되면 해당 DOM 트리의 shadow root 가 생성되고 그밑으로 독립적으로 생성된 element 들이 존재하게 된다.

**Shaodw DOM 특징**

* 자체적인 DOM 모델에서 작동한다. 일반적인 document.querySelector 로 Shaodw DOM 의 자식에 접근 할 수 없다.
* Shadow DOM 의 스타일규칙 역시 범위가 해당 Shadow DOM 으로 국한되어 있다.
* 브라우저가 이미 자체적으로 ShadowDOM 을 호출하는 있는 요소는 Shadow DOM 으로 호스팅 할 수 없다.

Shadow DOM에 대한 자세한 내용은 다른 포스트를 참고한다. 


# Source 

[https://codesandbox.io/s/javascript-00xbo](https://codesandbox.io/s/javascript-00xbo)

# References
[https://developers.google.com/web/fundamentals/web-components/customelements](https://developers.google.com/web/fundamentals/web-components/customelements)
[https://github.com/yamoo9/WebComponent](https://github.com/yamoo9/WebComponent) 
[https://alexband.tistory.com/53](https://alexband.tistory.com/53) 
[https://developer.mozilla.org/ko/docs/Web/Web_Components](https://developer.mozilla.org/ko/docs/Web/Web_Components) 





