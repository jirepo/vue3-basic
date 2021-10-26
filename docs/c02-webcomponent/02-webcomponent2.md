---
title: "WebComponent (02) - Shadow DOM"
toc: true
toc_sticky: true
categories:
  - javascript
tags:
  - javascript
  - webcomponent
---


Shadow DOM은 웹 앱 구축의 취약성을 제거합니다. HTML, CSS 및 JS의 글로벌 특성에서 비롯됩니다. 지난 몇 년 동안 우리는 엄청난 발명 한 수 의 도구 문제를 회피 할 수있다. 예를 들어 새 HTML ID/클래스를 사용할 때 페이지에서 사용하는 기존 이름과 충돌할지 여부는 알 수 없습니다. 미묘한 버그가 발생하고 CSS 특수성이 큰 문제가 되며( !important모든 것이!) 스타일 선택기가 제어 할 수 없게 되고 성능이 저하될 수 있습니다 . 목록은 계속됩니다.

Shadow DOM은 CSS와 DOM을 수정합니다 . 웹 플랫폼에 범위 스타일 을 도입 합니다. 도구나 명명 규칙 없이 CSS를 마크업으로 묶고 , 구현 세부 정보를 숨기고, 바닐라 JavaScript에서 자체 포함된 구성 요소 를 작성할 수 있습니다 .



Shadow DOM은 HTML 템플릿 , Shadow DOM 및 사용자 정의 요소 의 세 가지 웹 구성 요소 표준 중 하나입니다 

Shadow DOM은 component-based app을 구축하기 위한 도구로서 설게되었다. 그러므로 이것은 웹 개발에서 일반적인 문제들에 대한 솔루션을 가져온다. 

* Isolated DOM(격리된 DOM): 구성 요소의 DOM은 자체 포함된다(Self-conatined). 
* Scoped CSS: hadow DOM 내부에 정의된 CSS는 범위가 지정됩니다. 스타일 규칙은 새지 않고 페이지 스타일은 새지 않습니다.
* 구성 : 구성 요소에 대한 선언적 마크업 기반 API를 디자인합니다.
* CSS 단순화 - 범위 지정 DOM은 간단한 CSS 선택기, 보다 일반적인 ID/클래스 이름을 사용할 수 있으며 이름 충돌에 대해 걱정할 필요가 없음을 의미합니다.

# Shadow DOM은 무엇인가? 

**DOM에 대한 배경**

브라우저가 웹 페이지를 로드할 때 많은 흥미로운 작업을 수행합니다. 그것이 하는 일 중 하나는 작성자의 HTML을 라이브 문서로 변환하는 것입니다. 기본적으로 페이지의 구조를 이해하기 위해 브라우저는 HTML(정적 텍스트 문자열)을 데이터 모델(객체/노드)로 구문 분석합니다. 브라우저는 DOM이라는 노드의 트리를 만들어 HTML의 계층 구조를 유지합니다. DOM의 멋진 점은 페이지의 라이브 표현이라는 것입니다. 우리가 작성한 정적 HTML과 달리 브라우저에서 생성된 노드에는 속성, 메서드가 포함되어 있으며 무엇보다도...프로그램으로 조작할 수 있습니다! 이것이 바로 JavaScript를 사용하여 DOM 요소를 직접 생성할 수 있는 이유입니다.

```javascript
const header = document.createElement('header');
const h1 = document.createElement('h1');
h1.textContent = 'Hello DOM';
header.appendChild(h1);
document.body.appendChild(header);
```
다음의 HTML 마크업을 생성한다. 
```html
<body>
  <header>
    <h1>Hello DOM</h1>
  </header>
</body>
```


Shadow DOM은 1) 생성/사용 방법과 2) 페이지의 나머지 부분과 관련하여 동작하는 방법의 두 가지 차이점이 있는 일반 DOM입니다. 일반적으로 DOM 노드를 만들고 다른 요소의 자식으로 추가합니다. shadow DOM을 사용하면 요소에 연결되지만 실제 자식과 분리되는 범위가 지정된 DOM 트리를 만듭니다. 이 범위가 지정된 하위 트리를 그림자 트리 라고 합니다 . 연결된 요소는 섀도우 호스트 입니다. 

그것에 붙여진(attached) 요소는 그것의 shadow host이다. shadows에 붙여진 어떤 것이던 hosting 요소에 대해 지역적(local)이다.  이것은 shadow DOM이 영역이 분리된 CSS를 얻는 방법이다. 


# Shadow DOM 생성 
shadow root는 "host" 요소에 붙여진 문서 조각이다. shadow root를 붙이는 것은 요소가 그것의 shadow DOM을 얻는 방법이다. 요소를 위해  shadow DOM을 생성하기 위해, element.attachShadow()을 호출한다. 

