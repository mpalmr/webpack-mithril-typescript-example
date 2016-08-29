const base = require('./base');
const vars = require('./vars');
const assets = require('./assets');
const helpers = require('./helpers');

module.exports = Object.assign(vars, {
  base,
  assets,
  helpers,
});
