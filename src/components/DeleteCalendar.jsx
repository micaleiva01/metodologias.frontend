import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function DeleteCalendar() {
    
    let navigate = useNavigate();
    const { race } = useParams();

    useEffect(() => {
        const deleteRace = async () => {
            try {
                await axios.delete(`http://localhost:8000/calendar/${race}`);
                navigate("/calendar");
            } catch (error) {
                console.error("Ha sucedido un error elimindando la carrera: ", error);
                alert("Error al eliminar la carrera. Por favor inténtelo luego.");
            }
        };

        if (window.confirm("Estas seguro que desea eliminar esta carrera?")) {
            deleteRace();
        } else {
            navigate("/calendar");
        }
    }, [race, navigate]);

    return null;
}

export default DeleteCalendar;
