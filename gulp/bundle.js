/* global process */

var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    gulp = require('gulp'),
    conf = require('./conf'),
    through = require('through2'),
    useref = require('gulp-useref'),
    amdBundler = require('gulp-amd-bundler'),
    htmlOptimizer = require('gulp-html-optimizer'),
    propertyMerge = require('gulp-property-merge');

var AMD_BUNDLE_SRC = [
  'dist/js/app/**/*-main.js',
  'dist/js/app/**/main.js'
];

var md5map = {};

var isRelativeDependency = function (dep, isRelative, reqFilePath) {
  if (dep == './main') {
    return true;
  } else if ((/^\.\.|\bmain$/).test(dep)) {
    return false;
  } else {
    return isRelative;
  }
};

// bundle
gulp.task('bundle', ['bundle-amd', 'bundle-html']);

// bundle amd modules
gulp.task('bundle-amd', function () {
  return gulp.src(AMD_BUNDLE_SRC)
    .pipe(amdBundler({
      isRelativeDependency: isRelativeDependency
    }))
    .pipe(gulp.dest('dist/js/app'));
});

// generate md5map for async loaded js
gulp.task('gen-md5map', ['bundle-amd'], function () {
  return gulp.src(AMD_BUNDLE_SRC.concat([
      'dist/js/vendor/**/*.js'
  ]))
    .pipe(through.obj(function (file, enc, next) {
      if (fs.statSync(file.path).isDirectory()) {
        next();
        return;
      }
      var md5 = crypto.createHash('md5')
          .update(fs.readFileSync(file.path))
          .digest('hex');
      md5 = md5.substr(0, conf.VERSION_DIGEST_LEN);
      md5map[file.path.split('/dist/js/')[1]] = md5;
      next();
    }));
});

// bundle html
gulp.task('bundle-html', ['gen-md5map'], function () {
  return gulp.src([
      'dist/**/*.html'
  ])
    .pipe(propertyMerge({
      properties: _.extend({}, {
        md5map: md5map
      }, conf)
    }))
    .pipe(htmlOptimizer({
      requireBaseDir: 'dist/js',
      isRelativeDependency: isRelativeDependency
    }))
    .pipe(useref({
      searchPath: 'dist',
      base: 'dist'
    }))
    .pipe(through.obj(function (file, enc, next) {
      file.base = file.base.split(/\/dist(\/|$)/)[0] + '/dist';
      this.push(file);
      next();
    }))
    .pipe(gulp.dest('dist'));
});

module.exports.isRelativeDependency = isRelativeDependency;
