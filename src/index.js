var through = require('through2')
var cssnext = require('cssnext')

function canCompile(filename) {
  return /\.css$/.test(filename)
}

function compile(data) {
  function inject(css) {
    var style = document.createElement('style')
    style.type = 'text/css'
    if(style.styleSheet) {
      style.styleSheet.cssText = css
    } else {
      style.appendChild(document.createTextNode(css))
    }

    document.getElementsByTagName('head')[0].appendChild(style)
  }

  var style = cssnext(data)
  return '(' + inject + ')(' + JSON.stringify(style) + ')'
}

module.exports = function(filename) {
  if(!canCompile(filename)) {
    return through()
  }

  var data = ''
  function write(chunk, enc, cb) {
    data += chunk
    cb()
  }

  function end(cb) {
    this.push(compile(data))
    cb()
  }

  return through(write, end)
}
