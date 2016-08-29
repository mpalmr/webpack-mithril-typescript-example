'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const config = require('./buildConfig/webpack');

module.exports = validate(merge(config.base, (() => {
  const GENERATE_SOURCE_MAPS = { devtool: 'eval-source-map' };
  switch (process.env.NODE_ENV) {

    case 'development': return merge(
      GENERATE_SOURCE_MAPS,
      config.generateHtml(),
      config.devServer());

    case 'production': return merge(
      config.clean(),
      config.generateHtml(),
      config.copyStatic(),
      config.optimizeForProd());

    case 'test': return merge(
      GENERATE_SOURCE_MAPS,
      config.clean(),
      config.optimizeForProd());

    default: throw new Error(`Build does not exist for environment: ${process.env.NODE_ENV}`);
  }
})()), { quiet: process.env.npm_lifecycle_event === 'stats' });
