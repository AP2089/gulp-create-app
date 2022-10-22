const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync');
const {errorMessage} = require('../helpers/errorMessage');
const {sourcePath, servePath, buildPath} = require('../config');
const {refreshOutput} = require('../helpers/refreshOutput');

const fontsServe = () => {
  return src(`${sourcePath}/fonts/**/*.{ttf,eot,woff,woff2,svg}`)
    .pipe(errorMessage('Fonts'))
    .pipe(dest(`${servePath}/fonts`))
    .pipe(browserSync.stream());
}

const fontsWatcher = () => {
  return watch(`${sourcePath}/fonts/**/*.{ttf,eot,woff,woff2,svg}`, fontsServe)
    .on('unlink', refreshOutput);
}

const fontsBuild = () => {
  return src(`${sourcePath}/fonts/**/*.{ttf,eot,woff,woff2,svg}`)
    .pipe(errorMessage('Fonts'))
    .pipe(dest(`${buildPath}/fonts`));
}

module.exports = {
  fontsServe,
  fontsWatcher,
  fontsBuild
}