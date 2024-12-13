import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePilot = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [initials, setInitials] = useState("");
    const [number, setNumber] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [country, setCountry] = useState("");
    const [twitter, setTwitter] = useState("");
    const [teamName, setTeamName] = useState("");
    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch("/api/pilots", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    name, 
                    surname, 
                    initials, 
                    number, 
                    image_url: imageUrl, 
                    country, 
                    twitter, 
                    team_name: teamName 
                }),
            });

            if (!response.ok) {
                throw new Error("Ha sucedido un error. El piloto no se ha podido crear.");
            }

            alert("Piloto creado con éxito!");
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center text-white">
            <h1>CREAR PILOTO</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre del piloto"
                        required
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        placeholder="Apellido del piloto"
                        required
                    />
                </div>
                <div>
                    <label>Iniciales:</label>
                    <input
                        type="text"
                        value={initials}
                        onChange={(e) => setInitials(e.target.value)}
                        placeholder="Iniciales del piloto"
                        maxLength="3"
                        required
                    />
                </div>
                <div>
                    <label>Número:</label>
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Número del piloto"
                        required
                    />
                </div>
                <div>
                    <label>Imagen URL:</label>
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="URL de la imagen del piloto"
                        required
                    />
                </div>
                <div>
                    <label>País:</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="País del piloto"
                        required
                    />
                </div>
                <div>
                    <label>Twitter:</label>
                    <input
                        type="url"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="URL del Twitter del piloto"
                        required
                    />
                </div>
                <div>
                    <label>Equipo:</label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Nombre del equipo"
                        required
                    />
                </div>
                <button type="submit">Crear</button>
            </form>
        </div>
    );
};

export default CreatePilot;
