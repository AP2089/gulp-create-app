const {src, dest, watch} = require('gulp');
const fileinclude = require('gulp-file-include');
const htmlbeautify = require('gulp-html-beautify');
const browserSync = require('browser-sync');
const {errorMessage} = require('../helpers/errorMessage');
const {sourcePath, servePath, buildPath} = require('../config');
const {refreshOutput} = require('../helpers/refreshOutput');

const layoutsServe = () => {
  return src(`${sourcePath}/layouts/*.html`)
    .pipe(errorMessage('Layouts'))
    .pipe(fileinclude())
    .pipe(dest(servePath))
    .pipe(browserSync.stream());
}

const layoutsWatcher = () => {
  return watch(`${sourcePath}/layouts/**/*.html`, layoutsServe)
    .on('unlink', refreshOutput);
}

const layoutsBuild = () => {
  return src(`${sourcePath}/layouts/*.html`)
    .pipe(errorMessage('Layouts'))
    .pipe(fileinclude())
    .pipe(htmlbeautify({
      indent_size: 2,
      wrap_attributes_indent_size: 2,
      preserve_newlines: false,
      indent_inner_html: true,
      extra_liners: []
    }))
    .pipe(dest(buildPath));
}

module.exports = {
  layoutsServe,
  layoutsWatcher,
  layoutsBuild
}