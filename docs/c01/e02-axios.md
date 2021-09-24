# 모듈 시스템 

Node.js는 모듈시스템을 사용한다.  모듈에 대해서 간단히 알아본다. 


* 모듈은 독립적인 하나의 소프트웨어
* Node.js는 파일 하나하나가 모듈이다. 
* 브라우저에서는 script 태그로 스크립트를 불러오면 다른 스크립트에서도 이전 스크립트의 변수를 사용할 수 있었지만, Node.js는 명시적으로 이전 스크립트의 변수를 사용하겠다고 선언해주어야 한다.

간단히 모듈을 선언하는 방법과 불러와서 사용하는 방법을 살펴보자. 

다음과 같이 모듈을 선언한다. 

```javascript
function add(a, b) {
  return a + b;
}
module.exports = add;
```

Main 프로그램에서 require()를 사용하여 모듈을 임포트한다. 

```java
const add = require('./calc.js');
console.log(add(1, 2)); // 3
```


# CommonJS

범용적인 목적으로 JavaScript를 사용하기 위해 필요한 선결 조건은 모듈화이다. Node.js도 이런 모듈화 작업때문에 탄생할 수 있었다. JavaScript 모듈화 작업의 선두 주자는 CommonJS와 AMD이다.

CommonJS(http://www.commonjs.org/) 는 JavaScript를 브라우저에서뿐만 아니라, 서버사이드 애플리케이션이나 데스크톱 애플리케이션에서도 사용하려고 조직한 자발적 워킹 그룹이다. CommonJS의 'Common'은 JavaScript를 브라우저에서만 사용하는 언어가 아닌 일반적인 범용 언어로 사용할 수 있도록 하겠다는 의지를 나타내고 있는 것이라고 이해할 수 있다.


CommonJS의 명세를 따르는 대표적인 프로젝트가 NodeJS이다.  더 자세한 정보를 얻고 싶으면 다음의 링크를 참고한다

[JavaScript 표준을 위한 움직임: CommonJS와 AMD](https://d2.naver.com/helloworld/12864) 


# ES6 모듈 시스템 
NodeJS는 CommonJS 명세를 따르지만 ES6에서도 모듈 시스템을 지원한다. 
아래는 CommonJS에서 모듈을 불러오는 방법이고 
```javascript
const moment = require("moment");
```
다음은 ES6에서 모듈을 불러오는 방법이다. 
```javascript
import moment from "moment";
```


Vue 3 개발을 위해서 NodeJS를 사용하지만 우리가 NodeJS로 프로그램을 작성하는 것이 아니므로 NodeJS에 대해서는 깊이 알지 않아도 Vue 3를 개발하는데 문제는 없으니까 걱정하지 않아도 된다. 



# 모듈 사용하기 
NodeJS를 사용하면 기본적으로 설치되는 Built-In 모듈들이 있는데 이번에는 HTTP 요청을 하기 위해 외부모듈인 Axiios를 설치해 보자. 
```shell
npm install axios
```

설치하면 node_modules 디렉터리가 생성된다. 여기에 외부 모듈이 설치된다.  

확인해 보자. 

모듈이 설치되면 프로젝트 루트 디렉터리에 package.json 파일이 생성된다. 
```json
{
  "dependencies": {
    "axios": "^0.21.4"
  }
}
```
이 프로젝틀가 의존하는 의존성을 확인할 수 있다. 


다음과 같이 프로그램을 작성한다. 
```javascript

const axios = require('axios');

// Make a request for a user with a given ID
axios.get('http://www.naver.com')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
```

프로그램을 실행해보자. 
```shell
node /c01-nodejs/e02-axios.js
```















