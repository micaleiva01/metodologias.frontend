import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
    const [name, setName] = useState("");
    const [logoUrl, setLogoUrl] = useState("");
    const [twitter, setTwitter] = useState("");
    const navigate = useNavigate();

  const handleCreate = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:8000/teams", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    name: name, 
                    logo_url: logoUrl, 
                    twitter: twitter 
                }),
            });

            if (!response.ok) {
                throw new Error("Ha sucedido un error. El equipo no se ha podido crear.");
            }

            alert("Equipo creado con éxito!");
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    };



    return (
        <div className="d-flex justify-content-center align-items-center text-white">
            <h1>CREAR EQUIPO</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                <div>
                    <label>Nombre del equipo:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre del equipo"
                        required
                    />
                </div>
                <div>
                    <label>Logo URL:</label>
                    <input
                        type="url"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        placeholder="URL del logo"
                        required
                    />
                </div>
                <div>
                    <label>Twitter:</label>
                    <input
                        type="url"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="URL del perfil de Twitter"
                        required
                    />
                </div>
                <button type="submit">Crear</button>
            </form>
            
        </div>
    );
};

export default CreateTeam;
