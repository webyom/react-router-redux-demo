var gulp = require('gulp'),
    wrench = require('wrench'),
    runSequence = require('run-sequence');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', function (done) {
  runSequence('clean', 'init', 'versioning-asset', 'bundle', 'versioning-page', 'eslint-final', 'minify', 'clean-bundle', function (err) {
    done(err);
    if (err) {
      setTimeout(function () {
        runSequence('clean');
      }, 1000);
    }
  });
});
