/**
 * Base configuration all builds are merged into.
 * IMPORTANT: ANY changes to this file will effect ALL builds.
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const vars = require('./vars');
const helpers = require('./helpers');
const assets = require('./assets');

module.exports = merge({

  /**
   * All entry points of app. For each entry point defined, a new bundle will be generated.
   * (https://webpack.github.io/docs/configuration.html#entry)
   */
  entry: {
    main: path.join(vars.PATHS.src, 'index.ts'),
  },

  /**
   * Output of all bundles to go to ./dist
   * (https://webpack.github.io/docs/configuration.html#output)
   */
  output: {
    path: vars.PATHS.dist,
    filename: `${vars.FILE_SCHEMES.keepName}.js`,
    chunkFilename: '[chunkhash].js',
  },

  /**
   * Start module resolution for all code ran through Webpack at ./src
   * (https://webpack.github.io/docs/configuration.html#resolve)
   */
  resolve: {
    root: vars.PATHS.src,
    extensions: ['', '.js', '.ts'],
  },

  plugins: [

    /**
     * Define compile time flags useful for dead code elimiation via UglifyJS
     * (https://webpack.github.io/docs/list-of-plugins.html#defineplugin)
     */
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