```javascript
const header = document.createElement('header');
const shadowRoot = header.attachShadow({mode: 'open'});
shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>'; // Could also use appendChild().

// header.shadowRoot === shadowRoot
// shadowRoot.host === header
```
shadow root를 채우기 위해 .innerHTML을 사용하고 있다. 그러나 다른 DOM API를 사용할 수도 있다. 

아래는 동작하지 않는다. 
```javascript
document.createElement('input').attachShadow({mode: 'open'});
// Error. `<input>` cannot host shadow dom.
```
몇가지 이유가 있다.
* 브라우저는 요소를 위한 이미 자신만의 내부의 shadow DOM을 호스트하고(\<textarea\>, \<input\>)
* 요소가 shadow DOM(\<img\>) 을 호스트하는 것은 말이 안된다. 



## 사용자 요소(custom element)을 위한 shadow DOM 생성 
Shadow DOM은 특별히 custom elements를 만들 때 유용하다. 요소의 HTML, CSS, JS를 구분하기위해서 shadow DOM을 사용한다. 

예시 - 사용자 요소는 shadow DOM을 자신에게 붙이고, DOM/CSS를 인캡슐레이팅한다. 


```javascript
// Use custom elements API v1 to register a new HTML tag and define its JS behavior
// using an ES6 class. Every instance of <fancy-tab> will have this same prototype.
customElements.define('fancy-tabs', class extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.

    // Attach a shadow root to <fancy-tabs>.
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>#tabs { ... }</style> <!-- styles are scoped to fancy-tabs! -->
      <div id="tabs">...</div>
      <div id="panels">...</div>
    `;
  }
  ...
});
```


# Composition and slots 
Composition은 shadow DOM에서 가장 이해되지 않는 특징 중의 하나이다. 그러나 가장 중요하다. 웹개발에서, composition은 선언적으로 HTML 외부에서 apps을 구성하는 방법이다. 다른 빌딩 블럭(div, header, form, input)은 app을 구성하기 위해서 합쳐진다. 이런 태그들의 일부는 심지어 서로 함께 동작한다. 

Composition은 select, details, form, video와 같은 native 요소들이 매우 유연한 이유이다. 그런 태그들의 각각은 자식으로서 확실한 HTML을 허용하고 그것들과 함께 특별한 어떤 것들을 허용한다. 예를들어, select는 option과 optgroup을 렌더링하는 방법을 안다. 

**용어: light DOM vs shadow DOM**

**Light DOM**
당신의 컴포넌트가 쓰는 마크업.  이 DOM은 컴포넌트의 shadow DOM의 바깥에 산다. 그것은 요소의 실제 자식들이다. 
```html
<better-button>
  <!-- the image and span are better-button's light DOM -->
  <img src="gear.svg" slot="icon">
  <span>Settings</span>
</better-button>
```

**shadow DOM** 
컴포넌트의 저자가 쓰는 DOM. DOM은 컴포넌트에 지역적이고 그것의 내부 구조을 정의한다.  CSS를 영역에 구분한다. 그리고 상세 구현은 캡슐화한다. 그것은 컴포넡의 소비자에 의새 부여받은 마크업을 렌더링 하는 방법을 정의할 수 있다. 

```html
#shadow-root
  <style>...</style>
  <slot name="icon"></slot>
  <span id="wrapper">
    <slot>Button</slot>
  </span>
```


**Flattened DOM tree**
사용자의 light DOM을 당신의 shadow DOM에 배포한 브라우저의 결과. 최종적으로 렌더링되는 것을 의미.  DevTools에서 궁극적으로 보는 것이고, 페이지에 렌더링 된 것이 flattened tree이다. 

```html
<better-button>
  #shadow-root
    <style>...</style>
    <slot name="icon">
      <img src="gear.svg" slot="icon">
    </slot>
    <span id="wrapper">
      <slot>
        <span>Settings</span>
      </slot>
    </span>
</better-button>
```


### \<slot\> element
Shadow DOM은 \<slot\> 요소를 사용하여 다른 DOM trees를 구성한다.  Slots은 그들 자신의 마크업으로 사용자들이 채울수 있는 컴포넌트 내부의 placeholder이다. 

하나 이상의 slots을 설정함으로써, 당신의 컴포넌트의 shadow DOM을 렌더링하기 위해 makrup을 초대할 수 있다.  \<slot\>이 그것들을 초대할 때 요소들은 shadow DOM 경계를 넘어갈 수 있다. 

이러한 요소들은 distributed nodes라고 부른다. slots은 물리적으로 DOM을 이동시키지 않는다. 그것들은 shadow DOM 내부에 다른 위치로 그것을 렌더링한다. 

#### 디폴트 슬롯
디폴트 slot을 사용하기 위해서 다음과 같이 마크업을 작성한다. 
```html
<my-element id="my-element" title="MyElement2">
  <slot>
    <div>SLOT</div>
  </slot>
