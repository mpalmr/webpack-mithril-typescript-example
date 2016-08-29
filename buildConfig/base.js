const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const vars = require('./vars');
const helpers = require('./helpers');
const assets = require('./assets');

// Base configuration all builds are merged into
module.exports = merge({
  entry: {
    main: path.join(vars.PATHS.src, 'index.ts'),
  },
  output: {
    path: vars.PATHS.dist,
    filename: `${vars.FILE_SCHEMES.keepName}.js`,
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    root: vars.PATHS.src,
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
  helpers.extractBundle(`vendor${vars.FILE_SCHEMES.hashOnly}.js`, vars.DEPENDENCIES),
  assets.typeScript(),
  assets.style());
