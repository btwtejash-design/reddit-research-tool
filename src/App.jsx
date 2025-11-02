import { useState } from "react";

export default function App() {
  const [subreddit, setSubreddit] = useState("technology");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/reddit/${subreddit}`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-indigo-600">Reddit Research Tool</h1>

      <div className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Enter subreddit name"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
          className="border rounded-lg px-4 py-2 w-64 outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={fetchPosts}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Fetch Posts
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading posts...</p>}

      <div className="grid gap-4 w-full max-w-3xl">
        {posts.map((post, i) => (
          <div key={i} className="bg-white shadow-md rounded-lg p-4 border">
            <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
            <p className="text-sm text-gray-500">by {post.author}</p>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 text-sm"
            >
              View on Reddit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
