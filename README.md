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

## 프로젝트 사용하기
이제 이 프로젝트를 사용할 준비가 끝난 것입니다.  
그럼 이제 이 프로젝트를 자신의 컴퓨터에 다운받도록 합니다.  
터미널(명령 프롬프트)를 열어 프로젝트 디렉토리로 이동한 후에  
`$ git clone https://github.com/perfectacle/study`

를 입력하면 프로젝트 내에 study 디렉토리가 생성되며  
현재 프로젝트의 파일들이 모두 복사됩니다.  
study 디렉토리로 이동해주도록 합시다.

이제 컴포넌트를 설치할 차례입니다.

`$ npm i `
`$ bower i`

를 입력하여 개발 시에만 사용할 컴포넌트,  
배포 시에도 사용할 컴포넌트를 프로젝트 내에 설치하시면 됩니다.

What about line breaks then ?  
For line breaks just append the previous sentence with 2 spaces.

> Is there any syntax for blockquotes ?

> Sure there is :)

What about unordered lists ? Just start your sentences with an:

* Asterisk
+ Plus
	or
- Hyphen

And ordered lists ? Simple:

1. One
2. Two
3. Three

Can I have paragraphs and blockquotes inside list items ? Sure:

* First Paragraph

	Inner Paragraph

* Second paragraph
	> blockquotes

Basically you'll have to indent your inner paragraphs, blockquotes, etc. by 4 spaces or 1 tab.

I am a web developer, so I want to have code blocks. Here it is then, just indent every line of code by 4 spaces or 1 tab:

	body {
		margin: 0; padding: 0;
	}

That code is now wrapped inside `<pre><code></code></pre>`. Did you just notice something ? You wrote inline code with markdown! Also notice your angular brackets got converted into their respective HTML entities. Nice!

What about putting some emphasis on my text ?

*single asterisk*  
_single underscore_

You just wrapper your text in `<em>` tags.

**double asterisk**  
__double underscore__

You just used `<strong>` tags.

Just incase you want to produce literal asterisk or underscore, then escape them like this \* and \_.

What's the syntax for anchor and image tags ?

There are 2 syntax for image tags:
Inline Syntax:

![Alt Text](http://lorempixel.com/output/nature-q-c-100-100-8.jpg "Some title")

Reference-Style Syntax:

![Alt Text][id]

[id]: http://lorempixel.com/output/nature-q-c-100-100-8.jpg "Some Title"

Hey! It's the same with links:

[CSSDeck](http://cssdeck.com "Collection of CSS and JS Creations")

[CSSDeck][link_to_cssdeck]  

[link_to_cssdeck]: http://cssdeck.com "Learn HTML5, CSS and JS in a new way!"

Can I have automatic links ? Sure:

<http://cssdeck.com>  
<hello@cssdeck.com>


That's all guys. Don't forget that you can still use HTML tags. For example: <span>Hello</span>
	
Also check out the official Markdown Documentation - <http://daringfireball.net/projects/markdown/syntax>








