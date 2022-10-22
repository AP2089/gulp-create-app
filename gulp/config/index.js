const path = require('path');

const rootPath = path.join(__dirname, '..', '..');
const sourcePath = 'src';
const servePath = 'public';
const buildPath = 'dist';

const outputFolders = {
  layouts: '',
  data: 'data',
  fonts: 'fonts',
  images: 'img',
  scripts: 'js',
  styles: 'css'
}

module.exports = {
  rootPath,
  sourcePath,
  servePath,
  buildPath,
  outputFolders
}