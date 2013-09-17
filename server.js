var dotman = module.exports = require('./lib')

if (!module.parent) {
  dotman.server.listen(
      dotman.config.port
    , function () {
        console.log('dotman server started on port ' + dotman.config.port)
      }
  )
}