# cssnextify [![Build Status](https://travis-ci.org/ByteMuse/cssnextify.svg?branch=master)](https://travis-ci.org/ByteMuse/cssnextify)
A Browserify transform for css & cssnext.

## Installation
This package is available as NPM package.
### NPM
`$ npm install segments --save`

## Usage
### CLI
`$ browserify -t lessify main.js > bundle.js`

### Code
```javascript
var fs = require('fs')
var browserify = require('browserify')
var cssnextify = require('cssnextify')

var bundler = browserify()
bundler.add(__dirname + '/main.js')
bundler.transform(cssnextify)
bundler.bundle().pipe(fs.createWriteStream(__dirname + '/bundle.js'))
```
