const fs = require('fs');
const path = require('path');
const {sourcePath, servePath, rootPath, outputFolders} = require('../config/index.js');

module.exports.refreshOutput = (originalPath) => {
  try {
    const factoryPath = originalPath.split(path.sep).join('/');
    const factoryFolderName = factoryPath.slice(sourcePath.length).split('/').filter(v => v)[0];
    const outputRoot = path.join(rootPath, servePath);
    const outputPath = path.join(rootPath, servePath, outputFolders[factoryFolderName], factoryPath.slice(`${sourcePath}/${factoryFolderName}`.length));
    const outputFolder = path.parse(outputPath).dir;
    const outputImageWebpPath = outputPath.replace(new RegExp(`${path.parse(outputPath).ext}$`), '.webp');

    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }

    if (fs.existsSync(outputImageWebpPath)) {
      fs.unlinkSync(outputImageWebpPath);
    }

    if (outputRoot !== outputFolder && fs.existsSync(outputFolder)) {
      if (fs.readdirSync(outputFolder).length === 0) {
        fs.rmdirSync(outputFolder);
      }
    }
  } catch (error) {
    console.log(error);
  }
}