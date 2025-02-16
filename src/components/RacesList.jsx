import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RacesList() {
    const [races, setRaces] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        loadRaces();
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
        return () => setRaces([]);
    }, []);

    const loadRaces = async () => {
        try {
            const result = await axios.get("http://localhost:8000/calendar");
            const formattedRaces = result.data.map((race) => ({
                ...race,
                date: new Date(race.id.date).toISOString().split("T")[0],
            }));
            setRaces(formattedRaces);
        } catch (error) {
            console.error("Error fetching races:", error);
        }
    };

    const handleDeleteRace = async (date, city, name) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta carrera?")) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/calendar/race/${date}/${city}/${name}`, {
                withCredentials: true,
            });

            alert("Carrera eliminada correctamente.");
            loadRaces(); 
        } catch (error) {
            console.error("Error deleting race:", error);
            alert("Error eliminando la carrera. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container my-5">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {races.map((race, index) => (
                    <div key={index} className="col">
                        <div className="card shadow-sm h-100 bg-transparent text-white border-white text-center">
                            <div className="card-body">
                                <h5 className="card-title fw-bold">
                                    {race.id.name}
                                </h5>
                                <h6 className="card-subtitle mb-2 text-white">
                                    {race.id.city}
                                </h6>
                                <p className="card-text">
                                    <strong>Fecha:</strong> {race.date}
                                </p>
                            </div>
                            {/* solo admins */}
                            {user && user.rol === "ADMIN" && (
                                <div className="card-footer d-flex justify-content-center">
                                    <Link to={`/edit-race/${race.id.date}/${race.id.city}/${race.id.name}`} className="btn btn-outline-primary btn-sm m-1">
                                        Editar
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger btn-sm m-1"
                                        onClick={() => handleDeleteRace(race.id.date, race.id.city, race.id.name)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* solo admins */}
            {user && user.rol === "ADMIN" && (
                <Link to="/create-race" className="btn btn-outline-danger m-3">
                    Crear Nueva Carrera
                </Link>
            )}
        </div>
    );
}

export default RacesList;
