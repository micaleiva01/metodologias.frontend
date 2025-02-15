import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditVoting() {
    let navigate = useNavigate();
    const { permalink } = useParams();

    const [voting, setVoting] = useState({
        permalink: "",
        title: "",
        description: "",
        endDate: "",
        pilots: [],
    });

    const onPilotChange = (index, field, value) => {
        const updatedPilots = [...voting.pilots];
        updatedPilots[index] = { ...updatedPilots[index], [field]: value };
        setVoting({ ...voting, pilots: updatedPilots });
    };

    useEffect(() => {
        const fetchVoting = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/voting/${permalink}`);
                setVoting(result.data || { permalink: "", title: "", description: "", endDate: "", pilots: [] });
            } catch (error) {
                console.error("Error loading voting:", error);
                alert("Error al cargar la votación. Inténtalo de nuevo.");
            }
        };
        fetchVoting();
    }, [permalink]);    
    

    const onInputChange = (e) => {
        setVoting({ ...voting, [e.target.name]: e.target.value });
    };


    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const votingData = {
                permalink: voting.permalink,
                title: voting.title,
                description: voting.description,
                endDate: voting.endDate,
                pilots: voting.pilots.map(pilot => pilot.id), // ✅ Send only pilot IDs
            };
    
            await axios.put("http://localhost:8000/voting", votingData);
            navigate("/votings");
        } catch (error) {
            console.error("Error updating voting:", error);
            alert(error.response?.data?.message || "Error al actualizar la votación.");
        }
    };
    
    
    

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
                    <h2 className="title text-center">Editar Votación</h2>
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
                            <label className="form-label">Pilotos</label>
                            {Array.isArray(voting.pilots) && voting.pilots.length > 0 ? (
                                voting.pilots.map((pilot, index) => (
                                    <div key={pilot.id} className="mb-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={pilot.surname}
                                            onChange={(e) => onPilotChange(index, "name", e.target.value)}
                                            readOnly
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No pilots selected</p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="endDate" className="form-label">Fecha de cierre</label>
                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                value={voting.endDate}
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
