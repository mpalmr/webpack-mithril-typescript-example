'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const Clean = require('clean-webpack-plugin');
const config = require('./buildConfig');

const BASE_CONFIG = merge({
  entry: {
    main: `${config.paths.src}/index.ts`,
  },
  output: {
    path: config.paths.dist,
    filename: `${config.files.keepName}.js`,
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    root: config.paths.src,
    extensions: ['', '.js', '.ts'],
  },
  plugins: [
    new Clean([config.paths.dist], { root: path.join(process.cwd()) }),
    new webpack.DefinePlugin({
      COMPILE_CONSTANTS: {
        env: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}, config.extractBundle(`vendor.${config.files.hashOnly}.js`, config.dependencies));

module.exports = validate((() => {
  switch (process.env.NODE_ENV) {

    case 'development': return merge(BASE_CONFIG,
      config.generateHtml(),
      config.bundle.typeScript(),
      config.bundle.style(),
      config.devServer(),
      { devtool: 'eval-source-map' });

    case 'production': return merge(BASE_CONFIG,
      config.generateHtml(),
      config.bundle.typeScript(),
      config.bundle.style(true),
      config.optimizeForProd());

    case 'test': return merge(BASE_CONFIG,
      config.definePlugins());

    default: throw new Error(`Build does not exist for environment: ${process.env.NODE_ENV}`);
  }
})(), { quiet: process.env.npm_lifecycle_event === 'stats' });
