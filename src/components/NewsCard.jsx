import React from "react";
import { Link } from "react-router-dom";

function NewsCard({ new: neww }) {
    return (
        <div className="card h-100">
            <img
                src={neww.logo}
                className="card-img-top"
                alt={`${neww.name}`}
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
                <h5 className="card-title">{neww.name}</h5>
                <p className="card-text text-muted">{neww.description}</p>
            </div>
            <div className="m-2">
            <Link className="btn btn-outline-primary mt-2"
            to={`/edit-news/${neww.id}`}>Editar</Link>
            <button className="btn btn-danger mx-2 mt-2">Eliminar</button>
          </div>
        </div>
    );
}

export default NewsCard;