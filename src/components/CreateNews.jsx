import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateNews() {
    let navigate = useNavigate();

    const [news, setNews] = useState({
        permalink: "",
        title: "",
        image: "",
        text: "",
        creator_id: "", // Initially empty
        date: "",
    });

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        console.log("Fetched userId from localStorage:", storedUserId); // Debugging
        if (storedUserId) {
            setNews((prevNews) => ({ ...prevNews, creator_id: storedUserId }));
        }
    }, []);

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

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateNews()) return;

        const newsData = {
            permalink: news.permalink,
            title: news.title,
            image: news.image,
            text: news.text,
            creator_id: parseInt(news.creator_id, 10),
            date: news.date,
        };

        console.log("Enviando:", JSON.stringify(newsData, null, 2));

        try {
            const response = await axios.post("http://localhost:8000/new", newsData);
            console.log("Noticia creada con éxito:", response.data);
            navigate("/news");
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert(error.response?.data || "Error al crear noticia");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="title text-center m-4">CREAR NOTICIA</h2>
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
                                Imagen URL:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Insertar URL de la imagen"
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
                                name="creator_id"
                                value={creator_id}
                                readOnly
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
                            Añadir Noticia
                        </button>
                        <Link className="btn btn-outline-secondary ms-2" to="/">
                            Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateNews;
