var mongoose = require('mongoose');

var build = mongoose.Schema({
  bId: Number,
  floor: Number,
  bname: String
});

module.exports = mongoose.model('builds', build);
