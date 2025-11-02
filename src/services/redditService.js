const Snoowrap = require('snoowrap');
require('dotenv').config();

const r = new Snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

async function fetchPosts(subreddit, limit = 10) {
  const posts = await r.getSubreddit(subreddit).getNew({ limit });
  return posts.map(p => ({
    redditId: p.id,
    title: p.title,
    selftext: p.selftext,
    subreddit: p.subreddit.display_name,
    author: p.author?.name,
    score: p.score,
    comments: p.num_comments,
    created_utc: new Date(p.created_utc * 1000),
    url: p.url
  }));
}

module.exports = { fetchPosts };
