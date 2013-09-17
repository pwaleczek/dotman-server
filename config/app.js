var express = require('express')
  , winstonRequestLogger = require('winston-request-logger')
  , winston = require('winston')
  , path = require('path')

var app = express()

module.exports = setup

var lib

function setup(_lib) {
  lib = _lib
  app.configure(configure)
  return app
}

function configure() {

  // set view helper for config
  var config = lib.config
  app.locals.config = config
  // app.locals.moment = require('moment')

  app.set('views', config.viewsDir)
  app.set('view engine', 'jade')
  app.set('view options', config.viewOptions)
  app.use(express.favicon(config.favicon))
  app.use(require('less-middleware')(config.lessMiddleware))
  app.use(express.cookieParser(config.cookieParser))
  app.use(express.bodyParser(config.bodyParser))

  app.use(express.limit('250mb'))
  app.use(lib.middleware.locals)

  app.configure('development', routerBeforeDevelopment)
  app.configure('test', routerBeforeTest)
  app.configure('production', routerBeforeProduction)

  app.use(app.router)

  app.configure('development', routerAfterDevelopment)
  app.configure('test', routerAfterTest)
  app.configure('production', routerAfterProduction)

  app.use('/bower', express.static(config.bowerDir, config.staticServer))

  app.use('/packages', express.static(config.bodyParser.uploadDir, config.staticServer))

  lib.routes(app, lib)

}

function routerBeforeDevelopment() {
  app.use(winstonRequestLogger.create(lib.logger))
}

function routerBeforeTest() {
  lib.logger.remove(winston.transports.Console)
}

function routerBeforeProduction() {
  app.enable('view cache')
  app.use(express.compress())

  lib.logger.remove(winston.transports.Console)
}

function routerAfterDevelopment() {
  app.use(express.static(lib.config.publicDir, lib.config.staticServer))
}

function routerAfterTest() {
  app.use(express.static(lib.config.publicDir, lib.config.staticServer))
}

function routerAfterProduction() {
  app.use(express.static(lib.config.distDir, lib.config.staticServer))
}
