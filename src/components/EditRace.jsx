import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

function EditRace() {
    const navigate = useNavigate();
    const { date, city, name } = useParams(); // Extracting parameters from URL

    const [race, setRace] = useState({
        date: "",
        name: "",
        city: "",
    });

    const loadRace = useCallback(async () => {
        try {
            const result = await axios.get(
                `http://localhost:8000/calendar/race?date=${date}&name=${name}&city=${city}`
            );
            setRace({
                date: result.data.id.date,
                name: result.data.id.name,
                city: result.data.id.city,
            });
        } catch (error) {
            console.error("Error fetching race details:", error);
        }
    }, [date, name, city]); // Memoize the function based on these dependencies

    useEffect(() => {
        loadRace();
    }, [loadRace]); // Include the memoized function as a dependency

    const onInputChange = (e) => {
        setRace({ ...race, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedRace = {
                id: {
                    date: race.date,
                    name: race.name,
                    city: race.city,
                },
            };
            await axios.put(
                `http://localhost:8000/calendar/race?date=${date}&name=${name}&city=${city}`,
                updatedRace
            );
            navigate("/races");
        } catch (error) {
            console.error("Error updating race:", error);
            alert("Error al actualizar la carrera. Verifica los datos e inténtalo nuevamente.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center">Editar Carrera</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={race.name}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">Ciudad</label>
                            <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={race.city}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Fecha</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={race.date}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-light">Guardar Cambios</button>
                        <Link to="/races" className="btn btn-outline-secondary ms-2">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditRace;
