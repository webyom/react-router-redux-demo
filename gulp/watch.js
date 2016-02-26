/* global process, Buffer */

var path = require('path'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    babel = require('gulp-babel'),
    less = require('gulp-less'),
    eslint = require('gulp-eslint'),
    through = require('through2'),
    lazyTasks = require('./lazy-tasks');

// watch for changes and run the relevant task
gulp.task('watch', function () {
  process.on('uncaughtException', function (err) {
    console.log(err.stack || err.message || err);
  });

  gulp.watch('src/js/**/*.+(js|jsx)', function (evt) {
    var filePath = evt.path;
    var part = (path.dirname(filePath) + '/').split('/src/js/').pop();
    gutil.log(gutil.colors.cyan('[changed]'), filePath);
    return gulp.src(filePath)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(babel())
      .pipe(lazyTasks.lazyAmdWrapTask())
      .pipe(gulp.dest('dist/js/' + part));
  });

  gulp.watch('src/**/*.html', function (evt) {
    var filePath = evt.path;
    var part = (path.dirname(filePath) + '/').split('/src/').pop();
    gutil.log(gutil.colors.cyan('[changed]'), filePath);
    return gulp.src(filePath)
      .pipe(gulp.dest('dist/' + part));
  });

  gulp.watch('src/**/*.less', function (evt) {
    var filePath = evt.path;
    var part = (path.dirname(filePath) + '/').split('/src/').pop();
    gutil.log(gutil.colors.cyan('[changed]'), filePath);
    if ((/(^|\-)main.less$/).test(path.basename(filePath)) || filePath.indexOf('/js/app/') > 0) {
      return gulp.src(filePath)
        .pipe(less()).on('error', function (err) {
          gutil.log(gutil.colors.red(err.message));
        })
        .pipe(lazyTasks.lazyPostcssTask()).on('error', function (err) {
          gutil.log(gutil.colors.red(err.message));
        })
        .pipe(gulp.dest('dist/' + part));
    } else {
      return gulp.start('css');
    }
  });

  gulp.watch('src/**/*.css', function (evt) {
    var filePath = evt.path;
    var part = (path.dirname(filePath) + '/').split('/src/').pop();
    gutil.log(gutil.colors.cyan('[changed]'), filePath);
    if ((/(^|\-)main.css/).test(path.basename(filePath)) || filePath.indexOf('/js/app/') > 0) {
      return gulp.src(filePath)
        .pipe(lazyTasks.lazyPostcssTask()).on('error', function (err) {
          gutil.log(gutil.colors.red(err.message));
        })
        .pipe(gulp.dest('dist/' + part));
    } else {
      return gulp.start('css');
    }
  });
});
