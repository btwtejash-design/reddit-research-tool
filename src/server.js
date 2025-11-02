// src/server.js — FINAL PATCHED VERSION (Reddit 403 fix + stability tweaks)
import dotenv from "dotenv";
import express from "express";
import request from "request";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import axios from "axios";
import cors from "cors";

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

// Log every API hit under /api
app.use("/api", (req, res, next) => {
  console.log(`🌐 API Request: ${req.method} ${req.path} | Query:`, req.query);
  next();
});

app.use("/api/posts", postRoutes);
app.use("/analytics", analyticsRoutes);

// 🧩 Reddit Client (uses realistic headers to avoid 403)
const redditClient = axios.create({
  baseURL: "https://www.reddit.com",
  timeout: 15000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: "https://www.reddit.com/",
    Connection: "keep-alive",
  },
  maxRedirects: 5,
  validateStatus: (status) => status >= 200 && status < 500,
});

// 🔍 Test route
app.get("/test", (req, res) => {
  console.log("🧪 Test route hit!");
  res.json({ alive: true, message: "Server is running fine!" });
});

// ✅ Main Reddit Search API
app.get("/api/reddit", async (req, res) => {
  const { q: query, sort = "relevance", t: time = "all", limit = 20 } = req.query;
  const parsedLimit = parseInt(limit);
  const actualLimit = isNaN(parsedLimit) ? 20 : Math.min(parsedLimit, 100);

  console.log(`🟢 /api/reddit → Query: '${query}' | Limit: ${actualLimit}`);

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  try {
    const redditPath = `/search.json?q=${encodeURIComponent(query)}&sort=${encodeURIComponent(sort)}&t=${encodeURIComponent(time)}&limit=${actualLimit}`;
    console.log("🔗 Reddit API URL:", redditClient.defaults.baseURL + redditPath);

    const redditResponse = await redditClient.get(redditPath);

    if (redditResponse.status >= 400) {
      console.error("❌ Reddit error:", redditResponse.status);
      return res.status(403).json({ error: `Reddit returned ${redditResponse.status}` });
    }

    const children = redditResponse.data?.data?.children || [];
    console.log(`📊 Reddit returned ${children.length} results.`);

    const posts = children.map((child) => {
      const d = child.data || {};
      return {
        title: d.title,
        subreddit: d.subreddit,
        ups: d.score || 0,
        url: d.url,
        author: d.author,
        created_utc: d.created_utc,
        comments: d.num_comments,
        thumbnail: d.thumbnail,
        permalink: d.permalink,
      };
    });

    res.json({ posts });
  } catch (error) {
    console.error("🔥 Axios/Reddit error:", error.message);
    res.status(500).json({ error: "Failed to fetch Reddit posts" });
  }
});

// 🔸 /r/:subreddit hot posts
app.get("/reddit/:subreddit", async (req, res) => {
  const { subreddit } = req.params;
  try {
    const response = await redditClient.get(`/r/${encodeURIComponent(subreddit)}/hot.json?limit=5`);

    if (response.status >= 400) {
      console.error("❌ Reddit subreddit fetch failed:", response.status);
      return res.status(response.status).json({ error: `Reddit returned ${response.status}` });
    }

    const posts = response.data?.data?.children.map((post) => {
      const d = post.data || {};
      return {
        title: d.title,
        url: d.url,
        author: d.author,
        ups: d.ups || 0,
        comments: d.num_comments,
        subreddit: d.subreddit,
        thumbnail: d.thumbnail,
      };
    }) || [];

    res.json(posts);
  } catch (error) {
    console.error("🔥 /r/:subreddit error:", error.message);
    res.status(500).json({ error: "Failed to fetch subreddit data" });
  }
});

// 🔐 OAuth + Token Routes
app.get("/", (req, res) => {
  const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random&redirect_uri=${process.env.REDIRECT_URI}&duration=permanent&scope=read,identity`;
  res.redirect(authUrl);
});

app.get("/refresh", (req, res) => {
  const options = {
    method: "POST",
    url: "https://www.reddit.com/api/v1/access_token",
    auth: {
      user: process.env.CLIENT_ID,
      pass: process.env.CLIENT_SECRET,
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: process.env.REFRESH_TOKEN,
    },
    headers: { "User-Agent": "reddit-research-app/1.0" },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) return res.send(error);
    res.send(body);
  });
});

app.get("/callback", (req, res) => {
  const { code } = req.query;
  const options = {
    method: "POST",
    url: "https://www.reddit.com/api/v1/access_token",
    auth: {
      user: process.env.CLIENT_ID,
      pass: process.env.CLIENT_SECRET,
    },
    form: {
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.REDIRECT_URI,
    },
    headers: { "User-Agent": "reddit-research-app/1.0" },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) return res.send(error);
    if (body.error) return res.send(body);
    console.log(body);
    res.send(`<pre>${JSON.stringify(body, null, 2)}</pre>`);
  });
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
