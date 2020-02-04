var mongoose = require('mongoose'), Schema = mongoose.Schema;

var BlogSchema = new mongoose.Schema({
  id: String,
  blogTitle: String,
  blogImgUrl: String,
  blogAuthor: String,
  blogContent: String,
  blogPs: String,
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', BlogSchema);