import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditCircuit() {
    let navigate = useNavigate();
    const { name, city } = useParams();

    const [circuit, setCircuit] = useState({
        name: "",
        city: "",
        country: "",
        n_laps: "",
        length: "",
    });

    const loadCircuit = useCallback(async () => {
        try {
            const result = await axios.get("http://localhost:8000/circuits", {
                params: { name, city },
            });
            setCircuit(result.data);
        } catch (error) {
            console.error("Error loading circuit:", error);
            alert("Error al cargar el circuito. Inténtalo de nuevo.");
        }
    }, [name, city]);

    useEffect(() => {
        loadCircuit();
    }, [loadCircuit]);

    const onInputChange = (e) => {
        setCircuit({ ...circuit, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put("http://localhost:8000/circuits", circuit, {
                params: { name, city },
            });
            navigate("/circuits");
        } catch (error) {
            console.error("Error updating circuit:", error.response?.data || error.message);
            alert("Error al actualizar el circuito. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center">Editar Circuito</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={circuit.name}
                                onChange={onInputChange}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">Ciudad</label>
                            <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={circuit.city}
                                onChange={onInputChange}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">País</label>
                            <input
                                type="text"
                                className="form-control"
                                name="country"
                                value={circuit.country}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="n_laps" className="form-label">Número de Vueltas</label>
                            <input
                                type="number"
                                className="form-control"
                                name="n_laps"
                                value={circuit.n_laps}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="length" className="form-label">Longitud (en km)</label>
                            <input
                                type="number"
                                className="form-control"
                                name="length"
                                value={circuit.length}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-primary">Guardar Cambios</button>
                        <Link to="/circuits" className="btn btn-outline-secondary ms-2">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCircuit;