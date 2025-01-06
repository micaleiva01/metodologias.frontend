import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function VotingsList() {
    const [votings, setVotings] = useState([]);

    useEffect(() => {
        loadVotings();
    }, []);

    const loadVotings = async () => {
        try {
            const result = await axios.get("http://localhost:8000/votings");
            setVotings(result.data);
        } catch (error) {
            console.error("Error fetching votings:", error);
        }
    };

    const deleteVoting = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/votings/${id}`);
            setVotings(votings.filter((voting) => voting.id !== id));
            alert("Votación eliminada correctamente.");
        } catch (error) {
            console.error("Error deleting voting:", error);
            alert("Error al eliminar la votación. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container my-4">
            <Link to="/create-voting" className="btn btn-outline-danger mb-4">
                Crear Nueva Votación
            </Link>
            <div className="row">
                {votings.map((voting) => (
                    <div key={voting.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                            <h5 className="card-title">{voting.title}</h5>
                                <p className="card-text">Descripción: {voting.description}</p>
                                <p className="card-text">Fecha de cierre: {voting.end_date}</p>
                                {new Date(voting.end_date) < new Date() ? (
                                    <Link to={`/votings/${voting.permalink}/results`} className="btn btn-outline-info">
                                        Ver Resultados
                                    </Link>
                                    ) : (
                                    <Link to={`/votings/${voting.permalink}`} className="btn btn-outline-success">
                                        Ver Detalles y Votar
                                    </Link>
                                    )}
                                    <Link
                                        to={`/edit-voting/${voting.id}`}
                                        className="btn btn-outline-primary ms-2"
                                    >
                                        Editar
                                    </Link>
                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={() => deleteVoting(voting.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default VotingsList;
