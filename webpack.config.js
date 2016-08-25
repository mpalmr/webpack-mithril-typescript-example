'use strict';
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const config = require('./buildConfig');

const BASE_CONFIG = {
  entry: {
    main: `${config.PATHS.src}/main.ts`,
  },
  output: {
    path: config.PATHS.dist,
    filename: '[name].js',
  },
};

module.exports = validate((buildName => {
  switch (buildName) {

    case 'start': return merge(BASE_CONFIG,
      config.bundle.typeScript(true));

    case 'build': return merge(BASE_CONFIG,
      config.bundle.typeScript(),
      config.optimizeForProduction());

    default: throw new Error(`Build does not exist: ${buildName}`);
  }
})(process.env.npm_lifecycle_event));
