const webpack = require('webpack');
const PATHS = require('./misc').PATHS;
const bundle = require('./bundle');

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

function uglifyJs() {
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

module.exports = { PATHS, bundle, devServer, uglifyJs };
