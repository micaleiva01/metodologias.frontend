import React from "react";
import NewsList from "../components/NewsList";
import { Link } from "react-router-dom";

function News() {
    return (
        <div>
            <main>
                <NewsList />
                <Link to="/create-news" style={{ textDecoration: "underline", color: "white" }}>
                    Crear una noticia nueva
                </Link>
            </main>
        </div>
    );
}

export default News;