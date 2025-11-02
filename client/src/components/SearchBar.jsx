// src/components/SearchBar.jsx
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
    <form onSubmit={handleSubmit} style={{ position: 'relative', display: 'flex', gap: '0.5rem' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        flex: 1, 
        border: '2px solid var(--border-color)', 
        borderRadius: 'var(--radius-lg)',
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--bg-secondary)'
      }}>
        <svg 
          style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.75rem', color: 'var(--text-muted)' }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={localValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="form-control"
          style={{ border: 'none', padding: 0, flex: 1 }}
        />
      </div>
      <button 
        type="submit" 
        className="btn btn-primary"
        style={{ whiteSpace: 'nowrap' }}
      >
        Search
      </button>
    </form>
  );
}