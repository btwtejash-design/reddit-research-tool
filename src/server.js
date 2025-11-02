// src/server.js — FINAL PATCHED VERSION (Snoowrap OAuth + stable Reddit API)

import dotenv from "dotenv";
import express from "express";
import request from "request";
import axios from "axios";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import cors from "cors";
import snoowrap from "snoowrap";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: ["https://reddit-research-tool.vercel.app", "http://localhost:3000", "http://localhost:5173", "*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 🌐 Log every API call
app.use("/api", (req, res, next) => {
  console.log(`🌐 API Request: ${req.method} ${req.path} | Query:`, req.query);
  next();
});

// Routes
app.use("/api/posts", postRoutes);
app.use("/analytics", analyticsRoutes);

// 🧪 Health check
app.get("/test", (req, res) => {
  console.log("🧪 Test route hit!");
  res.json({ alive: true, message: "Server is running fine!" });
});

// 🧩 Initialize Snoowrap client (Reddit OAuth)
const reddit = new snoowrap({
  userAgent: "reddit-research-tool/1.0",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
});

// ✅ Authenticated Reddit search via OAuth
app.get("/api/reddit", async (req, res) => {
  const { q: query, sort = "relevance", t: time = "all", limit = 20 } = req.query;
  const actualLimit = Math.min(parseInt(limit) || 20, 100);

  if (!query) return res.status(400).json({ error: "Missing 'q' query param" });

  try {
    console.log(`🔍 Searching Reddit for: "${query}"`);
    const results = await reddit.search({
      query,
      sort,
      time,
      limit: actualLimit,
    });

    const posts = results.map((p) => ({
      title: p.title,
      subreddit: p.subreddit.display_name,
      ups: p.ups,
      url: p.url,
      author: p.author.name,
      created_utc: p.created_utc,
      comments: p.num_comments,
      permalink: `https://reddit.com${p.permalink}`,
      thumbnail: p.thumbnail,
    }));

    console.log(`✅ Returning ${posts.length} posts for "${query}"`);
    res.json({ posts });
  } catch (error) {
    console.error("❌ Reddit OAuth Error:", error.message);
    res.status(500).json({ error: "Reddit OAuth failed", details: error.message });
  }
});

// 🔸 Fetch hot posts from a subreddit
app.get("/reddit/:subreddit", async (req, res) => {
  const { subreddit } = req.params;
  try {
    const posts = await reddit.getHot(subreddit, { limit: 5 });
    const formatted = posts.map((p) => ({
      title: p.title,
      url: p.url,
      author: p.author.name,
      ups: p.ups,
      comments: p.num_comments,
      subreddit: p.subreddit.display_name,
      thumbnail: p.thumbnail,
    }));
    res.json(formatted);
  } catch (error) {
    console.error("🔥 /r/:subreddit error:", error.message);
    res.status(500).json({ error: "Failed to fetch subreddit data" });
  }
});

// 🔥 Get popular/trending subreddits and categorize them into audience collections
app.get("/api/trending-collections", async (req, res) => {
  try {
    console.log("🔥 Fetching trending collections...");
    
    // Fetch popular subreddits using public Reddit API with axios
    const popularResponse = await axios.get("https://www.reddit.com/subreddits/popular.json?limit=150");
    const popularData = popularResponse.data;
    
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

    console.log(`✅ Returning ${collections.length} collections with ${uniqueSubreddits.length} subreddits`);
    res.json({
      collections,
      totalSubreddits: uniqueSubreddits.length,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("❌ Error fetching trending collections:", err);
    res.status(500).json({ error: "Failed to fetch trending collections", details: err.message });
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

    // Add to category if score is significant
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

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
