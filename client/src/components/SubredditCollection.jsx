// SubredditCollection - Shows a collection of subreddits for an audience
import React from 'react';

export default function SubredditCollection({ subreddits, audienceName }) {
  if (!subreddits || subreddits.length === 0) {
    return (
      <div className="card text-center" style={{ padding: '2rem' }}>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          No subreddits found for this audience.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: '1rem' }}>
        {audienceName} Communities
      </h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
        Explore {subreddits.length} subreddit{subreddits.length !== 1 ? 's' : ''} where {audienceName.toLowerCase()} gather and discuss
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {subreddits.map((subreddit, index) => (
          <SubredditItem key={index} subreddit={subreddit} />
        ))}
      </div>
    </div>
  );
}

function SubredditItem({ subreddit }) {
  const {
    name,
    displayName,
    members,
    description,
    activeUsers,
    icon,
    keywords
  } = subreddit;

  // Create a simple description from keywords if no description exists
  const subDescription = description || 
    (keywords && keywords.length > 0 
      ? `Community for ${keywords.slice(0, 2).join(' and ')}` 
      : 'Reddit community');

  return (
    <a
      href={`https://www.reddit.com/r/${name}`}
      target="_blank"
      rel="noopener noreferrer"
      className="card"
      style={{
        textDecoration: 'none',
        display: 'block',
        padding: '1.25rem',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '50%',
          backgroundColor: 'var(--emerald-100)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          flexShrink: 0
        }}>
          {icon || '📱'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4 style={{ 
            margin: 0, 
            fontSize: '1rem',
            color: 'var(--text-primary)',
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            r/{name}
          </h4>
          {displayName && displayName !== name && (
            <p style={{ 
              margin: 0, 
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {displayName}
            </p>
          )}
        </div>
      </div>
      
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        marginBottom: '0.75rem',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        lineHeight: '1.4'
      }}>
        {subDescription}
      </p>
      
      <div style={{
        display: 'flex',
        gap: '1rem',
        fontSize: '0.875rem',
        color: 'var(--text-secondary)',
        flexWrap: 'wrap'
      }}>
        {members ? (
          <span>👥 {formatNumber(members)} members</span>
        ) : (
          <span style={{ opacity: 0.7 }}>👥 Community</span>
        )}
        {activeUsers && (
          <span>🔥 {formatNumber(activeUsers)} online</span>
        )}
      </div>
    </a>
  );
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num?.toLocaleString() || 'N/A';
}

