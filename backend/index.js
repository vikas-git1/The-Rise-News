const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Test root route
app.get("/", (req, res) => {
  res.send("✅ Backend is working!");
});

app.get("/api/top-news", async (req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?language=en&pageSize=12&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data.articles || []);
  } catch (err) {
    res.status(500).json({ error: "Top news fetch failed" });
  }
});

app.get("/api/news", async (req, res) => {
  const { source = "bbc-news", page = 1 } = req.query;
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=${source}&pageSize=8&page=${page}&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data.articles || []);
  } catch (err) {
    res.status(500).json({ error: "News by source fetch failed" });
  }
});

app.get("/api/search", async (req, res) => {
  const { query = "India", page = 1 } = req.query;
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&pageSize=8&page=${page}&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data.articles || []);
  } catch (err) {
    res.status(500).json({ error: "Search fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
