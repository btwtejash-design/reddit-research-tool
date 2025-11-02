import { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [subreddit, setSubreddit] = useState('technology');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/reddit/${subreddit}`);
      setPosts(response.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch subreddit data');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Explore Reddit Communities</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter subreddit (e.g. startups)"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <button
          onClick={fetchPosts}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? 'Loading...' : 'Fetch'}
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.url} className="border-b pb-2">
            <a href={post.url} target="_blank" rel="noreferrer" className="text-indigo-600 font-medium hover:underline">
              {post.title}
            </a>
            <p className="text-sm text-gray-600">
              u/{post.author} • {post.ups} upvotes • {post.comments} comments
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
