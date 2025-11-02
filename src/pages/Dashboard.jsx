import { useState } from "react";

export default function Dashboard() {
  const [keyword, setKeyword] = useState("");
  const [timeframe, setTimeframe] = useState("week");
  const [sentiment, setSentiment] = useState("all");

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-md p-5 flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Filters</h2>

        <div>
          <label className="block text-sm font-medium">Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. AI, marketing"
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Sentiment</label>
          <select
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
          >
            <option value="all">All</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Timeframe</label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
          >
            <option value="day">Last 24 hours</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>
        </div>
      </aside>

      {/* Main panel */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Reddit Insights Dashboard
        </h1>

        {/* Trending tags */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Trending Tags</h2>
          <div className="flex flex-wrap gap-2">
            {["AI", "Startups", "React", "Space", "Finance"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* Placeholder for charts / posts */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-xl p-4 h-64 flex items-center justify-center">
            <span className="text-gray-400">📊 Sentiment Chart</span>
          </div>
          <div className="bg-white shadow rounded-xl p-4 h-64 flex items-center justify-center">
            <span className="text-gray-400">🔥 Top Posts</span>
          </div>
        </div>
      </main>
    </div>
  );
}
