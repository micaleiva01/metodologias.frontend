import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const handleDelete = async (permalink) => {
    try {
        await axios.delete(`http://localhost:8000/new`, { params: { permalink } });
        alert("Noticia eliminada correctamente.");
        window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
        console.error("Error deleting news:", error);
        alert("Error al eliminar la noticia. Inténtalo de nuevo.");
    }
};

function NewsCard({ new: neww }) {
    return (
        <div className="card h-100">
            <img
                src={neww.image} // Updated to use the "image" field from the backend
                className="card-img-top"
                alt={`${neww.title}`} // Updated to use the "title" field
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
                <h5 className="card-title">{neww.title}</h5> {/* Updated to use the "title" field */}
                <p className="card-text text-muted">{neww.text}</p> {/* Updated to use the "text" field */}
            </div>
            <div className="m-2">
                <Link 
                    className="btn btn-outline-primary mt-2"
                    to={`/edit-news/${neww.permalink}`} // Use permalink as the identifier for editing
                >
                    Editar
                </Link>
                <button 
                    className="btn btn-danger mx-2 mt-2"
                    onClick={() => handleDelete(neww.permalink)} // Add delete functionality later
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default NewsCard;
