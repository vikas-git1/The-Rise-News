const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchTopNews = async () => {
  const res = await fetch(`${BASE_URL}/top-news`);
  const data = await res.json();
  return data;
};

export const fetchNewsBySource = async (source, page = 1) => {
  const res = await fetch(`${BASE_URL}/news?source=${source}&page=${page}`);
  const data = await res.json();
  return data;
};

export const fetchNewsByQuery = async (query, page = 1) => {
  const res = await fetch(`${BASE_URL}/search?query=${query}&page=${page}`);
  const data = await res.json();
  return data;
};

// const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
// export const fetchNewsBySource = async (source, page = 1) => {
//   try {
//     const response = await fetch(
//       // `https://newsapi.org/v2/top-headlines?sources=${source}&pageSize=100&apiKey=${API_KEY}`
//       `https://newsapi.org/v2/top-headlines?sources=${source}&pageSize=8&page=${page}&apiKey=${API_KEY}`
//     );
//     const data = await response.json();
//     // console.log("***** fetch news by source Data****", data.articles);
//     return data.articles;
//   } catch (error) {
//     console.log("Error in fetching news by source -", error.message);
//     return [];
//   }
// };

// export const fetchNewsByQuery = async (query, page = 1) => {
//   try {
//     const response = await fetch(
//       `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=8&apiKey=${API_KEY}`
//     );
//     const data = await response.json();

//     return data.articles;
//   } catch (error) {
//     console.log("Error fetching news by query:", error.message);
//     return [];
//   }
// };

// export const fetchTopNews = async () => {
//   try {
//     const response = await fetch(
//       `https://newsapi.org/v2/top-headlines?language=en&pageSize=12&apiKey=${API_KEY}`
//     );
//     const data = await response.json();
//     // console.log("🌍 Top Global News:", data.articles);
//     return data.articles;
//   } catch (error) {
//     console.log("Error fetching top news:", error.message);
//     return [];
//   }
// };
