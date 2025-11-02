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
    <div className="container">
      {/* Search Section */}
      <div className="card">
        <h2 className="screenshot-header">Find the perfect subreddit — fast</h2>
        <p className="screenshot-subheader">
          Discover niche communities, analyze engagement, and track growth.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem'
        }}>
          <div>
            <label className="form-label">Keyword</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. AI art"
              value={filters.keyword}
              onChange={(e) => updateFilter("keyword", e.target.value, true)}
            />
          </div>
          <div>
            <label className="form-label">Audience (optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. startups"
              value={filters.audience}
              onChange={(e) => updateFilter("audience", e.target.value, true)}
            />
          </div>

          <div>
            <label className="form-label">Sort by</label>
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
          <div>
            <label className="form-label">Timeframe</label>
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
          <div>
            <label className="form-label">Results Limit</label>
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
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              className="btn btn-primary"
              onClick={performSearch}
              style={{ width: '100%' }}
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
        <div className="card">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h3 style={{ margin: 0 }}>Search Results</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-outline-secondary btn-sm">
                Export CSV
              </button>
              <button className="btn btn-primary btn-sm">Upgrade for API</button>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1rem' }}>
            Showing {posts.length} result{posts.length !== 1 ? 's' : ''} for "{fullQuery}"
          </p>
          <div className="table-responsive">
            <table className="table">
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
                        className="post-link"
                      >
                        {post.title}
                      </a>
                      {post.selftext && (
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                          {post.selftext.substring(0, 80)}...
                        </div>
                      )}
                    </td>
                    <td>
                      <a
                        href={`https://www.reddit.com/r/${post.subreddit}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald hover-emerald"
                      >
                        r/{post.subreddit}
                      </a>
                    </td>
                    <td className="text-end">{post.score?.toLocaleString() || 0}</td>
                    <td className="text-end screenshot-value">{post.num_comments?.toLocaleString() || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && !error && posts.length === 0 && fullQuery && (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            No results found for "{fullQuery}".
          </p>
        </div>
      )}
    </div>
  );
}
