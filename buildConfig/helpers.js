const path = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const declarations = require('./declarations');

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

function extractBundle(filename, names) {
  return {
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ filename, names }),
    ],
  };
}

function clean(root) {
  return {
    plugins: [
      new Clean([path.join('**', '*')], { root }),
    ]
  }
}

module.exports = { devServer, optimizeForProd, extractBundle, clean };
