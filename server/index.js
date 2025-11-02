import express from "express";
import fetch from "node-fetch";
import Sentiment from "sentiment";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 5000;

const sentiment = new Sentiment();

app.get("/api/reddit", async (req, res) => {
  const { q = "reactjs" } = req.query; // keyword to search
  try {
    const response = await fetch(
      `https://www.reddit.com/search.json?q=${encodeURIComponent(q)}&limit=50`
    );
    const data = await response.json();

    const posts = data.data.children.map((item) => ({
      title: item.data.title,
      subreddit: item.data.subreddit,
      upvotes: item.data.ups,
      author: item.data.author,
      created: item.data.created_utc * 1000,
      url: `https://reddit.com${item.data.permalink}`,
    }));

    // Sentiment analysis
    const analyzed = posts.map((p) => {
      const score = sentiment.analyze(p.title).score;
      return {
        ...p,
        sentiment:
          score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral",
      };
    });

    // Trending tags (from subreddits)
    const tagCounts = {};
    analyzed.forEach((p) => {
      tagCounts[p.subreddit] = (tagCounts[p.subreddit] || 0) + 1;
    });
    const trendingTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Sentiment summary
    const sentimentSummary = {
      Positive: analyzed.filter((p) => p.sentiment === "Positive").length,
      Neutral: analyzed.filter((p) => p.sentiment === "Neutral").length,
      Negative: analyzed.filter((p) => p.sentiment === "Negative").length,
    };

    res.json({
      keyword: q,
      totalPosts: analyzed.length,
      trendingTags,
      sentimentSummary,
      posts: analyzed,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Reddit data" });
  }
});

// Get popular/trending subreddits and categorize them into audience collections
app.get("/api/trending-collections", async (req, res) => {
  try {
    // Fetch popular subreddits (trending/popular communities)
    const popularResponse = await fetch("https://www.reddit.com/subreddits/popular.json?limit=150");
    const popularData = await popularResponse.json();
    
    const allSubreddits = popularData.data?.children || [];

    // Extract subreddit info
    const subreddits = allSubreddits.map(item => {
      const data = item.data;
      return {
        name: data.display_name || data.name,
        displayName: data.title || data.display_name,
        description: data.public_description || data.description || '',
        subscribers: data.subscribers || 0,
        activeUsers: data.active_user_count || 0,
        icon: data.icon_img || data.community_icon || null,
        keywords: extractKeywords(data.public_description || data.description || data.title || '')
      };
    });

    // Remove duplicates
    const uniqueSubreddits = Array.from(
      new Map(subreddits.map(s => [s.name, s])).values()
    );

    // Categorize into audience collections
    const collections = categorizeIntoCollections(uniqueSubreddits);

    res.json({
      collections,
      totalSubreddits: uniqueSubreddits.length,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Error fetching trending collections:", err);
    res.status(500).json({ error: "Failed to fetch trending collections" });
  }
});

// Helper function to extract keywords from text
function extractKeywords(text) {
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'were'];
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.includes(word));
  return [...new Set(words)].slice(0, 5);
}

// Categorize subreddits into audience collections
function categorizeIntoCollections(subreddits) {
  const audienceCategories = {
    'pet-lovers': {
      name: 'Pet Lovers',
      description: 'Communities for pet owners and animal enthusiasts',
      icon: '🐾',
      keywords: ['pet', 'dog', 'cat', 'animal', 'puppy', 'kitten', 'pets', 'dogs', 'cats', 'veterinary', 'animal', 'rescue'],
      subreddits: []
    },
    'software-developers': {
      name: 'Software Developers',
      description: 'Tech communities for developers and programmers',
      icon: '💻',
      keywords: ['programming', 'code', 'developer', 'software', 'javascript', 'python', 'coding', 'tech', 'programming', 'developer', 'software', 'app', 'web'],
      subreddits: []
    },
    'entrepreneurs': {
      name: 'Entrepreneurs',
      description: 'Communities for startups and business owners',
      icon: '🚀',
      keywords: ['startup', 'business', 'entrepreneur', 'entrepreneurship', 'business', 'startup', 'company', 'marketing', 'sales'],
      subreddits: []
    },
    'fitness-enthusiasts': {
      name: 'Fitness Enthusiasts',
      description: 'Communities for fitness, workout, and health',
      icon: '💪',
      keywords: ['fitness', 'workout', 'exercise', 'gym', 'health', 'fitness', 'bodybuilding', 'running', 'yoga', 'workout'],
      subreddits: []
    },
    'gamers': {
      name: 'Gamers',
      description: 'Communities for gaming enthusiasts',
      icon: '🎮',
      keywords: ['game', 'gaming', 'gamer', 'video', 'playstation', 'xbox', 'nintendo', 'gaming', 'game', 'console'],
      subreddits: []
    },
    'crypto-enthusiasts': {
      name: 'Crypto Enthusiasts',
      description: 'Communities for cryptocurrency and blockchain',
      icon: '₿',
      keywords: ['crypto', 'bitcoin', 'blockchain', 'ethereum', 'cryptocurrency', 'crypto', 'bitcoin', 'blockchain'],
      subreddits: []
    },
    'travelers': {
      name: 'Travelers',
      description: 'Communities for travel enthusiasts and nomads',
      icon: '✈️',
      keywords: ['travel', 'trip', 'adventure', 'tourist', 'travel', 'trip', 'backpacking', 'vacation'],
      subreddits: []
    },
    'foodies': {
      name: 'Foodies',
      description: 'Communities for cooking and food enthusiasts',
      icon: '🍳',
      keywords: ['food', 'cooking', 'recipe', 'cuisine', 'cooking', 'food', 'recipe', 'baking', 'kitchen'],
      subreddits: []
    }
  };

  // Categorize each subreddit
  subreddits.forEach(sub => {
    const subText = (sub.description + ' ' + sub.name + ' ' + sub.displayName).toLowerCase();
    
    let bestMatch = null;
    let bestScore = 0;

    // Find best matching category
    Object.entries(audienceCategories).forEach(([id, category]) => {
      let score = 0;
      category.keywords.forEach(keyword => {
        if (subText.includes(keyword.toLowerCase())) {
          score += keyword.length; // Longer keywords = higher score
        }
      });
      if (score > bestScore) {
        bestScore = score;
        bestMatch = id;
      }
    });

    // Add to category if score is significant (at least 3 matches or one strong keyword)
    if (bestMatch && bestScore >= 5) {
      if (audienceCategories[bestMatch].subreddits.length < 15) {
        audienceCategories[bestMatch].subreddits.push(sub);
      }
    }
  });

  // Filter out empty collections and add metadata
  const collections = Object.entries(audienceCategories)
    .filter(([id, category]) => category.subreddits.length > 0)
    .map(([id, category]) => ({
      id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      keywords: category.keywords,
      subreddits: category.subreddits
        .sort((a, b) => (b.subscribers || 0) - (a.subscribers || 0))
        .slice(0, 12) // Limit to top 12 per collection
    }))
    .sort((a, b) => b.subreddits.length - a.subreddits.length); // Sort by collection size

  return collections;
}

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
