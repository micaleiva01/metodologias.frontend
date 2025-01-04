import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditVoting() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [voting, setVoting] = useState({
        title: "",
        description: "",
        end_date: "",
    });

    const loadVoting = useCallback(async () => {
        try {
            const result = await axios.get(`http://localhost:8000/votings/${id}`);
            setVoting(result.data);
        } catch (error) {
            console.error("Error loading voting:", error);
            alert("Error al cargar la votación. Inténtalo de nuevo.");
        }
    }, [id]);

    useEffect(() => {
        loadVoting();
    }, [loadVoting]);

    const onInputChange = (e) => {
        setVoting({ ...voting, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8000/votings/${id}`, voting);
            navigate("/votings");
        } catch (error) {
            console.error("Error updating voting:", error);
            alert("Error al actualizar la votación. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="text-center">Editar Votación</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Título</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={voting.title}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={voting.description}
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
                                value={voting.end_date}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-danger">Guardar Cambios</button>
                        <Link to="/votings" className="btn btn-outline-secondary ms-2">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditVoting;
