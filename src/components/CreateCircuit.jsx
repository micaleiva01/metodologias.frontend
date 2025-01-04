import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateCircuits() {
    let navigate = useNavigate();

    const [circuit, setCircuit] = useState({
        name: "",
        city: "",
        country: "",
        n_laps: "",
        length: "",
    });

    const { name, city, country, n_laps, length } = circuit;

    const onInputChange = (e) => {
        setCircuit({ ...circuit, [e.target.name]: e.target.value });
    };

    const validateCircuit = () => {
        if (!name || !city || !country || !n_laps || !length) {
            alert("Todos los campos son obligatorios.");
            return false;
        }
        if (isNaN(n_laps) || n_laps <= 0) {
            alert("Número de vueltas debe ser un número positivo.");
            return false;
        }
        if (isNaN(length) || length <= 0) {
            alert("La longitud debe ser un número positivo.");
            return false;
        }
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!validateCircuit()) return;

        try {
            await axios.post("http://localhost:8000/circuits", circuit); // Adjust endpoint if necessary
            navigate("/circuits");
        } catch (error) {
            console.error("Error creating circuit:", error.response?.data || error.message);
            const errorMessage =
                error.response?.data?.message || "Error al crear el circuito. Inténtalo de nuevo.";
            alert(errorMessage);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center">Crear Nuevo Circuito</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre del circuito"
                                name="name"
                                value={name}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">Ciudad</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ciudad del circuito"
                                name="city"
                                value={city}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">País</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="País del circuito"
                                name="country"
                                value={country}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="n_laps" className="form-label">Número de Vueltas</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Número de vueltas"
                                name="n_laps"
                                value={n_laps}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="length" className="form-label">Longitud (en km)</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Longitud del circuito"
                                name="length"
                                value={length}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-danger">
                            Crear
                        </button>
                        <Link to="/circuits" className="btn btn-outline-secondary ms-2">
                            Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateCircuits;
