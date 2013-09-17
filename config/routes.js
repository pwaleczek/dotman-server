module.exports = routes

function routes(app, lib) {

  lib.app = app

  var controllers = lib.controllers
    , api = lib.api

  require('./routes/auth')(lib)

  app.all('/api/*', require('express').basicAuth(api.basicAuth), api.next)

  require('./routes/api')(lib)

  app.get('/', controllers.home)
}
