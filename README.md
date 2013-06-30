# grunt-jsx

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
          "add-search-path": ['examples/'],
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
