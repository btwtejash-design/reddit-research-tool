import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Tabs from '../components/Tabs';
import { fetchRedditPosts } from '../utils/redditAPI';

const CURATED_AUDIENCES = [
  { id: 0, label: 'Search', description: 'Enter your own audience query' },
  { id: 1, label: 'Curated: Freelancers', query: 'freelancers OR "gig economy" OR upwork' },
  { id: 2, label: 'Curated: Entrepreneurs', query: 'startup OR entrepreneur OR "side hustle"' },
  { id: 3, label: 'Curated: Notion Users', query: 'notion OR "notion app" OR "notion templates"' },
];

export default function AudienceSearch() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState('');

  const tabs = CURATED_AUDIENCES;

  useEffect(() => {
    if (activeTab > 0) {
      const curatedQuery = tabs[activeTab].query;
      handleSearch(curatedQuery);
    }
  }, [activeTab]);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);
    setQuery(searchQuery);
    try {
      const results = await fetchRedditPosts(searchQuery, 'relevance', 'month', 20);
      setPosts(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 0) {
      setPosts([]);
      setQuery('');
    }
  };

  const fullQuery = tabs[activeTab]?.query || query;

  return (
    <div className="container py-5">
      {/* Header / Search Area */}
      <div className="bg-white border rounded-4 shadow-sm p-4 mb-4">
        <h2 className="fw-bold text-dark mb-1">Audience-Based Search</h2>
        <p className="text-muted mb-4">Discover Reddit discussions from specific user groups.</p>

        <Tabs tabs={tabs} onTabChange={handleTabChange} />

        {activeTab === 0 && (
          <div className="mt-4">
            <input
              type="text"
              className="form-control py-3 px-4 rounded-3 border border-emerald"
              placeholder="e.g., People who use Notion for productivity"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && posts.length > 0 && (
        <>
          <div className="bg-white border rounded-4 shadow-sm p-3 mb-3">
            <small className="text-secondary">
              Showing <span className="fw-semibold">{posts.length}</span> results for "<em>{fullQuery}</em>"
            </small>
          </div>

          {/* Results Table */}
          <div className="bg-white border rounded-4 shadow-sm overflow-hidden">
            <div className="d-flex bg-emerald-50 fw-semibold text-dark py-2 px-4 border-bottom">
              <div className="flex-grow-1 col-title">Title</div>
              <div className="col-sub text-center">Subreddit</div>
              <div className="col-up text-center d-none d-md-block">Upvotes</div>
              <div className="col-com text-center">Comments</div>
            </div>

            {posts.map((post, index) => (
              <div
                key={post.id || index}
                className="d-flex align-items-center py-3 px-4 border-bottom"
              >
                {/* Title → link to Reddit post */}
                <div className="flex-grow-1 col-title text-truncate">
                  <a
                    href={`https://www.reddit.com${post.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none fw-semibold text-dark hover-emerald"
                  >
                    {post.title}
                  </a>
                </div>

                {/* Subreddit → link to subreddit */}
                <div className="col-sub text-center text-muted">
                  <a
                    href={`https://www.reddit.com/r/${post.subreddit}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-muted hover-emerald"
                  >
                    r/{post.subreddit}
                  </a>
                </div>

                <div className="col-up text-center d-none d-md-block text-muted">
                  {post.score?.toLocaleString() || 0}
                </div>

                <div className="col-com text-center text-muted">
                  {post.num_comments?.toLocaleString() || 0}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && !error && posts.length === 0 && activeTab === 0 && (
        <div className="bg-white border rounded-4 shadow-sm text-center py-5 mt-4">
          <p className="text-secondary mb-0">Enter an audience query above to get started.</p>
        </div>
      )}
    </div>
  );
}
