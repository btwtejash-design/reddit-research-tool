// src/server.js — FINAL PATCHED VERSION (Snoowrap OAuth + stable Reddit API)

import dotenv from "dotenv";
import express from "express";
import request from "request";
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
    origin: "https://reddit-research-tool.vercel.app",
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

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
