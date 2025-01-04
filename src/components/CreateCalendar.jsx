import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateRace() {
    let navigate = useNavigate();

    const [race, setRace] = useState({
        name: "",
        city: "",
        date: "",
    });

    const { name, city, date } = race;

    const onInputChange = (e) => {
        setRace({ ...race, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/calendar/race", race);
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
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
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
                                name="city"
                                value={city}
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
                                value={date}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-light">Crear Carrera</button>
                        <Link to="/races" className="btn btn-outline-secondary ms-2">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateRace;
