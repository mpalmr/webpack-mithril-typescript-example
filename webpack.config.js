'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const config = require('./buildConfig');

const BASE_CONFIG = merge({
  entry: {
    main: `${config.PATHS.src}/index.ts`,
  },
  resolve: {
    root: config.PATHS.src,
    extensions: ['', '.js', '.ts'],
  },
  plugins: [
    new webpack.DefinePlugin({
      COMPILE_CONSTANTS: {
        env: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}, config.extractBundle('vendor.[chunkhash].js', config.dependencies));

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
      config.output(),
      config.generateHtml(),
      config.bundle.typeScript(),
      config.bundle.style(true),
      config.optimizeForProd(),
      config.clean());

    case 'test': return merge(BASE_CONFIG,
      devtool,
      config.definePlugins());

    default: throw new Error(`Build does not exist for environment: ${process.env.NODE_ENV}`);
  }
})());
