const base = require('./base');
const settings = require('./vars');
const assets = require('./assets');
const helpers = require('./helpers');

module.exports = Object.assign(base, settings, assets, helpers);
