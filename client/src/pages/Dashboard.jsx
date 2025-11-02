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
            📊 Analytics Dashboard
          </div>

          <h1 style={{
            marginBottom: '1rem',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)'
          }}>
            Reddit Insights
            <br />
            <span style={{
              background: 'var(--gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Dashboard
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0 auto 2rem',
            lineHeight: '1.7'
          }}>
            Analyze any subreddit in real-time. Discover trending posts, engagement patterns, 
            and understand what your audience truly cares about.
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
            <h3 style={{ margin: 0, color: 'white', fontSize: '1.5rem' }}>
              🔍 Analyze Subreddit
            </h3>
            <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9, fontSize: '0.9375rem' }}>
              Enter a subreddit name to get instant insights
            </p>
          </div>

          <form onSubmit={fetchSubredditData} style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'flex-end'
          }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label className="form-label">
                Subreddit Name
              </label>
              <input
                type="text"
                placeholder="e.g. startups, programming, entrepreneurs"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                className="form-control"
                style={{
                  fontSize: '1.125rem',
                  padding: '1rem 1.25rem'
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{
                whiteSpace: 'nowrap',
                padding: '1rem 2rem'
              }}
            >
              Analyze Now →
            </button>
          </form>
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
          <div className="fade-in">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{
                  margin: 0,
                  fontSize: '2rem',
                  background: 'var(--gradient-text)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {posts.length} Trending Posts
                </h2>
                <p style={{
                  margin: '0.5rem 0 0 0',
                  color: 'var(--text-secondary)',
                  fontSize: '1rem'
                }}>
                  Latest activity from r/{subreddit}
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}>
              {posts.map((post, i) => (
                <div key={i} className="scale-in" style={{
                  animationDelay: `${i * 0.1}s`,
                  animationFillMode: 'both'
                }}>
                  <SubredditCard post={post} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && subreddit && (
          <div className="card text-center fade-in" style={{
            padding: '4rem 2rem',
            background: 'white',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              opacity: 0.5
            }}>
              🔍
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>No Posts Found</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Try a different subreddit name or check the spelling.
            </p>
          </div>
        )}

        {/* Initial State */}
        {!loading && !error && posts.length === 0 && !subreddit && (
          <div className="fade-in">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginTop: '2rem'
            }}>
              {[
                { icon: '🚀', title: 'Fast Analysis', desc: 'Get insights in seconds' },
                { icon: '📊', title: 'Real-Time Data', desc: 'Always up-to-date metrics' },
                { icon: '🎯', title: 'Deep Insights', desc: 'Understand your audience' }
              ].map((feature, i) => (
                <div key={i} className="card scale-in" style={{
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'white',
                  border: '2px solid var(--emerald-200)',
                  animationDelay: `${i * 0.1}s`,
                  animationFillMode: 'both'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {feature.icon}
                  </div>
                  <h4 style={{ marginBottom: '0.5rem' }}>{feature.title}</h4>
                  <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
