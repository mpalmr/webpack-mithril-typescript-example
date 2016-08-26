const webpack = require('webpack');

function extractBundle(filename, names) {
  return { plugins: [new webpack.optimize.CommonsChunkPlugin({ filename, names })] };
}

module.exports = { extractBundle };
