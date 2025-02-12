import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function JoinTeam() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const fetchTeams = async () => {
            try {
                const response = await axios.get("http://localhost:8000/teams");
                setTeams(response.data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchTeams();
    }, []);

    const handleJoinRequest = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!selectedTeam || !storedUser) {
            alert("Selecciona un equipo válido.");
            return;
        }

        // Get existing requests or create a new array
        const existingRequests = JSON.parse(localStorage.getItem("joinRequests")) || [];
        
        // Add new request
        existingRequests.push({
            teamName: selectedTeam,
            userEmail: storedUser.email,
            userName: storedUser.name
        });

        // Save updated requests to localStorage
        localStorage.setItem("joinRequests", JSON.stringify(existingRequests));

        alert("Solicitud enviada. Espera la aprobación del administrador del equipo.");
        navigate("/teams");
    };

    return (
        <div className="container my-4 text-white text-center">
            <h2>Solicitar Unirse a un Equipo</h2>
            <p>Selecciona un equipo y espera la aprobación del administrador.</p>

            <select
                className="form-select w-50 mx-auto my-3"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
            >
                <option value="">Selecciona un equipo</option>
                {teams.map((team) => (
                    <option key={team.name} value={team.name}>{team.name}</option>
                ))}
            </select>

            <button className="btn btn-primary" onClick={handleJoinRequest}>
                Enviar Solicitud
            </button>
        </div>
    );
}

export default JoinTeam;
