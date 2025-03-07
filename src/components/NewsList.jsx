import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewsCard from "./NewsCard";
import NewsDetailsModal from "./NewsDetailsModal";

function NewsList() {
    const [news, setNews] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedNews, setSelectedNews] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadNews();
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const loadNews = async () => {
        try {
            const results = await axios.get("http://localhost:8000/new");
            setNews(results.data);
        } catch (error) {
            console.error("Error loading news:", error);
        }
    };

    const handleNewsClick = (newsItem) => {
        setSelectedNews(newsItem);
        setShowModal(true);
    };

    if (news.length === 0) {
        return <div className="container my-4">No news available.</div>;
    }

    const stickyItem = news[0];
    const scrollableItems = news.slice(1, 5);

    return (
        <div className="container my-4">
            <div className="row mt-4 g-4">
                
                <div className="col-12 col-md-6 top-0" onClick={() => handleNewsClick(stickyItem)}>
                    <NewsCard news={stickyItem} expanded={true} user={user} />
                </div>

                <div className="col-12 col-md-6 d-flex flex-wrap" style={{ maxHeight: "100vh" }}>
                    {scrollableItems.map((newsItem) => (
                        <div key={newsItem.permalink} className="col-6 p-2 d-flex flex-column">
                            <div className="card flex-grow-1" 
                                 onClick={() => handleNewsClick(newsItem)} 
                                 style={{ cursor: "pointer" }} 
                                 onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                                 onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                                
                                <img
                                    src={newsItem.image}
                                    className="card-img-top"
                                    alt={`${newsItem.title}`}
                                    style={{ height: "150px", objectFit: "cover" }}
                                />
                                <div className="card-body text-center d-flex flex-column justify-content-center">
                                    <h6 className="card-title" style={{ fontSize: "calc(10px + 0.5vw)" }}>{newsItem.title}</h6>
                                </div>

                                {user && user.rol === "ADMIN" && (
                                    <div className="m-2 text-center">
                                        <Link to={`/edit-news/${newsItem.permalink}`} className="btn btn-outline-primary mt-2">
                                            Editar
                                        </Link>
                                        <button className="btn btn-danger mx-2 mt-2">Eliminar</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal to show selected news */}
            {showModal && selectedNews && (
                <NewsDetailsModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    news={selectedNews}
                />
            )}
        </div>
    );
}

export default NewsList;
