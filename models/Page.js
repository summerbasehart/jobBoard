var mongoose = require('mongoose');

var PageSchema = new mongoose.Schema({
  id: String,
  pageName: String,
  pageHeader: String,
  pageEmpl: String,
  pageCont: String,
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Page', PageSchema);