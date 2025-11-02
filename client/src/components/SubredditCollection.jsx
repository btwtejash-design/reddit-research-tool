// SubredditCollection - Shows a collection of subreddits for an audience
import React from 'react';

export default function SubredditCollection({ subreddits, audienceName }) {
  if (!subreddits || subreddits.length === 0) {
    return (
      <div className="card text-center" style={{ padding: '4rem 2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
        <h3 style={{ marginBottom: '0.5rem' }}>No communities found</h3>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          No subreddits found for this audience.
        </p>
      </div>
    );
  }

  const totalMembers = subreddits.reduce((sum, sub) => sum + (sub.members || 0), 0);

  return (
    <div>
      {/* Header */}
      <div className="card" style={{
        background: `linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)`,
        color: 'white',
        padding: '2rem',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          margin: '0 0 0.5rem 0', 
          fontSize: '2rem',
          fontWeight: 700
        }}>
          {audienceName} Communities
        </h2>
        <p style={{ 
          margin: 0, 
          fontSize: '1rem',
          opacity: 0.95
        }}>
          {subreddits.length} active communit{subreddits.length !== 1 ? 'ies' : 'y'} • {totalMembers > 0 ? `${(totalMembers / 1000).toFixed(0)}k+` : 'Thousands of'} members
        </p>
      </div>

      {/* Subreddits Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
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
        padding: '1.5rem',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        border: '2px solid transparent',
        background: 'white'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
        e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
        e.currentTarget.style.borderColor = 'var(--primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'transparent';
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

