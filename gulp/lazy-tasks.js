/* global Buffer, __dirname */

var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    conf = require('./conf'),
    lazypipe = require('lazypipe'),
    postcss = require('gulp-postcss'),
    postcssImport = require('postcss-import'),
    postcssCssnext = require('postcss-cssnext'),
    through = require('through2'),
    propertyMerge = require('gulp-property-merge');

var EOL = '\n';

// lazy tasks

exports.lazyAmdWrapTask = lazypipe()
  .pipe(function () {
    return through.obj(function (file, enc, callback) {
      var contents = file.contents.toString();
      if ((/\bexports\.|\bmodule.exports\b|Object.defineProperty\(exports,/).test(contents)) {
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

exports.lazyInitHtmlTask = lazypipe()
  .pipe(propertyMerge, {
    properties: _.extend({}, {
      md5map: {}
    }, conf)
  });
