import React, { useEffect, useState } from "react";
import { fetchNewsBySource } from "../api/fetchNews";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
const sourceMap = {
  "fox-news": "Fox News",
  "the-hindu": "The Hindu",
  "bbc-news": "BBC News",
  "the-verge": "The Verge",
  "the-times-of-india": "Times Of India",
};
const NewsSource = () => {
  const [news, setNews] = useState([]);
  const { source } = useParams();
  useEffect(() => {
    fetchNewsBySource(source).then(setNews);
  }, [source]);
  // console.log("Source From News item clicked", source);

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
        Top Headlines - {sourceMap[source] || source}
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {news
          .filter((article) => article.urlToImage) // ✅ keep only articles with images
          .map((article, i) => (
            <NewsCard key={i} article={article} />
          ))}
      </div>
    </div>
  );
};

export default NewsSource;
