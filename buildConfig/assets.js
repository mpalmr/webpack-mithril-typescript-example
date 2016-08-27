const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const Html = require('html-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const declarations = require('./declarations');
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
          include: declarations.paths.src,
        },
      ],
    },
  };
}

function style(generateFile = false) {
  const LOADER_STRING = 'css?sourceMap!resolve-url!postcss!sass?sourceMap';
  let file;
  let bundleConfig = { postcss: () => [autoprefixer(PKG.config.supportedBrowsers)] };
  if (generateFile) {
    file = new ExtractText('[name].[chunkhash].css');
    bundleConfig.plugins = [file];
  }
  bundleConfig.module = {
    loaders: [
      {
        test: /\.s?css/,
        loader: file ? file.extract('style', LOADER_STRING) : `style!${LOADER_STRING}`,
        include: declarations.paths.src,
      },
    ],
  };
  return bundleConfig;
}

function generateHtml() {
  return {
    plugins: [
      new Html({
        title: 'Example project',
        template: path.join(declarations.paths.assets, 'template.html'),
      }),
    ],
  };
}

function copyStatic(destination = declarations.paths.dist) {
  return {
    plugins: [
      new Copy([{
        from: declarations.paths.assets,
        to: declarations.paths.dist,
      }], {
        ignore: [path.join(declarations.paths.assets, 'template.html')],
      }),
    ],
  };
}

module.exports = { typeScript, style, generateHtml, copyStatic };
