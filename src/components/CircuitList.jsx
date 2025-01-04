import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CircuitList() {
    const [circuits, setCircuits] = useState([]);

    useEffect(() => {
        loadCircuits();
    }, []);

    const loadCircuits = async () => {
        try {
            const result = await axios.get("http://localhost:8000/circuits");
            setCircuits(result.data);
        } catch (error) {
            console.error("Error fetching circuits:", error);
            alert("Error al cargar los circuitos. Inténtalo de nuevo.");
        }
    };

    const deleteCircuit = async (circuit) => {
        try {
            await axios.delete("http://localhost:8000/circuits", {
                params: { name: circuit.name, city: circuit.city },
            });
            setCircuits(circuits.filter((c) => c !== circuit));
            alert("Circuito eliminado correctamente.");
        } catch (error) {
            console.error("Error deleting circuit:", error);
            alert("Error al eliminar el circuito. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container my-4">
            <Link to="/create-circuit" className="btn btn-outline-danger mb-4">
                Crear Nuevo Circuito
            </Link>
            <div className="row">
                {circuits.map((circuit) => (
                    <div key={`${circuit.name}-${circuit.city}`} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{circuit.name}</h5>
                                <p className="card-text">Ciudad: {circuit.city}</p>
                                <p className="card-text">País: {circuit.country}</p>
                                <p className="card-text">Vueltas: {circuit.n_laps}</p>
                                <p className="card-text">Longitud: {circuit.length} km</p>
                                <Link
                                    to={`/edit-circuit/${circuit.name}/${circuit.city}`}
                                    className="btn btn-outline-primary"
                                >
                                    Editar
                                </Link>
                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={() => deleteCircuit(circuit)}
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

export default CircuitList;
