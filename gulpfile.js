'use strict';

const {series, parallel} = require('gulp');
const {cleanServe, cleanBuild} = require('./gulp/tasks/clean');
const {layoutsServe, layoutsWatcher, layoutsBuild} = require('./gulp/tasks/layouts');
const {stylesServe, stylesWatcher, stylesBuild} = require('./gulp/tasks/styles');
const {scriptsServe, scriptsWatcher, scriptsBuild} = require('./gulp/tasks/scripts');
const {fontsServe, fontsWatcher, fontsBuild} = require('./gulp/tasks/fonts');
const {imagesServe, imagesWatcher, imagesBuild} = require('./gulp/tasks/images');
const {spritesServe, spritesWatcher, spritesBuild} = require('./gulp/tasks/sprites');
const {dataServe, dataWatcher, dataBuild} = require('./gulp/tasks/data');
const {serverServe} = require('./gulp/tasks/server');

exports.serve = series(
  cleanServe,
  parallel(
    layoutsServe,
    stylesServe,
    scriptsServe,
    imagesServe,
    fontsServe,
    spritesServe,
    dataServe
  ),
  serverServe,
  parallel(
    layoutsWatcher,
    stylesWatcher,
    scriptsWatcher,
    imagesWatcher,
    fontsWatcher,
    spritesWatcher,
    dataWatcher
  )
);

exports.build = series(
  cleanBuild,
  parallel(
    layoutsBuild,
    stylesBuild,
    scriptsBuild,
    imagesBuild,
    dataBuild,
    fontsBuild,
    spritesBuild
  )
);