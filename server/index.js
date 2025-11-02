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

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
