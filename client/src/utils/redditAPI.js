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

// Fetch trending audience collections dynamically
export async function fetchTrendingCollections() {
  try {
    const url = `${API_BASE}/api/trending-collections`;
    console.log('🟢 Fetching trending collections from:', url);
    
    const { data } = await axios.get(url);
    
    // Transform the data to match our collection format
    const collections = data.collections.map(collection => ({
      id: collection.id,
      name: collection.name,
      description: collection.description,
      icon: collection.icon,
      keywords: collection.keywords || [],
      subreddits: collection.subreddits.map(sub => ({
        name: sub.name,
        displayName: sub.displayName || sub.name,
        description: sub.description,
        members: sub.subscribers,
        activeUsers: sub.activeUsers,
        icon: sub.icon,
        keywords: sub.keywords || []
      }))
    }));
    
    console.log(`✅ Received ${collections.length} trending collections`);
    return collections;
  } catch (error) {
    console.error('Backend API Error:', error);
    throw new Error('Failed to fetch trending collections. Falling back to default collections.');
  }
}