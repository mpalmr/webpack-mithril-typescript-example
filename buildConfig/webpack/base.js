const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const settings = require('./settings');
const helpers = require('./helpers');
const assets = require('./assets');

// Base configuration all builds are merged into
const base = merge({
  entry: {
    main: path.join(settings.paths.src, 'index.ts'),
  },
  output: {
    path: settings.paths.dist,
    filename: `${settings.fileSchemes.keepName}.js`,
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    root: settings.paths.src,
    extensions: ['', '.js', '.ts'],
  },
  plugins: [
    new webpack.DefinePlugin({
      COMPILE_CONSTANTS: {
        env: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
},
  helpers.extractBundle(`vendor${settings.fileSchemes.hashOnly}.js`, settings.dependencies),
  assets.typeScript(),
  assets.style());

module.exports = { base };
