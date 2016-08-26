const path = require('path');
const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const PATHS = require('./misc').PATHS;
const bundle = require('./bundle');
const PKG = require('../package.json');

function output(target = PATHS.dist) {
  return {
    output: {
      path: target,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js',
    },
  };
}

const dependencies = Object.keys(PKG.dependencies)
  .filter(k => !['normalize.css'].includes(k));

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

function clean(path = PATHS.dist) {
  return {
    plugins: [new Clean([path], { root: process.cwd() })],
  };
}

module.exports = {
  PATHS,
  output,
  dependencies,
  extractBundle,
  bundle,
  devServer,
  generateHtml,
  optimizeForProd,
  clean,
};
