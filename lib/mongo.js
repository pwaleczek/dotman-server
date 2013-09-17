var mongoose = require('mongoose')

module.exports = setup

var lib

function serup(_lib) {
  lib = _lib
  var mongo = mongoose.createConnection(
      lib.config.db.host
    , lib.config.db.dbname
    , lib.config.db.port
    , lib.config.db.options
  )

  mongo.on('error', error)
  mongo.on('open', open)

  return mongo
}

function error(err) {
  lib.winsotn.error('Mongoose Error: ' + err)
}

function open() {
  lib.winston.info('MongoDB connection opened')

  lib.models(lib)
}
