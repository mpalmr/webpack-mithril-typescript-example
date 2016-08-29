const base = require('./base');
const settings = require('./settings');
const assets = require('./assets');
const helpers = require('./helpers');

module.exports = Object.assign(base, settings, assets, helpers);
