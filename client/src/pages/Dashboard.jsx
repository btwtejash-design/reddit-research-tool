import { useState } from "react";
import SubredditCard from "../components/SubredditCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import axios from "axios";

export default function Dashboard() {
  const [subreddit, setSubreddit] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSubredditData = async (e) => {
    e.preventDefault();
    if (!subreddit) return;
    setLoading(true);
    setError("");
    setPosts([]);

    try {
      const { data } = await axios.get(`https://reddit-research-tool.onrender.com/reddit/${subreddit}`);
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch subreddit data. Please check the subreddit name and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <h1>Reddit Insights Dashboard</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Analyze any subreddit to discover trending posts and community engagement
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={fetchSubredditData} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Enter subreddit (e.g. startups)"
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
            className="form-control"
            style={{ flex: '1', minWidth: '200px' }}
          />
          <button type="submit" className="btn btn-primary">
            Analyze
          </button>
        </form>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && posts.length > 0 && (
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Found {posts.length} post{posts.length !== 1 ? 's' : ''}
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {posts.map((post, i) => (
              <SubredditCard key={i} post={post} />
            ))}
          </div>
        </div>
      )}

      {!loading && !error && posts.length === 0 && subreddit && (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            No posts found. Try a different subreddit name.
          </p>
        </div>
      )}
    </div>
  );
}
