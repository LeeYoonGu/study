'use strict';
var gulp         = require('gulp'),
    clean        = require('gulp-clean'),
    rename       = require('gulp-rename'),
    byteDiff     = require('gulp-bytediff'),
    liveServer   = require('gulp-live-server'),
    sass         = require('gulp-sass'),
    autoPrefixer = require('gulp-autoprefixer'),
    htmlMin      = require('gulp-htmlmin'),
    htmlReplace  = require('gulp-html-replace'),
    concatCss    = require('gulp-concat-css'),
    cleanCss     = require('gulp-clean-css'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    saveLicense  = require('uglify-save-license'),
    imgMin       = require('gulp-imagemin'),
    path         = {
      root: './www',
      src: {
        lib: {
          css: [],
          js: [],
        }
      },
      dist: {
        lib: {}
      },
      init: function() {
        /*
         * 객체 내에서 this를 쓰기 위해 초기화 함수를 선언.
         * 파일을 선택하기 위해서는 glob 패턴을 사용해야함.
         * bower_components의 디렉토리를 제외한 파일들을 선택한다고 보면 됨.
         */
        var html          = ['/**/*.html', '/bower_components/**/*.html'],
            scss          = ['/**/*.scss', '/bower_components/**/*.scss'],
            css           = ['/**/*.css', '/bower_components/**/*.css'],
            js            = ['/**/*.js', '/bower_components/**/*.js'],
            img           = ['/**/*.{png,gif,jpg,svg}', '/bower_components/**/*.{png,gif,jpg,svg}'],
            lib           = {
              css: [
                '/bower_components/bootstrap/dist/css/bootstrap.min.css',
                '/bower_components/font-awesome/css/font-awesome.min.css'
              ],
              js: [
                '/bower_components/angular/angular.min.js',
                '/bower_components/chart.js/dist/Chart.min.js',
                '/bower_components/angular-chart.js/dist/angular-chart.min.js'
              ],
              fnt: '/bower_components/font-awesome/fonts/*.*'
            };
        this.src.dir      = this.root + '/src';
        this.dist.dir     = this.root + '/public';
        this.src.html     = [this.src.dir + html[0], '!' + this.src.dir + html[1]];
        this.src.scss     = [this.src.dir + scss[0], '!' + this.src.dir + scss[1]];
        this.src.css      = [this.src.dir + css[0], '!' + this.src.dir + css[1]];
        this.src.js       = [this.src.dir + js[0], '!' + this.src.dir + js[1]];
        this.src.img      = [this.src.dir + img[0], '!' + this.src.dir + img[1]];
        this.src.lib.fnt  = this.src.dir + lib.fnt;
        this.dist.lib.fnt = this.dist.dir + '/font-awesome/fonts';
        for(var i = 0; lib.js[i];) {
          this.src.lib.js[i] = this.src.dir + lib.js[i++];
        }
        for(i = 0; lib.css[i];) {
          this.src.lib.css[i] = this.src.dir + lib.css[i++];
        }
        // this(path 객체)에 잔뜩 프로퍼티에 값을 준 후에 this 객체를 반환.
        return this;
      }
    }.init();
// 실제 배포용 파일을 만들어내기 전에 기존에 있던 배포용 파일을 지우는 작업.
gulp.task('clean', function() {
  /*
   * build 작업보다 clean 작업은 무조건 선행되어야 함.
   * return을 안 써주게되면 비동기 방식으로 진행되어 빌드 작업이 수행되는 도중
   * clean 작업으로 배포용 디렉토리를 지우는 등의 에러가 발생할 수 있으므로
   * return을 적어줌으로써 이 작업은 순서가 있는, 동기 방식으로 진행돼야함을 명시함.
   */
  return gulp.src(path.dist.dir)
             .pipe(clean());
});
// 실제 배포용 파일을 만들어내기 위한 작업.
gulp.task('build', ['clean'], function() {
  // 압축시켰을 때 얼마나 용량이 얼마나 줄어들었는지 단위를 보기 좋게 만드는 함수.
  var changeFormat = function(size) {
        if(size > 1024) {
          if(size > 1024 * 1024) {
            return (size / (1024 * 1024)).toFixed(1) + 'mb';
          }
          return (size / 1024).toFixed(1) + 'kb';
        }
        return size + 'byte'
      },
      // 콘솔창에 압축 결과를 출력하는 함수.
      logDiff      = function(data) {
        var difference = (data.savings > 0) ? ' 작아짐.' : ' 커짐.',
            startSize  = changeFormat(data.startSize),
            endSize    = changeFormat(data.endSize),
            saveSize   = changeFormat(data.savings);
        return data.fileName + ': ' + startSize + ' -> ' + endSize + ', ' + saveSize + difference;
      };
  // HTML 압축.
  gulp.src(path.src.html)
      .pipe(byteDiff.start())
      /*
       * 라이브러리와 사용자 작성 파일들을 하나로 합쳤을 때
       * html에서도 href나 src를 바꿔주는 내용.
       */
      .pipe(htmlReplace({
        'bundleCSS': './styles/bundle.min.css',
        'appCSS': './styles/app.min.css',
        'bundleJS': './scripts/bundle.min.js',
        'appJS': './scripts/app.min.js'
      }))
      .pipe(htmlMin({
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeEmptyAttributes: true
      }))
      .pipe(gulp.dest(path.dist.dir));
  // 사용자 작성 CSS 파일을 하나로 합친 후 압축.
  gulp.src(path.src.css)
      .pipe(concatCss("styles/app.min.css"))
      .pipe(byteDiff.start())
      .pipe(cleanCss())
      .pipe(byteDiff.stop(function(data) {
        return logDiff(data);
      }))
      .pipe(gulp.dest(path.dist.dir));
  // 라이브러리 CSS 파일을 하나로 합친 후 압축.
  gulp.src(path.src.lib.css)
      .pipe(concatCss("styles/bundle.min.css"))
      .pipe(byteDiff.start())
      .pipe(cleanCss())
      .pipe(byteDiff.stop(function(data) {
        return logDiff(data);
      }))
      .pipe(gulp.dest(path.dist.dir));
  // 사용자 작성 JS 파일을 하나로 합친 후 압축.
  gulp.src(path.src.js)
      .pipe(concat('scripts/app.min.js'))
      .pipe(byteDiff.start())
      .pipe(uglify({
        output: {
          comments: saveLicense
        }
      }))
      .pipe(byteDiff.stop(function(data) {
        return logDiff(data);
      }))
      .pipe(gulp.dest(path.dist.dir));
  // 라이브러리 JS 파일을 하나로 합친 후 압축.
  gulp.src(path.src.lib.js)
      .pipe(concat('scripts/bundle.min.js'))
      .pipe(byteDiff.start())
      .pipe(uglify({
        output: {
          comments: saveLicense
        }
      }))
      .pipe(byteDiff.stop(function(data) {
        return logDiff(data);
      }))
      .pipe(gulp.dest(path.dist.dir));
  // 이미지 파일들 압축.
  gulp.src(path.src.img)
      .pipe(imgMin())
      .pipe(gulp.dest(path.dist.dir));
  /*
   * font-awesome 라이브러리에서 쓰는 웹폰트를 복사.
   * 이 작업들은 비동기 방식으로 진행되기 때문에 작업의 끝을 알려줘야 함.
   * 따라서 마지막 작업에 return을 붙여 동기식으로 바꿔줘야 함.
   */
  return gulp.src(path.src.lib.fnt)
             .pipe(gulp.dest(path.dist.lib.fnt));
});
// 배포용 파일을 실제로 테스트해보기 위한 작업.
gulp.task('test', ['build'], function() {
  // 라이브 서버를 가동하고 포트는 8080
  var server = liveServer.static('www/public', 8080);
  server.start();
  // 배포용 디렉토리 내의 모든 파일 변동 감지시 자동 새로 고침.
  gulp.watch(path.dist.dir + '/**/*', function(file) {
    server.notify.apply(server, [file]);
  });
});
// scss 파일을 사용하기 위해 css로 변환하기 위한 작업.
gulp.task('compileSass', function() {
  gulp.src(path.src.scss)
      .pipe(sass())
      .pipe(autoPrefixer({
        browsers: 'ie >= 9, last 2 versions'
      }))
      /*
       * styles/scss/*.scss 파일을 styles/*.css로 보내는 것처럼
       * 서로 경로가 다른 경우에는 gulp-rename 플러그인을 써줘야 함.
       */
      .pipe(rename(function(file) {
        file.dirname = file.dirname.replace('\\scss', '');
      }))
      .pipe(gulp.dest(path.src.dir));
});
// 개발용 파일을 실제로 테스트해보기 위한 작업.
gulp.task('default', function() {
  // 라이브 서버를 가동하고 포트는 8080
  var server = liveServer.static('www/src', 8080);
  server.start();
  // scss 등등의 변환이 필요한 전처리기 외에 다른 파일의 변동 감지시 자동 새로 고침.
  gulp.watch(path.src.dir + '/**/!(*.scss)', function(file) {
    server.notify.apply(server, [file]);
  });
  // scss 등등의 변환이 필요한 전처리기들은 따로 빼줘야하고, 그 파일들의 변동 감지시 자동 변환.
  gulp.watch(path.src.scss, ['compileSass']);
});