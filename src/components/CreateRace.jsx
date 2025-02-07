import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateRace() {
    let navigate = useNavigate();

    const [race, setRace] = useState({
        date: "",
        name: "",
        city: "",
    });

    const [circuits, setCircuits] = useState([]);

    useEffect(() => {
        fetchCircuits();
    }, []);

    const fetchCircuits = async () => {
        try {
            const result = await axios.get("http://localhost:8000/circuits");
            setCircuits(result.data);
        } catch (error) {
            console.error("Error fetching circuits:", error);
        }
    };

    const onInputChange = (e) => {
        setRace({ ...race, [e.target.name]: e.target.value });
    };

    const onCircuitSelect = (e) => {
        const selectedCircuit = circuits.find(
            (circuit) => circuit.name === e.target.value
        );
        if (selectedCircuit) {
            setRace({
                ...race,
                name: selectedCircuit.name,
                city: selectedCircuit.city,
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const newRace = {
                id: {
                    date: race.date,
                    name: race.name,
                    city: race.city,
                },
            };
            await axios.post("http://localhost:8000/calendar/race", newRace);
            navigate("/races");
        } catch (error) {
            console.error("Error creating race:", error);
            alert("Error al crear la carrera. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center">Crear Nueva Carrera</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="circuit" className="form-label">
                                Seleccionar Circuito
                            </label>
                            <select
                                className="form-control"
                                name="circuit"
                                onChange={onCircuitSelect}
                                required
                            >
                                <option value="">-- Seleccionar Circuito --</option>
                                {circuits.map((circuit) => (
                                    <option key={circuit.name} value={circuit.name}>
                                        {circuit.name} ({circuit.city})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">
                                Fecha
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={race.date}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-light">
                            Crear
                        </button>
                        <Link to="/races" className="btn btn-outline-secondary ms-2">
                            Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateRace;
