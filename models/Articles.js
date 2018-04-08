var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    default: this.title
  },
  author: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    default: false
  },
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
