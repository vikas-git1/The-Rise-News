import React, { useEffect, useState } from "react";
import { fetchNewsBySource } from "../api/fetchNews";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Initial load for page 1 only
  useEffect(() => {
    const fetchInitialNews = async () => {
      setIsLoading(true);
      try {
        const initialArticles = await fetchNewsBySource("bbc-news", 1);
        if (Array.isArray(initialArticles)) {
          setNews(initialArticles);
        }
      } catch (error) {
        console.error("Error fetching initial news:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialNews();
  }, []);

  // ✅ Load more when page > 1
  useEffect(() => {
    const loadMore = async () => {
      if (page === 1 || isLoading) return;
      setIsLoading(true);
      try {
        const newArticles = await fetchNewsBySource("bbc-news", page);
        if (Array.isArray(newArticles) && newArticles.length > 0) {
          setNews((prev) => [...prev, ...newArticles]);
        }
      } catch (error) {
        console.error("Error fetching more news:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadMore();
  }, [page]);

  // ✅ Infinite scroll logic
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
    <div className="min-h-screen bg-orange-50 py-10 px-6">
      {/* ✅ Centered heading */}
      <h1 className="text-3xl font-bold text-orange-600 mb-10 text-center">
        Top Headlines - BBC News
      </h1>

      {/* ✅ Grid with spacing */}
      <div className="grid gap-y-8 gap-x-6 sm:grid-cols-2 md:grid-cols-3 ">
        {Array.isArray(news) &&
          news
            .filter((article) => article.urlToImage)
            .map((article, i) => <NewsCard key={i} article={article} />)}
      </div>

      {/* ✅ Loading message */}
      {isLoading && (
        <p className="text-center text-gray-500 mt-6">Loading more news...</p>
      )}

      {/* ✅ Fallback when no news */}
      {!isLoading && news.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No news available right now.
        </p>
      )}
    </div>
  );
};

export default Home;
