import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateCircuit() {
    let navigate = useNavigate();

    const [circuit, setCircuit] = useState({
        id: { name: "", city: "" },  // ✅ Ensure ID is included
        country: "",
        track: "",  // ✅ Added missing field
        nLaps: "",
        length: "",
        slowCorners: "",
        midCorners: "",
        fastCorners: "",
    });

    const { id, country, track, nLaps, length, slowCorners, midCorners, fastCorners } = circuit;

    const onInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name" || name === "city") {
            setCircuit({ ...circuit, id: { ...circuit.id, [name]: value } }); // ✅ Update composite key
        } else {
            setCircuit({ ...circuit, [name]: value });
        }
    };

    const validateCircuit = () => {
        if (!id.name || !id.city || !country || !track || !nLaps || !length || !slowCorners || !midCorners || !fastCorners) {
            alert("Todos los campos son obligatorios.");
            return false;
        }
        if (isNaN(nLaps) || nLaps <= 0) {
            alert("Número de vueltas debe ser un número positivo.");
            return false;
        }
        if (isNaN(length) || length <= 0) {
            alert("La longitud debe ser un número positivo.");
            return false;
        }
        if (isNaN(slowCorners) || slowCorners < 0) {
            alert("Las curvas lentas deben ser un número válido.");
            return false;
        }
        if (isNaN(midCorners) || midCorners < 0) {
            alert("Las curvas medias deben ser un número válido.");
            return false;
        }
        if (isNaN(fastCorners) || fastCorners < 0) {
            alert("Las curvas rápidas deben ser un número válido.");
            return false;
        }
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateCircuit()) return;

        console.log("Sending data:", circuit); // ✅ Debugging

        try {
            await axios.post("http://localhost:8000/circuits", circuit);
            navigate("/circuits");
        } catch (error) {
            console.error("Error creating circuit:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Error al crear el circuito.");
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
                                value={id.name}
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
                                value={id.city}
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
                            <label htmlFor="track" className="form-label">Pista</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre de la pista"
                                name="track"
                                value={track}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="nLaps" className="form-label">Número de Vueltas</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Número de vueltas"
                                name="nLaps"
                                value={nLaps}
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

                        <div className="mb-3">
                            <label htmlFor="slowCorners" className="form-label">Curvas Lentas</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Número de curvas lentas"
                                name="slowCorners"
                                value={slowCorners}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="midCorners" className="form-label">Curvas Medias</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Número de curvas medias"
                                name="midCorners"
                                value={midCorners}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="fastCorners" className="form-label">Curvas Rápidas</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Número de curvas rápidas"
                                name="fastCorners"
                                value={fastCorners}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-danger">Crear</button>
                        <Link to="/circuits" className="btn btn-outline-secondary ms-2">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateCircuit;
