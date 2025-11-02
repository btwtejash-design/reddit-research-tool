import { useState } from "react";
import Navbar from "../components/Navbar";
import SubredditCard from "../components/SubredditCard";
import Loader from "../components/Loader";
import axios from "axios";

export default function Dashboard() {
  const [subreddit, setSubreddit] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSubredditData = async (e) => {
    e.preventDefault();
    if (!subreddit) return;
    setLoading(true);
    setError("");
    setPosts([]);

    try {
      const { data } = await axios.get(`https://reddit-research-tool.onrender.com/reddit/${subreddit}`);
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch subreddit data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Reddit Insights Dashboard</h1>

        <form
          onSubmit={fetchSubredditData}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-10"
        >
          <input
            type="text"
            placeholder="Enter subreddit (e.g. startups)"
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-teal-600 transition"
          >
            Analyze
          </button>
        </form>

        {loading && <Loader />}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && posts.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <SubredditCard key={i} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
