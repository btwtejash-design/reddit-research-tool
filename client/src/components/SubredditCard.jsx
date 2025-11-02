// src/components/SubredditCard.jsx
export default function SubredditCard({ post }) {
  const { title, subreddit, score, num_comments, selftext, url, permalink } = post;

  return (
    <div className="card fade-in">
      <div className="card-body">
        <a 
          href={url || `https://www.reddit.com${permalink}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="post-link"
        >
          <h5 style={{ marginBottom: '0.5rem' }}>{title}</h5>
        </a>
        {selftext && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            {selftext.substring(0, 150)}...
          </p>
        )}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <a
            href={`https://www.reddit.com/r/${subreddit}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald"
          >
            r/{subreddit}
          </a>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            ⬆️ {score?.toLocaleString() || 0}
          </span>
          <span className="text-emerald" style={{ fontWeight: '600' }}>
            💬 {num_comments?.toLocaleString() || 0}
          </span>
        </div>
      </div>
    </div>
  );
}