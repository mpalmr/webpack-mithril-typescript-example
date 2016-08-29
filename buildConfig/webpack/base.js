const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const settings = require('./vars');
const helpers = require('./helpers');
const assets = require('./assets');

// Base configuration all builds are merged into
module.exports = merge({
  entry: {
    main: path.join(settings.PATHS.src, 'index.ts'),
  },
  output: {
    path: settings.PATHS.dist,
    filename: `${settings.FILE_SCHEMES.keepName}.js`,
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    root: settings.PATHS.src,
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
  helpers.extractBundle(`vendor${settings.FILE_SCHEMES.hashOnly}.js`, settings.DEPENDENCIES),
  assets.typeScript(),
  assets.style());
