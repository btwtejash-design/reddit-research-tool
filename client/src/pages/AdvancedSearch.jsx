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
    <div style={{
      background: 'linear-gradient(180deg, var(--emerald-50) 0%, var(--bg-main) 100%)',
      minHeight: '100vh',
      paddingTop: '3rem',
      paddingBottom: '4rem'
    }}>
      <div className="container">
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          animation: 'fadeIn 0.8s ease-out'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.25rem',
            backgroundColor: 'var(--primary)',
            color: 'white',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-emerald)'
          }}>
            🔍 Advanced Search
          </div>

          <h1 style={{
            marginBottom: '1rem',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)'
          }}>
            Find the Perfect
            <br />
            <span style={{
              background: 'var(--gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Subreddit — Fast
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Discover niche communities, analyze engagement, and track growth with powerful filtering options.
          </p>
        </div>

        {/* Search Card */}
        <div className="card fade-in" style={{
          marginBottom: '3rem',
          background: 'white',
          boxShadow: 'var(--shadow-xl)',
          border: 'none'
        }}>
          <div style={{
            background: 'var(--gradient-primary)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
            margin: '-1.5rem -1.5rem 1.5rem -1.5rem',
            color: 'white'
          }}>
            <h2 className="screenshot-header" style={{ margin: 0, color: 'white' }}>
              Search Filters
            </h2>
            <p className="screenshot-subheader" style={{ margin: '0.5rem 0 0 0', opacity: 0.95 }}>
              Refine your search with advanced options
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            <div>
              <label className="form-label">🔑 Keyword</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. AI art, startup advice"
                value={filters.keyword}
                onChange={(e) => updateFilter("keyword", e.target.value, true)}
              />
            </div>
            <div>
              <label className="form-label">👥 Audience (optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. entrepreneurs, developers"
                value={filters.audience}
                onChange={(e) => updateFilter("audience", e.target.value, true)}
              />
            </div>
            <div>
              <label className="form-label">📊 Sort by</label>
              <select
                className="form-select"
                value={filters.sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="new">New</option>
                <option value="hot">Hot</option>
                <option value="top">Top</option>
                <option value="comments">Most Comments</option>
              </select>
            </div>
            <div>
              <label className="form-label">⏰ Timeframe</label>
              <select
                className="form-select"
                value={filters.time}
                onChange={(e) => updateFilter("time", e.target.value)}
              >
                <option value="hour">Past Hour</option>
                <option value="day">Past Day</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
                <option value="year">Past Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            <div>
              <label className="form-label">📈 Results Limit</label>
              <select
                className="form-select"
                value={filters.limit}
                onChange={(e) => updateFilter("limit", parseInt(e.target.value))}
              >
                <option value={10}>10 results</option>
                <option value={20}>20 results</option>
                <option value={50}>50 results</option>
                <option value={100}>100 results</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                className="btn btn-primary"
                onClick={performSearch}
                style={{ width: '100%', padding: '1rem' }}
              >
                🔍 Search Now
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="fade-in">
            <Loader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="fade-in">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Results */}
        {!loading && !error && posts.length > 0 && (
          <div className="card fade-in" style={{
            background: 'white',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingBottom: '1.5rem',
              borderBottom: '2px solid var(--emerald-100)'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.75rem' }}>
                  Search Results
                </h3>
                <p style={{
                  margin: '0.5rem 0 0 0',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9375rem'
                }}>
                  Showing {posts.length} result{posts.length !== 1 ? 's' : ''} for "<em>{fullQuery}</em>"
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button className="btn btn-outline-secondary btn-sm">
                  📥 Export CSV
                </button>
                <button className="btn btn-primary btn-sm">
                  ⚡ Upgrade for API
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>📝 Title</th>
                    <th>👥 Subreddit</th>
                    <th className="text-end">⬆️ Upvotes</th>
                    <th className="text-end">💬 Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, i) => (
                    <tr key={post.id || i} className="fade-in" style={{
                      animationDelay: `${i * 0.05}s`,
                      animationFillMode: 'both'
                    }}>
                      <td>
                        <a
                          href={`https://www.reddit.com${post.permalink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="post-link"
                          style={{ fontWeight: 600 }}
                        >
                          {post.title}
                        </a>
                        {post.selftext && (
                          <div style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                            marginTop: '0.25rem'
                          }}>
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
                          style={{ fontWeight: 600 }}
                        >
                          r/{post.subreddit}
                        </a>
                      </td>
                      <td className="text-end">
                        <strong>{post.score?.toLocaleString() || 0}</strong>
                      </td>
                      <td className="text-end screenshot-value">
                        <strong>{post.num_comments?.toLocaleString() || 0}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && fullQuery && (
          <div className="card text-center fade-in" style={{
            padding: '4rem 2rem',
            background: 'white',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>
              🔍
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>No Results Found</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              No results found for "<em>{fullQuery}</em>". Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
