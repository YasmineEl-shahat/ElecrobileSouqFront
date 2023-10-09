import React, { useState } from "react";
import { useRouter } from "next/router";

const Tab = ({ tabs, propActiveTab, id }) => {
  const router = useRouter();

  let location = router.asPath;

  const [activeTab, setActiveTab] = useState(propActiveTab ?? 0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={activeTab == index ? "active" : ""}
            onClick={() => {
              handleTabClick(index);
              if (id) router.push({ query: { id, activeTab: index } });
              else router.push({ query: { activeTab: index } });
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tab;
