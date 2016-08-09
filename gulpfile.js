var gulp = require('gulp');
var bs = require('browser-sync').create();
var path = {
  root: './www',
  src: {},
  dist: {},
  init: function() {
    var html = '/**/*.html',
        scss = '/**/*.scss',
        css = '/**/*.css',
        js = '/**/*.js';
    this.src.dir = this.root + '/src';
    this.src.html = this.src.dir + html;
    this.src.scss = this.src.dir + scss;
    this.src.css = this.src.dir + css;
    this.src.js = this.src.dir + js;
    this.dist.dir = this.root + '/public';
    this.dist.html = this.dist.dir + html;
    this.dist.scss = this.dist.dir + scss;
    this.dist.css = this.dist.dir + css;
    this.dist.js = this.dist.dir + js;
    return this;
  }
}.init();
gulp.task('server', function() {
  bs.init({
    server: {
      baseDir: path.src.dir
    },
    port: 8080
  });
});
gulp.task('html', function() {
  return gulp.src(path.src.html)
    .pipe(bs.reload({stream: true}));
});
gulp.task('js', function() {
  return gulp.src(path.src.js)
  .pipe(bs.reload({stream: true}));
});
gulp.task('default', ['server'] ,function() {
  gulp.watch(path.src.html, ['html']);
  gulp.watch(path.src.js, ['js']);
});