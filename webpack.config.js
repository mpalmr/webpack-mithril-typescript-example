'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const Clean = require('clean-webpack-plugin');
const config = require('./buildConfig');

const BASE_CONFIG = merge({
  entry: {
    main: `${config.PATHS.src}/index.ts`,
  },
  output: {
    path: config.PATHS.dist,
    filename: `${config.fileName}.js`,
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    root: config.PATHS.src,
    extensions: ['', '.js', '.ts'],
  },
  plugins: [
    new Clean([config.PATHS.dist], { root: path.join(process.cwd()) }),
    new webpack.DefinePlugin({
      COMPILE_CONSTANTS: {
        env: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}, config.extractBundle(`vendor.${config.FILES.hashOnly}.js`, config.DEPENDENCIES));

module.exports = validate((() => {
  const devtool = { devtool: 'eval-source-map' };
  switch (process.env.NODE_ENV) {

    case 'development': return merge(BASE_CONFIG,
      devtool,
      config.generateHtml(),
      config.bundle.typeScript(),
      config.bundle.style(),
      config.devServer());

    case 'production': return merge(BASE_CONFIG,
      config.generateHtml(),
      config.bundle.typeScript(),
      config.bundle.style(true),
      config.optimizeForProd());

    case 'test': return merge(BASE_CONFIG,
      devtool,
      config.definePlugins());

    default: throw new Error(`Build does not exist for environment: ${process.env.NODE_ENV}`);
  }
})(), { quiet: process.env.npm_lifecycle_event === 'stats' });
