'use strict';

var utils = require('./');

// boilerplate
var config = {
  // scaffold
  assemble: {
    // target
    docs: {
      options: {},
      // files
      files: [
        // rawNode (globs are not resolved yet)
        {
          src: ['*'],
          dest: ''
        },
        // node (globs are resolved)
        {
          src: ['foo', 'bar'],
          dest: ''
        },
      ]
    },
    // target
    site: {
      options: {},
      // converted to `files`
      src: [],
      dest: ''
    }
  },
  verb: {
    docs: {
      options: {},
      files: []
    },
    site: {
      options: {},
      files: []
    }
  }
};


console.log(utils.isBoilerplate(config))
console.log('---')
console.log(utils.isScaffold(config))
console.log(utils.isScaffold(config.assemble))

console.log(utils.isTask(config))
console.log(utils.isTask(config.assemble))
console.log('---')

console.log(utils.isTarget(config))
console.log(utils.isTarget(config.assemble))
console.log(utils.isTarget(config.assemble.docs))
console.log('---')