</my-element>
```
Javascript에서 shadow Root에 \<slot\>을 작성한다. 
```javascript
class MyElement extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
    <div>
      <h1>Shadow DOM</h1>
      <slot><h2>Fallback Content</h2></slot>
    </div>
    `;
  }
```        
실행 후 live dom을 보면 다음과 같이 렌더링된다. 
```html
<my-element id="my-element" title="MyElement2">
      <slot>
        <div>SLOT</div>
      </slot>
    </my-element>
```    

**컴포넌트는 그것의 shadow DOM에 하나 이상의 slot을 정의할 수 있다. Slot은 비어 있을 수 있으며, 대안 컨텐트를 제공할 수 있다.**  사용자가 light DOM을 제공하지 않으면,  slot은 그것의 fallback content를 렌더링한다. 


```html
<!-- Default slot. If there's more than one default slot, the first is used. -->
<slot></slot>

<slot>fallback content</slot> <!-- default slot with fallback content -->

<slot> <!-- default slot entire DOM tree as fallback -->
  <h2>Title</h2>
  <summary>Description text</summary>
</slot>
```


#### named slot
또한 named slot을 생성할 수 있다. 사용자는 으름으로 참조하는 당신의 shadow DOM에 특별한 holes이다.  slot1, slot2라는 이름의 두 개의 slot을 선언했다. 


```javascript
class MyElement extends HTMLElement {
   constructor() {
     super();
     // Attach a shadow root to the element.
     let shadowRoot = this.attachShadow({ mode: "open" });
     shadowRoot.innerHTML = `
     <div>
       <h1>Shadow DOM</h1>
       <slot name="slot1"><h2>Fallback Content</h2></slot>
       <slot name="slot2"><h2>Fallback Content</h2></slot>
     </div>
     `;
   }>
```
HTML요소에서 slot 속성에 slot의 이름을 설정하여 마크업을 작성한다. 
```html
<my-element id="my-element" title="MyElement2">
  <div slot="slot1"><h2>slot1</h2></div>
  <div slot="slot2"><h2>slot2</h2></div>
</my-element>
```


궁금하다면 flattened tree은 다음과 같이 보일 것이다. 
```html
<my-element id="my-element" title="MyElement2">
  #shadow-root (open)
  <div slot="slot1"><h2>slot1</h2></div>
  <div slot="slot2"><h2>slot2</h2></div>
</my-element>
```


# Styling
웹 컴포넌트를 스타일링하기 위한 많은 옵션이 있다. shadow DOM을 사용하는 컴포넌트는 main page에 의해 스타일이 적용될 수 있고, 자신의 스타일을 정의할 수 있다. 또한 디폴트를 오버라이드하는 사용자를 위해 hooks을 제공할 수 있다. 

## Component-defined styles

shadow DOM의 가장 쓸모 있는 특징은 scoped CSS이다. 

* 외부 페이지의 CSS selectors는 컴포넌트 내부에서 적용되지 않는다. 
* 내부에 정의된 styles은 새어 나가지 않는다. 그것들은 host element에 scoped된다. 


**shadow DOM 내부에서 사용된 CSS selectors는 컴포넌트에 지역적으로 적용된다.**  이것은 일반적인 id/class 이름을 다시 사용할 수 있다는 것을 의미한다. 

### id로 스타일 설정

메인 페이지의 div에 id를 부여했다. 

```html
<div id="shadow-div">
  Parent
</div>
```
커스텀 엘리먼트에서 div에 같은 아이디를 설정하고 아이디에 스타일을 정의했다.
```javascript
shadowRoot.innerHTML = `
<style>
  #shadow-div {
    background-color: red;
  }
</style>
<div>
  <div id="shadow-div">
    <h1>Shadow DOM</h1>
  </div>
  <slot name="slot1"><h2>Fallback Content</h2></slot>
  <slot name="slot2"><h2>Fallback Content</h2></slot>
</div>
`;
```
실행해보면 메인페이지에 있는 div는 백그라운드 컬러가 변경되지 않는다. 


### 클래스로 스타일 설정
id와 마찬가지로 스타일로 스타일을 설정하면 메인페이지의 클래스에는 변화가 없다. 
```javascript
shadowRoot.innerHTML = `
<style>
  .shadow-div {
    background-color: red;
  }
