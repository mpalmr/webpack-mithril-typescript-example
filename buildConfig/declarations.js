const path = require('path');
const PKG = require('../package.json');

const paths = {
  src: path.join(process.cwd(), 'src'),
  dist: path.join(process.cwd(), 'dist'),
};

const files = {
  keepName: process.env.NODE_ENV === 'production' ? '[name].[chunkhash]' : '[name]',
  hashOnly: process.env.NODE_ENV === 'production' ? '[chunkhash]' : '',
};

const dependencies = Object.keys(PKG.dependencies)
  .filter(k => !['normalize.css'].includes(k));

module.exports = { paths, files, dependencies };
