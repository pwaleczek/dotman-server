var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var Package = new Schema({
    name: {
        type: String
      , required: true
      , trim: true
    }
  , path: {
        type: String
      , required: true
      , match: /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    }
  , type: String
  , size: Number
  , lastModifiedDate: Date
  , updated: {
        default: Date.now
      , type: Date
    }
  // , _user: {
  //       type: Schema.ObjectId
  //     , ref: 'User'
  //     , required: true
  //   }
})

Package.set('toJSON', { virtuals: true })
Package.set('toObject', { virtuals: true })

// Package.plugin(common)

module.exports = Package
