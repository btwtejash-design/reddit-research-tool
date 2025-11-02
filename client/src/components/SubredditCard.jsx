// src/components/SubredditCard.jsx (patched: table row <tr>/<td> for semantic table fit.
// Colors: slate text, cyan link hover, emerald accents on values. Added selftext preview like screenshot desc.
// Hover slate-50. Responsive: hides cols on md/lg via classes. Matches "Subreddit insights" style.)

export default function SubredditCard({ post }) {
  const { title, subreddit, score, num_comments, selftext, created_utc, url, permalink } = post;
  const date = new Date(created_utc * 1000).toLocaleDateString(); // Optional, not in screenshot

  return (
    <tr className="hover:bg-slate-50 transition-colors divide-x divide-slate-100">
      <td className="px-6 py-4">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-900 hover:text-cyan-600 font-medium block line-clamp-2"
        >
          {title}
        </a>
        {selftext && (
          <span className="text-sm text-slate-600 block mt-1">
            {selftext.substring(0, 100)}...
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-slate-900 hidden md:table-cell">r/{subreddit}</td>
      <td className="px-6 py-4 text-right text-sm text-slate-900 hidden lg:table-cell">{score}</td>
      <td className="px-6 py-4 text-right">
        <span className="text-emerald-600 font-semibold">{num_comments}</span>
      </td>
    </tr>
  );
}