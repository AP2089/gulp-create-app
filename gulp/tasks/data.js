const {src, dest, watch} = require('gulp');
const jsonMinify = require('gulp-json-minify');
const browserSync = require('browser-sync');
const {errorMessage} = require('../helpers/errorMessage');
const {sourcePath, servePath, buildPath} = require('../config');
const {refreshOutput} = require('../helpers/refreshOutput');

const dataServe = () => {
  return src(`${sourcePath}/data/**/*`)
    .pipe(errorMessage('Data'))
    .pipe(dest(`${servePath}/data`))
    .pipe(browserSync.stream());
}

const dataWatcher = () => {
  return watch(`${sourcePath}/data/**/*`, dataServe)
    .on('unlink', refreshOutput);
}

const dataBuild = () => {
  return src(`${sourcePath}/data/**/*`)
    .pipe(errorMessage('Data'))
    .pipe(jsonMinify())
    .pipe(dest(`${buildPath}/data`));
}

module.exports = {
  dataServe,
  dataWatcher,
  dataBuild
}