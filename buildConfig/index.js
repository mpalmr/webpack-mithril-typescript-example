const base = require('./base');
const declarations = require('./declarations');
const assets = require('./assets');
const helpers = require('./helpers');

module.exports = Object.assign(base, declarations, assets, helpers);
