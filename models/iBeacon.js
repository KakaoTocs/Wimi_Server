var mongoose = require('mongoose');

var iBeacon = mongoose.Schema({
  id: Number,
  uuid: Number,
  maj: Number,
  min: Number,
});

module.exports = mongoose.model('ibeacons', iBeacon);
