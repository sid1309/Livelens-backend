const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  article: {
    title: String,
    url: String,
    imageUrl: String,
    description: String,
    publishedAt: String,
    sourceName: String,
  }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);

//type:mongoose.Schema.Types.ObjectId -> Stores the user's unique ID as a reference