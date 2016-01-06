'use strict';

require('mocha');
var use = require('use');
var assert = require('assert');
var util = require('./');

describe('expand-util', function() {
  it('should export a getter function', function() {
    assert.equal(typeof util, 'function');
  });
});

describe('run', function() {
  it('should throw an error if object does not have a `run` property', function(cb) {
    try {
      util.run({});
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected `{}` to have a "run" method');
      cb();
    }
  });

  it('should throw an error if `run` is not a function', function(cb) {
    try {
      util.run({run: ''});
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected `{"run":""}` to have a "run" method');
      cb();
    }
  });

  it('should run plugins defined on the given object', function() {
    var config = {};
    use(config);

    config.use(function() {
      return function(obj) {
        obj.foo = 'bar';
      }
    });
    var obj = {};
    util.run(config, 'temp', obj);
    assert.equal(obj.foo, 'bar');
  });

  it('should add parent object as "parent" on the "child" object', function() {
    var config = {};
    use(config);
    config.use(function() {
      return function(obj) {
        obj.foo = 'bar';
      }
    });
    var obj = {};
    util.run(config, 'temp', obj);
    assert('parent' in obj);
    assert.deepEqual(obj.parent, config);
  });

  it('should add "is" property with the given key on child object', function() {
    var config = {};
    use(config);
    config.use(function() {
      return function(obj) {
        obj.foo = 'bar';
      }
    });
    var obj = {};
    util.run(config, 'temp', obj);
    assert(obj.is === 'temp');
  });
});

describe('utils', function() {
  describe('isConfig', function() {
    it('should return false if the value is not an object', function() {
      assert(!util.isConfig('foo'));
    });

    it('should return true if the object has files properties', function() {
      assert(util.isConfig({files: []}));
      assert(util.isConfig({src: []}));
      assert(util.isConfig({dest: ''}));
    });

    it('should return false if the object does not have necessary properties', function() {
      assert(!util.isConfig({foo: []}));
    });

    it('should return true if the object has targets', function() {
      assert(util.isConfig({foo: {files: []}}));
      assert(util.isConfig({foo: {src: []}}));
      assert(util.isConfig({foo: {dest: ''}}));
    });
  });

  describe('isTask', function() {
    it('should return false if the value is not an object', function() {
      assert(!util.isTask('foo'));
    });

    it('should return false if the object has files properties', function() {
      assert(!util.isTask({files: []}));
      assert(!util.isTask({src: []}));
      assert(!util.isTask({dest: ''}));
    });

    it('should return false if the object does not have files properties', function() {
      assert(!util.isTask({foo: []}));
    });

    it('should return true if the object has targets', function() {
      assert(util.isTask({foo: {files: []}}));
      assert(util.isTask({foo: {src: []}}));
      assert(util.isTask({foo: {dest: ''}}));
    });
  });

  describe('isTarget', function() {
    it('should return false if the value is not an object', function() {
      assert(!util.isTarget('foo'));
    });

    it('should return true if the object has files properties', function() {
      assert(util.isTarget({files: []}));
      assert(util.isTarget({src: []}));
      assert(util.isTarget({dest: ''}));
    });

    it('should return false if the object does not have files properties', function() {
      assert(!util.isTarget({foo: []}));
    });
  });

  describe('isFiles', function() {
    it('should return false if the value is not an object', function() {
      assert(!util.isFiles('foo'));
    });

    it('should return true if the object has files properties', function() {
      assert(util.isFiles({files: []}));
      assert(util.isFiles({src: []}));
      assert(util.isFiles({dest: ''}));
    });

    it('should return false if the object does not have files properties', function() {
      assert(!util.isFiles({foo: []}));
    });
  });

  describe('hasFilesProps', function() {
    it('should return false if the value is not an object', function() {
      assert(!util.hasFilesProps('foo'));
    });

    it('should return true if the object has files properties', function() {
      assert(util.hasFilesProps({files: []}));
      assert(util.hasFilesProps({src: []}));
      assert(util.hasFilesProps({dest: ''}));
    });

    it('should return false if the object does not have files properties', function() {
      assert(!util.hasFilesProps({foo: []}));
    });
  });
});
