const webpack = require('webpack');
const PATHS = require('./misc').PATHS;
const bundle = require('./bundle');

function optimizeForProduction() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { drop_console: true },
        mangle: {
          except: ['webpackJsonp'],
          screw_ie8: true,
        },
      }),
    ],
  };
}

module.exports = { PATHS, bundle, optimizeForProduction };
