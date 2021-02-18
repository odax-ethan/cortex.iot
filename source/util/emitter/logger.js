// module.exports = console;
const { Console } = require('console');
const fs = require('fs')
const path = require('path')

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}
const initDate = Date.now();
const d = initDate;
console.log(d);
let outputTarget = `./log/${initDate}/stdout.log `
let errorOutputTarget = `./log/${initDate}/stderr.log`
ensureDirectoryExistence(outputTarget)
ensureDirectoryExistence(errorOutputTarget)

const output = fs.createWriteStream(outputTarget);
const errorOutput = fs.createWriteStream(errorOutputTarget);
// custom simple logger
const logger = new Console(output, errorOutput);

// let count = 4

// logger.log('this is log', count);
// // in stdout.log: count 5
// logger.info('this info', count)
// logger.error('this is an error', count)
// logger.warn('this is a warning', count)
// logger.debug('this is a debug', count)

module.exports = {logger}