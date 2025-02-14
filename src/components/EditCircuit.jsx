import React, { useState, useEffect, useCallback } from "react";
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


    const fetchCircuit = useCallback(async () => {

        const encodedCity = encodeURIComponent(city.trim());
        const encodedName = encodeURIComponent(name.trim());
    
        console.log(`Fetching circuit: /circuits/${encodedCity}/${encodedName}`); 
    
        try {
            const result = await axios.get(`http://localhost:8000/circuits/${encodedCity}/${encodedName}`);
            console.log("Circuit data received:", result.data);
            setCircuit(result.data);
        } catch (error) {
            console.error("Error loading circuit: ", error.response?.data || error.message);
            alert("Error al cargar el circuito. Inténtalo de nuevo.");
        }
    }, [city, name]);
    

    useEffect(() => {
        fetchCircuit();
    }, [fetchCircuit]);


    const onInputChange = (e) => {
        const { name, value } = e.target;
        setCircuit({ ...circuit, [name]: value });
    };


    const onSubmit = async (e) => {
        e.preventDefault();
    
        const encodedCity = encodeURIComponent(city.trim());
        const encodedName = encodeURIComponent(name.trim());
    
        console.log(`Updating circuit: /circuits/${encodedCity}/${encodedName}`);
    
        const updatedCircuit = {
            country: circuit.country,
            track: circuit.track,
            nLaps: circuit.nLaps,
            length: circuit.length,
            slowCorners: circuit.slowCorners,
            midCorners: circuit.midCorners,
            fastCorners: circuit.fastCorners
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
                    <h2 className="text-center">Editar Circuito</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={circuit.id.name}
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">Ciudad</label>
                            <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={circuit.id.city}
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
                            <label htmlFor="track" className="form-label">Pista</label>
                            <input
                                type="text"
                                className="form-control"
                                name="track"
                                value={circuit.track}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="nLaps" className="form-label">Número de Vueltas</label>
                            <input
                                type="number"
                                className="form-control"
                                name="nLaps"
                                value={circuit.nLaps}
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

                        <div className="mb-3">
                            <label htmlFor="slowCorners" className="form-label">Curvas Lentas</label>
                            <input
                                type="number"
                                className="form-control"
                                name="slowCorners"
                                value={circuit.slowCorners}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="midCorners" className="form-label">Curvas Medias</label>
                            <input
                                type="number"
                                className="form-control"
                                name="midCorners"
                                value={circuit.midCorners}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="fastCorners" className="form-label">Curvas Rápidas</label>
                            <input
                                type="number"
                                className="form-control"
                                name="fastCorners"
                                value={circuit.fastCorners}
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
