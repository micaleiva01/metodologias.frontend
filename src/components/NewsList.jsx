import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NewsCard from "./NewsCard";

function NewsList() {
    const [news, setNews] = useState([]);
    const [user, setUser] = useState(null);

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
            console.log("News fetched:", results.data);
            setNews(results.data);
        } catch (error) {
            console.error("Error loading news:", error);
        }
    };

    if (news.length === 0) {
        return <div className="container my-4">No news available.</div>;
    }

    const stickyItem = news[0];
    const scrollableItems = news.slice(1, 5);

    return (
        <div className="container my-4">
            <div className="row mt-4 g-4">
                {/* Sticky Box on the Left */}
                <div className="col-12 col-md-6 top-0">
                    <NewsCard new={stickyItem} expanded={true} user={user} />
                </div>

                {/* Four Small News Cards in a 2x2 Grid on the Right */}
                <div className="col-12 col-md-6 d-flex flex-wrap" style={{ maxHeight: "100vh" }}>
                    {scrollableItems.map((neww, index) => (
                        <div key={neww.permalink} className="col-6 p-2 d-flex flex-column">
                            <div className="card flex-grow-1">
                                <img
                                    src={neww.image}
                                    className="card-img-top"
                                    alt={`${neww.title}`}
                                    style={{ height: "150px", objectFit: "cover" }}
                                />
                                <div className="card-body text-center d-flex flex-column justify-content-center">
                                    <h6 className="card-title" style={{ fontSize: "calc(10px + 0.5vw)" }}>{neww.title}</h6>
                                </div>
                                {user && user.rol === "ADMIN" && (
                                    <div className="m-2 text-center">
                                        <Link to={`/edit-news/${neww.permalink}`} className="btn btn-outline-primary mt-2">
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
        </div>
    );
}

export default NewsList;
