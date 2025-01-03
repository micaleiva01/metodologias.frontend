import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

function NewsList() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        loadNews();
    }, []); // Add empty dependency array to ensure it only runs once

    const loadNews = async () => {
      try {
          const results = await axios.get("http://localhost:8000/new");
          console.log("News fetched:", results.data); // Log the response
          setNews(results.data);
      } catch (error) {
          console.error("Error loading news:", error);
      }
  };

    if (news.length === 0) {
        return <div className="container my-4">No news available.</div>;
    }

    const stickyItem = news[0];
    const scrollableItems = news.slice(1);

    return (
        <div className="container my-4">
            <div className="row mt-4 g-4">
                {/* Sticky Box on the Left */}
                <div className="col-12 col-md-6 position-sticky top-0 vh-100">
                    <NewsCard new={stickyItem} />
                </div>

                {/* Scrollable Box on the Right */}
                <div className="col-12 col-md-6 overflow-auto" style={{ maxHeight: "100vh" }}>
                    <div className="row g-3">
                        {scrollableItems.map((neww) => (
                            <div key={neww.permalink} className="col-12 col-sm-6">
                                <NewsCard new={neww} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsList;
