const path = require('path');
const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const bundle = require('./bundle');
const PATHS = require('./constants').PATHS;
const FILES = require('./constants').FILES;
const DEPENDENCIES = require('./constants').DEPENDENCIES;

function extractBundle(filename, names) {
  return { plugins: [new webpack.optimize.CommonsChunkPlugin({ filename, names })] };
}

function devServer(host = 'localhost', port = 8080) {
  return {
    plugins: [new webpack.HotModuleReplacementPlugin({ multiStep: true })],
    devServer: {
      host, port,
      inline: true,
      hot: true,
      historyApiFallback: true,
      stats: 'errors-only',
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  };
}

function generateHtml() {
  return {
    plugins: [
      new Html({
        title: 'Example project',
        template: path.join(PATHS.src, 'template.html'),
      }),
    ],
  };
}

function optimizeForProd() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: { drop_console: true },
        mangle: {
          except: ['webpackJsonp'],
          screw_ie8: true,
        },
      }),
      new webpack.optimize.DedupePlugin(),
    ],
  };
}

module.exports = {
  PATHS,
  FILES,
  DEPENDENCIES,
  extractBundle,
  bundle,
  devServer,
  generateHtml,
  optimizeForProd,
};
