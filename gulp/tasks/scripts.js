const {src, dest, watch} = require('gulp');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync');
const TerserPlugin = require('terser-webpack-plugin');
const {errorMessage} = require('../helpers/errorMessage');
const {sourcePath, servePath, buildPath} = require('../config');
const {refreshOutput} = require('../helpers/refreshOutput');

const scriptsServe = () => {
  return src(`${sourcePath}/scripts/*.js`)
    .pipe(errorMessage('Scripts'))
    .pipe(webpack({
      mode: 'development'
    }))
    .pipe(dest(`${servePath}/js`))
    .pipe(browserSync.stream());
}

const scriptsWatcher = () => {
  return watch(`${sourcePath}/scripts/**/*.js`, scriptsServe)
    .on('unlink', refreshOutput);
}

const scriptsBuild = () => {
  return src(`${sourcePath}/scripts/*.js`)
    .pipe(errorMessage('Scripts'))
    .pipe(webpack({
      mode: 'production',
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false
              },
            },
            extractComments: false
          })
        ]
      }
    }))
    .pipe(dest(`${buildPath}/js`));
}

module.exports = {
  scriptsServe,
  scriptsWatcher,
  scriptsBuild
}
