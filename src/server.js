// src/server.js
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
    origin: "https://reddit-research-tool.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// FIXED LOGGER: Use /api (catches /api/reddit, /api/posts, etc.) instead of /api/*
app.use('/api', (req, res, next) => {
  console.log(`🌐 API Request: ${req.method} ${req.path} | Query:`, req.query);
  next();
});

app.use("/api/posts", postRoutes);
app.use("/analytics", analyticsRoutes);

// Create a dedicated axios instance for Reddit with a browser-like UA and common headers
const redditClient = axios.create({
  baseURL: "https://www.reddit.com",
  timeout: 15000,
  headers: {
    // Browser-like UA — Reddit prefers realistic user agents
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: "https://www.reddit.com/",
  },
  maxRedirects: 5,
  // Do not throw for non-2xx automatically — we'll inspect response in catch
  validateStatus: function (status) {
    return status >= 200 && status < 500; // treat >=500 as error to catch; but allow 4xx to inspect
  },
});

// TEST ROUTE: http://localhost:5000/test
app.get("/test", (req, res) => {
  console.log('🧪 Test route hit!');
  res.json({ alive: true, message: 'Server good!' });
});

// ✅ FIXED /api/reddit: Dynamic params + detailed logs + safer headers
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
    const redditPath = `/search.json?q=${encodeURIComponent(query)}&sort=${encodeURIComponent(sort)}&t=${encodeURIComponent(time)}&limit=${actualLimit}`;
    console.log('🔗 Full Reddit URL (check limit param):', redditClient.defaults.baseURL + redditPath);

    // Use redditClient with proper headers
    const redditResponse = await redditClient.get(redditPath);

    // If reddit returned a 4xx/5xx, redditResponse.status will show it because of validateStatus above
    if (redditResponse.status >= 400) {
      console.error("❌ Reddit responded with non-2xx:", {
        status: redditResponse.status,
        dataSnippet: JSON.stringify(redditResponse.data).slice(0, 200)
      });
      // Map Reddit 403 -> client-friendly message
      const status = redditResponse.status === 403 ? 403 : 500;
      return res.status(status).json({ error: `Reddit returned status ${redditResponse.status}` });
    }

    // Safely access children
    const children = redditResponse.data?.data?.children || [];
    const rawCount = children.length;
    console.log(`📊 Reddit API returned EXACTLY ${rawCount} posts (expected: ${actualLimit})`);

    const posts = children.map((child) => {
      const d = child.data || {};
      return {
        title: d.title,
        subreddit: d.subreddit,
        ups: d.score || d.ups || 0,
        url: d.url,
        author: d.author,
        created_utc: d.created_utc,
        comments: d.num_comments,
        thumbnail: d.thumbnail,
        permalink: d.permalink,
      };
    });

    console.log(`✅ Backend sending ${posts.length} posts (matches raw: ${rawCount})`);
    res.json({ posts });
  } catch (error) {
    // Detailed logging for Render
    console.error("❌ Axios/Reddit error details:", {
      message: error.message,
      status: error.response?.status,
      headers: error.response?.headers,
      dataSnippet: error.response?.data ? JSON.stringify(error.response.data).slice(0, 400) : null,
      code: error.code,
    });
    // If it's a known axios error with response status, forward 502 or 403 as appropriate
    const status = error.response?.status || 500;
    res.status(status === 403 ? 403 : 500).json({ error: "Failed to fetch Reddit posts", details: error.message });
  }
});

// /r/:subreddit endpoint (also uses redditClient)
app.get("/reddit/:subreddit", async (req, res) => {
  const subreddit = req.params.subreddit;
  try {
    const resp = await redditClient.get(`/r/${encodeURIComponent(subreddit)}/hot.json?limit=5`);

    if (resp.status >= 400) {
      console.error("❌ Reddit /r/:subreddit non-2xx:", resp.status, resp.data);
      return res.status(resp.status).json({ error: `Reddit returned ${resp.status}` });
    }

    const posts = resp.data?.data?.children.map((post) => {
      const d = post.data || {};
      return {
        title: d.title,
        url: d.url,
        author: d.author,
        ups: d.ups || d.score || 0,
        comments: d.num_comments,
        subreddit: d.subreddit,
        thumbnail: d.thumbnail,
      };
    }) || [];

    res.json(posts);
  } catch (error) {
    console.error("❌ /r/:subreddit error:", error.message, error.response?.status);
    res.status(500).json({ error: "Failed to fetch subreddit data" });
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
  console.log(`✅ Server running on ${PORT}`)
);
