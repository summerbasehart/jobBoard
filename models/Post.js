var mongoose = require('mongoose'), Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
  category : { type: Schema.Types.ObjectId, ref: 'Category' },
  id: String,
  postTitle: String,
  postAuthor: String,
  postDescription: String,
  postQualifications: String,
  postReference: String,
  created: { type: Date },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);