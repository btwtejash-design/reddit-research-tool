// src/controllers/analyticsController.js
import Post from '../models/Post.js';

export async function getAnalytics(req, res) {
  try {
    // 1. Top subreddits by post count
    const topSubreddits = await Post.aggregate([
      { $group: { _id: '$subreddit', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // 2. Top authors by score
    const topAuthors = await Post.aggregate([
      { $group: { _id: '$author', totalScore: { $sum: '$score' } } },
      { $sort: { totalScore: -1 } },
      { $limit: 10 }
    ]);

    // 3. Most common keywords
    const keywordsAgg = await Post.aggregate([
      { $unwind: '$keywords' },
      { $group: { _id: '$keywords', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    res.status(200).json({
      topSubreddits,
      topAuthors,
      topKeywords: keywordsAgg
    });
  } catch (err) {
    console.error('❌ Error generating analytics:', err.message);
    res.status(500).json({ error: 'Failed to generate analytics' });
  }
}
