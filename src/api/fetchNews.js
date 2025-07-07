const API_KEY = "d3c3cf10968c485c95a4b7c13bc33cee";

export const fetchNewsBySource = async (source) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=${source}&pageSize=100&apiKey=${API_KEY}`
    );
    const data = await response.json();
    console.log("***** fetch news by source Data****", data.articles);
    return data.articles;
  } catch (error) {
    console.log("Error in fetching news by source -", error.message);
  }
};
