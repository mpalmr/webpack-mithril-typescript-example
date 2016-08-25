'use strict';
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const config = require('./buildConfig');

const BASE_CONFIG = {
  entry: {
    main: `${config.PATHS.src}/index.ts`,
  },
};

module.exports = validate((buildName => {
  switch (buildName) {

    case 'start': return merge(BASE_CONFIG,
      { devtool: 'eval-source-map' },
      config.generateHtml(),
      config.bundle.typeScript(),
      config.bundle.style(),
      config.devServer());

    case 'build': return merge(BASE_CONFIG,
      config.output(),
      config.generateHtml(),
      config.bundle.typeScript(),
      config.bundle.style(true),
      config.uglifyJs());

    default: throw new Error(`Build does not exist: ${buildName}`);
  }
})(process.env.npm_lifecycle_event));
