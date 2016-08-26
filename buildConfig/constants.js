const path = require('path');
const PKG = require('../package.json');

const PATHS = {
  src: path.join(process.cwd(), 'src'),
  dist: path.join(process.cwd(), 'dist'),
};

const FILES = {
  keepName: process.env.NODE_ENV === 'production' ? '[name].[chunkhash]' : '[name]',
  hashOnly: process.env.NODE_ENV === 'production' ? '[chunkhash]' : '',
};

const DEPENDENCIES = Object.keys(PKG.dependencies)
  .filter(k => !['normalize.css'].includes(k));

module.exports = { PATHS, FILES, DEPENDENCIES };
