const PATHS = require('./misc').PATHS;
const PKG = require('../package.json');

function typeScript(generateSourceMap = false) {
  const BABEL_CONFIG = Object.assign({}, PKG.babel, {
    sourceMap: generateSourceMap,
    cacheDirectory: true,
  });
  return {
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loader: `babel-loader?${JSON.stringify(BABEL_CONFIG)}!ts-loader`,
          include: PATHS.src,
        },
      ],
    },
  };
}

module.exports = { typeScript };
