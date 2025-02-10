import React, { useState, useEffect } from "react";
import NewsList from "../components/NewsList";
import { Link } from "react-router-dom";

function News() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <div>
            <main>
                <NewsList />
                
                {/*solo admins*/}
                {user?.rol === "ADMIN" && (
                    <Link to="/create-news" className="btn btn-outline-danger mb-4">
                        Crear una noticia nueva
                    </Link>
                )}
            </main>
        </div>
    );
}

export default News;
