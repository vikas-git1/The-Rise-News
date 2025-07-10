import React, { useEffect, useState } from "react";
import { fetchNewsBySource } from "../api/fetchNews";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
const sourceMap = {
  "fox-news": "Fox News",
  "the-hindu": "The Hindu",
  "bbc-news": "BBC News",
  "the-verge": "The Verge",
  "the-times-of-india": "Times Of India",
};
const NewsSource = () => {
  const { source } = useParams();
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // console.log("Source From News item clicked", source);

  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newArticles = await fetchNewsBySource(source, page);
      if (Array.isArray(newArticles) && newArticles.length > 0) {
        setNews((prev) => [...prev, ...newArticles]);
      }
    } catch (error) {
      console.log(
        "Error Occured in NewsSource in fetching News: ",
        error.message
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // fetchNewsBySource(source, page).then(setNews);
    loadMore();
  }, [source, page]);

  useEffect(() => {
    setNews([]);
    setPage(1);
  }, [source]);

  console.log("NewsSource page", page);

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
  return (
    <div className="min-h-screen bg-orange-50 py-8 px-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
        Top Headlines - {sourceMap[source] || source}
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.isArray(news) &&
          news
            .filter((article) => article.urlToImage) // ✅ keep only articles with images
            .map((article, i) => <NewsCard key={i} article={article} />)}
      </div>
      {/* Loading Indicator */}
      {isLoading && (
        <>
          <Loader />
          <p className="text-center text-gray-500 mt-4">Loading more news...</p>
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

export default NewsSource;
