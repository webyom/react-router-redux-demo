window.__karma__.loaded = function () {};

(() => {
  var TEST_REGEXP = /(spec|test)\.js$/i;
  var allTestFiles = [];

  // Get a list of all the test files to include
  for (let file of Object.keys(window.__karma__.files)) {
    if (TEST_REGEXP.test(file) && file.indexOf('/test/e2e/') === -1) {
      // Normalize paths to RequireJS module names.
      // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
      // then do not normalize the paths
      let normalizedTestModule = file.replace(/^\/base\/js\/|\.js$/g, '');
      allTestFiles.push(normalizedTestModule);
    }
  }

  require(allTestFiles, window.__karma__.start);
})();