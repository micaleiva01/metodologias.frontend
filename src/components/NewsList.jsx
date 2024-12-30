import React from "react";
import NewsCard from "./NewsCard";

const news = [
  { id: 1, name: "Team A", logo: "path/to/logo1.jpg", description: "Description A" },
  { id: 2, name: "Team B", logo: "path/to/logo2.jpg", description: "Description B" },
  { id: 3, name: "Team C", logo: "path/to/logo3.jpg", description: "Description C" },
  { id: 4, name: "Team D", logo: "path/to/logo4.jpg", description: "Description D" },
  { id: 5, name: "Team E", logo: "path/to/logo5.jpg", description: "Description E" },
  { id: 6, name: "Team F", logo: "path/to/logo6.jpg", description: "Description F" },
  { id: 7, name: "Team G", logo: "path/to/logo7.jpg", description: "Description G" },
  { id: 8, name: "Team H", logo: "path/to/logo8.jpg", description: "Description H" },
  { id: 9, name: "Team I", logo: "path/to/logo9.jpg", description: "Description I" },
];

function NewsList() {
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
                <div key={neww.id} className="col-12 col-sm-6">
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

