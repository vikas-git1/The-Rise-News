import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function NewsCard({ article }) {
  const { author, title, description, url, urlToImage, publishedAt } = article;
  const formattedDate = new Date(publishedAt).toLocaleString();
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="bg-orange-100 shadow-sm rounded-lg border border-orange-300 transition hover:shadow-md w-full max-w-sm mx-auto flex flex-col">
      <div className="h-40 w-full overflow-hidden rounded-t-lg">
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-2 flex flex-col flex-1 text-sm">
        <h2 className="font-semibold text-orange-700 text-base leading-snug">
          {title}
        </h2>
        <p className="text-gray-700 line-clamp-2">{description}</p>
        <div className="text-xs text-gray-600">
          By {author || "Unknown"} • {formattedDate}
        </div>

        {/* Spacer pushes buttons to bottom */}
        <div className="mt-auto pt-2 flex justify-between items-center">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs font-medium"
          >
            Read
          </a>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="text-orange-600 hover:text-orange-800 text-lg"
          >
            {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
    </div>
  );
}
/*
import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function NewsCard({ article }) {
  const { author, title, description, url, urlToImage, publishedAt } = article;
  const formattedDate = new Date(publishedAt).toLocaleString();
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="bg-orange-100 shadow rounded-xl border border-orange-200 transition hover:shadow-lg w-full max-w-sm mx-auto flex flex-col">
      <div className="h-44 w-full overflow-hidden rounded-t-xl">
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 bg-white/80">
        <h2 className="font-bold text-orange-800 text-lg mb-2 leading-tight line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-700 text-base mb-3 line-clamp-3">{description}</p>
        <div className="text-xs text-gray-500 mb-4">
          By {author || "Unknown"} • {formattedDate}
        </div>
        <div className="mt-auto pt-2 flex justify-between items-center border-t border-orange-100">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow transition"
          >
            Read
          </a>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`ml-2 p-2 rounded-full transition-colors duration-200 ${
              bookmarked
                ? "bg-orange-200 text-orange-700"
                : "bg-orange-50 text-orange-500"
            } hover:bg-orange-300 hover:text-orange-900 focus:outline-none`}
            title={bookmarked ? "Remove Bookmark" : "Add to Bookmarks"}
          >
            {bookmarked ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

*/
