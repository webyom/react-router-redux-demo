var gulp = require('gulp'),
    gutil = require('gulp-util'),
    babel = require('gulp-babel'),
    less = require('gulp-less'),
    eslint = require('gulp-eslint'),
    lazyTasks = require('./lazy-tasks');

// run init tasks
gulp.task('init', ['dependencies', 'js', 'html', 'css', 'img']);

// babel
gulp.task('js', ['eslint'], function () {
  return gulp.src([
    'src/js/**/*.+(js|jsx)'
  ])
    .pipe(babel())
    .pipe(lazyTasks.lazyAmdWrapTask())
    .pipe(gulp.dest('dist/js'));
});

// eslint js
gulp.task('eslint', function () {
  return gulp.src('src/js/**/*.+(js|jsx)')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// move html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});

// compile less and css
gulp.task('css', ['less-main', 'less-component', 'css-main', 'css-component']);

// compile main less
gulp.task('less-main', function (done) {
  return gulp.src(['src/css/**/*-main.less', 'src/css/**/main.less'])
    .pipe(less()).on('error', function (err) {
      done(err);
    })
    .pipe(lazyTasks.lazyPostcssTask()).on('error', function (err) {
      done(err);
    })
    .pipe(gulp.dest('dist/css'));
});

// compile component less
gulp.task('less-component', function (done) {
  return gulp.src('src/js/app/**/*.less')
    .pipe(less()).on('error', function (err) {
      done(err);
    })
    .pipe(lazyTasks.lazyPostcssTask()).on('error', function (err) {
      done(err);
    })
    .pipe(gulp.dest('dist/js/app'));
});

// compile main css
gulp.task('css-main', function (done) {
  return gulp.src(['src/css/**/*-main.css', 'src/css/**/main.css'])
    .pipe(lazyTasks.lazyPostcssTask()).on('error', function (err) {
      done(err);
    })
    .pipe(gulp.dest('dist/css'));
});

// compile component css
gulp.task('css-component', function (done) {
  return gulp.src('src/js/app/**/*.css')
    .pipe(lazyTasks.lazyPostcssTask()).on('error', function (err) {
      done(err);
    })
    .pipe(gulp.dest('dist/js/app'));
});

// move img
gulp.task('img', function () {
  return gulp.src('src/**/*.+(jpg|jpeg|gif|png|otf|eot|svg|ttf|woff|woff2|ico|mp3|swf)')
    .pipe(gulp.dest('dist'));
});
