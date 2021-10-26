# NodeJS

Node.JS 는 웹브라우저에 종속적인 자바스크립트에서 외부에서 실행할 수 있는 Runtime 환경을 Chrome V8 엔진을 제공하여 여러 OS 환경에서 실행할 수 있는 환경을 제공한다. 


## Installation 

다음의 URL에서 다운로드 받아 설치한다. 

https://nodejs.org/ko/

설치된 디렉터리 확인한다. 

```shell
C:\Program Files\nodejs
```

## 버전확인
터미널에서 다음을 입력하여 버전을 확인한다. 
```shell
node -v
```

## hello world
다음과 같이 hello world 프로그램을 작성한다. 
```javascript
console.log("hello world")
```
터미널에서 작성한 프로그램을 실행한다. 
```shell
node ./c01-nodes/e01-app.js
```

## 예제 프로그램 2 
다음과 같이 작성한다. 
```javascript
function first() {
  second()
  console.log('첫 번째 실행')
}
function second() {
  third()
  console.log('두 번째 실행')
}
function third() {
  console.log('세 번째 실행')
}
first()
```
터미널에서 node 명령을 사용하여 실행한다. 

```shell
node ./c01-nodes/e01-app2.js
```
실행결과를 확인한다. 










