var mongoose = require('mongoose');
var building = require('./building');

var place = mongoose.Schema({
  pId: String,
  bId: Number,
  floor: Number,
  pname: String
});

module.exports = mongoose.model('places', place);
