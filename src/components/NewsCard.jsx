import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function NewsCard({ article }) {
  const { author, title, description, url, urlToImage, publishedAt } = article;
  const formattedDate = new Date(publishedAt).toLocaleString();
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="bg-gradient-to-tr from-orange-200 to-orange-100 shadow-xl rounded-2xl border border-orange-300 transform transition-all duration-300 hover:scale-103 hover:shadow-2xl w-full max-w-sm mx-auto flex flex-col relative">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden rounded-t-2xl">
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Glassy Info Panel */}
      <div className="p-5 bg-white/60 backdrop-blur-md flex flex-col flex-1 rounded-b-2xl">
        <h2 className="font-extrabold text-orange-800 text-lg mb-1 leading-tight line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-800 text-sm mb-2 line-clamp-3">{description}</p>
        <div className="text-xs text-gray-600 italic mb-4">
          By {author || "Unknown"} • {formattedDate}
        </div>

        {/* Footer with Buttons */}
        <div className="mt-auto pt-3 flex justify-between items-center border-t border-orange-300">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow transition-all"
          >
            Read More
          </a>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-2 rounded-full shadow-md transition-colors duration-200 ${
              bookmarked
                ? "bg-orange-300 text-orange-800"
                : "bg-orange-100 text-orange-600"
            } hover:bg-orange-400 hover:text-white`}
            title={bookmarked ? "Remove Bookmark" : "Add to Bookmarks"}
          >
            {bookmarked ? (
              <FaBookmark size={18} />
            ) : (
              <FaRegBookmark size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
