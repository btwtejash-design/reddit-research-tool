import { useState } from 'react';
import { AUDIENCE_COLLECTIONS, searchCollections } from '../utils/audienceCollections';
import SubredditCollection from '../components/SubredditCollection';

export default function AudienceSearch() {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCollections, setFilteredCollections] = useState(AUDIENCE_COLLECTIONS);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredCollections(AUDIENCE_COLLECTIONS);
    } else {
      const results = searchCollections(query);
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

  // Show collection grid
  return (
    <div className="container">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1>Discover Audience Collections</h1>
        <p style={{ 
          fontSize: '1.125rem', 
          color: 'var(--text-secondary)', 
          maxWidth: '700px', 
          margin: '0 auto',
          marginBottom: '2rem'
        }}>
          Explore curated collections of Reddit communities organized by audience type
        </p>
        
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search collections (e.g., pet lovers, developers, travelers)..."
            value={searchQuery}
            onChange={handleSearch}
            style={{ fontSize: '1rem', padding: '1rem' }}
          />
        </div>
      </div>

      {filteredCollections.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            No collections found matching "{searchQuery}". Try a different search term.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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
      )}
    </div>
  );
}

function CollectionCard({ collection, onClick }) {
  const { name, description, icon, subreddits } = collection;

  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <span style={{ fontSize: '2.5rem' }}>{icon}</span>
        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{name}</h3>
      </div>
      
      <p style={{ 
        color: 'var(--text-secondary)', 
        marginBottom: '1rem',
        flex: 1,
        fontSize: '0.9375rem'
      }}>
        {description}
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border-color)'
      }}>
        <span style={{ 
          fontSize: '0.875rem', 
          color: 'var(--text-secondary)',
          fontWeight: 500
        }}>
          {subreddits.length} subreddit{subreddits.length !== 1 ? 's' : ''}
        </span>
        <span style={{ 
          color: 'var(--primary)',
          fontWeight: 600,
          fontSize: '0.875rem'
        }}>
          Explore →
        </span>
      </div>
    </div>
  );
}
