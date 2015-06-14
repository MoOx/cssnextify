var assert = require('assert')
var cssnextify = require('../src/index')
var browserify = require('browserify')
var jsdom = require('jsdom')

describe('#nextify', function() {
  it('should skip non-css files', function(done) {
    var b = browserify()
    b.add(__dirname + '/fixtures/random.js')
    b.transform(cssnextify)
    b.bundle(function(err, buf) {
      assert.equal(err, null)
      done()
    })
  })

  it('should compile css input', function(done) {
    var b = browserify()
    b.add(__dirname + '/fixtures/style.css')
    b.transform(cssnextify)
    b.bundle(function(err, buf) {
      assert.equal(err, null)
      var html = '<html><head></head><body></body><script>' + buf.toString() + '</script></html>'
      jsdom.env({
        html: html,
        features : {
          FetchExternalResources : ['script'],
          ProcessExternalResources : ['script']
        },
        done: function(err, window) {
          assert.equal(err, null)
          var bodyStyle = window.getComputedStyle(window.document.body)
          assert.equal(bodyStyle.getPropertyValue('background-color'), 'blue')
          done()
        }
      })
    })
  })
})
