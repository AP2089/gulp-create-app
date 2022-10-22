const {src} = require('gulp');
const clean = require('gulp-clean');
const {errorMessage} = require('../helpers/errorMessage');
const {servePath, buildPath} = require('../config');

const cleanServe = () => {
  return src(servePath, {allowEmpty: true})
    .pipe(errorMessage('Clean'))
    .pipe(clean());
}

const cleanBuild = () => {
  return src(buildPath, {allowEmpty: true})
    .pipe(errorMessage('Clean'))
    .pipe(clean());
}

module.exports = {
  cleanServe,
  cleanBuild
}