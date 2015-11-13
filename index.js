/*!
 * expand-utils <https://github.com/jonschlinkert/expand-utils>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);

/**
 * Temporarily re-assign `require` to trick browserify and
 * webpack into reconizing lazy dependencies.
 *
 * This tiny bit of ugliness has the huge dual advantage of
 * only loading modules that are actually called at some
 * point in the lifecycle of the application, whilst also
 * allowing browserify and webpack to find modules that
 * are depended on but never actually called.
 */

var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('isobject', 'isObject');
require('extend-shallow', 'extend');
require('define-property', 'define');

/**
 * Restore `require`
 */

require = fn;

/**
 * Utils
 */

utils.run = function(parent, key, child) {
  if (!parent.hasOwnProperty('run') || typeof parent.run !== 'function') {
    var val = JSON.stringify(parent);
    throw new TypeError('expected `' + val + '` to have a "run" method');
  }

  utils.define(child, 'parent', parent);
  utils.define(child, 'orig', utils.extend({}, child));
  utils.define(child, 'is', key);

  utils.define(child, key, true);
  parent.run(child);
  delete child[key];
};

/**
 * Return true if the given value has "Config" properties
 */

utils.isConfig = function(val) {
  if (utils.isTask(val)) {
    return true;
  }
  if (utils.isTarget(val)) {
    return true;
  }
  for (var key in val) {
    if (utils.isTask(val[key])) {
      return true;
    }
  }
  return false;
};

/**
 * Return true if the given value has "task" properties
 */

utils.isTask = function(config) {
  if (config.isTask === true) {
    return true;
  }
  if (utils.isFiles(config)) {
    return false;
  }
  if (utils.isTarget(config)) {
    return false;
  }
  for (var key in config) {
    if (utils.isTarget(config[key])) {
      return true;
    }
  }
  return false;
};

/**
 * Return true if the given value is a "target"
 */

utils.isTarget = function(config) {
  if (!utils.isObject(config)) {
    return false;
  }
  if (config.isTarget === true) {
    return true;
  }
  if (utils.hasFilesProps(config)) {
    return true;
  }
  return false;
};

/**
 * Return true if the given value is an object that has
 * "ExpandFiles" characteristics or file properties
 */

utils.isFiles = function(config) {
  if (!utils.isObject(config)) {
    return false;
  }
  if (config.isFiles === true) {
    return true;
  }
  if (utils.hasFilesProps(config)) {
    return true;
  }
  return false;
};

/**
 * Return true if the given value is an object that has
 * src, dest or files properties.
 */

utils.hasFilesProps = function(config) {
  if (!utils.isObject(config)) {
    return false;
  }
  if (config.hasOwnProperty('files')) {
    return true;
  }
  if (config.hasOwnProperty('src')) {
    return true;
  }
  if (config.hasOwnProperty('dest')) {
    return true;
  }
  return false;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
