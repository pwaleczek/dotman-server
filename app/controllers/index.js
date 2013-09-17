module.exports = setup

function setup(lib) {

  var controllers = {
      home: require('./home')
  }

  return controllers
}
