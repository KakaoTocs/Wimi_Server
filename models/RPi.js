var mongoose = require('mongoose');
var place = require('./place');

var RPi = mongoose.Schema({
  Id: String,
  key: String,
  pId: String,
  com: String
});

module.exports = mongoose.model('rpis', RPi);
