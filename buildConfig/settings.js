const path = require('path');
const PKG = require('../package.json');

// Project paths
const paths = {
  src: path.join(process.cwd(), 'src'),
  dist: path.join(process.cwd(), 'dist'),
  assets: path.join(process.cwd(), 'assets'),
  reports: path.join(process.cwd(), 'reports'),
};
paths.htmlTemplate = path.join(paths.assets, 'template.html');

// Declares naming schemes to be used by webpack
const fileSchemes = {
  keepName: process.env.NODE_ENV === 'production' ? '[name].[chunkhash]' : '[name]',
  hashOnly: process.env.NODE_ENV === 'production' ? '.[chunkhash]' : '',
};

// Filters all dependancies from this project's package.json file for
// things to be included in the vendor.js bundle
const dependencies = Object.keys(PKG.dependencies)
  .filter(k => !['normalize.css'].includes(k));

module.exports = { paths, fileSchemes, dependencies };
