import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RacesList() {
    const [races, setRaces] = useState([]);

    useEffect(() => {
        loadRaces();
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
                                    <strong>Date:</strong> {race.date}
                                </p>
                            </div>
                            <div className="card-footer d-flex justify-content-center">
                                <button className="btn btn-outline-primary btn-sm m-1">
                                    Edit
                                </button>
                                <button className="btn btn-outline-danger btn-sm m-1">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/create-race" className="btn btn-outline-danger m-3">
                Crear Nueva Carrera
            </Link>
        </div>
    );
}

export default RacesList;
