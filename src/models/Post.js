import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  postId: String,
  title: String,
  author: String,
  subreddit: String,
  score: Number,
  numComments: Number,
  createdUtc: Date,
  url: String,
  text: String,
  keywords: [String],
  fetchedAt: Date,
});

export default mongoose.model('Post', postSchema);
