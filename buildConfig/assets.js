const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const declarations = require('./declarations');
const PKG = require('../package.json');

const TEMPLATE_PATH = path.join(declarations.paths.assets, 'template.html');

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
          include: declarations.paths.src,
        },
      ],
    },
  };
}

function style() {
  const cssFile = new ExtractText(`${declarations.files.keepName}.css`);
  return {
    plugins: [cssFile],
    module: {
      loaders: [
        {
          test: /\.s?css$/,
          loader: cssFile.extract('style', 'css?sourceMap!resolve-url!postcss!sass?sourceMap'),
          include: declarations.paths.src,
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
        template: TEMPLATE_PATH,
      }),
    ],
  };
}

function copyStatic() {
  return {
    plugins: [
      new Copy([{
        from: declarations.paths.assets,
        to: path.join(declarations.paths.dist, 'assets'),
      }], {
        ignore: [TEMPLATE_PATH],
      }),
    ],
  };
}

function loadStatic() {
  return {
    module: {
      loaders: [
        {
          test: /\.jpg$/,
          loader: 'file?name=[path][name].[ext]',
          include: declarations.paths.assets,
        },
      ],
    },
  };
}

module.exports = {
  typeScript,
  style,
  generateHtml,
  copyStatic,
  loadStatic,
};
