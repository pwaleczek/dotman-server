module.exports = setup

var schemas = require('./schemas')

function setup(lib) {

  lib.db.model('Package', schemas.Package)

}
