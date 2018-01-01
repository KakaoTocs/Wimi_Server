var mongoose = require('mongoose');

var iBeacon = mongoose.Schema({
  id: Number,
  uuid: String,
  maj: String,
  min: String
});

module.exports = mongoose.model('ibeacons', iBeacon);
