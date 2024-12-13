import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateVoting = () => {
    const [permalink, setPermalink] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch("/api/votings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    permalink, 
                    title, 
                    description, 
                    end_date: endDate 
                }),
            });

            if (!response.ok) {
                throw new Error("Ha sucedido un error. La votación no se ha podido crear.");
            }

            alert("Votación creada con éxito!");
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center text-white">
            <h1>CREAR VOTACIÓN</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                <div>
                    <label>Permalink:</label>
                    <input
                        type="text"
                        value={permalink}
                        onChange={(e) => setPermalink(e.target.value)}
                        placeholder="Permalink único"
                        required
                    />
                </div>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título de la votación"
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descripción de la votación"
                        maxLength="500"
                        required
                    />
                </div>
                <div>
                    <label>Fecha de cierre:</label>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CreateVoting;
