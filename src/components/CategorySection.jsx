import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const categories = [
  "Politics",
  "Business",
  "Sports",
  "Technology",
  "Health",
  "Science",
  "Entertainment",
];

const CategorySection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-orange-100 shadow-sm border-t border-orange-200 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 w-max">
        {categories.map((cat, index) => {
          const active = location.pathname.includes(cat.toLowerCase());
          return (
            <button
              key={index}
              className={`text-sm font-medium px-4 py-1.5 rounded-full border transition ${
                active
                  ? "bg-orange-600 text-white border-orange-600"
                  : "bg-white text-orange-700 border-orange-300 hover:bg-orange-200"
              }`}
              onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default CategorySection;
