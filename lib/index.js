var config = require('../config')

var lib = module.exports = {
    winston: require('./winston')
  , middleware: require('./middleware')
  , config: require('../config').config()
  , models: require('../app/models')
  , routes: config.routes
}

lib.db = require('./mongo')(lib)
lib.controllers = require('../app/controllers')(lib)
lib.api = require('../app/api')(lib)
lib.app = config.app(lib)
lib.server = require('http').createServer(lib.app)

module.exports = lib