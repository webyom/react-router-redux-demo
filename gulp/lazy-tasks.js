/* global Buffer, __dirname */

var fs = require('fs'),
    path = require('path'),
    lazypipe = require('lazypipe'),
    postcss = require('gulp-postcss'),
    postcssImport = require('postcss-import'),
    postcssCssnext = require('postcss-cssnext'),
    through = require('through2');

var EOL = '\n';

// lazy tasks

exports.lazyAmdWrapTask = lazypipe()
  .pipe(function () {
    return through.obj(function (file, enc, callback) {
      var contents = file.contents.toString();
      if ((/\bexports\.|\bmodule.exports\b/).test(contents)) {
        file.contents = new Buffer([
          'define(function(require, exports, module) {',
          file.contents.toString(),
          '});'
        ].join(EOL));
      }
      this.push(file);
      callback();
    });
  });

exports.lazyPostcssTask = lazypipe()
  .pipe(postcss, [
    postcssImport(),
    postcssCssnext({
      browsers: ['not ie <= 8']
    })
  ]);