</style>
<div>
  <div class="shadow-div">
    <h1>Shadow DOM</h1>
  </div>
  <slot name="slot1"><h2>Fallback Content</h2></slot>
  <slot name="slot2"><h2>Fallback Content</h2></slot>
</div>
`;
```

### 요소에 스타일 설정
커스텀 엘리먼트 내부에서 요소에 스타일을 설정해도 마찬가지로 메인페이지의 요소에는 변화가 없다. 
```javascript
shadowRoot.innerHTML = `
<style>
  div {
    background-color: blue;
  }
</style>
<div>
  <div">
    <h1>Shadow DOM</h1>
  </div>
  <slot name="slot1"><h2>Fallback Content</h2></slot>
  <slot name="slot2"><h2>Fallback Content</h2></slot>
</div>
`;
```

### 컴포넌트 자체에 스타일 적용
웹 구성 요소도 :host 선택기를 사용하여 스스로 스타일을 지정할 수 있다.
```html
<style>
  :host {
    display: block;
    background-color: blue;
  }
</style>
```          
위와같이 스타일을 정의하면 요소전체에 백그라운드 컬러가 blue로 변경된다. 

:host가 있는 한 가지 문제는 상위 페이지의 규칙이 요소에 정의된 :host 규칙보다 더 높은 특이성을 갖는다는 것입니다. 즉, 외부 스타일이 이깁니다. 이를 통해 사용자는 외부에서 최상위 스타일을 재정의할 수 있습니다. 또한 :host는 섀도우 루트 컨텍스트에서만 작동하므로 섀도우 DOM 외부에서는 사용할 수 없습니다.


:host(<selector>)의 기능적 형식을 사용하면 selector와 매치되는 경우 host에 스타일을 적용할 수 있다. 
```html
<style>
:host {
  opacity: 0.4;
  will-change: opacity;
  transition: opacity 300ms ease-in-out;
}
:host(:hover) {
  opacity: 1;
}
:host([disabled]) { /* style when host has disabled attribute. */
  background: grey;
  pointer-events: none;
  opacity: 0.4;
}
:host(.blue) {
  color: blue; /* color host when it has class="blue" */
}
:host(.pink) > #tabs {
  color: pink; /* color internal #tabs node when host has class="pink". */
}
</style>
```

다음과 같이 스타일을 주는 방법이 있다. 나중에 정리하기로 하고 구글 문서를 참고한다. 
* context 기반 스타일
* slot에 배포된 노드에 스타일 적용


# JS에서 slots으로 작업하기 
### slotchange event 
```javascript
const slot = this.shadowRoot.querySelector('#slot');
slot.addEventListener('slotchange', e => {
  console.log('light dom children changed!');
});
```


# Shadow DOM event model 
이벤트가 shadow DOM에서 버블링되면 shadow DOM이 제공하는 캡슐화를 유지하도록 대상이 조정됩니다. 즉, 이벤트는 Shadow DOM 내의 내부 요소가 아닌 구성 요소에서 온 것처럼 보이도록 다시 타겟팅됩니다. 일부 이벤트는 Shadow DOM 밖으로 전파되지도 않습니다.


* Focus Events: blur, focus, focusin, focusout
* Mouse Events: click, dblclick, mousedown, mouseenter, mousemove, etc.
* Wheel Events: wheel
* Input Events: beforeinput, input
* Keyboard Events: keydown, keyup
* Composition Events: compositionstart, compositionupdate, compositionend
* DragEvent: dragstart, drag, dragend, drop, etc.


## 사용자 정의 이벤트 사용
섀도우 트리의 내부 노드에서 발생하는 사용자 정의 DOM 이벤트는 composed: true플래그를 사용하여 이벤트를 생성하지 않는 한 섀도우 경계 밖으로 버블링되지 않습니다 .

```javascript
// Inside <fancy-tab> custom element class definition:
selectTab() {
  const tabs = this.shadowRoot.querySelector('#tabs');
  tabs.dispatchEvent(new Event('tab-select', {bubbles: true, composed: true}));
}
```

composed: false(기본값) 인 경우,  소비자는 그림자 루트의 이벤트 외부를 수신 할 수 없습니다.
```html
<fancy-tabs></fancy-tabs>
<script>
  const tabs = document.querySelector('fancy-tabs');
  tabs.addEventListener('tab-select', e => {
    // won't fire if `tab-select` wasn't created with `composed: true`.
  });
</script>
```




# References
[https://developers.google.com/web/fundamentals/web-components/shadowdom](https://developers.google.com/web/fundamentals/web-components/shadowdom)
[https://usefulangle.com/post/371/custom-element-css](https://usefulangle.com/post/371/custom-element-css)































