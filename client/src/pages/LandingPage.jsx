import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <section className="flex flex-col items-center text-center py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Find the perfect subreddit — fast.
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Discover high-engagement communities for your startup, content, or research using real Reddit data.
        </p>
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-primary text-white rounded-xl text-lg hover:bg-teal-600 transition"
        >
          Get Started
        </Link>
      </section>

      <section className="py-16 px-8 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🎯 Precise Targeting</h3>
          <p className="text-gray-600">Filter and analyze subreddits based on engagement and topic relevance.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📊 Real Data</h3>
          <p className="text-gray-600">See upvotes, comment activity, and trends straight from Reddit’s API.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🚀 Fast Insights</h3>
          <p className="text-gray-600">Instantly visualize where your audience is most active and engaged.</p>
        </div>
      </section>
    </div>
  );
}
