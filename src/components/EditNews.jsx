import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditNews() {
    let navigate = useNavigate();
    const { permalink } = useParams();
    console.log("Permalink recibido en la URL:", permalink); // 🔍 Verificación

    const [news, setNews] = useState({
        permalink: "",
        title: "",
        image: "",
        text: "",
        creator_id: "",
        date: "",
    });

    const [loading, setLoading] = useState(true);

    const generatePermalink = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        const updatedNews = { ...news, [name]: value };
        if (name === "title") {
            updatedNews.permalink = generatePermalink(value);
        }
        setNews(updatedNews);
    };

    const validateNews = () => {
        if (!news.title || !news.text || !news.image || !news.creator_id || !news.date) {
            alert("Todos los campos son obligatorios.");
            return false;
        }
        if (!news.image.startsWith("http")) {
            alert("La URL de la imagen debe ser válida.");
            return false;
        }
        return true;
    };

    useEffect(() => {
        const loadNews = async () => {
            try {
                console.log("🔎 Fetching all news to find the correct one...");
                const result = await axios.get("http://localhost:8000/new");
                console.log("✅ All news fetched:", result.data);
    
                const foundNews = result.data.find((item) => item.permalink === permalink);
    
                if (foundNews) {
                    console.log("News found:", foundNews);
                    setNews(foundNews);
                } else {
                    console.warn("News not found for permalink:", permalink);
                    setNews(null);
                }
            } catch (error) {
                console.error("❌ Error loading news:", error);
                setNews(null);
            } finally {
                setLoading(false);
            }
        };
    
        loadNews();
    }, [permalink]);
    
    
    

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateNews()) return;

        try {
            await axios.put("http://localhost:8000/new", news);
            navigate("/news");
        } catch (error) {
            console.error("Error actualizando la noticia:", error);
            alert("Error al actualizar la noticia. Inténtalo de nuevo.");
        }
    };

    if (loading) {
        return <h2 className="text-center m-4">Cargando...</h2>;
    }

    if (news === null) {
        return (
            <div className="container">
                <h2 className="text-center m-4">Noticia no encontrada</h2>
                <Link className="btn btn-outline-secondary ms-2" to="/news">
                    Volver
                </Link>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center m-4">EDITAR NOTICIA</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Título:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={news.title}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="permalink" className="form-label">Enlace Permanente (Autogenerado):</label>
                            <input type="text" className="form-control" name="permalink" value={news.permalink} readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Imagen URL:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="image"
                                value={news.image}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">Texto:</label>
                            <textarea
                                className="form-control"
                                name="text"
                                value={news.text}
                                onChange={onInputChange}
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="creator_id" className="form-label">ID del Creador:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="creator_id"
                                value={news.creator_id}
                                onChange={onInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Fecha:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={news.date}
                                onChange={onInputChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-danger">Guardar Cambios</button>
                        <Link className="btn btn-outline-secondary ms-2" to="/news">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditNews;
