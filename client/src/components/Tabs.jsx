// src/components/Tabs.jsx
import React, { useState, useEffect } from 'react';

export default function Tabs({ tabs, onTabChange }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 0);

  useEffect(() => {
    setActiveTab(tabs[0]?.id || 0);
  }, [tabs]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}