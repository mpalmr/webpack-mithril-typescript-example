const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const vars = require('./vars');

/**
 * Compiles TypeScript into JavaScript which is then transpiled into ES5 via Babel
 * @return {Object} Webpack configuration addition to be merged
 */
function typeScript() {
  return {
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loader: `babel-loader?${vars.BABEL_CONFIG}!ts-loader`,
          include: vars.PATHS.src,
        },
      ],
    },
  };
}

/**
 * Compiles SCSS and CSS through the Sass loader, then through PostCSS for autoprefixing
 * @param {ExtractText} [bundle={...}] - CSS bundle to product, by default resolves to keepName
 * @return {Object} Webpack configuration addition to be merged
 */
function style(bundle = new ExtractText(`${vars.FILE_SCHEMES.keepName}.css`)) {
  return {
    plugins: [bundle],
    module: {
      loaders: [
        {
          test: /\.s?css$/,
          loader: bundle.extract('style', 'css?sourceMap!resolve-url!postcss!sass?sourceMap'),
          include: vars.PATHS.src,
        },
      ],
    },
    postcss: () => [autoprefixer(vars.SUPPORTED_BROWSERS)],
  };
}

/**
 * Generates HTML file from a template to have assets injected into
 * @return {Object} Webpack configuration addition to be merged
 */
function generateHtml() {
  return {
    plugins: [
      new Html({
        title: 'Example project',
        template: vars.PATHS.htmlTemplate,
      }),
    ],
  };
}

/**
 * Copy static assets into production and development builds
 * @return {Object} Webpack configuration addition to be merged
 */
function copyStatic() {
  return {
    plugins: [
      new Copy([{ from: vars.PATHS.assets, to: vars.PATHS.assetsProductionPath }], {
        ignore: [vars.PATHS.htmlTemplate],
      }),
    ],
  };
}

module.exports = {
  typeScript,
  style,
  generateHtml,
  copyStatic,
};
