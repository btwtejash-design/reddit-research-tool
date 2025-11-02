// src/server.js: FIXED version (remove buggy /api/* middleware; use /api instead for logging)
import dotenv from "dotenv";
import express from "express";
import request from "request";
import connectDB from "./config/db.js"; // Adjust path if needed
import postRoutes from "./routes/postRoutes.js";
import axios from "axios";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
connectDB(); // Comment if DB errors

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// FIXED LOGGER: Use /api (catches /api/reddit, /api/posts, etc.) instead of /api/*
app.use('/api', (req, res, next) => {
  console.log(`🌐 API Request: ${req.method} ${req.path} | Query:`, req.query);
  next();
});

// Existing routes
app.use("/api/posts", postRoutes);
app.use("/analytics", analyticsRoutes);

// TEST ROUTE: http://localhost:5000/test
app.get("/test", (req, res) => {
  console.log('🧪 Test route hit!');
  res.json({ alive: true, message: 'Server good!' });
});

// ✅ FIXED /api/reddit: Dynamic params + detailed logs
app.get("/api/reddit", async (req, res) => {
  const { q: query, sort = 'relevance', t: time = 'all', limit = 20 } = req.query;
  const parsedLimit = parseInt(limit);
  const actualLimit = isNaN(parsedLimit) ? 20 : Math.min(parsedLimit, 100);
  console.log('🟢 /api/reddit PROCESSED: From query:', limit, '→ Parsed/Used:', actualLimit);

  if (!query) {
    console.log('❌ No query param');
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  try {
    const redditUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=${sort}&t=${time}&limit=${actualLimit}`;
    console.log('🔗 Full Reddit URL (check limit param):', redditUrl);

    const redditResponse = await axios.get(redditUrl, { 
      headers: { 'User-Agent': 'RedditResearchApp/1.0' },
      timeout: 10000 
    });

    const rawCount = redditResponse.data.data.children.length;
    console.log(`📊 Reddit API returned EXACTLY ${rawCount} posts (expected: ${actualLimit})`);

    const posts = redditResponse.data.data.children.map((child) => ({
      title: child.data.title,
      subreddit: child.data.subreddit,
      ups: child.data.score,
      url: child.data.url,
      author: child.data.author,
      created_utc: child.data.created_utc,
      comments: child.data.num_comments,
      thumbnail: child.data.thumbnail,
      permalink: child.data.permalink,
    }));

    console.log(`✅ Backend sending ${posts.length} posts (matches raw: ${rawCount})`);
    res.json({ posts });
  } catch (error) {
    console.error("❌ Axios/Reddit error details:", {
      message: error.message,
      status: error.response?.status,
      code: error.code
    });
    res.status(500).json({ error: "Failed to fetch Reddit posts" });
  }
});

// OAuth flow (unchanged)
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

app.get("/reddit/:subreddit", async (req, res) => {
  const subreddit = req.params.subreddit;
  try {
    const response = await axios.get(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=5`
    );
    const posts = response.data.data.children.map((post) => ({
      title: post.data.title,
      url: post.data.url,
      author: post.data.author,
      ups: post.data.ups,
      comments: post.data.num_comments,
      subreddit: post.data.subreddit,
      thumbnail: post.data.thumbnail,
    }));

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch subreddit data" });
  }
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);