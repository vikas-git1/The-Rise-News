import React, { useEffect, useState } from "react";
import { fetchNewsBySource } from "../api/fetchNews";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNewsBySource("bbc-news").then(setNews);
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
        Top Headlines - BBC News
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

export default Home;
