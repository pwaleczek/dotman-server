var config = require('../config')

var lib = module.exports = {
    middleware: require('./middleware')
  , config: require('../config')()
  , winston: require('./winston')
  , models: require('../app/models')
  , routes: config.routes
}

lib.db = require('./mongo')(lib)
lib.controllers = require('../app/controllers')(lib)
lib.app = config.app(lib)
lib.server = require('http').createServer(lib.app)

module.exports = lib