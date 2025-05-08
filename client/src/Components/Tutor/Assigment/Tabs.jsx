import React from "react";
import { Link } from "react-router-dom";

function Tabs({ tabs }) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.href}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                tab.current
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }
              transition-colors duration-200
            `}
            aria-current={tab.current ? "page" : undefined}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Tabs;