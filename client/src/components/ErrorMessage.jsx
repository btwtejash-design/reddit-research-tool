// src/components/ErrorMessage.jsx (subtle red card)
export default function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
      <div className="text-red-600 font-medium mb-1">Error</div>
      <p className="text-red-800 text-sm">{message}</p>
    </div>
  );
}