const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

module.exports.errorMessage = (title) => {
  return plumber({
    errorHandler: notify.onError({
      title,
      message: 'Error: <%= error.message %>'
    })
  })
}