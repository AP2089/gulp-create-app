const browserSync = require('browser-sync');
const {servePath} = require('../config');

const serverServe = (cb) => {
  browserSync.init({
    server: {
      baseDir: servePath
    },
    notify: false,
    port: 9000,
    open: false
  });

  cb();
}

module.exports = {
  serverServe
}
