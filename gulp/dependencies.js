var gulp = require('gulp'),
    async = require('async'),
    mt2amd = require('gulp-mt2amd'),
    amdBundler = require('gulp-amd-bundler'),
    through = require('through2');

// move dependencies into build dir
gulp.task('dependencies', ['bundle-js-dependencies', 'bundle-css-dependencies', 'copy-js-dependencies', 'copy-css-dependencies']);

gulp.task('bundle-js-dependencies', function (done) {
  async.each([
  ], function (item, done) {
    var src = item, dest = '';
    if (Array.isArray(item)) {
      src = item[0];
      dest = item[1];
    } else {
      dest = item.match(/(?:node_modules|bower_components)\/([^\/]+)/);
      dest = dest && dest[1] || '';
    }
    gulp.src(src)
      .pipe(amdBundler({
        isRelativeDependency: require('./bundle').isRelativeDependency
      }))
      .pipe(gulp.dest('dist/js/vendor/' + dest)).on('finish', done);
  }, done);
});

gulp.task('bundle-css-dependencies', function (done) {
  async.each([
    'node_modules/bootstrap-datetime-picker/css/bootstrap-datetimepicker.css'
  ], function (item, done) {
    var src = item, dest = '';
    if (Array.isArray(item)) {
      src = item[0];
      dest = item[1];
    } else {
      dest = item.match(/(?:node_modules|bower_components)\/([^\/]+)/);
      dest = dest && dest[1] || '';
    }
    gulp.src(src)
      .pipe(mt2amd())
      .pipe(gulp.dest('dist/js/vendor/' + dest)).on('finish', done);
  }, done);
});

gulp.task('copy-js-dependencies', function (done) {
  async.each([
    'node_modules/babel-polyfill/dist/polyfill.js',
    'node_modules/yom-require/src/require.js',
    'node_modules/immutable/dist/immutable.js',
    'node_modules/react/dist/react-with-addons.js',
    'node_modules/react-dom/dist/react-dom.js',
    'node_modules/react-router/umd/ReactRouter.js',
    'bower_components/reflux/dist/reflux.js',
    'bower_components/core-decorators.js/core-decorators.js',
    'node_modules/bluebird/js/browser/bluebird.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/classnames/index.js',
    'node_modules/yom-form-util/dist/yom-form-util.js',
    'node_modules/yom-auto-complete/dist/yom-auto-complete.js',
    'node_modules/yom-data-grid/dist/yom-data-grid.js',
    'node_modules/bootstrap-datetime-picker/js/bootstrap-datetimepicker.js', 'node_modules/bootstrap-datetime-picker/js/locales/bootstrap-datetimepicker.zh-CN.js'
  ], function (item, done) {
    var src = item, dest = '';
    if (Array.isArray(item)) {
      src = item[0];
      dest = item[1];
    } else {
      dest = item.match(/(?:node_modules|bower_components)\/([^\/]+)/);
      dest = dest && dest[1] || '';
    }
    gulp.src(src)
      .pipe(gulp.dest('dist/js/vendor/' + dest)).on('finish', done);
  }, done);
});

gulp.task('copy-css-dependencies', function (done) {
  async.each([
    ['node_modules/font-awesome/css/font-awesome.css', 'font-awesome/css'],
    ['node_modules/font-awesome/fonts/**/*', 'font-awesome/fonts']
  ], function (item, done) {
    var src = item, dest = '';
    if (Array.isArray(item)) {
      src = item[0];
      dest = item[1];
    } else {
      dest = item.match(/(?:node_modules|bower_components)\/([^\/]+)/);
      dest = dest && dest[1] || '';
    }
    gulp.src(src)
      .pipe(gulp.dest('dist/css/vendor/' + dest)).on('finish', done);
  }, done);
});
