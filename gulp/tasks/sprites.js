const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync');
const svgSprite = require('gulp-svg-sprite');
const {errorMessage} = require('../helpers/errorMessage');
const {sourcePath, servePath, rootPath, buildPath} = require('../config');

const spritesServe = () => {
  return src(`${sourcePath}/sprites/**/*.svg`)
    .pipe(errorMessage('Sprites'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: `${rootPath}/sprite.svg`
        }
      }
    }))
    .pipe(dest(`${servePath}/img`))
    .pipe(browserSync.stream());
}

const spritesWatcher = () => {
  return watch(`${sourcePath}/sprites/**/*.svg`, spritesServe);
}

const spritesBuild = () => {
  return src(`${sourcePath}/sprites/**/*.svg`)
    .pipe(errorMessage('Sprites'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: `${rootPath}/sprite.svg`
        }
      }
    }))
    .pipe(dest(`${buildPath}/img`));
}

module.exports = {
  spritesServe,
  spritesWatcher,
  spritesBuild
}