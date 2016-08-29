'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const config = require('./buildConfig');

module.exports = validate(merge(config.base, (() => {
  const GENERATE_SOURCE_MAPS = { devtool: 'eval-source-map' };
  switch (process.env.NODE_ENV) {

    case 'development': return merge(
      GENERATE_SOURCE_MAPS,
      config.assets.generateHtml(),
      config.helpers.devServer());

    case 'production': return merge(
      config.helpers.clean(),
      config.assets.generateHtml(),
      config.assets.copyStatic(),
      config.helpers.optimizeForProd());

    case 'test': return merge(
      GENERATE_SOURCE_MAPS,
      config.helpers.clean(),
      config.helpers.optimizeForProd());

    default: throw new Error(`Build does not exist for environment: ${process.env.NODE_ENV}`);
  }
})()), { quiet: process.env.npm_lifecycle_event === 'stats' });
