const path = require('path');
const PKG = require('../package.json');

// Project paths
const PATHS = {
  src: path.join(process.cwd(), 'src'),
  dist: path.join(process.cwd(), 'dist'),
  assets: path.join(process.cwd(), 'assets'),
  reports: path.join(process.cwd(), 'reports'),
};
PATHS.htmlTemplate = path.join(PATHS.assets, 'template.html');
PATHS.assetsProductionPath = path.join(PATHS.dist, 'assets');

// Declares naming schemes to be used by webpack
const FILE_SCHEMES = {
  keepName: process.env.NODE_ENV === 'production' ? '[name].[chunkhash]' : '[name]',
  hashOnly: process.env.NODE_ENV === 'production' ? '.[chunkhash]' : '',
};

// Filters all dependancies from this project's package.json file for
// things to be included in the vendor.js bundle
const DEPENDENCIES = Object.keys(PKG.dependencies)
  .filter(k => !['normalize.css'].includes(k));

// package.json derrived constants
const BABEL_CONFIG = JSON.stringify(Object.assign(PKG.babel, {
  sourceMap: true,
  cacheDirectory: true,
}));
const SUPPORTED_BROWSERS = PKG.config.supportedBrowsers;

module.exports = {
  PATHS,
  FILE_SCHEMES,
  DEPENDENCIES,
  BABEL_CONFIG,
  SUPPORTED_BROWSERS,
};
