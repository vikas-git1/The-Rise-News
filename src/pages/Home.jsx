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
      if (newArticles.length > 0) {
        setNews((prev) => [...prev, ...newArticles]);
      }
    } catch (error) {
      console.log("Error in fetching news at Home: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setNews([]);
    setPage(1);
  }, []);

  useEffect(() => {
    loadMore();
  }, [page]);

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
  });
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
