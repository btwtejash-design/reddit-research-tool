import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import AudienceSearch from "./pages/AudienceSearch";
import AdvancedSearch from "./pages/AdvancedSearch";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Substarter</h1>
          <nav className="flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium pb-1 border-b-2 transition-colors ${
                  isActive
                    ? "text-emerald-600 border-emerald-500"
                    : "text-slate-500 border-transparent hover:text-emerald-600 hover:border-emerald-500"
                }`
              }
              end
            >
              Audience Search
            </NavLink>
            <NavLink
              to="/advanced"
              className={({ isActive }) =>
                `text-sm font-medium pb-1 border-b-2 transition-colors ${
                  isActive
                    ? "text-emerald-600 border-emerald-500"
                    : "text-slate-500 border-transparent hover:text-emerald-600 hover:border-emerald-500"
                }`
              }
            >
              Advanced Search
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <Routes>
          <Route path="/" element={<AudienceSearch />} />
          <Route path="/advanced" element={<AdvancedSearch />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
