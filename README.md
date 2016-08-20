# 프론트 엔드 개발 의존성 관리 공부하기
이 프로젝트는 졸작의 생산성을 높이기 위한 프로젝트입니다.  
이 프로젝트는 크게 아래와 같은 것(?)들을 썼습니다.

* **NPM(Node Package Manager)** - Node.js에서 사용되는 모듈을 패키지로 모아놓은 곳
* **Bower** - 웹 프론트 엔드 개발의 의존성 관리를 위한 패키지 관리자
* **Gulp** - 빌드 자동화 도구

NPM으로 설치 가능한 컴포넌트들을 Bower에서도 설치 가능하지만, 저는

> *개발 시에만 쓰는 컴포넌트는 NPM으로*  
> *배포 단계에서도 쓰는 컴포넌트는 Bower으로*

설치했습니다.

그 이외 잡다구레한 프레임워크와 라이브러리는 사용자의 마음대로 쓰시면 됩니다.

## 사전 설치해야할 사항
이 프로젝트를 사용하기 위해서는 아래와 같은 내용들이 설치돼있어야 합니다.

* **[Node.js](https://nodejs.org/ko/ "Node.js 공식 홈페이지")** - NPM을 사용하려면 필수이다.
* **[NPM](https://docs.npmjs.com/getting-started/installing-node#updating-npm "NPM Getting Started 문서")**
* **[Bower](https://bower.io/#install-bower "Bower 공식 사이트")**
* **[Git](https://git-scm.com/download/ "Git 다운로드 페이지")** - Bower를 통해 컴포넌트를 설치하기 위해서 필요하다.
* **[Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started "Gulp Getting Started 문서")**
* **[Chrome](https://www.google.com/chrome/browser/desktop/index.html "Google Chrome 브라우저 홈페이지")** - 필수는 아니지만, 자동 새로고침 확장앱을 사용하기 위해 필요하다.
* **[LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei "LiveReload 확장앱 설치 페이지")** - Chrome 브라우저에서 자동 새로고침 기능을 사용하기 위해 필요하다.

## 프로젝트 설치하기
이제 이 프로젝트를 사용할 준비가 끝난 것입니다.  
그럼 이제 이 프로젝트를 자신의 컴퓨터에 다운받도록 합니다.  
터미널(명령 프롬프트)를 열어 프로젝트 디렉토리로 이동한 후에

`$ git clone https://github.com/perfectacle/study`

를 입력하면 프로젝트 내에 study 디렉토리가 생성되며  
현재 프로젝트의 파일들이 모두 복사됩니다.  
study 디렉토리로 이동해주도록 합시다.

이제 컴포넌트를 설치할 차례입니다.

`$ npm i`  
`$ bower i`

를 입력하여 개발 시에만 사용할 컴포넌트,  
배포 시에도 사용할 컴포넌트를 프로젝트 내에 설치하시면 됩니다.

## 프로젝트 사용하기
이제 실제로 프로젝트를 사용해볼 차례입니다.  
NPM과 Bower, Gulp의 사용법은 설명하지 않도록 하겠습니다.  
해당 내용들은 다른 문서들을 통해 찾아보시기 바랍니다.  
개발을 진행하실 때는 아래와 같은 명령어를 입력한 후 개발을 진행하시면,  
생산성 향상에 도움이 될 것입니다.

`$ gulp `
 
위 명령어를 입력한 후에

`http://localhost:8080/`

위 주소로 접속하시고 작업 결과를 보시면 됩니다.  

`/www/src`

위 디렉토리는 개발용 디렉토리입니다.  
위 디렉토리 내의 파일에 변화가 있을 때마다 변화를 감지하고,  
자동 새로고침이나 CSS 전처리기(샘플로 scss 파일만)를 CSS파일로 변환해줍니다.

개발을 모두 마치고, 실제 배포를 위한 테스트를 진행하실 때는

`$ gulp test`

위 명령어를 입력하면

`/www/public`

디렉토리가 생성됩니다.  
위 디렉토리는 실제 배포용 디렉토리입니다.  
주석의 제거, 컴포넌트(CSS, JS)파일을 하나로 통합, 각종 파일(HTML, CSS, JS, 이미지 파일) 압축  
등등의 작업을 진행해 용량을 최소화 시키는 등의 작업을 거쳐 앱의 퍼포먼스를 증대시켜줍니다.  
배포용 파일의 테스트를 위해서는 위 명령어를 입력한 후에

`http://localhost:8080/`

위 주소로 이동하시면 확인이 가능합니다.

## 마치며

마크다운(*.md) 문법이 어색하고, Github도 아직은 많이 낯설어 보시는데  
불편하실 수도 있으나 끝까지 읽어주셔서 감사합니다.  
문서와 프로젝트가 많이 부족하니 피드백은 아래 메일로 부탁드립니다.

<perfectacle@naver.com>