import { useState, useEffect } from 'react';
import { AUDIENCE_COLLECTIONS, searchCollections } from '../utils/audienceCollections';
import { fetchTrendingCollections } from '../utils/redditAPI';
import SubredditCollection from '../components/SubredditCollection';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function AudienceSearch() {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useTrending, setUseTrending] = useState(true);

  // Fetch trending collections on mount
  useEffect(() => {
    async function loadCollections() {
      setLoading(true);
      setError(null);
      try {
        const trendingCollections = await fetchTrendingCollections();
        setCollections(trendingCollections);
        setFilteredCollections(trendingCollections);
        setUseTrending(true);
      } catch (err) {
        console.warn('Failed to fetch trending, using default collections:', err);
        // Fallback to hardcoded collections
        setCollections(AUDIENCE_COLLECTIONS);
        setFilteredCollections(AUDIENCE_COLLECTIONS);
        setUseTrending(false);
        setError('Using default collections. Trending data unavailable.');
      } finally {
        setLoading(false);
      }
    }
    loadCollections();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredCollections(collections);
    } else {
      // Search through current collections
      const lowerQuery = query.toLowerCase();
      const results = collections.filter(collection =>
        collection.name.toLowerCase().includes(lowerQuery) ||
        collection.description.toLowerCase().includes(lowerQuery) ||
        collection.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
      );
      setFilteredCollections(results);
    }
  };

  const handleCollectionClick = (collection) => {
    setSelectedCollection(collection);
  };

  const handleBack = () => {
    setSelectedCollection(null);
  };

  // If a collection is selected, show its subreddits
  if (selectedCollection) {
    return (
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={handleBack}
            className="btn btn-outline-secondary"
            style={{ marginBottom: '1rem' }}
          >
            ← Back to Collections
          </button>
          <SubredditCollection 
            subreddits={selectedCollection.subreddits}
            audienceName={selectedCollection.name}
          />
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  // Show warning if using default collections (not blocking, just informational)
  const showWarning = error && !useTrending && collections.length > 0;

  // Calculate total stats
  const totalSubreddits = collections.reduce((sum, c) => sum + c.subreddits.length, 0);

  // Show collection grid
  return (
    <div style={{ background: 'linear-gradient(180deg, var(--emerald-50) 0%, var(--bg-main) 50%)', minHeight: '100vh', paddingBottom: '3rem' }}>
      <div className="container">
        {/* Hero Section */}
        <div style={{ 
          textAlign: 'center', 
          paddingTop: '3rem',
          paddingBottom: '3rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--primary)',
            color: 'white',
            borderRadius: '2rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            {useTrending ? '🔥 LIVE TRENDING' : '📚 CURATED COLLECTIONS'}
          </div>
          
          <h1 style={{ 
            fontSize: '3rem',
            fontWeight: 800,
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1.1'
          }}>
            Find Your Perfect Reddit Audience
          </h1>
          
          <p style={{ 
            fontSize: '1.375rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '800px', 
            margin: '0 auto 1.5rem',
            lineHeight: '1.6',
            fontWeight: 400
          }}>
            Discover <strong style={{ color: 'var(--primary)' }}>{totalSubreddits}+ active communities</strong> where your target audience is already engaged and ready to connect
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                {collections.length}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Audience Collections
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>
                {totalSubreddits}+
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Active Communities
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                100%
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Real-Time Data
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div style={{ 
            maxWidth: '700px', 
            margin: '0 auto',
            position: 'relative'
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)',
              padding: '0.75rem',
              border: '2px solid transparent',
              transition: 'all 0.2s ease'
            }}>
              <svg 
                style={{ 
                  width: '1.5rem', 
                  height: '1.5rem', 
                  marginLeft: '1rem',
                  color: 'var(--text-muted)'
                }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                className="form-control"
                placeholder="Search for your audience... (e.g., developers, pet lovers, entrepreneurs)"
                value={searchQuery}
                onChange={handleSearch}
                style={{ 
                  fontSize: '1rem', 
                  padding: '0.75rem 1rem',
                  border: 'none',
                  outline: 'none',
                  flex: 1
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilteredCollections(collections);
                  }}
                  style={{
                    padding: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {useTrending && (
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--text-muted)', 
              marginTop: '1rem'
            }}>
              ⚡ Updated in real-time • Showing trending communities right now
            </p>
          )}
        </div>

        {/* Warning Banner */}
        {showWarning && (
          <div style={{ 
            marginBottom: '1.5rem',
            padding: '1rem',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <span style={{ color: '#856404', fontSize: '0.9375rem' }}>
              ⚠️ {error}
            </span>
            <button 
              className="btn btn-sm"
              onClick={async () => {
                setLoading(true);
                setError(null);
                try {
                  const trendingCollections = await fetchTrendingCollections();
                  setCollections(trendingCollections);
                  setFilteredCollections(trendingCollections);
                  setUseTrending(true);
                } catch (err) {
                  setError('Using default collections. Trending data unavailable.');
                  setUseTrending(false);
                } finally {
                  setLoading(false);
                }
              }}
              style={{ 
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                backgroundColor: 'var(--warning)',
                color: 'white',
                border: 'none'
              }}
            >
              Retry Trending Data
            </button>
          </div>
        )}

        {/* Collections Grid */}
        {filteredCollections.length === 0 ? (
          <div className="card text-center" style={{ padding: '4rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ marginBottom: '0.5rem' }}>No collections found</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
              No collections match "{searchQuery}". Try searching for "developers", "pet lovers", or "entrepreneurs"
            </p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>
                Explore Collections
              </h2>
              <span style={{ 
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)'
              }}>
                {filteredCollections.length} {filteredCollections.length === 1 ? 'collection' : 'collections'} available
              </span>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredCollections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onClick={() => handleCollectionClick(collection)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CollectionCard({ collection, onClick }) {
  const { name, description, icon, subreddits } = collection;
  
  // Calculate total members (if available)
  const totalMembers = subreddits.reduce((sum, sub) => sum + (sub.members || 0), 0);
  const hasMembers = totalMembers > 0;

  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        border: '2px solid transparent',
        background: 'white'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
        e.currentTarget.style.borderColor = 'var(--primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      {/* Header with gradient */}
      <div style={{
        background: `linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)`,
        padding: '1.5rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{icon}</div>
        <h3 style={{ 
          margin: 0, 
          fontSize: '1.5rem',
          fontWeight: 700
        }}>
          {name}
        </h3>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '1.5rem',
          fontSize: '0.9375rem',
          lineHeight: '1.6',
          flex: 1
        }}>
          {description}
        </p>
        
        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          marginBottom: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700,
              color: 'var(--primary)'
            }}>
              {subreddits.length}
            </div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Communities
            </div>
          </div>
          {hasMembers && (
            <div>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700,
                color: 'var(--primary)'
              }}>
                {(totalMembers / 1000).toFixed(0)}k+
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Total Members
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button
          style={{
            width: '100%',
            padding: '0.875rem',
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--primary-light)';
            e.target.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'var(--primary)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Explore Communities
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
