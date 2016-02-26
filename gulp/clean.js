var path = require('path'),
    gulp = require('gulp'),
    del = require('del');

gulp.task('clean', function () {
  return del(['dist/']);
});

gulp.task('clean-bundle', function () {
  return del([
    'dist/**/*.spec.js',
    'dist/js/test/',
    'dist/js/app/**/*.html',
    'dist/js/app/**/*.css'
  ]);
});