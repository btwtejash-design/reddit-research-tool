// src/components/SearchBar.jsx (patched: screenshot search bar style - white bg, slate border, cyan focus ring, emerald submit button.
// Kept icon, form logic. Matches the rounded search input in hero section. Responsive flex.)

import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch, value = "", placeholder = "e.g., People who use Notion", onChange }) {
  const [localValue, setLocalValue] = useState(value);
  

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localValue.trim()) onSearch(localValue);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center border border-slate-200 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-cyan-500 bg-white">
        <svg className="h-5 w-5 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={localValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="flex-1 outline-none text-slate-700 bg-transparent"
        />
      </div>
      <button 
        type="submit" 
        className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 transition-colors font-medium"
      >
        Search
      </button>
    </form>
  );
}