'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const config = require('./buildConfig');
const PKG = require('./package.json');

const BASE_CONFIG = merge({
  entry: {
    main: `${config.PATHS.src}/index.ts`,
  },
  plugins: [
    new webpack.DefinePlugin({
      COMPILE_CONSTANTS: {
        env: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}, config.extractBundle('vendor.js', Object.keys(PKG.dependencies)));

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
      config.uglifyJs());

    case 'test': return merge(BASE_CONFIG,
      devtool,
      config.definePlugins());

    default: throw new Error(`Build does not exist for environment: ${process.env.NODE_ENV}`);
  }
})());
