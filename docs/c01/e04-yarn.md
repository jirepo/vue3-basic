# Yarn 

Yarn은 자바스크립트의 새로운 패키지 매니저이다. 더욱 빠르게 패키지를 인스톨하는 방법과 의존성 관리를 다양한 디바이스에서 일관성 있게 할 수 있다.

빠르고 안정적이고 보안성이 뛰어나다.

## 설치
```shell
npm install --global yarn
```

## 업데이트
```shell
yarn self-update
```

## 프로젝트 의존성 설치
package.json에 정의된 의존성을 설치하려면 단순히 yarn을 치면 된다.
```shell
yarn
```

## 프로젝트 구조 생성
```shell
yarn init 
```

그러면 package.json 파일이 만들어 진다.

## 패키지 추가
```shell
yarn add [package-name]@[version-or-udate][option]
```
옵션 argument는 –dev, –peer, –optional, –exact, 또는 –tilde가 있다. 첫 세가지 옵션을 사용하면 패키지를 각각 devDependencies, peerDependencies 및 optionalDependencies에 설치 하게 된다.

다음과 같은 다른 위치에서 패키지를 추가할 수 있다.

로컬 폴더 또는 로컬 tar 파일
```shell
yarn add file:/path/to/local/folder
yarn add file:/path/to/local/tarball.tgz
```

## 리모트 깃 레파지토리
```shell
yarn add <git remote url>
```

## 리모트 tar 파일
```shell
yarn add https://my-project.org/package.tgz
```
패키지를 업데이트 하거나 삭제 하려면, 아래의 CLI 커멘드를 입력하면 된다.
```shell
# upgrade all dependencies
yarn upgrade
# remove react
yarn remove react
```
![picture 1](../../images/a997d5c678436e69c68bbe924f3ae85e6bc1fb8db06dc6b6cd881d3828581915.png)  



## yarn.ps1 파일을 로드할 수 없다는 오류 

관리자 권한으로 Powershell을 열고 다음을 실행한다.

```shell
Set-ExecutionPolicy Unrestricted
```


