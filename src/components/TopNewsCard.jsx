import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const TopNewsCard = ({ article }) => {
  if (!article || !article.urlToImage) return null;

  const { title, description, url, urlToImage, author, publishedAt } = article;
  const [bookmarked, setBookmarked] = useState(false);
  const formattedDate = new Date(publishedAt).toLocaleString();

  return (
    <div className="w-[95%] max-w-7xl mx-auto my-6 flex flex-col md:flex-row rounded-2xl bg-gradient-to-br from-orange-100 via-white to-orange-50 border border-orange-200 shadow-[10px_10px_20px_rgba(255,156,50,0.3)] hover:shadow-[0px_0px_30px_5px_rgba(255,102,0,0.4)] transition-all duration-300 transform hover:-translate-y-1">
      {/* Image */}
      <div className="w-full md:w-1/2 h-[200px] md:h-[300px] overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-5 rounded-2xl bg-white/90">
        <div>
          <h2 className="text-2xl font-bold text-orange-900 mb-2 leading-tight line-clamp-2 drop-shadow-sm">
            {title}
          </h2>
          <p className="text-sm text-gray-700 mb-3 line-clamp-3">
            {description}
          </p>
          <p className="text-xs text-gray-500 italic">
            By {author || "Unknown"} • {formattedDate}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-5 border-t pt-3 border-orange-200">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Read Article
          </a>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`ml-3 p-2 rounded-full transition-colors duration-300 ${
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
