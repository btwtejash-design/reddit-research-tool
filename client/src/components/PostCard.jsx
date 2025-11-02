// src/components/PostCard.jsx
import React from "react";

export default function PostCard({ post }) {
  return (
    <a
      href={`https://reddit.com${post.permalink}`}
      target="_blank"
      rel="noopener noreferrer"
      className="card fade-in"
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div className="card-body">
        <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          {post.title}
        </h5>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          r/{post.subreddit}
        </p>
        {post.selftext && (
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            {post.selftext.substring(0, 150)}...
          </p>
        )}
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <span>⬆️ {post.ups || post.score || 0}</span>
          <span className="text-emerald" style={{ fontWeight: '600' }}>
            💬 {post.num_comments || 0}
          </span>
        </div>
      </div>
    </a>
  );
}