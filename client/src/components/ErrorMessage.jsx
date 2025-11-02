// src/components/ErrorMessage.jsx
export default function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className="error-message">
      <div className="error-title">Error</div>
      <p className="error-text">{message}</p>
    </div>
  );
}