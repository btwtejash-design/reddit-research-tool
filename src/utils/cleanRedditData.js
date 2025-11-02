// src/utils/cleanRedditData.js

export function cleanRedditPost(rawPost) {
  return {
    postId: rawPost.id || '',
    title: rawPost.title?.trim() || '',
    author: rawPost.author || 'unknown',
    subreddit: rawPost.subreddit || '',
    score: rawPost.score || 0,
    numComments: rawPost.num_comments || 0,
    createdUtc: new Date(rawPost.created_utc * 1000),
    url: rawPost.url || '',
    text: rawPost.selftext?.replace(/\s+/g, ' ').trim() || '',
    keywords: extractKeywords(rawPost.title + ' ' + rawPost.selftext),
    fetchedAt: new Date(),
  };
}

// Basic keyword extractor (you can replace later with NLP)
function extractKeywords(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 4)
    .slice(0, 10);
}
