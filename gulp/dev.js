/* global process, __dirname */

var path = require('path'),
    gulp = require('gulp'),
    liveServer = require('live-server'),
    karma = require('karma');

// run development task
gulp.task('dev', ['watch', 'serve']);

gulp.task('serve', ['init'], function (done) {
  var params = {
    port: process.env.DEV_SERVER_PORT || 3007, // Set the server port. Defaults to 8080.
    host: '0.0.0.0', // Set the address to bind to. Defaults to 0.0.0.0.
    root: 'dist', // Set root directory that's being server. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    file: 'index.html', // When set, serve this file for every 404 (useful for single-page applications)
    wait: 1000 // Waits for all changes, before reloading. Defaults to 0 sec.
  };
  liveServer.start(params);
  if (process.env.RUN_TEST == '1') {
    new karma.Server({
      configFile: path.join(__dirname, '../karma.conf.js'),
      singleRun: false,
      reporters: ['mocha'],
      preprocessors: null
    }).start();
  }
  done();
});