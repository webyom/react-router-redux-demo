/* global process */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gp = require('gulp-protractor');

// downloads the selenium webdriver
gulp.task('webdriver-update', gp.webdriver_update);

// setting up the test task
gulp.task('e2e', ['webdriver-update', 'serve'], function (done) {
  gulp.src(['dist/js/test/e2e/**/*.spec.js']).pipe(gp.protractor({
    configFile: 'protractor.conf.js',
  })).on('error', function (err) {
    gutil.log(gutil.colors.red(err.message));
    done();
    process.exit();
  }).on('end', function () {
    done();
    process.exit();
  });
});