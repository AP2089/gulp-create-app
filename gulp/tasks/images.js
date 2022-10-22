const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync');
const webp = require('gulp-webp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const {errorMessage} = require('../helpers/errorMessage');
const {sourcePath, servePath, buildPath} = require('../config');
const {refreshOutput} = require('../helpers/refreshOutput');

const imagesServe = () => {
  return src(`${sourcePath}/images/**/*.{jpg,jpeg,png}`)
    .pipe(errorMessage('Images'))
    .pipe(newer(`${servePath}/img`))
    .pipe(webp())
    .pipe(dest(`${servePath}/img`))
    .pipe(src(`${sourcePath}/images/**/*.{jpg,jpeg,png,webp,svg,gif,ico}`))
    .pipe(dest(`${servePath}/img`))
    .pipe(browserSync.stream());
}

const imagesWatcher = () => {
  return watch(`${sourcePath}/images/**/*.{jpg,jpeg,png,webp,svg,gif,ico}`, imagesServe)
    .on('unlink', refreshOutput);
}

const imagesBuild = () => {
  return src(`${sourcePath}/images/**/*.{jpg,jpeg,png}`)
    .pipe(errorMessage('Images'))
    .pipe(newer(`${buildPath}/img`))
    .pipe(webp())
    .pipe(dest(`${buildPath}/img`))
    .pipe(src(`${sourcePath}/images/**/*.{jpg,jpeg,png,webp,svg,gif,ico}`))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(dest(`${buildPath}/img`));
}

module.exports = {
  imagesServe,
  imagesWatcher,
  imagesBuild
}