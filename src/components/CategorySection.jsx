import React from "react";

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
  return (
    <div className="bg-orange-100 shadow-sm border-t border-orange-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-4 justify-center items-center">
        {categories.map((cat, index) => (
          <button
            key={index}
            className="text-sm font-medium text-orange-700 px-4 py-1.5 bg-white rounded-full border border-orange-300 hover:bg-orange-200 hover:text-orange-900 transition"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
