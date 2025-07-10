// const API_KEY = "d3c3cf10968c485c95a4b7c13bc33cee";
const API_KEY = "eb28b8cd0e8745b9ae6134934c42e877";

export const fetchNewsBySource = async (source, page) => {
  try {
    const response = await fetch(
      // `https://newsapi.org/v2/top-headlines?sources=${source}&pageSize=100&apiKey=${API_KEY}`
      `https://newsapi.org/v2/top-headlines?sources=${source}&pageSize=8&page=${page}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    // console.log("***** fetch news by source Data****", data.articles);
    return data.articles;
  } catch (error) {
    console.log("Error in fetching news by source -", error.message);
    return [];
  }
};

export const fetchNewsByQuery = async (query, page) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=8&apiKey=${API_KEY}`
    );
    const data = await response.json();

    return data.articles;
  } catch (error) {
    console.log("Error fetching news by query:", error.message);
    return [];
  }
};

export const fetchTopNews = async () => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=${API_KEY}`
    );
    const data = await response.json();
    // console.log("🌍 Top Global News:", data.articles);
    return data.articles;
  } catch (error) {
    console.log("Error fetching top news:", error.message);
    return [];
  }
};
