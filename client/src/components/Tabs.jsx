// src/components/Tabs.jsx (like "Quick tips" sections: green active)
import React, { useState } from 'react';
export default function Tabs({ tabs, onTabChange }) {
  
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 0);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex space-x-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`w-full px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-green-50 text-green-700 border-b-2 border-green-500'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}