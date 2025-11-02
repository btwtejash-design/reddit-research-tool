// src/components/PostCard.jsx (patched: screenshot card style - white bg, subtle shadow, slate text, cyan title hover, emerald values.
// Added selftext preview like desc in screenshot. Responsive, clickable link to Reddit. Matches "Live results" vibe for posts.)

import React from "react";

export default function PostCard({ post }) {
  return (
    <a
      href={`https://reddit.com${post.permalink}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
    >
      <h2 className="font-semibold text-lg text-slate-900 mb-2 hover:text-cyan-600 line-clamp-2">
        {post.title}
      </h2>
      <p className="text-sm text-slate-600 mb-1">r/{post.subreddit}</p>
      {post.selftext && (
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
          {post.selftext.substring(0, 150)}...
        </p>
      )}
      <div className="text-sm text-slate-600 flex gap-4">
        <span>⬆️ {post.ups}</span>
        <span className="text-emerald-600 font-semibold">💬 {post.num_comments}</span>
      </div>
    </a>
  );
}