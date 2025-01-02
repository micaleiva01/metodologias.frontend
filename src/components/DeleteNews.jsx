import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function DeleteNews() {
    let navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const deleteNewsItem = async () => {
            try {
                await axios.delete(`http://localhost:8000/news/${id}`);
                navigate("/news");
            } catch (error) {
                console.error("Error al eliminar noticia: ", error);
                alert("Error al eliminar noticia. Por favor vuelva a intentarlo luego.");
            }
        };

        if (window.confirm("Estas seguro que desea eliminar esta noticia?")) {
            deleteNewsItem();
        } else {
            navigate("/news");
        }
    }, [id, navigate]);

    return null;
}

export default DeleteNews;