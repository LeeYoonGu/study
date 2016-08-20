'use strict';
var gulp         = require('gulp'),
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
          js: []
        }
      },
      dist: {},
      init: function() {
        var html       = ['/**/*.html', '/bower_components/**/*.html'],
            scss       = ['/**/*.scss', '/bower_components/**/*.scss'],
            css        = ['/**/*.css', '/bower_components/**/*.css'],
            js         = ['/**/*.js', '/bower_components/**/*.js'],
            img        = ['/**/*.{png,gif,jpg,svg}', '/bower_components/**/*.{png,gif,jpg,svg}'],
            lib        = {
              css: [
                '/bower_components/bootstrap/dist/css/bootstrap.min.css'
              ],
              js: [
                '/bower_components/angular/angular.min.js',
                '/bower_components/chart.js/dist/Chart.min.js',
                '/bower_components/angular-chart.js/dist/angular-chart.min.js'
              ]
            };
        this.src.dir   = this.root + '/src';
        this.dist.dir  = this.root + '/public';
        this.src.html  = [this.src.dir + html[0], '!' + this.src.dir + html[1]];
        this.src.scss  = [this.src.dir + scss[0], '!' + this.src.dir + scss[1]];
        this.src.css   = [this.src.dir + css[0], '!' + this.src.dir + css[1]];
        this.src.js    = [this.src.dir + js[0], '!' + this.src.dir + js[1]];
        this.src.img   = [this.src.dir + img[0], '!' + this.src.dir + img[1]];
        this.dist.html = this.dist.dir + html[0];
        this.dist.scss = this.dist.dir + scss[0];
        this.dist.css  = this.dist.dir + css[0];
        this.dist.js   = this.dist.dir + js[0];
        this.dist.img  = this.dist.dir + img[0];
        for(var i=0; lib.js[i];) {
          this.src.lib.js[i] = this.src.dir + lib.js[i++];
        }
        for(i=0; lib.css[i];) {
          this.src.lib.css[i] = this.src.dir + lib.css[i++];
        }
        return this;
      }
    }.init();
gulp.task('compile', function() {
  gulp.src(path.src.scss)
  .pipe(sass())
  .pipe(autoPrefixer({
    browsers: 'ie 9, last 2 versions'
  }))
  .pipe(rename(function(file) {
    file.dirname = file.dirname.replace('\\scss', '');
  }))
  .pipe(gulp.dest(path.src.dir));
});
gulp.task('build', function() {
  console.log(path.src.lib.js);
  var changeFormat = function(size) {
        if(size > 1024) {
          if(size > 1024 * 1024) {
            return (size / (1024 * 1024)).toFixed(1) + 'MB';
          }
          return (size / 1024).toFixed(1) + 'KB';
        }
        return size + 'Byte'
      },
      logDiff      = function(data) {
        var difference = (data.savings > 0) ? ' 작아짐.' : ' 커짐.',
            startSize  = changeFormat(data.startSize),
            endSize    = changeFormat(data.endSize),
            saveSize   = changeFormat(data.savings);
        return data.fileName + ': ' + startSize + ' -> ' + endSize + ', ' + saveSize + difference;
      };
  gulp.src(path.src.html)
  .pipe(byteDiff.start())
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
  gulp.src(path.src.css)
  .pipe(concatCss("styles/app.min.css"))
  .pipe(byteDiff.start())
  .pipe(cleanCss())
  .pipe(byteDiff.stop(function(data) {
    return logDiff(data);
  }))
  .pipe(gulp.dest(path.dist.dir));
  gulp.src(path.src.lib.css)
  .pipe(concatCss("styles/bundle.min.css"))
  .pipe(byteDiff.start())
  .pipe(cleanCss())
  .pipe(byteDiff.stop(function(data) {
    return logDiff(data);
  }))
  .pipe(gulp.dest(path.dist.dir));
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
  gulp.src(path.src.img)
  .pipe(imgMin())
  .pipe(gulp.dest(path.dist.dir));
});
gulp.task('default', function() {
  var server = liveServer.static('www/src', 8080);
  server.start();
  gulp.src('http://localhost:8080/');

  gulp.watch(path.src.dir + '/**/!(*.scss)', function(file) {
    server.notify.apply(server, [file]);
  });
  gulp.watch(path.src.scss, ['compile']);
});