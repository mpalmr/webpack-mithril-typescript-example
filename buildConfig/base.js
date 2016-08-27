const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Clean = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const declarations = require('./declarations');
const helpers = require('./helpers');

const base = merge({
  entry: {
    main: path.join(declarations.paths.src, 'index.ts'),
  },
  output: {
    path: declarations.paths.dist,
    filename: `${declarations.files.keepName}.js`,
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    root: declarations.paths.src,
    extensions: ['', '.js', '.ts'],
  },
  plugins: [
    new Clean([path.join('**', '*')], { root: declarations.paths.dist }),
    new webpack.DefinePlugin({
      COMPILE_CONSTANTS: {
        env: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}, helpers.extractBundle(`vendor.${declarations.files.hashOnly}.js`, declarations.dependencies));

module.exports = { base };
