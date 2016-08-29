const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const settings = require('./settings');
const PKG = require('../../package.json');

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
          loader: `babel-loader?${settings.BABEL_CONFIG}!ts-loader`,
          include: settings.paths.src,
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
function style(bundle = new ExtractText(`${settings.fileSchemes.keepName}.css`)) {
  return {
    plugins: [bundle],
    module: {
      loaders: [
        {
          test: /\.s?css$/,
          loader: bundle.extract('style', 'css?sourceMap!resolve-url!postcss!sass?sourceMap'),
          include: settings.paths.src,
        },
      ],
    },
    postcss: () => [autoprefixer(PKG.config.supportedBrowsers)],
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
        template: settings.paths.htmlTemplate,
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
      new Copy([{ from: settings.paths.assets, to: settings.paths.assetsProductionPath }], {
        ignore: [settings.paths.htmlTemplate],
      }),
    ],
  };
}

module.exports = { typeScript, style, generateHtml, copyStatic };
