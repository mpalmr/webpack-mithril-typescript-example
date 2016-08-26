const declarations = require('./declarations');
const bundles = require('./bundles');
const helpers = require('./helpers');
const base = require('./base');

module.exports = Object.assign(base, declarations, bundles, helpers);
