/**
 * Webpack's configuration is dynamically build using the webpack-merge module.
 * The base configuration all builds are merged into is exported from ./buildConfig/base.js.
 * The build that is ran is based off the value of NODE_ENV set via npm scripts.
 * This specific configuration of Webpack should NOT be evoked by anything other than an npm script
 * found in this repo's package.json file. More details can be found in this project's README.md
 */

'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const config = require('./buildConfig');

module.exports = validate(merge(config.base, (() => {
  const GENERATE_SOURCE_MAPS = { devtool: 'eval-source-map' };
  switch (process.env.NODE_ENV) {

    /**
     * DEVELOPMENT: Spins up an instance of webpack-dev-server with HMR which serves an entire
     * fully working instance of the application.
     */
    case 'development': return merge(
      GENERATE_SOURCE_MAPS,
      config.assets.generateHtml(),
      config.helpers.devServer());

    /**
     * PRODUCTION: Compiles and optimizes all assets ready to be deployed to a production
     * environment. These files are written to the directory './dist'.
     */
    case 'production': return merge(
      config.helpers.clean(),
      config.assets.generateHtml(),
      config.assets.copyStatic(),
      config.helpers.optimizeForProd());

    /**
     * TEST: Generate the minimum amount of the project required to reliably run automated tests.
     */
    case 'test': return merge(
      GENERATE_SOURCE_MAPS,
      config.helpers.clean(),
      config.helpers.optimizeForProd());

    default: throw new Error(`Build does not exist for environment: ${process.env.NODE_ENV}`);
  }
})()), { quiet: process.env.npm_lifecycle_event === 'stats' });
