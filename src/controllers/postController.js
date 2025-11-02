import { cleanRedditPost } from '../utils/cleanRedditData.js';
import Post from '../models/Post.js';

export async function getPosts(req, res) {
  try {
    const response = await fetch('https://www.reddit.com/r/all/top.json?limit=10');
    const json = await response.json();
    const posts = json.data.children.map(c => cleanRedditPost(c.data));

    for (const post of posts) {
      await Post.updateOne({ postId: post.postId }, { $set: post }, { upsert: true });
    }

    console.log('✅ Cleaned and saved Reddit posts successfully.');
    res.status(200).json(posts);
  } catch (err) {
    console.error('❌ Error fetching Reddit posts:', err.message);
    res.status(500).json({ error: 'Failed to fetch Reddit posts' });
  }
}
