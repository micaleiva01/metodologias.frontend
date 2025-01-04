import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RacesList() {
    const [races, setRaces] = useState([]);

    useEffect(() => {
        loadRaces();
    }, []);

    const loadRaces = async () => {
        try {
            const result = await axios.get("http://localhost:8000/calendar");
            setRaces(result.data);
        } catch (error) {
            console.error("Error fetching races:", error);
        }
    };

    const deleteRace = async (race) => {
        try {
            await axios.delete("http://localhost:8000/calendar/race", {
                data: { date: race.date, city: race.city, name: race.name },
            });
            setRaces(races.filter((r) => r !== race));
            alert("Carrera eliminada correctamente.");
        } catch (error) {
            console.error("Error deleting race:", error);
            alert("Error al eliminar la carrera. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container my-4">
            <h2 className="text-center">Calendario de Carreras</h2>
            <Link to="/create-race" className="btn btn-outline-primary mb-4">
                Crear Nueva Carrera
            </Link>
            <div className="row">
                {races.map((race) => (
                    <div key={`${race.date}-${race.city}-${race.name}`} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{race.name}</h5>
                                <p className="card-text">Ciudad: {race.city}</p>
                                <p className="card-text">Fecha: {race.date}</p>
                                <Link
                                    to={`/edit-race/${race.date}/${race.city}/${race.name}`}
                                    className="btn btn-outline-primary"
                                >
                                    Editar
                                </Link>
                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={() => deleteRace(race)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RacesList;