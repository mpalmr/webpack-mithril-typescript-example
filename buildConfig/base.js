const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const declarations = require('./declarations');
const helpers = require('./helpers');
const assets = require('./assets');

const base = merge({
  entry: {
    main: path.join(declarations.paths.src, 'index.ts'),
  },
  output: {
    path: declarations.paths.dist,
    filename: `${declarations.files.keepName}.js`,
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    root: declarations.paths.src,
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
  helpers.extractBundle(`vendor${declarations.files.hashOnly}.js`, declarations.dependencies),
  helpers.clean(declarations.paths.dist),
  assets.typeScript(),
  assets.style());

module.exports = { base };
