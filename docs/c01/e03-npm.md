# NPM 

npm의 경우는 Node Package Manager이기 때문에 node.js를 설치하면 같이 설치된다.



## 옵션없이 패키지 설치

```shell
npm install moment 
```

위와 같이 아무 옵션없이 install하 되면 ./node_modules 디렉토리에 패키지를 설치하고 끝난다.



## -save 

```javascript
 npm install moment --save
```
 * 위와 같이 –save 옵션을 사용하면 ./node_modules 디렉토리에 패키지를 설치는 물론
* /package.json 의 dependencies 에 추가된다.
* npm install을 할 때 항상 설치가 된다.


## -save-dev

```shell 
npm install jasmine-core --save-dev
npm install karma --save-dev
```



* 위와 같이 –save-dev 옵션을 사용하면 ./node_modules 디렉토리에 패키지를 설치는 물론
* /package.json 의 devDependencies 에 추가된다.
* npm install을 할 때 –production 옵션을 붙이면 빠지고 설치된다.


## 기타 옵션 

```shell
npm install [package] --no-save
// dependencies에 패키지 정보를 추가하지 않는다.

npm install [package] --save-exact
// 정확히 일치하는 버전의 패키지를 추가한다.

npm install [package] --save-bundle
// 해당 패키지를 bundleDependencies에 추가한다.

npm install [package] --force
// 해당 패키지가 존재하더라도 원격 저장소에 있는 패키지를 가져온다.
```



## Local 설치와 Global 설치 
Global 설치 : 터미널에서 모듈의 명령어를 사용할 일이 있다면 Global로 설치합니다. Local 설치 : 소스내에서 require()로 불러들이는 모듈들은 Local로 설치합니다

```shell
npm install name -g
```

## 설치된 모듈 확인
global로 설치된 모듈 확인

```shell
npm list -g
or
npm list -global
```



설치한 모듈을 따로 보려면 
```shell
npm ls -g --depth=0
```
모듈의 최신 버전 확인
```shell
npm view 모듈명 version
```









