import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditCircuit() {
    let navigate = useNavigate();
    const { city, name } = useParams();

    const [circuit, setCircuit] = useState({
        id: { city: "", name: "" },
        country: "",
        track: "",
        nLaps: "",
        length: "",
        slowCorners: "",
        midCorners: "",
        fastCorners: "",
    });

    useEffect(() => {
        const fetchCircuit = async () => {
            try {
                const encodedCity = encodeURIComponent(city);
                const encodedName = encodeURIComponent(name);

                console.log(`Cargando circuito: /circuits/${encodedCity}/${encodedName}`);

                const response = await axios.get(`http://localhost:8000/circuits/${encodedCity}/${encodedName}`);
                console.log("Circuito encontrado:", response.data);
                setCircuit(response.data);
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
                alert("Circuito no encontrado");
            }
        };

        fetchCircuit();
    }, [city, name]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setCircuit((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const encodedCity = encodeURIComponent(city.trim());
        const encodedName = encodeURIComponent(name.trim());

        console.log(`Actualizando circuito: /circuits/${encodedCity}/${encodedName}`);

        const updatedCircuit = {
            id: { city: circuit.id.city, name: circuit.id.name },
            country: circuit.country,
            track: circuit.track,
            nLaps: circuit.nLaps,
            length: circuit.length,
            slowCorners: circuit.slowCorners,
            midCorners: circuit.midCorners,
            fastCorners: circuit.fastCorners,
        };

        try {
            await axios.put(`http://localhost:8000/circuits/${encodedCity}/${encodedName}`, updatedCircuit);
            alert("Circuito actualizado correctamente.");
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
                    <h2 className="title text-center">Editar Circuito</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="name" value={circuit.id.name} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ciudad</label>
                            <input type="text" className="form-control" name="city" value={circuit.id.city} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">País</label>
                            <input type="text" className="form-control" name="country" value={circuit.country} onChange={onInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Pista</label>
                            <input type="text" className="form-control" name="track" value={circuit.track} onChange={onInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Número de Vueltas</label>
                            <input type="number" className="form-control" name="nLaps" value={circuit.nLaps} onChange={onInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Longitud (en km)</label>
                            <input type="number" className="form-control" name="length" value={circuit.length} onChange={onInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Curvas Lentas</label>
                            <input type="number" className="form-control" name="slowCorners" value={circuit.slowCorners} onChange={onInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Curvas Medias</label>
                            <input type="number" className="form-control" name="midCorners" value={circuit.midCorners} onChange={onInputChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Curvas Rápidas</label>
                            <input type="number" className="form-control" name="fastCorners" value={circuit.fastCorners} onChange={onInputChange} required />
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
