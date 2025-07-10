import React, { useEffect, useState } from "react";
import { fetchTopNews } from "../api/fetchNews";
import TopNewsCard from "./TopNewsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const TopNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchTopNews().then(setNews);
  }, []);

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={true}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        className="w-full"
        style={{ height: "320px" }}
      >
        {/* Additional Contion to check if news is an array */}
        {Array.isArray(news) &&
          news
            .filter((article) => article.urlToImage)
            .slice(0, 10)
            .map((article, i) => (
              <SwiperSlide key={i}>
                <TopNewsCard article={article} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default TopNews;
