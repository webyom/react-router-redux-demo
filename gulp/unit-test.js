/* global process, __dirname */

var path = require('path'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    karma = require('karma');

gulp.task('test', ['init'], function (done) {
  new karma.Server({
    configFile: path.join(__dirname, '../karma.conf.js'),
    singleRun: true
  }, function (exitCode) {
    var msg = 'Karma has exited with ' + exitCode;
    done();
    gutil.log(gutil.colors[exitCode ? 'red' : 'green'](msg));
    process.exit(exitCode);
  }).start();
});