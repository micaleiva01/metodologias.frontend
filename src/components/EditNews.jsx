import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditNews() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [news, setNews] = useState({
        permalink: "",
        title: "",
        image: null,
        text: "",
        creator_id: "",
        date: "",
    });

    const { permalink, title, text, creator_id, date } = news;

    const generatePermalink = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
            .trim()
            .replace(/\s+/g, "-"); // Replace spaces with dashes
    };

    const onInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setNews({ ...news, [name]: files[0] });
        } else {
            const updatedNews = { ...news, [name]: value };
            if (name === "title") {
                updatedNews.permalink = generatePermalink(value);
            }
            setNews(updatedNews);
        }
    };

    const loadNews = useCallback(async () => {
        try {
            const result = await axios.get(`http://localhost:8000/news/${id}`);
            setNews(result.data);
        } catch (error) {
            console.error("Error loading news:", error);
            alert("Failed to load news. Please try again later.");
        }
    }, [id]);

    useEffect(() => {
        loadNews();
    }, [loadNews]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("permalink", news.permalink);
        formData.append("title", news.title);
        formData.append("image", news.image); // Must be the File object
        formData.append("text", news.text);
        formData.append("creator_id", news.creator_id);
        formData.append("date", news.date);

        try {
            await axios.put(`http://localhost:8000/news/${id}`, formData);
            navigate("/news");
        } catch (error) {
            console.error("Error updating news:", error);
            alert("Failed to update news. Please try again.");
        }
    };

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
                                placeholder="Insertar título de la noticia"
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
                                Imagen:
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                name="image"
                                accept="image/*"
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">
                                Texto:
                            </label>
                            <textarea
                                className="form-control"
                                placeholder="Insertar texto de la noticia"
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
                                placeholder="Insertar ID del creador"
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
