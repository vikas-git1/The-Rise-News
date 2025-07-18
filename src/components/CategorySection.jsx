import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-orange-50 border-t border-orange-200 shadow-inner overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center items-center gap-4 w-max md:w-full">
        {categories.map((cat, index) => {
          const active = location.pathname.includes(cat.toLowerCase());
          return (
            <button
              key={index}
              className={`text-sm font-semibold px-5 py-2 rounded-full whitespace-nowrap transition-all duration-200 shadow-sm border cursor-pointer 
              ${
                active
                  ? "bg-orange-600 text-white border-orange-600 shadow-md"
                  : "bg-white text-orange-700 border-orange-300 hover:bg-orange-100 hover:text-orange-800"
              }`}
              onClick={() =>
                user
                  ? navigate(`/category/${cat.toLowerCase()}`)
                  : navigate("/login")
              }
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
