var path = require('path')
  , _ = require('underscore')

var env = (process.env.NODE_ENV ? process.env.NODE_ENV : 'development')

var rootDir = path.join(__dirname, '..')
  , assetsDir = path.join(rootDir, 'assets')
  , uploadDir = path.join(rootDir, 'packages')
  , publicDir = path.join(assetsDir, 'public')

var main = {
    titlePrefix: 'dotman'
  , description: 'dotfiles manager'
  , rootDir: rootDir
  , assetsDir: assetsDir
  , publicDir: publicDir
  , distDir: path.join(assetsDir, 'dist')
  , bowerDir: path.join(assetsDir, 'bower')
  , viewsDir: path.join(rootDir, 'app', 'views')
  , viewOptions: {
      layout: false
    }
  , lessMiddleware: {
        src: publicDir
      , force: true
    }
  , errorHandler: {
        dumpExceptions: true
      , showStack: true
    }
  , bodyParser: {
        keepExtensions: true
      , uploadDir: uploadDir
    }
  , port: process.env.PORT || '5000'
  , host: process.env.HOST || 'localhost'
}

var config = {
    development: {
        db: {
            host: 'localhost'
          , dbname: 'dotman-dev'
          , port: '27017'
        }
      , modules: [ 'main', 'live-reload' ]
    }
  , test: {
        db: {
            host: 'localhost'
          , dbname: 'dotman-test'
          , port: '27017'
        }
      , modules: [ 'main' ]
    }
  , production: {
        db: {
            host: 'localhost'
          , dbname: 'dotman'
          , port: '27017'
        }
      , favicon: path.join(main.distDir, 'favicon.ico')
      , errorHandler: {
            dumpExceptions: false
          , showStack: true
        }
      , modules: [ 'main' ]
    }
}

module.exports = setup

function setup() {
  config = _.extend(main, config[env])
  config.env = env
  config.url = 'http://' + config.host + ':' + config.port
  return config
}
