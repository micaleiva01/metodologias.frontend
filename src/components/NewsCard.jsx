import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const handleDelete = async (permalink) => {
    try {
        await axios.delete(`http://localhost:8000/new`, { params: { permalink } });
        alert("Noticia eliminada correctamente.");
        window.location.reload();
    } catch (error) {
        console.error("Error deleting news:", error);
        alert("Error al eliminar la noticia. Inténtalo de nuevo.");
    }
};

function NewsCard({ news, onClick }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.rol === "ADMIN") {
            setIsAdmin(true);
        }
    }, []);

    return (
        <div className="card h-100" 
             style={{ cursor: "pointer", transition: "transform 0.2s" }}
             onClick={onClick}
             onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
             onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            
            <img
                src={news.image}
                className="card-img-top"
                alt={`${news.title}`}
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
                <h5 className="card-title">{news.title}</h5>
                <p className="card-text text-muted">{news.text}</p>
            </div>

            {isAdmin && (
                <div className="m-2">
                    <Link 
                        className="btn btn-outline-primary mt-2"
                        to={`/edit-news/${news.permalink}`}
                    >
                        Editar
                    </Link>
                    <button 
                        className="btn btn-danger mx-2 mt-2"
                        onClick={() => handleDelete(news.permalink)}
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}

export default NewsCard;
