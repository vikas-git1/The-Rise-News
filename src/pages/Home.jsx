import React, { useEffect, useState } from "react";
import { fetchNewsBySource } from "../api/fetchNews";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newArticles = await fetchNewsBySource("bbc-news", page);
      if (Array.isArray(newArticles) && newArticles.length > 0) {
        setNews((prev) => [...prev, ...newArticles]);
      }
    } catch (error) {
      console.error("Error in fetching news at Home:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more when page changes
  useEffect(() => {
    loadMore();
  }, [page]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 100 &&
        !isLoading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
        Top Headlines - BBC News
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.isArray(news) &&
          news
            // .filter((article) => article.urlToImage)
            .map((article, i) => <NewsCard key={i} article={article} />)}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <p className="text-center text-gray-500 mt-4">Loading more news...</p>
      )}

      {/* Empty fallback */}
      {!isLoading && news.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No news available right now.
        </p>
      )}
    </div>
  );
};

export default Home;
