var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf'),
    digestVersioning = require('gulp-digest-versioning');

var fixUrl = function (fileName, relPath, basePath) {
  if (!(/^\//).test(fileName)) {
    var filePath = path.resolve(path.dirname(relPath), fileName);
    fileName = '/' + path.relative(basePath, filePath);
  }
  return conf.cdn + fileName;
};

// digest versioning template and css
gulp.task('versioning-asset', function () {
  return gulp.src([
    'dist/**/*.css',
    'dist/js/**/*.html'
  ])
    .pipe(digestVersioning({
      digestLength: conf.VERSION_DIGEST_LEN,
      basePath: 'dist',
      fixUrl: fixUrl
    }))
    .pipe(gulp.dest('dist'));
});

// digest versioning html page
gulp.task('versioning-page', function () {
  return gulp.src([
    'dist/index.html'
  ])
    .pipe(digestVersioning({
      digestLength: conf.VERSION_DIGEST_LEN,
      basePath: 'dist',
      fixUrl: fixUrl
    }))
    .pipe(gulp.dest('dist'));
});
