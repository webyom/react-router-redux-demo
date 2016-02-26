var gulp = require('gulp'),
    eslint = require('gulp-eslint');

// eslint js final, check console.log ...
gulp.task('eslint-final', function () {
  return gulp.src([
    'dist/js/app/**/*.js',
    'dist/js/config/**/*.js'
  ])
    .pipe(eslint({
      useEslintrc: false,
      rules: {
        "no-console": 2
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
