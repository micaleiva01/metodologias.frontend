import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateVoting() {
    let navigate = useNavigate();

    const [voting, setVoting] = useState({
        title: "",
        description: "",
        end_date: "",
    });

    const { title, description, end_date } = voting;

    const onInputChange = (e) => {
        setVoting({ ...voting, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/votings", voting); // Replace with the correct endpoint
            navigate("/votings");
        } catch (error) {
            console.error("Error creating voting:", error);
            alert("Error al crear la votación. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center">Crear Nueva Votación</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Título</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={title}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={onInputChange}
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="end_date" className="form-label">Fecha de cierre</label>
                            <input
                                type="date"
                                className="form-control"
                                name="end_date"
                                value={end_date}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-danger">Crear</button>
                        <Link to="/votings" className="btn btn-outline-secondary ms-2">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateVoting;
