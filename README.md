# expand-utils [![NPM version](https://img.shields.io/npm/v/expand-utils.svg?style=flat)](https://www.npmjs.com/package/expand-utils) [![NPM downloads](https://img.shields.io/npm/dm/expand-utils.svg?style=flat)](https://npmjs.org/package/expand-utils) [![Build Status](https://img.shields.io/travis/jonschlinkert/expand-utils.svg?style=flat)](https://travis-ci.org/jonschlinkert/expand-utils)

Utils shared by the expand libs.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save expand-utils
```

## Usage

```js
var util = require('expand-utils');
```

## API

### [.is](index.js#L27)

Decorates the given object with a `is*` method, where `*` is the given `name`.

**Params**

* `obj` **{Object}**: The object to check
* `name` **{String}**

**Example**

```js
var obj = {};
exports.is(obj, 'foo');
console.log(obj.isFoo);
//=> true
```

### [.run](index.js#L43)

Run `parent`'s plugins on the `child` object, specifying a `key` to use for decorating the `child` object with an [is](#is) property.

**Example**

```js
exports.run(parent, 'foo', obj);
```

### [.isBoilerplate](index.js#L65)

Return true if the given value has [boilerplate](https://github.com/jonschlinkert/boilerplate) properties

**Params**

* `config` **{Object}**: The configuration object to check

**Example**

```js
exports.isBoilerplates({});
```

### [.isConfig](index.js#L90)

Return true if the given value has [config](https://github.com/jonschlinkert/expand-config) properties

**Params**

* `config` **{Object}**: The configuration object to check

**Example**

```js
exports.isConfig({});
```

### [.isScaffold](index.js#L130)

Return true if the given value has [scaffold](https://github.com/jonschlinkert/scaffold) properties. Scaffolds are essentially the same configuration structure as tasks from [expand-task](https://github.com/jonschlinkert/expand-task). We use [expand-task](https://github.com/jonschlinkert/expand-task) for expanding [grunt](http://gruntjs.com/)-style configs. But we use [scaffold](https://github.com/jonschlinkert/scaffold) when working with [gulp](http://gulpjs.com) configs.

**Params**

* `config` **{Object}**: The configuration object to check

**Example**

```js
console.log(exports.isScaffold({
  foo: {
    options: {},
    files: []
  },
  bar: {
    options: {},
    files: []
  }
}));
//=> true
```

### [.isTask](index.js#L160)

Return true if the given value has [task](https://github.com/jonschlinkert/expand-task) properties

**Params**

* `config` **{Object}**: The configuration object to check

**Example**

```js
console.log(exports.isTask({
  foo: {
    options: {},
    files: []
  },
  bar: {
    options: {},
    files: []
  }
}));
//=> true
```

### [.isTarget](index.js#L197)

Return true if the given value is has [target](https://github.com/jonschlinkert/expand-target) properties.

**Params**

* `config` **{Object}**: The configuration object to check

**Example**

```js
console.log(exports.isTarget({
  name: 'foo',
  options: {},
  files: []
}));
//=> true
```

### [.isFiles](index.js#L231)

Return true if the given value is an object and instance of [expand-files](https://github.com/jonschlinkert/expand-files), has an `isFiles` property, or returns true from [hasFilesProps](#hasFilesProps).

**Params**

* `config` **{Object}**: The configuration object to check

**Example**

```js
console.log(exports.hasFilesProps({isFiles: true}));
//=> true
console.log(exports.hasFilesProps({files: []}));
//=> true
console.log(exports.hasFilesProps({files: [{src: [], dest: ''}]}));
//=> true
console.log(exports.hasFilesProps({src: []}));
//=> true
console.log(exports.hasFilesProps({dest: ''}));
//=> true
console.log(exports.hasFilesProps({foo: ''}));
//=> false
```

### [.hasFilesProps](index.js#L264)

Return true if the given value is an object that has `src`, `dest` or `files` properties.

**Params**

* `config` **{Object}**: The configuration object to check

**Example**

```js
console.log(exports.hasFilesProps({files: []}));
//=> true
console.log(exports.hasFilesProps({files: [{src: [], dest: ''}]}));
//=> true
console.log(exports.hasFilesProps({src: []}));
//=> true
console.log(exports.hasFilesProps({dest: ''}));
//=> true
console.log(exports.hasFilesProps({foo: ''}));
//=> false
```

## Related projects

You might also be interested in these projects:

* [expand-config](https://www.npmjs.com/package/expand-config): Expand tasks, targets and files in a declarative configuration. | [homepage](https://github.com/jonschlinkert/expand-config "Expand tasks, targets and files in a declarative configuration.")
* [expand-files](https://www.npmjs.com/package/expand-files): Expand glob patterns in a declarative configuration into src-dest mappings. | [homepage](https://github.com/jonschlinkert/expand-files "Expand glob patterns in a declarative configuration into src-dest mappings.")
* [expand-target](https://www.npmjs.com/package/expand-target): Expand target definitions in a declarative configuration. | [homepage](https://github.com/jonschlinkert/expand-target "Expand target definitions in a declarative configuration.")
* [expand-task](https://www.npmjs.com/package/expand-task): Expand and normalize task definitions in a declarative configuration. | [homepage](https://github.com/jonschlinkert/expand-task "Expand and normalize task definitions in a declarative configuration.")
* [normalize-config](https://www.npmjs.com/package/normalize-config): Normalize a declarative configuration with any combination of src-dest mappings, files arrays, files objects and… [more](https://github.com/jonschlinkert/normalize-config) | [homepage](https://github.com/jonschlinkert/normalize-config "Normalize a declarative configuration with any combination of src-dest mappings, files arrays, files objects and options into a consistent format so the config can easily be passed to any build system.")

## Contributing

This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Or visit the [verb-readme-generator](https://github.com/verbose/verb-readme-generator) project to submit bug reports or pull requests for the readme layout template.

## Building docs

_(This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-readme-generator && verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/expand-utils/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 27, 2016._