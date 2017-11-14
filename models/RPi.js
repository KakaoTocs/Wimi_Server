var mongoose = require('mongoose');

var RPi = mongoose.Schema({
  rId: Number,
  place: String
});

module.exports = mongoose.model('rpis', RPi);
