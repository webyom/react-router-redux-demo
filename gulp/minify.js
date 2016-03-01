var gulp = require('gulp'),
    conf = require('./conf'),
    minify = require('gulp-minifier');

// minify js, css, html
gulp.task('minify', function () {
  return gulp.src([
      'dist/**/*.+(js|css)',
      'dist/**/*.html'
  ])
    .pipe(minify({
      minify: conf.env == 'production',
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true,
      minifyCSS: true,
      getKeptComment: function (content, filePath) {
        var res = [];
        var m;
        m = content.match(/\/\*[\s\S]*?\*\//img);
        if (m) {
          m.forEach(function (c) {
            if (c.indexOf('/*!') === 0) {
              res.push(c);
            }
          });
        }
        return res.length && res.join('\n') + '\n' || '';
      }
    }))
    .pipe(gulp.dest('dist'));
});
