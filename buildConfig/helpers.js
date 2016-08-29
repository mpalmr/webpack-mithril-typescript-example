/**
 * Contains functions to mutate configuration to merge various modifications.
 */

const path = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const vars = require('./vars');

/**
 * Provides an instance of the HMR plugin and devServer configuration.
 * NOTE: watchOptions fixes issues found on some operating systems such as Windows and Ubuntu. If
 *  if performance becomes a problem try removing these lines *IF*
 *  they significantly speed up builds
 * @return {Object} Webpack configuration addition to be merged
 */
function devServer() {
  return {
    plugins: [new webpack.HotModuleReplacementPlugin({ multiStep: true })],
    devServer: {
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

/**
 * Run JavaScript through UglifyJS and a plugin that safely removes duplicate code. All other
 * production optimizations should be placed here.
 * @return {Object} Webpack configuration addition to be merged
 */
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

/**
 * Extracts defined chunks into their own bundle such as 'vendor.js'.
 * @param {string} filename - Name of bundle to produce from defined chunks,
 * @param {Array<string>} names - Names of chunks to add into bundle,
 * @return {Object} Webpack configuration addition to be merged,
 */
function extractBundle(filename, names) {
  return { plugins: [new webpack.optimize.CommonsChunkPlugin({ filename, names })] };
}

/**
 * Cleans a particular directory, by default cleans the production build..
 * @param {string} root - Path of directory to clean.
 * @return {Object} Webpack configuration addition to be merged.
 */
function clean(root = vars.PATHS.dist) {
  return { plugins: [new Clean([path.join('**', '*')], { root })] };
}

module.exports = {
  devServer,
  optimizeForProd,
  extractBundle,
  clean,
};
