# grunt-jsx
[![Build status](https://api.travis-ci.org/yosuke-furukawa/grunt-jsx.png)](https://travis-ci.org/yosuke-furukawa/grunt-jsx)


> Compile JSX to Javascript

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jsx --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jsx');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-coffee/tree/grunt-0.3-stable).*

## JSX Task
_Run this task with the `grunt jsx` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Usage example

```js
  module.exports = function(grunt) {
    grunt.initConfig({
      jsx: {
        client: {
          src: 'examples/hello.jsx',
          dest: 'tmp/hello.jsx.js',
        },
        server: {
          src: 'examples/hello.jsx',
          dest: 'tmp/hello.node.jsx.js',
          executable: 'node',
        },
        release: {
          src: 'examples/hello.jsx',
          dest: 'tmp/hello.release.jsx.js',
          executable: 'node',
          release: true,
        },
        add_search_path: {
          src: 'examples/import.jsx',
          dest: 'tmp/import.jsx.js',
          add_search_path: ['examples/'],
        },
      }
    });
    grunt.loadNpmTasks('grunt-jsx');
  };
```

```shell
$ grunt jsx:client // jsx --output tmp/hello.jsx.js fixtures/hello.jsx
$ grunt jsx:server // jsx --output tmp/hello.node.jsx.js --executable node fixtures/hello.jsx
$ grunt jsx:release // jsx --output tmp/hello.release.jsx.js --executable node --release fixtures/hello.jsx
$ grunt jsx:add_search_path // jsx --output tmp/import.jsx.js --add-search-path fixtures/ fixtures/import.jsx
```

## Configs

### src

Type: `string`
jsx filepath for compile.
setting example: `src: 'main.jsx'`

### dest

Type: `string`
output javascript path.
setting example: `dest: 'main.jsx.js'`

### executable

Type: `string`
add runtime environment, supported env is `node`, `commonjs` and `web`.

### add_search_path

Type: `string` or `array`
add a path to search library
setting example: `add_search_path: ['lib/', 'lib2/']`

### release

Type: `boolean`
disable runtime type check and enable optimization

### profile

Type: `boolean`
enables profiler

### optimize

Type: `string`
enables optimization commands.
setting example: `optimize: "no-debug,staticize"`

### warn

Type: `string`
enables warinings, all, deprecated, none
setting example: `warn: "all"`

### disable_type_check

Type: `boolean`
disable run-time type check

### minify

Type: `boolean`
compress javascript code

### enable_source_map

Type: `boolean`
enables source map debugging info

### mode

Type: `string`
specifies compilaton mode, compile, parse, doc

### target

Type: `string`
specifies target lang, javascript, c++

### test

Type: `boolean`
enable test option

### output_rule

Type: `hash`
if dest option is undefined, execute output_rule.
output_rule has to be set `regexp` and `replace`.

`regexp` find a string from your `src` and replace the string to `replace` string.

```javascript
filename_rule: {
  src: 'fixtures/hello.jsx',
  output_rule: {
    regexp: /fixtures\/(.*).jsx/,
    replace: 'tmp\/$1.js',
  }
},
```

### args

Type: `string`
add arguments to JSX.
example: `args: '--minify --release --add-search-path lib/'`

### ext

Type: `string`
Spcifies file extension. Default value is `'.js'` or `''` (for `--executable node`).
These extensions are used if `dest` is not specified or a directory.

# ChangeLogs
2014/04/09 v0.1.7 Fix Windows bugs (Thanks to shibukawa san).

2013/10/17 v0.1.5 Add JSX linker option (Thanks to shibukawa san).

2013/10/11 v0.1.4 Fix extension bug (Thanks to shibukawa san).

2013/10/03 v0.1.3 Support jsx color (Thanks to shibukawa san).

2013/10/02 v0.1.2 Fix multi src bug (Thanks to shibukawa san).

2013/10/02 v0.1.1 enable ext option (Thanks to shibukawa san).

2013/09/29 v0.1.0 enable test option and output_rule and fix some test errors.
