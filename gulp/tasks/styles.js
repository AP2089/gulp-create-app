const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const cleanCSS = require('gulp-clean-css');
const {errorMessage} = require('../helpers/errorMessage');
const {sourcePath, servePath, buildPath} = require('../config');
const {refreshOutput} = require('../helpers/refreshOutput');

const stylesServe = () => {
  return src(`${sourcePath}/styles/*.scss`)
    .pipe(errorMessage('Styles'))
    .pipe(sass())
    .pipe(dest(`${servePath}/css`))
    .pipe(browserSync.stream());
}

const stylesWatcher = () => {
  return watch(`${sourcePath}/styles/**/*.scss`, stylesServe)
    .on('unlink', refreshOutput);
}

const stylesBuild = () => {
  return src(`${sourcePath}/styles/*.scss`)
    .pipe(errorMessage('Styles'))
    .pipe(sass())
    .pipe(cleanCSS({
      level: {
        1: {
          specialComments: false
        }
      }
    }))
    .pipe(dest(`${buildPath}/css`));
}

module.exports = {
  stylesServe,
  stylesWatcher,
  stylesBuild
}