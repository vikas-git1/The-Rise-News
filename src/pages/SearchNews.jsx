import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsByQuery } from "../api/fetchNews";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";

const SearchNews = () => {
  const { query } = useParams();
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newArticles = await fetchNewsByQuery(query, page);
      setNews((prev) => [...prev, ...newArticles]);
    } catch (error) {
      console.error("Search fetch error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch more when page changes
  useEffect(() => {
    loadMore();
  }, [page]);

  // Reset on query change
  useEffect(() => {
    setNews([]);
    setPage(1);
  }, [query]);

  // Infinite scroll
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
        Top Headlines - {query}
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Checks is news an array and only then it procede to add filter on
        news */}
        {Array.isArray(news) &&
          news
            .filter((article) => article.urlToImage)
            .map((article, i) => <NewsCard key={i} article={article} />)}
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default SearchNews;
