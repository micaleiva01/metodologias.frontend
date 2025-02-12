import { useState, useEffect } from "react";
import axios from "axios";

function ManageJoinRequests() {



    const [requests, setRequests] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const teamName = storedUser?.teamName?.name;



    useEffect(() => {
        if (!teamName) return;

        const allRequests = JSON.parse(localStorage.getItem("joinRequests")) || [];

        const teamRequests = allRequests.filter(req => req.teamName === teamName);

        setRequests(teamRequests);
    }, [teamName]);



    const handleApprove = async (email) => {
        if (!email || !teamName) {
            alert("Error: El correo electrónico o el equipo no son válidos.");
            return;
        }

        try {
            const userResponse = await axios.get(`http://localhost:8000/users`);
            const userToUpdate = userResponse.data.find(user => user.email === email);

            if (!userToUpdate) {
                alert("Usuario no encontrado.");
                return;
            }

            const updatedUser = {
                ...userToUpdate,
                teamName: {
                    name: teamName,
                }
            };

            console.log("Updating user:", updatedUser);

            const response = await axios.put(`http://localhost:8000/users/${email}`, updatedUser, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("Server response:", response.data);

            const updatedRequests = requests.filter(req => req.userEmail !== email);
            localStorage.setItem("joinRequests", JSON.stringify(updatedRequests));
            setRequests(updatedRequests);

            alert("Solicitud aprobada. El usuario ahora es parte del equipo.");
        } catch (error) {
            console.error("Error updating user team:", error);
            alert("Hubo un error al aprobar la solicitud.");
        }
    };

    
    return (
        <div className="container my-4 text-white">
            <h2>Solicitudes de Ingreso</h2>
            {requests.length === 0 ? (
                <p>No hay solicitudes pendientes.</p>
            ) : (
                <ul className="list-group">
                    {requests.map((req) => (
                        <li key={req.userEmail} className="list-group-item d-flex justify-content-between">
                            <span>{req.userName} ({req.userEmail}) quiere unirse.</span>
                            <button className="btn btn-success" onClick={() => handleApprove(req.userEmail)}>
                                Aprobar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ManageJoinRequests;
