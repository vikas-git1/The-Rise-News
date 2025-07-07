import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const TopNewsCard = ({ article }) => {
  if (!article || !article.urlToImage) return null;

  const { title, description, url, urlToImage, author, publishedAt } = article;
  const [bookmarked, setBookmarked] = useState(false);
  const formattedDate = new Date(publishedAt).toLocaleString();

  return (
    <div className="w-[95%]  max-w-7xl h-[300px] mx-auto my-4 flex flex-col md:flex-row bg-gradient-to-br from-orange-100 via-white to-orange-50 border border-orange-300 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Left Image */}
      <div className="w-full md:w-1/2 h-[320px]">
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-6 bg-white/80">
        <div>
          <h2 className="text-2xl font-extrabold mb-3 text-orange-900 leading-tight line-clamp-2">
            {title}
          </h2>
          <p className="text-base text-gray-800 mb-4 line-clamp-3">
            {description}
          </p>
          <p className="text-xs text-gray-600 italic mb-2">
            By {author || "Unknown"} • {formattedDate}
          </p>
        </div>

        {/* Buttons Footer */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-orange-200">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow transition-all duration-200"
          >
            Read Article
          </a>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`ml-3 p-2 rounded-full transition-colors duration-200 ${
              bookmarked
                ? "bg-orange-200 text-orange-700"
                : "bg-orange-50 text-orange-500"
            } hover:bg-orange-300 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-400`}
            title={bookmarked ? "Remove Bookmark" : "Add to Bookmarks"}
          >
            {bookmarked ? (
              <FaBookmark size={22} />
            ) : (
              <FaRegBookmark size={22} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNewsCard;
