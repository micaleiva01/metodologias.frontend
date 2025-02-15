import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CircuitList() {
    const [circuits, setCircuits] = useState([]);
    const [user, setUser] = useState(null);

    const loadCircuits = async () => {
        try {
            const result = await axios.get("http://localhost:8000/circuits");
            setCircuits(result.data);
            console.log("Circuitos encontrados:", result.data);
        } catch (error) {
            console.error("Error:", error);
            alert("Error al cargar los circuitos.");
        }
    };

    useEffect(() => {
        loadCircuits();
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const deleteCircuit = async (circuit) => {
        if (!circuit.id || !circuit.id.name || !circuit.id.city) {
            alert("Error: ID de circuito no encontrado.");
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
            console.error("Error:", error.response?.data || error.message);
            alert("Error al eliminar el circuito. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container my-4">
            <div className="row">
                {circuits.map((circuit) => (
                    <div key={`${circuit.id.city}-${circuit.id.name}`} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card h-100 bg-transparent text-white border-white">
                            <div className="card-body">
                                <h5 className="card-title">{circuit.id.name}</h5>
                                <p className="card-text">Ciudad: {circuit.id.city}</p>
                                <p className="card-text">País: {circuit.country}</p>
                                {user && user.rol === "ADMIN" && (
                                    <div className="mt-3">
                                        <Link to={`/edit-circuit/${circuit.id.city}/${circuit.id.name}`} className="btn btn-outline-primary">
                                            Editar
                                        </Link>
                                        <button className="btn btn-danger ms-2" onClick={() => deleteCircuit(circuit)}>
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CircuitList;
