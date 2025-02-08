import React, { useState, useEffect, onClick } from "react";
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
            console.log("Fetched circuits:", result.data);
            setCircuits(result.data);
        } catch (error) {
            console.error("Error fetching circuits:", error);
            alert("Error al cargar los circuitos.");
        }
    };

    const deleteCircuit = async (circuit) => {
    if (!circuit.id || !circuit.id.name || !circuit.id.city) {
        alert("Error: Circuit ID is missing.");
        return;
    }

    const encodedCity = encodeURIComponent(circuit.id.city.trim());
    const encodedName = encodeURIComponent(circuit.id.name.trim());

    console.log(`Deleting circuit: /circuits/${encodedCity}/${encodedName}`);

    try {
        await axios.delete(`http://localhost:8000/circuits/${encodedCity}/${encodedName}`);
        setCircuits(circuits.filter((c) => c.id.name !== circuit.id.name || c.id.city !== circuit.id.city));
        alert("Circuito eliminado correctamente.");
    } catch (error) {
        console.error("Error deleting circuit:", error.response?.data || error.message);
        alert("Error al eliminar el circuito. Inténtalo de nuevo.");
    }
};


    return (
        <div className="container my-4">
            <div className="row">
                {circuits.map((circuit) => (
                    circuit.id && (
                        <div key={`${circuit.id.name}-${circuit.id.city}`} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card h-100 bg-transparent text-white border-white" style={{ transition: "transform 0.2s" }}
                            onClick={onClick}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} >
                                <div className="card-body">
                                    <h5 className="card-title">{circuit.id.name}</h5>
                                    <p className="card-text">Ciudad: {circuit.id.city}</p>
                                    <p className="card-text">País: {circuit.country}</p>
                                    <p className="card-text">Vueltas: {circuit.nLaps}</p>
                                    <p className="card-text">Longitud: {circuit.length} km</p>
                                    <Link to={`/circuits/edit/${circuit.id.city}/${circuit.id.name}`} className="btn btn-outline-primary">
                                        Editar
                                    </Link>
                                    <button className="btn btn-danger ms-2" onClick={() => deleteCircuit(circuit)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
            <Link to="/create-circuit" className="btn btn-outline-danger mb-4">Crear Nuevo Circuito</Link>
        </div>
    );
}

export default CircuitList;
