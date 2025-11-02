// src/pages/AdvancedSearch.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { fetchRedditPosts } from "../utils/redditAPI";

function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);
  return useCallback(
    (...args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
}

export default function AdvancedSearch() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    keyword: "",
    audience: "",
    sort: "relevance",
    time: "month",
    limit: 20,
  });

  const performSearch = async () => {
    const fullQuery = [filters.audience, filters.keyword].filter(Boolean).join(" ");
    if (!fullQuery) {
      setPosts([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await fetchRedditPosts(fullQuery, filters.sort, filters.time, filters.limit);
      setPosts(results);
    } catch (err) {
      const msg = err.message.includes("Network")
        ? 'Server down? Run "node server.js" in root.'
        : err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(performSearch, 800);
  const quickSearch = useDebounce(performSearch, 200);

  const updateFilter = (key, value, isTyping = false) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    const searcher = isTyping ? debouncedSearch : quickSearch;
    searcher();
  };

  const fullQuery = [filters.audience, filters.keyword].filter(Boolean).join(" ");

  useEffect(() => {
    performSearch();
  }, []);

  return (
    <div className="container py-5">
      {/* Search Section */}
      <div className="screenshot-card">
        <h2 className="screenshot-header">Find the perfect subreddit — fast</h2>
        <p className="screenshot-subheader">
          Discover niche communities, analyze engagement, and track growth.
        </p>

        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Keyword</label>
            <input
              type="text"
              className="form-control screenshot-search"
              placeholder="e.g. AI art"
              value={filters.keyword}
              onChange={(e) => updateFilter("keyword", e.target.value, true)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Audience (optional)</label>
            <input
              type="text"
              className="form-control screenshot-search"
              placeholder="e.g. startups"
              value={filters.audience}
              onChange={(e) => updateFilter("audience", e.target.value, true)}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Sort by</label>
            <select
              className="form-select"
              value={filters.sort}
              onChange={(e) => updateFilter("sort", e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="new">New</option>
              <option value="hot">Hot</option>
              <option value="top">Top</option>
              <option value="comments">Comments</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Timeframe</label>
            <select
              className="form-select"
              value={filters.time}
              onChange={(e) => updateFilter("time", e.target.value)}
            >
              <option value="hour">Hour</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-semibold">Results Limit</label>
            <select
              className="form-select"
              value={filters.limit}
              onChange={(e) => updateFilter("limit", parseInt(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="col-md-3">
            <button
              className="btn screenshot-btn w-100"
              onClick={performSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && posts.length > 0 && (
        <div className="screenshot-card">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-bold">Search Results</h5>
            <div>
              <button className="btn btn-outline-secondary btn-sm me-2">
                Export CSV
              </button>
              <button className="btn screenshot-btn btn-sm">Upgrade for API</button>
            </div>
          </div>
          <p className="text-muted small mb-3">
            Showing {posts.length} results for “{fullQuery}”
          </p>
          <div className="table-responsive">
            <table className="table screenshot-table align-middle mb-0">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subreddit</th>
                  <th className="text-end">Upvotes</th>
                  <th className="text-end">Comments</th>
                </tr>
              </thead>
              <tbody>
  {posts.map((post, i) => (
    <tr key={post.id || i}>
      <td>
        <a
          href={`https://www.reddit.com${post.permalink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fw-semibold text-decoration-none post-link"
        >
          {post.title}
        </a>
        {post.selftext && (
          <div className="text-muted small">
            {post.selftext.substring(0, 80)}...
          </div>
        )}
      </td>
      <td>
        <a
          href={`https://www.reddit.com/r/${post.subreddit}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none text-emerald fw-medium"
        >
          r/{post.subreddit}
        </a>
      </td>
      <td className="text-end">{post.score}</td>
      <td className="text-end screenshot-value">{post.num_comments}</td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        </div>
      )}

      {!loading && !error && posts.length === 0 && fullQuery && (
        <div className="screenshot-card text-center text-muted">
          No results found for “{fullQuery}”.
        </div>
      )}
    </div>
  );
}
