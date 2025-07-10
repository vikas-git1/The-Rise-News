import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { fetchNewsByQuery } from "../api/fetchNews";
const categoryMap = {
  politics: "Politics",
  business: "Business",
  sports: "Sports",
  technology: "Technology",
  health: "Health",
  science: "Science",
  entertainment: "Entertainment",
};
const CategoryNews = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  //   console.log("Selected Category :", category);
  //   console.log(news);

  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newArticles = await fetchNewsByQuery(category, page);
      if (Array.isArray(newArticles) && newArticles.length > 0) {
        setNews((prevNews) => [...prevNews, ...newArticles]);
      }
    } catch (error) {
      console.log("Error in fetching news in Category:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadMore();
  }, [category, page]);

  useEffect(() => {
    setNews([]);
    setPage(1);
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight - 100 &&
        !isLoading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);
  console.log("Page number in CategoryNews.jsx: ", page);

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
        Top News - {categoryMap[category] || category}
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.isArray(news) &&
          news
            .filter((article) => article.urlToImage)
            .map((article, i) => <NewsCard key={i} article={article} />)}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <>
          <p className="text-center text-gray-500 mt-4">Loading more news...</p>
          <Loader />
        </>
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

export default CategoryNews;
