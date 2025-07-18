const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchTopNews = async () => {
  const res = await fetch(`${BASE_URL}/api/top-news`);
  const data = await res.json();
  return data;
};

export const fetchNewsBySource = async (source, page = 1) => {
  const res = await fetch(`${BASE_URL}/api/news?source=${source}&page=${page}`);
  const data = await res.json();
  return data;
};

export const fetchNewsByQuery = async (query, page = 1) => {
  const res = await fetch(`${BASE_URL}/api/search?query=${query}&page=${page}`);
  const data = await res.json();
  return data;
};
