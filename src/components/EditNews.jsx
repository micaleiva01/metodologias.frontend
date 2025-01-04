import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditNews() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [news, setNews] = useState({
        permalink: "",
        title: "",
        image: "",
        text: "",
        creator_id: "",
        date: "",
    });

    const { permalink, title, image, text, creator_id, date } = news;

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
                console.log("Fetching news for ID:", id); // Debug
                const result = await axios.get(`http://localhost:8000/new/${id}`);
                console.log("News fetched:", result.data); // Debug
                setNews(result.data);
            } catch (error) {
                console.error("Error loading news:", error.response || error.message);
                if (error.response?.status === 404) {
                    console.warn("News not found.");
                    setNews(null); // Handle missing news gracefully
                }
            }
        };

        loadNews();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateNews()) return;

        try {
            await axios.put(`http://localhost:8000/new/${id}`, {
                permalink: news.permalink,
                title: news.title,
                image: news.image,
                text: news.text,
                creator_id: news.creator_id,
                date: news.date,
            });
            navigate("/news");
        } catch (error) {
            console.error("Error updating news:", error);
            const errorMessage = error.response?.data || "Failed to update news. Please try again.";
            alert(errorMessage);
        }
    };

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
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Título:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="permalink" className="form-label">
                                Enlace Permanente (Autogenerado):
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="permalink"
                                value={permalink}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Imagen URL:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="image"
                                value={image}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">
                                Texto:
                            </label>
                            <textarea
                                className="form-control"
                                name="text"
                                value={text}
                                onChange={(e) => onInputChange(e)}
                                rows="4"
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="creator_id" className="form-label">
                                ID del Creador:
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                name="creator_id"
                                value={creator_id}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">
                                Fecha:
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={date}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-danger">
                            Guardar Cambios
                        </button>
                        <Link className="btn btn-outline-secondary ms-2" to="/news">
                            Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditNews;
