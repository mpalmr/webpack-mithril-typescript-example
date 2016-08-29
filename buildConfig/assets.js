const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const settings = require('./settings');
const PKG = require('../package.json');

function typeScript() {
  const BABEL_CONFIG = JSON.stringify(Object.assign(PKG.babel, {
    sourceMap: true,
    cacheDirectory: true,
  }));
  return {
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loader: `babel-loader?${BABEL_CONFIG}!ts-loader`,
          include: settings.paths.src,
        },
      ],
    },
  };
}

function style() {
  const cssFile = new ExtractText(`${settings.fileSchemes.keepName}.css`);
  return {
    plugins: [cssFile],
    module: {
      loaders: [
        {
          test: /\.s?css$/,
          loader: cssFile.extract('style', 'css?sourceMap!resolve-url!postcss!sass?sourceMap'),
          include: settings.paths.src,
        },
      ],
    },
    postcss: () => [autoprefixer(PKG.config.supportedBrowsers)],
  };
}

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

function copyStatic() {
  return {
    plugins: [
      new Copy([{
        from: settings.paths.assets,
        to: path.join(settings.paths.dist, 'assets'),
      }], {
        ignore: [settings.paths.htmlTemplate],
      }),
    ],
  };
}

module.exports = { typeScript, style, generateHtml, copyStatic };
