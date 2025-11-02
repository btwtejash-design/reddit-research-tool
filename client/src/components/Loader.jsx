// src/components/Loader.jsx
export default function Loader() {
  return (
    <div className="loader">
      <div className="loader-spinner"></div>
      <span className="loader-text">Loading Reddit posts...</span>
    </div>
  );
}