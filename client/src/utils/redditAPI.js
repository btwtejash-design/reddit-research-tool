// src/utils/redditAPI.js: Added logs (minor update)
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://reddit-research-tool.onrender.com';

export async function fetchRedditPosts(query, sort = 'relevance', time = 'all', limit = 20) {
  try {
    const url = `${API_BASE}/api/reddit?q=${encodeURIComponent(query)}&sort=${sort}&t=${time}&limit=${limit}`;
    console.log('🟢 Frontend API URL:', url); // Debug: Confirm params sent

    const { data } = await axios.get(url);
    
    const normalizedPosts = data.posts.map((post) => ({
      ...post,
      score: post.ups,
      num_comments: post.comments,
    }));
    
    console.log(`✅ Received ${normalizedPosts.length} posts`); // Confirm count
    return normalizedPosts;
  } catch (error) {
    console.error('Backend API Error:', error);
    throw new Error('Failed to fetch Reddit posts via server.');
  }
}